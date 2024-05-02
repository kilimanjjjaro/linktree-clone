import SaveTreesDialog from '@/components/trees/save-trees-dialog'
import { Toaster } from '@/components/ui/toaster'
import type { ChildrenType } from '@/lib/types/globals'

export default function Wrapper({ children }: { children: ChildrenType }) {
  return (
    <>
      <Toaster />
      <SaveTreesDialog />
      {children}
    </>
  )
}
