import Wrapper from '@/components/wrapper'
import { inter } from '@/lib/utils/fonts'
import type { Metadata } from 'next'
import type { ChildrenType } from '@/lib/types/globals'
import './globals.css'

export default function RootLayout({ children }: Readonly<ChildrenType>) {
  return (
    <html lang='en'>
      <body
        className={`text-mnspc-white bg-mnspc-black font-sans antialiased ${inter}`}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Monospace Next.js Starter Template',
  description: 'Lorem ipsum'
}
