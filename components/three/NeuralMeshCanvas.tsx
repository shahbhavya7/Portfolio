/**
 * SSR-safe wrapper for the NeuralMesh R3F component.
 * Three.js requires browser APIs — this dynamic import ensures
 * the component only loads on the client.
 */
import dynamic from "next/dynamic";

const NeuralMeshCanvas = dynamic(() => import("./NeuralMeshScene"), {
  ssr: false,
  loading: () => null,
});

export default NeuralMeshCanvas;
