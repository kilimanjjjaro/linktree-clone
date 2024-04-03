import {
  Tooltip as Tt,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import type { ChildrenType } from '@/lib/types/globals'

interface Props {
  children: ChildrenType
  content: string
}

export default function Tooltip({ children, content }: Props) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tt>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side='bottom'>{content}</TooltipContent>
      </Tt>
    </TooltipProvider>
  )
}
