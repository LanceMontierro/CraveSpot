/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        textMd: "16px",
        textLg: "20px",
        textSm: "14px",
      },
      colors: {
        primary: "#8E24AA",
        secondary: "#e4aff8",
        bgBox: "#fcf5fe",
        bgWhite: "#f7f7f7f7",
      },
      fontFamily: {
        rubik: ["Rubik Mono One", "serif"],
      },
    },
  },
  plugins: [],
};
