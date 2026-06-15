import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: "#5A5B44",
          light: "#6D6E53",
          dark: "#484A36",
        },
        cream: {
          DEFAULT: "#F3EEE7",
          dark: "#E8DFD5",
        },
        dark: {
          DEFAULT: "#2F2B24",
          light: "#4A453C",
        },
        gold: {
          DEFAULT: "#C7A86A",
          light: "#D4B97D",
          dark: "#B89557",
        },
        beige: {
          DEFAULT: "#E8D8C1",
          light: "#F1E6D6",
          dark: "#DAC6A8",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;