import { type Prisma } from '@/generated/prisma/browser'

type PrismaTree = Prisma.TreeGetPayload<{
  include: {
    links: true
    socialProfiles: true
  }
}>

export type TreeInterface = Omit<PrismaTree, 'appearance'> & {
  appearance: TreeAppearanceInterface
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
      color: number
    }
  }
}
