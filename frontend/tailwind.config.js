/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        primary: '#2e4f2d',
        secondary: '#3e7b27',
        customGray: '#E5E7EB',
      },
    },
     fontFamily: {
        brand: ['Bebas Neue', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
  },
  plugins: [ require('daisyui')], // Add DaisyUI here],
};
