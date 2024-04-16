'use server'

import { z } from 'zod'

const schema = z.object({
  name: z.string().min(5),
  url: z.string().url(),
  highlight: z.coerce.boolean()
})

export async function saveNewLink(_: any, payload: FormData) {
  const body = schema.parse({
    name: payload.get('name'),
    url: payload.get('url'),
    highlight: payload.get('highlight')
  })

  console.log(body)

  return { success: true, error: false }
}
