/** @type {import('tailwindcss').Config} */
module.exports = {
   plugins: [require('@tailwindcss/typography')],

    content: [
      "./src/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {
        colors: {
        'brand-purple': {
          DEFAULT: '#6901D2', 
          50: '#f4ebff',
          100: '#e9d5ff',
          600: '#6901D2', 
          700: '#5501ac',   
          800: '#44018a',
          900: '#330169',
        }, 
        'brand-orange': {
          DEFAULT: '#FFA62B',
          50: '#FFF8E6',
          200: '#FFDB99',
          300: '#FFC966',
          400: '#FFB233',
          500: '#FFA62B',
          600: '#e59527',
          700: '#cc8522',
        }
      },
      },
    },
    plugins: [],
  }
  
  