// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';


// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum KnowledgeAssistant_State {
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  CREATING = 'CREATING',
  ACTIVE = 'ACTIVE',
  FAILED = 'FAILED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum KnowledgeSource_State {
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  UPDATING = 'UPDATING',
  UPDATED = 'UPDATED',
  FAILED_UPDATE = 'FAILED_UPDATE',
}

/** Create an example. */
export interface CreateExampleRequest {
  /**
   * Parent resource where this example will be created.
   * Format: knowledge-assistants/{knowledge_assistant_id}
   */
  parent?: string | undefined;
  /** The example to create under the parent Knowledge Assistant. */
  example?: Example | undefined;
}

export interface CreateKnowledgeAssistantRequest {
  /** The Knowledge Assistant to create. */
  knowledgeAssistant?: KnowledgeAssistant | undefined;
}

export interface CreateKnowledgeSourceRequest {
  /**
   * Parent resource where this source will be created.
   * Format: knowledge-assistants/{knowledge_assistant_id}
   */
  parent?: string | undefined;
  knowledgeSource?: KnowledgeSource | undefined;
}

/** Delete an example. */
export interface DeleteExampleRequest {
  /**
   * The resource name of the example to delete.
   * Format: knowledge-assistants/{knowledge_assistant_id}/examples/{example_id}
   */
  name?: string | undefined;
}

/** A request to delete a Knowledge Assistant. */
export interface DeleteKnowledgeAssistantRequest {
  /**
   * The resource name of the knowledge assistant to be deleted.
   * Format: knowledge-assistants/{knowledge_assistant_id}
   */
  name?: string | undefined;
}

export interface DeleteKnowledgeSourceRequest {
  /**
   * The resource name of the Knowledge Source to delete.
   * Format: knowledge-assistants/{knowledge_assistant_id}/knowledge-sources/{knowledge_source_id}
   */
  name?: string | undefined;
}

/**
 * An example associated with a Knowledge Assistant.
 * Contains a question and guidelines for how the assistant should respond.
 */
export interface Example {
  /**
   * Full resource name:
   * knowledge-assistants/{knowledge_assistant_id}/examples/{example_id}
   */
  name?: string | undefined;
  /** The example question. */
  question?: string | undefined;
  /**
   * Guidelines for answering the question. Optional — examples may be created
   * with just a question; the front-end form does not require guidelines.
   */
  guidelines?: string[] | undefined;
  /** The universally unique identifier (UUID) of the example. */
  exampleId?: string | undefined;
  /** Timestamp when this example was created. */
  createTime?: Temporal.Instant | undefined;
  /** Timestamp when this example was last updated. */
  updateTime?: Temporal.Instant | undefined;
}

/** FileTableSpec specifies a file table source configuration. */
export interface FileTableSpec {
  /** Full UC name of the table, in the format of {CATALOG}.{SCHEMA}.{TABLE_NAME}. */
  tableName?: string | undefined;
  /** The name of the column containing BINARY file content to be indexed. */
  fileCol?: string | undefined;
}

/** FilesSpec specifies a files source configuration. */
export interface FilesSpec {
  /** A UC volume path that includes a list of files. */
  path?: string | undefined;
}

/** Get an example. */
export interface GetExampleRequest {
  /**
   * The resource name of the example.
   * Format: knowledge-assistants/{knowledge_assistant_id}/examples/{example_id}
   */
  name?: string | undefined;
}

/** A request to retrieve a Knowledge Assistant. */
export interface GetKnowledgeAssistantRequest {
  /**
   * The resource name of the knowledge assistant.
   * Format: knowledge-assistants/{knowledge_assistant_id}
   */
  name?: string | undefined;
}

export interface GetKnowledgeSourceRequest {
  /**
   * The resource name of the Knowledge Source.
   * Format: knowledge-assistants/{knowledge_assistant_id}/knowledge-sources/{knowledge_source_id}
   */
  name?: string | undefined;
}

/** IndexSpec specifies a vector search index source configuration. */
export interface IndexSpec {
  /** Full UC name of the vector search index, in the format of {CATALOG}.{SCHEMA}.{INDEX_NAME}. */
  indexName?: string | undefined;
  /** The column that includes the document text for retrieval. */
  textCol?: string | undefined;
  /** The column that specifies a link or reference to where the information came from. */
  docUriCol?: string | undefined;
}

/**
 * Entity message that represents a knowledge assistant.
 * Note: REQUIRED annotations below represent create-time requirements.
 * For updates, required fields are determined by the update mask.
 */
export interface KnowledgeAssistant {
  /**
   * The resource name of the Knowledge Assistant.
   * Format: knowledge-assistants/{knowledge_assistant_id}
   */
  name?: string | undefined;
  /** State of the Knowledge Assistant. Not returned in List responses. */
  state?: KnowledgeAssistant_State | undefined;
  /** Deprecated: use knowledge_assistant_id instead. */
  id?: string | undefined;
  /**
   * The display name of the Knowledge Assistant, unique at workspace level.
   * Required when creating a Knowledge Assistant.
   * When updating a Knowledge Assistant, optional unless included in
   * update_mask.
   */
  displayName?: string | undefined;
  /**
   * Description of what this agent can do (user-facing).
   * Required when creating a Knowledge Assistant.
   * When updating a Knowledge Assistant, optional unless included in
   * update_mask.
   */
  description?: string | undefined;
  /**
   * Additional global instructions on how the agent should generate answers.
   * Optional on create and update.
   * When updating a Knowledge Assistant, include this field in update_mask to
   * modify it.
   */
  instructions?: string | undefined;
  /** The creator of the Knowledge Assistant. */
  creator?: string | undefined;
  /** Creation timestamp. */
  createTime?: Temporal.Instant | undefined;
  /** The name of the knowledge assistant agent endpoint. */
  endpointName?: string | undefined;
  /** The MLflow experiment ID. */
  experimentId?: string | undefined;
  /** Error details when the Knowledge Assistant is in FAILED state. */
  errorInfo?: string | undefined;
}

/**
 * KnowledgeSource represents a source of knowledge for the KnowledgeAssistant.
 * Used in create/update requests and returned in Get/List responses.
 * Note: REQUIRED annotations below represent create-time requirements.
 * For updates, required fields are determined by the update mask.
 */
export interface KnowledgeSource {
  /**
   * Full resource name:
   * knowledge-assistants/{knowledge_assistant_id}/knowledge-sources/{knowledge_source_id}
   */
  name?: string | undefined;
  /**
   * Human-readable display name of the knowledge source.
   * Required when creating a Knowledge Source.
   * When updating a Knowledge Source, optional unless included in update_mask.
   */
  displayName?: string | undefined;
  /**
   * Description of the knowledge source.
   * Required when creating a Knowledge Source.
   * When updating a Knowledge Source, optional unless included in update_mask.
   */
  description?: string | undefined;
  /**
   * The type of the source: "index", "files", or "file_table".
   * Required when creating a Knowledge Source.
   * When updating a Knowledge Source, this field is ignored.
   */
  sourceType?: string | undefined;
  /** Specification for the knowledge source type. */
  spec?:
    | { $case: 'index'; index: IndexSpec }
    | { $case: 'files'; files: FilesSpec }
    | { $case: 'fileTable'; fileTable: FileTableSpec }
    | undefined;
  state?: KnowledgeSource_State | undefined;
  id?: string | undefined;
  /** Timestamp representing the cutoff before which content in this knowledge source is being ingested. */
  knowledgeCutoffTime?: Temporal.Instant | undefined;
  /** Timestamp when this knowledge source was created. */
  createTime?: Temporal.Instant | undefined;
}

/** List examples. */
export interface ListExamplesRequest {
  /**
   * Parent resource to list from.
   * Format: knowledge-assistants/{knowledge_assistant_id}
   */
  parent?: string | undefined;
  /**
   * The maximum number of examples to return.
   * If unspecified, at most 100 examples will be returned.
   * The maximum value is 100; values above 100 will be coerced to 100.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListExamples` call.
   * Provide this to retrieve the subsequent page.
   * If unspecified, the first page will be returned.
   */
  pageToken?: string | undefined;
}

/** A list of Knowledge Assistant examples. */
export interface ListExamplesResponse {
  examples?: Example[] | undefined;
  nextPageToken?: string | undefined;
}

/** A request to list Knowledge Assistants. */
export interface ListKnowledgeAssistantsRequest {
  /**
   * The maximum number of knowledge assistants to return.
   * If unspecified, at most 100 knowledge assistants will be returned.
   * The maximum value is 100; values above 100 will be coerced to 100.
   */
  pageSize?: number | undefined;
  /**
   * A page token, received from a previous `ListKnowledgeAssistants` call.
   * Provide this to retrieve the subsequent page.
   * If unspecified, the first page will be returned.
   */
  pageToken?: string | undefined;
}

/** A list of Knowledge Assistants. */
export interface ListKnowledgeAssistantsResponse {
  knowledgeAssistants?: KnowledgeAssistant[] | undefined;
  /**
   * A token that can be sent as `page_token` to retrieve the next page.
   * If this field is omitted, there are no subsequent pages.
   */
  nextPageToken?: string | undefined;
}

export interface ListKnowledgeSourcesRequest {
  /**
   * Parent resource to list from.
   * Format: knowledge-assistants/{knowledge_assistant_id}
   */
  parent?: string | undefined;
  pageSize?: number | undefined;
  pageToken?: string | undefined;
}

export interface ListKnowledgeSourcesResponse {
  knowledgeSources?: KnowledgeSource[] | undefined;
  nextPageToken?: string | undefined;
}

export interface SyncKnowledgeSourcesRequest {
  /**
   * The resource name of the Knowledge Assistant.
   * Format: knowledge-assistants/{knowledge_assistant_id}
   */
  name?: string | undefined;
}

/** Update an example. */
export interface UpdateExampleRequest {
  /**
   * The resource name of the example to update.
   * Format: knowledge-assistants/{knowledge_assistant_id}/examples/{example_id}
   */
  name?: string | undefined;
  example?: Example | undefined;
  /**
   * Comma-delimited list of fields to update on the example.
   * Allowed values: `question`, `guidelines`.
   * Examples:
   * - `question`
   * - `question,guidelines`
   */
  updateMask?: FieldMask<Example> | undefined;
}

export interface UpdateKnowledgeAssistantRequest {
  /**
   * The Knowledge Assistant update payload.
   * Only fields listed in update_mask are updated.
   * REQUIRED annotations on Knowledge Assistant fields describe create-time
   * requirements and do not mean all those fields are required for update.
   */
  knowledgeAssistant?: KnowledgeAssistant | undefined;
  /**
   * Comma-delimited list of fields to update on the Knowledge Assistant.
   * Allowed values: `display_name`, `description`, `instructions`.
   * Examples:
   * - `display_name`
   * - `description,instructions`
   */
  updateMask?: FieldMask<KnowledgeAssistant> | undefined;
}

export interface UpdateKnowledgeSourceRequest {
  /**
   * The resource name of the Knowledge Source to update.
   * Format: knowledge-assistants/{knowledge_assistant_id}/knowledge-sources/{knowledge_source_id}
   */
  name?: string | undefined;
  /**
   * The Knowledge Source update payload.
   * Only fields listed in update_mask are updated.
   * REQUIRED annotations on Knowledge Source fields describe create-time
   * requirements and do not mean all those fields are required for update.
   */
  knowledgeSource?: KnowledgeSource | undefined;
  /**
   * Comma-delimited list of fields to update on the Knowledge Source.
   * Allowed values: `display_name`, `description`.
   * Examples:
   * - `display_name`
   * - `display_name,description`
   */
  updateMask?: FieldMask<KnowledgeSource> | undefined;
}

export const unmarshalExampleSchema: z.ZodType<Example> = z
  .object({
    name: z.string().optional(),
    question: z.string().optional(),
    guidelines: z.array(z.string()).optional(),
    example_id: z.string().optional(),
    create_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
    update_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
  })
  .transform(d => ({
    name: d.name,
    question: d.question,
    guidelines: d.guidelines,
    exampleId: d.example_id,
    createTime: d.create_time,
    updateTime: d.update_time,
  }));

export const unmarshalFileTableSpecSchema: z.ZodType<FileTableSpec> = z
  .object({
    table_name: z.string().optional(),
    file_col: z.string().optional(),
  })
  .transform(d => ({
    tableName: d.table_name,
    fileCol: d.file_col,
  }));

export const unmarshalFilesSpecSchema: z.ZodType<FilesSpec> = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

export const unmarshalIndexSpecSchema: z.ZodType<IndexSpec> = z
  .object({
    index_name: z.string().optional(),
    text_col: z.string().optional(),
    doc_uri_col: z.string().optional(),
  })
  .transform(d => ({
    indexName: d.index_name,
    textCol: d.text_col,
    docUriCol: d.doc_uri_col,
  }));

export const unmarshalKnowledgeAssistantSchema: z.ZodType<KnowledgeAssistant> = z
  .object({
    name: z.string().optional(),
    state: z.enum(KnowledgeAssistant_State).optional(),
    id: z.string().optional(),
    display_name: z.string().optional(),
    description: z.string().optional(),
    instructions: z.string().optional(),
    creator: z.string().optional(),
    create_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
    endpoint_name: z.string().optional(),
    experiment_id: z.string().optional(),
    error_info: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    state: d.state,
    id: d.id,
    displayName: d.display_name,
    description: d.description,
    instructions: d.instructions,
    creator: d.creator,
    createTime: d.create_time,
    endpointName: d.endpoint_name,
    experimentId: d.experiment_id,
    errorInfo: d.error_info,
  }));

export const unmarshalKnowledgeSourceSchema: z.ZodType<KnowledgeSource> = z
  .object({
    name: z.string().optional(),
    display_name: z.string().optional(),
    description: z.string().optional(),
    source_type: z.string().optional(),
    index: z.lazy(() => unmarshalIndexSpecSchema).optional(),
    files: z.lazy(() => unmarshalFilesSpecSchema).optional(),
    file_table: z.lazy(() => unmarshalFileTableSpecSchema).optional(),
    state: z.enum(KnowledgeSource_State).optional(),
    id: z.string().optional(),
    knowledge_cutoff_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
    create_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
  })
  .transform(d => ({
    name: d.name,
    displayName: d.display_name,
    description: d.description,
    sourceType: d.source_type,
    spec: d.index !== undefined ? { $case: 'index' as const, index: d.index } : d.files !== undefined ? { $case: 'files' as const, files: d.files } : d.file_table !== undefined ? { $case: 'fileTable' as const, fileTable: d.file_table } : undefined,
    state: d.state,
    id: d.id,
    knowledgeCutoffTime: d.knowledge_cutoff_time,
    createTime: d.create_time,
  }));

export const unmarshalListExamplesResponseSchema: z.ZodType<ListExamplesResponse> = z
  .object({
    examples: z.array(z.lazy(() => unmarshalExampleSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    examples: d.examples,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListKnowledgeAssistantsResponseSchema: z.ZodType<ListKnowledgeAssistantsResponse> = z
  .object({
    knowledge_assistants: z.array(z.lazy(() => unmarshalKnowledgeAssistantSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    knowledgeAssistants: d.knowledge_assistants,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalListKnowledgeSourcesResponseSchema: z.ZodType<ListKnowledgeSourcesResponse> = z
  .object({
    knowledge_sources: z.array(z.lazy(() => unmarshalKnowledgeSourceSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    knowledgeSources: d.knowledge_sources,
    nextPageToken: d.next_page_token,
  }));

export const marshalExampleSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    question: z.string().optional(),
    guidelines: z.array(z.string()).optional(),
    exampleId: z.string().optional(),
    createTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    updateTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
  })
  .transform(d => ({
    name: d.name,
    question: d.question,
    guidelines: d.guidelines,
    example_id: d.exampleId,
    create_time: d.createTime,
    update_time: d.updateTime,
  }));

export const marshalFileTableSpecSchema: z.ZodType = z
  .object({
    tableName: z.string().optional(),
    fileCol: z.string().optional(),
  })
  .transform(d => ({
    table_name: d.tableName,
    file_col: d.fileCol,
  }));

export const marshalFilesSpecSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
  }));

export const marshalIndexSpecSchema: z.ZodType = z
  .object({
    indexName: z.string().optional(),
    textCol: z.string().optional(),
    docUriCol: z.string().optional(),
  })
  .transform(d => ({
    index_name: d.indexName,
    text_col: d.textCol,
    doc_uri_col: d.docUriCol,
  }));

export const marshalKnowledgeAssistantSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    state: z.enum(KnowledgeAssistant_State).optional(),
    id: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    instructions: z.string().optional(),
    creator: z.string().optional(),
    createTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    endpointName: z.string().optional(),
    experimentId: z.string().optional(),
    errorInfo: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    state: d.state,
    id: d.id,
    display_name: d.displayName,
    description: d.description,
    instructions: d.instructions,
    creator: d.creator,
    create_time: d.createTime,
    endpoint_name: d.endpointName,
    experiment_id: d.experimentId,
    error_info: d.errorInfo,
  }));

export const marshalKnowledgeSourceSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    sourceType: z.string().optional(),
    spec: z.discriminatedUnion('$case', [z.object({ $case: z.literal('index'), index: z.lazy(() => marshalIndexSpecSchema) }), z.object({ $case: z.literal('files'), files: z.lazy(() => marshalFilesSpecSchema) }), z.object({ $case: z.literal('fileTable'), fileTable: z.lazy(() => marshalFileTableSpecSchema) })]).optional(),
    state: z.enum(KnowledgeSource_State).optional(),
    id: z.string().optional(),
    knowledgeCutoffTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    createTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
  })
  .transform(d => ({
    name: d.name,
    display_name: d.displayName,
    description: d.description,
    source_type: d.sourceType,
    ...(d.spec?.$case === 'index' && { index: d.spec.index }),
    ...(d.spec?.$case === 'files' && { files: d.spec.files }),
    ...(d.spec?.$case === 'fileTable' && { file_table: d.spec.fileTable }),
    state: d.state,
    id: d.id,
    knowledge_cutoff_time: d.knowledgeCutoffTime,
    create_time: d.createTime,
  }));

export const marshalSyncKnowledgeSourcesRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

const exampleFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  exampleId: {wire: 'example_id'},
  guidelines: {wire: 'guidelines'},
  name: {wire: 'name'},
  question: {wire: 'question'},
  updateTime: {wire: 'update_time'},
};

export function exampleFieldMask(...paths: string[]): FieldMask<Example> {
  return FieldMask.build<Example>(paths, exampleFieldMaskSchema);
}

const fileTableSpecFieldMaskSchema: FieldMaskSchema = {
  fileCol: {wire: 'file_col'},
  tableName: {wire: 'table_name'},
};

const filesSpecFieldMaskSchema: FieldMaskSchema = {
  path: {wire: 'path'},
};

const indexSpecFieldMaskSchema: FieldMaskSchema = {
  docUriCol: {wire: 'doc_uri_col'},
  indexName: {wire: 'index_name'},
  textCol: {wire: 'text_col'},
};

const knowledgeAssistantFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  creator: {wire: 'creator'},
  description: {wire: 'description'},
  displayName: {wire: 'display_name'},
  endpointName: {wire: 'endpoint_name'},
  errorInfo: {wire: 'error_info'},
  experimentId: {wire: 'experiment_id'},
  id: {wire: 'id'},
  instructions: {wire: 'instructions'},
  name: {wire: 'name'},
  state: {wire: 'state'},
};

export function knowledgeAssistantFieldMask(...paths: string[]): FieldMask<KnowledgeAssistant> {
  return FieldMask.build<KnowledgeAssistant>(paths, knowledgeAssistantFieldMaskSchema);
}

const knowledgeSourceFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  description: {wire: 'description'},
  displayName: {wire: 'display_name'},
  fileTable: {wire: 'file_table', children: () => fileTableSpecFieldMaskSchema},
  files: {wire: 'files', children: () => filesSpecFieldMaskSchema},
  id: {wire: 'id'},
  index: {wire: 'index', children: () => indexSpecFieldMaskSchema},
  knowledgeCutoffTime: {wire: 'knowledge_cutoff_time'},
  name: {wire: 'name'},
  sourceType: {wire: 'source_type'},
  state: {wire: 'state'},
};

export function knowledgeSourceFieldMask(...paths: string[]): FieldMask<KnowledgeSource> {
  return FieldMask.build<KnowledgeSource>(paths, knowledgeSourceFieldMaskSchema);
}
