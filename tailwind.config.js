/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // add more paths here
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        lora: ['var(--font-lora)', 'sans-serif'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
      fontSize: {
        heading: ['3rem'],
        subheading: ['1rem', { fontWeight: 'bold' }],
        body1: ['1.125rem'],
      },
      colors: {
        libonatiGold: '#b48b47',
        libonatiDarkBlack: '#2a2a2a',
        libonatiDarkBlue: '#213749',
        libonatiWhite: '#e8e8e8',
        libonatiWhiteFont: '#e1dde7',
        libonatiRed: '#5c0a09',
        libonatiGrayYellow: '#909083',
        libonatiPurple: '#5c05d1',
        /* Gold */
        'libonatiGold-20': '#cbae7c',
        'libonatiGold-30': '#c4a26a',
        'libonatiGold-40': '#bd9758',
        'libonatiGold-50': '#b48b47',
        'libonatiGold-60': '#a27d40',
        'libonatiGold-70': '#8f6f39',
        'libonatiGold-80': '#7d6131',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('prettier-plugin-tailwindcss'),
  ],
};
