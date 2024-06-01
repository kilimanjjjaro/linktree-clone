'use server'

import { revalidatePath } from 'next/cache'
import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function deleteTree(treeId: string) {
  const user = await getCurrentUser()

  if (user === null) {
    return {
      error: 'Must log in to delete trees.',
      success: ''
    }
  }

  try {
    await db.tree.delete({
      where: {
        id: treeId
      }
    })

    revalidatePath('/')

    return {
      error: '',
      success: 'Tree deleted.'
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)
    return {
      error: 'Something went wrong!',
      success: ''
    }
  }
}
