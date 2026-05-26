import Wrapper from '@/components/wrapper'
import { geistSans } from '@/lib/utils/fonts'
import { BASE_URL } from '@/lib/constants/globals'
import type { Metadata } from 'next'
import type { ChildrenType } from '@/lib/types/globals'
import './globals.css'

export default function RootLayout({ children }: { children: ChildrenType }) {
  return (
    <html lang='en'>
      <meta name='color-scheme' content='dark light' />
      <body
        className={`font-geist-sans text-lt-white bg-lt-black antialiased ${geistSans}`}
      >
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    template: '%s — Linktree Clone',
    default: 'Linktree Clone'
  },
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/'
  },
  description:
    'Linktree makes room for all of you. Get everything you create, curate and share, wherever it’s scattered online, and put it back together again in one place – your Linktree – where it can be discovered with ease.',
  openGraph: {
    title: {
      template: '%s — Linktree Clone',
      default: 'Linktree Clone'
    },
    description:
      'Linktree makes room for all of you. Get everything you create, curate and share, wherever it’s scattered online, and put it back together again in one place – your Linktree – where it can be discovered with ease.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1000,
        height: 563
      }
    ],
    siteName: 'Linktree Clone',
    type: 'website',
    url: BASE_URL
  }
}
