const plugin = require('tailwindcss/plugin');

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        base: 'var(--font-base)',
        monospace: 'var(--font-monospace)',
        serif: 'var(--font-serif)',
        material: ['Material Icons Outline'],
      },
      keyframes: {
        'loading-base': {
          '0%': { borderColor: 'var(--primary-75) var(--primary-10) var(--primary-10) var(--primary-10)'},
          '33%': { borderColor: 'var(--primary-75) var(--primary-75) var(--primary-10) var(--primary-10)'},
          '66%': { borderColor: 'var(--primary-75) var(--primary-75) var(--primary-75) var(--primary-10)'},
          '100%': { borderColor: 'var(--primary-75) var(--primary-75) var(--primary-75) var(--primary-75)'},
        },
      },
      animation: {
        'loading-base': 'loading-base 1s linear infinite alternate',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('not-first', 'li:not(:first-child)')
    }),
  ],
};
