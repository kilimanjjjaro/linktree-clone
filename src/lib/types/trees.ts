import { Prisma } from '@prisma/client'

export interface Appearance {
  background: Background
  font: number
  general: General
}

export interface Background {
  type: number
  settings: Settings
}

export interface Settings {
  steps: number[][]
  angle: number
}

export interface General {
  cornerStyle: number
  contentContainer: boolean
}

export interface Link {
  id?: string
  treeId?: string
  name: string
  url: string
  featured: boolean
  backgroundImage: string | undefined
}

export interface SocialProfile {
  id?: string
  treeId?: string
  type: number
  url: string
}

export interface LocalTreeInterface {
  id?: string
  authorId?: string
  status: number
  name: string
  slug: string
  url: string
  description: string
  avatar: string
  socialProfiles: Prisma.TreeSocialProfileUncheckedCreateWithoutTreeInput[]
  links: Prisma.TreeLinkUncheckedCreateWithoutTreeInput[]
  appearance: Prisma.InputJsonValue | null
}

export interface TreesStoreInterface {
  selectedTree: ExtendedTree | null
  setSelectedTree: (selectedTree: ExtendedTree) => void
}

const treeWithRest = Prisma.validator<Prisma.TreeDefaultArgs>()({
  include: {
    links: true,
    socialProfiles: true
  }
})

export type ExtendedTree = Prisma.TreeGetPayload<typeof treeWithRest>
