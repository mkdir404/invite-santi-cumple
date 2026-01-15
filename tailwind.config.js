/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        minionYellow: '#F3D34A',
        posterCream: '#F4E6A6',
        posterBlue: '#0E6C87',
        posterTeal: '#0B6A85'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.12)'
      }
    },
  },
  plugins: [],
}
