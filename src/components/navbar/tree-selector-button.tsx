import { ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PopoverTrigger } from '@/components/ui/popover'

interface Props {
  treeName: string | undefined
}

export default function TreeSelectorButton({ treeName }: Props) {
  return (
    <PopoverTrigger asChild>
      <Button
        variant='ghost'
        role='combobox'
        className='h-full p-0 text-xl font-normal xl:hover:bg-transparent xl:hover:text-lt-lightest-gray'
      >
        <span className='max-w-60 truncate text-left'>{treeName}</span>
        <ChevronsUpDown className='size-4 shrink-0' aria-hidden />
      </Button>
    </PopoverTrigger>
  )
}
