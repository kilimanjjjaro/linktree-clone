'use server'

import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { type ExtendedTree } from '@/lib/types/trees'
import { createTree } from './create-tree'

export async function updateTree(data: ExtendedTree) {
  const user = await getCurrentUser()

  if (user === null) return null

  if (data.id === DEFAULT_THREE_VALUE.id) {
    await createTree(data)
  }

  try {
    // Crear tarea si no existe en la db y le pertenece al usuario.
    // Actualizar tarea si existe en la db y le pertenece al usuario.
  } catch (error) {
    console.log(error)
    return null
  }
}
