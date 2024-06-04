import { useCallback, useState } from 'react'
import { type Tree } from '@prisma/client'
import { toast } from 'sonner'

import { useStore } from '@/lib/store/store'
import { updateTree } from '@/lib/actions/trees/update-tree'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { UpdateTreeSchema } from '@/lib/schemas/tree'

export default function useTree() {
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

      const rawData = {
        ...selectedTree,
        ...validatedFields.data
      }

      if (user === null) {
        const newTree = {
          ...rawData,
          updatedAt: new Date()
        }

        setSelectedTree(newTree)
        localStorage.setItem('__LOCAL_TREE__', JSON.stringify(newTree))

        return newTree
      } else {
        const response = await updateTree(rawData)

        if (response.data === null) {
          toast.error(response.error)
          return null
        }

        setSelectedTree(response.data)
        localStorage.removeItem('__LOCAL_TREE__')

        return response.data
      }
    },
    [selectedTree, setSelectedTree, user]
  )

  return {
    saveTree,
    errors
  }
}
