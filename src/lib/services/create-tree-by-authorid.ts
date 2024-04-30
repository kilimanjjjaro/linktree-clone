import db from '@/lib/database'
import { type Prisma } from '@prisma/client'

export async function createTreeByUserId(
  data: Prisma.TreeUncheckedCreateInput
) {
  try {
    const tree = await db.tree.create({
      data,
      include: {
        links: true,
        socialProfiles: true
      }
    })

    return tree
  } catch (error) {
    console.log(error)
    return null
  }
}
