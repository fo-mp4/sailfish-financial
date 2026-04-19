import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#071830',
          900: '#0D2040',
          800: '#112849',
          700: '#1A3A5C',
          600: '#234E7A',
        },
        teal: {
          600: '#0C7A94',
          500: '#0E8FAC',
          400: '#14A8C8',
          300: '#1DC4E8',
        },
        silver: '#C8D8E8',
        gold: {
          600: '#A67C2A',
          500: '#C8973A',
          400: '#D4AD5C',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        cinzel: ['var(--font-cinzel)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
