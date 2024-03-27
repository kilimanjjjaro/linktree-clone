import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist-sans': ['var(--font-geist-sans)']
      },
      colors: {
        'linktree-black': 'hsl(var(--color-black) / <alpha-value>)',
        'linktree-white': 'hsl(var(--color-white) / <alpha-value>)',
        'linktree-light-gray': 'hsl(var(--color-light-gray) / <alpha-value>)',
        'linktree-dark-gray': 'hsl(var(--color-dark-gray) / <alpha-value>)',
        'linktree-green': 'hsl(var(--color-green) / <alpha-value>)'
      }
    }
  },
  plugins: []
}
export default config
