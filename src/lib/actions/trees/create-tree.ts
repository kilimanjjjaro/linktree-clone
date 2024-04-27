'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { createTreeByUserId } from '@/lib/services/create-tree-by-authorid'

export async function createTree() {
  const session = await auth()

  if (session?.user?.id === undefined) {
    return {
      error: 'You must log in to create new trees.',
      success: ''
    }
  }

  try {
    await createTreeByUserId(session.user.id)

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
