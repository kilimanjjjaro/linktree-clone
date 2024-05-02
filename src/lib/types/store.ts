import {
  type TreeSocialProfilesInterface,
  type SocialProfileInterface
} from '@/lib/types/globals'
import { type ExtendedTree } from '@/lib/types/trees'

export interface GlobalsSliceInterface {
  saveTreeDialog: boolean
  setSaveTreeDialog: (saveTreeDialog: boolean) => void
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
  selectedTree: ExtendedTree | null
  setSelectedTree: (selectedTree: ExtendedTree) => void
}

export interface StoreInterface
  extends GlobalsSliceInterface,
    AvatarSliceInterface,
    SocialProfilesSliceInterface,
    TreesStoreInterface {}
