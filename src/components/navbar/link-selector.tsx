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

const LINKS = [
  {
    id: 0,
    slug: 'demostration-link',
    name: 'Demostration link'
  },
  {
    id: 1,
    slug: 'demostration-link',
    name: 'Demostration link 2'
  },
  {
    id: 2,
    slug: 'demostration-link',
    name: 'Demostration link 3'
  },
  {
    id: 3,
    slug: 'demostration-link',
    name: 'Demostration link 4'
  }
]

export default function LinkSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(LINKS[0].name)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          aria-expanded={open}
          className='h-auto p-0 text-lg font-normal xl:hover:bg-transparent xl:hover:opacity-70'
        >
          {value}
          <ChevronsUpDown className='size-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-60 bg-lt-dark-gray p-0'>
        <Command>
          <CommandInput placeholder='Search link...' />
          <CommandList>
            <CommandEmpty>No link found.</CommandEmpty>
            <CommandGroup>
              {LINKS.map((link) => (
                <CommandItem
                  key={link.id}
                  value={link.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                >
                  {link.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
