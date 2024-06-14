'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store'
import Image from 'next/image'

export default function TreeAvatar () {
  const selectedTree = useStore((state) => state.selectedTree)

  if (selectedTree === null) {
    return <Skeleton className='size-28 rounded-full' />
  }

  return (
    <div className='relative size-28 overflow-hidden rounded-full border border-lt-light-gray/60'>
      <Image
        className='absolute size-full object-cover object-center'
        src={selectedTree.avatar}
        alt={`${selectedTree.name}'s avatar`}
        width={150}
        height={150}
        priority
      />
    </div>
  )
}
