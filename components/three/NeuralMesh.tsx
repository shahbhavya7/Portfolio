"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ── Constants ───────────────────────────────────────────────── */
const NODE_COUNT = 60;
const SPHERE_RADIUS = 4;
const EDGE_DISTANCE = 2.0;
const REPEL_RADIUS = 1.5;
const REPEL_STRENGTH = 0.6;
const NODE_RADIUS = 0.04;
const ROTATION_SPEED = 0.0008;

/* ── Helpers ─────────────────────────────────────────────────── */
function randomInSphere(radius: number): [number, number, number] {
  // Bias toward center for clustering
  const u = Math.random();
  const r = radius * Math.pow(u, 0.5); // sqrt bias = more center-clustered
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ];
}

/* ── Node Material ───────────────────────────────────────────── */
const nodeMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color("#6E3AFA"),
  emissive: new THREE.Color("#6E3AFA"),
  emissiveIntensity: 2.5,
  toneMapped: false,
});

const nodeGeometry = new THREE.SphereGeometry(NODE_RADIUS, 8, 8);

/* ── Component ───────────────────────────────────────────────── */
export default function NeuralMesh() {
  const groupRef = useRef<THREE.Group>(null!);
  const nodesRef = useRef<THREE.InstancedMesh>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const scrollProgress = useRef(0);
  const frameCount = useRef(0);
  const { viewport, invalidate } = useThree();

  /* ── Generate stable node data ─────────────────────────────── */
  const nodeData = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const originalPositions: THREE.Vector3[] = [];
    const phases: number[] = [];
    const floatSpeeds: number[] = [];
    const startPositions: THREE.Vector3[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const [x, y, z] = randomInSphere(SPHERE_RADIUS);
      const pos = new THREE.Vector3(x, y, z);
      positions.push(pos.clone());
      originalPositions.push(pos.clone());
      phases.push(Math.random() * Math.PI * 2);
      floatSpeeds.push(0.3 + Math.random() * 0.7);

      // Start positions for entry animation (scattered far)
      const dir = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      ).normalize();
      startPositions.push(dir.multiplyScalar(8 + Math.random() * 6));
    }

    return { positions, originalPositions, phases, floatSpeeds, startPositions };
  }, []);

  /* ── Compute edge pairs (once on mount, never recalculate) ── */
  const edgeData = useMemo(() => {
    const pairs: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dist = nodeData.originalPositions[i].distanceTo(
          nodeData.originalPositions[j]
        );
        if (dist < EDGE_DISTANCE) {
          pairs.push([i, j]);
        }
      }
    }
    return {
      pairs,
      phases: pairs.map(() => Math.random() * Math.PI * 2),
    };
  }, [nodeData]);

  /* ── Entry animation state ─────────────────────────────────── */
  const entryProgress = useRef(0);
  const [entryDone, setEntryDone] = useState(false);

  /* ── Track mouse (throttled to 16ms / 60fps cap, uses ref not state) */
  useEffect(() => {
    let lastMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMove < 16) return;
      lastMove = now;
      mouse.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * viewport.width * 0.5;
      mouse.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * viewport.height * 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewport]);

  /* ── Track scroll ──────────────────────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      const heroH = window.innerHeight;
      scrollProgress.current = Math.min(window.scrollY / heroH, 1);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── 30fps invalidation loop for demand frameloop ──────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      invalidate();
    }, 1000 / 30);
    return () => clearInterval(interval);
  }, [invalidate]);

  /* ── Temp matrix & vector ──────────────────────────────────── */
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const mouseWorld = useMemo(() => new THREE.Vector3(), []);

  /* ── Frame loop ────────────────────────────────────────────── */
  useFrame((state, delta) => {
    if (!groupRef.current || !nodesRef.current || !linesRef.current) return;

    frameCount.current++;
    const time = state.clock.elapsedTime;

    // ── Entry animation (lerp from start positions)
    if (!entryDone) {
      entryProgress.current = Math.min(entryProgress.current + delta * 0.6, 1);
      if (entryProgress.current >= 1) setEntryDone(true);
    }
    const t = entryDone ? 1 : easeOutCubic(entryProgress.current);

    // ── Rotate entire group
    groupRef.current.rotation.y += ROTATION_SPEED;

    // ── Scroll: scale and opacity
    const scrollT = scrollProgress.current;
    const scale = THREE.MathUtils.lerp(1, 0.4, scrollT);
    const opacity = 1 - scrollT;
    groupRef.current.scale.setScalar(scale);

    // Fade by modifying material opacity
    if (nodesRef.current.material instanceof THREE.Material) {
      (nodesRef.current.material as THREE.MeshStandardMaterial).opacity = opacity;
      (nodesRef.current.material as THREE.MeshStandardMaterial).transparent = true;
    }

    // ── Mouse position in 3D (reuse vector, no allocation)
    mouseWorld.set(mouse.current.x, mouse.current.y, 0);

    // ── Update each node
    for (let i = 0; i < NODE_COUNT; i++) {
      const original = nodeData.originalPositions[i];
      const start = nodeData.startPositions[i];
      const phase = nodeData.phases[i];
      const speed = nodeData.floatSpeeds[i];

      // Animated target (original + float)
      const floatY = Math.sin(time * speed + phase) * 0.06;
      const floatX = Math.cos(time * speed * 0.7 + phase) * 0.03;
      tempVec.set(
        original.x + floatX,
        original.y + floatY,
        original.z
      );

      // Mouse repulsion
      const dx = tempVec.x - mouseWorld.x;
      const dy = tempVec.y - mouseWorld.y;
      const dist2D = Math.sqrt(dx * dx + dy * dy);
      if (dist2D < REPEL_RADIUS && dist2D > 0.01) {
        const force = (1 - dist2D / REPEL_RADIUS) * REPEL_STRENGTH;
        tempVec.x += (dx / dist2D) * force;
        tempVec.y += (dy / dist2D) * force;
      }

      // Lerp from start position (entry)
      const pos = nodeData.positions[i];
      pos.lerpVectors(start, tempVec, t);

      // Set instanced mesh transform
      tempMatrix.makeTranslation(pos.x, pos.y, pos.z);
      nodesRef.current.setMatrixAt(i, tempMatrix);
    }
    nodesRef.current.instanceMatrix.needsUpdate = true;

    // ── Update edges (positions every frame, opacity every 3rd frame)
    const linePositions = linesRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;

    for (let e = 0; e < edgeData.pairs.length; e++) {
      const [i, j] = edgeData.pairs[e];
      const posA = nodeData.positions[i];
      const posB = nodeData.positions[j];

      linePositions.setXYZ(e * 2, posA.x, posA.y, posA.z);
      linePositions.setXYZ(e * 2 + 1, posB.x, posB.y, posB.z);
    }
    linePositions.needsUpdate = true;

    // Only update edge opacity every 3rd frame
    if (frameCount.current % 3 === 0) {
      const lineOpacities = linesRef.current.geometry.getAttribute(
        "opacity"
      ) as THREE.BufferAttribute;

      for (let e = 0; e < edgeData.pairs.length; e++) {
        const pulse =
          0.08 + 0.12 * Math.sin(time * 1.5 + edgeData.phases[e]);
        lineOpacities.setX(e * 2, pulse * opacity);
        lineOpacities.setX(e * 2 + 1, pulse * opacity);
      }
      lineOpacities.needsUpdate = true;
    }
  });

  /* ── Edge geometry ─────────────────────────────────────────── */
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(edgeData.pairs.length * 2 * 3);
    const opacities = new Float32Array(edgeData.pairs.length * 2);

    // Initialize
    for (let e = 0; e < edgeData.pairs.length; e++) {
      const [i, j] = edgeData.pairs[e];
      const posA = nodeData.positions[i];
      const posB = nodeData.positions[j];
      positions[e * 6] = posA.x;
      positions[e * 6 + 1] = posA.y;
      positions[e * 6 + 2] = posA.z;
      positions[e * 6 + 3] = posB.x;
      positions[e * 6 + 4] = posB.y;
      positions[e * 6 + 5] = posB.z;
      opacities[e * 2] = 0.2;
      opacities[e * 2 + 1] = 0.2;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));
    return geo;
  }, [edgeData, nodeData]);

  /* ── Custom line shader material ───────────────────────────── */
  const lineMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: `
          attribute float opacity;
          varying float vOpacity;
          void main() {
            vOpacity = opacity;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying float vOpacity;
          void main() {
            gl_FragColor = vec4(0.0, 0.831, 1.0, vOpacity);
          }
        `,
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {/* Particle nodes */}
      <instancedMesh
        ref={nodesRef}
        args={[nodeGeometry, nodeMaterial, NODE_COUNT]}
      />

      {/* Edge lines */}
      <lineSegments
        ref={linesRef}
        geometry={lineGeometry}
        material={lineMaterial}
      />

      {/* Ambient light */}
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#6E3AFA" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#00D4FF" />
    </group>
  );
}

/* ── Easing ──────────────────────────────────────────────────── */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
