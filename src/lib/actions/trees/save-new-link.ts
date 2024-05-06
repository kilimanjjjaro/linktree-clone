'use server'

import { revalidatePath } from 'next/cache'

import { getCurrentUser } from '@/lib/services/get-current-user'
import { AddLinkSchema } from '@/lib/schemas/tree'
import { getOgImage } from '@/lib/utils/get-og-image'

export async function saveNewLink(prevState: any, payload: FormData) {
  let backgroundImage = ''

  const user = await getCurrentUser()

  if (user === null) {
    return {
      error: true,
      success: false
    }
  }

  const validatedFields = AddLinkSchema.safeParse({
    name: payload.get('name'),
    url: payload.get('url'),
    featured: payload.get('featured'),
    image: payload.get('image')
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields.',
      success: ''
    }
  }

  const { name, url, featured, image } = validatedFields.data

  if (featured && image === null) backgroundImage = await getOgImage(url)

  if (featured && image !== null) backgroundImage = image

  const newLink = {
    name,
    url,
    featured,
    image: backgroundImage
  }

  console.log('NEW_LINK: ', newLink)

  revalidatePath('/')

  return { success: true, error: false }
}
