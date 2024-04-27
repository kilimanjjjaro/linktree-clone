import { CommandItem } from '@/components/ui/command'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import { getTrees } from '@/lib/services/get-trees'
import { type Tree } from '@prisma/client'

export default async function TreeList() {
  const data = await getTrees()
  let trees: Tree[] = [DEFAULT_THREE_VALUE]

  if (data.length > 0) trees = data

  return (
    <>
      {trees.map((tree) => (
        <CommandItem key={tree.id} value={tree.name}>
          {tree.name}
        </CommandItem>
      ))}
    </>
  )
}
