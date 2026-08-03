/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#C9A646',
          white: '#FFFFFF',
          lightBg: '#F8F8F8',
          text: '#111111',
          textMuted: '#555555',
          black: '#000000',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        luxury: ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
  // Trigger Vite rebuild
}
