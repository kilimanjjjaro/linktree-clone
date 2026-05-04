'use client'

import { toast } from 'sonner'

import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store-provider'
import { TREE_STATUS } from '@/lib/constants/trees'
import { cn } from '@/lib/utils/cn'
import useCurrentUser from '@/lib/hooks/useCurrentUser'

export default function TreeStatus() {
  const user = useCurrentUser()
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const isStoreReady = useStore((state) => state.isStoreReady)

  const published = selectedTree?.status === TREE_STATUS.PUBLISHED

  const toggleStatus = () => {
    if (selectedTree === null) return

    if (user === null) {
      toast.error('Must log in to publish trees.')
      return
    }

    const status = published ? TREE_STATUS.DRAFT : TREE_STATUS.PUBLISHED
    setSelectedTree({ ...selectedTree, status })
  }

  if (!isStoreReady) return <Skeleton className='h-9 w-30 rounded-full' />

  return (
    <button
      type='button'
      aria-pressed={published}
      aria-label={`Tree is ${published ? 'published' : 'in draft'}. Click to ${published ? 'switch to draft' : 'publish'}.`}
      title={
        published
          ? 'Published â€” click to switch to draft'
          : 'Draft â€” click to publish'
      }
      onClick={toggleStatus}
      className={cn(
        'border-lt-light-gray/60 focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray flex h-9 cursor-pointer items-center gap-x-2 rounded-full border px-3.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
