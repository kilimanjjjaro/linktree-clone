'use client'

import { Button } from '@/components/ui/button'
import { CommandItem } from '@/components/ui/command'
import { deleteTree } from '@/lib/actions/trees/delete-tree'
import { type ExtendedTreeType } from '@/lib/types/trees'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

export default function Tree({ tree }: { tree: ExtendedTreeType }) {
  const [isPending, startTransition] = useTransition()
  const deleteTreeById = deleteTree.bind(null, tree.id)

  const handleDelete = async () => {
    startTransition(async () => {
      const response = await deleteTreeById()

      if (response.error.length > 0) toast.error(response.error)
      if (response.success.length > 0) toast.success(response.success)
    })
  }
  return (
    <CommandItem
      className={cn('group', isPending && 'animate-pulse')}
      key={tree.id}
      value={tree.id}
      disabled={isPending}
    >
      {tree.name}
      <Button
        aria-label='deleteTree'
        className='absolute right-3 h-auto rounded-full bg-lt-lightest-gray p-0.5 opacity-0 xl:group-hover:opacity-100'
        onClick={handleDelete}
      >
        <X className='size-3' strokeWidth={3} aria-hidden />
      </Button>
    </CommandItem>
  )
}
