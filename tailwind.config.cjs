/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      fontWeight: {
        'ultralight': '100',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      transitionTimingFunction: {
        'elastic': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'out-elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        'blur-pulse': {
          '25%': { filter: 'blur(3px)' },
          '100%': { filter: 'blur(0px)' }
        },
        'hover-ripple': {
          '50%': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
          '100%': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
        },
        'glow-drift-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(12px, -8px) scale(1.1)' },
          '50%': { transform: 'translate(-6px, 14px) scale(0.95)' },
          '75%': { transform: 'translate(-14px, -4px) scale(1.05)' },
        },
        'glow-drift-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(-10px, 12px) scale(1.08)' },
          '50%': { transform: 'translate(8px, -10px) scale(0.92)' },
          '75%': { transform: 'translate(14px, 6px) scale(1.12)' },
        },
        'glow-drift-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(6px, 10px) scale(1.15)' },
          '50%': { transform: 'translate(-12px, -6px) scale(0.9)' },
          '75%': { transform: 'translate(4px, -12px) scale(1.05)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        'glow-pulse-bright': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'blur-pulse': 'blur-pulse 0.5s ease-in-out',
        'hover-ripple': 'hover-ripple 0.5s ease-out',
        'glow-drift-1': 'glow-drift-1 8s ease-in-out infinite, glow-pulse 6s ease-in-out infinite',
        'glow-drift-2': 'glow-drift-2 7s ease-in-out infinite, glow-pulse 5s ease-in-out 1s infinite',
        'glow-drift-3': 'glow-drift-3 6s ease-in-out infinite, glow-pulse-bright 4s ease-in-out 0.5s infinite',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.backdrop-blur-webkit': {
          '-webkit-backdrop-filter': 'blur(12px)',
          'backdrop-filter': 'blur(12px)',
        },
        '.backdrop-blur-md-webkit': {
          '-webkit-backdrop-filter': 'blur(12px)',
          'backdrop-filter': 'blur(12px)',
        },
      };
      addUtilities(newUtilities);
    }
  ],
} 