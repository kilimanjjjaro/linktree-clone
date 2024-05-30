'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store'

export default function TreeName() {
  const selectedTree = useStore((state) => state.selectedTree)

  if (selectedTree === null) {
    return <Skeleton className='mt-5 h-8 w-36 rounded-full' />
  }

  return (
    <h1 className='mt-5 text-center text-3xl font-semibold leading-none'>
      {selectedTree.name}
    </h1>
  )
}
