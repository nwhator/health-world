import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CBFF',
          300: '#66B0FF',
          400: '#3396FF',
          500: '#1E90FF', // Main primary blue
          600: '#0073E6',
          700: '#0056B3',
          800: '#003D80',
          900: '#002452',
        },
        secondary: {
          50: '#FFE8E6',
          100: '#FFD1CC',
          200: '#FFA399',
          300: '#FF7566',
          400: '#FF4733',
          500: '#FF3B30', // Alert red
          600: '#E62E24',
          700: '#B3231B',
          800: '#801812',
          900: '#520F0B',
        },
        accent: {
          50: '#E6FFF0',
          100: '#CCFFE0',
          200: '#99FFC2',
          300: '#66FFA3',
          400: '#33FF85',
          500: '#00C851', // Success green
          600: '#00A043',
          700: '#007833',
          800: '#005024',
          900: '#003317',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'soft-md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
}
export default config
