// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {JsonValue, JsonObject} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.null(),
    z.number(),
    z.string(),
    z.boolean(),
    z.record(z.string(), jsonValueSchema),
    z.array(jsonValueSchema),
  ])
);
const jsonObjectSchema: z.ZodType<JsonObject> = z.record(
  z.string(),
  jsonValueSchema
);

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const CommandStatus = {
  COMMAND_STATUS_UNSPECIFIED: 'COMMAND_STATUS_UNSPECIFIED',
  COMMAND_CANCELLED: 'Cancelled',
  COMMAND_CANCELLING: 'Cancelling',
  COMMAND_ERROR: 'Error',
  COMMAND_FINISHED: 'Finished',
  COMMAND_QUEUED: 'Queued',
  COMMAND_RUNNING: 'Running',
} as const;
export type CommandStatus =
  | (typeof CommandStatus)[keyof typeof CommandStatus]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ContextStatus = {
  CONTEXT_STATUS_UNSPECIFIED: 'CONTEXT_STATUS_UNSPECIFIED',
  CONTEXT_RUNNING: 'Running',
  CONTEXT_PENDING: 'Pending',
  CONTEXT_ERROR: 'Error',
} as const;
export type ContextStatus =
  | (typeof ContextStatus)[keyof typeof ContextStatus]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Language = {
  LANGUAGE_UNSPECIFIED: 'LANGUAGE_UNSPECIFIED',
  PYTHON: 'python',
  SCALA: 'scala',
  SQL: 'sql',
  R: 'r',
} as const;
export type Language = (typeof Language)[keyof typeof Language] | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ResultType = {
  RESULT_TYPE_UNSPECIFIED: 'RESULT_TYPE_UNSPECIFIED',
  ERROR_RESULT: 'error',
  IMAGE_RESULT: 'image',
  IMAGES_RESULT: 'images',
  TABLE_RESULT: 'table',
  TEXT_RESULT: 'text',
} as const;
export type ResultType =
  | (typeof ResultType)[keyof typeof ResultType]
  | (string & {});

export interface CancelCommandRequest {
  /** ID of the cluster that hosts the execution context. */
  clusterId?: string | undefined;
  /** ID of the command to cancel, as returned by __execute__. */
  commandId?: string | undefined;
  /** ID of the execution context the command runs in. */
  contextId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CancelResponse {}

export interface CreateContextRequest {
  /** ID of the cluster to create the execution context on. The cluster must be running. */
  clusterId?: string | undefined;
  /** Programming language of the execution context. */
  language?: Language | undefined;
}

export interface CreateResponse {
  /**
   * ID of the new execution context when returned by __Create__, or of the submitted command when
   * returned by __execute__. Pass it to the other methods of this API as `contextId` or `commandId`.
   */
  id?: string | undefined;
}

export interface DestroyContextRequest {
  /** ID of the cluster that hosts the execution context. */
  clusterId?: string | undefined;
  /** ID of the execution context to delete, as returned by __Create__. */
  contextId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DestroyResponse {}

export interface ExecuteCommandRequest {
  /** ID of the cluster that hosts the execution context. */
  clusterId?: string | undefined;
  /** ID of the execution context to run the command in, as returned by __Create__. */
  contextId?: string | undefined;
  /** Language the command is written in. */
  language?: Language | undefined;
  /** Code to run, written in the specified language. */
  command?: string | undefined;
}

/** Request to get the status of a previously submitted command. */
export interface GetCommandStatusRequest {
  /** ID of the cluster that hosts the execution context. */
  clusterId?: string | undefined;
  /** ID of the execution context the command runs in. */
  contextId?: string | undefined;
  /** ID of the command, as returned by __execute__. */
  commandId?: string | undefined;
}

export interface GetCommandStatusResponse {
  /** ID of the command. */
  id?: string | undefined;
  /**
   * Current status of the command. `Queued` and `Running` mean the command has not completed yet, and
   * `Cancelling` means a cancellation is in progress. `Finished`, `Error` and `Cancelled` are terminal:
   * `Finished` means the command ran to completion, including when the code itself raised an error
   * (reported in `results` with the `error` result type), while `Error` means the execution environment
   * failed, for example because the driver or the context stopped.
   */
  status?: CommandStatus | undefined;
  /**
   * Output of the command. It is populated only once the command has reached a terminal status, and its
   * `resultType` tells which of its other fields are set.
   */
  results?: Results | undefined;
}

/** Request to retrieve the status of an execution context. */
export interface GetContextStatusRequest {
  /** ID of the cluster that hosts the execution context. */
  clusterId?: string | undefined;
  /** ID of the execution context, as returned by __Create__. */
  contextId?: string | undefined;
}

export interface GetContextStatusResponse {
  /** ID of the execution context. */
  id?: string | undefined;
  /**
   * Current status of the execution context. `Pending` means the context is still initializing and does
   * not accept commands yet, `Running` means it is ready, and `Error` means it failed: running commands
   * may not complete and new commands may be rejected, so create a new context.
   */
  status?: ContextStatus | undefined;
}

export interface Results {
  /** Details of an `error` result, usually the exception message or stack trace. */
  cause?: string | undefined;
  /**
   * Output of a `text` result as a string, or the rows of a `table` result as an array of rows, each an
   * array of column values in the order of `schema`.
   */
  data?: JsonValue | undefined;
  /**
   * The image data in one of the following formats:
   *
   * 1. A Data URL with base64-encoded image data: `data:image/{type};base64,{base64-data}`.
   * Example: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...`
   *
   * 2. A FileStore file path for large images: `/plots/{filename}.png`.
   * Example: `/plots/b6a7ad70-fb2c-4353-8aed-3f1e015174a4.png`
   */
  fileName?: string | undefined;
  /** List of image data for multiple images. Each element follows the same format as file_name. */
  fileNames?: string[] | undefined;
  /** true if a JSON schema is returned instead of a string representation of the Hive type. */
  isJsonSchema?: boolean | undefined;
  /** internal field used by SDK */
  pos?: number | undefined;
  /**
   * Type of the result, which determines which other fields are set: `text` puts the output in `data`,
   * `table` fills `data`, `schema`, `truncated` and `isJsonSchema`, `image` and `images` fill `fileName`
   * and `fileNames` respectively, and `error` fills `cause` and `summary`.
   */
  resultType?: ResultType | undefined;
  /**
   * Columns of a `table` result, in the order of the values within each row of `data`. Each entry has a
   * `name`, a `type` and a `metadata` key.
   */
  schema?: JsonObject[] | undefined;
  /** Short description of an `error` result, such as the exception type and message, when available. */
  summary?: string | undefined;
  /** Whether a `table` result was cut off because the command output exceeded the row or byte limit. */
  truncated?: boolean | undefined;
}

export const unmarshalCancelResponseSchema: z.ZodType<CancelResponse> =
  z.object({});

export const unmarshalCreateResponseSchema: z.ZodType<CreateResponse> = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const unmarshalDestroyResponseSchema: z.ZodType<DestroyResponse> =
  z.object({});

export const unmarshalGetCommandStatusResponseSchema: z.ZodType<GetCommandStatusResponse> =
  z
    .object({
      id: z.string().optional(),
      status: z.string().optional(),
      results: z
        .lazy(() => unmarshalResultsSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      id: d.id,
      status: d.status,
      results: d.results,
    }));

export const unmarshalGetContextStatusResponseSchema: z.ZodType<GetContextStatusResponse> =
  z
    .object({
      id: z.string().optional(),
      status: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
      status: d.status,
    }));

export const unmarshalResultsSchema: z.ZodType<Results> = z
  .object({
    cause: z.string().optional(),
    data: jsonValueSchema.optional(),
    fileName: z.string().optional(),
    fileNames: z.array(z.string()).optional(),
    isJsonSchema: z.boolean().optional(),
    pos: z.number().optional(),
    resultType: z.string().optional(),
    schema: z.array(jsonObjectSchema).optional(),
    summary: z.string().optional(),
    truncated: z.boolean().optional(),
  })
  .transform(d => ({
    cause: d.cause,
    data: d.data,
    fileName: d.fileName,
    fileNames: d.fileNames,
    isJsonSchema: d.isJsonSchema,
    pos: d.pos,
    resultType: d.resultType,
    schema: d.schema,
    summary: d.summary,
    truncated: d.truncated,
  }));

export const marshalCancelCommandRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    commandId: z.string().optional(),
    contextId: z.string().optional(),
  })
  .transform(d => ({
    clusterId: d.clusterId,
    commandId: d.commandId,
    contextId: d.contextId,
  }));

export const marshalCreateContextRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    language: z.string().optional(),
  })
  .transform(d => ({
    clusterId: d.clusterId,
    language: d.language,
  }));

export const marshalDestroyContextRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    contextId: z.string().optional(),
  })
  .transform(d => ({
    clusterId: d.clusterId,
    contextId: d.contextId,
  }));

export const marshalExecuteCommandRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    contextId: z.string().optional(),
    language: z.string().optional(),
    command: z.string().optional(),
  })
  .transform(d => ({
    clusterId: d.clusterId,
    contextId: d.contextId,
    language: d.language,
    command: d.command,
  }));
