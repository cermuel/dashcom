/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1F2025",
        light: "#F5F5F5",
        pry: "#737cde",
      },
    },
  },
  plugins: [],
};
