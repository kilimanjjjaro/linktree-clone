import Navbar from "@/components/navbar"
import Toolbar from "@/components/toolbar"
import MobileToolbar from "@/components/toolbar/mobile"
import InitApp from "@/components/init-app"
import TreeAppearance from "@/components/trees/appearance"
import TreePreview from "@/components/trees/preview"
import TreeSettings from "@/components/trees/settings"
import TabletPanel from "@/components/trees/tablet-panel"
import { getCurrentUser } from "@/lib/services/get-current-user"
import { getTrees } from "@/lib/services/get-trees"

interface Props {
  searchParams: Promise<{ tree: string | undefined }>
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams
  const treeUrl = searchParams.tree
  const user = await getCurrentUser()
  const trees = user?.id !== undefined ? await getTrees(user.id) : []

  return (
    <InitApp trees={trees} treeUrl={treeUrl} isAuthenticated={user !== null}>
      <Navbar treeUrl={treeUrl} />
      <main className="relative flex h-dvh min-h-dvh flex-col items-stretch justify-center gap-3 px-3 md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-0 md:pt-22 md:pb-3 xl:grid-cols-[auto_1fr_auto]">
        <TreeAppearance className="hidden xl:flex" />
        <TreePreview />
        <TreeSettings className="hidden xl:flex" />
        <TabletPanel className="hidden md:flex xl:hidden" />
      </main>
      <Toolbar className="hidden md:flex" />
      <MobileToolbar className="flex md:hidden" />
    </InitApp>
  )
}
