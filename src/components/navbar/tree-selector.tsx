'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronsUpDown } from 'lucide-react'

import TreeSelectorList from '@/components/navbar/tree-selector-list'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type ExtendedTree } from '@/lib/types/trees'

interface Props {
  trees: ExtendedTree[]
  tree: ExtendedTree
}

export default function TreeSelector({ trees, tree }: Props) {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const slug = searchParams.get('slug')

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const hasTrees = trees.length > 0
    const hasSlug = slug !== null && slug.length > 0

    if (!hasSlug && hasTrees) {
      params.set('slug', trees[0].slug)
      router.replace(`${pathname}?slug=${trees[0].slug}`)
    }

    if (!hasSlug && !hasTrees) {
      params.set('slug', DEMO_TREE_VALUES.slug)
      router.replace(`${pathname}?slug=${DEMO_TREE_VALUES.slug}`)
    }

    if (hasSlug && hasTrees) {
      const existingTree = trees.some((tree) => tree.slug === slug)

      if (!existingTree) {
        params.set('slug', trees[0].slug)
        router.replace(`${pathname}?slug=${trees[0].slug}`)
      }
    }

    if (hasSlug && !hasTrees) {
      params.set('slug', DEMO_TREE_VALUES.slug)
      router.replace(`${pathname}?slug=${DEMO_TREE_VALUES.slug}`)
    }
  }, [trees, slug, pathname, searchParams, router])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          className='h-full p-0 text-xl font-normal xl:hover:bg-transparent xl:hover:text-lt-lightest-gray'
        >
          <span className='max-w-60 truncate text-left'>{tree.name}</span>
          <ChevronsUpDown className='size-4 shrink-0' aria-hidden />
        </Button>
      </PopoverTrigger>
      <TreeSelectorList
        trees={trees}
        closePopover={() => {
          setOpen(false)
        }}
      />
    </Popover>
  )
}
