'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store'

export default function TreeDescription() {
  const selectedTree = useStore((state) => state.selectedTree)

  if (selectedTree === null) {
    return (
      <div className='mt-3 grid justify-items-center gap-y-1'>
        <Skeleton className='h-3.5 w-56 rounded-full' />
        <Skeleton className='h-3.5 w-48 rounded-full' />
      </div>
    )
  }

  return (
    <p className='mt-3 text-center text-sm text-balance text-zinc-400'>
      {selectedTree.description}
    </p>
  )
}
