'use server'

import { revalidatePath } from 'next/cache'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import db from '@/lib/database'
import { auth } from '@/lib/auth'

export async function addNewTree() {
  const session = await auth()

  if (session?.user?.id === undefined) {
    return {
      error: 'You must log in to create new trees.',
      success: ''
    }
  }

  const newTree = {
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
        ...newTree,
        socialProfiles: {
          createMany: {
            data: newTree.socialProfiles
          }
        },
        links: {
          createMany: {
            data: newTree.links
          }
        }
      }
    })

    revalidatePath('/')

    return {
      error: '',
      success: 'Tree created.'
    }
  } catch (error) {
    console.log(error)
    return {
      error: 'Something went wrong.',
      success: ''
    }
  }
}
