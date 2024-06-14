'use client'

import { useCallback, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useStore } from '@/lib/store/store'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type ChildrenType } from '@/lib/types/globals'
import { type TreeInterface } from '@/lib/types/trees'

interface Props {
  children: ChildrenType
  trees: TreeInterface[]
}

export default function InitApp ({ children, trees }: Props) {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const treeUrl = searchParams.get('tree')
  const router = useRouter()

  const updateAppState = useCallback(
    (tree: TreeInterface, updateParams: boolean) => {
      setSelectedTree(tree)

      if (updateParams) {
        const params = new URLSearchParams()
        params.set('tree', tree.url)
        router.replace(`${pathname}?tree=${tree.url}`, {
          scroll: false
        })
      }
    },
    [router, pathname, setSelectedTree]
  )

  useEffect(() => {
    const localTree = localStorage.getItem('__LOCAL_TREE__')

    if (localTree !== null) {
      const tree = JSON.parse(localTree) as TreeInterface

      updateAppState(tree, false)
    } else {
      const hasTrees = trees.length > 0
      const hasTreeUrl = treeUrl !== null && treeUrl.length > 0

      if (hasTreeUrl && hasTrees) {
        const tree = trees.find((tree) => tree.url === treeUrl)

        if (tree === undefined) {
          updateAppState(trees[0], false)
        } else {
          updateAppState(tree, false)
        }
      }

      if (hasTreeUrl && !hasTrees) {
        updateAppState(DEMO_TREE_VALUES, false)
      }

      if (!hasTreeUrl && hasTrees) {
        updateAppState(trees[0], false)
      }

      if (!hasTreeUrl && !hasTrees) {
        setSelectedTree(DEMO_TREE_VALUES)
      }
    }
  }, [treeUrl, trees, setSelectedTree, updateAppState])

  return <>{children}</>
}
