import { SessionProvider } from 'next-auth/react'

import Dialogs from '@/components/dialogs'
import InitApp from '@/components/init-app'
import { Toaster } from '@/components/ui/toaster'
import { auth } from '@/lib/auth'
import { getCachedTrees } from '@/lib/services/get-cached-trees'
import type { ChildrenType } from '@/lib/types/globals'

interface Props {
  children: ChildrenType
}

export default async function Wrapper({ children }: Props) {
  const session = await auth()
  const trees = await getCachedTrees(session?.user?.id)

  return (
    <SessionProvider session={session}>
      <InitApp trees={trees}>
        <Toaster />
        {children}
        <Dialogs />
      </InitApp>
    </SessionProvider>
  )
}
