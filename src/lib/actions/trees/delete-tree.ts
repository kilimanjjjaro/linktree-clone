'use server'

import { revalidatePath } from 'next/cache'
import db from '@/lib/database'
import { getTrees } from '@/lib/services/get-trees'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function deleteTree(treeId: string) {
  const user = await getCurrentUser()

  if (user === null) {
    return {
      error: 'You must log in to delete trees.',
      success: ''
    }
  }

  const existingTrees = await getTrees(user.id)

  if (existingTrees.length <= 1) {
    return {
      error: 'You must have at least one tree in your account.',
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
      success: 'A tree was deleted.'
    }
  } catch (error) {
    console.log(error)
    return {
      error: 'Something went wrong.',
      success: ''
    }
  }
}
