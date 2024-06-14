import { Prisma } from '@prisma/client'

import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import { type TreeInterface } from '@/lib/types/trees'

export function generateRawDataToCreate (tree?: Partial<TreeInterface>) {
  const appearance = tree?.appearance ?? DEMO_TREE_VALUES.appearance
  const links = tree?.links ?? DEMO_TREE_VALUES.links
  const socialProfiles = tree?.socialProfiles ?? DEMO_TREE_VALUES.socialProfiles

  return {
    status: tree?.status ?? DEMO_TREE_VALUES.status,
    name: tree?.name ?? DEMO_TREE_VALUES.name,
    url: tree?.url ?? DEMO_TREE_VALUES.url,
    description: tree?.description ?? DEMO_TREE_VALUES.description,
    avatar: tree?.avatar ?? DEMO_TREE_VALUES.avatar,
    appearance: appearance ?? Prisma.JsonNull,
    links: {
      createMany: {
        data: links.map((link) => {
          const { id, treeId, createdAt, updatedAt, ...rest } = link

          return rest
        })
      }
    },
    socialProfiles: {
      createMany: {
        data: socialProfiles.map((socialProfile) => {
          const { id, treeId, createdAt, updatedAt, ...rest } = socialProfile

          return rest
        })
      }
    }
  }
}

export function generateRawDataToUpdate (tree?: Partial<TreeInterface>) {
  const appearance = tree?.appearance ?? DEMO_TREE_VALUES.appearance

  if (tree?.id === undefined) return null

  return {
    status: tree?.status ?? DEMO_TREE_VALUES.status,
    name: tree?.name ?? DEMO_TREE_VALUES.name,
    url: tree?.url ?? DEMO_TREE_VALUES.url,
    description: tree?.description ?? DEMO_TREE_VALUES.description,
    avatar: tree?.avatar ?? DEMO_TREE_VALUES.avatar,
    appearance: appearance ?? Prisma.JsonNull
  }
}
