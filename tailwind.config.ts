import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#fbf7ef",
          100: "#f6f0e3",
          200: "#eadfbe",
          300: "#d8c49a",
          400: "#c3a86d",
          500: "#b08d57",
          600: "#8d6f42",
          700: "#6f5637",
          800: "#4c3b2a",
          900: "#2b2118",
        },
        temple: {
          50: "#edf4fb",
          100: "#dce8f4",
          200: "#b8d1e8",
          300: "#88b3d2",
          400: "#558bb3",
          500: "#36688f",
          600: "#244a69",
          700: "#19354a",
          800: "#102736",
          900: "#0a1a24",
        },
      },
      boxShadow: {
        shrine: "0 18px 45px -24px rgba(21, 58, 91, 0.45)",
        glow: "0 0 0 1px rgba(176, 141, 87, 0.3), 0 15px 40px -20px rgba(176, 141, 87, 0.35)",
      },
      backgroundImage: {
        parchment:
          "radial-gradient(circle at top left, rgba(255,255,255,0.65), rgba(255,255,255,0) 42%), linear-gradient(180deg, rgba(255,255,255,0.5), rgba(246,240,227,0.65))",
        halo:
          "radial-gradient(circle at top, rgba(176,141,87,0.2), transparent 40%), radial-gradient(circle at bottom right, rgba(53,104,143,0.16), transparent 30%)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        serene: "0.12em",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
