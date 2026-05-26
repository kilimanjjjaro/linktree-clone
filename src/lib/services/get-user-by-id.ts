import db from "@/lib/database"

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id
      },
      include: {
        trees: true
      }
    })

    return user
  } catch {
    return null
  }
}
