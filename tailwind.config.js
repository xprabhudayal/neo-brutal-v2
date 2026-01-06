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
        "neo-bg": "#F4F4F4",
        "neo-card": "#FFFFFF",
        "neo-text": "#121212",
        "neo-border": "#000000",
        primary: {
          DEFAULT: "#39FF14", // Neon Lime
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#E0EFE0", // Pale Support Green
          foreground: "#000000",
        },
        support: "#D4E5D4", // Darker Support Green
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        neo: "5px 5px 0px 0px #000000",
        "neo-sm": "3px 3px 0px 0px #000000",
        "neo-hover": "2px 2px 0px 0px #000000",
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
