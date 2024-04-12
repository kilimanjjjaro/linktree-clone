import { Check, Clock, Zap } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export default function Changelog() {
  return (
    <Popover>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger className='mr-1'>
              <Zap className='size-5' />
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>New Features</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className='p-0'>
        <ul>
          <li className='relative flex items-center gap-x-4 p-4 text-lt-lightest-gray'>
            <div className='flex flex-col gap-y-2'>
              <p className='w-full text-sm font-light'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                justo risus, fermentum sit amet.
              </p>
              <div className='flex w-full justify-between text-xs'>
                <span className='flex items-center gap-1 leading-none'>
                  <Clock className='size-3.5' />4 hours ago
                </span>
                <span className='rounded-full border border-lt-light-gray px-2 py-1 font-medium leading-none'>
                  Appearence
                </span>
              </div>
            </div>
          </li>
          <li className='group relative flex items-center gap-x-4 bg-lt-light-gray p-4 text-lt-white'>
            <div className='flex flex-col gap-y-2'>
              <p className='w-full text-sm font-light'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                justo risus, fermentum sit amet.
              </p>
              <div className='flex w-full justify-between text-xs'>
                <span className='flex items-center gap-1 leading-none'>
                  <Clock className='size-3.5' />4 hours ago
                </span>
                <span className='rounded-full border border-lt-white px-2 py-1 font-medium leading-none'>
                  Appearence
                </span>
              </div>
            </div>
            <Button
              aria-label='Mark as read'
              className='absolute right-2 top-2 h-auto rounded-full p-1 opacity-0 xl:group-hover:opacity-100'
            >
              <Check className='size-3 translate-y-px' strokeWidth={3} />
            </Button>
          </li>
          <li className='relative flex items-center gap-x-4 p-4 text-lt-lightest-gray'>
            <div className='flex flex-col gap-y-2'>
              <p className='w-full text-sm font-light'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                justo risus, fermentum sit amet.
              </p>
              <div className='flex w-full justify-between text-xs'>
                <span className='flex items-center gap-1 leading-none'>
                  <Clock className='size-3.5' />4 hours ago
                </span>
                <span className='rounded-full border border-lt-light-gray px-2 py-1 font-medium leading-none'>
                  Appearence
                </span>
              </div>
            </div>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}
