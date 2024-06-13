export function fileToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileBlob = new Blob([fileReader.result as ArrayBuffer]);
      resolve(fileBlob);
    };
    fileReader.onerror = () => {
      reject(fileReader.error);
    };
    fileReader.readAsArrayBuffer(file);
  });
}
