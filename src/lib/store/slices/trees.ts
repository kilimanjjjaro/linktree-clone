import type { StateCreator } from 'zustand'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import { type TreesStoreInterface } from '@/lib/types/trees'

export const createTreesSlice: StateCreator<TreesStoreInterface> = (set) => ({
  trees: [DEFAULT_THREE_VALUE],
  setTrees: (trees) => {
    set(() => ({ trees }))
  }
})
