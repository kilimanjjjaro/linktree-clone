'use server'

import { revalidateTag } from 'next/cache'
import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function deleteTree(treeId: string) {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      error: 'Must log in to delete trees.',
      success: ''
    }
  }

  try {
    await db.tree.delete({
      where: {
        id: treeId,
        authorId: user.id
      }
    })

    revalidateTag('trees', 'max')

    return {
      error: '',
      success: 'Tree deleted.'
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)

    return {
      error: 'Something went wrong.',
      success: ''
    }
  }
}
