'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle, Save, Undo2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store-provider'
import { syncTree } from '@/lib/actions/trees/sync-tree'
import { createTree } from '@/lib/actions/trees/create-tree'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { getTreeChanges } from '@/lib/utils/get-tree-changes'
import { cn } from '@/lib/utils/cn'

export default function SaveButton() {
  const selectedTree = useStore((state) => state.selectedTree)
  const savedTree = useStore((state) => state.savedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setSavedTree = useStore((state) => state.setSavedTree)
  const loadTree = useStore((state) => state.loadTree)
  const hasUnsavedChanges = useStore(
    (state) => getTreeChanges(state.selectedTree, state.savedTree) !== null
  )
  const user = useCurrentUser()
  const [isPending, startTransition] = useTransition()
  const [hasBeenVisible, setHasBeenVisible] = useState(hasUnsavedChanges)
  const router = useRouter()

  const isValid = UpdateTreeSchema.safeParse({
    name: selectedTree.name,
    url: selectedTree.url,
    description: selectedTree.description
  }).success

  const shouldShow = hasUnsavedChanges && isValid

  if (shouldShow && !hasBeenVisible) setHasBeenVisible(true)

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

      loadTree(response.data)
      localStorage.removeItem('__LOCAL_TREE__')

      router.replace(`?tree=${response.data.url}`, { scroll: false })
    })
  }

  const handleRevert = () => {
    if (savedTree === null || isPending) return
    setSelectedTree(savedTree)
  }

  return (
    <div className='fixed inset-x-0 top-15 flex w-screen justify-center'>
      <div
        className={cn(
          'flex gap-x-2',
          !hasBeenVisible && 'pointer-events-none opacity-0',
          hasBeenVisible &&
            (shouldShow
              ? 'animate-slide-in-from-top'
              : 'animate-slide-out-to-bottom pointer-events-none')
        )}
      >
        <Button
          variant='destructive'
          onClick={handleRevert}
          disabled={isPending}
        >
          Revert
          <Undo2 className='size-4' aria-hidden />
        </Button>
        <Button
          className='bg-lt-white'
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
    </div>
  )
}
