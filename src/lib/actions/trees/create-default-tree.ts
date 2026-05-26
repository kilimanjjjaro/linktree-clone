"use server"

import { revalidateTag } from "next/cache"
import slugify from "@sindresorhus/slugify"
import { Prisma } from "@/generated/prisma/client"

import db from "@/lib/database"
import { getCurrentUser } from "@/lib/services/get-current-user"
import { DEFAULT_TREE_NAME } from "@/lib/constants/trees"
import { generateRawDataToCreate } from "@/lib/utils/generate-raw-data"
import { type TreeInterface } from "@/lib/types/trees"

async function getNextTreeName(userId: string) {
  const existingTrees = await db.tree.findMany({
    where: {
      authorId: userId,
      name: { startsWith: DEFAULT_TREE_NAME }
    },
    select: { name: true }
  })

  if (existingTrees.length === 0) return DEFAULT_TREE_NAME

  const usedNumbers = existingTrees.map((tree) => {
    if (tree.name === DEFAULT_TREE_NAME) return 1
    const suffix = tree.name.slice(DEFAULT_TREE_NAME.length).trim()
    const num = Number(suffix)
    return Number.isInteger(num) ? num : 0
  })

  const maxNumber = Math.max(...usedNumbers)

  return `${DEFAULT_TREE_NAME} ${maxNumber + 1}`
}

export async function createDefaultTree() {
  const user = await getCurrentUser()

  if (user?.id === undefined) {
    return {
      data: null,
      error: "Must log in to create trees.",
      success: ""
    }
  }

  const name = await getNextTreeName(user.id)

  try {
    const response = await db.tree.create({
      data: {
        ...generateRawDataToCreate(),
        authorId: user.id,
        name,
        url: slugify(name)
      },
      include: {
        links: true,
        socialProfiles: true
      }
    })

    revalidateTag("trees", "max")

    return {
      data: response as TreeInterface,
      error: "",
      success: "Task created."
    }
  } catch (error) {
    console.error("ACTION_ERROR: ", error)

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          data: null,
          error: "A tree with this URL already exists.",
          success: ""
        }
      }
    }

    return {
      data: null,
      error: "Something went wrong.",
      success: ""
    }
  }
}
