import { useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { type SocialProfileTypes, type Prisma } from '@prisma/client'

import { useStore } from '@/lib/store/store'
import { useCurrentUser } from '@/lib/hooks/useCurrentUser'
import { createOrUpdateSocialProfile } from '@/lib/actions/trees/create-social-profile'
import { deleteSocialProfile } from '@/lib/actions/trees/delete-social-profile'

export default function useSocialProfiles() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)
  const user = useCurrentUser()

  const saveProfiles = useCallback(
    async (data: Prisma.TreeSocialProfileUncheckedCreateInput) => {
      if (selectedTree === null) return null

      if (user === null) {
        const socialProfiles = [...selectedTree.socialProfiles]

        const existingProfile = socialProfiles.find(
          (profile) => profile.type === data.type
        )

        if (existingProfile !== undefined) {
          existingProfile.url = data.url
        } else {
          socialProfiles.push({
            ...data,
            id: uuidv4(),
            treeId: selectedTree.id,
            created_at: new Date(),
            updated_at: new Date()
          })
        }

        const treeToSave = {
          ...selectedTree,
          socialProfiles
        }

        setSelectedTree(treeToSave)
        localStorage.setItem('__LOCAL_TREE__', JSON.stringify(treeToSave))
      } else {
        const newSocialProfiles = await createOrUpdateSocialProfile({
          treeId: selectedTree.id,
          type: data.type,
          url: data.url,
          name: data.name
        })

        if (newSocialProfiles !== null) {
          setSelectedTree({
            ...selectedTree,
            socialProfiles: [...selectedTree.socialProfiles, newSocialProfiles]
          })
        }

        return newSocialProfiles
      }
    },
    [user, selectedTree, setSelectedTree]
  )

  const removeProfile = useCallback(
    async (type: SocialProfileTypes) => {
      if (selectedTree === null) return null

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
    saveProfiles,
    removeProfile
  }
}
