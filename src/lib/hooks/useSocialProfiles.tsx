import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { type SocialProfileTypes, type Prisma } from '@prisma/client'
import { toast } from 'sonner'

import { useStore } from '@/lib/store/store'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { updateSocialProfile } from '@/lib/actions/trees/update-social-profile'
import { deleteSocialProfile } from '@/lib/actions/trees/delete-social-profile'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { createTree } from '@/lib/actions/trees/create-tree'

export default function useSocialProfiles () {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const user = useCurrentUser()
  const pathname = usePathname()
  const router = useRouter()

  const saveProfile = useCallback(
    async (data: Prisma.TreeSocialProfileUncheckedCreateInput) => {
      if (selectedTree === null) return null

      const existingProfiles = [...selectedTree.socialProfiles]
      const existingProfile = existingProfiles.findIndex(
        (profile) => profile.type === data.type
      )

      if (user === null) {
        const newProfile = {
          ...data,
          id: uuidv4(),
          treeId: selectedTree.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }

        if (existingProfile !== -1) {
          existingProfiles[existingProfile].url = data.url
          existingProfiles[existingProfile].updatedAt = new Date()
        } else {
          existingProfiles.push(newProfile)
        }

        const treeToSave = {
          ...selectedTree,
          socialProfiles: existingProfiles
        }

        setSelectedTree(treeToSave)
        localStorage.setItem('__LOCAL_TREE__', JSON.stringify(treeToSave))

        return newProfile
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

        const newProfile = await updateSocialProfile({
          treeId,
          type: data.type,
          url: data.url,
          name: data.name
        })

        if (newProfile.data === null) {
          toast.error(newProfile.error)
          return null
        }

        if (existingProfile !== -1) {
          existingProfiles[existingProfile].url = newProfile.data.url
          existingProfiles[existingProfile].updatedAt =
            newProfile.data.updatedAt
        } else {
          existingProfiles.push(newProfile.data)
        }

        const treeToSave = {
          ...selectedTree,
          socialProfiles: existingProfiles
        }

        setSelectedTree(treeToSave)
        localStorage.removeItem('__LOCAL_TREE__')

        return newProfile
      }
    },
    [user, selectedTree, setSelectedTree, router, pathname]
  )

  const removeProfile = useCallback(
    async (type: SocialProfileTypes) => {
      if (selectedTree === null) return

      const filteredSocialProfiles = selectedTree.socialProfiles.filter(
        (socialProfile) => socialProfile.type !== type
      )

      if (user === null) {
        setSelectedTree({
          ...selectedTree,
          socialProfiles: filteredSocialProfiles
        })
      } else {
        const response = await deleteSocialProfile({
          treeId: selectedTree.id,
          type
        })

        if (response.success.length > 0) {
          setSelectedTree({
            ...selectedTree,
            socialProfiles: filteredSocialProfiles
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
    saveProfile,
    removeProfile
  }
}
