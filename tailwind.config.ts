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
          primary: "#D4521A",
          background: "#FFFFFF",
          surface: "#F9FAFB",
          border: "#E5E7EB",
          text: "#111827",
          secondary: "#6B7280",
          success: "#16A34A",
          warning: "#D97706",
          danger: "#DC2626",
          info: "#2563EB",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
