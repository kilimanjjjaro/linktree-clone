'use server'

import { revalidatePath } from 'next/cache'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import db from '@/lib/database'
import { auth } from '@/lib/auth'

export async function addNewTree() {
  const session = await auth()

  if (session?.user?.id === undefined) {
    return {
      error: 'You must log in',
      success: ''
    }
  }

  try {
    await db.tree.create({
      data: {
        status: 0,
        name: DEFAULT_THREE_VALUE.name,
        slug: DEFAULT_THREE_VALUE.slug,
        url: DEFAULT_THREE_VALUE.url,
        description: DEFAULT_THREE_VALUE.description,
        avatar: DEFAULT_THREE_VALUE.avatar,
        appearance: DEFAULT_THREE_VALUE.appearance,
        authorId: session.user.id,
        socialProfiles: {
          createMany: {
            data: DEFAULT_THREE_VALUE.socialProfiles
          }
        },
        links: {
          createMany: {
            data: DEFAULT_THREE_VALUE.links
          }
        }
      }
    })

    revalidatePath('/')

    return {
      error: '',
      success: 'Tree created'
    }
  } catch (error) {
    return {
      error: 'Something went wrong',
      success: ''
    }
  }
}
