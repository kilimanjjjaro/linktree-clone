import { type UploadApiResponse, v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

type ApiReponseType = UploadApiResponse | undefined

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const response: ApiReponseType = await new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream(
        {
          upload_preset: 'cgbdjdkz',
          folder: 'linktree/links-avatar'
        },
        function (error, result) {
          if (error != null) {
            Error(error?.message)

            return
          }

          resolve(result)
        }
      )
      .end(buffer)
  })

  return Response.json(response)
}
