import { SessionProvider } from 'next-auth/react'

import SaveTreeDialog from '@/components/trees/save-tree-dialog'
import { Toaster } from '@/components/ui/toaster'
import { auth } from '@/lib/auth'
import type { ChildrenType } from '@/lib/types/globals'

interface Props {
  children: ChildrenType
}

export default async function Wrapper ({ children }: Props) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <Toaster />
      {children}
      <SaveTreeDialog />
    </SessionProvider>
  )
}
