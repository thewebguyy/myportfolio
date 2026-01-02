import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom color palette matching original design
        primary: {
          DEFAULT: '#eabe7c',
          light: '#f2d4a8',
          dark: '#d8a860',
        },
        secondary: {
          DEFAULT: '#23967f',
          light: '#2fb89e',
          dark: '#1c7566',
        },
        gray: {
          50: '#f9fafb',
          100: '#e8e8e8',
          200: '#d0d0d0',
          300: '#b9b9b9',
          400: '#a1a1a2',
          500: '#8a8a8b',
          600: '#727373',
          700: '#5b5b5c',
          800: '#434445',
          900: '#2c2c2d',
          950: '#141516',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#a1a1a2',
            a: {
              color: '#eabe7c',
              '&:hover': {
                color: '#23967f',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config