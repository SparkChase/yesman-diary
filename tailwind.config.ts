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
        "yes-yellow": "#FFE066",
        "yes-cream": "#FFF5E1",
        "yes-orange": "#FF8C69",
        "yes-coral": "#FF9E9E",
        "yes-pink": "#FFB7C5",
        "yes-black": "#2D2D2D",
        "yes-gray": "#FFF8F3",
        "yes-mint": "#A8E6CF",
        "yes-lavender": "#DDA0DD",
        "yes-sky": "#B4E4FF",
        "yes-peach": "#FFDAB9",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
