import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#D4521A",
          light: "#FDF6F0",
          text: "#1C1C1C",
          success: "#2E7D32",
          warning: "#F59E0B",
          danger: "#DC2626",
          info: "#2563EB",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
