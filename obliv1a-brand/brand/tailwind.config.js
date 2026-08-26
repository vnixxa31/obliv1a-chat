/**
 * OBLIV1A — Tailwind CSS v3 config.
 * For v4, use theme.css instead. Both carry the identical palette; every
 * value is a stock Tailwind colour re-exported under its role name.
 */
module.exports = {
  content: ['./**/*.{html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        paper:   { DEFAULT: '#FAFAF9', 2: '#F5F5F4', 3: '#E7E5E4' },   // stone 50/100/200
        field:   { DEFAULT: '#6D28D9', deep: '#5B21B6' },              // violet 700/800
        void:    '#2E1065',                                            // violet-950
        ink:     { DEFAULT: '#1C1917', mute: '#57534E' },              // stone 900/600
        'on-field':  { DEFAULT: '#FAFAF9', 2: '#DDD6FE' },             // stone-50 / violet-200
        'on-void':   { DEFAULT: '#FAFAF9', 2: '#C4B5FD' },             // stone-50 / violet-300
        signal:  { DEFAULT: '#E879F9', ink: '#C026D3' },               // fuchsia 400/600
        rule: {
          paper: '#D6D3D1', 'paper-firm': '#1C1917',                   // stone 300/900
          field: '#8B5CF6', 'field-firm': '#DDD6FE',                   // violet 500/200
          void:  '#5B21B6', 'void-firm':  '#8B5CF6',                   // violet 800/500
        },
        danger: '#BE123C', caution: '#A16207', live: '#15803D',        // rose/yellow/green 700
      },
      fontFamily: {
        display: ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        plate:   ['Bodoni Moda', 'ui-serif', 'Georgia', 'serif'],
        sans:    ['Archivo', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // The system is square. Overriding this is a brand change, not a tweak.
      borderRadius: { none: '0', sm: '0', DEFAULT: '0', md: '0', lg: '0', xl: '0', '2xl': '0', full: '9999px' },
      letterSpacing: { label: '0.14em', display: '-0.02em', tight: '-0.025em' },
      transitionTimingFunction: { obliv1a: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
};
