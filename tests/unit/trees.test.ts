import { describe, expect, it } from 'vitest'
import { getTreeChanges } from '@/lib/utils/get-tree-changes'
import {
  generateRawDataToCreate,
  generateRawDataToUpdate
} from '@/lib/utils/generate-raw-data'
import { DEMO_TREE_VALUES, TREE_STATUS } from '@/lib/constants/trees'
import { BG_FLAT_COLOR } from '@/lib/constants/appearance'
import { LINK_IMAGE_URL, LINK_URL, TREE_ID } from '../constants/unit'
import { createLink, createSocialProfile, createTree } from '../utils/trees'

const STRIPPED_KEYS = ['id', 'treeId', 'createdAt', 'updatedAt']

describe('getTreeChanges', () => {
  it('returns null when nothing changed', () => {
    expect(getTreeChanges(createTree(), createTree())).toBeNull()
  })

  it('only includes the fields that changed', () => {
    const saved = createTree()
    const current = createTree({
      name: 'New name',
      status: TREE_STATUS.PUBLISHED
    })

    expect(getTreeChanges(current, saved)).toEqual({
      treeId: TREE_ID,
      fields: { name: 'New name', status: TREE_STATUS.PUBLISHED },
      upsertProfiles: [],
      deleteProfileTypes: [],
      upsertLinks: [],
      deleteLinkUrls: []
    })
  })

  it('detects appearance changes', () => {
    const saved = createTree()
    const current = createTree()
    current.appearance.background.type = BG_FLAT_COLOR

    expect(getTreeChanges(current, saved)?.fields).toEqual({
      appearance: current.appearance
    })
  })

  it('upserts new and edited social profiles and deletes removed ones', () => {
    const saved = createTree({
      socialProfiles: [
        createSocialProfile({ type: 'EMAIL', url: 'old@example.com' }),
        createSocialProfile({ type: 'LINKEDIN', url: 'ada' })
      ]
    })
    const current = createTree({
      socialProfiles: [
        createSocialProfile({ type: 'EMAIL', url: 'new@example.com' }),
        createSocialProfile({ type: 'INSTAGRAM', url: 'ada', name: 'X' })
      ]
    })

    const changes = getTreeChanges(current, saved)

    expect(changes?.fields).toBeUndefined()
    expect(changes?.upsertProfiles).toEqual([
      { type: 'EMAIL', url: 'new@example.com', name: 'Email' },
      { type: 'INSTAGRAM', url: 'ada', name: 'X' }
    ])
    expect(changes?.deleteProfileTypes).toEqual(['LINKEDIN'])
  })

  it('upserts new and edited links and deletes removed ones by url', () => {
    const removedUrl = 'https://removed.example.com/'
    const addedUrl = 'https://added.example.com/'
    const saved = createTree({
      links: [
        createLink({ url: LINK_URL, name: 'Old', featured: false }),
        createLink({ url: removedUrl })
      ]
    })
    const current = createTree({
      links: [
        createLink({
          url: LINK_URL,
          name: 'New',
          featured: true,
          image: LINK_IMAGE_URL
        }),
        createLink({ url: addedUrl, name: 'Added', image: null })
      ]
    })

    const changes = getTreeChanges(current, saved)

    expect(changes?.upsertLinks).toEqual([
      { url: LINK_URL, name: 'New', featured: true, image: LINK_IMAGE_URL },
      {
        url: addedUrl,
        name: 'Added',
        featured: current.links[1].featured,
        image: null
      }
    ])
    expect(changes?.deleteLinkUrls).toEqual([removedUrl])
  })
})

describe('generateRawDataToCreate', () => {
  it('uses the demo tree without ids when no tree is given', () => {
    const data = generateRawDataToCreate()

    expect(data).toMatchObject({
      status: DEMO_TREE_VALUES.status,
      name: DEMO_TREE_VALUES.name,
      url: DEMO_TREE_VALUES.url,
      description: DEMO_TREE_VALUES.description,
      avatar: DEMO_TREE_VALUES.avatar,
      appearance: DEMO_TREE_VALUES.appearance
    })
    expect(data.links.createMany.data).toHaveLength(
      DEMO_TREE_VALUES.links.length
    )
    expect(data.socialProfiles.createMany.data).toHaveLength(
      DEMO_TREE_VALUES.socialProfiles.length
    )
  })

  it('creates the links and social profiles of the tree without their ids', () => {
    const link = createLink({ url: LINK_URL, name: 'Link' })
    const profile = createSocialProfile({ type: 'EMAIL', url: 'a@b.com' })
    const tree = createTree({
      name: 'Mine',
      url: 'mine',
      links: [link],
      socialProfiles: [profile]
    })

    const data = generateRawDataToCreate(tree)

    expect(data.name).toBe('Mine')
    expect(data.url).toBe('mine')
    expect(data.links.createMany.data).toEqual([
      {
        name: 'Link',
        url: LINK_URL,
        featured: link.featured,
        image: link.image
      }
    ])
    expect(data.socialProfiles.createMany.data).toEqual([
      { type: 'EMAIL', url: 'a@b.com', name: profile.name }
    ])
    STRIPPED_KEYS.forEach((key) => {
      expect(data.links.createMany.data[0]).not.toHaveProperty(key)
      expect(data.socialProfiles.createMany.data[0]).not.toHaveProperty(key)
    })
  })
})

describe('generateRawDataToUpdate', () => {
  it('returns null for trees without an id', () => {
    expect(generateRawDataToUpdate()).toBeNull()
    expect(generateRawDataToUpdate({ name: 'No id' })).toBeNull()
  })

  it('returns the fields of the tree without its relations', () => {
    const tree = createTree({ name: 'Mine' })

    expect(generateRawDataToUpdate(tree)).toEqual({
      status: tree.status,
      name: 'Mine',
      url: tree.url,
      description: tree.description,
      avatar: tree.avatar,
      appearance: tree.appearance
    })
  })

  it('falls back to the demo values', () => {
    expect(generateRawDataToUpdate({ id: TREE_ID })).toEqual({
      status: DEMO_TREE_VALUES.status,
      name: DEMO_TREE_VALUES.name,
      url: DEMO_TREE_VALUES.url,
      description: DEMO_TREE_VALUES.description,
      avatar: DEMO_TREE_VALUES.avatar,
      appearance: DEMO_TREE_VALUES.appearance
    })
  })
})
