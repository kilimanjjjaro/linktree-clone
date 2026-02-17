'use server'

import { revalidateTag } from 'next/cache'
import { Prisma } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { generateRawDataToCreate } from '@/lib/utils/generate-raw-data'
import { type TreeInterface } from '@/lib/types/trees'

export async function createTree(tree: TreeInterface) {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      data: null,
      error: 'Must log in to create trees.',
      success: ''
    }
  }

  try {
    const response = await db.tree.create({
      data: {
        ...generateRawDataToCreate(tree),
        authorId: user.id
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
      success: 'Tree created.'
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
