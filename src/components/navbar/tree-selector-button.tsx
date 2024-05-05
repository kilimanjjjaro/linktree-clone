import { ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { PopoverTrigger } from '@/components/ui/popover'
import { useStore } from '@/lib/store/store'

export default function TreeSelectorButton() {
  const selectedTree = useStore((state) => state.selectedTree)

  if (selectedTree === null) {
    return <Skeleton className='h-6 w-[232px] rounded-2xl' />
  }

  return (
    <PopoverTrigger asChild>
      <Button
        variant='ghost'
        role='combobox'
        className='h-full p-0 text-xl font-normal xl:hover:bg-transparent xl:hover:text-lt-lightest-gray'
      >
        <span className='max-w-60 truncate text-left'>{selectedTree.name}</span>
        <ChevronsUpDown className='size-4 shrink-0' aria-hidden />
      </Button>
    </PopoverTrigger>
  )
}
