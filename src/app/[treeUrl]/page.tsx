import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import PublicTreeView from '@/components/trees/public/view'
import LocalTreeFallback from '@/app/[treeUrl]/local-fallback'
import { getViewableTree } from '@/lib/services/get-viewable-tree'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { TREE_STATUS } from '@/lib/constants/trees'

interface Props {
  params: Promise<{ treeUrl: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { treeUrl } = await params
  const user = await getCurrentUser()
  const tree = await getViewableTree(treeUrl, user?.id)

  if (!tree) return {}

  return {
    title: tree.name,
    description: tree.description,
    alternates: {
      canonical: `/${treeUrl}`
    },
    openGraph: {
      title: tree.name,
      description: tree.description,
      images: [tree.avatar],
      url: `/${treeUrl}`
    }
  }
}

export default async function PublicTreePage({ params }: Props) {
  const { treeUrl } = await params
  const user = await getCurrentUser()
  const tree = await getViewableTree(treeUrl, user?.id)

  if (!tree) {
    if (user === null) return <LocalTreeFallback treeUrl={treeUrl} />

    notFound()
  }

  const isPrivate = tree.status !== TREE_STATUS.PUBLISHED

  return <PublicTreeView tree={tree} isPrivate={isPrivate} />
}
