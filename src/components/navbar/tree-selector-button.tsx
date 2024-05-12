'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PopoverTrigger } from '@/components/ui/popover'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type ExtendedTree } from '@/lib/types/trees'

interface Props {
  slug: string | undefined
  trees: ExtendedTree[]
}

export default function TreeSelectorButton({ slug, trees }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams()
    const hasTrees = trees.length > 0
    const hasSlug = slug !== undefined && slug.length > 0

    if (!hasSlug && hasTrees) {
      params.set('slug', trees[0].slug)
      router.replace(`${pathname}?slug=${trees[0].slug}`, {
        scroll: false
      })
    }

    if (!hasSlug && !hasTrees) {
      params.set('slug', DEMO_TREE_VALUES.slug)
      router.replace(`${pathname}?slug=${DEMO_TREE_VALUES.slug}`, {
        scroll: false
      })
    }

    if (hasSlug && hasTrees) {
      const existingTree = trees.some((tree) => tree.slug === slug)

      if (!existingTree) {
        params.set('slug', trees[0].slug)
        router.replace(`${pathname}?slug=${trees[0].slug}`, {
          scroll: false
        })
      }
    }

    if (hasSlug && !hasTrees) {
      params.set('slug', DEMO_TREE_VALUES.slug)
      router.replace(`${pathname}?slug=${DEMO_TREE_VALUES.slug}`, {
        scroll: false
      })
    }
  }, [trees, slug, pathname, router])

  const name =
    trees.find((tree) => tree.slug === slug)?.name ?? DEMO_TREE_VALUES.name

  return (
    <PopoverTrigger asChild>
      <Button
        variant='ghost'
        role='combobox'
        className='h-full p-0 text-xl font-normal xl:hover:bg-transparent xl:hover:text-lt-lightest-gray'
      >
        <span className='max-w-60 truncate text-left'>{name}</span>
        <ChevronsUpDown className='size-4 shrink-0' aria-hidden />
      </Button>
    </PopoverTrigger>
  )
}
