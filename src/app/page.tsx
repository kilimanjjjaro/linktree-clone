import { Suspense } from 'react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import TreeAppearance from '@/components/trees/appearance'
import TreePreview from '@/components/trees/preview'
import TreeSettings from '@/components/trees/settings'
import PreviewSkeleton from '@/components/ui/skeletons/preview-skeleton'

interface Props {
  searchParams: { slug: string | undefined }
}

export default async function Home({ searchParams }: Props) {
  const slug = searchParams.slug

  return (
    <>
      <Navbar slug={slug} />
      <main className='relative grid h-dvh min-h-dvh grid-cols-[auto_1fr_auto] items-start justify-center p-3 pt-[88px]'>
        <TreeAppearance />
        <Suspense fallback={<PreviewSkeleton />}>
          <TreePreview slug={slug} />
        </Suspense>
        <Suspense fallback={<PreviewSkeleton />}>
          <TreeSettings slug={slug} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
