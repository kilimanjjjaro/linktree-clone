import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createGlobalsSlice } from '@/lib/store/slices/globals'
import { createSocialProfilesSlice } from '@/lib/store/slices/social-profiles'
import { createTreesSlice } from '@/lib/store/slices/trees'
import type { StoreInterface } from '@/lib/types/store'

export const useStore = createWithEqualityFn<StoreInterface>(
  (...a) => ({
    ...createGlobalsSlice(...a),
    ...createTreesSlice(...a),
    ...createSocialProfilesSlice(...a)
  }),
  shallow
)
