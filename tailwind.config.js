/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./src/**/*.{html,njk,md,js}",
    "./_site/**/*.html"
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
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
