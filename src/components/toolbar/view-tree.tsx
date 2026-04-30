'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { syncTree } from '@/lib/actions/trees/sync-tree'
import { createTree } from '@/lib/actions/trees/create-tree'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { getTreeChanges } from '@/lib/utils/get-tree-changes'
import { cn } from '@/lib/utils'

export default function ViewTree() {
  const selectedTree = useStore((state) => state.selectedTree)
  const savedTree = useStore((state) => state.savedTree)
  const loadTree = useStore((state) => state.loadTree)
  const isStoreReady = useStore((state) => state.isStoreReady)
  const user = useCurrentUser()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  if (!isStoreReady) return <Skeleton className='size-9 rounded-full' />

  const isDisabled =
    selectedTree === null || selectedTree.url.length === 0 || isPending

  const openInNewTab = (url: string, target?: Window | null) => {
    if (target != null) {
      target.location.href = url
      return
    }

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleClick = () => {
    if (isDisabled) return

    if (user === null) {
      localStorage.setItem('__LOCAL_TREE__', JSON.stringify(selectedTree))
      openInNewTab(`/${selectedTree.url}`)
      return
    }

    const isNewTree = savedTree === null || savedTree.id === DEMO_TREE_VALUES.id
    const changes =
      !isNewTree && savedTree !== null
        ? getTreeChanges(selectedTree, savedTree)
        : null
    const hasUnsavedChanges = isNewTree || changes !== null

    if (!hasUnsavedChanges && savedTree !== null) {
      openInNewTab(`/${savedTree.url}`)
      return
    }

    const isValid = UpdateTreeSchema.safeParse({
      name: selectedTree.name,
      url: selectedTree.url,
      description: selectedTree.description
    }).success

    if (!isValid) {
      toast.error('Tree has invalid fields. Please fix them before viewing.')
      return
    }

    const pendingTab = window.open('about:blank', '_blank')

    startTransition(async () => {
      const response = isNewTree
        ? await createTree(selectedTree)
        : await syncTree(changes!)

      if (response.data === null) {
        toast.error(response.error)
        pendingTab?.close()
        return
      }

      loadTree(response.data)
      localStorage.removeItem('__LOCAL_TREE__')
      router.replace(`?tree=${response.data.url}`, { scroll: false })

      openInNewTab(`/${response.data.url}`, pendingTab)
    })
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
      {isPending ? (
        <LoaderCircle className='size-4 animate-spin' aria-hidden />
      ) : (
        <Eye className='size-4' aria-hidden />
      )}
    </button>
  )
}
