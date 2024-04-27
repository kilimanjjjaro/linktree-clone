import { type Prisma } from '@prisma/client'

export type ExtendedTreeType = Prisma.TreeGetPayload<{
  include: {
    socialProfiles: true
    links: true
    appearance: true
  }
}>

export interface TreesStoreInterface {
  trees: ExtendedTreeType[]
  setTrees: (trees: ExtendedTreeType[]) => void
}
