import { Storage } from "@google-cloud/storage";
import { IStorageProvider } from "../IStorageProvider";

export class StorageProvider implements IStorageProvider {
  // Testing out upload of file
  async uploadFile({
    filename,
    extension,
  }: {
    filename: string;
    extension: string;
  }): Promise<string | undefined> {
    const storage = new Storage({
      keyFilename: "firebase_config.json",
      projectId: "test4developer-9b983",
    });

    let bucketName = "gs://test4developer-9b983.appspot.com";

    // Uploads a local file to the bucket
    const [_file, response] = await storage
      .bucket(bucketName)
      .upload(`${filename}`, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,

        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
          // Enable long-lived HTTP caching headers
          // Use only if the contents of the file will never change
          // (If the contents will change, use cacheControl: 'no-cache')
          cacheControl: "public, max-age=31536000",
        },
      });

    const _url = await response.mediaLink;
    const [_public_url] = await _file.getSignedUrl({
      expires: "03-09-2491",
      action: "read",
    });

    return _public_url;
  }
}
