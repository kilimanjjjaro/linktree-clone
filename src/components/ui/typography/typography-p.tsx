import type { ChildrenType } from '@/lib/types/globals'

export function TypographyP({ children }: Readonly<ChildrenType>) {
  return <p className='leading-7 [&:not(:first-child)]:mt-6'>{children}</p>
}
