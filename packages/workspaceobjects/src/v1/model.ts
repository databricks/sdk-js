// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The format for workspace import and export. */
export enum ExportFormat {
  /** The notebook will be imported/exported as source code. */
  SOURCE = 'SOURCE',
  /** The notebook will be imported/exported as an HTML file. */
  HTML = 'HTML',
  /** The notebook will be imported/exported as a Jupyter/IPython Notebook file. */
  JUPYTER = 'JUPYTER',
  /** The notebook will be imported/exported as Databricks archive format. */
  DBC = 'DBC',
  /** The notebook will be imported/exported as a R Markdown document. */
  R_MARKDOWN = 'R_MARKDOWN',
  /** We will inspect the content of the payload to determine the type */
  AUTO = 'AUTO',
  /**
   * This is introduced to unblock a DR use case importing .zip file as is.
   * If you import .zip file with AUTO format, it will be imported as a folder.
   * In workspace 3.0 folder import will be supported via a different API.
   */
  RAW = 'RAW',
}

/** The language of notebook. */
export enum Language {
  /** Scala notebook. */
  SCALA = 'SCALA',
  /** Python notebook. */
  PYTHON = 'PYTHON',
  /** SQL notebook. */
  SQL = 'SQL',
  /** R notebook. */
  R = 'R',
}

/** The type of the object in workspace. */
export enum ObjectType {
  /**
   * As of 2023-10 this is used only by list-repo API so that repos can gracefully handle errors
   * for unsupported types.
   */
  OBJECT_TYPE_UNSPECIFIED = 'OBJECT_TYPE_UNSPECIFIED',
  NOTEBOOK = 'NOTEBOOK',
  DIRECTORY = 'DIRECTORY',
  LIBRARY = 'LIBRARY',
  FILE = 'FILE',
  REPO = 'REPO',
  /**
   * Lakeview Dashboard. Using this since DBSQL dashboards will be deprecated soon and are planning
   * on using the dbsql_dashboard prefix in permissions APIs
   */
  DASHBOARD = 'DASHBOARD',
}

export interface DeleteRequest {
  /** The absolute path of the notebook or directory. */
  path?: string | undefined;
  /**
   * The flag that specifies whether to delete the object recursively. It is `false` by default.
   * Please note this deleting directory is not atomic. If it fails in the middle, some of objects
   * under this directory may be deleted and cannot be undone.
   */
  recursive?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteRequest_Response {}

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
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ExportRequest_Response {
  /**
   * The base64-encoded content.
   * If the limit (10MB) is exceeded, exception with error code **MAX_NOTEBOOK_SIZE_EXCEEDED** is thrown.
   */
  content?: Uint8Array | undefined;
  /** The file type of the exported file. */
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
  /** The language of the object. This value is set only if the object type is `NOTEBOOK`. */
  language?: Language | undefined;
  /**
   * The base64-encoded content. This has a limit of 10 MB.
   *
   * If the limit (10MB) is exceeded, exception with error code **MAX_NOTEBOOK_SIZE_EXCEEDED** is thrown.
   * This parameter might be absent, and instead a posted file is used.
   */
  content?: Uint8Array | undefined;
  /**
   * The flag that specifies whether to overwrite existing object. It is `false` by default.
   * For `DBC` format, `overwrite` is not supported since it may contain a directory.
   */
  overwrite?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface ImportRequest_Response {}

export interface ListRequest {
  /** The absolute path of the notebook or directory. */
  path?: string | undefined;
  /** UTC timestamp in milliseconds */
  notebooksModifiedAfter?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListRequest_Response {
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

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface MkdirsRequest_Response {}

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
  /** Only applicable to files. The creation UTC timestamp. */
  createdAt?: number | undefined;
  /** Only applicable to files, the last modified UTC timestamp. */
  modifiedAt?: number | undefined;
  /** Unique identifier for the object. */
  objectId?: number | undefined;
  /** Only applicable to files. The file size in bytes can be returned. */
  size?: number | undefined;
  /** A unique identifier for the object that is consistent across all Databricks APIs. */
  resourceId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteRequest_ResponseSchema: z.ZodType<DeleteRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalExportRequest_ResponseSchema: z.ZodType<ExportRequest_Response> =
  z
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalImportRequest_ResponseSchema: z.ZodType<ImportRequest_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListRequest_ResponseSchema: z.ZodType<ListRequest_Response> =
  z
    .object({
      objects: z.array(z.lazy(() => unmarshalObjectInfoSchema)).optional(),
    })
    .transform(d => ({
      objects: d.objects,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalMkdirsRequest_ResponseSchema: z.ZodType<MkdirsRequest_Response> =
  z.object({});

export const unmarshalObjectInfoSchema: z.ZodType<ObjectInfo> = z
  .object({
    object_type: z.enum(ObjectType).optional(),
    path: z.string().optional(),
    language: z.enum(Language).optional(),
    created_at: z.number().optional(),
    modified_at: z.number().optional(),
    object_id: z.number().optional(),
    size: z.number().optional(),
    resource_id: z.string().optional(),
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

export const marshalImportRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    format: z.enum(ExportFormat).optional(),
    language: z.enum(Language).optional(),
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

export const marshalMkdirsRequestSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));
