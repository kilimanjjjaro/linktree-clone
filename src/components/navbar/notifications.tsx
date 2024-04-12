import { Check, Zap } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export default function Notifications() {
  return (
    <Popover>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger className='mr-3'>
              <Zap className='size-5' />
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>New features</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent collisionPadding={16} className='overflow-hidden p-0'>
        <ul className='flex flex-col'>
          <li className='flex items-center gap-x-3 p-4 text-sm xl:hover:bg-lt-light-gray/40'>
            <Button
              variant='ghost'
              className='block h-auto whitespace-normal p-0 text-left font-normal xl:hover:bg-transparent'
            >
              Now you can add more social media in your links.
            </Button>
          </li>
          <Separator />
          <li className='flex items-center gap-x-3 bg-lt-light-gray/40 p-4 text-sm xl:hover:bg-lt-light-gray/60'>
            <Button
              variant='ghost'
              className='block h-auto whitespace-normal p-0 text-left font-normal xl:hover:bg-transparent'
            >
              Now you can add more social media in your links.
            </Button>
            <Button
              aria-label='Mark as read'
              className='h-auto rounded-full p-1 xl:hover:bg-lt-white/20'
              variant='outline'
            >
              <Check className='size-3' />
            </Button>
          </li>
          <Separator />
          <li className='flex items-center gap-x-3 p-4 text-sm xl:hover:bg-lt-light-gray/40'>
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
