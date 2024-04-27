import { type Prisma } from '@prisma/client'

export type ExtendedTreeType = Prisma.TreeGetPayload<{
  include: {
    socialProfiles: true
    links: true
    appearance: true
  }
}>
