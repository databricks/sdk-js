// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The format for workspace import and export. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ExportFormat = {
  /** The notebook will be imported/exported as source code. */
  SOURCE: 'SOURCE',
  /** The notebook will be imported/exported as an HTML file. */
  HTML: 'HTML',
  /** The notebook will be imported/exported as a Jupyter/IPython Notebook file. */
  JUPYTER: 'JUPYTER',
  /** The notebook will be imported/exported as Databricks archive format. */
  DBC: 'DBC',
  /** The notebook will be imported/exported as a R Markdown document. */
  R_MARKDOWN: 'R_MARKDOWN',
  /** We will inspect the content of the payload to determine the type */
  AUTO: 'AUTO',
  /**
   * This is introduced to unblock a DR use case importing .zip file as is.
   * If you import .zip file with AUTO format, it will be imported as a folder.
   * In workspace 3.0 folder import will be supported via a different API.
   */
  RAW: 'RAW',
} as const;
export type ExportFormat =
  | (typeof ExportFormat)[keyof typeof ExportFormat]
  | (string & {});

/** The language of notebook. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Language = {
  /** Scala notebook. */
  SCALA: 'SCALA',
  /** Python notebook. */
  PYTHON: 'PYTHON',
  /** SQL notebook. */
  SQL: 'SQL',
  /** R notebook. */
  R: 'R',
} as const;
export type Language = (typeof Language)[keyof typeof Language] | (string & {});

/** The type of the object in workspace. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ObjectType = {
  /**
   * As of 2023-10 this is used only by list-repo API so that repos can gracefully handle errors
   * for unsupported types.
   */
  OBJECT_TYPE_UNSPECIFIED: 'OBJECT_TYPE_UNSPECIFIED',
  NOTEBOOK: 'NOTEBOOK',
  DIRECTORY: 'DIRECTORY',
  LIBRARY: 'LIBRARY',
  FILE: 'FILE',
  REPO: 'REPO',
  /**
   * Lakeview Dashboard. Using this since DBSQL dashboards will be deprecated soon and are planning
   * on using the dbsql_dashboard prefix in permissions APIs
   */
  DASHBOARD: 'DASHBOARD',
} as const;
export type ObjectType =
  | (typeof ObjectType)[keyof typeof ObjectType]
  | (string & {});

export interface DeleteRequest {
  /** The absolute path of the notebook or directory. */
  path?: string | undefined;
  /**
   * The flag that specifies whether to delete the object recursively. It is `false` by default.
   * Deleting a directory recursively is not atomic. If the call fails part way, some objects under the
   * directory may already be deleted and cannot be restored.
   */
  recursive?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteResponse {}

/** Additional metadata about a directory. */
export interface DirectoryInfo {
  /**
   * Whether the directory is a Git folder, whose contents are version-controlled by a remote Git
   * repository. How a Git folder is represented depends on whether it has Git CLI access:
   *
   * - A Git folder with Git CLI access has an object type of ``DIRECTORY``, with this field set
   * to ``true``.
   * - A standard Git folder, which does not have Git CLI access, has an object type of ``REPO``
   * and does not include this field.
   * - A directory that is not Git-backed has this field set to ``false``.
   *
   * Use this field together with ``object_type`` to identify every Git folder in a workspace.
   */
  isGitFolder?: boolean | undefined;
}

export interface ExportRequest {
  /** The absolute path of the object or directory. Exporting a directory is only supported for the `DBC`, `SOURCE`, and `AUTO` format. */
  path?: string | undefined;
  /**
   * This specifies the format of the exported file. By default, this is `SOURCE`.
   *
   * The value is case sensitive.
   *
   * - `SOURCE`: The notebook is exported as source code. Directory exports will not include non-notebook entries.
   * - `HTML`: The notebook is exported as an HTML file.
   * - `JUPYTER`: The notebook is exported as a Jupyter/IPython Notebook file.
   * - `DBC`: The notebook is exported in <Databricks> archive format. Directory exports will not include non-notebook entries.
   * - `R_MARKDOWN`: The notebook is exported to R Markdown format.
   * - `AUTO`: The object or directory is exported depending on the objects type. Directory exports will include notebooks and workspace files.
   */
  format?: ExportFormat | undefined;
  /**
   * Flag to enable direct download. If it is `true`, the response is the exported file itself.
   * Otherwise, by default, the response contains content in the form of a base64 encoded string.
   */
  directDownload?: boolean | undefined;
}

/** The request field `direct_download` determines whether a JSON response or binary contents are returned by this endpoint. */
export interface ExportResponse {
  /**
   * The base64-encoded content of the exported object.
   * If the content exceeds the size limit (10 MB), the call fails with error code `MAX_NOTEBOOK_SIZE_EXCEEDED`.
   */
  content?: Uint8Array | undefined;
  /**
   * The file extension that matches the exported content, for example `py` for a Python notebook exported as
   * `SOURCE`, `ipynb` for `JUPYTER`, `html` for `HTML`, `dbc` for `DBC`, and `zip` for a directory exported as
   * `SOURCE` or `AUTO`. It is empty for workspace files.
   */
  fileType?: string | undefined;
}

export interface GetStatusRequest {
  /** The absolute path of the notebook or directory. */
  path?: string | undefined;
}

export interface ImportRequest {
  /** The absolute path of the object or directory. Importing a directory is only supported for the `DBC` and `SOURCE` formats. */
  path?: string | undefined;
  /**
   * This specifies the format of the file to be imported.
   *
   * The value is case sensitive.
   *
   * - `AUTO`: The item is imported depending on an analysis of the item's extension and
   * the header content provided in the request. If the item is imported as a notebook,
   * then the item's extension is automatically removed.
   * - `SOURCE`: The notebook or directory is imported as source code.
   * - `HTML`: The notebook is imported as an HTML file.
   * - `JUPYTER`: The notebook is imported as a Jupyter/IPython Notebook file.
   * - `DBC`: The notebook is imported in <Databricks> archive format. Required for directories.
   * - `R_MARKDOWN`: The notebook is imported from R Markdown format.
   */
  format?: ExportFormat | undefined;
  /**
   * The language of the notebook. It applies only to the `SOURCE` format: set it to import a single notebook,
   * or leave it unset to import a directory.
   */
  language?: Language | undefined;
  /**
   * The base64-encoded content to import. The content is limited to 10 MB. If the limit is exceeded, the call
   * fails with error code `MAX_NOTEBOOK_SIZE_EXCEEDED`.
   * This parameter might be absent, and instead a posted file is used.
   */
  content?: Uint8Array | undefined;
  /**
   * The flag that specifies whether to overwrite existing object. It is `false` by default.
   * For `DBC` format, `overwrite` is not supported since it may contain a directory. Importing a directory in
   * `SOURCE` format does not support `overwrite` either.
   */
  overwrite?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ImportResponse {}

export interface ListRequest {
  /** The absolute path of the notebook or directory. */
  path?: string | undefined;
  /**
   * A UTC timestamp in milliseconds since the epoch. When it is set and `path` is a directory, the response
   * includes only the notebooks that were modified after this time. Objects that are not notebooks are
   * always included.
   */
  notebooksModifiedAfter?: bigint | undefined;
}

export interface ListResponse {
  /** List of objects. */
  objects?: ObjectInfo[] | undefined;
}

export interface MkdirsRequest {
  /**
   * The absolute path of the directory. If the parent directories do not exist, it will also create them.
   * If the directory already exists, this command will do nothing and succeed.
   */
  path?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface MkdirsResponse {}

/** The information of the object in workspace. It will be returned by ``list`` and ``get-status``. */
export interface ObjectInfo {
  /**
   * The type of the object in workspace.
   *
   * - `NOTEBOOK`: document that contains runnable code, visualizations, and explanatory text.
   * - `DIRECTORY`: directory
   * - `LIBRARY`: library
   * - `FILE`: file
   * - `REPO`: repository
   * - `DASHBOARD`: Lakeview dashboard
   */
  objectType?: ObjectType | undefined;
  /** The absolute path of the object. */
  path?: string | undefined;
  /** The language of the object. This value is set only if the object type is ``NOTEBOOK``. For Jupyter (.ipynb) notebooks, this is always ``PYTHON``. */
  language?: Language | undefined;
  /** The time the object was created, as a UTC timestamp in milliseconds since the epoch. It is returned for notebooks and files. */
  createdAt?: bigint | undefined;
  /** The time the object was last modified, as a UTC timestamp in milliseconds since the epoch. It is returned for notebooks and files. */
  modifiedAt?: bigint | undefined;
  /** Unique identifier for the object. */
  objectId?: bigint | undefined;
  /** The size of the file in bytes. It is returned only for objects of type ``FILE``. */
  size?: bigint | undefined;
  /** A unique identifier for the object that is consistent across all Databricks APIs. */
  resourceId?: string | undefined;
  /** Additional metadata about the directory. Only set for objects of type ``DIRECTORY``. */
  directoryInfo?: DirectoryInfo | undefined;
}

export const unmarshalDeleteResponseSchema: z.ZodType<DeleteResponse> =
  z.object({});

export const unmarshalDirectoryInfoSchema: z.ZodType<DirectoryInfo> = z
  .object({
    is_git_folder: z.boolean().optional(),
  })
  .transform(d => ({
    isGitFolder: d.is_git_folder,
  }));

export const unmarshalExportResponseSchema: z.ZodType<ExportResponse> = z
  .object({
    content: z
      .string()
      .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
      .optional(),
    file_type: z.string().optional(),
  })
  .transform(d => ({
    content: d.content,
    fileType: d.file_type,
  }));

export const unmarshalImportResponseSchema: z.ZodType<ImportResponse> =
  z.object({});

export const unmarshalListResponseSchema: z.ZodType<ListResponse> = z
  .object({
    objects: z.array(z.lazy(() => unmarshalObjectInfoSchema)).optional(),
  })
  .transform(d => ({
    objects: d.objects,
  }));

export const unmarshalMkdirsResponseSchema: z.ZodType<MkdirsResponse> =
  z.object({});

export const unmarshalObjectInfoSchema: z.ZodType<ObjectInfo> = z
  .object({
    object_type: z.string().optional(),
    path: z.string().optional(),
    language: z.string().optional(),
    created_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    modified_at: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    object_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    size: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    resource_id: z.string().optional(),
    directory_info: z
      .lazy(() => unmarshalDirectoryInfoSchema)
      .nullish()
      .transform(v => v ?? undefined),
  })
  .transform(d => ({
    objectType: d.object_type,
    path: d.path,
    language: d.language,
    createdAt: d.created_at,
    modifiedAt: d.modified_at,
    objectId: d.object_id,
    size: d.size,
    resourceId: d.resource_id,
    directoryInfo: d.directory_info,
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

export const marshalDeleteResponseSchema: z.ZodType = z.object({});

export const marshalDirectoryInfoSchema: z.ZodType = z
  .object({
    isGitFolder: z.boolean().optional(),
  })
  .transform(d => ({
    is_git_folder: d.isGitFolder,
  }));

export const marshalExportRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    format: z.string().optional(),
    directDownload: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    format: d.format,
    direct_download: d.directDownload,
  }));

export const marshalExportResponseSchema: z.ZodType = z
  .object({
    content: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
    fileType: z.string().optional(),
  })
  .transform(d => ({
    content: d.content,
    file_type: d.fileType,
  }));

export const marshalGetStatusRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

export const marshalImportRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    format: z.string().optional(),
    language: z.string().optional(),
    content: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
    overwrite: z.boolean().optional(),
  })
  .transform(d => ({
    path: d.path,
    format: d.format,
    language: d.language,
    content: d.content,
    overwrite: d.overwrite,
  }));

export const marshalImportResponseSchema: z.ZodType = z.object({});

export const marshalListRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    notebooksModifiedAfter: z.bigint().optional(),
  })
  .transform(d => ({
    path: d.path,
    notebooks_modified_after: d.notebooksModifiedAfter,
  }));

export const marshalListResponseSchema: z.ZodType = z
  .object({
    objects: z.array(z.lazy(() => marshalObjectInfoSchema)).optional(),
  })
  .transform(d => ({
    objects: d.objects,
  }));

export const marshalMkdirsRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

export const marshalMkdirsResponseSchema: z.ZodType = z.object({});

export const marshalObjectInfoSchema: z.ZodType = z
  .object({
    objectType: z.string().optional(),
    path: z.string().optional(),
    language: z.string().optional(),
    createdAt: z.bigint().optional(),
    modifiedAt: z.bigint().optional(),
    objectId: z.bigint().optional(),
    size: z.bigint().optional(),
    resourceId: z.string().optional(),
    directoryInfo: z.lazy(() => marshalDirectoryInfoSchema).optional(),
  })
  .transform(d => ({
    object_type: d.objectType,
    path: d.path,
    language: d.language,
    created_at: d.createdAt,
    modified_at: d.modifiedAt,
    object_id: d.objectId,
    size: d.size,
    resource_id: d.resourceId,
    directory_info: d.directoryInfo,
  }));
