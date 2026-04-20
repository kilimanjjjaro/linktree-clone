import type { StateCreator } from 'zustand'
import { type TreesStoreInterface } from '@/lib/types/store'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export const createTreesSlice: StateCreator<TreesStoreInterface> = (set) => ({
  selectedTree: DEMO_TREE_VALUES,
  setSelectedTree: (selectedTree) => {
    set(() => ({ selectedTree }))
  },
  savedTree: DEMO_TREE_VALUES,
  setSavedTree: (savedTree) => {
    set(() => ({ savedTree }))
  },
  isStoreReady: false,
  setIsStoreReady: (isStoreReady) => {
    set(() => ({ isStoreReady }))
  },
  hasUnsavedChanges: false,
  setHasUnsavedChanges: (hasUnsavedChanges) => {
    set(() => ({ hasUnsavedChanges }))
  },
  showSaveTreeDialog: false,
  setShowSaveTreeDialog: (showSaveTreeDialog) => {
    set(() => ({ showSaveTreeDialog }))
  }
})
