import { unstable_cache } from 'next/cache'

import { getTreeBySlug } from '@/lib/services/get-tree-by-slug'

export const getCachedTree = unstable_cache(
  async (slug: string, authorId: string | undefined) => {
    if (authorId === undefined) return null
    return await getTreeBySlug(slug, authorId)
  },
  ['__TREE__'],
  { tags: ['tree'] }
)
