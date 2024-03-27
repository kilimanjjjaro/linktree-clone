import Navbar from '@/components/navbar/navbar'
import type { ChildrenType } from '@/lib/types/globals'

export default function Wrapper({ children }: Readonly<ChildrenType>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
