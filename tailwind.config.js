/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        libonatiGold: '#b48b47',
        libonatiDarkBlack: '#2a2a2a',
        libonatiDarkBlue: '#213749',
        libonatiWhite: '#e8e8e8',
        libonatiWhiteFont: '#e1dde7',
        libonatiRed: '#5c0a09',
        libonatiGrayYellow: '#909083',
        libonatiPurple: '#5c05d1',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
