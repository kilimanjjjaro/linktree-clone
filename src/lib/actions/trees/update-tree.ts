'use server'

import { revalidatePath } from 'next/cache'
import db from '@/lib/database'
import { auth } from '@/lib/auth'
import { type ExtendedTreeType } from '@/lib/types/trees'

interface Props {
  data: ExtendedTreeType
  treeId: string
}

export async function updateTree({ data, treeId }: Props) {
  const session = await auth()

  if (session === undefined) {
    console.log('Save in localstorage')
    return {
      error: false,
      success: true
    }
  }

  try {
    await db.tree.update({
      where: {
        id: treeId
      },
      data: { name: data.name }
    })

    revalidatePath('/')

    return {
      error: false,
      success: true
    }
  } catch (error) {
    console.log(error)
    return {
      error: true,
      success: false
    }
  }
}
