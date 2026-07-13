import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm coffee brown palette - richer and less white
        primary: "#5C4A3A", // Rich coffee brown
        secondary: "#7A6350", // Medium coffee brown
        accent: "#C9A86C", // Golden accent
        cream: "#E8DCD0", // Warmer, less white cream
        dark: "#2D2420", // Dark coffee
        green: "#4A5D4E", // Muted green
        light: "#D4C4B5", // Light brown/beige
        yellow: "#D4A574", // For status badges
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ["Inter", "sans-serif"],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};
export default config;