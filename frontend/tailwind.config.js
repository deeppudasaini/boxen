/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#8c2bee",
        "background-light": "#f7f6f8",
        "background-dark": "#191022",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        "lg": "1rem",
        "xl": "1.5rem",
      },
    },
  },
  plugins: [],
}
