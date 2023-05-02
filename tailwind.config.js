/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Views/**/*.{cshtml,razor}",
    "./Pages/**/*.{cshtml,razor}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-fluid-typography")],
}

