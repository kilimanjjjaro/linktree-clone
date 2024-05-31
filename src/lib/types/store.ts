import { type SocialProfileInterface } from '@/lib/types/globals'
import { type TreeInterface } from '@/lib/types/trees'

export interface SocialProfilesSliceInterface {
  selectedSocialProfile: SocialProfileInterface | null
  setSelectedSocialProfile: (
    selectedSocialProfile: SocialProfileInterface | null
  ) => void
  step: number
  setStep: (step: number) => void
}

export interface TreesStoreInterface {
  selectedTree: TreeInterface | null
  setSelectedTree: (selectedTree: TreeInterface) => void
  savingTree: boolean
  setSavingTree: (savingTree: boolean) => void
  showSaveTreeDialog: boolean
  setShowSaveTreeDialog: (showSaveTreeDialog: boolean) => void
}

export interface StoreInterface
  extends TreesStoreInterface,
    SocialProfilesSliceInterface {}
