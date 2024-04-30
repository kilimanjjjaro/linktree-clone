'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { createTreeByUserId } from '@/lib/services/create-tree-by-authorid'
import { type Prisma } from '@prisma/client'
import { type LocalTreeInterface } from '@/lib/types/trees'

export async function createTree(data: LocalTreeInterface) {
  const session = await auth()

  if (session?.user?.id === undefined) {
    return {
      error: 'You must log in to create new trees.',
      success: ''
    }
  }

  const rawData: Prisma.TreeUncheckedCreateInput = {
    authorId: session.user.id,
    status: 0,
    name: data.name,
    slug: data.slug,
    url: data.url,
    description: data.description,
    avatar: data.avatar,
    appearance: data.appearance,
    links: {
      createMany: {
        data: data.links
      }
    },
    socialProfiles: {
      createMany: {
        data: data.socialProfiles
      }
    }
  }

  try {
    await createTreeByUserId(rawData)

    revalidatePath('/')

    return {
      error: '',
      success: 'My Lord, a new tree was created for you.'
    }
  } catch (error) {
    return {
      error: 'Something went wrong.',
      success: ''
    }
  }
}
