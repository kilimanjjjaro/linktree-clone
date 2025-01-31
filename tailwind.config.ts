import tailwindcssAnimate from 'tailwindcss-animate';
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
  },
  plugins: [tailwindcssAnimate]
} satisfies Config

export default config
