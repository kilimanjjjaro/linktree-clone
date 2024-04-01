export async function fetchBlobData(blobUrl: string) {
  const response = await fetch(blobUrl);

  return await response.blob();
}
