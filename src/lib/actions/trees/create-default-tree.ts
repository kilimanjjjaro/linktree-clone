'use server'

import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'

export async function createDefaultTree() {
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
    name: DEFAULT_THREE_VALUE.name,
    slug: DEFAULT_THREE_VALUE.slug,
    url: DEFAULT_THREE_VALUE.url,
    description: DEFAULT_THREE_VALUE.description,
    avatar: DEFAULT_THREE_VALUE.avatar,
    appearance: DEFAULT_THREE_VALUE.appearance ?? Prisma.JsonNull,
    links: {
      createMany: {
        data: DEFAULT_THREE_VALUE.links.map((link) => {
          const { id, treeId, ...rest } = link

          return rest
        })
      }
    },
    socialProfiles: {
      createMany: {
        data: DEFAULT_THREE_VALUE.socialProfiles.map((profile) => {
          const { id, treeId, ...rest } = profile

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
