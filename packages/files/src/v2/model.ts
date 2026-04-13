// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface AddBlock {
  /** The handle on an open stream. */
  handle?: number | undefined;
  /** The base64-encoded data to append to the stream. This has a limit of 1 MB. */
  data?: Uint8Array | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface AddBlock_Response {}

export interface Close {
  /** The handle on an open stream. */
  handle?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface Close_Response {}

export interface Create {
  /** The path of the new file. The path should be the absolute DBFS path. */
  path?: string | undefined;
  /** The flag that specifies whether to overwrite existing file/files. */
  overwrite?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface Create_Response {
  /** Handle which should subsequently be passed into the AddBlock and Close calls when writing to a file through a stream. */
  handle?: number | undefined;
}

/** Create a directory */
export interface CreateDirectoryRequest {
  /** The absolute path of a directory. */
  directoryPath?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateDirectoryResponse {}

export interface Delete {
  /** The path of the file or directory to delete. The path should be the absolute DBFS path. */
  path?: string | undefined;
  /** Whether or not to recursively delete the directory's contents. Deleting empty directories can be done without providing the recursive flag. */
  recursive?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface Delete_Response {}

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
  contents?: Uint8Array | undefined;
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

export interface GetStatus {
  /** The path of the file or directory. The path should be the absolute DBFS path. */
  path?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetStatus_Response {
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

export interface ListStatus {
  /** The path of the file or directory. The path should be the absolute DBFS path. */
  path?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListStatus_Response {
  /** A list of FileInfo's that describe contents of directory or file. See example above. */
  files?: FileInfo[] | undefined;
}

export interface MkDirs {
  /** The path of the new directory. The path should be the absolute DBFS path. */
  path?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface MkDirs_Response {}

export interface Move {
  /** The source path of the file or directory. The path should be the absolute DBFS path. */
  sourcePath?: string | undefined;
  /** The destination path of the file or directory. The path should be the absolute DBFS path. */
  destinationPath?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface Move_Response {}

export interface Put {
  /** The path of the new file. The path should be the absolute DBFS path. */
  path?: string | undefined;
  /** This parameter might be absent, and instead a posted file will be used. */
  contents?: Uint8Array | undefined;
  /** The flag that specifies whether to overwrite existing file/files. */
  overwrite?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface Put_Response {}

export interface Read {
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
export interface Read_Response {
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
  contents?: Uint8Array | undefined;
  /** If true or unspecified, an existing file will be overwritten. If false, an error will be returned if the path points to an existing file. */
  overwrite?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UploadFileResponse {}

export const unmarshalAddBlockSchema: z.ZodType<AddBlock> = z
  .object({
    handle: z.number().optional(),
    data: z
      .string()
      .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
      .optional(),
  })
  .transform(d => ({
    handle: d.handle,
    data: d.data,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalAddBlock_ResponseSchema: z.ZodType<AddBlock_Response> =
  z.object({});

export const unmarshalCloseSchema: z.ZodType<Close> = z
  .object({
    handle: z.number().optional(),
  })
  .transform(d => ({
    handle: d.handle,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalClose_ResponseSchema: z.ZodType<Close_Response> =
  z.object({});

export const unmarshalCreateSchema: z.ZodType<Create> = z
  .object({
    path: z.string().optional(),
    overwrite: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    overwrite: d.overwrite,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreate_ResponseSchema: z.ZodType<Create_Response> = z
  .object({
    handle: z.number().optional(),
  })
  .transform(d => ({
    handle: d.handle,
  }));

export const unmarshalCreateDirectoryRequestSchema: z.ZodType<CreateDirectoryRequest> =
  z
    .object({
      directory_path: z.string().optional(),
    })
    .transform(d => ({
      directoryPath: d.directory_path,
    }));

export const unmarshalCreateDirectoryResponseSchema: z.ZodType<CreateDirectoryResponse> =
  z.object({});

export const unmarshalDeleteSchema: z.ZodType<Delete> = z
  .object({
    path: z.string().optional(),
    recursive: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    recursive: d.recursive,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDelete_ResponseSchema: z.ZodType<Delete_Response> =
  z.object({});

export const unmarshalDeleteDirectoryRequestSchema: z.ZodType<DeleteDirectoryRequest> =
  z
    .object({
      directory_path: z.string().optional(),
    })
    .transform(d => ({
      directoryPath: d.directory_path,
    }));

export const unmarshalDeleteDirectoryResponseSchema: z.ZodType<DeleteDirectoryResponse> =
  z.object({});

export const unmarshalDeleteFileRequestSchema: z.ZodType<DeleteFileRequest> = z
  .object({
    file_path: z.string().optional(),
  })
  .transform(d => ({
    filePath: d.file_path,
  }));

export const unmarshalDeleteFileResponseSchema: z.ZodType<DeleteFileResponse> =
  z.object({});

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

export const unmarshalDownloadFileRequestSchema: z.ZodType<DownloadFileRequest> =
  z
    .object({
      file_path: z.string().optional(),
      Range: z.string().optional(),
      'If-Unmodified-Since': z.string().optional(),
    })
    .transform(d => ({
      filePath: d.file_path,
      range: d.Range,
      ifUnmodifiedSince: d['If-Unmodified-Since'],
    }));

export const unmarshalDownloadFileResponseSchema: z.ZodType<DownloadFileResponse> =
  z
    .object({
      'content-length': z.number().optional(),
      'content-type': z.string().optional(),
      contents: z
        .string()
        .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
        .optional(),
      'last-modified': z.string().optional(),
    })
    .transform(d => ({
      contentLength: d['content-length'],
      contentType: d['content-type'],
      contents: d.contents,
      lastModified: d['last-modified'],
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

export const unmarshalGetDirectoryMetadataRequestSchema: z.ZodType<GetDirectoryMetadataRequest> =
  z
    .object({
      directory_path: z.string().optional(),
    })
    .transform(d => ({
      directoryPath: d.directory_path,
    }));

export const unmarshalGetDirectoryMetadataResponseSchema: z.ZodType<GetDirectoryMetadataResponse> =
  z.object({});

export const unmarshalGetFileMetadataRequestSchema: z.ZodType<GetFileMetadataRequest> =
  z
    .object({
      file_path: z.string().optional(),
      Range: z.string().optional(),
      'If-Unmodified-Since': z.string().optional(),
    })
    .transform(d => ({
      filePath: d.file_path,
      range: d.Range,
      ifUnmodifiedSince: d['If-Unmodified-Since'],
    }));

export const unmarshalGetFileMetadataResponseSchema: z.ZodType<GetFileMetadataResponse> =
  z
    .object({
      'content-length': z.number().optional(),
      'content-type': z.string().optional(),
      'last-modified': z.string().optional(),
    })
    .transform(d => ({
      contentLength: d['content-length'],
      contentType: d['content-type'],
      lastModified: d['last-modified'],
    }));

export const unmarshalGetStatusSchema: z.ZodType<GetStatus> = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetStatus_ResponseSchema: z.ZodType<GetStatus_Response> =
  z
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

export const unmarshalListDirectoryContentsRequestSchema: z.ZodType<ListDirectoryContentsRequest> =
  z
    .object({
      directory_path: z.string().optional(),
      page_size: z.number().optional(),
      page_token: z.string().optional(),
    })
    .transform(d => ({
      directoryPath: d.directory_path,
      pageSize: d.page_size,
      pageToken: d.page_token,
    }));

export const unmarshalListDirectoryResponseSchema: z.ZodType<ListDirectoryResponse> =
  z
    .object({
      contents: z.array(z.lazy(() => unmarshalDirectoryEntrySchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      contents: d.contents,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListStatusSchema: z.ZodType<ListStatus> = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListStatus_ResponseSchema: z.ZodType<ListStatus_Response> =
  z
    .object({
      files: z.array(z.lazy(() => unmarshalFileInfoSchema)).optional(),
    })
    .transform(d => ({
      files: d.files,
    }));

export const unmarshalMkDirsSchema: z.ZodType<MkDirs> = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalMkDirs_ResponseSchema: z.ZodType<MkDirs_Response> =
  z.object({});

export const unmarshalMoveSchema: z.ZodType<Move> = z
  .object({
    source_path: z.string().optional(),
    destination_path: z.string().optional(),
  })
  .transform(d => ({
    sourcePath: d.source_path,
    destinationPath: d.destination_path,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalMove_ResponseSchema: z.ZodType<Move_Response> = z.object(
  {}
);

export const unmarshalPutSchema: z.ZodType<Put> = z
  .object({
    path: z.string().optional(),
    contents: z
      .string()
      .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
      .optional(),
    overwrite: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    contents: d.contents,
    overwrite: d.overwrite,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPut_ResponseSchema: z.ZodType<Put_Response> = z.object(
  {}
);

export const unmarshalReadSchema: z.ZodType<Read> = z
  .object({
    path: z.string().optional(),
    offset: z.number().optional(),
    length: z.number().optional(),
  })
  .transform(d => ({
    path: d.path,
    offset: d.offset,
    length: d.length,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalRead_ResponseSchema: z.ZodType<Read_Response> = z
  .object({
    bytes_read: z.number().optional(),
    data: z
      .string()
      .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
      .optional(),
  })
  .transform(d => ({
    bytesRead: d.bytes_read,
    data: d.data,
  }));

export const unmarshalUploadFileRequestSchema: z.ZodType<UploadFileRequest> = z
  .object({
    file_path: z.string().optional(),
    contents: z
      .string()
      .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
      .optional(),
    overwrite: z.boolean().optional(),
  })
  .transform(d => ({
    filePath: d.file_path,
    contents: d.contents,
    overwrite: d.overwrite,
  }));

export const unmarshalUploadFileResponseSchema: z.ZodType<UploadFileResponse> =
  z.object({});

export const marshalAddBlockSchema: z.ZodType = z
  .object({
    handle: z.number().optional(),
    data: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
  })
  .transform(d => ({
    handle: d.handle,
    data: d.data,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalAddBlock_ResponseSchema: z.ZodType = z.object({});

export const marshalCloseSchema: z.ZodType = z
  .object({
    handle: z.number().optional(),
  })
  .transform(d => ({
    handle: d.handle,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalClose_ResponseSchema: z.ZodType = z.object({});

export const marshalCreateSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    overwrite: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    overwrite: d.overwrite,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCreate_ResponseSchema: z.ZodType = z
  .object({
    handle: z.number().optional(),
  })
  .transform(d => ({
    handle: d.handle,
  }));

export const marshalCreateDirectoryRequestSchema: z.ZodType = z
  .object({
    directoryPath: z.string().optional(),
  })
  .transform(d => ({
    directory_path: d.directoryPath,
  }));

export const marshalCreateDirectoryResponseSchema: z.ZodType = z.object({});

export const marshalDeleteSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    recursive: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    recursive: d.recursive,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDelete_ResponseSchema: z.ZodType = z.object({});

export const marshalDeleteDirectoryRequestSchema: z.ZodType = z
  .object({
    directoryPath: z.string().optional(),
  })
  .transform(d => ({
    directory_path: d.directoryPath,
  }));

export const marshalDeleteDirectoryResponseSchema: z.ZodType = z.object({});

export const marshalDeleteFileRequestSchema: z.ZodType = z
  .object({
    filePath: z.string().optional(),
  })
  .transform(d => ({
    file_path: d.filePath,
  }));

export const marshalDeleteFileResponseSchema: z.ZodType = z.object({});

export const marshalDirectoryEntrySchema: z.ZodType = z
  .object({
    fileSize: z.number().optional(),
    isDirectory: z.boolean().optional(),
    lastModified: z.number().optional(),
    name: z.string().optional(),
    path: z.string().optional(),
  })
  .transform(d => ({
    file_size: d.fileSize,
    is_directory: d.isDirectory,
    last_modified: d.lastModified,
    name: d.name,
    path: d.path,
  }));

export const marshalDownloadFileRequestSchema: z.ZodType = z
  .object({
    filePath: z.string().optional(),
    range: z.string().optional(),
    ifUnmodifiedSince: z.string().optional(),
  })
  .transform(d => ({
    file_path: d.filePath,
    Range: d.range,
    'If-Unmodified-Since': d.ifUnmodifiedSince,
  }));

export const marshalDownloadFileResponseSchema: z.ZodType = z
  .object({
    contentLength: z.number().optional(),
    contentType: z.string().optional(),
    contents: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
    lastModified: z.string().optional(),
  })
  .transform(d => ({
    'content-length': d.contentLength,
    'content-type': d.contentType,
    contents: d.contents,
    'last-modified': d.lastModified,
  }));

export const marshalFileInfoSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    isDir: z.boolean().optional(),
    fileSize: z.number().optional(),
    modificationTime: z.number().optional(),
  })
  .transform(d => ({
    path: d.path,
    is_dir: d.isDir,
    file_size: d.fileSize,
    modification_time: d.modificationTime,
  }));

export const marshalGetDirectoryMetadataRequestSchema: z.ZodType = z
  .object({
    directoryPath: z.string().optional(),
  })
  .transform(d => ({
    directory_path: d.directoryPath,
  }));

export const marshalGetDirectoryMetadataResponseSchema: z.ZodType = z.object(
  {}
);

export const marshalGetFileMetadataRequestSchema: z.ZodType = z
  .object({
    filePath: z.string().optional(),
    range: z.string().optional(),
    ifUnmodifiedSince: z.string().optional(),
  })
  .transform(d => ({
    file_path: d.filePath,
    Range: d.range,
    'If-Unmodified-Since': d.ifUnmodifiedSince,
  }));

export const marshalGetFileMetadataResponseSchema: z.ZodType = z
  .object({
    contentLength: z.number().optional(),
    contentType: z.string().optional(),
    lastModified: z.string().optional(),
  })
  .transform(d => ({
    'content-length': d.contentLength,
    'content-type': d.contentType,
    'last-modified': d.lastModified,
  }));

export const marshalGetStatusSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalGetStatus_ResponseSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    isDir: z.boolean().optional(),
    fileSize: z.number().optional(),
    modificationTime: z.number().optional(),
  })
  .transform(d => ({
    path: d.path,
    is_dir: d.isDir,
    file_size: d.fileSize,
    modification_time: d.modificationTime,
  }));

export const marshalListDirectoryContentsRequestSchema: z.ZodType = z
  .object({
    directoryPath: z.string().optional(),
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    directory_path: d.directoryPath,
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListDirectoryResponseSchema: z.ZodType = z
  .object({
    contents: z.array(z.lazy(() => marshalDirectoryEntrySchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    contents: d.contents,
    next_page_token: d.nextPageToken,
  }));

export const marshalListStatusSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListStatus_ResponseSchema: z.ZodType = z
  .object({
    files: z.array(z.lazy(() => marshalFileInfoSchema)).optional(),
  })
  .transform(d => ({
    files: d.files,
  }));

export const marshalMkDirsSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalMkDirs_ResponseSchema: z.ZodType = z.object({});

export const marshalMoveSchema: z.ZodType = z
  .object({
    sourcePath: z.string().optional(),
    destinationPath: z.string().optional(),
  })
  .transform(d => ({
    source_path: d.sourcePath,
    destination_path: d.destinationPath,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalMove_ResponseSchema: z.ZodType = z.object({});

export const marshalPutSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    contents: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
    overwrite: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    contents: d.contents,
    overwrite: d.overwrite,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalPut_ResponseSchema: z.ZodType = z.object({});

export const marshalReadSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    offset: z.number().optional(),
    length: z.number().optional(),
  })
  .transform(d => ({
    path: d.path,
    offset: d.offset,
    length: d.length,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalRead_ResponseSchema: z.ZodType = z
  .object({
    bytesRead: z.number().optional(),
    data: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
  })
  .transform(d => ({
    bytes_read: d.bytesRead,
    data: d.data,
  }));

export const marshalUploadFileRequestSchema: z.ZodType = z
  .object({
    filePath: z.string().optional(),
    contents: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
    overwrite: z.boolean().optional(),
  })
  .transform(d => ({
    file_path: d.filePath,
    contents: d.contents,
    overwrite: d.overwrite,
  }));

export const marshalUploadFileResponseSchema: z.ZodType = z.object({});
