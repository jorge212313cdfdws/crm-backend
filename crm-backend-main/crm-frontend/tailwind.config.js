/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'phoenix-blue': '#337ab7',
        'phoenix-dark': '#1a1a1a',
      }
    },
  },
  plugins: [],
}
