// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {JsonValue} from '@databricks/sdk-core/wkt';
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

/** The name of the base data type. This doesn't include details for complex types such as STRUCT, MAP or ARRAY. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ColumnTypeName = {
  BOOLEAN: 'BOOLEAN',
  BYTE: 'BYTE',
  SHORT: 'SHORT',
  INT: 'INT',
  LONG: 'LONG',
  FLOAT: 'FLOAT',
  DOUBLE: 'DOUBLE',
  DATE: 'DATE',
  TIMESTAMP: 'TIMESTAMP',
  STRING: 'STRING',
  BINARY: 'BINARY',
  DECIMAL: 'DECIMAL',
  INTERVAL: 'INTERVAL',
  ARRAY: 'ARRAY',
  STRUCT: 'STRUCT',
  MAP: 'MAP',
  CHAR: 'CHAR',
  NULL: 'NULL',
  USER_DEFINED_TYPE: 'USER_DEFINED_TYPE',
} as const;
export type ColumnTypeName =
  | (typeof ColumnTypeName)[keyof typeof ColumnTypeName]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Disposition = {
  FETCH_DISPOSITION_UNSPECIFIED: 'FETCH_DISPOSITION_UNSPECIFIED',
  INLINE: 'INLINE',
  EXTERNAL_LINKS: 'EXTERNAL_LINKS',
} as const;
export type Disposition =
  | (typeof Disposition)[keyof typeof Disposition]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const Format = {
  FORMAT_UNSPECIFIED: 'FORMAT_UNSPECIFIED',
  JSON_ARRAY: 'JSON_ARRAY',
  ARROW_STREAM: 'ARROW_STREAM',
  CSV: 'CSV',
} as const;
export type Format = (typeof Format)[keyof typeof Format] | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ServiceErrorCode = {
  UNKNOWN: 'UNKNOWN',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  TEMPORARILY_UNAVAILABLE: 'TEMPORARILY_UNAVAILABLE',
  IO_ERROR: 'IO_ERROR',
  BAD_REQUEST: 'BAD_REQUEST',
  SERVICE_UNDER_MAINTENANCE: 'SERVICE_UNDER_MAINTENANCE',
  WORKSPACE_TEMPORARILY_UNAVAILABLE: 'WORKSPACE_TEMPORARILY_UNAVAILABLE',
  DEADLINE_EXCEEDED: 'DEADLINE_EXCEEDED',
  CANCELLED: 'CANCELLED',
  RESOURCE_EXHAUSTED: 'RESOURCE_EXHAUSTED',
  ABORTED: 'ABORTED',
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
} as const;
export type ServiceErrorCode =
  | (typeof ServiceErrorCode)[keyof typeof ServiceErrorCode]
  | (string & {});

/**
 * When `wait_timeout > 0s`, the call will block up to the specified time. If the statement execution doesn't
 * finish within this time, `on_wait_timeout` determines whether the execution should continue or be canceled.
 * When set to `CONTINUE`, the statement execution continues asynchronously and the call returns a statement ID
 * which can be used for polling with :method:statementexecution/getStatement. When set to `CANCEL`,
 * the statement execution is canceled and the call returns with a `CANCELED` state.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TimeoutAction = {
  TIMEOUT_ACTION_UNSPECIFIED: 'TIMEOUT_ACTION_UNSPECIFIED',
  CONTINUE: 'CONTINUE',
  CANCEL: 'CANCEL',
} as const;
export type TimeoutAction =
  | (typeof TimeoutAction)[keyof typeof TimeoutAction]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const StatementStatus_State = {
  STATE_UNSPECIFIED: 'STATE_UNSPECIFIED',
  PENDING: 'PENDING',
  RUNNING: 'RUNNING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED',
  CLOSED: 'CLOSED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type StatementStatus_State =
  | (typeof StatementStatus_State)[keyof typeof StatementStatus_State]
  | (string & {});

export interface CancelStatementRequest {
  /**
   * The statement ID is returned upon successfully submitting a SQL statement, and is a required
   * reference for all subsequent calls.
   */
  statementId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CancelStatementResponse {}

export interface ChunkInfo {
  /** The position within the sequence of result set chunks. */
  chunkIndex?: number | undefined;
  /** The starting row offset within the result set. */
  rowOffset?: bigint | undefined;
  /** The number of rows within the result chunk. */
  rowCount?: bigint | undefined;
  /**
   * The number of bytes in the result chunk. This field is not available when using `INLINE`
   * disposition.
   */
  byteCount?: bigint | undefined;
  /**
   * When fetching, provides the `chunk_index` for the _next_ chunk. If absent, indicates there are no
   * more chunks. The next chunk can be fetched with a
   * :method:statementexecution/getstatementresultchunkn request.
   */
  nextChunkIndex?: number | undefined;
  /**
   * When fetching, provides a link to fetch the _next_ chunk. If absent, indicates there are no more
   * chunks. This link is an absolute `path` to be joined with your `$DATABRICKS_HOST`, and should be
   * treated as an opaque link. This is an alternative to using `next_chunk_index`.
   */
  nextChunkInternalLink?: string | undefined;
}

export interface ColumnInfo {
  /** The name of the column. */
  name?: string | undefined;
  /** The full SQL type specification. */
  typeText?: string | undefined;
  /** The name of the base data type. This doesn't include details for complex types such as STRUCT, MAP or ARRAY. */
  typeName?: ColumnTypeName | undefined;
  /** The ordinal position of the column (starting at position 0). */
  position?: number | undefined;
  /** Specifies the number of digits in a number. This applies to the DECIMAL type. */
  typePrecision?: number | undefined;
  /** Specifies the number of digits to the right of the decimal point in a number. This applies to the DECIMAL type. */
  typeScale?: number | undefined;
  /** The format of the interval type. */
  typeIntervalType?: string | undefined;
}

export interface ExecuteStatementRequest {
  /**
   * The SQL statement to execute. The statement can optionally be parameterized, see `parameters`.
   * The maximum query text size is 16 MiB.
   */
  statement?: string | undefined;
  /**
   * Warehouse upon which to execute a statement. See also
   * [What are SQL warehouses?](https://docs.databricks.com/sql/admin/warehouse-type.html)
   */
  warehouseId?: string | undefined;
  /**
   * Sets default catalog for statement execution, similar to
   * [`USE CATALOG`](https://docs.databricks.com/sql/language-manual/sql-ref-syntax-ddl-use-catalog.html)
   * in SQL.
   */
  catalog?: string | undefined;
  /**
   * Sets default schema for statement execution, similar to
   * [`USE SCHEMA`](https://docs.databricks.com/sql/language-manual/sql-ref-syntax-ddl-use-schema.html)
   * in SQL.
   */
  schema?: string | undefined;
  /**
   * Applies the given row limit to the statement's result set, but unlike the `LIMIT` clause in SQL,
   * it also sets the `truncated` field in the response to indicate whether the result was trimmed due to the limit or
   * not.
   */
  rowLimit?: bigint | undefined;
  /**
   * Applies the given byte limit to the statement's result size. Byte counts are based on internal data
   * representations and might not match the final size in the requested `format`. If the result was truncated due to
   * the byte limit, then `truncated` in the response is set to `true`.
   * When using `EXTERNAL_LINKS` disposition, a default `byte_limit` of 100 GiB is applied if `byte_limit` is not
   * explicitly set.
   */
  byteLimit?: bigint | undefined;
  /**
   * Statement execution supports three result formats: `JSON_ARRAY` (default), `ARROW_STREAM`, and `CSV`.
   *
   * Important: The formats `ARROW_STREAM` and `CSV` are supported only with `EXTERNAL_LINKS` disposition.
   * `JSON_ARRAY` is supported in `INLINE` and `EXTERNAL_LINKS` disposition.
   *
   * When specifying `format=JSON_ARRAY`, result data will be formatted as an array of arrays of values, where each
   * value is either the *string representation* of a value, or `null`.
   * For example, the output of `SELECT concat('id-', id) AS strCol, id AS intCol, null AS nullCol FROM range(3)` would
   * look like this:
   *
   * ```
   * [
   * [ "id-1", "1", null ],
   * [ "id-2", "2", null ],
   * [ "id-3", "3", null ],
   * ]
   * ```
   *
   * When specifying `format=JSON_ARRAY` and `disposition=EXTERNAL_LINKS`, each chunk in the result contains compact
   * JSON with no indentation or extra whitespace.
   *
   * When specifying `format=ARROW_STREAM` and `disposition=EXTERNAL_LINKS`, each chunk in the result will be formatted
   * as Apache Arrow Stream. See the
   * [Apache Arrow streaming format](https://arrow.apache.org/docs/format/Columnar.html#ipc-streaming-format).
   *
   * When specifying `format=CSV` and `disposition=EXTERNAL_LINKS`, each chunk in the result will be a CSV according to
   * [RFC 4180](https://www.rfc-editor.org/rfc/rfc4180) standard.
   * All the columns values will have *string representation* similar to the `JSON_ARRAY` format, and `null` values will
   * be encoded as “null”.
   * Only the first chunk in the result would contain a header row with column names.
   * For example, the output of `SELECT concat('id-', id) AS strCol, id AS intCol, null as nullCol FROM range(3)` would
   * look like this:
   *
   * ```
   * strCol,intCol,nullCol
   * id-1,1,null
   * id-2,2,null
   * id-3,3,null
   * ```
   */
  format?: Format | undefined;
  /**
   * The fetch disposition provides two modes of fetching results: `INLINE` and `EXTERNAL_LINKS`.
   *
   * Statements executed with `INLINE` disposition will return result data inline, in `JSON_ARRAY` format, in a series
   * of chunks. If a given statement produces a result set with a size larger than 25 MiB,
   * that statement execution is aborted, and no result set will be available.
   *
   * **NOTE**
   * Byte limits are computed based upon internal representations of the result set data, and might not match the sizes
   * visible in JSON responses.
   *
   * Statements executed with `EXTERNAL_LINKS` disposition will return result data as external links: URLs that point
   * to cloud storage internal to the workspace. Using `EXTERNAL_LINKS` disposition allows statements to generate
   * arbitrarily sized result sets for fetching up to 100 GiB. The resulting links have two important properties:
   *
   * 1. They point to resources _external_ to the <Databricks> compute; therefore any associated authentication
   * information (typically a personal access token, OAuth token, or similar) _must be removed_ when fetching from
   * these links.
   *
   * 2. These are  URLs
   * with a specific expiration, indicated in the response. The behavior when attempting to use an expired link is
   * cloud specific.
   */
  disposition?: Disposition | undefined;
  /**
   * The time in seconds the call will wait for the statement's result set as `Ns`, where `N` can be set to 0 or to a
   * value between 5 and 50.
   *
   * When set to `0s`, the statement will execute in asynchronous mode and the call will not wait for the execution to
   * finish. In this case, the call returns directly with `PENDING` state and a statement ID which can be used for
   * polling with :method:statementexecution/getStatement.
   *
   * When set between 5 and 50 seconds, the call will behave synchronously up to this timeout and wait for the statement
   * execution to finish. If the execution finishes within this time, the call returns immediately with a manifest and
   * result data (or a `FAILED` state in case of an execution error). If the statement takes longer to execute,
   * `on_wait_timeout` determines what should happen after the timeout is reached.
   */
  waitTimeout?: string | undefined;
  /**
   * When `wait_timeout > 0s`, the call will block up to the specified time. If the statement execution doesn't
   * finish within this time, `on_wait_timeout` determines whether the execution should continue or be canceled.
   * When set to `CONTINUE`, the statement execution continues asynchronously and the call returns a statement ID
   * which can be used for polling with :method:statementexecution/getStatement. When set to `CANCEL`,
   * the statement execution is canceled and the call returns with a `CANCELED` state.
   */
  onWaitTimeout?: TimeoutAction | undefined;
  /**
   * A list of parameters to pass into a SQL statement containing parameter markers. A
   * parameter consists of a name, a value, and optionally a type. To represent a NULL
   * value, the `value` field may be omitted or set to `null` explicitly. If the `type` field
   * is omitted, the value is interpreted as a string.
   *
   * If the type is given, parameters will be checked for type correctness according
   * to the given type. A value is correct if the provided string can be converted to
   * the requested type using the `cast` function. The exact semantics are described in
   * the section [`cast` function](https://docs.databricks.com/sql/language-manual/functions/cast.html) of the SQL language reference.
   *
   * For example, the following statement contains two parameters, `my_name` and `my_date`:
   *
   * ```
   * SELECT * FROM my_table WHERE name = :my_name AND date = :my_date
   * ```
   *
   * The parameters can be passed in the request body as follows:
   *
   * `
   * {
   * ...,
   * "statement": "SELECT * FROM my_table WHERE name = :my_name AND date = :my_date",
   * "parameters": [
   * { "name": "my_name", "value": "the name" },
   * { "name": "my_date", "value": "2020-01-01", "type": "DATE" }
   * ]
   * }
   * `
   *
   * Currently, positional parameters denoted by a `?` marker are not supported by the
   * Databricks SQL Statement Execution API.
   *
   * Also see the section [Parameter markers](https://docs.databricks.com/sql/language-manual/sql-ref-parameter-marker.html) of the SQL language reference.
   */
  parameters?: StatementParameter[] | undefined;
  /**
   * An array of query tags to annotate a SQL statement. A query tag
   * consists of a non-empty key and, optionally, a value. To represent a NULL
   * value, either omit the `value` field or manually set it to `null` or white space.
   * Refer to the SQL language reference for the format specification of query tags.
   * There's no significance to the order of tags. Only one value per key will be recorded.
   * A sequence in excess of 20 query tags will be coerced to 20.
   * Example:
   *
   * {
   * ...,
   * "query_tags": [
   * { "key": "team", "value": "eng" },
   * { "key": "some key only tag" }
   * ]
   * }
   */
  queryTags?: QueryTag[] | undefined;
}

export interface ExternalLink {
  /**
   * A  URL pointing to a
   * chunk of result data, hosted by an external service, with a short expiration time
   * (<= 15 minutes). As this URL contains a temporary credential, it should be considered sensitive
   * and the client should not expose this URL in a log.
   */
  externalLink?: string | undefined;
  /**
   * Indicates the date-time that the given external link will expire and
   * becomes invalid, after which point a new `external_link` must be requested.
   */
  expiration?: string | undefined;
  /**
   * HTTP headers that must be included with a GET request to the `external_link`.
   * Each header is provided as a key-value pair.
   * Headers are typically used to pass a decryption key to the external service.
   * The values of these headers should be considered sensitive and the client should not expose
   * these values in a log.
   */
  httpHeaders?: Record<string, string> | undefined;
  /** The position within the sequence of result set chunks. */
  chunkIndex?: number | undefined;
  /** The starting row offset within the result set. */
  rowOffset?: bigint | undefined;
  /** The number of rows within the result chunk. */
  rowCount?: bigint | undefined;
  /**
   * The number of bytes in the result chunk. This field is not available when using `INLINE`
   * disposition.
   */
  byteCount?: bigint | undefined;
  /**
   * When fetching, provides the `chunk_index` for the _next_ chunk. If absent, indicates there are no
   * more chunks. The next chunk can be fetched with a
   * :method:statementexecution/getstatementresultchunkn request.
   */
  nextChunkIndex?: number | undefined;
  /**
   * When fetching, provides a link to fetch the _next_ chunk. If absent, indicates there are no more
   * chunks. This link is an absolute `path` to be joined with your `$DATABRICKS_HOST`, and should be
   * treated as an opaque link. This is an alternative to using `next_chunk_index`.
   */
  nextChunkInternalLink?: string | undefined;
}

export interface GetResultDataRequest {
  /**
   * The statement ID is returned upon successfully submitting a SQL statement, and is a required
   * reference for all subsequent calls.
   */
  statementId?: string | undefined;
  chunkIndex?: number | undefined;
}

export interface GetStatementResultRequest {
  /**
   * The statement ID is returned upon successfully submitting a SQL statement, and is a required
   * reference for all subsequent calls.
   */
  statementId?: string | undefined;
}

/**
 * * A query execution can be annotated with an optional key-value pair to
 * allow users to attribute the executions by key and optional value to filter by.
 * QueryTag is the user-facing representation.
 */
export interface QueryTag {
  key?: string | undefined;
  value?: string | undefined;
}

/**
 * Contains the result data of a single chunk when using `INLINE` disposition. When using
 * `EXTERNAL_LINKS` disposition, the array `external_links` is used instead to provide
 * URLs to the result data
 * in cloud storage. Exactly one of these alternatives is used. (While the `external_links`
 * array prepares the API to return multiple links in a single response. Currently only a single
 * link is returned.)
 */
export interface ResultData {
  externalLinks?: ExternalLink[] | undefined;
  /**
   * The `JSON_ARRAY` format is an array of arrays of values, where each non-null value is
   * formatted as a string. Null values are encoded as JSON `null`.
   */
  dataArray?: JsonValue[][] | undefined;
  /** The position within the sequence of result set chunks. */
  chunkIndex?: number | undefined;
  /** The starting row offset within the result set. */
  rowOffset?: bigint | undefined;
  /** The number of rows within the result chunk. */
  rowCount?: bigint | undefined;
  /**
   * The number of bytes in the result chunk. This field is not available when using `INLINE`
   * disposition.
   */
  byteCount?: bigint | undefined;
  /**
   * When fetching, provides the `chunk_index` for the _next_ chunk. If absent, indicates there are no
   * more chunks. The next chunk can be fetched with a
   * :method:statementexecution/getstatementresultchunkn request.
   */
  nextChunkIndex?: number | undefined;
  /**
   * When fetching, provides a link to fetch the _next_ chunk. If absent, indicates there are no more
   * chunks. This link is an absolute `path` to be joined with your `$DATABRICKS_HOST`, and should be
   * treated as an opaque link. This is an alternative to using `next_chunk_index`.
   */
  nextChunkInternalLink?: string | undefined;
}

/** The result manifest provides schema and metadata for the result set. */
export interface ResultManifest {
  format?: Format | undefined;
  schema?: Schema | undefined;
  /** The total number of chunks that the result set has been divided into. */
  totalChunkCount?: number | undefined;
  /** Array of result set chunk metadata. */
  chunks?: ChunkInfo[] | undefined;
  /** The total number of rows in the result set. */
  totalRowCount?: bigint | undefined;
  /**
   * The total number of bytes in the result set. This field is not available when using `INLINE`
   * disposition.
   */
  totalByteCount?: bigint | undefined;
  /** Indicates whether the result is truncated due to `row_limit` or `byte_limit`. */
  truncated?: boolean | undefined;
}

/** The schema is an ordered list of column descriptions. */
export interface Schema {
  columnCount?: number | undefined;
  columns?: ColumnInfo[] | undefined;
}

export interface ServiceError {
  errorCode?: ServiceErrorCode | undefined;
  /** A brief summary of the error condition. */
  message?: string | undefined;
}

export interface StatementParameter {
  /** The name of a parameter marker to be substituted in the statement. */
  name?: string | undefined;
  /** The value to substitute, represented as a string. If omitted, the value is interpreted as NULL. */
  value?: string | undefined;
  /**
   * The data type, given as a string. For example: `INT`, `STRING`, `DECIMAL(10,2)`.
   * If no type is given the type is assumed to be `STRING`. Complex types, such as
   * `ARRAY`, `MAP`, and `STRUCT` are not supported. For valid types, refer to the
   * section [Data types](https://docs.databricks.com/sql/language-manual/functions/cast.html) of the SQL language reference.
   */
  type?: string | undefined;
}

export interface StatementResponse {
  /**
   * The statement ID is returned upon successfully submitting a SQL statement, and is a required
   * reference for all subsequent calls.
   */
  statementId?: string | undefined;
  status?: StatementStatus | undefined;
  manifest?: ResultManifest | undefined;
  result?: ResultData | undefined;
}

/** The status response includes execution state and if relevant, error information. */
export interface StatementStatus {
  /**
   * Statement execution state:
   * - `PENDING`: waiting for warehouse
   * - `RUNNING`: running
   * - `SUCCEEDED`: execution was successful, result data available for fetch
   * - `FAILED`: execution failed; reason for failure described in accompanying error message
   * - `CANCELED`: user canceled; can come from explicit cancel call, or timeout with
   * `on_wait_timeout=CANCEL`
   * - `CLOSED`: execution successful, and statement closed; result no longer available for fetch
   */
  state?: StatementStatus_State | undefined;
  error?: ServiceError | undefined;
  /**
   * SQLSTATE error code returned when the statement execution fails.
   * Only populated when the statement status is `FAILED`.
   */
  sqlState?: string | undefined;
}

export const unmarshalCancelStatementResponseSchema: z.ZodType<CancelStatementResponse> =
  z.object({});

export const unmarshalChunkInfoSchema: z.ZodType<ChunkInfo> = z
  .object({
    chunk_index: z.number().optional(),
    row_offset: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    row_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    byte_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    next_chunk_index: z.number().optional(),
    next_chunk_internal_link: z.string().optional(),
  })
  .transform(d => ({
    chunkIndex: d.chunk_index,
    rowOffset: d.row_offset,
    rowCount: d.row_count,
    byteCount: d.byte_count,
    nextChunkIndex: d.next_chunk_index,
    nextChunkInternalLink: d.next_chunk_internal_link,
  }));

export const unmarshalColumnInfoSchema: z.ZodType<ColumnInfo> = z
  .object({
    name: z.string().optional(),
    type_text: z.string().optional(),
    type_name: z.string().optional(),
    position: z.number().optional(),
    type_precision: z.number().optional(),
    type_scale: z.number().optional(),
    type_interval_type: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    typeText: d.type_text,
    typeName: d.type_name,
    position: d.position,
    typePrecision: d.type_precision,
    typeScale: d.type_scale,
    typeIntervalType: d.type_interval_type,
  }));

export const unmarshalExternalLinkSchema: z.ZodType<ExternalLink> = z
  .object({
    external_link: z.string().optional(),
    expiration: z.string().optional(),
    http_headers: z.record(z.string(), z.string()).optional(),
    chunk_index: z.number().optional(),
    row_offset: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    row_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    byte_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    next_chunk_index: z.number().optional(),
    next_chunk_internal_link: z.string().optional(),
  })
  .transform(d => ({
    externalLink: d.external_link,
    expiration: d.expiration,
    httpHeaders: d.http_headers,
    chunkIndex: d.chunk_index,
    rowOffset: d.row_offset,
    rowCount: d.row_count,
    byteCount: d.byte_count,
    nextChunkIndex: d.next_chunk_index,
    nextChunkInternalLink: d.next_chunk_internal_link,
  }));

export const unmarshalResultDataSchema: z.ZodType<ResultData> = z
  .object({
    external_links: z
      .array(z.lazy(() => unmarshalExternalLinkSchema))
      .optional(),
    data_array: z.array(z.array(jsonValueSchema)).optional(),
    chunk_index: z.number().optional(),
    row_offset: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    row_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    byte_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    next_chunk_index: z.number().optional(),
    next_chunk_internal_link: z.string().optional(),
  })
  .transform(d => ({
    externalLinks: d.external_links,
    dataArray: d.data_array,
    chunkIndex: d.chunk_index,
    rowOffset: d.row_offset,
    rowCount: d.row_count,
    byteCount: d.byte_count,
    nextChunkIndex: d.next_chunk_index,
    nextChunkInternalLink: d.next_chunk_internal_link,
  }));

export const unmarshalResultManifestSchema: z.ZodType<ResultManifest> = z
  .object({
    format: z.string().optional(),
    schema: z.lazy(() => unmarshalSchemaSchema).optional(),
    total_chunk_count: z.number().optional(),
    chunks: z.array(z.lazy(() => unmarshalChunkInfoSchema)).optional(),
    total_row_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    total_byte_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    truncated: z.boolean().optional(),
  })
  .transform(d => ({
    format: d.format,
    schema: d.schema,
    totalChunkCount: d.total_chunk_count,
    chunks: d.chunks,
    totalRowCount: d.total_row_count,
    totalByteCount: d.total_byte_count,
    truncated: d.truncated,
  }));

export const unmarshalSchemaSchema: z.ZodType<Schema> = z
  .object({
    column_count: z.number().optional(),
    columns: z.array(z.lazy(() => unmarshalColumnInfoSchema)).optional(),
  })
  .transform(d => ({
    columnCount: d.column_count,
    columns: d.columns,
  }));

export const unmarshalServiceErrorSchema: z.ZodType<ServiceError> = z
  .object({
    error_code: z.string().optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    errorCode: d.error_code,
    message: d.message,
  }));

export const unmarshalStatementResponseSchema: z.ZodType<StatementResponse> = z
  .object({
    statement_id: z.string().optional(),
    status: z.lazy(() => unmarshalStatementStatusSchema).optional(),
    manifest: z.lazy(() => unmarshalResultManifestSchema).optional(),
    result: z.lazy(() => unmarshalResultDataSchema).optional(),
  })
  .transform(d => ({
    statementId: d.statement_id,
    status: d.status,
    manifest: d.manifest,
    result: d.result,
  }));

export const unmarshalStatementStatusSchema: z.ZodType<StatementStatus> = z
  .object({
    state: z.string().optional(),
    error: z.lazy(() => unmarshalServiceErrorSchema).optional(),
    sql_state: z.string().optional(),
  })
  .transform(d => ({
    state: d.state,
    error: d.error,
    sqlState: d.sql_state,
  }));

export const marshalCancelStatementRequestSchema: z.ZodType = z
  .object({
    statementId: z.string().optional(),
  })
  .transform(d => ({
    statement_id: d.statementId,
  }));

export const marshalExecuteStatementRequestSchema: z.ZodType = z
  .object({
    statement: z.string().optional(),
    warehouseId: z.string().optional(),
    catalog: z.string().optional(),
    schema: z.string().optional(),
    rowLimit: z.bigint().optional(),
    byteLimit: z.bigint().optional(),
    format: z.string().optional(),
    disposition: z.string().optional(),
    waitTimeout: z.string().optional(),
    onWaitTimeout: z.string().optional(),
    parameters: z
      .array(z.lazy(() => marshalStatementParameterSchema))
      .optional(),
    queryTags: z.array(z.lazy(() => marshalQueryTagSchema)).optional(),
  })
  .transform(d => ({
    statement: d.statement,
    warehouse_id: d.warehouseId,
    catalog: d.catalog,
    schema: d.schema,
    row_limit: d.rowLimit,
    byte_limit: d.byteLimit,
    format: d.format,
    disposition: d.disposition,
    wait_timeout: d.waitTimeout,
    on_wait_timeout: d.onWaitTimeout,
    parameters: d.parameters,
    query_tags: d.queryTags,
  }));

export const marshalQueryTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalStatementParameterSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    value: z.string().optional(),
    type: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    value: d.value,
    type: d.type,
  }));
