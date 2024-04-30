'use client'

import { useEffect, useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { useStore } from '@/lib/store/store'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import { type LocalTreeInterface } from '@/lib/types/trees'
import TreeSelectorButton from './tree-selector-button'
import TreeSelectorList from './tree-selector-list'

interface Props {
  trees: LocalTreeInterface[]
}

export default function TreeSelector({ trees }: Props) {
  const [showList, setShowList] = useState(false)
  const setSelectedTree = useStore((state) => state.setSelectedTree)

  useEffect(() => {
    const localTree = localStorage.getItem('__SELECTED_TREE__')

    if (localTree != null) {
      const parsedLocalTree = JSON.parse(localTree) as LocalTreeInterface
      setSelectedTree(parsedLocalTree)
    }

    if (localTree == null && trees.length === 0) {
      setSelectedTree(DEFAULT_THREE_VALUE)

      localStorage.setItem(
        '__SELECTED_TREE__',
        JSON.stringify(DEFAULT_THREE_VALUE)
      )
    }

    if (localTree == null && trees.length > 0) {
      setSelectedTree(trees[0])

      localStorage.setItem('__SELECTED_TREE__', JSON.stringify(trees[0]))
    }
  }, [trees, setSelectedTree])

  return (
    <Popover open={showList} onOpenChange={setShowList}>
      <PopoverTrigger asChild>
        <TreeSelectorButton />
      </PopoverTrigger>
      <PopoverContent align='start' className='w-60 p-0'>
        <TreeSelectorList trees={trees} setShowList={setShowList} />
      </PopoverContent>
    </Popover>
  )
}
