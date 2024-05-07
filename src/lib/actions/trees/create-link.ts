'use server'

import { revalidatePath } from 'next/cache'
import { type Prisma } from '@prisma/client'

import db from '@/lib/database'
import { createDefaultTree } from '@/lib/actions/trees/create-default-tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

export async function createLink(link: Prisma.TreeLinkUncheckedCreateInput) {
  let treeId = link.treeId

  if (link.treeId === DEMO_TREE_VALUES.id) {
    const newTree = await createDefaultTree()

    if (newTree.data !== null) treeId = newTree.data?.id
  }

  try {
    const response = await db.treeLink.create({
      data: {
        treeId,
        name: link.name,
        url: link.url,
        featured: link.featured,
        image: link.image
      }
    })

    revalidatePath('/')

    return { data: response, success: 'Link created.', error: '' }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      success: '',
      error: 'Something went wrong.'
    }
  }
}
