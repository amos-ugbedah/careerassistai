/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#c7ae6a",
          goldDark: "#b99a45",
          goldLight: "#d5c28f",
          cream: "#e3d6b4",
          dark: "#1a1a1a",
          offWhite: "#f8f5ee"
        },
      },
    },
  },
  plugins: [],
};