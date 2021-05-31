const  defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
 purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors:{
      'link':"#f64610",
      'blue-ocean':"#ccecff",
     ...defaultTheme.colors
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
