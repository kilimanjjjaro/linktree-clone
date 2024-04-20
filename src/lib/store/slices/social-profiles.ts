import { type StateCreator } from 'zustand'
import type { SocialProfilesSliceInterface } from '@/lib/types/store'

export const createSocialProfilesSlice: StateCreator<
  SocialProfilesSliceInterface
> = (set) => ({
  socialProfiles: [],
  setSocialProfiles: (socialProfiles) => {
    set(() => ({ socialProfiles }))
  },
  selectedSocialProfile: null,
  setSelectedSocialProfile: (selectedSocialProfile) => {
    set(() => ({ selectedSocialProfile }))
  },
  step: 1,
  setStep: (step) => {
    set(() => ({ step }))
  }
})
