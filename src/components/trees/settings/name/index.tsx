'use client'

import { useDebouncedCallback } from 'use-debounce'
import { CircleHelp, LoaderCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'
import { delay } from '@/lib/utils/delay'
import { useStore } from '@/lib/store/store'
import { updateTree } from '@/lib/actions/trees/update-tree'

export default function TreeName() {
  const [isPending, startTransition] = useTransition()
  const selectedTree = useStore((state) => state.selectedTree)

  const changeTreeName = useDebouncedCallback((name: string) => {
    startTransition(async () => {
      await updateTree({ data: { name }, treeId: selectedTree?.id })
    })
  }, 300)

  if (selectedTree === null) return

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
      <form className='relative flex items-center'>
        <Input
          id='tree-name'
          type='text'
          placeholder='Tree Demonstration'
          onChange={(event) => changeTreeName(event.target.value)}
          value={selectedTree.name}
        />

        <LoaderCircle
          className={cn(
            'absolute right-3.5 size-4 transition-opacity animate-spin opacity-0',
            isPending && 'opacity-100'
          )}
          aria-hidden
        />
      </form>
    </section>
  )
}
