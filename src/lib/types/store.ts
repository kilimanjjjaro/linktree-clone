import { type SocialProfileInterface } from '@/lib/types/globals'
import { type TreeInterface } from '@/lib/types/trees'

export interface GlobalsSliceInterface {
  showDialog: number
  setShowDialog: (showDialog: number) => void
  savingTree: boolean
  setSavingTree: (savingTree: boolean) => void
}

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
}

export interface StoreInterface
  extends GlobalsSliceInterface,
    SocialProfilesSliceInterface,
    TreesStoreInterface {}
