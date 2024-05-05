'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { LoaderCircle, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { createDefaultTree } from '@/lib/actions/trees/create-default-tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { DIALOG } from '@/lib/constants/globals'
import { type ExtendedTree } from '@/lib/types/trees'

export default function NewTree({ isLogged }: { isLogged: boolean }) {
  const setShowDialog = useStore((state) => state.setShowDialog)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [isPending, startTransition] = useTransition()

  const handleCreate = async () => {
    const localTree = localStorage.getItem('__SELECTED_TREE__')

    if (localTree != null && isLogged) {
      const parsedLocalTree = JSON.parse(localTree) as ExtendedTree

      if (parsedLocalTree.id === DEMO_TREE_VALUES.id) {
        setShowDialog(DIALOG.SAVE_TREE)
        return
      }
    }

    startTransition(async () => {
      const response = await createDefaultTree()

      if (response.data === null) {
        toast.warning(response.error)
      } else {
        setSelectedTree(response.data)
        localStorage.setItem('__SELECTED_TREE__', JSON.stringify(response.data))
        toast.success(response.success)
      }
    })
  }

  return (
    <Button
      variant='secondary'
      className='h-full'
      onClick={handleCreate}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <LoaderCircle className='size-4 animate-spin' aria-hidden />
          Creating
        </>
      ) : (
        <>
          New tree
          <Plus className='size-4' aria-hidden />
        </>
      )}
    </Button>
  )
}
