'use client'

import { useEffect, useTransition } from 'react'
import { useDebounce } from 'use-debounce'
import { CircleHelp, LoaderCircle } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useStore } from '@/lib/store/store'
import { cn } from '@/lib/utils'
import { updateTree } from '@/lib/actions/trees/update-tree'

export default function TreeName() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [isPending, startTransition] = useTransition()
  const [debounced] = useDebounce(selectedTree, 300)

  useEffect(() => {
    if (debounced === null) return

    startTransition(async () => {
      await updateTree(debounced)
    })
  }, [debounced])

  const renderLoader = isPending || selectedTree === null

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
        {selectedTree !== null ? (
          <Input
            id='tree-name'
            type='text'
            value={selectedTree.name}
            placeholder='Tree Demonstration'
            disabled={isPending}
            onChange={(event) => {
              setSelectedTree({ ...selectedTree, name: event.target.value })
            }}
          />
        ) : (
          <Skeleton className='h-10 w-full rounded-full' />
        )}
        <LoaderCircle
          className={cn(
            'absolute right-3.5 size-4 transition-opacity animate-spin opacity-0',
            renderLoader && 'opacity-100'
          )}
          aria-hidden
        />
      </div>
    </section>
  )
}
