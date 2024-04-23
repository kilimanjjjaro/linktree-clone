import type { Tree } from '@prisma/client'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import { fetchTrees } from '@/lib/services/fetchTrees'

export default async function SelectedTree() {
  const data = await fetchTrees()
  let trees: Tree[] = [DEFAULT_THREE_VALUE]

  if (data.length > 0) trees = data

  return <>{trees[0].name}</>
}
