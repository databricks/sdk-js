// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
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

export interface Delete {
  /** The path of the file or directory to delete. The path should be the absolute DBFS path. */
  path?: string | undefined;
  /** Whether or not to recursively delete the directory's contents. Deleting empty directories can be done without providing the recursive flag. */
  recursive?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface Delete_Response {}

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

const addBlockFieldMaskSchema: FieldMaskSchema = {
  data: {wire: 'data'},
  handle: {wire: 'handle'},
};

export function addBlockFieldMask(...paths: string[]): FieldMask<AddBlock> {
  return FieldMask.build<AddBlock>(paths, addBlockFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const addBlock_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function addBlock_ResponseFieldMask(
  ...paths: string[]
): FieldMask<AddBlock_Response> {
  return FieldMask.build<AddBlock_Response>(
    paths,
    addBlock_ResponseFieldMaskSchema
  );
}

const closeFieldMaskSchema: FieldMaskSchema = {
  handle: {wire: 'handle'},
};

export function closeFieldMask(...paths: string[]): FieldMask<Close> {
  return FieldMask.build<Close>(paths, closeFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const close_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function close_ResponseFieldMask(
  ...paths: string[]
): FieldMask<Close_Response> {
  return FieldMask.build<Close_Response>(paths, close_ResponseFieldMaskSchema);
}

const createFieldMaskSchema: FieldMaskSchema = {
  overwrite: {wire: 'overwrite'},
  path: {wire: 'path'},
};

export function createFieldMask(...paths: string[]): FieldMask<Create> {
  return FieldMask.build<Create>(paths, createFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const create_ResponseFieldMaskSchema: FieldMaskSchema = {
  handle: {wire: 'handle'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function create_ResponseFieldMask(
  ...paths: string[]
): FieldMask<Create_Response> {
  return FieldMask.build<Create_Response>(
    paths,
    create_ResponseFieldMaskSchema
  );
}

const deleteFieldMaskSchema: FieldMaskSchema = {
  path: {wire: 'path'},
  recursive: {wire: 'recursive'},
};

export function deleteFieldMask(...paths: string[]): FieldMask<Delete> {
  return FieldMask.build<Delete>(paths, deleteFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const delete_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function delete_ResponseFieldMask(
  ...paths: string[]
): FieldMask<Delete_Response> {
  return FieldMask.build<Delete_Response>(
    paths,
    delete_ResponseFieldMaskSchema
  );
}

const fileInfoFieldMaskSchema: FieldMaskSchema = {
  fileSize: {wire: 'file_size'},
  isDir: {wire: 'is_dir'},
  modificationTime: {wire: 'modification_time'},
  path: {wire: 'path'},
};

export function fileInfoFieldMask(...paths: string[]): FieldMask<FileInfo> {
  return FieldMask.build<FileInfo>(paths, fileInfoFieldMaskSchema);
}

const getStatusFieldMaskSchema: FieldMaskSchema = {
  path: {wire: 'path'},
};

export function getStatusFieldMask(...paths: string[]): FieldMask<GetStatus> {
  return FieldMask.build<GetStatus>(paths, getStatusFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const getStatus_ResponseFieldMaskSchema: FieldMaskSchema = {
  fileSize: {wire: 'file_size'},
  isDir: {wire: 'is_dir'},
  modificationTime: {wire: 'modification_time'},
  path: {wire: 'path'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function getStatus_ResponseFieldMask(
  ...paths: string[]
): FieldMask<GetStatus_Response> {
  return FieldMask.build<GetStatus_Response>(
    paths,
    getStatus_ResponseFieldMaskSchema
  );
}

const listStatusFieldMaskSchema: FieldMaskSchema = {
  path: {wire: 'path'},
};

export function listStatusFieldMask(...paths: string[]): FieldMask<ListStatus> {
  return FieldMask.build<ListStatus>(paths, listStatusFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const listStatus_ResponseFieldMaskSchema: FieldMaskSchema = {
  files: {wire: 'files'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function listStatus_ResponseFieldMask(
  ...paths: string[]
): FieldMask<ListStatus_Response> {
  return FieldMask.build<ListStatus_Response>(
    paths,
    listStatus_ResponseFieldMaskSchema
  );
}

const mkDirsFieldMaskSchema: FieldMaskSchema = {
  path: {wire: 'path'},
};

export function mkDirsFieldMask(...paths: string[]): FieldMask<MkDirs> {
  return FieldMask.build<MkDirs>(paths, mkDirsFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const mkDirs_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function mkDirs_ResponseFieldMask(
  ...paths: string[]
): FieldMask<MkDirs_Response> {
  return FieldMask.build<MkDirs_Response>(
    paths,
    mkDirs_ResponseFieldMaskSchema
  );
}

const moveFieldMaskSchema: FieldMaskSchema = {
  destinationPath: {wire: 'destination_path'},
  sourcePath: {wire: 'source_path'},
};

export function moveFieldMask(...paths: string[]): FieldMask<Move> {
  return FieldMask.build<Move>(paths, moveFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const move_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function move_ResponseFieldMask(
  ...paths: string[]
): FieldMask<Move_Response> {
  return FieldMask.build<Move_Response>(paths, move_ResponseFieldMaskSchema);
}

const putFieldMaskSchema: FieldMaskSchema = {
  contents: {wire: 'contents'},
  overwrite: {wire: 'overwrite'},
  path: {wire: 'path'},
};

export function putFieldMask(...paths: string[]): FieldMask<Put> {
  return FieldMask.build<Put>(paths, putFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const put_ResponseFieldMaskSchema: FieldMaskSchema = {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function put_ResponseFieldMask(
  ...paths: string[]
): FieldMask<Put_Response> {
  return FieldMask.build<Put_Response>(paths, put_ResponseFieldMaskSchema);
}

const readFieldMaskSchema: FieldMaskSchema = {
  length: {wire: 'length'},
  offset: {wire: 'offset'},
  path: {wire: 'path'},
};

export function readFieldMask(...paths: string[]): FieldMask<Read> {
  return FieldMask.build<Read>(paths, readFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const read_ResponseFieldMaskSchema: FieldMaskSchema = {
  bytesRead: {wire: 'bytes_read'},
  data: {wire: 'data'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function read_ResponseFieldMask(
  ...paths: string[]
): FieldMask<Read_Response> {
  return FieldMask.build<Read_Response>(paths, read_ResponseFieldMaskSchema);
}
