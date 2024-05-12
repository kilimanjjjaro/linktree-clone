import { unstable_cache } from 'next/cache'

import { getTreeBySlug } from '@/lib/services/get-tree-by-slug'

export const getCachedTree = unstable_cache(
  async (slug: string | undefined, authorId: string | undefined) => {
    if (authorId === undefined || slug === undefined || slug.length === 0)
      return null

    return await getTreeBySlug(slug, authorId)
  },
  ['__TREE__'],
  { tags: ['tree'] }
)
