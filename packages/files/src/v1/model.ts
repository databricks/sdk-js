/**
 * Request and response types for the Databricks Files service.
 */

/** Request to upload a file to the Databricks workspace. */
export interface UploadRequest {
  /** The absolute path of the file in the workspace. */
  filePath: string;

  /** The file contents as a readable stream of bytes. */
  contents: ReadableStream<Uint8Array>;

  /** When true, overwrites the file if it already exists. */
  overwrite?: boolean;
}

/** Request to download a file from the Databricks workspace. */
export interface DownloadRequest {
  /** The absolute path of the file in the workspace. */
  filePath: string;
}

/** Response from a file download operation. */
export interface DownloadResponse {
  /**
   * The file contents as a readable stream of bytes. The caller is
   * responsible for consuming or cancelling this stream.
   */
  contents: ReadableStream<Uint8Array>;

  /** The size of the file in bytes, if provided by the server. */
  contentLength?: number;

  /** The MIME type of the file, if provided by the server. */
  contentType?: string;

  /** The last-modified timestamp, if provided by the server. */
  lastModified?: string;
}
