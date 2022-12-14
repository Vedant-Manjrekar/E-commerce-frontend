/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBrown: "#361500",
        darkBrown: "#1C0A00",
        background: "#FFFBE9",
      },
    },
  },
  plugins: [],
};
