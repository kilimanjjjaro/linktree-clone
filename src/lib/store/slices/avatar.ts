import { StateCreator } from 'zustand'
import type { AvatarSliceInterface } from '@/lib/types/store'

export const createAvatarSlice: StateCreator<AvatarSliceInterface> = (set) => ({
  avatar: null,
  setAvatar: (avatar) => set(() => ({ avatar })),
  avatarToCrop: null,
  setAvatarToCrop: (avatarToCrop) => set(() => ({ avatarToCrop }))
})
