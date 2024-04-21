import { CommandItem } from '@/components/ui/command'
import { fetchTrees } from '@/lib/services/fetchTrees'

export default async function TreeList() {
  const trees = await fetchTrees()

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
