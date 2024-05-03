import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import type { StateCreator } from 'zustand'
import type { AvatarSliceInterface } from '@/lib/types/store'

export const createAvatarSlice: StateCreator<AvatarSliceInterface> = (set) => ({
  avatar: DEMO_TREE_VALUES.avatar,
  setAvatar: (avatar) => {
    set(() => ({ avatar }))
  },
  avatarToCrop: '',
  setAvatarToCrop: (avatarToCrop) => {
    set(() => ({ avatarToCrop }))
  }
})
