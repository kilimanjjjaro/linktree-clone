'use server'

import { revalidatePath } from 'next/cache'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import db from '@/lib/database'
import { auth } from '@/lib/auth'

export async function createTree() {
  const session = await auth()

  if (session?.user?.id === undefined) {
    return {
      error: 'You must log in to create new trees.',
      success: ''
    }
  }

  const rawData = {
    authorId: session.user.id,
    status: 0,
    name: DEFAULT_THREE_VALUE.name,
    slug: DEFAULT_THREE_VALUE.slug,
    url: DEFAULT_THREE_VALUE.url,
    description: DEFAULT_THREE_VALUE.description,
    avatar: DEFAULT_THREE_VALUE.avatar,
    appearance: DEFAULT_THREE_VALUE.appearance,
    links: DEFAULT_THREE_VALUE.links.map((link) => {
      const { id, treeId, ...rest } = link
      return rest
    }),
    socialProfiles: DEFAULT_THREE_VALUE.socialProfiles.map((socialProfile) => {
      const { id, treeId, ...rest } = socialProfile
      return rest
    })
  }

  try {
    await db.tree.create({
      data: {
        ...rawData,
        socialProfiles: {
          createMany: {
            data: rawData.socialProfiles
          }
        },
        links: {
          createMany: {
            data: rawData.links
          }
        }
      }
    })

    revalidatePath('/')

    return {
      error: '',
      success: 'My Lord, a new tree was created for you.'
    }
  } catch (error) {
    console.log(error)
    return {
      error: 'Something went wrong.',
      success: ''
    }
  }
}
