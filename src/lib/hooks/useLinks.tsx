import { useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type Prisma } from '@prisma/client'

import { createLink } from '@/lib/actions/trees/create-link'
import { useStore } from '@/lib/store/store'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import useTree from '@/lib/hooks/useTree'
import { AddLinkSchema } from '@/lib/schemas/tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { getOgImage } from '@/lib/utils/get-og-image'

export default function useLinks() {
  const setSavingTree = useStore((state) => state.setSavingTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const [errors, setErrors] = useState<string[]>([])
  const { saveTree } = useTree()
  const user = useCurrentUser()

  const addLink = useCallback(
    async (data: Partial<Prisma.TreeLinkUncheckedCreateInput>) => {
      if (selectedTree === null) return null

      const rawData = { ...data, treeId: selectedTree.id }

      if (rawData.featured === true && rawData.url !== undefined) {
        rawData.image = await getOgImage(rawData.url)
      } else {
        rawData.image = null
      }

      const validatedFields = AddLinkSchema.safeParse(rawData)

      if (!validatedFields.success) {
        const errors = validatedFields.error.errors.map(
          (error) => error.message
        )
        console.log(validatedFields.error.errors)
        setErrors(errors)

        return null
      } else {
        setErrors([])
      }

      if (user === null) {
        const newLink = {
          ...validatedFields.data,
          id: uuidv4(),
          created_at: new Date(),
          updated_at: new Date()
        }

        const treeToSave = {
          ...selectedTree,
          links: [...selectedTree.links, newLink]
        }

        setSelectedTree(treeToSave)
        localStorage.setItem('__LOCAL_TREE__', JSON.stringify(treeToSave))

        return newLink
      } else {
        setSavingTree(true)

        if (selectedTree.id === DEMO_TREE_VALUES.id) {
          const newTree = await saveTree(selectedTree)

          if (newTree === null) return null

          const response = await createLink({
            ...validatedFields.data,
            treeId: newTree.id
          })

          if (response === null) return null

          const treeToSave = {
            ...newTree,
            links: [...newTree.links, response]
          }

          setSelectedTree(treeToSave)
          localStorage.removeItem('__LOCAL_TREE__')
          setSavingTree(false)

          return response
        } else {
          const response = await createLink({
            ...validatedFields.data,
            treeId: selectedTree.id
          })

          if (response === null) return null

          const treeToSave = {
            ...selectedTree,
            links: [...selectedTree.links, response]
          }

          setSelectedTree(treeToSave)
          setSavingTree(false)

          return response
        }
      }
    },
    [selectedTree, setSelectedTree, setSavingTree, user]
  )

  return {
    addLink,
    errors
  }
}
