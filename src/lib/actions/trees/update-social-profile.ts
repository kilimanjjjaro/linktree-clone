'use server'

import { revalidateTag } from 'next/cache'
import { type Prisma } from '@/generated/prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function updateSocialProfile(
  data: Prisma.TreeSocialProfileUncheckedCreateInput
) {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      data: null,
      error: 'Must log in to update social profiles.',
      success: ''
    }
  }

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

    revalidateTag('trees', 'max')

    return {
      data: response,
      error: '',
      success: 'Social profile updated.'
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)
    return {
      data: null,
      error: 'Something went wrong.',
      success: ''
    }
  }
}
