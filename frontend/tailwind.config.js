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
    daisyui: {
    themes: ["light"], // you can also list your custom themes
    darkTheme: "light",         // optional, sets the name of your dark theme
    base: true,                // keep base styles
    styled: true,              // enable DaisyUI styling
    utils: true,               // enable utility classes
    logs: false,               // disable console logs
    rtl: false,                // right-to-left support
    prefix: "",                // class prefix
    defaultTheme: "light",     // ✅ Set your default theme here
  },
};
