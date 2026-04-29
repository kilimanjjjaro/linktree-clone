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
  const user = useCurrentUser()
  const loadTree = useStore((state) => state.loadTree)
  const setShowSaveTreeDialog = useStore((state) => state.setShowSaveTreeDialog)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleCreate = () => {
    if (user === null) {
      toast.error('Must log in to create trees.')
      return
    }

    const localTree = localStorage.getItem('__LOCAL_TREE__')

    if (localTree !== null) {
      setShowSaveTreeDialog(true)
      return
    }

    startTransition(async () => {
      const response = await createDefaultTree()

      if (response.data === null) {
        toast.error(response.error)
        return
      }

      loadTree(response.data)

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
          <span className='hidden md:inline'>Creating</span>
          <LoaderCircle className='size-4 animate-spin' aria-hidden />
        </>
      ) : (
        <>
          <span className='hidden md:inline'>New tree</span>
          <Plus className='size-4' aria-hidden />
        </>
      )}
    </Button>
  )
}
