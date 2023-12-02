/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: 'Fern'
      }
    }
  },

  plugins: [require('daisyui')],
  daisyui: {
    themes: ['dim']
  }
};

module.exports = config;
