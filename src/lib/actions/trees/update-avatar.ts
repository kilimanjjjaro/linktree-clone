"use server"

import type { UploadApiResponse } from "cloudinary"

import { cloudinary } from "@/lib/cloudinary"

export async function updateAvatar(formData: FormData) {
  const file = formData.get("file") as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const response = await new Promise<UploadApiResponse | undefined>(
      (resolve) => {
        cloudinary.uploader
          .upload_stream(
            {
              upload_preset: "cgbdjdkz",
              folder: "linktree/links-avatar"
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
    console.error("ACTION_ERROR: ", error)

    return null
  }
}
