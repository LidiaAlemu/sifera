import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
      borderRadius: {
        'full': '9999px',
        'xl': '1rem',
        'lg': '0.75rem',
        'md': '0.5rem',
        'sm': '0.25rem',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.btn': {
          '@apply rounded-full font-semibold transition-all duration-200': {},
        },
        '.btn-primary': {
          '@apply bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5': {},
        },
        '.btn-secondary': {
          '@apply bg-secondary text-white hover:bg-secondary/90 hover:shadow-lg hover:-translate-y-0.5': {},
        },
        '.btn-accent': {
          '@apply bg-accent text-primary hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5': {},
        },
        '.btn-outline': {
          '@apply border-2 border-primary text-primary hover:bg-primary/5': {},
        },
      });
    }),
  ],
};
export default config;
