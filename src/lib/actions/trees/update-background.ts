'use server'

import { type UploadApiResponse, v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function updateBackground(formData: FormData) {
  const file = formData.get('file') as File
  const resourceType = (formData.get('resourceType') as string) ?? 'image'
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const response = await new Promise<UploadApiResponse | undefined>(
      (resolve) => {
        cloudinary.uploader
          .upload_stream(
            {
              upload_preset: 'cgbdjdkz',
              folder: 'linktree/tree-backgrounds',
              resource_type: resourceType as 'image' | 'video'
            },
            function (error, result) {
              if (error != null) {
                throw new Error(error?.message)
              }

              resolve(result)
            }
          )
          .end(buffer)
      }
    )

    if (response !== undefined) {
      return response
    } else {
      return null
    }
  } catch (error) {
    console.error('ACTION_ERROR: ', error)

    return null
  }
}
