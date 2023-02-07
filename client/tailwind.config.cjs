/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "*",
    "./index.html",
    "./src/*.{js,jsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5677BB",
        en: "orange",
        bg: "green",
        de: "red"
      }
    },
  },
  plugins: [],
}
