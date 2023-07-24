/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        shoppypink: "#FB6B6F",
      },
      backgroundImage: {
        bannerImage: "url('/public/images/banner.jpg')",
      },
    },
  },
  plugins: [],
};
