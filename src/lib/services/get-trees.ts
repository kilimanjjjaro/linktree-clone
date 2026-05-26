import db from "@/lib/database"
import { type TreeInterface } from "@/lib/types/trees"

export async function getTrees(authorId: string) {
  try {
    const data = await db.tree.findMany({
      where: { authorId },
      include: {
        links: true,
        socialProfiles: true
      },
      orderBy: {
        name: "asc"
      }
    })

    return data as TreeInterface[]
  } catch {
    return []
  }
}
