'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import type { ChildrenType } from '@/lib/types/globals'

export default function SmoothScroll({ children }: ChildrenType) {
  return <ReactLenis root>{children}</ReactLenis>
}
