/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          dark: '#1E40AF',
          light: '#3B82F6',
          50: '#EFF6FF',
          100: '#DBEAFE',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        brand: {
          blue: '#0052FF',
          navy: '#0A1128',
          dark: '#0F172A',
          slate: '#334155',
          muted: '#64748B',
          light: '#F8FAFC',
          border: '#E2E8F0',
        },
        accent: {
          DEFAULT: '#2563EB',
          green: '#10B981',
          amber: '#F59E0B',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.04), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 30px -10px rgba(37, 99, 235, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'blue-glow': '0 10px 25px -5px rgba(37, 99, 235, 0.35)',
      }
    },
  },
  plugins: [],
}
