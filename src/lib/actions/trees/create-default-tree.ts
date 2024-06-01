'use server'

import { revalidatePath } from 'next/cache'
import slugify from '@sindresorhus/slugify'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { TREE_NAMES } from '@/lib/constants/trees'
import { generateRawData } from '@/lib/utils/generate-raw-data'

export async function createDefaultTree() {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      data: null,
      error: 'You must log in to create new trees.',
      success: ''
    }
  }

  const randomIndex = Math.floor(Math.random() * TREE_NAMES.length)
  const randomName = TREE_NAMES[randomIndex]

  try {
    const response = await db.tree.create({
      data: {
        ...generateRawData(),
        authorId: user.id,
        name: randomName,
        slug: slugify(randomName)
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
      success: 'Task created.'
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)
    return {
      data: null,
      error: 'Something went wrong!',
      success: ''
    }
  }
}
