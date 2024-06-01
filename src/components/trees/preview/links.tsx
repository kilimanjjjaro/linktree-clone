'use client'

import { Fragment } from 'react'

import FeaturedLink from '@/components/trees/preview/link/featured-link'
import TextLink from '@/components/trees/preview/link/text-link'
import AddLink from '@/components/trees/preview/add-link'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store'

export default function TreeLinks() {
  const selectedTree = useStore((state) => state.selectedTree)

  if (selectedTree === null) {
    return (
      <div className='grid grid-cols-1 gap-y-5'>
        <Skeleton className='aspect-video h-full rounded-xl' />
        <Skeleton className='h-14 rounded-2xl' />
      </div>
    )
  }

  return (
    <>
      <main className='grid grid-cols-1 gap-y-5'>
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
      <AddLink />
    </>
  )
}
