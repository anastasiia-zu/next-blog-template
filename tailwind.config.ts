import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        background: "var(--background)",
        "muted-foreground": "rgba(0,0,0,0.6)",
        astBg1: "var(--ast-bg1)",
        astAccent: "var(--ast-accent)",
      },
    },
  },
  plugins: [],
};

export default config;