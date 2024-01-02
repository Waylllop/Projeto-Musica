/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabin: ["Cabin", "sans-serif"],
        coustard: ["Coustard", "serif"],
      },
      colors: {
        primary: "#FBB13C",
        secondary: "#895B1E",
        light: "#D9D9D9",
        dark: "#1B2021",
      },
    },
  },
  plugins: [],
};
