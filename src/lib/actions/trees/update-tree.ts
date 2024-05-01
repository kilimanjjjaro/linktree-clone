'use server'

import { getCurrentUser } from '@/lib/services/get-current-user'
import { type ExtendedTree } from '@/lib/types/trees'

export async function updateTree(data: ExtendedTree) {
  const user = await getCurrentUser()

  if (user === null) return null

  try {
    console.log(data)

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
