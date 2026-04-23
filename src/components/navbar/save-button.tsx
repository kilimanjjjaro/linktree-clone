'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle, Save } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { syncTree } from '@/lib/actions/trees/sync-tree'
import { createTree } from '@/lib/actions/trees/create-tree'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { getTreeChanges } from '@/lib/utils/get-tree-changes'
import { cn } from '@/lib/utils'

export default function SaveButton() {
  const selectedTree = useStore((state) => state.selectedTree)
  const savedTree = useStore((state) => state.savedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setSavedTree = useStore((state) => state.setSavedTree)
  const hasUnsavedChanges = useStore((state) => state.hasUnsavedChanges)
  const user = useCurrentUser()
  const [isPending, startTransition] = useTransition()
  const [hasBeenVisible, setHasBeenVisible] = useState(hasUnsavedChanges)
  const router = useRouter()

  if (hasUnsavedChanges && !hasBeenVisible) setHasBeenVisible(true)

  const handleSave = () => {
    if (selectedTree === null || savedTree === null || isPending) return

    if (user === null) {
      localStorage.setItem('__LOCAL_TREE__', JSON.stringify(selectedTree))
      setSavedTree(selectedTree)
      return
    }

    const isNewTree = savedTree.id === DEMO_TREE_VALUES.id

    startTransition(async () => {
      let response

      if (isNewTree) {
        response = await createTree(selectedTree)
      } else {
        const changes = getTreeChanges(selectedTree, savedTree)

        if (changes === null) return

        response = await syncTree(changes)
      }

      if (response.data === null) {
        toast.error(response.error)
        return
      }

      setSelectedTree(response.data)
      setSavedTree(response.data)
      localStorage.removeItem('__LOCAL_TREE__')

      router.replace(`?tree=${response.data.url}`, { scroll: false })
    })
  }

  return (
    <div className='fixed inset-x-0 top-15 flex w-screen justify-center'>
      <Button
        className={cn(
          'bg-lt-white',
          !hasBeenVisible && 'pointer-events-none opacity-0',
          hasBeenVisible &&
            (hasUnsavedChanges
              ? 'animate-slide-in-from-top'
              : 'pointer-events-none animate-slide-out-to-bottom')
        )}
        onClick={handleSave}
        disabled={isPending}
      >
        {isPending ? (
          <>
            Saving
            <LoaderCircle className='size-4 animate-spin' aria-hidden />
          </>
        ) : (
          <>
            Save changes
            <Save className='size-4' aria-hidden />
          </>
        )}
      </Button>
    </div>
  )
}
