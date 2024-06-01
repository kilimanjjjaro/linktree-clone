'use server'

import { revalidatePath } from 'next/cache'
import { type Prisma } from '@prisma/client'

import db from '@/lib/database'

export async function createLink(link: Prisma.TreeLinkUncheckedCreateInput) {
  try {
    const response = await db.treeLink.create({
      data: {
        treeId: link.treeId,
        name: link.name,
        url: link.url,
        featured: link.featured,
        image: link.image
      }
    })

    revalidatePath('/')

    return response
  } catch (error) {
    console.error('ACTION_ERROR: ', error)
    return null
  }
}
