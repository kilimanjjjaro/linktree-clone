'use client'

import { useEffect, useState } from 'react'

import TreeSelectorButton from '@/components/navbar/tree-selector-button'
import TreeSelectorList from '@/components/navbar/tree-selector-list'
import { Popover } from '@/components/ui/popover'
import { useStore } from '@/lib/store/store'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type ExtendedTree } from '@/lib/types/trees'

export default function TreeSelector({ trees }: { trees: ExtendedTree[] }) {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const localTree = localStorage.getItem('__SELECTED_TREE__')

    if (localTree != null) {
      const parsedLocalTree = JSON.parse(localTree) as ExtendedTree
      setSelectedTree(parsedLocalTree)
    }

    if (localTree == null && trees.length === 0) {
      setSelectedTree(DEMO_TREE_VALUES)

      localStorage.setItem(
        '__SELECTED_TREE__',
        JSON.stringify(DEMO_TREE_VALUES)
      )
    }

    if (localTree == null && trees.length > 0) {
      setSelectedTree(trees[0])

      localStorage.setItem('__SELECTED_TREE__', JSON.stringify(trees[0]))
    }
  }, [trees, setSelectedTree])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TreeSelectorButton />
      <TreeSelectorList
        trees={trees}
        closePopover={() => {
          setOpen(false)
        }}
      />
    </Popover>
  )
}
