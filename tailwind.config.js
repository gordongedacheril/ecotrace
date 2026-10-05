/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#0b1326',
        'surface-container': '#171f33',
        'surface-container-low': '#131b2e',
        'surface-container-high': '#222a3d',
        'surface-container-highest': '#2d3449',
        'surface-container-lowest': '#060e20',
        'surface-bright': '#31394d',
        'surface-variant': '#2d3449',
        'on-surface': '#dae2fd',
        'on-surface-variant': '#bbcabf',
        primary: '#4edea3',
        'primary-container': '#10b981',
        'on-primary': '#003824',
        secondary: '#68dba9',
        'secondary-container': '#25a475',
        tertiary: '#ffb95f',
        'tertiary-container': '#e29100',
        error: '#ffb4ab',
        'error-container': '#93000a',
        'on-error': '#690005',
        'on-error-container': '#ffdad6',
        outline: '#86948a',
        'outline-variant': '#3c4a42',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        'plus-jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(78, 222, 163, 0.4)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 5px rgba(78, 222, 163, 0.1)' },
        },
        'scan-sweep': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-sweep': 'scan-sweep 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
}
