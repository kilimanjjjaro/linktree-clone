import type { ChildrenType } from '@/lib/types/globals'

export function TypographyH3({ children }: Readonly<ChildrenType>) {
  return <h3 className='scroll-m-20 font-medium tracking-tight'>{children}</h3>
}
