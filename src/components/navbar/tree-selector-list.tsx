'use client'

import { useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { LoaderCircle, X } from 'lucide-react'
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
  slug: string | undefined
  trees: TreeInterface[]
}

export default function TreeSelectorList({ slug, trees }: Props) {
  const setShowSaveTreeDialog = useStore((state) => state.setShowSaveTreeDialog)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const router = useRouter()

  const handleDelete = async (treeId: string) => {
    if (trees.length === 0) return

    const params = new URLSearchParams()

    startTransition(async () => {
      const response = await deleteTree(treeId)

      if (response.error.length > 0) toast.error(response.error)

      if (response.success.length > 0) {
        const rest = trees.filter((tree) => tree.id !== treeId)
        const currentTree = rest.find((tree) => tree.slug === slug)

        if (rest.length === 0) {
          setSelectedTree(DEMO_TREE_VALUES)
          params.set('slug', DEMO_TREE_VALUES.slug)
          router.replace(`${pathname}?slug=${DEMO_TREE_VALUES.slug}`, {
            scroll: false
          })
        } else {
          if (currentTree === undefined) {
            setSelectedTree(rest[0])
            params.set('slug', rest[0].slug)
            router.replace(`${pathname}?slug=${rest[0].slug}`, {
              scroll: false
            })
          } else {
            setSelectedTree(currentTree)
            params.set('slug', currentTree.slug)
            router.replace(`${pathname}?slug=${currentTree.slug}`, {
              scroll: false
            })
          }
        }

        toast.success(response.success)
      }
    })
  }

  const handleSelect = (slug: string) => {
    const localTree = localStorage.getItem('__LOCAL_TREE__')

    if (localTree !== null) {
      setShowSaveTreeDialog(true)
      return
    }

    const params = new URLSearchParams()
    params.set('slug', slug)
    router.replace(`${pathname}?slug=${slug}`, {
      scroll: false
    })
  }

  return (
    <PopoverContent align='start' className='w-60 p-0'>
      <Command value={slug ?? DEMO_TREE_VALUES.slug}>
        <CommandInput placeholder='Search tree...' />
        <CommandList>
          <CommandEmpty>No trees found.</CommandEmpty>
          <CommandGroup>
            {trees.map((tree) => (
              <CommandItem
                className='group'
                key={tree.id}
                value={tree.slug}
                disabled={isPending}
                onSelect={(value) => {
                  handleSelect(value)
                }}
              >
                {tree.name}
                {isPending && (
                  <LoaderCircle className='absolute right-3 size-5 animate-spin text-lt-lightest-gray opacity-0 group-aria-selected:opacity-100' />
                )}
                {!isPending && (
                  <Button
                    aria-label='deleteTree'
                    className='absolute right-3 h-auto rounded-full bg-lt-lightest-gray p-0.5 opacity-0 xl:group-hover:opacity-100'
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
