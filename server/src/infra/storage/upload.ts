import { randomUUID } from 'node:crypto'
import { basename, extname } from 'node:path'
import { Readable } from 'node:stream'
import { env } from '@/env'
import { z } from 'zod'
import { Upload } from '@aws-sdk/lib-storage'
import { r2 } from './client'

const uploadFileToStorageInput = z.object({
  fileName: z.string(),
  contentStream: z.instanceof(Readable),
  contentType: z.string(),
  folder: z.enum(['images', 'downloads']),
})

type UploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>

export async function uploadFileToStorage(params: UploadFileToStorageInput) {
  const { fileName, contentStream, contentType, folder } =
    uploadFileToStorageInput.parse(params)

  const fileExt = extname(fileName)
  const fileNameWithoutExt = basename(fileName)
  const sanitizedFileName = fileNameWithoutExt.replace(/[^a-zA-Z0-9]/g, '')
  const sanitizedFileNameWithExt = `${sanitizedFileName}${fileExt}`
  const uploadName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExt}`

  const upload = new Upload({
    client: r2,
    params: {
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: uploadName,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  await upload.done()

  return {
    key: uploadName,
    url: new URL(uploadName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  }
}