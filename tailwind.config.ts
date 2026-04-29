import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#071427',
        teal: '#0fb9b1',
        surface: '#0d1c33',
        soft: '#9db6d8',
        stable: '#22c55e',
        warning: '#f59e0b',
        critical: '#ef4444',
      },
      boxShadow: {
        glow: '0 8px 24px rgba(15,185,177,0.2)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at 1px 1px, rgba(157,182,216,0.12) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;
