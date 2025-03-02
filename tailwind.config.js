/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6', // Purple
          dark: '#6d28d9',
          light: '#a78bfa',
        },
        secondary: {
          DEFAULT: '#14b8a6', // Teal
          dark: '#0d9488',
          light: '#5eead4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};