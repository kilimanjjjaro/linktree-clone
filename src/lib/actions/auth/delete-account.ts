'use server'

import { revalidateTag } from 'next/cache'

import db from '@/lib/database'
import { signOut } from '@/lib/auth'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { deleteCloudinaryAsset } from '@/lib/actions/trees/delete-cloudinary-asset'

export async function deleteAccount() {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      error: 'Must log in to delete your account.',
      success: ''
    }
  }

  try {
    const trees = await db.tree.findMany({
      where: { authorId: user.id },
      include: { links: true }
    })

    const cloudinaryUrls: string[] = []

    if (user.image != null) cloudinaryUrls.push(user.image)

    for (const tree of trees) {
      cloudinaryUrls.push(tree.avatar)

      const backgroundUrl = (
        tree.appearance as {
          background?: { settings?: { url?: string } }
        } | null
      )?.background?.settings?.url

      if (backgroundUrl != null) cloudinaryUrls.push(backgroundUrl)

      for (const link of tree.links) {
        if (link.image != null) cloudinaryUrls.push(link.image)
      }
    }

    await Promise.allSettled(
      cloudinaryUrls.map((url) => deleteCloudinaryAsset(url))
    )

    await db.user.delete({ where: { id: user.id } })

    revalidateTag('trees', 'max')

    await signOut({ redirect: false })

    return {
      error: '',
      success: 'Account deleted.'
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)

    return {
      error: 'Something went wrong.',
      success: ''
    }
  }
}
