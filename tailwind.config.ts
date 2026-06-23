import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050508",
        plasma: "#6E3AFA",
        flux: "#00D4FF",
        heat: "#FF4D6D",
        neural: "#A0FF6F",
        glass: "rgba(255,255,255,0.04)",
        "text-primary": "#F0EEF8",
        "text-muted": "#6B6880",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
