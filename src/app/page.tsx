// import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import InitApp from '@/components/init-app'
import TreeAppearance from '@/components/trees/appearance'
import TreePreview from '@/components/trees/preview'
import TreeSettings from '@/components/trees/settings'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { getTrees } from '@/lib/services/get-trees'

interface Props {
  searchParams: Promise<{ tree: string | undefined }>
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams
  const treeUrl = searchParams.tree
  const user = await getCurrentUser()
  const trees = user?.id !== undefined ? await getTrees(user.id) : []

  return (
    <InitApp trees={trees} treeUrl={treeUrl}>
      <Navbar treeUrl={treeUrl} />
      <main className='relative grid h-dvh min-h-dvh grid-cols-[auto_1fr_auto] items-start justify-center p-3 pt-22'>
        <TreeAppearance />
        <TreePreview />
        <TreeSettings />
      </main>
      {/* <Footer /> */}
    </InitApp>
  )
}
