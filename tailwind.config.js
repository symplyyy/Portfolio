/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        'blue-500': '#3B82F6',
        'purple-600': '#9333EA',
        'green-500': '#22C55E',
        'teal-600': '#0D9488',
        'orange-500': '#F97316',
        'red-600': '#DC2626',
      },
    },
  },
  plugins: [],
} 