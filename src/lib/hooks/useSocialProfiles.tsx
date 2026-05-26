import { useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import {
  type SocialProfileTypes,
  type Prisma
} from "@/generated/prisma/browser"

import { useStore } from "@/lib/store/store-provider"

export default function useSocialProfiles() {
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const selectedTree = useStore((state) => state.selectedTree)

  const saveProfile = useCallback(
    (data: Prisma.TreeSocialProfileUncheckedCreateInput) => {
      if (selectedTree === null) return null

      const existingProfiles = [...selectedTree.socialProfiles]
      const existingIndex = existingProfiles.findIndex(
        (profile) => profile.type === data.type
      )

      const newProfile = {
        ...data,
        id: uuidv4(),
        treeId: selectedTree.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      if (existingIndex !== -1) {
        existingProfiles[existingIndex] = {
          ...existingProfiles[existingIndex],
          url: data.url,
          updatedAt: new Date()
        }
      } else {
        existingProfiles.push(newProfile)
      }

      const treeToSave = {
        ...selectedTree,
        socialProfiles: existingProfiles
      }

      setSelectedTree(treeToSave)

      return newProfile
    },
    [selectedTree, setSelectedTree]
  )

  const removeProfile = useCallback(
    (type: SocialProfileTypes) => {
      if (selectedTree === null) return

      const filteredSocialProfiles = selectedTree.socialProfiles.filter(
        (socialProfile) => socialProfile.type !== type
      )

      const treeToSave = {
        ...selectedTree,
        socialProfiles: filteredSocialProfiles
      }

      setSelectedTree(treeToSave)
    },
    [selectedTree, setSelectedTree]
  )

  return {
    saveProfile,
    removeProfile
  }
}
