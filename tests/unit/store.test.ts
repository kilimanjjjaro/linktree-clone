import { describe, expect, it } from 'vitest'
import { createAppStore } from '@/lib/store/store'
import { DEMO_TREE_VALUES, PREVIEW_VIEWPORT } from '@/lib/constants/trees'
import { SOCIAL_PROFILES } from '@/lib/constants/social-profiles'
import { createLink, createTree } from '../utils/trees'

const SECOND_STEP = 2

describe('createAppStore', () => {
  it('starts with the demo tree and closed dialogs', () => {
    const state = createAppStore().getState()

    expect(state.selectedTree).toEqual(DEMO_TREE_VALUES)
    expect(state.savedTree).toEqual(DEMO_TREE_VALUES)
    expect(state.isStoreReady).toBe(false)
    expect(state.showSaveTreeDialog).toBe(false)
    expect(state.showAddLinkDialog).toBe(false)
    expect(state.selectedLink).toBeNull()
    expect(state.selectedSocialProfile).toBeNull()
    expect(state.step).toBe(1)
    expect(state.previewViewport).toBe(PREVIEW_VIEWPORT.MOBILE)
  })

  it('creates independent stores', () => {
    const first = createAppStore()
    const second = createAppStore()

    first.getState().setIsStoreReady(true)

    expect(second.getState().isStoreReady).toBe(false)
  })

  it('loads a tree as both the selected and the saved tree', () => {
    const store = createAppStore()
    const tree = createTree({ name: 'Loaded' })

    store.getState().loadTree(tree)

    expect(store.getState().selectedTree).toBe(tree)
    expect(store.getState().savedTree).toBe(tree)
  })

  it('changes the selected tree without changing the saved tree', () => {
    const store = createAppStore()
    const tree = createTree({ name: 'Edited' })

    store.getState().setSelectedTree(tree)

    expect(store.getState().selectedTree).toBe(tree)
    expect(store.getState().savedTree).toEqual(DEMO_TREE_VALUES)
  })

  it('updates every setter value', () => {
    const store = createAppStore()
    const link = createLink()
    const [socialProfile] = SOCIAL_PROFILES
    const savedTree = createTree({ name: 'Saved' })
    const {
      setSavedTree,
      setShowSaveTreeDialog,
      setPreviewViewport,
      setSelectedLink,
      setShowAddLinkDialog,
      setSelectedSocialProfile,
      setStep
    } = store.getState()

    setSavedTree(savedTree)
    setShowSaveTreeDialog(true)
    setPreviewViewport(PREVIEW_VIEWPORT.DESKTOP)
    setSelectedLink(link)
    setShowAddLinkDialog(true)
    setSelectedSocialProfile(socialProfile)
    setStep(SECOND_STEP)

    expect(store.getState()).toMatchObject({
      savedTree,
      showSaveTreeDialog: true,
      previewViewport: PREVIEW_VIEWPORT.DESKTOP,
      selectedLink: link,
      showAddLinkDialog: true,
      selectedSocialProfile: socialProfile,
      step: SECOND_STEP
    })
  })
})
