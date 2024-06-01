'use server'

import { revalidatePath } from 'next/cache'
import { type Prisma } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function createOrUpdateSocialProfile(
  data: Prisma.TreeSocialProfileUncheckedCreateInput
) {
  const user = await getCurrentUser()

  if (user?.id == null) return null

  console.log('TREE_ID: ', data.treeId)

  try {
    const response = await db.treeSocialProfile.upsert({
      where: {
        treeId_type: {
          treeId: data.treeId,
          type: data.type
        }
      },
      create: {
        type: data.type,
        url: data.url,
        treeId: data.treeId,
        name: data.name
      },
      update: {
        url: data.url,
        name: data.name
      }
    })

    console.log('RESPONSE: ', response)

    revalidatePath('/')

    return response
  } catch (error) {
    console.error('ACTION_ERROR: ', error)
    return null
  }
}
