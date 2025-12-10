/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Enable dark mode with 'class' strategy
  darkMode: 'class',

  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#ff6900',
          secondary: '#ff9346',
          accent: '#ffa500',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#e5e7eb',
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#ff9346',
          secondary: '#ff6900',
          accent: '#ffa500',
          neutral: '#1f2937',
          'base-100': '#1f2937',
          'base-200': '#111827',
          'base-300': '#374151',
        },
      },
    ],
  },
};
