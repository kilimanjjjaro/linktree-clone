'use client'

import { useTransition } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { CircleHelp, LoaderCircle } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
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
        id: selectedTree.id,
        name: treeName
      })

      if (response !== null) {
        setSelectedTree(response)
        localStorage.setItem('__SELECTED_TREE__', JSON.stringify(response))
      }
    })
  }, 300)

  return (
    <section className='flex flex-col gap-y-3 p-5'>
      <div className='flex items-center gap-x-2'>
        <Label htmlFor='tree-name'>Name</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className='size-3.5' aria-hidden />
            <span className='sr-only'>Show help</span>
          </PopoverTrigger>
          <PopoverContent>
            This will be used as the name and for SEO of your tree. You can
            change it as many times as you want.
          </PopoverContent>
        </Popover>
      </div>
      <div className='relative flex items-center'>
        <Input
          id='tree-name'
          type='text'
          defaultValue={selectedTree?.name ?? ''}
          placeholder='Tree Demonstration'
          disabled={isPending}
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
