'use server'

import { z } from 'zod'

const schema = z.object({
  name: z.string().min(5),
  url: z.string().url(),
  featuredLink: z.coerce.boolean()
})

export async function saveNewLink(prevState: any, payload: FormData) {
  let linkImage = ''

  const { name, url, featuredLink } = schema.parse({
    name: payload.get('name'),
    url: payload.get('url'),
    featuredLink: payload.get('featured-link')
  })

  if (featuredLink) {
    const response = await fetch('/api/get-link-image', {
      method: 'POST',
      body: url
    })

    const data = await response.json()

    linkImage = data.image
  }

  const newLink = {
    name,
    url,
    featuredLink,
    image: linkImage
  }

  console.log('Link added: ', newLink)

  return { success: true, error: false }
}
