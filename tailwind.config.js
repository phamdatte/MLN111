/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        revolutionary: {
          red: '#DC2626',
          darkRed: '#991B1B',
          gold: '#F59E0B',
          yellow: '#FCD34D',
          brown: '#78350F',
          darkBrown: '#451A03',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-fast': 'pulse 1s infinite',
        'correct': 'correct 0.5s ease-out',
        'wrong': 'wrong 0.5s ease-out',
      },
      keyframes: {
        correct: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)', backgroundColor: '#10B981' },
        },
        wrong: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
      },
    },
  },
  plugins: [],
}
