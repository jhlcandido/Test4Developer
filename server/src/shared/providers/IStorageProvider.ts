export interface IStorageProvider {
  uploadFile({
    filename,
    extension,
  }: {
    filename: string;
    extension: string;
  }): Promise<string | undefined>;
}
