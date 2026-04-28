/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: '#0a0a1a',
          900: '#0f0f2d',
          800: '#1a1a3d',
          700: '#25254d',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        amber: {
          100: '#fef3c7',
          200: '#fde68a',
        },
        mystic: {
          purple: '#6b21a8',
          indigo: '#3730a3',
          rose: '#9f1239',
        }
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(ellipse at top, #1a1a3d 0%, #0a0a1a 100%)',
        'star-field': 'radial-gradient(1px 1px at 20px 30px, #ffffff, transparent), radial-gradient(1px 1px at 40px 70px, #ffffff, transparent), radial-gradient(1px 1px at 50px 160px, #ffffff, transparent), radial-gradient(1px 1px at 90px 40px, #ffffff, transparent), radial-gradient(1px 1px at 130px 80px, #ffffff, transparent)',
        'sacred-pattern': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(251, 191, 36, 0.03) 10px, rgba(251, 191, 36, 0.03) 20px)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
