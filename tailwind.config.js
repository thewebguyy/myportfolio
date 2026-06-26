/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New token set
        ink:     'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        paper:   'var(--paper)',
        'paper-2': 'var(--paper-2)',
        wire:    'var(--wire)',
        signal:  'var(--signal)',
        // Legacy aliases (used by existing components)
        background:        'var(--background)',
        surface:           'var(--surface)',
        'surface-2':       'var(--surface-2)',
        'text-primary':    'var(--text-primary)',
        'text-secondary':  'var(--text-secondary)',
        'text-muted':      'var(--text-muted)',
        'text-accent':     'var(--text-accent)',
        'border-wire':     'var(--border-wire)',
        primary:           'var(--primary)',
        'primary-light':   'var(--primary-light)',
        secondary:         'var(--secondary)',
        'secondary-light': 'var(--secondary-light)',
      },
      fontFamily: {
        sans:    ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        serif:   ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-space-mono)', 'Space Mono', 'Courier New', 'monospace'],
        // Legacy aliases
        kanit:        ['var(--font-space-grotesk)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        'jetbrains-mono': ['var(--font-space-mono)', 'Space Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'fade-in':   'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up':  'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down':'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%':   { transform: 'translateY(-8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')({}),
  ],
}
