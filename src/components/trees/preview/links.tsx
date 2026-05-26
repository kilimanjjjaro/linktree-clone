'use client'

import { Fragment } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import FeaturedLink from '@/components/trees/preview/link/featured-link'
import TextLink from '@/components/trees/preview/link/text-link'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store-provider'

export default function TreeLinks() {
  const selectedTree = useStore((state) => state.selectedTree)
  const isStoreReady = useStore((state) => state.isStoreReady)
  const [parent] = useAutoAnimate({ duration: 200 })

  if (!isStoreReady) {
    return (
      <div className='grid grid-cols-1 gap-y-5'>
        <Skeleton className='aspect-video h-full rounded-2xl' />
        <Skeleton className='h-14 rounded-2xl' />
      </div>
    )
  }

  return (
    <main ref={parent} className='mb-20 grid grid-cols-1 gap-y-4 xl:mb-6'>
      {selectedTree.links.map((link) => (
        <Fragment key={link.id}>
          {link.featured ? (
            <FeaturedLink link={link} />
          ) : (
            <TextLink link={link} />
          )}
        </Fragment>
      ))}
    </main>
  )
}
