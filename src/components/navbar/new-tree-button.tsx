'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LoaderCircle, Plus } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { createDefaultTree } from '@/lib/actions/trees/create-default-tree'
import { useStore } from '@/lib/store/store'
import useCurrentUser from '@/lib/hooks/useCurrentUser'

export default function NewTreeButton() {
  const hasUnsavedChanges = useStore((state) => state.hasUnsavedChanges)
  const user = useCurrentUser()
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setSavedTree = useStore((state) => state.setSavedTree)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  if (hasUnsavedChanges) return null

  const handleCreate = () => {
    startTransition(async () => {
      const response = await createDefaultTree()

      if (response.data === null) {
        toast.error(response.error)
        return
      }

      setSelectedTree(response.data)
      setSavedTree(response.data)

      router.replace(`?tree=${response.data.url}`, { scroll: false })
    })
  }

  return (
    <Button
      variant={user !== null ? 'default' : 'secondary'}
      className='h-full'
      onClick={handleCreate}
      disabled={isPending}
    >
      {isPending ? (
        <>
          Creating
          <LoaderCircle className='size-4 animate-spin' aria-hidden />
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
