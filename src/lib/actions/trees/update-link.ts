'use server'

import { revalidateTag } from 'next/cache'
import { type Prisma } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

export async function updateLink (data: Prisma.TreeLinkUncheckedCreateInput) {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      data: null,
      error: 'Must log in to update links.',
      success: ''
    }
  }

  try {
    const response = await db.treeLink.upsert({
      where: {
        treeId_url: {
          treeId: data.treeId,
          url: data.url
        }
      },
      update: {
        name: data.name,
        url: data.url,
        featured: data.featured,
        image: data.image
      },
      create: {
        treeId: data.treeId,
        name: data.name,
        url: data.url,
        featured: data.featured,
        image: data.image
      }
    })

    revalidateTag('trees')

    return {
      data: response,
      error: '',
      success: 'Link updated.'
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)
    return {
      data: null,
      error: 'Something went wrong.',
      success: ''
    }
  }
}
