/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    // fontFamily:['Inter','sans-serif'],
    fontFamily: {
      Archivo: ['archivo', "sans-serif"],
      Inter : ['inter',"sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}

