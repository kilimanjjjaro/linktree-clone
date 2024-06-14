import TreeSelectorButton from '@/components/navbar/tree-selector-button'
import TreeSelectorList from '@/components/navbar/tree-selector-list'
import { Popover } from '@/components/ui/popover'
import { getCachedTrees } from '@/lib/services/get-cached-trees'
import { getCurrentUser } from '@/lib/services/get-current-user'

interface Props {
  treeUrl: string | undefined
}

export default async function TreeSelector ({ treeUrl }: Props) {
  const user = await getCurrentUser()
  const trees = await getCachedTrees(user?.id)

  return (
    <Popover>
      <TreeSelectorButton />
      <TreeSelectorList treeUrl={treeUrl} trees={trees} />
    </Popover>
  )
}
