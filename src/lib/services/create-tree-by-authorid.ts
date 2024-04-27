import db from '@/lib/database'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'

export async function createTreeByUserId(authorId: string) {
  const rawData = {
    authorId,
    status: 0,
    name: DEFAULT_THREE_VALUE.name,
    slug: DEFAULT_THREE_VALUE.slug,
    url: DEFAULT_THREE_VALUE.url,
    description: DEFAULT_THREE_VALUE.description,
    avatar: DEFAULT_THREE_VALUE.avatar,
    appearance: DEFAULT_THREE_VALUE.appearance,
    links: DEFAULT_THREE_VALUE.links.map((link) => {
      const { id, treeId, ...rest } = link
      return rest
    }),
    socialProfiles: DEFAULT_THREE_VALUE.socialProfiles.map((socialProfile) => {
      const { id, treeId, ...rest } = socialProfile
      return rest
    })
  }

  try {
    const tree = await db.tree.create({
      data: {
        ...rawData,
        socialProfiles: {
          createMany: {
            data: rawData.socialProfiles
          }
        },
        links: {
          createMany: {
            data: rawData.links
          }
        }
      },
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
