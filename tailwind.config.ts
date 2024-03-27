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
        inter: ['var(--font-inter-sans)']
      },
      colors: {
        'mnspc-black': 'hsl(var(--color-black) / <alpha-value>)',
        'mnspc-white': 'hsl(var(--color-white) / <alpha-value>)'
      }
    }
  },
  plugins: []
}
export default config
