const withMT = require("@material-tailwind/react/utils/withMT");
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "backgroundColor": {
        "secbg": "#f7f7f8",
        "bodybg": "#F4F6FF"
      },
    },
  },
  plugins: [],
})