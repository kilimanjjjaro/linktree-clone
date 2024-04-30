import { useTransition } from 'react'
import { X } from 'lucide-react'
import { toast } from 'sonner'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { cn } from '@/lib/utils'
import { deleteTree } from '@/lib/actions/trees/delete-tree'
import { type LocalTreeInterface } from '@/lib/types/trees'

interface Props {
  trees: LocalTreeInterface[]
  setShowList: (value: boolean) => void
}

export default function TreeSelectorList({ trees, setShowList }: Props) {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [isPending, startTransition] = useTransition()

  const handleDelete = async (treeId: string) => {
    startTransition(async () => {
      const response = await deleteTree(treeId)

      if (response.error.length > 0) toast.error(response.error)
      if (response.success.length > 0) toast.success(response.success)
    })
  }

  const handleSelect = (tree: LocalTreeInterface) => {
    setSelectedTree(tree)
    localStorage.setItem('__SELECTED_TREE__', JSON.stringify(tree))
    setShowList(false)
  }

  return (
    <Command>
      <CommandInput placeholder='Search tree...' />
      <CommandList>
        <CommandEmpty>No trees found.</CommandEmpty>
        <CommandGroup>
          {trees.map((tree) => (
            <CommandItem
              className={cn(
                'group',
                isPending && 'animate-pulse cursor-not-allowed'
              )}
              key={tree.id}
              value={tree.id}
              disabled={isPending}
              onSelect={() => {
                handleSelect(tree)
              }}
            >
              {tree.name}
              <Button
                aria-label='deleteTree'
                className='absolute right-3 h-auto rounded-full bg-lt-lightest-gray p-0.5 opacity-0 xl:group-hover:opacity-100'
                onClick={async () => {
                  await handleDelete(tree.id)
                }}
              >
                <X className='size-3' strokeWidth={3} aria-hidden />
              </Button>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
