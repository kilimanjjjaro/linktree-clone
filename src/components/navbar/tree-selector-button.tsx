'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PopoverTrigger } from '@/components/ui/popover'
import { useStore } from '@/lib/store/store'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type ExtendedTree } from '@/lib/types/trees'
import { Skeleton } from '../ui/skeleton'

interface Props {
  slug: string | undefined
  trees: ExtendedTree[]
}

export default function TreeSelectorButton({ slug, trees }: Props) {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams()
    const hasTrees = trees.length > 0
    const hasSlug = slug !== undefined && slug.length > 0

    if (!hasSlug && hasTrees) {
      setSelectedTree(trees[0])
      params.set('slug', trees[0].slug)
      router.replace(`${pathname}?slug=${trees[0].slug}`, {
        scroll: false
      })
    }

    if (!hasSlug && !hasTrees) {
      setSelectedTree(DEMO_TREE_VALUES)
      params.set('slug', DEMO_TREE_VALUES.slug)
      router.replace(`${pathname}?slug=${DEMO_TREE_VALUES.slug}`, {
        scroll: false
      })
    }

    if (hasSlug && hasTrees) {
      const tree = trees.find((tree) => tree.slug === slug)

      if (tree === undefined) {
        setSelectedTree(trees[0])
        params.set('slug', trees[0].slug)
        router.replace(`${pathname}?slug=${trees[0].slug}`, {
          scroll: false
        })
      } else {
        setSelectedTree(tree)
      }
    }

    if (hasSlug && !hasTrees) {
      params.set('slug', DEMO_TREE_VALUES.slug)
      router.replace(`${pathname}?slug=${DEMO_TREE_VALUES.slug}`, {
        scroll: false
      })
    }
  }, [trees, slug, pathname, router, setSelectedTree])

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
