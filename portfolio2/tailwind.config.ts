import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0a0d0f",
        surface: "#0b1318",
        border: "#1a2a32",
        accent: {
          green: "#2ec87a",
          blue: "#5ab4d6",
          amber: "#e8a83a",
        },
        muted: {
          DEFAULT: "#5a8090",
          soft: "#7a9aaa",
        },
        heading: {
          DEFAULT: "#e8f4f0",
          soft: "#d0e8f0",
        },
      },
      fontFamily: {
        display: ["Syne", "ui-sans-serif", "system-ui"],
        body: ["Syne", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
        md: "3px",
        lg: "4px",
      },
      boxShadow: {
        card: "0 0 0 1px #1a2a32",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
