import { type Prisma } from '@/generated/prisma/browser'

export type TreeInterface = Prisma.TreeGetPayload<{
  include: {
    links: true
    socialProfiles: true
  }
}>

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
