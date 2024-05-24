'use client'

import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { useStore } from '@/lib/store/store'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type ExtendedTree } from '@/lib/types/trees'

interface Props {
  slug: string | undefined
  trees: ExtendedTree[]
}

export default function TreeSelectorButton({ slug, trees }: Props) {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const router = useRouter()

  const updateSelectedTree = useCallback(
    (tree: ExtendedTree) => {
      setSelectedTree(tree)

      const params = new URLSearchParams()
      params.set('slug', tree.slug)
      router.replace(`/?slug=${tree.slug}`, {
        scroll: false
      })
    },
    [router, setSelectedTree]
  )

  useEffect(() => {
    const localTree = localStorage.getItem('__LOCAL_TREE__')
    const hasTrees = trees.length > 0
    const hasSlug = slug !== undefined && slug.length > 0

    if (hasSlug && !hasTrees) {
      if (localTree === null) {
        updateSelectedTree(DEMO_TREE_VALUES)
      } else {
        const tree = JSON.parse(localTree) as ExtendedTree
        updateSelectedTree(tree)
      }
    } else {
      updateSelectedTree(trees[0])
    }

    if (hasSlug && hasTrees) {
      const tree = trees.find((tree) => tree.slug === slug)

      if (tree === undefined) {
        updateSelectedTree(trees[0])
      } else {
        updateSelectedTree(tree)
      }
    } else {
      if (localTree === null) {
        updateSelectedTree(DEMO_TREE_VALUES)
      } else {
        const tree = JSON.parse(localTree) as ExtendedTree
        updateSelectedTree(tree)
      }
    }
  }, [slug, trees, router, updateSelectedTree])

  if (selectedTree === null)
    return <Skeleton className='h-6 w-[232px] rounded-full' />

  return (
    <PopoverTrigger asChild>
      <Button
        variant='ghost'
        role='combobox'
        className='h-full p-0 text-xl font-normal xl:hover:bg-transparent xl:hover:text-lt-lightest-gray'
        disabled={selectedTree === null}
      >
        <span className='max-w-60 truncate text-left'>{selectedTree.name}</span>
        <ChevronsUpDown className='size-4 shrink-0' aria-hidden />
      </Button>
    </PopoverTrigger>
  )
}
