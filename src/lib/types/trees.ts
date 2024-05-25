import { Prisma } from '@prisma/client'

const treeWithRest = Prisma.validator<Prisma.TreeDefaultArgs>()({
  include: {
    links: true,
    socialProfiles: true
  }
})

export type TreeInterface = Prisma.TreeGetPayload<typeof treeWithRest>
