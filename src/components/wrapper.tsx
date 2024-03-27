import SmoothScroll from '@/components/smooth-scroll'
import type { ChildrenType } from '@/lib/types/globals'

export default function Wrapper({ children }: Readonly<ChildrenType>) {
  return <SmoothScroll>{children}</SmoothScroll>
}
