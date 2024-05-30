'use client'

import { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { useStore } from '@/lib/store/store'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type ChildrenType } from '@/lib/types/globals'
import { type TreeInterface } from '@/lib/types/trees'

interface Props {
  children: ChildrenType
  trees: TreeInterface[]
}

export default function InitApp({ children, trees }: Props) {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const searchParams = useSearchParams()
  const slug = searchParams.get('slug')
  const user = useCurrentUser()
  const router = useRouter()

  const updateSelectedTree = useCallback(
    (tree: TreeInterface) => {
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
    const hasSlug = slug !== null && slug.length > 0

    if (hasSlug && !hasTrees) {
      if (localTree === null) {
        updateSelectedTree(DEMO_TREE_VALUES)
      } else {
        const tree = JSON.parse(localTree) as TreeInterface
        updateSelectedTree(tree)
      }
    }

    if (!hasSlug && hasTrees) {
      updateSelectedTree(trees[0])
    }

    if (hasSlug && hasTrees) {
      const tree = trees.find((tree) => tree.slug === slug)

      if (tree === undefined) {
        updateSelectedTree(trees[0])
      } else {
        updateSelectedTree(tree)
      }
    }

    if (!hasSlug && !hasTrees) {
      if (localTree === null) {
        updateSelectedTree(DEMO_TREE_VALUES)
      } else {
        const tree = JSON.parse(localTree) as TreeInterface
        updateSelectedTree(tree)
      }
    }
  }, [slug, trees, router, updateSelectedTree, searchParams])

  useEffect(() => {
    if (selectedTree !== null && user === null) {
      localStorage.setItem('__LOCAL_TREE__', JSON.stringify(selectedTree))
    }
  }, [user, selectedTree])

  return <>{children}</>
}
