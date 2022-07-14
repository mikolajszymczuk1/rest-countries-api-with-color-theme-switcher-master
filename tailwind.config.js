/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      // Dark Blue (Dark Mode Elements): hsl(209, 23%, 22%)
      'dark-blue': 'hsl(209, 23%, 22%)',

      // Very Dark Blue (Dark Mode Background): hsl(207, 26%, 17%)
      'very-dark-blue-a': 'hsl(207, 26%, 17%)',

      // Very Dark Blue (Light Mode Text): hsl(200, 15%, 8%)
      'very-dark-blue-b': 'hsl(200, 15%, 8%)',

      // Dark Gray (Light Mode Input): hsl(0, 0%, 52%)
      'dark-gray': 'hsl(0, 0%, 52%)',

      // Very Light Gray (Light Mode Background): hsl(0, 0%, 98%)
      'very-light-gray': 'hsl(0, 0%, 98%)',

      // White (Dark Mode Text & Light Mode Elements): hsl(0, 0%, 100%)
      white: 'hsl(0, 0%, 100%)',
    },
    fontFamily: {
      nunito: ['"Nunito Sans"', 'sans-serif'],
    },
    screens: {
      sm: '650px',
      md: '1024px',
      lg: '1440px',
      xlg: '1600px',
    },
    extend: {
      gridTemplateColumns: {
        2: 'repeat(2, minmax(0, 264px))',
        3: 'repeat(3, minmax(0, 264px))',
        4: 'repeat(4, minmax(0, 264px))',
        5: 'repeat(5, minmax(0, 264px))',
      },
    },
  },
  plugins: [],
};
