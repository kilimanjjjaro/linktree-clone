import { type StateCreator } from 'zustand'
import type { LinksSliceInterface } from '@/lib/types/store'

export const createLinksSlice: StateCreator<LinksSliceInterface> = (set) => ({
  selectedLink: null,
  setSelectedLink: (selectedLink) => {
    set(() => ({ selectedLink }))
  },
  showAddLinkDialog: false,
  setShowAddLinkDialog: (showAddLinkDialog) => {
    set(() => ({ showAddLinkDialog }))
  }
})
