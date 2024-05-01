import { useTransition } from 'react'
import { toast } from 'sonner'
import { X } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { PopoverContent } from '@/components/ui/popover'
import { useStore } from '@/lib/store/store'
import { deleteTree } from '@/lib/actions/trees/delete-tree'
import { cn } from '@/lib/utils'
import { type ExtendedTree } from '@/lib/types/trees'

interface Props {
  trees: ExtendedTree[]
  closePopover: () => void
}

export default function TreeSelectorList({ trees, closePopover }: Props) {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [isPending, startTransition] = useTransition()

  const handleDelete = async (treeId: string) => {
    startTransition(async () => {
      const response = await deleteTree(treeId)

      if (response.error.length > 0) toast.error(response.error)
      if (response.success.length > 0) toast.success(response.success)
    })
  }

  const handleSelect = (tree: ExtendedTree) => {
    closePopover()
    setSelectedTree(tree)
    localStorage.setItem('__SELECTED_TREE__', JSON.stringify(tree))
  }

  return (
    <PopoverContent align='start' className='w-60 p-0'>
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
    </PopoverContent>
  )
}
