'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store-provider'
import Image from 'next/image'

export default function TreeAvatar() {
  const selectedTree = useStore((state) => state.selectedTree)
  const isStoreReady = useStore((state) => state.isStoreReady)

  if (!isStoreReady) return <Skeleton className='size-28 rounded-full' />

  return (
    <div className='border-lt-light-gray/60 relative size-28 overflow-hidden rounded-full border'>
      <Image
        className='absolute size-full object-cover object-center'
        src={selectedTree.avatar}
        alt={`${selectedTree.name}'s avatar`}
        width={150}
        height={150}
        preload
      />
    </div>
  )
}
