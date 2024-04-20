import { DEFAULT_TREE_AVATAR } from '@/lib/constants/trees'
import type { StateCreator } from 'zustand'
import type { AvatarSliceInterface } from '@/lib/types/store'

export const createAvatarSlice: StateCreator<AvatarSliceInterface> = (set) => ({
  avatar: DEFAULT_TREE_AVATAR,
  setAvatar: (avatar) => {
    set(() => ({ avatar }))
  },
  avatarToCrop: '',
  setAvatarToCrop: (avatarToCrop) => {
    set(() => ({ avatarToCrop }))
  }
})
