/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-dark': '#1D4ED8',
        'primary-light': '#EFF6FF',
        success: '#16A34A',
        'success-light': '#F0FDF4',
        danger: '#EF4444',
        'danger-light': '#FEF2F2',
        'gray-border': '#E6EAF0',
        'gray-mid': '#9CA3AF',
        'gray-text': '#6B7280',
        'gray-dark': '#374151',
        'gray-darker': '#111827',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
