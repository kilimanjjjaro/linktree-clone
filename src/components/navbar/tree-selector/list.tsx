'use client'

import { type ExtendedTreeType } from '@/lib/types/trees'
import Tree from './item'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList
} from '@/components/ui/command'
import { useStore } from '@/lib/store/store'

export default function TreeList({ trees }: { trees: ExtendedTreeType[] }) {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)

  const selectTree = (id: string) => {
    const tree = trees.find((tree) => tree.id === id)

    if (tree !== undefined) {
      setSelectedTree(tree)
      window.localStorage.setItem('selectedTree', tree.id)
    }
  }

  return (
    <Command value={selectedTree?.id} onValueChange={selectTree}>
      <CommandInput placeholder='Search tree...' />
      <CommandList>
        <CommandEmpty>No trees found.</CommandEmpty>
        <CommandGroup>
          {trees.map((tree) => (
            <Tree key={tree.id} tree={tree} />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
