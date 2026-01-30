/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      colors: {
        gold: {
          50: '#fdf8f3',
          100: '#f9f0e3',
          200: '#f3dec3',
          300: '#eac494',
          400: '#dfa25e',
          500: '#d4883a',
          600: '#c46d2e',
          700: '#a35427',
          800: '#854425',
          900: '#6d3922',
        },
      },
    },
  },
  plugins: [],
}
