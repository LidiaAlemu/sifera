import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm earthy palette from design
        primary: "#8B7355", // Warm brown
        secondary: "#A67B5B", // Lighter brown
        accent: "#D4A574", // Golden brown
        cream: "#F5F0E6", // Off-white cream
        dark: "#2C2420", // Dark brown
        green: "#4A5D4E", // Muted green
        light: "#E8DDD0", // Light beige
        yellow: "#EAB308", // For status badges
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