'use client'

import { ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store-provider'

export default function TreeSelectorButton() {
  const selectedTree = useStore((state) => state.selectedTree)
  const isStoreReady = useStore((state) => state.isStoreReady)

  if (!isStoreReady) return <Skeleton className='h-6 w-62 rounded-full' />

  return (
    <PopoverTrigger asChild>
      <Button
        variant='ghost'
        role='combobox'
        className='xl:hover:text-lt-lightest-gray h-full p-0 text-base font-normal md:text-xl xl:hover:bg-transparent'
      >
        <span className='max-w-32 truncate text-left md:max-w-60'>
          {selectedTree.name}
        </span>
        <ChevronsUpDown className='size-4 shrink-0' aria-hidden />
      </Button>
    </PopoverTrigger>
  )
}
