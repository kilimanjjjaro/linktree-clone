'use server'

import { revalidateTag } from 'next/cache'
import { type Prisma } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function upsertSocialProfile(
  data: Prisma.TreeSocialProfileUncheckedCreateInput
) {
  const user = await getCurrentUser()

  if (user?.id == null) return null

  try {
    const response = await db.treeSocialProfile.upsert({
      where: {
        treeId_type: {
          treeId: data.treeId,
          type: data.type
        }
      },
      update: {
        name: data.name,
        url: data.url
      },
      create: {
        treeId: data.treeId,
        type: data.type,
        name: data.name,
        url: data.url
      }
    })

    revalidateTag('trees')

    return response
  } catch (error) {
    console.error('ACTION_ERROR: ', error)
    return null
  }
}
