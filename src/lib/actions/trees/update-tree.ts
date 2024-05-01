'use server'

import { revalidatePath } from 'next/cache'
import { type Prisma } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

interface Props {
  data: Prisma.TreeUncheckedUpdateInput
  treeId: string
}

export async function updateTree({ data, treeId }: Props) {
  const user = await getCurrentUser()

  if (user === null) return null

  try {
    const tree = await db.tree.update({
      where: {
        authorId: user.id,
        id: treeId
      },
      data: { ...data },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    revalidatePath('/')

    return tree
  } catch (error) {
    console.log(error)
    return null
  }
}
