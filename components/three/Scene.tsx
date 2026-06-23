"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";

interface SceneProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable R3F Canvas wrapper.
 * Must be loaded via next/dynamic with ssr: false to prevent SSR crashes.
 */
export default function Scene({ children, className }: SceneProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={null}>
        {children}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
