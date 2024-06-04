import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

import { createTreesSlice } from '@/lib/store/slices/trees'
import { createSocialProfilesSlice } from '@/lib/store/slices/social-profiles'
import { createLinksSlice } from '@/lib/store/slices/links'
import type { StoreInterface } from '@/lib/types/store'

export const useStore = createWithEqualityFn<StoreInterface>(
  (...a) => ({
    ...createTreesSlice(...a),
    ...createSocialProfilesSlice(...a),
    ...createLinksSlice(...a)
  }),
  shallow
)
