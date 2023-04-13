/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Nunito Mono", "sans-serif"],
        display: ["Ubuntu Mono", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-fluid-typography")],
};
