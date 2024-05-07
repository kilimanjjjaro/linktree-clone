'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import TreeSelectorButton from '@/components/navbar/tree-selector-button'
import TreeSelectorList from '@/components/navbar/tree-selector-list'
import { Popover } from '@/components/ui/popover'
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

    if (slug === null && trees.length > 0) {
      params.set('slug', trees[0].slug)
      router.replace(`${pathname}?slug=${trees[0].slug}`)
    }

    if (slug === null && trees.length === 0) {
      params.set('slug', DEMO_TREE_VALUES.slug)
      router.replace(`${pathname}?slug=${DEMO_TREE_VALUES.slug}`)
    }

    if (slug !== null && trees.length > 0) {
      const existingTree = trees.some((tree) => tree.slug === slug)

      if (!existingTree) {
        params.set('slug', trees[0].slug)
        router.replace(`${pathname}?slug=${trees[0].slug}`)
      }
    }

    if (slug !== null && trees.length === 0) {
      params.set('slug', DEMO_TREE_VALUES.slug)
      router.replace(`${pathname}?slug=${DEMO_TREE_VALUES.slug}`)
    }
  }, [trees, slug, pathname, searchParams, router])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TreeSelectorButton treeName={tree.name} />
      <TreeSelectorList
        trees={trees}
        closePopover={() => {
          setOpen(false)
        }}
      />
    </Popover>
  )
}
