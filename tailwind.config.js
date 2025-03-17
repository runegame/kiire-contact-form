/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'ki-',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kiire-buttons': '#DEFA90',
        'kiire-lime-200': '#E4FF92',
        'kiire-orange-600': '#FF5900',
        'kiire-text': '#171B5B',
      },
      fontFamily: {
        'sora': ['Sora', 'sans-serif'],
        'bricolage-grotesque': ['Bricolage Grotesque', 'serif']
      }
    },
  },
  plugins: [],
}

