/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        crypto: {
          gold: '#00ff00',
          silver: '#808080',
          bitcoin: '#00ff00',
        },
        retro: {
          green: '#00ff00',
          amber: '#ffaa00',
          cyan: '#00ffff',
          magenta: '#ff00ff',
          red: '#ff0000',
          blue: '#0000ff',
          white: '#ffffff',
          black: '#000000',
          gray: '#808080',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
