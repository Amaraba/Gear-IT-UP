/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        darkslategray: {
          100: "#1d515a",
          300: "#285760",
          400: "#03414c",
          500: "#07333B",
        },
        lightgray2: "#d9d9d9",
        orange: "#ff6700",
        lightgray: "#c0cfd2",
        red: "#d60000",
      },
    },
  },
  plugins: [],
};
