'use client'

import { Eye } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { cn } from '@/lib/utils'

export default function ViewTree() {
  const selectedTree = useStore((state) => state.selectedTree)
  const isStoreReady = useStore((state) => state.isStoreReady)
  const user = useCurrentUser()

  if (!isStoreReady) return <Skeleton className='size-9 rounded-full' />

  const isDisabled =
    selectedTree === null || selectedTree.url.length === 0

  const handleClick = () => {
    if (isDisabled) return

    if (user === null) {
      localStorage.setItem('__LOCAL_TREE__', JSON.stringify(selectedTree))
    }

    window.open(`/${selectedTree.url}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      type='button'
      disabled={isDisabled}
      onClick={handleClick}
      aria-label='View tree in a new tab'
      title='View tree'
      className={cn(
        'border-lt-light-gray/60 focus-visible:ring-lt-white focus-visible:ring-offset-lt-gray flex size-9 items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2',
        isDisabled
          ? 'text-lt-lightest-gray/40 cursor-not-allowed'
          : 'text-lt-lightest-gray xl:hover:bg-lt-light-gray xl:hover:text-lt-white cursor-pointer'
      )}
    >
      <Eye className='size-4' aria-hidden />
    </button>
  )
}
