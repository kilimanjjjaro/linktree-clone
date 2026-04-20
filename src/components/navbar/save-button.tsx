'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle, Save } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { syncTree } from '@/lib/actions/trees/sync-tree'
import { createTree } from '@/lib/actions/trees/create-tree'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { getTreeChanges } from '@/lib/utils/get-tree-changes'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export default function SaveButton() {
  const selectedTree = useStore((state) => state.selectedTree)
  const savedTree = useStore((state) => state.savedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setSavedTree = useStore((state) => state.setSavedTree)
  const hasUnsavedChanges = useStore((state) => state.hasUnsavedChanges)
  const setHasUnsavedChanges = useStore((state) => state.setHasUnsavedChanges)
  const user = useCurrentUser()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSave = () => {
    if (selectedTree === null || savedTree === null || isPending) return

    if (user === null) {
      localStorage.setItem('__LOCAL_TREE__', JSON.stringify(selectedTree))
      setSavedTree(selectedTree)
      setHasUnsavedChanges(false)
      return
    }

    const isNewTree = savedTree.id === DEMO_TREE_VALUES.id

    startTransition(async () => {
      let response

      if (isNewTree) {
        response = await createTree(selectedTree)
      } else {
        const changes = getTreeChanges(selectedTree, savedTree)

        if (changes === null) {
          setHasUnsavedChanges(false)
          return
        }

        response = await syncTree(changes)
      }

      if (response.data === null) {
        toast.error(response.error)
        return
      }

      setSelectedTree(response.data)
      setSavedTree(response.data)
      localStorage.removeItem('__LOCAL_TREE__')
      setHasUnsavedChanges(false)

      router.replace(`?tree=${response.data.url}`, { scroll: false })
    })
  }

  if (!hasUnsavedChanges) return null

  return (
    <Button
      variant={user !== null ? 'default' : 'secondary'}
      className='h-full'
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
          Save tree
          <Save className='size-4' aria-hidden />
        </>
      )}
    </Button>
  )
}
