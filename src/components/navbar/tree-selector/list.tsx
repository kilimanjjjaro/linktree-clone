import TreeItem from '@/components/navbar/tree-selector-item'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList
} from '@/components/ui/command'
import { type ExtendedTreeType } from '@/lib/types/trees'

export default function TreeList({ trees }: { trees: ExtendedTreeType[] }) {
  return (
    <Command>
      <CommandInput placeholder='Search tree...' />
      <CommandList>
        <CommandEmpty>No trees found.</CommandEmpty>
        <CommandGroup>
          {trees.map((tree) => (
            <TreeItem key={tree.id} tree={tree} />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
