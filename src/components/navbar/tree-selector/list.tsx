import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import { getTrees } from '@/lib/services/get-trees'
import { type ExtendedTreeType } from '@/lib/types/trees'
import Tree from './item'

export default async function TreeList() {
  const data = await getTrees()
  let trees: ExtendedTreeType[] = [DEFAULT_THREE_VALUE]

  if (data.length > 0) trees = data

  return (
    <>
      {trees.map((tree) => (
        <Tree key={tree.id} tree={tree} />
      ))}
    </>
  )
}
