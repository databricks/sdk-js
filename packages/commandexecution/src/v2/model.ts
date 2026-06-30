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
  clusterId?: string | undefined;
  commandId?: string | undefined;
  contextId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CancelResponse {}

export interface CreateContextRequest {
  /** Running cluster id */
  clusterId?: string | undefined;
  language?: Language | undefined;
}

export interface CreateResponse {
  id?: string | undefined;
}

export interface DestroyContextRequest {
  /** Required. This field must be set in requests. */
  clusterId?: string | undefined;
  /** Required. This field must be set in requests. */
  contextId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DestroyResponse {}

export interface ExecuteCommandRequest {
  /** Running cluster id */
  clusterId?: string | undefined;
  /** Running context id */
  contextId?: string | undefined;
  language?: Language | undefined;
  /** Executable code */
  command?: string | undefined;
}

/** Request to get the status of a previously submitted command. */
export interface GetCommandStatusRequest {
  /** Required. This field must be set in requests. */
  clusterId?: string | undefined;
  /** Required. This field must be set in requests. */
  contextId?: string | undefined;
  /** Required. This field must be set in requests. */
  commandId?: string | undefined;
}

export interface GetCommandStatusResponse {
  id?: string | undefined;
  status?: CommandStatus | undefined;
  results?: Results | undefined;
}

/** Request to retrieve the status of an execution context. */
export interface GetContextStatusRequest {
  /** Required. This field must be set in requests. */
  clusterId?: string | undefined;
  /** Required. This field must be set in requests. */
  contextId?: string | undefined;
}

export interface GetContextStatusResponse {
  id?: string | undefined;
  status?: ContextStatus | undefined;
}

export interface Results {
  /** The cause of the error */
  cause?: string | undefined;
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
  resultType?: ResultType | undefined;
  /** The table schema */
  schema?: JsonObject[] | undefined;
  /** The summary of the error */
  summary?: string | undefined;
  /** true if partial results are returned. */
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
      results: z.lazy(() => unmarshalResultsSchema).optional(),
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
