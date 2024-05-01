import { Prisma } from '@prisma/client'

const treeWithRest = Prisma.validator<Prisma.TreeDefaultArgs>()({
  include: {
    links: true,
    socialProfiles: true
  }
})

export type ExtendedTree = Prisma.TreeGetPayload<typeof treeWithRest>
