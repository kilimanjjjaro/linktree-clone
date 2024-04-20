import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createGlobalsSlice } from '@/lib/store/slices/globals'
import { createAvatarSlice } from '@/lib/store/slices/avatar'
import { createSocialProfilesSlice } from '@/lib/store/slices/social-profiles'
import type { StoreInterface } from '@/lib/types/store'

export const useStore = createWithEqualityFn<StoreInterface>(
  (...a) => ({
    ...createGlobalsSlice(...a),
    ...createAvatarSlice(...a),
    ...createSocialProfilesSlice(...a)
  }),
  shallow
)
