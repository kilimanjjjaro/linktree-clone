import { useCallback } from 'react'

import { useStore } from '@/lib/store/store'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { updateTree } from '@/lib/actions/trees/update-tree'
import { type ExtendedTree } from '@/lib/types/trees'

export function useTree() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const setSavingTree = useStore((state) => state.setSavingTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const user = useCurrentUser()

  const saveTree = useCallback(
    async (tree: ExtendedTree) => {
      const treeToSave = {
        ...selectedTree,
        ...tree
      }

      if (user === null) {
        localStorage.setItem('__LOCAL_TREE__', JSON.stringify(treeToSave))
        setSelectedTree(treeToSave)

        return treeToSave
      } else {
        setSavingTree(true)
        const response = await updateTree(treeToSave)

        if (response !== null) {
          setSelectedTree(response)
          localStorage.removeItem('__LOCAL_TREE__')
        }

        setSavingTree(false)
        return response
      }
    },
    [selectedTree, setSavingTree, setSelectedTree, user]
  )

  return {
    saveTree
  }
}
