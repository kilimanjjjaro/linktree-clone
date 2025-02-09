'use server'

import { revalidateTag } from 'next/cache'
import { Prisma, type Tree } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import {
  generateRawDataToCreate,
  generateRawDataToUpdate
} from '@/lib/utils/generate-raw-data'

export async function updateTree(tree: Partial<Tree>) {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      data: null,
      error: 'Must log in to update trees.',
      success: ''
    }
  }

  try {
    const response = await db.tree.upsert({
      where: {
        authorId: user.id,
        id: tree.id
      },
      update: {
        ...generateRawDataToUpdate(tree),
        appearance: tree.appearance ?? Prisma.JsonNull
      },
      create: {
        ...generateRawDataToCreate(tree),
        authorId: user.id
      },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    revalidateTag('trees')

    return {
      data: response,
      error: '',
      success: 'Tree updated.'
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
