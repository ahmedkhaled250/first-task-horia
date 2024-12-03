/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#FFBD59",
        mainText: "#D48D3B",
        socend: "#122C5F",
        button: " #1F4B43",
        headerColor: "#FFF8F6",
        headerBgColor: "#161D39",
        categoryChild: "#FBFBFB",
        blackColor: "#494949",
        profileColor: "#FFF1ED",
        profileColorText: "#D46F77",
        product: "#E9E9E9",
        discoundColor: "#8C94A3",
        textbody: "#4F547B",
        green: {
          500: '#25d366',  // WhatsApp Green
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "#FFBD59 white",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px"
          },
          "&::-webkit-scrollbar-track": {
            background: "white"
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#FFBD59",
            borderRedius: "20px",
            border: "1px solid white"
          },
        }
      }
      addUtilities(newUtilities,["responsive","hover"])
    },
    function ({ addComponents }) {
      addComponents({
        'input[type="number"]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        'input[type="number"]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },
      })
    }
  ],
}