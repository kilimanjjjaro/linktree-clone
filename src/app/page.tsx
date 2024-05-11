import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import TreeAppearance from '@/components/trees/appearance'
import TreePreview from '@/components/trees/preview'
import TreeSettings from '@/components/trees/settings'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { getCachedTree } from '@/lib/services/get-cached-tree'
import { type ExtendedTree } from '@/lib/types/trees'

interface Props {
  searchParams: { slug: string | undefined }
}

export default async function Home({ searchParams }: Props) {
  const user = await getCurrentUser()
  const slug = searchParams.slug
  let tree: ExtendedTree | null = null

  if (slug !== undefined && slug.length > 0) {
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
