import TreeSelectorButton from '@/components/navbar/tree-selector-button'
import TreeSelectorList from '@/components/navbar/tree-selector-list'
import { Popover } from '@/components/ui/popover'
import { getCachedTrees } from '@/lib/services/get-cached-trees'

interface Props {
  slug: string | undefined
  userId: string | undefined
}

export default async function TreeSelector({ slug, userId }: Props) {
  const trees = await getCachedTrees(userId)

  return (
    <Popover>
      <TreeSelectorButton />
      <TreeSelectorList slug={slug} trees={trees} />
    </Popover>
  )
}
