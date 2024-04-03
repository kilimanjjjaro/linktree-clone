import { DEFAULT_USER_AVATAR } from '@/lib/constants/avatar'
import type { StateCreator } from 'zustand'
import type { AvatarSliceInterface } from '@/lib/types/store'

export const createAvatarSlice: StateCreator<AvatarSliceInterface> = (set) => ({
  avatar: DEFAULT_USER_AVATAR,
  setAvatar: (avatar) => {
    set(() => ({ avatar }))
  },
  avatarToCrop: '',
  setAvatarToCrop: (avatarToCrop) => {
    set(() => ({ avatarToCrop }))
  }
})
