import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type SocialProfileTypes, type Prisma } from '@prisma/client'

import { useStore } from '@/lib/store/store'
import useCurrentUser from '@/lib/hooks/useCurrentUser'
import { createOrUpdateSocialProfile } from '@/lib/actions/trees/create-social-profile'
import { deleteSocialProfile } from '@/lib/actions/trees/delete-social-profile'

export default function useSocialProfiles() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const user = useCurrentUser()

  const saveProfile = useCallback(
    async (data: Prisma.TreeSocialProfileUncheckedCreateInput) => {
      if (selectedTree === null) return null

      if (user === null) {
        const existingIndex = selectedTree.socialProfiles.findIndex(
          (profile) => profile.type === data.type
        )

        const treeToSave = { ...selectedTree }

        if (existingIndex !== -1) {
          treeToSave.socialProfiles[existingIndex].url = data.url
          treeToSave.socialProfiles[existingIndex].updated_at = new Date()
        } else {
          treeToSave.socialProfiles.push({
            ...data,
            id: uuidv4(),
            treeId: selectedTree.id,
            created_at: new Date(),
            updated_at: new Date()
          })
        }

        setSelectedTree(treeToSave)
        localStorage.setItem('__LOCAL_TREE__', JSON.stringify(treeToSave))
      } else {
        const newSocialProfile = await createOrUpdateSocialProfile({
          treeId: selectedTree.id,
          type: data.type,
          url: data.url,
          name: data.name
        })

        if (newSocialProfile === null) return null

        const existingIndex = selectedTree.socialProfiles.findIndex(
          (profile) => profile.type === newSocialProfile.type
        )

        const treeToSave = { ...selectedTree }

        if (existingIndex !== -1) {
          treeToSave.socialProfiles[existingIndex].url = newSocialProfile.url
          treeToSave.socialProfiles[existingIndex].updated_at =
            newSocialProfile.updated_at
        } else {
          treeToSave.socialProfiles.push(newSocialProfile)
        }

        setSelectedTree(treeToSave)
        localStorage.removeItem('__LOCAL_TREE__')

        return newSocialProfile
      }
    },
    [user, selectedTree, setSelectedTree]
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
        await deleteSocialProfile({
          treeId: selectedTree.id,
          type
        })

        setSelectedTree({
          ...selectedTree,
          socialProfiles: filteredSocialProfiles
        })
      }
    },
    [user, selectedTree, setSelectedTree]
  )

  return {
    saveProfile,
    removeProfile
  }
}
