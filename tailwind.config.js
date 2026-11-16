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
        grizzly: {
          black: '#0a0e17',
          card: '#141b26',
          border: '#263345',
          amber: '#d97706',
          'amber-hover': '#f59e0b',
          bone: '#f8fafc',
          muted: '#94a3b8',
          slate: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
