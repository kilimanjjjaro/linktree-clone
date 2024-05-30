'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { generateRawData } from '@/lib/utils/generate-raw-data'
import { type TreeInterface } from '@/lib/types/trees'

export async function createTree(tree: TreeInterface) {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      data: null,
      error: 'You must log in to create new trees.',
      success: ''
    }
  }

  try {
    const response = await db.tree.create({
      data: {
        ...generateRawData(tree),
        authorId: user.id
      },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    revalidatePath('/')

    return {
      data: response,
      error: '',
      success: 'Your tree was saved.'
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      error: 'Something went wrong.',
      success: ''
    }
  }
}
