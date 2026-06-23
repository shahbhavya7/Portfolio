/**
 * Dynamically import the R3F Scene component with SSR disabled.
 * This prevents Three.js from crashing during server-side rendering
 * since it requires access to browser APIs (WebGL, window, document).
 *
 * Usage:
 *   import SceneCanvas from "@/components/three/SceneCanvas";
 *   <SceneCanvas><YourMesh /></SceneCanvas>
 */
import dynamic from "next/dynamic";

const SceneCanvas = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => null,
});

export default SceneCanvas;
