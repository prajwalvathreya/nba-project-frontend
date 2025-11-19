/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nba: {
          primary: '#1d4ed8',    // NBA blue
          secondary: '#dc2626',   // NBA red
          dark: '#1f2937',       // Dark background
          light: '#f3f4f6',      // Light background
        }
      }
    },
  },
  plugins: [],
}
