import { type StateCreator } from 'zustand'
import type { GlobalsSliceInterface } from '@/lib/types/store'

export const createGlobalsSlice: StateCreator<GlobalsSliceInterface> = (
  set
) => ({
  saveTreeDialog: false,
  setSaveTreeDialog: (saveTreeDialog) => {
    set(() => ({ saveTreeDialog }))
  }
})
