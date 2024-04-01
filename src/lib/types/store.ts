export interface GlobalsSliceInterface {
  dummyState: boolean
  setDummyState: (dummyState: boolean) => void
}

export interface AvatarSliceInterface {
  avatar: string
  setAvatar: (avatar: string) => void
  avatarToCrop: string
  setAvatarToCrop: (avatar: string) => void
}

export interface SocialMediaSliceInterface {
  step: number
  setStep: (step: number) => void
  selectedMedia: string
  setSelectedMedia: (avatar: string) => void
}

export interface StoreInterface
  extends GlobalsSliceInterface,
    AvatarSliceInterface,
    SocialMediaSliceInterface {}
