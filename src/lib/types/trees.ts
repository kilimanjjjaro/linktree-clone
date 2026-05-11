import {
  type Prisma,
  type SocialProfileTypes
} from '@/generated/prisma/browser'

type PrismaTree = Prisma.TreeGetPayload<{
  include: {
    links: true
    socialProfiles: true
  }
}>

export type TreeInterface = Omit<PrismaTree, 'appearance'> & {
  appearance: TreeAppearanceInterface
}

export interface TreeChanges {
  treeId: string
  fields?: Partial<{
    name: string
    url: string
    description: string
    status: number
    avatar: string
    appearance: TreeAppearanceInterface
  }>
  upsertProfiles: Array<{
    type: SocialProfileTypes
    url: string
    name: string
  }>
  deleteProfileTypes: SocialProfileTypes[]
  upsertLinks: Array<{
    name: string
    url: string
    featured: boolean
    image: string | null
  }>
  deleteLinkUrls: string[]
}

export type TreeAppearanceInterface = {
  background: {
    type: number
    settings: {
      steps: Array<[number, number, number]>
      angle: number
      color: [number, number, number]
      url: string
    }
  }
  font: number
  general: {
    cornerStyle: number
    contentContainer: {
      enabled: boolean
    }
  }
}
