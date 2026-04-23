'use client'

import { useEffect, useState } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store'
import { TREE_STATUS } from '@/lib/constants/trees'
import { cn } from '@/lib/utils'

export default function TreeStatus() {
  const selectedTree = useStore((state) => state.selectedTree)
  const savedTree = useStore((state) => state.savedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setHasUnsavedChanges = useStore((state) => state.setHasUnsavedChanges)
  const isStoreReady = useStore((state) => state.isStoreReady)
  const [published, setPublished] = useState(false)

  const toggleStatus = () => {
    if (selectedTree === null) return

    const next = !published
    setPublished(next)

    const status = next ? TREE_STATUS.PUBLISHED : TREE_STATUS.DRAFT
    setSelectedTree({ ...selectedTree, status })
    setHasUnsavedChanges(status !== savedTree?.status)
  }

  useEffect(() => {
    if (selectedTree === null) return

    setPublished(selectedTree.status === TREE_STATUS.PUBLISHED)
  }, [selectedTree])

  if (!isStoreReady) return <Skeleton className='ml-3 h-9 w-30 rounded-full' />

  return (
    <button
      type='button'
      aria-pressed={published}
      aria-label={`Tree is ${published ? 'published' : 'in draft'}. Click to ${published ? 'switch to draft' : 'publish'}.`}
      title={
        published
          ? 'Published — click to switch to draft'
          : 'Draft — click to publish'
      }
      onClick={toggleStatus}
      className={cn(
        'border-lt-light-gray/60 focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray ml-3 flex h-9 cursor-pointer items-center gap-x-2 rounded-full border px-3.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2',
        published
          ? 'text-lt-green xl:hover:bg-lt-green/10'
          : 'text-lt-lightest-gray xl:hover:bg-lt-light-gray'
      )}
    >
      <span
        className={cn(
          'relative flex size-2 shrink-0 items-center justify-center rounded-full',
          published ? 'bg-lt-green' : 'bg-lt-lightest-gray'
        )}
      >
        {published && (
          <span
            className='bg-lt-green absolute inline-flex h-full w-full animate-ping rounded-full opacity-60'
            aria-hidden
          />
        )}
      </span>
      {published ? 'Published' : 'Draft'}
    </button>
  )
}
