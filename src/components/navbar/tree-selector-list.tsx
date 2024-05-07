import { useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { LoaderCircle, X } from 'lucide-react'

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
import { deleteTree } from '@/lib/actions/trees/delete-tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type ExtendedTree } from '@/lib/types/trees'

interface Props {
  trees: ExtendedTree[]
  closePopover: () => void
}

export default function TreeSelectorList({ trees, closePopover }: Props) {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')
  const pathname = usePathname()
  const router = useRouter()
  const params = new URLSearchParams()

  const handleDelete = async (treeId: string) => {
    if (trees.length === 0) return

    startTransition(async () => {
      const response = await deleteTree(treeId)

      if (response.error.length > 0) toast.error(response.error)

      if (response.success.length > 0) {
        const rest = trees.filter((tree) => tree.id !== treeId)

        if (rest.length === 0) {
          params.set('slug', DEMO_TREE_VALUES.slug)
          router.replace(`${pathname}?slug=${DEMO_TREE_VALUES.slug}`)
        } else {
          params.set('slug', rest[0].slug)
          router.replace(`${pathname}?slug=${rest[0].slug}`)
        }

        toast.success(response.success)
      }
    })
  }

  const handleSelect = (slug: string) => {
    params.set('slug', slug)
    router.replace(`${pathname}?slug=${slug}`)

    closePopover()
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
                <Button
                  aria-label='deleteTree'
                  className='absolute right-3 h-auto rounded-full bg-lt-lightest-gray p-0.5 opacity-0 xl:group-hover:opacity-100'
                  onClick={async () => {
                    await handleDelete(tree.id)
                  }}
                  disabled={isPending}
                >
                  {isPending ? (
                    <LoaderCircle className='size-3 animate-spin' aria-hidden />
                  ) : (
                    <X className='size-3' strokeWidth={3} aria-hidden />
                  )}
                </Button>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  )
}
