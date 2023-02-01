/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        en: "orange",
        bg: "red",
        de: "#C0C0C0"
      }
    },
  },
  plugins: [],
}
