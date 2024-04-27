import type { StateCreator } from 'zustand'
import { type TreesStoreInterface } from '@/lib/types/trees'

export const createTreesSlice: StateCreator<TreesStoreInterface> = (set) => ({
  selectedTree: null,
  setSelectedTree: (selectedTree) => {
    set(() => ({ selectedTree }))
  }
})
