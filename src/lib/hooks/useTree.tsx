import { useCallback, useState } from 'react'
import { type Tree } from '@prisma/client'

import { useStore } from '@/lib/store/store'
import { updateTree } from '@/lib/actions/trees/update-tree'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { UpdateTreeSchema } from '@/lib/schemas/tree'
import slugify from '@sindresorhus/slugify'

export default function useTree() {
  const setSavingTree = useStore((state) => state.setSavingTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const [errors, setErrors] = useState<string[]>([])
  const user = useCurrentUser()

  const saveTree = useCallback(
    async (data: Partial<Tree>) => {
      if (selectedTree === null) return null

      const validatedFields = UpdateTreeSchema.safeParse(data)

      if (!validatedFields.success) {
        const errors = validatedFields.error.errors.map(
          (error) => error.message
        )
        setErrors(errors)

        return null
      } else {
        setErrors([])
      }

      const { name } = validatedFields.data

      let rawData

      if (name !== undefined) {
        rawData = { ...validatedFields.data, slug: slugify(name) }
      } else {
        rawData = { ...validatedFields.data }
      }

      if (user === null) {
        const treeToSave = {
          ...selectedTree,
          ...rawData
        }

        setSelectedTree(treeToSave)
        localStorage.setItem('__LOCAL_TREE__', JSON.stringify(treeToSave))

        return treeToSave
      } else {
        setSavingTree(true)

        const response = await updateTree({
          id: selectedTree.id,
          ...rawData
        })

        if (response !== null) {
          setSelectedTree(response)
          localStorage.removeItem('__LOCAL_TREE__')
        }

        setSavingTree(false)

        return response
      }
    },
    [selectedTree, setSelectedTree, setSavingTree, user]
  )

  return {
    saveTree,
    errors
  }
}
