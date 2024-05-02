import { CircleHelp } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { type ChildrenType } from '@/lib/types/globals'

export const HelpPopover = ({ children }: { children: ChildrenType }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <CircleHelp className='size-3.5' aria-hidden />
        <span className='sr-only'>Show help</span>
      </PopoverTrigger>
      <PopoverContent>{children}</PopoverContent>
    </Popover>
  )
}
