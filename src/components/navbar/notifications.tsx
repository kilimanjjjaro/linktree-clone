import { Bell, Check, ListChecks } from 'lucide-react'
import { TypographyH3 } from '@/components/ui/typography/typography-h3'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Tooltip from '@/components/ui/custom/tooltip'

export default function Notifications() {
  return (
    <Popover>
      <Tooltip content='Notifications'>
        <PopoverTrigger>
          <Bell className='size-5' strokeWidth={1.5} />
        </PopoverTrigger>
      </Tooltip>
      <PopoverContent collisionPadding={16} className='overflow-hidden p-0'>
        <div className='relative flex h-12 items-center justify-center border-b border-b-border p-3'>
          <TypographyH3 className='text-base leading-none'>
            Notifications
          </TypographyH3>
          <Button
            aria-label='Mark as read'
            className='absolute right-3 h-auto rounded-none p-1 transition-opacity xl:hover:bg-transparent xl:hover:opacity-70'
            variant='ghost'
          >
            <ListChecks className='size-5' />
          </Button>
        </div>
        <ul className='flex flex-col'>
          <li className='flex items-center gap-x-3 py-3 pl-4 pr-3 text-sm xl:hover:bg-accent/40'>
            <Button
              variant='ghost'
              className='block h-auto whitespace-normal p-0 text-left font-normal xl:hover:bg-transparent'
            >
              Now you can add more social media in your links.
            </Button>
          </li>
          <Separator />
          <li className='flex items-center gap-x-3 bg-accent/40 py-4 pl-4 pr-3 text-sm xl:hover:bg-accent/40'>
            <Button
              variant='ghost'
              className='block h-auto whitespace-normal p-0 text-left font-normal xl:hover:bg-transparent'
            >
              Now you can add more social media in your links.
            </Button>
            <Button
              aria-label='Mark as read'
              className='h-auto rounded-full p-1'
              variant='ghost'
            >
              <Check className='size-4' />
            </Button>
          </li>
          <Separator />
          <li className='flex items-center gap-x-3 py-4 pl-4 pr-3 text-sm xl:hover:bg-accent/40'>
            <Button
              variant='ghost'
              className='block h-auto whitespace-normal p-0 text-left font-normal xl:hover:bg-transparent'
            >
              Now you can add more social media in your links.
            </Button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}
