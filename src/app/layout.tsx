import Wrapper from '@/components/wrapper'
import { geistSans } from '@/lib/utils/fonts'
import type { Metadata } from 'next'
import type { ChildrenType } from '@/lib/types/globals'
import './globals.css'

export default function RootLayout({ children }: { children: ChildrenType }) {
  return (
    <html lang='en'>
      <meta name='color-scheme' content='dark light' />
      <body
        className={`bg-lt-black font-geist-sans text-lt-white antialiased ${geistSans}`}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Linktree',
  description:
    'Linktree makes room for all of you. Get everything you create, curate and share, wherever it’s scattered online, and put it back together again in one place – your Linktree – where it can be discovered with ease.'
}
