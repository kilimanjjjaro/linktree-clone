'use server'

import mql from '@microlink/mql'
import type { UploadApiResponse } from 'cloudinary'

import { cloudinary } from '@/lib/cloudinary'

export async function extractLinkImage(
  url: string
): Promise<UploadApiResponse | null> {
  try {
    const { data } = await mql(url, { meta: true })

    if (data.image == null) return null

    const response = await cloudinary.uploader.upload(data.image.url, {
      upload_preset: 'cgbdjdkz',
      folder: 'linktree/links-image'
    })

    return response
  } catch (error) {
    console.error('EXTRACT_LINK_IMAGE: ', error)
    return null
  }
}
