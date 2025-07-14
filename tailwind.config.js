/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B21B6",
        secondary: "#8B5CF6",
        accent: "#EC4899",
        surface: "#FFFFFF",
        background: "#FAFBFC",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'hover': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'spring': 'spring 0.3s ease-out',
        'slide-right': 'slide-right 0.4s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
      keyframes: {
        spring: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};