module.exports = {
  safelist: ['dark'],
  content: {
    files: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
  },
  darkMode: 'class', // false or 'media' or 'class'
  theme: {
    extend: {
      extend: {
        colors: {}
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp')]
}
