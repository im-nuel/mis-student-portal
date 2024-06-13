export interface DocumentFolderSchema {
  mime?: string | undefined;
  type: string;
  url: string;
  name: string;
  size: number;
  fileId: string;
  fileType: string;
  filePath: string;
  thumbnail: string;
  folder: string;
}
