import { type Prisma } from '@prisma/client'

export type TreeType = Prisma.TreeGetPayload<{
  include: {
    socialProfiles: true
    links: true
    appearance: true
  }
}>
