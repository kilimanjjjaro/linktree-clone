import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Poppins } from 'next/font/google'

export const geistSans = GeistSans.variable
export const geistMono = GeistMono.variable
export const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})
