import { CircleUserRound, Palette, Settings2, Sticker, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export default function Toolbar() {
  return (
    <aside className='fixed bottom-0 left-0 top-14 z-50 flex w-14 flex-col justify-between border-r border-lt-light-gray bg-lt-gray p-2'>
      <TooltipProvider delayDuration={0}>
        <nav className='flex flex-col gap-y-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                className='aspect-square h-auto w-full bg-lt-light-gray p-0'
              >
                <Sticker className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>Profile</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                className='aspect-square h-auto w-full p-0'
              >
                <Palette className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>Settings</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                className='aspect-square h-auto w-full p-0'
              >
                <Settings2 className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>Settings</TooltipContent>
          </Tooltip>
        </nav>
        <nav className='flex flex-col gap-y-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                className='aspect-square h-auto w-full p-0'
              >
                <Zap className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>New features</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='ghost'
                className='aspect-square h-auto w-full p-0'
              >
                <CircleUserRound className='size-5' />
              </Button>
            </TooltipTrigger>
            <TooltipContent side='right'>Account</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  )
}
