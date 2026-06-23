/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Three.js packages for proper ESM support
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
    "@react-three/rapier",
  ],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
