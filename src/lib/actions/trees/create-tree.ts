'use server'

import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'
import slugify from '@sindresorhus/slugify'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { type ExtendedTree } from '@/lib/types/trees'

export async function createTree(tree: ExtendedTree) {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      error: 'You must log in to create new trees.',
      success: ''
    }
  }

  const data: Prisma.TreeUncheckedCreateInput = {
    authorId: user.id,
    status: 0,
    name: tree.name,
    slug: slugify(tree.name),
    url: tree.url,
    description: tree.description,
    avatar: tree.avatar,
    appearance: tree.appearance ?? Prisma.JsonNull,
    links: {
      createMany: {
        data: tree.links.map((link) => {
          const { id, treeId, ...rest } = link

          return rest
        })
      }
    },
    socialProfiles: {
      createMany: {
        data: tree.socialProfiles.map((socialMedia) => {
          const { id, treeId, ...rest } = socialMedia

          return rest
        })
      }
    }
  }

  try {
    await db.tree.create({
      data,
      include: {
        links: true,
        socialProfiles: true
      }
    })

    revalidatePath('/')

    return {
      error: '',
      success: 'Task created.'
    }
  } catch (error) {
    console.log(error)
    return {
      error: 'Something went wrong.',
      success: ''
    }
  }
}
