'use server'

import { revalidateTag } from 'next/cache'
import slugify from '@sindresorhus/slugify'
import { Prisma } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { TREE_NAMES } from '@/lib/constants/trees'
import { generateRawDataToCreate } from '@/lib/utils/generate-raw-data'

export async function createDefaultTree() {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      data: null,
      error: 'Must log in to create trees.',
      success: ''
    }
  }

  const randomIndex = Math.floor(Math.random() * TREE_NAMES.length)
  const randomName = TREE_NAMES[randomIndex]

  try {
    const response = await db.tree.create({
      data: {
        ...generateRawDataToCreate(),
        authorId: user.id,
        name: randomName,
        url: slugify(randomName)
      },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    revalidateTag('trees', 'max')

    return {
      data: response,
      error: '',
      success: 'Task created.'
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          data: null,
          error: 'A tree with this URL already exists.',
          success: ''
        }
      }
    }

    return {
      data: null,
      error: 'Something went wrong.',
      success: ''
    }
  }
}
