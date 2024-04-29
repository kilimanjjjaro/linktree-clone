'use client'

import { useEffect } from 'react'

import { useStore } from '@/lib/store/store'
import { type ExtendedTreeType } from '@/lib/types/trees'

export default function SelectedTree({ trees }: { trees: ExtendedTreeType[] }) {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)

  useEffect(() => {
    const treeFromLocalStorage = window.localStorage.getItem('selectedTree')

    if (treeFromLocalStorage === null) {
      console.log(trees[0].id)
      window.localStorage.setItem('selectedTree', trees[0].id)

      setSelectedTree(trees[0])
    }

    if (treeFromLocalStorage !== null) {
      const tree = trees.find((tree) => tree.id === treeFromLocalStorage)

      if (tree !== undefined) setSelectedTree(tree)
    }
  }, [trees, setSelectedTree])

  return (
    <span className='max-w-60 truncate text-left'>{selectedTree?.name}</span>
  )
}
