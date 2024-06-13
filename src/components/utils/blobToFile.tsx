export function blobToFile(
  blob: Blob,
  fileName: string,
  lastModified: number = Date.now(),
  type: string = blob.type
): File {
  return new File([blob], fileName, { lastModified, type });
}
