'use server'

import { revalidateTag } from 'next/cache'

import { Prisma } from '@/generated/prisma/client'
import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { type TreeInterface, type TreeChanges } from '@/lib/types/trees'

export async function syncTree(changes: TreeChanges) {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      data: null,
      error: 'Must log in to sync trees.',
      success: ''
    }
  }

  try {
    const response = await db.$transaction(async (tx) => {
      // Update tree fields (only if there are changes)
      if (changes.fields !== undefined) {
        const updateData: Record<string, unknown> = {}

        if (changes.fields.name !== undefined)
          updateData.name = changes.fields.name
        if (changes.fields.url !== undefined)
          updateData.url = changes.fields.url
        if (changes.fields.description !== undefined)
          updateData.description = changes.fields.description
        if (changes.fields.status !== undefined)
          updateData.status = changes.fields.status
        if (changes.fields.avatar !== undefined)
          updateData.avatar = changes.fields.avatar
        if (changes.fields.appearance !== undefined)
          updateData.appearance =
            (changes.fields.appearance as unknown as Prisma.InputJsonValue) ??
            Prisma.JsonNull

        await tx.tree.update({
          where: { id: changes.treeId, authorId: user.id },
          data: updateData
        })
      }

      // Delete removed social profiles
      if (changes.deleteProfileTypes.length > 0) {
        await tx.treeSocialProfile.deleteMany({
          where: {
            treeId: changes.treeId,
            type: { in: changes.deleteProfileTypes }
          }
        })
      }

      // Upsert new/modified social profiles
      for (const profile of changes.upsertProfiles) {
        await tx.treeSocialProfile.upsert({
          where: {
            treeId_type: {
              treeId: changes.treeId,
              type: profile.type
            }
          },
          update: { name: profile.name, url: profile.url },
          create: {
            treeId: changes.treeId,
            type: profile.type,
            name: profile.name,
            url: profile.url
          }
        })
      }

      // Delete removed links
      if (changes.deleteLinkUrls.length > 0) {
        await tx.treeLink.deleteMany({
          where: {
            treeId: changes.treeId,
            url: { in: changes.deleteLinkUrls }
          }
        })
      }

      // Upsert new/modified links
      for (const link of changes.upsertLinks) {
        await tx.treeLink.upsert({
          where: {
            treeId_url: {
              treeId: changes.treeId,
              url: link.url
            }
          },
          update: {
            name: link.name,
            featured: link.featured,
            image: link.image
          },
          create: {
            treeId: changes.treeId,
            name: link.name,
            url: link.url,
            featured: link.featured,
            image: link.image
          }
        })
      }

      return tx.tree.findUniqueOrThrow({
        where: { id: changes.treeId },
        include: { links: true, socialProfiles: true }
      })
    })

    revalidateTag('trees', 'max')

    return {
      data: response as TreeInterface,
      error: '',
      success: 'Tree synced.'
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          data: null,
          error: 'A tree with this URL already exists.',
          success: ''
        }
      }
    }

    return {
      data: null,
      error: 'Something went wrong.',
      success: ''
    }
  }
}
