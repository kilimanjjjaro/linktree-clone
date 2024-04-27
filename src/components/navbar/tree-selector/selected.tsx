import type { Tree } from '@prisma/client'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import { getTrees } from '@/lib/services/get-trees'

export default async function SelectedTree() {
  const data = await getTrees()
  let trees: Tree[] = [DEFAULT_THREE_VALUE]

  if (data.length > 0) trees = data

  return <span className='max-w-60 truncate'>{trees[0].name}</span>
}
