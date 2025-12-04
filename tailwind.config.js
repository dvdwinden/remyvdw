/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./src/**/*.{html,njk,md,js}",
    "./_site/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            fontFamily: 'Space Mono, monospace',
            '--tw-prose-bold': '#111',
            'strong': {
              color: 'var(--tw-prose-bold)',
            },
          },
        },
        dark: {
          css: {
            '--tw-prose-bold': '#fff',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
