// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {JsonValue, JsonObject} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

const jsonValueSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([z.null(), z.number(), z.string(), z.boolean(), z.record(z.string(), jsonValueSchema), z.array(jsonValueSchema)])
);
const jsonObjectSchema: z.ZodType<JsonObject> = z.record(z.string(), jsonValueSchema);


export enum CommandStatus {
  COMMAND_STATUS_UNSPECIFIED = 'COMMAND_STATUS_UNSPECIFIED',
  COMMAND_CANCELLED = 'COMMAND_CANCELLED',
  COMMAND_CANCELLING = 'COMMAND_CANCELLING',
  COMMAND_ERROR = 'COMMAND_ERROR',
  COMMAND_FINISHED = 'COMMAND_FINISHED',
  COMMAND_QUEUED = 'COMMAND_QUEUED',
  COMMAND_RUNNING = 'COMMAND_RUNNING',
}

export enum ContextStatus {
  CONTEXT_STATUS_UNSPECIFIED = 'CONTEXT_STATUS_UNSPECIFIED',
  CONTEXT_RUNNING = 'CONTEXT_RUNNING',
  CONTEXT_PENDING = 'CONTEXT_PENDING',
  CONTEXT_ERROR = 'CONTEXT_ERROR',
}

export enum Language {
  LANGUAGE_UNSPECIFIED = 'LANGUAGE_UNSPECIFIED',
  PYTHON = 'PYTHON',
  SCALA = 'SCALA',
  SQL = 'SQL',
  R = 'R',
}

export enum ResultType {
  RESULT_TYPE_UNSPECIFIED = 'RESULT_TYPE_UNSPECIFIED',
  ERROR_RESULT = 'ERROR_RESULT',
  IMAGE_RESULT = 'IMAGE_RESULT',
  IMAGES_RESULT = 'IMAGES_RESULT',
  TABLE_RESULT = 'TABLE_RESULT',
  TEXT_RESULT = 'TEXT_RESULT',
}

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
  clusterId?: string | undefined;
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
  clusterId?: string | undefined;
  contextId?: string | undefined;
  commandId?: string | undefined;
}

export interface GetCommandStatusResponse {
  id?: string | undefined;
  status?: CommandStatus | undefined;
  results?: Results | undefined;
}

/** Request to retrieve the status of an execution context. */
export interface GetContextStatusRequest {
  clusterId?: string | undefined;
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

export const unmarshalCancelResponseSchema: z.ZodType<CancelResponse> = z
  .object({
  });

export const unmarshalCreateResponseSchema: z.ZodType<CreateResponse> = z
  .object({
    id: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
  }));

export const unmarshalDestroyResponseSchema: z.ZodType<DestroyResponse> = z
  .object({
  });

export const unmarshalGetCommandStatusResponseSchema: z.ZodType<GetCommandStatusResponse> = z
  .object({
    id: z.string().optional(),
    status: z.enum(CommandStatus).optional(),
    results: z.lazy(() => unmarshalResultsSchema).optional(),
  })
  .transform(d => ({
    id: d.id,
    status: d.status,
    results: d.results,
  }));

export const unmarshalGetContextStatusResponseSchema: z.ZodType<GetContextStatusResponse> = z
  .object({
    id: z.string().optional(),
    status: z.enum(ContextStatus).optional(),
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
    resultType: z.enum(ResultType).optional(),
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
    language: z.enum(Language).optional(),
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
    language: z.enum(Language).optional(),
    command: z.string().optional(),
  })
  .transform(d => ({
    clusterId: d.clusterId,
    contextId: d.contextId,
    language: d.language,
    command: d.command,
  }));
