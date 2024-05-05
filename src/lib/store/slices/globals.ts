import { type StateCreator } from 'zustand'
import { DIALOG } from '@/lib/constants/globals'
import type { GlobalsSliceInterface } from '@/lib/types/store'

export const createGlobalsSlice: StateCreator<GlobalsSliceInterface> = (
  set
) => ({
  showDialog: DIALOG.HIDDEN,
  setShowDialog: (showDialog) => {
    set(() => ({ showDialog }))
  },
  savingTree: false,
  setSavingTree: (savingTree) => {
    set(() => ({ savingTree }))
  }
})
