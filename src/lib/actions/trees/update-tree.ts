'use server'

import { getCurrentUser } from '@/lib/services/get-current-user'
import db from '@/lib/database'
import { Prisma } from '@prisma/client'
import { type ExtendedTree } from '@/lib/types/trees'
import { revalidatePath } from 'next/cache'

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
        slug: rest.slug,
        url: rest.url,
        description: rest.description,
        avatar: rest.avatar,
        appearance: rest.appearance ?? Prisma.JsonNull,
        links: {
          deleteMany: {},
          create: rest.links.map((link) => {
            const { treeId, ...rest } = link

            return rest
          })
        },
        socialProfiles: {
          deleteMany: {},
          create: rest.socialProfiles.map((socialProfile) => {
            const { treeId, ...rest } = socialProfile

            return rest
          })
        }
      },
      create: {
        authorId: user.id,
        status: rest.status,
        name: rest.name,
        slug: rest.slug,
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

    console.log('response: ', response)

    revalidatePath('/')
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}
