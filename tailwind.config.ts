import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm earthy palette from design - more muted and natural
        primary: "#6B5B4F", // Muted warm brown
        secondary: "#8B7355", // Medium brown
        accent: "#C4A77D", // Soft golden brown
        cream: "#F7F2EB", // Warm cream
        dark: "#3D3530", // Dark brown
        green: "#5C6B5F", // Muted sage green
        light: "#E8E0D5", // Light beige
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