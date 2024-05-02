'use client'

import { useTransition } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { LoaderCircle } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HelpPopover } from '@/components/ui/help-popover'
import { updateTree } from '@/lib/actions/trees/update-tree'
import { useStore } from '@/lib/store/store'
import { cn } from '@/lib/utils'

export default function TreeName() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const [isPending, startTransition] = useTransition()

  const handleUpdate = useDebouncedCallback((treeName: string) => {
    if (selectedTree === null) return

    startTransition(async () => {
      const response = await updateTree({
        ...selectedTree,
        name: treeName
      })

      if (response !== null) {
        setSelectedTree(response)
        localStorage.setItem('__SELECTED_TREE__', JSON.stringify(response))
      }

      if (response === null) {
        const localTree = localStorage.getItem('__SELECTED_TREE__')

        if (localTree === null) return

        const tree = JSON.parse(localTree)

        localStorage.setItem(
          '__SELECTED_TREE__',
          JSON.stringify({ ...tree, name: treeName })
        )
      }
    })
  }, 300)

  return (
    <section className='flex flex-col gap-y-3 p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='tree-name'>Name</Label>
        <HelpPopover>
          This will be used as the name and for SEO of your tree. You can change
          it as many times as you want.
        </HelpPopover>
      </div>
      <div className='relative flex items-center'>
        <Input
          id='tree-name'
          type='text'
          defaultValue={selectedTree?.name ?? ''}
          placeholder='Tree Demonstration'
          onChange={(event) => {
            handleUpdate(event.target.value)
          }}
        />
        <LoaderCircle
          className={cn(
            'absolute right-3.5 size-4 transition-opacity animate-spin opacity-0',
            isPending && 'opacity-100'
          )}
          aria-hidden
        />
      </div>
    </section>
  )
}
