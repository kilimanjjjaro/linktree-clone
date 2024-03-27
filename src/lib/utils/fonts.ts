import { Inter } from 'next/font/google'

const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const inter = interFont.variable
