/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#FFBD59",
        socend: "#122C5F",
        button: " #1F4B43",
        headerColor: "#FFF8F6",
        headerBgColor: "#161D39",
        categoryChild: "#FBFBFB",
        blackColor: "#494949"
      }
    },
  },
  plugins: [],
}