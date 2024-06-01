import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type Prisma } from '@prisma/client'

import { createLink } from '@/lib/actions/trees/create-link'
import { createTree } from '@/lib/actions/trees/create-tree'
import { useStore } from '@/lib/store/store'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { AddLinkSchema } from '@/lib/schemas/tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { getOgImage } from '@/lib/utils/get-og-image'

export default function useLinks() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
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

      if (!validatedFields.success) return null

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
        if (selectedTree.id === DEMO_TREE_VALUES.id) {
          const newTree = await createTree(selectedTree)

          if (newTree.data === null) return null

          const newLink = await createLink({
            ...validatedFields.data,
            treeId: newTree.data.id
          })

          if (newLink === null) return null

          const treeToSave = {
            ...newTree.data,
            links: [...newTree.data.links, newLink]
          }

          setSelectedTree(treeToSave)
          localStorage.removeItem('__LOCAL_TREE__')

          return newLink
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

          return response
        }
      }
    },
    [selectedTree, setSelectedTree, user]
  )

  return {
    addLink
  }
}
