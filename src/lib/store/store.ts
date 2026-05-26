import { createStore } from 'zustand/vanilla'

import { createTreesSlice } from '@/lib/store/slices/trees'
import { createSocialProfilesSlice } from '@/lib/store/slices/social-profiles'
import { createLinksSlice } from '@/lib/store/slices/links'
import type { StoreInterface } from '@/lib/types/store'

export type AppStore = ReturnType<typeof createAppStore>

export const createAppStore = () =>
  createStore<StoreInterface>()((...a) => ({
    ...createTreesSlice(...a),
    ...createSocialProfilesSlice(...a),
    ...createLinksSlice(...a)
  }))
