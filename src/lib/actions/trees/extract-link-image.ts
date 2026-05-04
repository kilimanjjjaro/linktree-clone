'use server'

import mql from '@microlink/mql'
import { type UploadApiResponse, v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

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
