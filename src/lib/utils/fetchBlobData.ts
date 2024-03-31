export async function fetchBlobData(blobUrl: string): Promise<Blob> {
  const response = await fetch(blobUrl)

  return await response.blob()
}
