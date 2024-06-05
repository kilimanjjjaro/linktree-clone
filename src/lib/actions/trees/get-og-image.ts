'use server'

import mql from '@microlink/mql'

export async function getOgImage(url: string) {
  try {
    const { data } = await mql(url, { meta: true })

    if (data.image == null) return null

    return data.image
  } catch (error) {
    console.error('OG_IMAGE: ', error)
    return null
  }
}
