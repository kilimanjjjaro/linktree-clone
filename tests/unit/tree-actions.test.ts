import { beforeEach, describe, expect, it, vi } from 'vitest'
import mql from '@microlink/mql'
import { createTree as createTreeAction } from '@/lib/actions/trees/create-tree'
import { createDefaultTree } from '@/lib/actions/trees/create-default-tree'
import { deleteTree } from '@/lib/actions/trees/delete-tree'
import { syncTree } from '@/lib/actions/trees/sync-tree'
import { deleteCloudinaryAsset } from '@/lib/actions/trees/delete-cloudinary-asset'
import { extractLinkImage } from '@/lib/actions/trees/extract-link-image'
import { updateAvatar } from '@/lib/actions/trees/update-avatar'
import { updateBackground } from '@/lib/actions/trees/update-background'
import { updateLinkImage } from '@/lib/actions/trees/update-link-image'
import { DEFAULT_TREE_NAME } from '@/lib/constants/trees'
import type { TreeChanges } from '@/lib/types/trees'
import {
  APP_ASSET_URL,
  AVATAR_ASSET_URL,
  AVATAR_PUBLIC_ID,
  FIRST_ARGUMENT,
  FIRST_CALL,
  LINK_IMAGE_URL,
  LINK_URL,
  OTHER_USER_ID,
  RECORD_NOT_FOUND_CODE,
  TREE_ID,
  UNIQUE_CONSTRAINT_CODE,
  UPLOAD_RESULT,
  USER_ID
} from '../constants/unit'
import { databaseMock } from '../utils/database'
import { mockNoSession, mockSession } from '../utils/auth'
import { cloudinaryMock, revalidateTagMock } from '../utils/services'
import { createPrismaError } from '../utils/prisma'
import { createLink, createSocialProfile, createTree } from '../utils/trees'

vi.mock('@/lib/database', async () => ({
  default: (await import('../utils/database')).databaseMock
}))
vi.mock('@/lib/auth', async () => (await import('../utils/auth')).authMock)
vi.mock('@/lib/cloudinary', async () => ({
  cloudinary: (await import('../utils/services')).cloudinaryMock
}))
vi.mock('next/cache', async () => ({
  revalidateTag: (await import('../utils/services')).revalidateTagMock
}))
vi.mock('@microlink/mql', () => ({ default: vi.fn() }))

const IDS = ['id', 'treeId', 'createdAt', 'updatedAt']

function createChanges(overrides: Partial<TreeChanges> = {}): TreeChanges {
  return {
    treeId: TREE_ID,
    upsertProfiles: [],
    deleteProfileTypes: [],
    upsertLinks: [],
    deleteLinkUrls: [],
    ...overrides
  }
}

function mockTreeOwnedBy(ownerId: string) {
  const tree = createTree({ authorId: ownerId })
  const isOwner = (where: { authorId?: string }) =>
    where.authorId === undefined || where.authorId === ownerId
  const notFound = () => createPrismaError(RECORD_NOT_FOUND_CODE)

  databaseMock.tree.findFirst.mockImplementation(async ({ where }) =>
    isOwner(where) ? tree : null
  )
  databaseMock.tree.findFirstOrThrow.mockImplementation(async ({ where }) => {
    if (isOwner(where)) return tree
    throw notFound()
  })
  databaseMock.tree.findUnique.mockImplementation(async ({ where }) =>
    isOwner(where) ? tree : null
  )
  databaseMock.tree.findUniqueOrThrow.mockImplementation(async ({ where }) => {
    if (isOwner(where)) return tree
    throw notFound()
  })
  databaseMock.tree.update.mockImplementation(async ({ where }) => {
    if (isOwner(where)) return tree
    throw notFound()
  })

  return tree
}

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

describe('createTree', () => {
  it('requires a session', async () => {
    mockNoSession()

    expect(await createTreeAction(createTree())).toEqual({
      data: null,
      error: 'Must log in to create trees.',
      success: ''
    })
    expect(databaseMock.tree.create).not.toHaveBeenCalled()
  })

  it('creates the tree for the current user', async () => {
    mockSession()
    const tree = createTree({ authorId: OTHER_USER_ID })
    databaseMock.tree.create.mockResolvedValue(tree)

    const result = await createTreeAction(tree)

    expect(result).toEqual({ data: tree, error: '', success: 'Tree created.' })

    const { data, include } =
      databaseMock.tree.create.mock.calls[FIRST_CALL][FIRST_ARGUMENT]
    expect(data.authorId).toBe(USER_ID)
    expect(data.name).toBe(tree.name)
    expect(include).toEqual({ links: true, socialProfiles: true })
    data.links.createMany.data.forEach((link: object) => {
      IDS.forEach((key) => {
        expect(link).not.toHaveProperty(key)
      })
    })
    expect(revalidateTagMock).toHaveBeenCalledWith('trees', 'max')
  })

  it('reports a url that is already used', async () => {
    mockSession()
    databaseMock.tree.create.mockRejectedValue(
      createPrismaError(UNIQUE_CONSTRAINT_CODE)
    )

    expect((await createTreeAction(createTree())).error).toBe(
      'A tree with this URL already exists.'
    )
  })

  it('reports unexpected errors', async () => {
    mockSession()
    databaseMock.tree.create.mockRejectedValue(new Error('down'))

    expect((await createTreeAction(createTree())).error).toBe(
      'Something went wrong.'
    )
    expect(revalidateTagMock).not.toHaveBeenCalled()
  })
})

describe('createDefaultTree', () => {
  it('requires a session', async () => {
    mockNoSession()

    expect((await createDefaultTree()).error).toBe(
      'Must log in to create trees.'
    )
  })

  it.each([
    { existing: [], name: DEFAULT_TREE_NAME, url: 'example-tree' },
    {
      existing: [DEFAULT_TREE_NAME],
      name: `${DEFAULT_TREE_NAME} 2`,
      url: 'example-tree-2'
    },
    {
      existing: [DEFAULT_TREE_NAME, `${DEFAULT_TREE_NAME} 4`],
      name: `${DEFAULT_TREE_NAME} 5`,
      url: 'example-tree-5'
    },
    {
      existing: [`${DEFAULT_TREE_NAME} copy`],
      name: `${DEFAULT_TREE_NAME} 1`,
      url: 'example-tree-1'
    }
  ])(
    'names the new tree "$name" after $existing',
    async ({ existing, name, url }) => {
      mockSession()
      databaseMock.tree.findMany.mockResolvedValue(
        existing.map((treeName) => ({ name: treeName }))
      )
      databaseMock.tree.create.mockImplementation(async ({ data }) => data)

      const result = await createDefaultTree()

      expect(result.success).toBe('Task created.')
      expect(databaseMock.tree.findMany).toHaveBeenCalledWith({
        where: { authorId: USER_ID, name: { startsWith: DEFAULT_TREE_NAME } },
        select: { name: true }
      })
      expect(result.data).toMatchObject({ authorId: USER_ID, name, url })
      expect(revalidateTagMock).toHaveBeenCalledWith('trees', 'max')
    }
  )

  it('picks a url that no other user has taken', async () => {
    mockSession()
    const takenUrls = ['example-tree', 'example-tree-2', 'example-tree-x']
    databaseMock.tree.findMany.mockImplementation(
      async ({ where }: { where: { url?: { startsWith: string } } }) =>
        where.url === undefined
          ? []
          : takenUrls
              .filter((url) => url.startsWith(where.url?.startsWith ?? ''))
              .map((url) => ({ url }))
    )
    databaseMock.tree.create.mockImplementation(async ({ data }) => data)

    const result = await createDefaultTree()

    expect(result.data).toMatchObject({
      name: DEFAULT_TREE_NAME,
      url: 'example-tree-3'
    })
  })

  it('reports a url that is already used', async () => {
    mockSession()
    databaseMock.tree.findMany.mockResolvedValue([])
    databaseMock.tree.create.mockRejectedValue(
      createPrismaError(UNIQUE_CONSTRAINT_CODE)
    )

    expect((await createDefaultTree()).error).toBe(
      'A tree with this URL already exists.'
    )
  })
})

describe('deleteTree', () => {
  it('requires a session', async () => {
    mockNoSession()

    expect(await deleteTree(TREE_ID)).toEqual({
      error: 'Must log in to delete trees.',
      success: ''
    })
    expect(databaseMock.tree.delete).not.toHaveBeenCalled()
  })

  it('deletes the tree and refreshes the trees', async () => {
    mockSession()

    expect(await deleteTree(TREE_ID)).toEqual({
      error: '',
      success: 'Tree deleted.'
    })
    expect(databaseMock.tree.delete).toHaveBeenCalledWith({
      where: expect.objectContaining({ id: TREE_ID })
    })
    expect(revalidateTagMock).toHaveBeenCalledWith('trees', 'max')
  })

  it('only deletes trees of the current user', async () => {
    mockSession()

    await deleteTree(TREE_ID)

    expect(databaseMock.tree.delete).toHaveBeenCalledWith({
      where: { id: TREE_ID, authorId: USER_ID }
    })
  })

  it('reports database errors', async () => {
    mockSession()
    databaseMock.tree.delete.mockRejectedValue(new Error('down'))

    expect((await deleteTree(TREE_ID)).error).toBe('Something went wrong.')
  })
})

describe('syncTree', () => {
  it('requires a session', async () => {
    mockNoSession()

    expect((await syncTree(createChanges())).error).toBe(
      'Must log in to sync trees.'
    )
    expect(databaseMock.$transaction).not.toHaveBeenCalled()
  })

  it('updates only the changed fields of a tree of the current user', async () => {
    mockSession()
    const tree = mockTreeOwnedBy(USER_ID)

    const result = await syncTree(
      createChanges({ fields: { name: 'Renamed', status: 1 } })
    )

    expect(result).toEqual({ data: tree, error: '', success: 'Tree synced.' })
    expect(databaseMock.tree.update).toHaveBeenCalledWith({
      where: { id: TREE_ID, authorId: USER_ID },
      data: { name: 'Renamed', status: 1 }
    })
    expect(databaseMock.tree.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: TREE_ID },
      include: { links: true, socialProfiles: true }
    })
    expect(revalidateTagMock).toHaveBeenCalledWith('trees', 'max')
  })

  it('does not update the tree when only its relations changed', async () => {
    mockSession()
    mockTreeOwnedBy(USER_ID)

    await syncTree(createChanges())

    expect(databaseMock.tree.update).not.toHaveBeenCalled()
  })

  it('deletes and upserts the social profiles and links', async () => {
    mockSession()
    mockTreeOwnedBy(USER_ID)
    const profile = createSocialProfile({ type: 'EMAIL', url: 'a@b.com' })
    const link = createLink({ url: LINK_URL, image: LINK_IMAGE_URL })
    const removedUrl = 'https://removed.example.com/'

    await syncTree(
      createChanges({
        deleteProfileTypes: ['LINKEDIN'],
        upsertProfiles: [
          { type: profile.type, url: profile.url, name: profile.name }
        ],
        deleteLinkUrls: [removedUrl],
        upsertLinks: [
          {
            name: link.name,
            url: link.url,
            featured: link.featured,
            image: link.image
          }
        ]
      })
    )

    expect(databaseMock.treeSocialProfile.deleteMany).toHaveBeenCalledWith({
      where: { treeId: TREE_ID, type: { in: ['LINKEDIN'] } }
    })
    expect(databaseMock.treeSocialProfile.upsert).toHaveBeenCalledWith({
      where: { treeId_type: { treeId: TREE_ID, type: 'EMAIL' } },
      update: { name: profile.name, url: profile.url },
      create: {
        treeId: TREE_ID,
        type: 'EMAIL',
        name: profile.name,
        url: profile.url
      }
    })
    expect(databaseMock.treeLink.deleteMany).toHaveBeenCalledWith({
      where: { treeId: TREE_ID, url: { in: [removedUrl] } }
    })
    expect(databaseMock.treeLink.upsert).toHaveBeenCalledWith({
      where: { treeId_url: { treeId: TREE_ID, url: LINK_URL } },
      update: {
        name: link.name,
        featured: link.featured,
        image: LINK_IMAGE_URL
      },
      create: {
        treeId: TREE_ID,
        name: link.name,
        url: LINK_URL,
        featured: link.featured,
        image: LINK_IMAGE_URL
      }
    })
  })

  it('rejects field changes on trees of other users', async () => {
    mockSession()
    mockTreeOwnedBy(OTHER_USER_ID)

    const result = await syncTree(createChanges({ fields: { name: 'Mine' } }))

    expect(result.error).toBe('Something went wrong.')
    expect(revalidateTagMock).not.toHaveBeenCalled()
  })

  it('does not change the links or social profiles of trees of other users', async () => {
    mockSession()
    mockTreeOwnedBy(OTHER_USER_ID)

    const result = await syncTree(
      createChanges({
        deleteProfileTypes: ['EMAIL'],
        deleteLinkUrls: [LINK_URL]
      })
    )

    expect(result.data).toBeNull()
    expect(databaseMock.treeSocialProfile.deleteMany).not.toHaveBeenCalled()
    expect(databaseMock.treeLink.deleteMany).not.toHaveBeenCalled()
  })

  it('reports a url that is already used', async () => {
    mockSession()
    mockTreeOwnedBy(USER_ID)
    databaseMock.tree.update.mockRejectedValue(
      createPrismaError(UNIQUE_CONSTRAINT_CODE)
    )

    expect(
      (await syncTree(createChanges({ fields: { url: 'taken' } }))).error
    ).toBe('A tree with this URL already exists.')
  })
})

describe('deleteCloudinaryAsset', () => {
  it('only deletes images uploaded by users', async () => {
    expect(await deleteCloudinaryAsset(APP_ASSET_URL)).toBe(false)
    expect(cloudinaryMock.uploader.destroy).not.toHaveBeenCalled()
  })

  it('deletes and invalidates the image', async () => {
    expect(await deleteCloudinaryAsset(AVATAR_ASSET_URL)).toBe(true)
    expect(cloudinaryMock.uploader.destroy).toHaveBeenCalledWith(
      AVATAR_PUBLIC_ID,
      { resource_type: 'image', invalidate: true }
    )
  })

  it('reports cloudinary errors', async () => {
    cloudinaryMock.uploader.destroy.mockRejectedValue(new Error('cloudinary'))

    expect(await deleteCloudinaryAsset(AVATAR_ASSET_URL)).toBe(false)
  })
})

describe('extractLinkImage', () => {
  it('uploads the image of the site', async () => {
    vi.mocked(mql).mockResolvedValue({
      data: { image: { url: LINK_IMAGE_URL } }
    } as never)
    cloudinaryMock.uploader.upload.mockResolvedValue(UPLOAD_RESULT)

    expect(await extractLinkImage(LINK_URL)).toEqual(UPLOAD_RESULT)
    expect(mql).toHaveBeenCalledWith(LINK_URL, { meta: true })
    expect(cloudinaryMock.uploader.upload).toHaveBeenCalledWith(
      LINK_IMAGE_URL,
      { upload_preset: 'cgbdjdkz', folder: 'linktree/links-image' }
    )
  })

  it('returns null for sites without an image', async () => {
    vi.mocked(mql).mockResolvedValue({ data: { image: null } } as never)

    expect(await extractLinkImage(LINK_URL)).toBeNull()
    expect(cloudinaryMock.uploader.upload).not.toHaveBeenCalled()
  })

  it('returns null when the site cannot be read', async () => {
    vi.mocked(mql).mockRejectedValue(new Error('microlink'))

    expect(await extractLinkImage(LINK_URL)).toBeNull()
  })
})

describe.each([
  {
    name: 'updateAvatar',
    action: updateAvatar,
    options: { upload_preset: 'cgbdjdkz', folder: 'linktree/links-avatar' }
  },
  {
    name: 'updateBackground',
    action: updateBackground,
    options: {
      upload_preset: 'cgbdjdkz',
      folder: 'linktree/tree-backgrounds',
      resource_type: 'image'
    }
  },
  {
    name: 'updateLinkImage',
    action: updateLinkImage,
    options: { upload_preset: 'cgbdjdkz', folder: 'linktree/links-image' }
  }
])('$name', ({ action, options }) => {
  const content = 'image'

  function createImageForm() {
    const formData = new FormData()
    formData.append('file', new File([content], 'image.png'))
    return formData
  }

  it('uploads the file to its folder', async () => {
    const end = vi.fn()
    cloudinaryMock.uploader.upload_stream.mockImplementation(
      (_options, callback) => ({
        end: (buffer: Buffer) => {
          end(buffer)
          callback(undefined, UPLOAD_RESULT)
        }
      })
    )

    expect(await action(createImageForm())).toEqual(UPLOAD_RESULT)
    expect(cloudinaryMock.uploader.upload_stream).toHaveBeenCalledWith(
      options,
      expect.any(Function)
    )
    expect(end.mock.calls[FIRST_CALL][FIRST_ARGUMENT].toString()).toBe(content)
  })

  it('returns null without an upload result', async () => {
    cloudinaryMock.uploader.upload_stream.mockImplementation(
      (_options, callback) => ({
        end: () => {
          callback(undefined, undefined)
        }
      })
    )

    expect(await action(createImageForm())).toBeNull()
  })
})
