import type { ChildrenType } from '@/lib/types/globals'

interface Props {
  children: ChildrenType
  className?: string
}

export function TypographyP({ children, className }: Props) {
  return <p className={className}>{children}</p>
}
