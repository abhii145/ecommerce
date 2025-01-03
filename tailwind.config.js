/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "sm-device": "18px",
        "lg-device": "20px",
      },
    },
  },
  plugins: [],
}
