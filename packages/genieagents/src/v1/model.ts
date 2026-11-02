// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** The format of a benchmark answer. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const GenieAgentBenchmarkAnswerFormat = {
  /** The format is not specified. */
  GENIE_AGENT_BENCHMARK_ANSWER_FORMAT_UNSPECIFIED:
    'GENIE_AGENT_BENCHMARK_ANSWER_FORMAT_UNSPECIFIED',
  /** The answer is a SQL query. */
  GENIE_AGENT_BENCHMARK_ANSWER_FORMAT_SQL:
    'GENIE_AGENT_BENCHMARK_ANSWER_FORMAT_SQL',
} as const;
export type GenieAgentBenchmarkAnswerFormat =
  | (typeof GenieAgentBenchmarkAnswerFormat)[keyof typeof GenieAgentBenchmarkAnswerFormat]
  | (string & {});

/** How the rows of the two sides of a join relate. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const GenieAgentJoinRelationshipType = {
  /** The relationship is not specified. */
  GENIE_AGENT_JOIN_RELATIONSHIP_TYPE_UNSPECIFIED:
    'GENIE_AGENT_JOIN_RELATIONSHIP_TYPE_UNSPECIFIED',
  /** Each row of `left` matches at most one row of `right`. */
  GENIE_AGENT_JOIN_RELATIONSHIP_TYPE_MANY_TO_ONE:
    'GENIE_AGENT_JOIN_RELATIONSHIP_TYPE_MANY_TO_ONE',
  /** Each row of `right` matches at most one row of `left`. */
  GENIE_AGENT_JOIN_RELATIONSHIP_TYPE_ONE_TO_MANY:
    'GENIE_AGENT_JOIN_RELATIONSHIP_TYPE_ONE_TO_MANY',
  /** Each row of either side matches at most one row of the other. */
  GENIE_AGENT_JOIN_RELATIONSHIP_TYPE_ONE_TO_ONE:
    'GENIE_AGENT_JOIN_RELATIONSHIP_TYPE_ONE_TO_ONE',
  /** Rows of either side may match many rows of the other. */
  GENIE_AGENT_JOIN_RELATIONSHIP_TYPE_MANY_TO_MANY:
    'GENIE_AGENT_JOIN_RELATIONSHIP_TYPE_MANY_TO_MANY',
} as const;
export type GenieAgentJoinRelationshipType =
  | (typeof GenieAgentJoinRelationshipType)[keyof typeof GenieAgentJoinRelationshipType]
  | (string & {});

/** The fields returned for each Genie Agent in a list response. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const GenieAgentView = {
  /** Unset. Treated as `GENIE_AGENT_VIEW_BASIC`. */
  GENIE_AGENT_VIEW_UNSPECIFIED: 'GENIE_AGENT_VIEW_UNSPECIFIED',
  /** `name`, `display_name`, `description`, `warehouse_id`, `create_time`, and `update_time`. */
  GENIE_AGENT_VIEW_BASIC: 'GENIE_AGENT_VIEW_BASIC',
  /**
   * The complete Genie Agent: the `GENIE_AGENT_VIEW_BASIC` fields plus `definition`,
   * `parent_path`, `effective_parent_path`, and `etag`.
   */
  GENIE_AGENT_VIEW_FULL: 'GENIE_AGENT_VIEW_FULL',
} as const;
export type GenieAgentView =
  | (typeof GenieAgentView)[keyof typeof GenieAgentView]
  | (string & {});

/** Request to create a Genie Agent. */
export interface CreateGenieAgentRequest {
  /** The Genie Agent to create. */
  genieAgent?: GenieAgent | undefined;
  /**
   * The ID for the new Genie Agent: 32 lowercase hexadecimal characters (a UUID without dashes), not
   * all zeros. Assigned by the server if omitted. Fails with ALREADY_EXISTS if the ID is in use in
   * the workspace, including by a Genie Agent in the trash, or PERMISSION_DENIED if the caller
   * cannot view the Genie Agent using it.
   */
  genieAgentId?: string | undefined;
}

/** Request to delete (move to trash) a Genie Agent by its resource name. */
export interface DeleteGenieAgentRequest {
  /** The resource name of the Genie Agent to delete, in the form `agents/{genie_agent_id}`. */
  name?: string | undefined;
  /** Etag from a previous read. On mismatch the delete fails with ABORTED and nothing is deleted. */
  etag?: string | undefined;
}

/** A Genie Agent resource. */
export interface GenieAgent {
  /** The resource name of the Genie Agent, in the form `agents/{genie_agent_id}`. Ignored on create. */
  name?: string | undefined;
  /**
   * Display name of the Genie Agent. Must be unique within its folder (effective_parent_path): a
   * create, rename, or move that would collide with an existing Genie Agent's name in the target
   * folder is rejected with ALREADY_EXISTS.
   *
   * The maximum length is 63 characters. Requests with a longer value are rejected with
   * INVALID_PARAMETER_VALUE.
   */
  displayName?: string | undefined;
  /**
   * Description of the Genie Agent.
   *
   * The maximum length is 4,096 characters. Requests with a longer value are rejected with
   * INVALID_PARAMETER_VALUE.
   */
  description?: string | undefined;
  /**
   * The definition of the Genie Agent: its sample questions, data sources, instructions, and
   * benchmarks. Must set at least one field. Returned on get and on list with
   * `GENIE_AGENT_VIEW_FULL`. Create and update return a submitted definition unchanged; one the
   * service would store differently, or with a column config the workspace can't keep (unknown
   * column, or a display name while those are disabled), is rejected with INVALID_PARAMETER_VALUE.
   */
  definition?: GenieAgentDefinition | undefined;
  /** Warehouse associated with the Genie Agent. */
  warehouseId?: string | undefined;
  /**
   * The workspace folder to create the Genie Agent in. If omitted, the caller's home folder is
   * used. Returned exactly as submitted; see `effective_parent_path` for the current folder. On
   * update, setting it moves the Genie Agent and clearing it does not. At most 4,096 characters.
   */
  parentPath?: string | undefined;
  /**
   * Weak etag of `definition` only; metadata changes do not affect it. Send it on update or
   * delete to detect concurrent definition changes.
   */
  etag?: string | undefined;
  /** Time when the Genie Agent was created. */
  createTime?: Temporal.Instant | undefined;
  /** Time when the Genie Agent was last modified. */
  updateTime?: Temporal.Instant | undefined;
  /** The workspace folder that contains the Genie Agent. */
  effectiveParentPath?: string | undefined;
}

/** The expected answer to a benchmark question. */
export interface GenieAgentBenchmarkAnswer {
  /** The format of the answer. */
  format?: GenieAgentBenchmarkAnswerFormat | undefined;
  /** The answer. */
  content?: string | undefined;
}

/** A benchmark question with its expected answer. */
export interface GenieAgentBenchmarkQuestion {
  /**
   * Identifier of the question: 32 lowercase hexadecimal characters, unique within the Genie
   * Agent.
   */
  id?: string | undefined;
  /** The question. */
  question?: string | undefined;
  /**
   * The expected answer. At most one answer is supported; omit it when the question has no
   * expected answer.
   */
  answer?: GenieAgentBenchmarkAnswer[] | undefined;
  /** Notes on how to evaluate answers to the question. */
  evaluationNote?: string | undefined;
}

/** Benchmarks for evaluating a Genie Agent. */
export interface GenieAgentBenchmarks {
  /** The benchmark questions, sorted by `id` in descending order. */
  questions?: GenieAgentBenchmarkQuestion[] | undefined;
}

/** Settings for one column of a table or metric view. */
export interface GenieAgentColumnConfig {
  /** The name of the column. Must exist in the table or metric view. */
  column?: string | undefined;
  /** Description of the column, overriding its Unity Catalog comment. */
  description?: string | undefined;
  /** Synonyms for the column name. */
  synonyms?: string[] | undefined;
  /** Whether the column is hidden from the Genie Agent. */
  exclude?: boolean | undefined;
  /** Whether the Genie Agent samples example values from the column to learn its format. */
  enableFormatAssistance?: boolean | undefined;
  /** Whether the Genie Agent indexes the column's values to match them in questions. */
  enableEntityMatching?: boolean | undefined;
  /**
   * Display name of the column in the Genie Agent. Accepted only where column display names are
   * enabled for the workspace.
   */
  displayName?: string | undefined;
}

/**
 * General settings of a Genie Agent. The warehouse, display name, and description are separate
 * fields of the Genie Agent.
 */
export interface GenieAgentConfig {
  /** Sample questions shown to users of the Genie Agent, sorted by `id`. */
  sampleQuestions?: GenieAgentSampleQuestion[] | undefined;
}

/** The data a Genie Agent can access. */
export interface GenieAgentDataSources {
  /** Unity Catalog tables, views, and metric views, in the order they were added. */
  tables?: GenieAgentTable[] | undefined;
  /** Unity Catalog volumes, in the order they were added. */
  volumes?: GenieAgentVolume[] | undefined;
  /** Unity Catalog MCP connections, sorted by `mcp_connection`. */
  mcpConnections?: GenieAgentMcpConnection[] | undefined;
}

/** The definition of a Genie Agent. */
export interface GenieAgentDefinition {
  /** General settings of the Genie Agent. */
  config?: GenieAgentConfig | undefined;
  /** The data the Genie Agent can access. */
  dataSources?: GenieAgentDataSources | undefined;
  /** Instructions and SQL that guide how the Genie Agent answers questions. */
  instructions?: GenieAgentInstructions | undefined;
  /** Benchmarks for evaluating the quality of the Genie Agent's answers. */
  benchmarks?: GenieAgentBenchmarks | undefined;
}

/** An example question paired with the SQL that answers it. */
export interface GenieAgentExampleQuestionSql {
  /** Identifier of the example: 32 lowercase hexadecimal characters, unique within the Genie Agent. */
  id?: string | undefined;
  /** The question. */
  question?: string | undefined;
  /** The SQL that answers the question. */
  sql?: string | undefined;
  /** Parameters used in the SQL, in the order given. */
  parameters?: GenieAgentSqlParameter[] | undefined;
  /** Guidance on when to use this example. */
  usageGuidance?: string | undefined;
}

/** Instructions and SQL that guide how a Genie Agent answers questions. */
export interface GenieAgentInstructions {
  /** General text instructions. At most one text instruction is supported. */
  textInstructions?: GenieAgentTextInstruction[] | undefined;
  /** Example questions paired with the SQL that answers them. */
  exampleQuestionSqls?: GenieAgentExampleQuestionSql[] | undefined;
  /** Unity Catalog SQL functions the generated SQL may call. */
  sqlFunctions?: GenieAgentSqlFunction[] | undefined;
  /** Predefined joins between tables or metric views. */
  joinSpecs?: GenieAgentJoinSpec[] | undefined;
  /** Reusable SQL filters, expressions, and measures. */
  sqlSnippets?: GenieAgentSqlSnippets | undefined;
}

/** One side of a join. */
export interface GenieAgentJoinSource {
  /** The full three-level name of the table or metric view. */
  identifier?: string | undefined;
  /** The alias the join condition uses for this side. */
  alias?: string | undefined;
}

/** A predefined join between two tables or metric views. */
export interface GenieAgentJoinSpec {
  /** Identifier of the join: 32 lowercase hexadecimal characters, unique within the Genie Agent. */
  id?: string | undefined;
  /** The left side of the join. */
  left?: GenieAgentJoinSource | undefined;
  /** The right side of the join. */
  right?: GenieAgentJoinSource | undefined;
  /** The join condition, for example `orders.customer_id = customers.id`. */
  sql?: string | undefined;
  /** How the rows of the two sides relate. */
  relationshipType?: GenieAgentJoinRelationshipType | undefined;
  /** Description of the join's purpose. */
  comment?: string | undefined;
  /** Guidance on when to use the join. */
  instruction?: string | undefined;
}

/** A Unity Catalog MCP connection the Genie Agent can use. */
export interface GenieAgentMcpConnection {
  /** The name of the Unity Catalog connection, for example `system.ai.google_calendar`. */
  mcpConnection?: string | undefined;
}

/** A sample question shown to users of the Genie Agent. */
export interface GenieAgentSampleQuestion {
  /**
   * Identifier of the sample question: 32 lowercase hexadecimal characters, unique within the
   * Genie Agent.
   */
  id?: string | undefined;
  /** The text of the question. */
  question?: string | undefined;
}

/** A reusable non-aggregated SQL expression (dimension). */
export interface GenieAgentSqlExpression {
  /**
   * Identifier of the expression: 32 lowercase hexadecimal characters, unique within the Genie
   * Agent.
   */
  id?: string | undefined;
  /** The alias the Genie Agent uses for the expression in generated SQL. */
  alias?: string | undefined;
  /** The SQL of the expression. */
  sql?: string | undefined;
  /** Display name of the expression. */
  displayName?: string | undefined;
  /** Guidance on when to use the expression. */
  instruction?: string | undefined;
  /** Synonyms for the expression. */
  synonyms?: string[] | undefined;
}

/** A reusable SQL filter. */
export interface GenieAgentSqlFilter {
  /** Identifier of the filter: 32 lowercase hexadecimal characters, unique within the Genie Agent. */
  id?: string | undefined;
  /** The SQL of the filter. */
  sql?: string | undefined;
  /** Display name of the filter. */
  displayName?: string | undefined;
  /** Guidance on when to use the filter. */
  instruction?: string | undefined;
  /** Synonyms for the filter. */
  synonyms?: string[] | undefined;
}

/** A Unity Catalog SQL function the generated SQL may call. */
export interface GenieAgentSqlFunction {
  /** Identifier of the entry: 32 lowercase hexadecimal characters, unique within the Genie Agent. */
  id?: string | undefined;
  /** The full three-level name of the function, for example `catalog.schema.function`. */
  identifier?: string | undefined;
}

/** A reusable aggregated SQL measure. */
export interface GenieAgentSqlMeasure {
  /** Identifier of the measure: 32 lowercase hexadecimal characters, unique within the Genie Agent. */
  id?: string | undefined;
  /** The alias the Genie Agent uses for the measure in generated SQL. */
  alias?: string | undefined;
  /** The SQL of the measure. */
  sql?: string | undefined;
  /** Display name of the measure. */
  displayName?: string | undefined;
  /** Guidance on when to use the measure. */
  instruction?: string | undefined;
  /** Synonyms for the measure. */
  synonyms?: string[] | undefined;
}

/** A parameter of a parameterized SQL example. */
export interface GenieAgentSqlParameter {
  /** The name of the parameter in the SQL. */
  name?: string | undefined;
  /** The parameter's data type, for example `STRING` or `INTEGER`. */
  typeHint?: string | undefined;
  /** Description of the parameter. */
  description?: string | undefined;
  /** The parameter's default value. */
  defaultValue?: GenieAgentSqlParameterDefaultValue | undefined;
}

/** A range of default values for a SQL parameter. */
export interface GenieAgentSqlParameterDefaultRange {
  /** The lower end of the range. */
  min?: string | undefined;
  /** The upper end of the range. */
  max?: string | undefined;
}

/** The default value of a SQL parameter: a list of values or a range. */
export interface GenieAgentSqlParameterDefaultValue {
  /** The default values. A single default is a one-element list. */
  values?: string[] | undefined;
  /** The default range. */
  valueRange?: GenieAgentSqlParameterDefaultRange | undefined;
}

/** Reusable SQL snippets. */
export interface GenieAgentSqlSnippets {
  /** Filters, such as `state = 'CA'`. */
  filters?: GenieAgentSqlFilter[] | undefined;
  /** Non-aggregated expressions (dimensions), such as `price * units`. */
  expressions?: GenieAgentSqlExpression[] | undefined;
  /** Aggregated measures, such as `SUM(price * units)`. */
  measures?: GenieAgentSqlMeasure[] | undefined;
}

/** A Unity Catalog table, view, or metric view the Genie Agent can access. */
export interface GenieAgentTable {
  /** The full three-level name, for example `catalog.schema.table`. */
  identifier?: string | undefined;
  /** Description of the table. */
  description?: string | undefined;
  /** Column settings for the table, sorted by `column`. */
  columnConfigs?: GenieAgentColumnConfig[] | undefined;
}

/** A general text instruction for the Genie Agent. */
export interface GenieAgentTextInstruction {
  /**
   * Identifier of the instruction: 32 lowercase hexadecimal characters, unique within the Genie
   * Agent.
   */
  id?: string | undefined;
  /** The text of the instruction. */
  content?: string | undefined;
}

/** A Unity Catalog volume the Genie Agent can access. */
export interface GenieAgentVolume {
  /**
   * The volume path, for example `/Volumes/catalog/schema/volume`. May name a directory or file
   * within the volume.
   */
  path?: string | undefined;
  /** Description of the volume. */
  description?: string | undefined;
}

/** Request to retrieve a single Genie Agent by its resource name. */
export interface GetGenieAgentRequest {
  /** The resource name of the Genie Agent to retrieve, in the form `agents/{genie_agent_id}`. */
  name?: string | undefined;
}

/** Request to list the Genie Agents in the workspace, one page at a time. */
export interface ListGenieAgentsRequest {
  /**
   * Maximum number of Genie Agents to return per page. Defaults to 20 when unset or 0; values above
   * 100 are coerced to 100. Negative values are rejected with INVALID_PARAMETER_VALUE. With
   * `GENIE_AGENT_VIEW_FULL`, a smaller per-page maximum applies.
   */
  pageSize?: number | undefined;
  /**
   * Pagination token from a previous response's `next_page_token`. A token that was not returned
   * by this method is rejected with INVALID_PARAMETER_VALUE.
   */
  pageToken?: string | undefined;
  /**
   * The fields to return for each Genie Agent. Defaults to `GENIE_AGENT_VIEW_BASIC`. Use
   * `GENIE_AGENT_VIEW_FULL` only when the agent bodies are needed, since it returns smaller pages.
   */
  view?: GenieAgentView | undefined;
}

/** Response for a list request: a page of Genie Agents plus the token for the next page. */
export interface ListGenieAgentsResponse {
  /** The Genie Agents, with the fields selected by the request's `view`. */
  genieAgents?: GenieAgent[] | undefined;
  /** Token to get the next page of results. */
  nextPageToken?: string | undefined;
  /**
   * Resource names, in the form `agents/{genie_agent_id}`, of Genie Agents in this page that could
   * not be read and are omitted from `genie_agents`. Populated only for `GENIE_AGENT_VIEW_FULL`. To
   * see why, get the Genie Agent by name; to retry, repeat the request. Other kinds of resource
   * names may be added to this field in the future.
   */
  unreachable?: string[] | undefined;
}

/** Request to update a Genie Agent, applying only the fields named in the update mask. */
export interface UpdateGenieAgentRequest {
  /**
   * The Genie Agent to update. Its `name` identifies the resource; fields named
   * in update_mask are applied.
   */
  genieAgent?: GenieAgent | undefined;
  /**
   * The set of fields to update. The mask is required and must name at least one
   * field; an empty or absent mask is rejected with INVALID_PARAMETER_VALUE, as is a path that is
   * not an updatable field.
   *
   * A field named in the mask takes the value from `genie_agent`, even when it is unset there:
   * an unset `description` is cleared; an unset `display_name`, `warehouse_id`, or
   * `definition` is rejected with INVALID_PARAMETER_VALUE; an unset `parent_path` is cleared
   * without moving the Genie Agent. `definition` is replaced as a whole; paths within it are
   * not supported.
   *
   * The special value `*` replaces the whole Genie Agent, as if every updatable field were named.
   * It must be the only path in the mask. Prefer naming fields explicitly: with `*`, any field
   * added to Genie Agent later is also replaced, so a client unaware of it may clear it.
   */
  updateMask?: FieldMask<GenieAgent> | undefined;
  /**
   * Etag from a previous read. On mismatch the update fails with ABORTED (metadata changes may
   * already be applied); get the agent and retry. May return TEMPORARILY_UNAVAILABLE.
   */
  etag?: string | undefined;
}

export const unmarshalGenieAgentSchema: z.ZodType<GenieAgent> = z
  .object({
    name: z.string().optional(),
    display_name: z.string().optional(),
    description: z.string().optional(),
    definition: z.lazy(() => unmarshalGenieAgentDefinitionSchema).optional(),
    warehouse_id: z.string().optional(),
    parent_path: z.string().optional(),
    etag: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    effective_parent_path: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    displayName: d.display_name,
    description: d.description,
    definition: d.definition,
    warehouseId: d.warehouse_id,
    parentPath: d.parent_path,
    etag: d.etag,
    createTime: d.create_time,
    updateTime: d.update_time,
    effectiveParentPath: d.effective_parent_path,
  }));

export const unmarshalGenieAgentBenchmarkAnswerSchema: z.ZodType<GenieAgentBenchmarkAnswer> =
  z
    .object({
      format: z.string().optional(),
      content: z.string().optional(),
    })
    .transform(d => ({
      format: d.format,
      content: d.content,
    }));

export const unmarshalGenieAgentBenchmarkQuestionSchema: z.ZodType<GenieAgentBenchmarkQuestion> =
  z
    .object({
      id: z.string().optional(),
      question: z.string().optional(),
      answer: z
        .array(z.lazy(() => unmarshalGenieAgentBenchmarkAnswerSchema))
        .optional(),
      evaluation_note: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
      question: d.question,
      answer: d.answer,
      evaluationNote: d.evaluation_note,
    }));

export const unmarshalGenieAgentBenchmarksSchema: z.ZodType<GenieAgentBenchmarks> =
  z
    .object({
      questions: z
        .array(z.lazy(() => unmarshalGenieAgentBenchmarkQuestionSchema))
        .optional(),
    })
    .transform(d => ({
      questions: d.questions,
    }));

export const unmarshalGenieAgentColumnConfigSchema: z.ZodType<GenieAgentColumnConfig> =
  z
    .object({
      column: z.string().optional(),
      description: z.string().optional(),
      synonyms: z.array(z.string()).optional(),
      exclude: z.boolean().optional(),
      enable_format_assistance: z.boolean().optional(),
      enable_entity_matching: z.boolean().optional(),
      display_name: z.string().optional(),
    })
    .transform(d => ({
      column: d.column,
      description: d.description,
      synonyms: d.synonyms,
      exclude: d.exclude,
      enableFormatAssistance: d.enable_format_assistance,
      enableEntityMatching: d.enable_entity_matching,
      displayName: d.display_name,
    }));

export const unmarshalGenieAgentConfigSchema: z.ZodType<GenieAgentConfig> = z
  .object({
    sample_questions: z
      .array(z.lazy(() => unmarshalGenieAgentSampleQuestionSchema))
      .optional(),
  })
  .transform(d => ({
    sampleQuestions: d.sample_questions,
  }));

export const unmarshalGenieAgentDataSourcesSchema: z.ZodType<GenieAgentDataSources> =
  z
    .object({
      tables: z.array(z.lazy(() => unmarshalGenieAgentTableSchema)).optional(),
      volumes: z
        .array(z.lazy(() => unmarshalGenieAgentVolumeSchema))
        .optional(),
      mcp_connections: z
        .array(z.lazy(() => unmarshalGenieAgentMcpConnectionSchema))
        .optional(),
    })
    .transform(d => ({
      tables: d.tables,
      volumes: d.volumes,
      mcpConnections: d.mcp_connections,
    }));

export const unmarshalGenieAgentDefinitionSchema: z.ZodType<GenieAgentDefinition> =
  z
    .object({
      config: z.lazy(() => unmarshalGenieAgentConfigSchema).optional(),
      data_sources: z
        .lazy(() => unmarshalGenieAgentDataSourcesSchema)
        .optional(),
      instructions: z
        .lazy(() => unmarshalGenieAgentInstructionsSchema)
        .optional(),
      benchmarks: z.lazy(() => unmarshalGenieAgentBenchmarksSchema).optional(),
    })
    .transform(d => ({
      config: d.config,
      dataSources: d.data_sources,
      instructions: d.instructions,
      benchmarks: d.benchmarks,
    }));

export const unmarshalGenieAgentExampleQuestionSqlSchema: z.ZodType<GenieAgentExampleQuestionSql> =
  z
    .object({
      id: z.string().optional(),
      question: z.string().optional(),
      sql: z.string().optional(),
      parameters: z
        .array(z.lazy(() => unmarshalGenieAgentSqlParameterSchema))
        .optional(),
      usage_guidance: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
      question: d.question,
      sql: d.sql,
      parameters: d.parameters,
      usageGuidance: d.usage_guidance,
    }));

export const unmarshalGenieAgentInstructionsSchema: z.ZodType<GenieAgentInstructions> =
  z
    .object({
      text_instructions: z
        .array(z.lazy(() => unmarshalGenieAgentTextInstructionSchema))
        .optional(),
      example_question_sqls: z
        .array(z.lazy(() => unmarshalGenieAgentExampleQuestionSqlSchema))
        .optional(),
      sql_functions: z
        .array(z.lazy(() => unmarshalGenieAgentSqlFunctionSchema))
        .optional(),
      join_specs: z
        .array(z.lazy(() => unmarshalGenieAgentJoinSpecSchema))
        .optional(),
      sql_snippets: z
        .lazy(() => unmarshalGenieAgentSqlSnippetsSchema)
        .optional(),
    })
    .transform(d => ({
      textInstructions: d.text_instructions,
      exampleQuestionSqls: d.example_question_sqls,
      sqlFunctions: d.sql_functions,
      joinSpecs: d.join_specs,
      sqlSnippets: d.sql_snippets,
    }));

export const unmarshalGenieAgentJoinSourceSchema: z.ZodType<GenieAgentJoinSource> =
  z
    .object({
      identifier: z.string().optional(),
      alias: z.string().optional(),
    })
    .transform(d => ({
      identifier: d.identifier,
      alias: d.alias,
    }));

export const unmarshalGenieAgentJoinSpecSchema: z.ZodType<GenieAgentJoinSpec> =
  z
    .object({
      id: z.string().optional(),
      left: z.lazy(() => unmarshalGenieAgentJoinSourceSchema).optional(),
      right: z.lazy(() => unmarshalGenieAgentJoinSourceSchema).optional(),
      sql: z.string().optional(),
      relationship_type: z.string().optional(),
      comment: z.string().optional(),
      instruction: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
      left: d.left,
      right: d.right,
      sql: d.sql,
      relationshipType: d.relationship_type,
      comment: d.comment,
      instruction: d.instruction,
    }));

export const unmarshalGenieAgentMcpConnectionSchema: z.ZodType<GenieAgentMcpConnection> =
  z
    .object({
      mcp_connection: z.string().optional(),
    })
    .transform(d => ({
      mcpConnection: d.mcp_connection,
    }));

export const unmarshalGenieAgentSampleQuestionSchema: z.ZodType<GenieAgentSampleQuestion> =
  z
    .object({
      id: z.string().optional(),
      question: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
      question: d.question,
    }));

export const unmarshalGenieAgentSqlExpressionSchema: z.ZodType<GenieAgentSqlExpression> =
  z
    .object({
      id: z.string().optional(),
      alias: z.string().optional(),
      sql: z.string().optional(),
      display_name: z.string().optional(),
      instruction: z.string().optional(),
      synonyms: z.array(z.string()).optional(),
    })
    .transform(d => ({
      id: d.id,
      alias: d.alias,
      sql: d.sql,
      displayName: d.display_name,
      instruction: d.instruction,
      synonyms: d.synonyms,
    }));

export const unmarshalGenieAgentSqlFilterSchema: z.ZodType<GenieAgentSqlFilter> =
  z
    .object({
      id: z.string().optional(),
      sql: z.string().optional(),
      display_name: z.string().optional(),
      instruction: z.string().optional(),
      synonyms: z.array(z.string()).optional(),
    })
    .transform(d => ({
      id: d.id,
      sql: d.sql,
      displayName: d.display_name,
      instruction: d.instruction,
      synonyms: d.synonyms,
    }));

export const unmarshalGenieAgentSqlFunctionSchema: z.ZodType<GenieAgentSqlFunction> =
  z
    .object({
      id: z.string().optional(),
      identifier: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
      identifier: d.identifier,
    }));

export const unmarshalGenieAgentSqlMeasureSchema: z.ZodType<GenieAgentSqlMeasure> =
  z
    .object({
      id: z.string().optional(),
      alias: z.string().optional(),
      sql: z.string().optional(),
      display_name: z.string().optional(),
      instruction: z.string().optional(),
      synonyms: z.array(z.string()).optional(),
    })
    .transform(d => ({
      id: d.id,
      alias: d.alias,
      sql: d.sql,
      displayName: d.display_name,
      instruction: d.instruction,
      synonyms: d.synonyms,
    }));

export const unmarshalGenieAgentSqlParameterSchema: z.ZodType<GenieAgentSqlParameter> =
  z
    .object({
      name: z.string().optional(),
      type_hint: z.string().optional(),
      description: z.string().optional(),
      default_value: z
        .lazy(() => unmarshalGenieAgentSqlParameterDefaultValueSchema)
        .optional(),
    })
    .transform(d => ({
      name: d.name,
      typeHint: d.type_hint,
      description: d.description,
      defaultValue: d.default_value,
    }));

export const unmarshalGenieAgentSqlParameterDefaultRangeSchema: z.ZodType<GenieAgentSqlParameterDefaultRange> =
  z
    .object({
      min: z.string().optional(),
      max: z.string().optional(),
    })
    .transform(d => ({
      min: d.min,
      max: d.max,
    }));

export const unmarshalGenieAgentSqlParameterDefaultValueSchema: z.ZodType<GenieAgentSqlParameterDefaultValue> =
  z
    .object({
      values: z.array(z.string()).optional(),
      value_range: z
        .lazy(() => unmarshalGenieAgentSqlParameterDefaultRangeSchema)
        .optional(),
    })
    .transform(d => ({
      values: d.values,
      valueRange: d.value_range,
    }));

export const unmarshalGenieAgentSqlSnippetsSchema: z.ZodType<GenieAgentSqlSnippets> =
  z
    .object({
      filters: z
        .array(z.lazy(() => unmarshalGenieAgentSqlFilterSchema))
        .optional(),
      expressions: z
        .array(z.lazy(() => unmarshalGenieAgentSqlExpressionSchema))
        .optional(),
      measures: z
        .array(z.lazy(() => unmarshalGenieAgentSqlMeasureSchema))
        .optional(),
    })
    .transform(d => ({
      filters: d.filters,
      expressions: d.expressions,
      measures: d.measures,
    }));

export const unmarshalGenieAgentTableSchema: z.ZodType<GenieAgentTable> = z
  .object({
    identifier: z.string().optional(),
    description: z.string().optional(),
    column_configs: z
      .array(z.lazy(() => unmarshalGenieAgentColumnConfigSchema))
      .optional(),
  })
  .transform(d => ({
    identifier: d.identifier,
    description: d.description,
    columnConfigs: d.column_configs,
  }));

export const unmarshalGenieAgentTextInstructionSchema: z.ZodType<GenieAgentTextInstruction> =
  z
    .object({
      id: z.string().optional(),
      content: z.string().optional(),
    })
    .transform(d => ({
      id: d.id,
      content: d.content,
    }));

export const unmarshalGenieAgentVolumeSchema: z.ZodType<GenieAgentVolume> = z
  .object({
    path: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
    description: d.description,
  }));

export const unmarshalListGenieAgentsResponseSchema: z.ZodType<ListGenieAgentsResponse> =
  z
    .object({
      genie_agents: z.array(z.lazy(() => unmarshalGenieAgentSchema)).optional(),
      next_page_token: z.string().optional(),
      unreachable: z.array(z.string()).optional(),
    })
    .transform(d => ({
      genieAgents: d.genie_agents,
      nextPageToken: d.next_page_token,
      unreachable: d.unreachable,
    }));

export const marshalGenieAgentSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    definition: z.lazy(() => marshalGenieAgentDefinitionSchema).optional(),
    warehouseId: z.string().optional(),
    parentPath: z.string().optional(),
    etag: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    effectiveParentPath: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    display_name: d.displayName,
    description: d.description,
    definition: d.definition,
    warehouse_id: d.warehouseId,
    parent_path: d.parentPath,
    etag: d.etag,
    create_time: d.createTime,
    update_time: d.updateTime,
    effective_parent_path: d.effectiveParentPath,
  }));

export const marshalGenieAgentBenchmarkAnswerSchema: z.ZodType = z
  .object({
    format: z.string().optional(),
    content: z.string().optional(),
  })
  .transform(d => ({
    format: d.format,
    content: d.content,
  }));

export const marshalGenieAgentBenchmarkQuestionSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    question: z.string().optional(),
    answer: z
      .array(z.lazy(() => marshalGenieAgentBenchmarkAnswerSchema))
      .optional(),
    evaluationNote: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    question: d.question,
    answer: d.answer,
    evaluation_note: d.evaluationNote,
  }));

export const marshalGenieAgentBenchmarksSchema: z.ZodType = z
  .object({
    questions: z
      .array(z.lazy(() => marshalGenieAgentBenchmarkQuestionSchema))
      .optional(),
  })
  .transform(d => ({
    questions: d.questions,
  }));

export const marshalGenieAgentColumnConfigSchema: z.ZodType = z
  .object({
    column: z.string().optional(),
    description: z.string().optional(),
    synonyms: z.array(z.string()).optional(),
    exclude: z.boolean().optional(),
    enableFormatAssistance: z.boolean().optional(),
    enableEntityMatching: z.boolean().optional(),
    displayName: z.string().optional(),
  })
  .transform(d => ({
    column: d.column,
    description: d.description,
    synonyms: d.synonyms,
    exclude: d.exclude,
    enable_format_assistance: d.enableFormatAssistance,
    enable_entity_matching: d.enableEntityMatching,
    display_name: d.displayName,
  }));

export const marshalGenieAgentConfigSchema: z.ZodType = z
  .object({
    sampleQuestions: z
      .array(z.lazy(() => marshalGenieAgentSampleQuestionSchema))
      .optional(),
  })
  .transform(d => ({
    sample_questions: d.sampleQuestions,
  }));

export const marshalGenieAgentDataSourcesSchema: z.ZodType = z
  .object({
    tables: z.array(z.lazy(() => marshalGenieAgentTableSchema)).optional(),
    volumes: z.array(z.lazy(() => marshalGenieAgentVolumeSchema)).optional(),
    mcpConnections: z
      .array(z.lazy(() => marshalGenieAgentMcpConnectionSchema))
      .optional(),
  })
  .transform(d => ({
    tables: d.tables,
    volumes: d.volumes,
    mcp_connections: d.mcpConnections,
  }));

export const marshalGenieAgentDefinitionSchema: z.ZodType = z
  .object({
    config: z.lazy(() => marshalGenieAgentConfigSchema).optional(),
    dataSources: z.lazy(() => marshalGenieAgentDataSourcesSchema).optional(),
    instructions: z.lazy(() => marshalGenieAgentInstructionsSchema).optional(),
    benchmarks: z.lazy(() => marshalGenieAgentBenchmarksSchema).optional(),
  })
  .transform(d => ({
    config: d.config,
    data_sources: d.dataSources,
    instructions: d.instructions,
    benchmarks: d.benchmarks,
  }));

export const marshalGenieAgentExampleQuestionSqlSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    question: z.string().optional(),
    sql: z.string().optional(),
    parameters: z
      .array(z.lazy(() => marshalGenieAgentSqlParameterSchema))
      .optional(),
    usageGuidance: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    question: d.question,
    sql: d.sql,
    parameters: d.parameters,
    usage_guidance: d.usageGuidance,
  }));

export const marshalGenieAgentInstructionsSchema: z.ZodType = z
  .object({
    textInstructions: z
      .array(z.lazy(() => marshalGenieAgentTextInstructionSchema))
      .optional(),
    exampleQuestionSqls: z
      .array(z.lazy(() => marshalGenieAgentExampleQuestionSqlSchema))
      .optional(),
    sqlFunctions: z
      .array(z.lazy(() => marshalGenieAgentSqlFunctionSchema))
      .optional(),
    joinSpecs: z
      .array(z.lazy(() => marshalGenieAgentJoinSpecSchema))
      .optional(),
    sqlSnippets: z.lazy(() => marshalGenieAgentSqlSnippetsSchema).optional(),
  })
  .transform(d => ({
    text_instructions: d.textInstructions,
    example_question_sqls: d.exampleQuestionSqls,
    sql_functions: d.sqlFunctions,
    join_specs: d.joinSpecs,
    sql_snippets: d.sqlSnippets,
  }));

export const marshalGenieAgentJoinSourceSchema: z.ZodType = z
  .object({
    identifier: z.string().optional(),
    alias: z.string().optional(),
  })
  .transform(d => ({
    identifier: d.identifier,
    alias: d.alias,
  }));

export const marshalGenieAgentJoinSpecSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    left: z.lazy(() => marshalGenieAgentJoinSourceSchema).optional(),
    right: z.lazy(() => marshalGenieAgentJoinSourceSchema).optional(),
    sql: z.string().optional(),
    relationshipType: z.string().optional(),
    comment: z.string().optional(),
    instruction: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    left: d.left,
    right: d.right,
    sql: d.sql,
    relationship_type: d.relationshipType,
    comment: d.comment,
    instruction: d.instruction,
  }));

export const marshalGenieAgentMcpConnectionSchema: z.ZodType = z
  .object({
    mcpConnection: z.string().optional(),
  })
  .transform(d => ({
    mcp_connection: d.mcpConnection,
  }));

export const marshalGenieAgentSampleQuestionSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    question: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    question: d.question,
  }));

export const marshalGenieAgentSqlExpressionSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    alias: z.string().optional(),
    sql: z.string().optional(),
    displayName: z.string().optional(),
    instruction: z.string().optional(),
    synonyms: z.array(z.string()).optional(),
  })
  .transform(d => ({
    id: d.id,
    alias: d.alias,
    sql: d.sql,
    display_name: d.displayName,
    instruction: d.instruction,
    synonyms: d.synonyms,
  }));

export const marshalGenieAgentSqlFilterSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    sql: z.string().optional(),
    displayName: z.string().optional(),
    instruction: z.string().optional(),
    synonyms: z.array(z.string()).optional(),
  })
  .transform(d => ({
    id: d.id,
    sql: d.sql,
    display_name: d.displayName,
    instruction: d.instruction,
    synonyms: d.synonyms,
  }));

export const marshalGenieAgentSqlFunctionSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    identifier: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    identifier: d.identifier,
  }));

export const marshalGenieAgentSqlMeasureSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    alias: z.string().optional(),
    sql: z.string().optional(),
    displayName: z.string().optional(),
    instruction: z.string().optional(),
    synonyms: z.array(z.string()).optional(),
  })
  .transform(d => ({
    id: d.id,
    alias: d.alias,
    sql: d.sql,
    display_name: d.displayName,
    instruction: d.instruction,
    synonyms: d.synonyms,
  }));

export const marshalGenieAgentSqlParameterSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    typeHint: z.string().optional(),
    description: z.string().optional(),
    defaultValue: z
      .lazy(() => marshalGenieAgentSqlParameterDefaultValueSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    type_hint: d.typeHint,
    description: d.description,
    default_value: d.defaultValue,
  }));

export const marshalGenieAgentSqlParameterDefaultRangeSchema: z.ZodType = z
  .object({
    min: z.string().optional(),
    max: z.string().optional(),
  })
  .transform(d => ({
    min: d.min,
    max: d.max,
  }));

export const marshalGenieAgentSqlParameterDefaultValueSchema: z.ZodType = z
  .object({
    values: z.array(z.string()).optional(),
    valueRange: z
      .lazy(() => marshalGenieAgentSqlParameterDefaultRangeSchema)
      .optional(),
  })
  .transform(d => ({
    values: d.values,
    value_range: d.valueRange,
  }));

export const marshalGenieAgentSqlSnippetsSchema: z.ZodType = z
  .object({
    filters: z.array(z.lazy(() => marshalGenieAgentSqlFilterSchema)).optional(),
    expressions: z
      .array(z.lazy(() => marshalGenieAgentSqlExpressionSchema))
      .optional(),
    measures: z
      .array(z.lazy(() => marshalGenieAgentSqlMeasureSchema))
      .optional(),
  })
  .transform(d => ({
    filters: d.filters,
    expressions: d.expressions,
    measures: d.measures,
  }));

export const marshalGenieAgentTableSchema: z.ZodType = z
  .object({
    identifier: z.string().optional(),
    description: z.string().optional(),
    columnConfigs: z
      .array(z.lazy(() => marshalGenieAgentColumnConfigSchema))
      .optional(),
  })
  .transform(d => ({
    identifier: d.identifier,
    description: d.description,
    column_configs: d.columnConfigs,
  }));

export const marshalGenieAgentTextInstructionSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    content: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    content: d.content,
  }));

export const marshalGenieAgentVolumeSchema: z.ZodType = z
  .object({
    path: z.string().optional(),
    description: z.string().optional(),
  })
  .transform(d => ({
    path: d.path,
    description: d.description,
  }));

const genieAgentFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  definition: {
    wire: 'definition',
    children: () => genieAgentDefinitionFieldMaskSchema,
  },
  description: {wire: 'description'},
  displayName: {wire: 'display_name'},
  effectiveParentPath: {wire: 'effective_parent_path'},
  etag: {wire: 'etag'},
  name: {wire: 'name'},
  parentPath: {wire: 'parent_path'},
  updateTime: {wire: 'update_time'},
  warehouseId: {wire: 'warehouse_id'},
};

export function genieAgentFieldMask(...paths: string[]): FieldMask<GenieAgent> {
  return FieldMask.build<GenieAgent>(paths, genieAgentFieldMaskSchema);
}

const genieAgentBenchmarksFieldMaskSchema: FieldMaskSchema = {
  questions: {wire: 'questions'},
};

const genieAgentConfigFieldMaskSchema: FieldMaskSchema = {
  sampleQuestions: {wire: 'sample_questions'},
};

const genieAgentDataSourcesFieldMaskSchema: FieldMaskSchema = {
  mcpConnections: {wire: 'mcp_connections'},
  tables: {wire: 'tables'},
  volumes: {wire: 'volumes'},
};

const genieAgentDefinitionFieldMaskSchema: FieldMaskSchema = {
  benchmarks: {
    wire: 'benchmarks',
    children: () => genieAgentBenchmarksFieldMaskSchema,
  },
  config: {wire: 'config', children: () => genieAgentConfigFieldMaskSchema},
  dataSources: {
    wire: 'data_sources',
    children: () => genieAgentDataSourcesFieldMaskSchema,
  },
  instructions: {
    wire: 'instructions',
    children: () => genieAgentInstructionsFieldMaskSchema,
  },
};

const genieAgentInstructionsFieldMaskSchema: FieldMaskSchema = {
  exampleQuestionSqls: {wire: 'example_question_sqls'},
  joinSpecs: {wire: 'join_specs'},
  sqlFunctions: {wire: 'sql_functions'},
  sqlSnippets: {
    wire: 'sql_snippets',
    children: () => genieAgentSqlSnippetsFieldMaskSchema,
  },
  textInstructions: {wire: 'text_instructions'},
};

const genieAgentSqlSnippetsFieldMaskSchema: FieldMaskSchema = {
  expressions: {wire: 'expressions'},
  filters: {wire: 'filters'},
  measures: {wire: 'measures'},
};
