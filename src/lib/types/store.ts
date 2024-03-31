export interface GlobalsSliceInterface {
  dummyState: boolean
  setDummyState: (dummyState: boolean) => void
}

export interface AvatarSliceInterface {
  avatar: string | null
  setAvatar: (avatar: string) => void
  avatarToCrop: string | null
  setAvatarToCrop: (avatar: string) => void
}

export interface StoreInterface
  extends GlobalsSliceInterface,
    AvatarSliceInterface {}
