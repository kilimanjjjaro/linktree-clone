'use server'

import { cloudinary } from '@/lib/cloudinary'
import {
  getCloudinaryPublicId,
  getCloudinaryResourceType,
  isUserUploadedAsset
} from '@/lib/utils/cloudinary'

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
