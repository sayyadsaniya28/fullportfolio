/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        dark: '#0b1020',
      },
      maxWidth: {
        '6xl': '72rem',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #0b1020 0%, #0f172a 40%, #1e3a8a 100%)',
      },
    },
  },
  plugins: [],
};


