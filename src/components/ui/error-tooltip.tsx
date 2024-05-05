import { Ban } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'

export const ErrorTooltip = ({ errors }: { errors: string[] }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger
          className={`absolute right-3.5 opacity-0 transition-opacity ${errors.length > 0 && 'opacity-100'}`}
        >
          <Ban className='size-3.5 text-red-400' aria-hidden />
          <span className='sr-only'>Show errors</span>
        </TooltipTrigger>
        <TooltipContent
          side='left'
          className='grid w-auto grid-cols-1 justify-items-end gap-y-1 rounded-none border-none bg-transparent p-0 shadow-none'
        >
          {errors.map((error) => (
            <span
              key={error}
              className='rounded-full border border-red-400/60 bg-red-500 px-1.5 py-0.5 text-[10px] leading-none'
            >
              {error}
            </span>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
