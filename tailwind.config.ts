import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury coffee & book cafe palette - refined & modern
        background: "#F5F1ED", // Sophisticated cream
        foreground: "#2D2420", // Deep coffee text
        primary: "#3D2817", // Rich, luxurious coffee brown
        "primary-dark": "#2D1F10", // Darker primary for hover states
        secondary: "#8B7355", // Elegant warm taupe
        accent: "#D4AF6A", // Premium champagne gold
        "text-secondary": "#6B5D54", // Subtle secondary text
        border: "#DDD4CC", // Soft elegant dividers
        card: "#FEFBF8", // Subtle card background
        hover: "#3D2817", // For interactive states
        success: "#6B8E6F", // Muted green
        warning: "#D4A574", // Warm amber
        error: "#B85C5C", // Muted red
        muted: "#9E8E83", // Muted gray-brown
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
