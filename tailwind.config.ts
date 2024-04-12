import type { Config } from 'tailwindcss'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],

  theme: {
    transitionDuration: {
      DEFAULT: '200ms'
    },
    extend: {
      fontFamily: {
        'geist-sans': ['var(--font-geist-sans)']
      },
      colors: {
        'lt-black': 'hsl(var(--color-black) / <alpha-value>)',
        'lt-white': 'hsl(var(--color-white) / <alpha-value>)',
        'lt-gray': 'hsl(var(--color-gray) / <alpha-value>)',
        'lt-light-gray': 'hsl(var(--color-light-gray) / <alpha-value>)',
        'lt-lightest-gray': 'hsl(var(--color-lightest-gray) / <alpha-value>)',
        'lt-dark-gray': 'hsl(var(--color-dark-gray) / <alpha-value>)',
        'lt-darkest-gray': 'hsl(var(--color-darkest-gray) / <alpha-value>)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
