'use server'

import db from '@/lib/database'
import { type Prisma } from '@prisma/client'
import { type LocalTreeInterface } from '../types/trees'

interface Props {
  data: LocalTreeInterface
  userId: string
}
export async function createTree({ data, userId }: Props) {
  const rawData: Prisma.TreeUncheckedCreateInput = {
    authorId: userId,
    status: 0,
    name: data.name,
    slug: data.slug,
    url: data.url,
    description: data.description,
    avatar: data.avatar,
    appearance: data.appearance,
    links: {
      createMany: {
        data: data.links
      }
    },
    socialProfiles: {
      createMany: {
        data: data.socialProfiles
      }
    }
  }

  try {
    const tree = await db.tree.create({
      data: rawData,
      include: {
        links: true,
        socialProfiles: true
      }
    })

    return tree
  } catch (error) {
    console.log(error)
    return null
  }
}
