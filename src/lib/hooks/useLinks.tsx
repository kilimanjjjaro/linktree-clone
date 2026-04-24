import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { type Prisma } from '@/generated/prisma/browser'

import { getOgImage } from '@/lib/actions/trees/get-og-image'
import { useStore } from '@/lib/store/store'
import { AddLinkSchema } from '@/lib/schemas/tree'

export default function useLinks() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)

  const addLink = useCallback(
    async (data: Prisma.TreeLinkUncheckedCreateInput) => {
      if (selectedTree === null) return null

      const rawData = { ...data, treeId: selectedTree.id }

      if (rawData.featured) {
        const response = await getOgImage(rawData.url)

        if (response !== null) {
          rawData.image = response.url
        } else {
          toast.error(
            'Something went wrong extraction the image from the site. Please try again.'
          )
        }
      } else {
        rawData.image = null
      }

      const validatedFields = AddLinkSchema.safeParse(rawData)

      if (!validatedFields.success) return null

      const existingLinks = [...selectedTree.links]
      const existingIndex = existingLinks.findIndex(
        (link) => link.url === validatedFields.data.url
      )

      const newLink = {
        ...validatedFields.data,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      if (existingIndex !== -1) {
        existingLinks[existingIndex] = {
          ...existingLinks[existingIndex],
          name: validatedFields.data.name,
          url: validatedFields.data.url,
          featured: validatedFields.data.featured,
          image: validatedFields.data.image ?? null,
          updatedAt: new Date()
        }
      } else {
        existingLinks.push(newLink)
      }

      const treeToSave = {
        ...selectedTree,
        links: existingLinks
      }

      setSelectedTree(treeToSave)

      return newLink
    },
    [selectedTree, setSelectedTree]
  )

  const removeLink = useCallback(
    (id: string) => {
      if (selectedTree === null) return

      const filteredLinks = selectedTree.links.filter((link) => link.id !== id)

      const treeToSave = {
        ...selectedTree,
        links: filteredLinks
      }

      setSelectedTree(treeToSave)
    },
    [selectedTree, setSelectedTree]
  )

  return {
    addLink,
    removeLink
  }
}
