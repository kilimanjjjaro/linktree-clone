'use client'

import { useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Check, LoaderCircle, X } from 'lucide-react'
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
import { PopoverContent } from '@/components/ui/popover'
import { useStore } from '@/lib/store/store'
import { deleteTree } from '@/lib/actions/trees/delete-tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type TreeInterface } from '@/lib/types/trees'

interface Props {
  treeUrl: string | undefined
  trees: TreeInterface[]
}

export default function TreeSelectorList({ treeUrl, trees }: Props) {
  const selectedTree = useStore((state) => state.selectedTree)
  const setShowSaveTreeDialog = useStore((state) => state.setShowSaveTreeDialog)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setSavedTree = useStore((state) => state.setSavedTree)
  const setHasUnsavedChanges = useStore((state) => state.setHasUnsavedChanges)
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const router = useRouter()

  const handleDelete = async (treeId: string) => {
    if (trees.length === 0) return
    const params = new URLSearchParams()

    const updateParams = (tree: TreeInterface) => {
      setSelectedTree(tree)
      setSavedTree(tree)
      setHasUnsavedChanges(false)

      params.set('tree', tree.url)
      router.replace(`${pathname}?tree=${tree.url}`, {
        scroll: false
      })
    }

    startTransition(async () => {
      const response = await deleteTree(treeId)

      if (response.error.length > 0) toast.error(response.error)

      if (response.success.length > 0) {
        const rest = trees.filter((tree) => tree.id !== treeId)
        const currentTree = rest.find((tree) => tree.id === treeId)

        if (rest.length === 0) {
          updateParams(DEMO_TREE_VALUES)
        } else {
          if (currentTree === undefined) {
            updateParams(rest[0])
          } else {
            updateParams(currentTree)
          }
        }
      }
    })
  }

  const handleSelect = (treeUrl: string) => {
    const localTree = localStorage.getItem('__LOCAL_TREE__')

    if (localTree !== null) {
      setShowSaveTreeDialog(true)
      return
    }

    const params = new URLSearchParams()
    params.set('tree', treeUrl)
    router.replace(`${pathname}?tree=${treeUrl}`, {
      scroll: false
    })
  }

  return (
    <PopoverContent align='start' className='w-60 p-0'>
      <Command value={treeUrl ?? DEMO_TREE_VALUES.url}>
        <CommandInput placeholder='Search tree...' />
        <CommandList>
          <CommandEmpty>No trees found.</CommandEmpty>
          <CommandGroup>
            {trees.map((tree) => (
              <CommandItem
                className='group'
                key={tree.url}
                value={tree.url}
                disabled={isPending}
                onSelect={(value) => {
                  handleSelect(value)
                }}
              >
                {selectedTree?.id === tree.id && (
                  <Check
                    className='mr-2 size-3.5'
                    strokeWidth={3}
                    aria-hidden
                  />
                )}
                {tree.name}
                {isPending && (
                  <LoaderCircle className='text-lt-lightest-gray absolute right-3 size-5 animate-spin opacity-0 group-aria-selected:opacity-100' />
                )}
                {!isPending && (
                  <Button
                    aria-label='deleteTree'
                    className='bg-lt-lightest-gray absolute right-3 h-auto rounded-full p-0.5 opacity-0 xl:group-hover:opacity-100'
                    onClick={async () => {
                      await handleDelete(tree.id)
                    }}
                    disabled={isPending}
                  >
                    <X className='size-3' strokeWidth={3} aria-hidden />
                  </Button>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  )
}
