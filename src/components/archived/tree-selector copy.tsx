'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

import TreeItem from '@/components/navbar/tree-selector-item'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { Skeleton } from '../ui/skeleton'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import { createTree } from '@/lib/services/create-tree'
import { type LocalTreeInterface } from '@/lib/types/trees'

interface Props {
  trees: LocalTreeInterface[]
  userId: string
}

export default function TreeSelector({ trees, userId }: Props) {
  const [showList, setShowList] = useState(false)
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const isLogged = userId.length > 0

  useEffect(() => {
    const localTree = localStorage.getItem('__SELECTED_TREE__')

    if (localTree != null && trees.length > 0) {
      const parsedLocalTree = JSON.parse(localTree) as LocalTreeInterface

      const tree = trees.find((tree) => tree.id === parsedLocalTree.id)

      if (tree !== undefined) {
        console.log('1. La encuentra en la db')
        setSelectedTree(tree)
      } else {
        console.log('1. No la encuentra en la db')
        void createTree({
          data: parsedLocalTree,
          userId
        }).then((data) => {
          if (data === null) return

          setSelectedTree(data)
          localStorage.setItem('__SELECTED_TREE__', JSON.stringify(data))
        })
      }
    }

    if (localTree === null && trees.length === 0) {
      if (isLogged) {
        void createTree({
          data: DEFAULT_THREE_VALUE,
          userId
        }).then((data) => {
          if (data !== null) {
            setSelectedTree(data)
            localStorage.setItem('__SELECTED_TREE__', JSON.stringify(data))
          }
        })
      } else {
        setSelectedTree(DEFAULT_THREE_VALUE)
        localStorage.setItem(
          '__SELECTED_TREE__',
          JSON.stringify(DEFAULT_THREE_VALUE)
        )
      }
    }

    if (localTree != null && trees.length === 0) {
      const parsedLocalTree = JSON.parse(localTree) as LocalTreeInterface

      if (isLogged) {
        void createTree({
          data: parsedLocalTree,
          userId
        }).then((data) => {
          if (data === null) return
          setSelectedTree(data)
          localStorage.setItem('__SELECTED_TREE__', JSON.stringify(data))
        })
      } else {
        setSelectedTree(parsedLocalTree)
      }
    }

    if (localTree === null && trees.length > 0) {
      const tree = trees[0]
      setSelectedTree(tree)
      localStorage.setItem('__SELECTED_TREE__', JSON.stringify(tree))
    }
  }, [trees, isLogged, setSelectedTree, userId])

  return (
    <Popover open={showList} onOpenChange={setShowList}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          className='h-full p-0 text-xl font-normal transition-opacity xl:hover:bg-transparent xl:hover:opacity-70'
        >
          <span className='max-w-60 truncate text-left'>
            {selectedTree == null ? (
              <Skeleton className='h-6 w-[232px] rounded-2xl' />
            ) : (
              <>{selectedTree?.name}</>
            )}
          </span>
          <ChevronsUpDown className='size-4 shrink-0' aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-60 p-0'>
        <Command>
          <CommandInput placeholder='Search tree...' />
          <CommandList>
            <CommandEmpty>No trees found.</CommandEmpty>
            <CommandGroup>
              {trees.map((tree) => (
                <TreeItem key={tree.id} tree={tree} setShowList={setShowList} />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
