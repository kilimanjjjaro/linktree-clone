import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createGlobalsSlice } from '@/lib/store/slices/globals'
import type { StoreInterface } from '@/lib/types/store'

export const useStore = createWithEqualityFn<StoreInterface>(
  (...a) => ({
    ...createGlobalsSlice(...a)
  }),
  shallow
)
