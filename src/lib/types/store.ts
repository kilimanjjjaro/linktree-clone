import {
  type TreeSocialProfilesInterface,
  type SocialProfileInterface
} from '@/lib/types/globals'
import { type TreeInterface } from '@/lib/types/trees'

export interface GlobalsSliceInterface {
  showDialog: number
  setShowDialog: (showDialog: number) => void
  savingTree: boolean
  setSavingTree: (savingTree: boolean) => void
}

export interface AvatarSliceInterface {
  avatar: string
  setAvatar: (avatar: string) => void
  avatarToCrop: string
  setAvatarToCrop: (avatar: string) => void
}

export interface SocialProfilesSliceInterface {
  socialProfiles: TreeSocialProfilesInterface[]
  setSocialProfiles: (socialProfiles: TreeSocialProfilesInterface[]) => void
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
    AvatarSliceInterface,
    SocialProfilesSliceInterface,
    TreesStoreInterface {}
