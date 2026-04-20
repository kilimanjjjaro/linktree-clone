'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useStore } from '@/lib/store/store'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type ChildrenType } from '@/lib/types/globals'
import { type TreeInterface } from '@/lib/types/trees'

interface Props {
  children: ChildrenType
  trees: TreeInterface[]
  treeUrl?: string
}

export default function InitApp({ children, trees, treeUrl }: Props) {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const pathname = usePathname()
  const router = useRouter()
  const treesRef = useRef(trees)

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
    treesRef.current = trees
  }, [trees])

  useEffect(() => {
    const localTree = localStorage.getItem('__LOCAL_TREE__')

    if (localTree !== null) {
      const tree = JSON.parse(localTree) as TreeInterface

      updateAppState(tree, false)
    } else {
      const currentTree = useStore.getState().selectedTree

      if (currentTree !== null && currentTree.url === treeUrl) return

      const hasTrees = treesRef.current.length > 0
      const hasTreeUrl = treeUrl !== undefined && treeUrl.length > 0

      if (hasTreeUrl && hasTrees) {
        const tree = treesRef.current.find((tree) => tree.url === treeUrl)

        if (tree === undefined) {
          updateAppState(treesRef.current[0], false)
        } else {
          updateAppState(tree, false)
        }
      }

      if (hasTreeUrl && !hasTrees) {
        updateAppState(DEMO_TREE_VALUES, false)
      }

      if (!hasTreeUrl && hasTrees) {
        updateAppState(treesRef.current[0], false)
      }

      if (!hasTreeUrl && !hasTrees) {
        setSelectedTree(DEMO_TREE_VALUES)
      }
    }
  }, [treeUrl, setSelectedTree, updateAppState])

  return <>{children}</>
}
