import { cn } from '@/lib/utils'
import type { ChildrenType } from '@/lib/types/globals'

interface Props {
  children: ChildrenType
  className: string
}

export function TypographyH3({ children, className }: Props) {
  return (
    <h3 className={cn('scroll-m-20 font-medium leading-none', className)}>
      {children}
    </h3>
  )
}
