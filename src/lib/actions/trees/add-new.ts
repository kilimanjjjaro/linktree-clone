'use server'

import { redirect } from 'next/navigation'
import db from '@/lib/database'
import { auth } from '@/lib/auth'
import { DEFAULT_THREE_VALUE } from '@/lib/constants/trees'

export async function addNewTree() {
  const session = await auth()

  if (session?.user?.id === undefined) return redirect('/login')

  const rawData = {
    authorId: session.user.id,
    status: DEFAULT_THREE_VALUE.status,
    name: DEFAULT_THREE_VALUE.name,
    slug: DEFAULT_THREE_VALUE.slug,
    url: DEFAULT_THREE_VALUE.url,
    description: DEFAULT_THREE_VALUE.description,
    avatar: DEFAULT_THREE_VALUE.avatar
  }

  await db.tree.create({
    data: rawData
  })
}
