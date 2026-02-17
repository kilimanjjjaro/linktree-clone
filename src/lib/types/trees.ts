import { Prisma } from '@prisma/client'

const treeWithRest = Prisma.validator<Prisma.TreeDefaultArgs>()({
  include: {
    links: true,
    socialProfiles: true
  }
})

export type TreeInterface = Prisma.TreeGetPayload<typeof treeWithRest>

export interface TreeAppearanceInterface {
  background: {
    type: number
    settings: {
      steps: Array<[number, number, number]>
      angle: number
    }
  }
  font: number
  general: {
    cornerStyle: number
    contentContainer: boolean
  }
}
