import { Suspense } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import SelectedTree from './tree-selector/selected'
import TreeList from './tree-selector/list'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList
} from '@/components/ui/command'

export default function TreeSelector() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          className='h-full p-0 text-xl font-normal transition-opacity xl:hover:bg-transparent xl:hover:opacity-70'
        >
          <Suspense fallback={<Skeleton className='h-6 w-52 rounded-2xl' />}>
            <SelectedTree />
          </Suspense>
          <ChevronsUpDown className='size-4' aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-60 p-0'>
        <Command>
          <CommandInput placeholder='Search tree...' />
          <CommandList>
            <Suspense
              fallback={
                <div className='h-10 w-full px-3 py-2.5'>
                  <Skeleton className='size-full rounded-full' />
                </div>
              }
            >
              <CommandEmpty>No trees found.</CommandEmpty>
              <CommandGroup>
                <TreeList />
              </CommandGroup>
            </Suspense>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
