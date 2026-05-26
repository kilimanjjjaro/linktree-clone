import { type TreeLink } from "@/generated/prisma/browser"

import { type SocialProfileInterface } from "@/lib/types/globals"
import { type TreeInterface } from "@/lib/types/trees"

export interface TreesStoreInterface {
  selectedTree: TreeInterface
  setSelectedTree: (selectedTree: TreeInterface) => void
  savedTree: TreeInterface
  setSavedTree: (savedTree: TreeInterface) => void
  loadTree: (tree: TreeInterface) => void
  isStoreReady: boolean
  setIsStoreReady: (isStoreReady: boolean) => void
  showSaveTreeDialog: boolean
  setShowSaveTreeDialog: (showSaveTreeDialog: boolean) => void
  previewViewport: string
  setPreviewViewport: (previewViewport: string) => void
}

export interface SocialProfilesSliceInterface {
  selectedSocialProfile: SocialProfileInterface | null
  setSelectedSocialProfile: (
    selectedSocialProfile: SocialProfileInterface | null
  ) => void
  step: number
  setStep: (step: number) => void
}

export interface LinksSliceInterface {
  selectedLink: TreeLink | null
  setSelectedLink: (selectedLink: TreeLink | null) => void
  showAddLinkDialog: boolean
  setShowAddLinkDialog: (showAddLinkDialog: boolean) => void
}

export interface StoreInterface
  extends
    TreesStoreInterface,
    SocialProfilesSliceInterface,
    LinksSliceInterface {}
