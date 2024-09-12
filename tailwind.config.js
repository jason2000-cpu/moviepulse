/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#2b1337',
        purple: {
          600: '#9333EA', // Adjust this for the button color if needed
        }
      }
    }
  },
  plugins: [],
}

