'use server'

import { revalidatePath } from 'next/cache'
import slugify from '@sindresorhus/slugify'
import { Prisma } from '@prisma/client'

import db from '@/lib/database'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { type ExtendedTree } from '@/lib/types/trees'

export async function updateTree({ id: treeId, ...rest }: ExtendedTree) {
  const user = await getCurrentUser()

  if (user?.id == null) return null

  try {
    const response = await db.tree.upsert({
      where: {
        authorId: user.id,
        id: treeId
      },
      update: {
        status: rest.status,
        name: rest.name,
        slug: slugify(rest.name),
        url: rest.url,
        description: rest.description,
        avatar: rest.avatar,
        appearance: rest.appearance ?? Prisma.JsonNull,
        links: {
          deleteMany: {},
          createMany: {
            data: rest.links.map((link) => {
              const { treeId, ...rest } = link

              return rest
            })
          }
        },
        socialProfiles: {
          deleteMany: {},
          createMany: {
            data: rest.socialProfiles.map((socialProfile) => {
              const { treeId, ...rest } = socialProfile

              return rest
            })
          }
        }
      },
      create: {
        authorId: user.id,
        status: rest.status,
        name: rest.name,
        slug: slugify(rest.name),
        url: rest.url,
        description: rest.description,
        avatar: rest.avatar,
        appearance: rest.appearance ?? Prisma.JsonNull,
        links: {
          createMany: {
            data: rest.links.map((link) => {
              const { id, treeId, ...rest } = link

              return rest
            })
          }
        },
        socialProfiles: {
          createMany: {
            data: rest.socialProfiles.map((socialMedia) => {
              const { id, treeId, ...rest } = socialMedia

              return rest
            })
          }
        }
      },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    revalidatePath('/')

    return response
  } catch (error) {
    console.log(error)
    return null
  }
}
