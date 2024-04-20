'use client'

import { useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

const TREES = [
  {
    id: 0,
    slug: 'example-tree',
    name: 'Example Tree'
  }
]

export default function TreeSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(TREES[0].name)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          aria-expanded={open}
          className='h-full p-0 text-xl font-normal transition-opacity xl:hover:bg-transparent xl:hover:opacity-70'
        >
          {value}
          <ChevronsUpDown className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-60 p-0'>
        <Command>
          <CommandInput placeholder='Search tree...' />
          <CommandList>
            <CommandEmpty>No trees found.</CommandEmpty>
            <CommandGroup>
              {TREES.map((tree) => (
                <CommandItem
                  key={tree.id}
                  value={tree.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                >
                  {tree.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
