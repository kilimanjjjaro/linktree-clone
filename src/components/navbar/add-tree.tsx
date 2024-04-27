'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'
import { LoaderCircle, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addNewTree } from '@/lib/actions/trees/add-new'

export default function NewTree() {
  const [isPending, startTransition] = useTransition()

  const newTree = async () => {
    startTransition(async () => {
      const response = await addNewTree()

      if (response.error.length > 0) toast.error(response.error)
      if (response.success.length > 0) toast.success(response.success)
    })
  }

  return (
    <Button
      variant='outline'
      className='h-full'
      onClick={newTree}
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
