import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import TreeAppearance from '@/components/trees/appearance'
import TreePreview from '@/components/trees/preview'
import TreeSettings from '@/components/trees/settings'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { getCachedTree } from '@/lib/services/get-cached-tree'

interface Props {
  searchParams: { slug: string | undefined }
}

export default async function Home({ searchParams }: Props) {
  const user = await getCurrentUser()
  const slug = searchParams.slug
  let tree = DEMO_TREE_VALUES

  const shouldGetTree = user !== null && slug !== undefined && slug.length > 0

  if (shouldGetTree) {
    const cachedTree = await getCachedTree(slug, user?.id)

    if (cachedTree !== null) tree = cachedTree
  }

  return (
    <>
      <Navbar tree={tree} />
      <main className='relative grid h-dvh min-h-dvh grid-cols-[auto_1fr_auto] items-start justify-center p-3 pt-[88px]'>
        <TreeAppearance />
        <TreePreview tree={tree} />
        <TreeSettings />
      </main>
      <Footer />
    </>
  )
}
