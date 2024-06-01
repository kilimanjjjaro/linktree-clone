'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { type SocialProfileTypes } from '@prisma/client'

interface Props {
  treeId: string
  type: SocialProfileTypes
}

export async function deleteSocialProfile({ treeId, type }: Props) {
  const user = await getCurrentUser()

  if (user?.id == null) {
    return {
      error: 'Must log in to delete social profiles.',
      success: ''
    }
  }

  try {
    await db.treeSocialProfile.delete({
      where: {
        treeId_type: {
          treeId,
          type
        }
      }
    })

    revalidatePath('/')

    return {
      error: '',
      success: 'Social profile deleted.'
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)
    return {
      error: 'Something went wrong!',
      success: ''
    }
  }
}
