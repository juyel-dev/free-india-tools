/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: '#FF9933',
        green: '#138808',
        blue: '#000080'
      }
    },
  },
  plugins: [],
}
