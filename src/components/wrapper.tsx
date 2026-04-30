import { Analytics } from '@vercel/analytics/next'
import { SessionProvider } from 'next-auth/react'

import SaveTreeDialog from '@/components/trees/save-tree-dialog'
import WelcomeToast from '@/components/auth/welcome-toast'
import { Toaster } from '@/components/ui/toaster'
import { StoreProvider } from '@/lib/store/store-provider'
import { auth } from '@/lib/auth'
import type { ChildrenType } from '@/lib/types/globals'

interface Props {
  children: ChildrenType
}

export default async function Wrapper({ children }: Props) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Analytics />
        <Toaster />
        <WelcomeToast />
        {children}
        <SaveTreeDialog />
      </StoreProvider>
    </SessionProvider>
  )
}
