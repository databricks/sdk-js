// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';


export interface AddBlockRequest {
  /** The handle on an open stream. */
  handle?: number | undefined;
  /** The base64-encoded data to append to the stream. This has a limit of 1 MB. */
  data?: Uint8Array | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface AddBlockRequest_Response {}

export interface CloseRequest {
  /** The handle on an open stream. */
  handle?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface CloseRequest_Response {}

/** Create a directory */
export interface CreateDirectoryRequest {
  /** The absolute path of a directory. */
  directoryPath?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateDirectoryResponse {}

export interface CreateRequest {
  /** The path of the new file. The path should be the absolute DBFS path. */
  path?: string | undefined;
  /** The flag that specifies whether to overwrite existing file/files. */
  overwrite?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CreateRequest_Response {
  /** Handle which should subsequently be passed into the AddBlock and Close calls when writing to a file through a stream. */
  handle?: number | undefined;
}

/** Delete a directory */
export interface DeleteDirectoryRequest {
  /** The absolute path of a directory. */
  directoryPath?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteDirectoryResponse {}

/** Delete a file */
export interface DeleteFileRequest {
  /** The absolute path of the file. */
  filePath?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteFileResponse {}

export interface DeleteRequest {
  /** The path of the file or directory to delete. The path should be the absolute DBFS path. */
  path?: string | undefined;
  /** Whether or not to recursively delete the directory's contents. Deleting empty directories can be done without providing the recursive flag. */
  recursive?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteRequest_Response {}

export interface DirectoryEntry {
  /** The length of the file in bytes. This field is omitted for directories. */
  fileSize?: number | undefined;
  /** True if the path is a directory. */
  isDirectory?: boolean | undefined;
  /** Last modification time of given file in milliseconds since unix epoch. */
  lastModified?: number | undefined;
  /** The name of the file or directory. This is the last component of the path. */
  name?: string | undefined;
  /** The absolute path of the file or directory. */
  path?: string | undefined;
}

/** Download a file */
export interface DownloadFileRequest {
  /** The absolute path of the file. */
  filePath?: string | undefined;
  /**
   * The range of bytes to retrieve.
   * The range is inclusive and zero-based, see
   * [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110#name-range) for further details.
   */
  range?: string | undefined;
  /**
   * Download the file only if it has not been modified since the specified timestamp.
   * If it has, a 412 Precondition Failed error will be returned.
   * See [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110#name-if-unmodified-since) for further details.
   */
  ifUnmodifiedSince?: string | undefined;
}

export interface DownloadFileResponse {
  /** The length of the HTTP response body in bytes. */
  contentLength?: number | undefined;
  contentType?: string | undefined;
  contents?: ReadableStream | undefined;
  /** The last modified time of the file in HTTP-date (RFC 7231) format. */
  lastModified?: string | undefined;
}

/** Stores the attributes of a file or directory. */
export interface FileInfo {
  /** The absolute path of the file or directory. */
  path?: string | undefined;
  /** True if the path is a directory. */
  isDir?: boolean | undefined;
  /** The length of the file in bytes. This field is omitted for directories. */
  fileSize?: number | undefined;
  /** Last modification time of given file in milliseconds since epoch. */
  modificationTime?: number | undefined;
}

/** Get directory metadata */
export interface GetDirectoryMetadataRequest {
  /** The absolute path of a directory. */
  directoryPath?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetDirectoryMetadataResponse {}

/** Get file metadata */
export interface GetFileMetadataRequest {
  /** The absolute path of the file. */
  filePath?: string | undefined;
  /**
   * The range of bytes to retrieve.
   * The range is inclusive and zero-based, see
   * [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110#name-range) for further details.
   */
  range?: string | undefined;
  /**
   * Download the file only if it has not been modified since the specified timestamp.
   * If it has, a 412 Precondition Failed error will be returned.
   * See [RFC 9110](https://datatracker.ietf.org/doc/html/rfc9110#name-if-unmodified-since) for further details.
   */
  ifUnmodifiedSince?: string | undefined;
}

export interface GetFileMetadataResponse {
  /** The length of the HTTP response body in bytes. */
  contentLength?: number | undefined;
  contentType?: string | undefined;
  /** The last modified time of the file in HTTP-date (RFC 7231) format. */
  lastModified?: string | undefined;
}

export interface GetStatusRequest {
  /** The path of the file or directory. The path should be the absolute DBFS path. */
  path?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetStatusRequest_Response {
  /** The absolute path of the file or directory. */
  path?: string | undefined;
  /** True if the path is a directory. */
  isDir?: boolean | undefined;
  /** The length of the file in bytes. This field is omitted for directories. */
  fileSize?: number | undefined;
  /** Last modification time of given file in milliseconds since epoch. */
  modificationTime?: number | undefined;
}

/** List directory contents */
export interface ListDirectoryContentsRequest {
  /** The absolute path of a directory. */
  directoryPath?: string | undefined;
  /**
   * The maximum number of directory entries to return. The response may contain fewer
   * entries. If the response contains a `next_page_token`, there may be more entries,
   * even if fewer than `page_size` entries are in the response.
   * 
   * We recommend not to set this value unless you are intentionally listing less than
   * the complete directory contents.
   * 
   * If unspecified, at most 1000 directory entries will be returned.
   * The maximum value is 1000. Values above 1000 will be coerced to 1000.
   */
  pageSize?: number | undefined;
  /**
   * An opaque page token which was the `next_page_token` in the response of the previous
   * request to list the contents of this directory. Provide this token to retrieve the
   * next page of directory entries.
   * When providing a `page_token`, all other parameters provided to the request must match
   * the previous request.
   * To list all of the entries in a directory, it is necessary to continue requesting
   * pages of entries until the response contains no `next_page_token`. Note that the
   * number of entries returned must not be used to determine when the listing is complete.
   */
  pageToken?: string | undefined;
}

export interface ListDirectoryResponse {
  /** Array of DirectoryEntry. */
  contents?: DirectoryEntry[] | undefined;
  /** A token, which can be sent as `page_token` to retrieve the next page. */
  nextPageToken?: string | undefined;
}

export interface ListStatusRequest {
  /** The path of the file or directory. The path should be the absolute DBFS path. */
  path?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListStatusRequest_Response {
  /** A list of FileInfo's that describe contents of directory or file. See example above. */
  files?: FileInfo[] | undefined;
}

export interface MkDirsRequest {
  /** The path of the new directory. The path should be the absolute DBFS path. */
  path?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface MkDirsRequest_Response {}

export interface MoveRequest {
  /** The source path of the file or directory. The path should be the absolute DBFS path. */
  sourcePath?: string | undefined;
  /** The destination path of the file or directory. The path should be the absolute DBFS path. */
  destinationPath?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface MoveRequest_Response {}

export interface PutRequest {
  /** The path of the new file. The path should be the absolute DBFS path. */
  path?: string | undefined;
  /** This parameter might be absent, and instead a posted file will be used. */
  contents?: Uint8Array | undefined;
  /** The flag that specifies whether to overwrite existing file/files. */
  overwrite?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface PutRequest_Response {}

export interface ReadRequest {
  /** The path of the file to read. The path should be the absolute DBFS path. */
  path?: string | undefined;
  /** The offset to read from in bytes. */
  offset?: number | undefined;
  /**
   * The number of bytes to read starting from the offset. This has a limit of 1 MB, and a default
   * value of 0.5 MB.
   */
  length?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ReadRequest_Response {
  /**
   * The number of bytes read (could be less than ``length`` if we hit end of file). This refers to
   * number of bytes read in unencoded version (response data is base64-encoded).
   */
  bytesRead?: number | undefined;
  /** The base64-encoded contents of the file read. */
  data?: Uint8Array | undefined;
}

/** Upload a file */
export interface UploadFileRequest {
  /** The absolute path of the file. */
  filePath?: string | undefined;
  contents?: ReadableStream | undefined;
  /** If true or unspecified, an existing file will be overwritten. If false, an error will be returned if the path points to an existing file. */
  overwrite?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UploadFileResponse {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAddBlockRequest_ResponseSchema: z.ZodType<AddBlockRequest_Response> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCloseRequest_ResponseSchema: z.ZodType<CloseRequest_Response> = z
  .object({
  });

export const unmarshalCreateDirectoryResponseSchema: z.ZodType<CreateDirectoryResponse> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateRequest_ResponseSchema: z.ZodType<CreateRequest_Response> = z
  .object({
    handle: z.number().optional(),
  })
  .transform(d => ({
    handle: d.handle,
  }));

export const unmarshalDeleteDirectoryResponseSchema: z.ZodType<DeleteDirectoryResponse> = z
  .object({
  });

export const unmarshalDeleteFileResponseSchema: z.ZodType<DeleteFileResponse> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteRequest_ResponseSchema: z.ZodType<DeleteRequest_Response> = z
  .object({
  });

export const unmarshalDirectoryEntrySchema: z.ZodType<DirectoryEntry> = z
  .object({
    file_size: z.number().optional(),
    is_directory: z.boolean().optional(),
    last_modified: z.number().optional(),
    name: z.string().optional(),
    path: z.string().optional(),
  })
  .transform(d => ({
    fileSize: d.file_size,
    isDirectory: d.is_directory,
    lastModified: d.last_modified,
    name: d.name,
    path: d.path,
  }));

export const unmarshalFileInfoSchema: z.ZodType<FileInfo> = z
  .object({
    path: z.string().optional(),
    is_dir: z.boolean().optional(),
    file_size: z.number().optional(),
    modification_time: z.number().optional(),
  })
  .transform(d => ({
    path: d.path,
    isDir: d.is_dir,
    fileSize: d.file_size,
    modificationTime: d.modification_time,
  }));

export const unmarshalGetDirectoryMetadataResponseSchema: z.ZodType<GetDirectoryMetadataResponse> = z
  .object({
  });

export const unmarshalGetFileMetadataResponseSchema: z.ZodType<GetFileMetadataResponse> = z
  .object({
    "content-length": z.number().optional(),
    "content-type": z.string().optional(),
    "last-modified": z.string().optional(),
  })
  .transform(d => ({
    contentLength: d["content-length"],
    contentType: d["content-type"],
    lastModified: d["last-modified"],
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetStatusRequest_ResponseSchema: z.ZodType<GetStatusRequest_Response> = z
  .object({
    path: z.string().optional(),
    is_dir: z.boolean().optional(),
    file_size: z.number().optional(),
    modification_time: z.number().optional(),
  })
  .transform(d => ({
    path: d.path,
    isDir: d.is_dir,
    fileSize: d.file_size,
    modificationTime: d.modification_time,
  }));

export const unmarshalListDirectoryResponseSchema: z.ZodType<ListDirectoryResponse> = z
  .object({
    contents: z.array(z.lazy(() => unmarshalDirectoryEntrySchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    contents: d.contents,
    nextPageToken: d.next_page_token,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListStatusRequest_ResponseSchema: z.ZodType<ListStatusRequest_Response> = z
  .object({
    files: z.array(z.lazy(() => unmarshalFileInfoSchema)).optional(),
  })
  .transform(d => ({
    files: d.files,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalMkDirsRequest_ResponseSchema: z.ZodType<MkDirsRequest_Response> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalMoveRequest_ResponseSchema: z.ZodType<MoveRequest_Response> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPutRequest_ResponseSchema: z.ZodType<PutRequest_Response> = z
  .object({
  });

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalReadRequest_ResponseSchema: z.ZodType<ReadRequest_Response> = z
  .object({
    bytes_read: z.number().optional(),
    data: z.string().transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0))).optional(),
  })
  .transform(d => ({
    bytesRead: d.bytes_read,
    data: d.data,
  }));

export const unmarshalUploadFileResponseSchema: z.ZodType<UploadFileResponse> = z
  .object({
  });

export const marshalAddBlockRequestSchema: z.ZodType = z
  .object({
    handle: z.number().optional(),
    data: z.any().transform((d: Uint8Array) => btoa(Array.from(d, b => String.fromCharCode(b)).join(''))).optional(),
  })
  .transform(d => ({
    handle: d.handle,
    data: d.data,
  }));

export const marshalCloseRequestSchema: z.ZodType = z
  .object({
    handle: z.number().optional(),
  })
  .transform(d => ({
    handle: d.handle,
  }));

export const marshalCreateRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    overwrite: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    overwrite: d.overwrite,
  }));

export const marshalDeleteRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    recursive: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    recursive: d.recursive,
  }));

export const marshalMkDirsRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

export const marshalMoveRequestSchema: z.ZodType = z
  .object({
    sourcePath: z.string().optional(),
    destinationPath: z.string().optional(),
  })
  .transform(d => ({
    source_path: d.sourcePath,
    destination_path: d.destinationPath,
  }));

export const marshalPutRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    contents: z.any().transform((d: Uint8Array) => btoa(Array.from(d, b => String.fromCharCode(b)).join(''))).optional(),
    overwrite: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    contents: d.contents,
    overwrite: d.overwrite,
  }));
