import type { Config } from 'tailwindcss'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'tl-black': 'hsl(var(--color-black) / <alpha-value>)',
        'tl-white': 'hsl(var(--color-white) / <alpha-value>)',
        'tl-gray': 'hsl(var(--color-gray) / <alpha-value>)',
        'tl-light-gray': 'hsl(var(--color-light-gray) / <alpha-value>)',
        'tl-lightest-gray': 'hsl(var(--color-lightest-gray) / <alpha-value>)',
        'tl-dark-gray': 'hsl(var(--color-dark-gray) / <alpha-value>)',
        'tl-darkest-gray': 'hsl(var(--color-darkest-gray) / <alpha-value>)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
