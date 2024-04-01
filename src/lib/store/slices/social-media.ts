import { StateCreator } from 'zustand'
import type { SocialMediaSliceInterface } from '@/lib/types/store'

export const createSocialMediaSlice: StateCreator<SocialMediaSliceInterface> = (
  set
) => ({
  step: 1,
  setStep: (step) => set(() => ({ step })),
  selectedMedia: '',
  setSelectedMedia: (selectedMedia) => set(() => ({ selectedMedia }))
})
