'use server'

import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

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
    status: DEMO_TREE_VALUES.status,
    name: DEMO_TREE_VALUES.name,
    slug: DEMO_TREE_VALUES.slug,
    url: DEMO_TREE_VALUES.url,
    description: DEMO_TREE_VALUES.description,
    avatar: DEMO_TREE_VALUES.avatar,
    appearance: DEMO_TREE_VALUES.appearance ?? Prisma.JsonNull,
    links: {
      createMany: {
        data: DEMO_TREE_VALUES.links.map((link) => {
          const { id, treeId, ...rest } = link

          return rest
        })
      }
    },
    socialProfiles: {
      createMany: {
        data: DEMO_TREE_VALUES.socialProfiles.map((socialMedia) => {
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
