/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#c3d9eb',
          300: '#95bedc',
          400: '#609dc9',
          500: '#3b7fb4',
          600: '#2b6697',
          700: '#23527a',
          800: '#1b4161',
          900: '#0f2b48', // Deep navy
          950: '#091a2d',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488', // Primary teal
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        mint: {
          50: '#f2fcf6',
          100: '#e1f8ec',
          200: '#c5f2d9',
          300: '#97e5be',
          400: '#61d09e',
          500: '#38b780',
          600: '#279465',
        },
        pastel: {
          blue: '#edf5fb',
          teal: '#eefaf7',
          mint: '#eaf8f1',
          amber: '#fffbeb',
          rose: '#fff1f2',
          purple: '#f5f3ff',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(15, 43, 72, 0.05), 0 1px 2px rgba(15, 43, 72, 0.03)',
        'card': '0 4px 20px -2px rgba(15, 43, 72, 0.06), 0 2px 6px -1px rgba(15, 43, 72, 0.03)',
        'elevated': '0 10px 30px -4px rgba(15, 43, 72, 0.08), 0 4px 10px -2px rgba(15, 43, 72, 0.04)',
        'glow-teal': '0 0 25px -5px rgba(20, 184, 166, 0.35)',
      }
    },
  },
  plugins: [],
}
