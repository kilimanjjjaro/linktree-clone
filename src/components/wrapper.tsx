import { SessionProvider } from 'next-auth/react'

import Dialogs from '@/components/dialogs'
import { Toaster } from '@/components/ui/toaster'
import { auth } from '@/lib/auth'
import type { ChildrenType } from '@/lib/types/globals'

export default async function Wrapper({
  children
}: {
  children: ChildrenType
}) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <Toaster />
      {children}
      <Dialogs />
    </SessionProvider>
  )
}
