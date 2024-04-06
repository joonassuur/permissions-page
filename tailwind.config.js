/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#ECEFF1',
      secondary: '#677B92',
      'black-1': '#0d131b',
      'black-2': '#1A2430',
      'black-3': '#10171f',
      'black-4': '#131b24',
      'black-5': '#0d131b',
      'black-6': '#1f262e',
      'black-7': '#1c242d',
      'black-8': '#273647',
      'purple-1': '#5D55F0',
      'purple-2': '#151930',
      'purple-3': '#25275b',
      'purple-4': '#6774f4',
      'purple-5': '#1f2646',
      'purple-6': '#3c458c',
      border: 'rgba(217, 217, 217, 0.05)',
      'red-1': '#D51E68',
    },
    extend: {},
  },
  darkMode: 'selector',
  plugins: [],
};
