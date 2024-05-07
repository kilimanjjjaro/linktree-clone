'use server'

import { revalidateTag } from 'next/cache'
import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function deleteTree(treeId: string) {
  const user = await getCurrentUser()

  if (user === null) {
    return {
      error: 'You must log in to delete trees.',
      success: ''
    }
  }

  try {
    await db.tree.delete({
      where: {
        id: treeId
      }
    })

    revalidateTag('trees')
    revalidateTag('tree')

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
