/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cozy: {
          bg: '#fdf8f4',
          card: '#ffffff',
          accent: '#e07a5f',
          peach: '#f4a261',
          matcha: '#81b29a',
          sand: '#f2cc8f',
          lavender: '#c5b3e6',
          slate: '#3d405b',
          muted: '#8d99ae',
          darkBg: '#1f1d2b',
          darkCard: '#272537'
        }
      },
      fontFamily: {
        bubble: ['Comfortaa', 'Quicksand', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        bounceSmall: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.18)' },
        },
        popIn: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '70%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-4px)' },
          '40%, 80%': { transform: 'translateX(4px)' },
        }
      },
      animation: {
        'bounce-small': 'bounceSmall 0.25s ease-out',
        'pop-in': 'popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'shake': 'shake 0.35s ease-in-out',
      }
    },
  },
  plugins: [],
}
