"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import NeuralMesh from "./NeuralMesh";

export default function NeuralMeshScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* CSS fake bloom glow — replaces EffectComposer postprocessing */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)]}
        frameloop="demand"
        performance={{ min: 0.5 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
        }}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Suspense fallback={null}>
          <NeuralMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}
