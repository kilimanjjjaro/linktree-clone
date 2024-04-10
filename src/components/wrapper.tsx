import Navbar from './navbar'
import Footer from './footer'
import { Toaster } from './ui/toaster'
import type { ChildrenType } from '@/lib/types/globals'

export default function Wrapper({ children }: { children: ChildrenType }) {
  return (
    <>
      <Navbar />
      <Toaster />
      {children}
      <Footer />
    </>
  )
}
