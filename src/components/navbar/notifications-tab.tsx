import { Bell, Check, Clock, Dot } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Separator } from '../ui/separator'

export default function NotificationsTab() {
  return (
    <Popover>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger className='relative'>
              <Dot
                className='bg-lt-green absolute top-2 right-0.5 size-1.5 rounded-full'
                aria-hidden
              />
              <Bell className='size-5' aria-hidden />
              <div className='sr-only'>Notifications</div>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Notifications</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className='p-0'>
        <ul>
          <li className='text-lt-white relative flex items-center gap-x-4 p-4 opacity-40'>
            <div className='flex flex-col gap-y-2'>
              <p className='w-full text-sm font-light'>
                Lorem ipsum dolor sit amet, consectetur adipiscing.
              </p>
              <div className='flex w-full justify-between text-xs'>
                <span className='flex items-center gap-1 leading-none'>
                  <Clock className='size-3.5' />4 hours ago
                </span>
                <span className='border-lt-light-gray rounded-full border px-2 py-1 leading-none'>
                  New feature
                </span>
              </div>
            </div>
          </li>
          <Separator />
          <li className='group text-lt-white relative flex items-center gap-x-4 p-4'>
            <div className='flex flex-col gap-y-2'>
              <p className='w-full text-sm font-light'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                justo risus, fermentum sit amet.
              </p>
              <div className='flex w-full justify-between text-xs'>
                <span className='flex items-center gap-1 leading-none'>
                  <Clock className='size-3.5' />4 hours ago
                </span>
                <span className='border-lt-white rounded-full border px-2 py-1 leading-none'>
                  New feature
                </span>
              </div>
            </div>
            <Dot
              className='bg-lt-green absolute top-3.5 right-3.5 size-1.5 rounded-full opacity-100 transition-opacity xl:group-hover:opacity-0'
              aria-hidden
            />
            <Button
              aria-label='Mark as read'
              className='bg-lt-lightest-gray xl:hover:bg-lt-white absolute top-2 right-2 h-auto rounded-full p-0.5 opacity-0 xl:group-hover:opacity-100'
            >
              <Check className='size-3 translate-y-px' strokeWidth={3} />
            </Button>
          </li>
          <Separator />
          <li className='text-lt-white relative flex items-center gap-x-4 p-4 opacity-40'>
            <div className='flex flex-col gap-y-2'>
              <p className='w-full text-sm font-light'>
                Lorem ipsum dolor sit amet, consectetur. Mauris justo risus.
              </p>
              <div className='flex w-full justify-between text-xs'>
                <span className='flex items-center gap-1 leading-none'>
                  <Clock className='size-3.5' />4 hours ago
                </span>
                <span className='border-lt-light-gray rounded-full border px-2 py-1 leading-none'>
                  New feature
                </span>
              </div>
            </div>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}
