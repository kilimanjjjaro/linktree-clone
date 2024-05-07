import { unstable_cache } from 'next/cache'

import { getTrees } from '@/lib/services/get-trees'

export const getCachedTrees = unstable_cache(
  async (authorId: string | undefined) => {
    if (authorId === undefined) return []
    return await getTrees(authorId)
  },
  ['__TREES__'],
  { tags: ['trees'] }
)
