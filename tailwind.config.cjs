/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: 'Fern Text'
      }
    }
  },

  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dracula']
  }
};

module.exports = config;
