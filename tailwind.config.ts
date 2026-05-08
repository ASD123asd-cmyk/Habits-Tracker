import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050816',
        aura: '#00BFFF',
        silverAura: '#CFEFFF',
        cyanGlow: '#67E8F9'
      },
      fontFamily: {
        display: ['var(--font-space)', 'Inter', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif']
      },
      boxShadow: {
        aura: '0 0 35px rgba(0,191,255,.38), inset 0 0 20px rgba(207,239,255,.08)',
        'aura-strong': '0 0 70px rgba(0,191,255,.55)'
      },
      animation: {
        aurora: 'aurora 12s ease-in-out infinite alternate',
        float: 'float 7s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.8s ease-in-out infinite'
      },
      keyframes: {
        aurora: { '0%': { transform: 'translate3d(-8%, -4%, 0) scale(1)' }, '100%': { transform: 'translate3d(8%, 6%, 0) scale(1.1)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        pulseGlow: { '0%, 100%': { opacity: '.65', filter: 'blur(0)' }, '50%': { opacity: '1', filter: 'blur(1px)' } }
      }
    }
  },
  plugins: []
};
export default config;
