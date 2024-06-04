'use server'

import { revalidateTag } from 'next/cache'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'

interface Props {
  linkId: string
}

export async function deleteLink({ linkId }: Props) {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      error: 'Must log in to delete links.',
      success: ''
    }
  }

  try {
    await db.treeLink.delete({ where: { id: linkId } })

    revalidateTag('trees')

    return {
      error: '',
      success: 'Link deleted.'
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)

    return {
      error: 'Something went wrong.',
      success: ''
    }
  }
}
