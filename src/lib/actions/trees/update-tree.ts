'use server'

import { revalidatePath } from 'next/cache'
import { Prisma, type Tree } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function updateTree(tree: Partial<Tree>) {
  const user = await getCurrentUser()

  if (user?.id == null) return null

  try {
    const response = await db.tree.update({
      where: {
        authorId: user.id,
        id: tree.id
      },
      data: {
        ...tree,
        appearance: tree.appearance ?? Prisma.JsonNull
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
