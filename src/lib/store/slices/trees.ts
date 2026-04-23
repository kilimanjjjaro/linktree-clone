import type { StateCreator } from 'zustand'
import { type TreesStoreInterface } from '@/lib/types/store'
import { DEMO_TREE_VALUES, PREVIEW_VIEWPORT } from '@/lib/constants/trees'
import { getTreeChanges } from '@/lib/utils/get-tree-changes'

export const createTreesSlice: StateCreator<TreesStoreInterface> = (set) => ({
  selectedTree: DEMO_TREE_VALUES,
  setSelectedTree: (selectedTree) => {
    set((state) => ({
      selectedTree,
      hasUnsavedChanges:
        getTreeChanges(selectedTree, state.savedTree) !== null
    }))
  },
  savedTree: DEMO_TREE_VALUES,
  setSavedTree: (savedTree) => {
    set((state) => ({
      savedTree,
      hasUnsavedChanges:
        getTreeChanges(state.selectedTree, savedTree) !== null
    }))
  },
  isStoreReady: false,
  setIsStoreReady: (isStoreReady) => {
    set(() => ({ isStoreReady }))
  },
  hasUnsavedChanges: false,
  showSaveTreeDialog: false,
  setShowSaveTreeDialog: (showSaveTreeDialog) => {
    set(() => ({ showSaveTreeDialog }))
  },
  previewViewport: PREVIEW_VIEWPORT.MOBILE,
  setPreviewViewport: (previewViewport) => {
    set(() => ({ previewViewport }))
  }
})
