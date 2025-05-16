/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/react");

module.exports = {  // Используем module.exports вместо export default
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};