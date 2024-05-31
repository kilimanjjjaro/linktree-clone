'use server'

import { revalidatePath } from 'next/cache'
import { Prisma, type Tree } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { generateRawData } from '@/lib/utils/generate-raw-data'

export async function updateTree(tree: Partial<Tree>) {
  const user = await getCurrentUser()

  console.log('asdasd', tree)

  if (user?.id === undefined) return null

  try {
    const response = await db.tree.upsert({
      where: {
        authorId: tree.authorId,
        id: tree.id
      },
      update: {
        ...tree,
        appearance: tree.appearance ?? Prisma.JsonNull
      },
      create: {
        ...generateRawData(tree),
        authorId: user.id
      },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    revalidatePath('/')

    return response
  } catch (error) {
    console.log(error)
    return null
  }
}
