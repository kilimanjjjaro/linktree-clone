'use server'

import { v2 as cloudinary } from 'cloudinary'

import {
  getCloudinaryPublicId,
  getCloudinaryResourceType,
  isUserUploadedAsset
} from '@/lib/utils/cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function deleteCloudinaryAsset(url: string) {
  if (!isUserUploadedAsset(url)) return false

  const publicId = getCloudinaryPublicId(url)

  if (publicId === null) return false

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: getCloudinaryResourceType(url),
      invalidate: true
    })

    return true
  } catch (error) {
    console.error('DELETE_CLOUDINARY_ASSET: ', error)
    return false
  }
}
