'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { LoaderCircle, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createTree } from '@/lib/actions/trees/create-tree'

export default function NewTree() {
  const [isPending, startTransition] = useTransition()

  const handleCreate = async () => {
    startTransition(async () => {
      const response = await createTree()

      if (response.error.length > 0) toast.error(response.error)
      if (response.success.length > 0) toast.success(response.success)
    })
  }

  return (
    <Button
      variant='outline'
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
