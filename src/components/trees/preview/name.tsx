'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store-provider'
import { cn } from '@/lib/utils/cn'

export default function TreeName() {
  const selectedTree = useStore((state) => state.selectedTree)
  const isStoreReady = useStore((state) => state.isStoreReady)

  const isContentContainerEnabled =
    selectedTree.appearance.general.contentContainer.enabled

  if (!isStoreReady) {
    return (
      <Skeleton
        className={cn(
          'h-8 w-36 rounded-full',
          !isContentContainerEnabled && 'mt-5'
        )}
      />
    )
  }

  return (
    <h1
      className={cn(
        'text-center text-3xl leading-none font-semibold mix-blend-difference',
        !isContentContainerEnabled && 'mt-5'
      )}
    >
      {selectedTree.name}
    </h1>
  )
}
