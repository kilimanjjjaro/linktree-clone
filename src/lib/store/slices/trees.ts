import type { StateCreator } from 'zustand'
import { type TreesStoreInterface } from '@/lib/types/store'

export const createTreesSlice: StateCreator<TreesStoreInterface> = (set) => ({
  selectedTree: null,
  setSelectedTree: (selectedTree) => {
    set(() => ({ selectedTree }))
  }
})
