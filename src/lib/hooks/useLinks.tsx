import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { type Prisma } from '@prisma/client'
import { toast } from 'sonner'

import { updateLink } from '@/lib/actions/trees/update-link'
import { useStore } from '@/lib/store/store'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { AddLinkSchema } from '@/lib/schemas/tree'
import { getOgImage } from '@/lib/utils/get-og-image'
import { createTree } from '@/lib/actions/trees/create-tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { deleteLink } from '../actions/trees/delete-link'

export default function useLinks() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const user = useCurrentUser()
  const pathname = usePathname()
  const router = useRouter()

  const addLink = useCallback(
    async (data: Prisma.TreeLinkUncheckedCreateInput) => {
      if (selectedTree === null) return null

      const rawData = { ...data, treeId: selectedTree.id }

      if (rawData.featured && rawData.url !== undefined) {
        const response = await getOgImage(rawData.url)

        if (response.length > 0) {
          rawData.image = response
        } else {
          toast.error(
            'The extraction of the image was blocked by the site. This link cannot be featured.'
          )
        }
      } else {
        rawData.image = null
      }

      const validatedFields = AddLinkSchema.safeParse(rawData)

      if (!validatedFields.success) return null

      const existingLinks = [...selectedTree.links]
      const existingLink = existingLinks.findIndex(
        (profile) => profile.url === validatedFields.data.url
      )

      if (user === null) {
        const newLink = {
          ...validatedFields.data,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date()
        }

        if (existingLink !== -1) {
          existingLinks[existingLink].name = validatedFields.data.name
          existingLinks[existingLink].url = validatedFields.data.url
          existingLinks[existingLink].featured = validatedFields.data.featured
          existingLinks[existingLink].updatedAt = new Date()
        } else {
          existingLinks.push(newLink)
        }

        const treeToSave = {
          ...selectedTree,
          links: existingLinks
        }

        setSelectedTree(treeToSave)
        localStorage.setItem('__LOCAL_TREE__', JSON.stringify(treeToSave))

        return newLink
      } else {
        let treeId = selectedTree.id

        if (selectedTree.id === DEMO_TREE_VALUES.id) {
          const newTree = await createTree(selectedTree)

          if (newTree.data === null) {
            toast.error(newTree.error)
            return null
          }

          treeId = newTree.data.id
          const params = new URLSearchParams()
          params.set('tree', newTree.data.url)
          router.replace(`${pathname}?tree=${newTree.data.url}`, {
            scroll: false
          })
        }

        const newLink = await updateLink({
          ...validatedFields.data,
          treeId
        })

        if (newLink.data === null) {
          toast.error(newLink.error)
          return null
        }

        if (existingLink !== -1) {
          existingLinks[existingLink].name = newLink.data.name
          existingLinks[existingLink].url = newLink.data.url
          existingLinks[existingLink].featured = newLink.data.featured
          existingLinks[existingLink].updatedAt = newLink.data.updatedAt
        } else {
          existingLinks.push(newLink.data)
        }

        const treeToSave = {
          ...selectedTree,
          links: existingLinks
        }

        setSelectedTree(treeToSave)
        localStorage.removeItem('__LOCAL_TREE__')

        return newLink
      }
    },
    [selectedTree, setSelectedTree, user, router, pathname]
  )

  const removeLink = useCallback(
    async (id: string) => {
      if (selectedTree === null) return

      const filteredLinks = selectedTree.links.filter((link) => link.id !== id)

      if (user === null) {
        setSelectedTree({
          ...selectedTree,
          links: filteredLinks
        })
      } else {
        const response = await deleteLink({ linkId: id })

        if (response.success.length > 0) {
          setSelectedTree({
            ...selectedTree,
            links: filteredLinks
          })

          localStorage.removeItem('__LOCAL_TREE__')
        } else {
          toast.error(response.error)
        }
      }
    },
    [user, selectedTree, setSelectedTree]
  )

  return {
    addLink,
    removeLink
  }
}
