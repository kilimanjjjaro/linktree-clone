'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useStoreApi } from '@/lib/store/store-provider'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type ChildrenType } from '@/lib/types/globals'
import { type TreeInterface } from '@/lib/types/trees'

interface Props {
  children: ChildrenType
  trees: TreeInterface[]
  treeUrl?: string
  isAuthenticated: boolean
}

export default function InitApp({
  children,
  trees,
  treeUrl,
  isAuthenticated
}: Props) {
  const storeApi = useStoreApi()
  const pathname = usePathname()
  const router = useRouter()
  const treesRef = useRef(trees)

  const updateAppState = useCallback(
    (tree: TreeInterface, updateParams: boolean) => {
      storeApi.getState().loadTree(tree)

      if (updateParams) {
        const params = new URLSearchParams()
        params.set('tree', tree.url)
        router.replace(`${pathname}?tree=${tree.url}`, {
          scroll: false
        })
      }
    },
    [storeApi, router, pathname]
  )

  useEffect(() => {
    treesRef.current = trees
  }, [trees])

  useEffect(() => {
    const {
      setSelectedTree,
      setSavedTree,
      setIsStoreReady,
      loadTree,
      selectedTree,
      isStoreReady
    } = storeApi.getState()

    const localTree = localStorage.getItem('__LOCAL_TREE__')

    if (localTree !== null) {
      const tree = JSON.parse(localTree) as TreeInterface

      if (isAuthenticated) {
        setSelectedTree(tree)
        setSavedTree(DEMO_TREE_VALUES)
      } else {
        updateAppState(tree, false)
      }
    } else {
      if (isStoreReady && selectedTree?.url === treeUrl) return

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
        loadTree(DEMO_TREE_VALUES)
      }
    }

    setIsStoreReady(true)
  }, [treeUrl, isAuthenticated, storeApi, updateAppState])

  return <>{children}</>
}
