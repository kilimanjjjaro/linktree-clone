import Navbar from '@/components/navbar'
import Toolbar from '@/components/toolbar'
import { Toaster } from '@/components/ui/toaster'
import type { ChildrenType } from '@/lib/types/globals'
import Footer from '@/components/footer'

export default function Wrapper({ children }: { children: ChildrenType }) {
  return (
    <>
      <Navbar />
      <Toolbar />
      <Toaster />
      {children}
      <Footer />
    </>
  )
}
