import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import {
  StoreProvider,
  useStore,
  useStoreApi
} from '@/lib/store/store-provider'
import useLinks from '@/lib/hooks/useLinks'
import useSocialProfiles from '@/lib/hooks/useSocialProfiles'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { LINK_IMAGE_URL, LINK_URL } from '../../constants/unit'

const NEW_LINK_URL = 'https://new.example.com/'
const NEXT_ITEM = 1

function wrapper({ children }: { children: ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>
}

function renderWithStore<T>(hook: () => T) {
  return renderHook(
    () => ({
      hook: hook(),
      tree: useStore((state) => state.selectedTree)
    }),
    { wrapper }
  )
}

describe('useStore', () => {
  it('requires a StoreProvider', () => {
    expect(() => renderHook(() => useStore((state) => state.step))).toThrow(
      'useStore must be used within a StoreProvider'
    )
    expect(() => renderHook(() => useStoreApi())).toThrow(
      'useStoreApi must be used within a StoreProvider'
    )
  })
})

describe('useLinks', () => {
  const link = {
    treeId: DEMO_TREE_VALUES.id,
    name: 'New link',
    url: NEW_LINK_URL,
    featured: true,
    image: LINK_IMAGE_URL
  }

  it('adds a link to the selected tree', async () => {
    const { result } = renderWithStore(useLinks)

    let added: Awaited<ReturnType<typeof result.current.hook.addLink>> = null
    await act(async () => {
      added = await result.current.hook.addLink(link)
    })

    expect(added).toMatchObject(link)
    expect(result.current.tree.links).toHaveLength(
      DEMO_TREE_VALUES.links.length + NEXT_ITEM
    )
    expect(result.current.tree.links.at(-NEXT_ITEM)).toMatchObject(link)
  })

  it('drops the image of links that are not featured', async () => {
    const { result } = renderWithStore(useLinks)

    await act(async () => {
      await result.current.hook.addLink({ ...link, featured: false })
    })

    expect(result.current.tree.links.at(-NEXT_ITEM)?.image).toBeNull()
  })

  it('updates the link with the same url instead of adding it again', async () => {
    const { result } = renderWithStore(useLinks)
    const [existing] = DEMO_TREE_VALUES.links

    await act(async () => {
      await result.current.hook.addLink({
        ...link,
        url: existing.url,
        name: 'Renamed'
      })
    })

    expect(result.current.tree.links).toHaveLength(
      DEMO_TREE_VALUES.links.length
    )
    expect(result.current.tree.links[0]).toMatchObject({
      id: existing.id,
      url: existing.url,
      name: 'Renamed'
    })
  })

  it('ignores invalid links', async () => {
    const { result } = renderWithStore(useLinks)

    let added: unknown
    await act(async () => {
      added = await result.current.hook.addLink({ ...link, url: 'nope' })
    })

    expect(added).toBeNull()
    expect(result.current.tree.links).toEqual(DEMO_TREE_VALUES.links)
  })

  it('removes a link', () => {
    const { result } = renderWithStore(useLinks)
    const [removed] = DEMO_TREE_VALUES.links

    act(() => {
      result.current.hook.removeLink(removed.id)
    })

    expect(result.current.tree.links.map((item) => item.id)).not.toContain(
      removed.id
    )
    expect(result.current.tree.links).toHaveLength(
      DEMO_TREE_VALUES.links.length - NEXT_ITEM
    )
  })

  it('keeps the links when removing an unknown one', () => {
    const { result } = renderWithStore(useLinks)

    act(() => {
      result.current.hook.removeLink(LINK_URL)
    })

    expect(result.current.tree.links).toEqual(DEMO_TREE_VALUES.links)
  })
})

describe('useSocialProfiles', () => {
  it('adds a social profile to the selected tree', () => {
    const { result } = renderWithStore(useSocialProfiles)

    act(() => {
      result.current.hook.saveProfile({
        treeId: DEMO_TREE_VALUES.id,
        type: 'YOUTUBE',
        name: 'YouTube',
        url: 'ada'
      })
    })

    expect(result.current.tree.socialProfiles.at(-NEXT_ITEM)).toMatchObject({
      treeId: DEMO_TREE_VALUES.id,
      type: 'YOUTUBE',
      url: 'ada'
    })
  })

  it('updates the url of an existing type', () => {
    const { result } = renderWithStore(useSocialProfiles)
    const [existing] = DEMO_TREE_VALUES.socialProfiles

    act(() => {
      result.current.hook.saveProfile({
        treeId: DEMO_TREE_VALUES.id,
        type: existing.type,
        name: existing.name,
        url: 'new@example.com'
      })
    })

    expect(result.current.tree.socialProfiles).toHaveLength(
      DEMO_TREE_VALUES.socialProfiles.length
    )
    expect(result.current.tree.socialProfiles[0]).toMatchObject({
      id: existing.id,
      url: 'new@example.com'
    })
  })

  it('removes a social profile by type', () => {
    const { result } = renderWithStore(useSocialProfiles)
    const [removed] = DEMO_TREE_VALUES.socialProfiles

    act(() => {
      result.current.hook.removeProfile(removed.type)
    })

    expect(
      result.current.tree.socialProfiles.map((profile) => profile.type)
    ).not.toContain(removed.type)
  })
})
