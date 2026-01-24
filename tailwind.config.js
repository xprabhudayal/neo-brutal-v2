/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Wise Palette - mapped to CSS variables
        "neo-bg": "var(--neo-bg)",
        "neo-card": "var(--neo-card)",
        "neo-text": "var(--neo-text)",
        "neo-border": "var(--neo-border)",
        primary: {
          DEFAULT: "#9FE870", // Wise Bright Green
          foreground: "#163300",
        },
        secondary: {
          DEFAULT: "#D4F0C4", // Light Green (subtle)
          foreground: "#163300",
        },
        accent: {
          DEFAULT: "#A0E1E1", // Wise Blue
          foreground: "#163300",
        },
        support: "#D4E5D4", // Darker Support Green
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        neo: "5px 5px 0px 0px var(--neo-shadow)",
        "neo-sm": "3px 3px 0px 0px var(--neo-shadow)",
        "neo-hover": "2px 2px 0px 0px var(--neo-shadow)",
        // Keep primary shadow for specific use cases
        "neo-primary": "5px 5px 0px 0px #9FE870",
      },
      borderWidth: {
        3: "3px",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
