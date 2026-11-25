// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ChannelName = {
  CHANNEL_NAME_UNSPECIFIED: 'CHANNEL_NAME_UNSPECIFIED',
  CHANNEL_NAME_PREVIEW: 'CHANNEL_NAME_PREVIEW',
  CHANNEL_NAME_CURRENT: 'CHANNEL_NAME_CURRENT',
  CHANNEL_NAME_PREVIOUS: 'CHANNEL_NAME_PREVIOUS',
  CHANNEL_NAME_CUSTOM: 'CHANNEL_NAME_CUSTOM',
} as const;
export type ChannelName =
  | (typeof ChannelName)[keyof typeof ChannelName]
  | (string & {});

/** Possible Reasons for which we have not saved plans in the database */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PlansState = {
  /** Execution time of the query was smaller than the min required to save plans */
  IGNORED_SMALL_DURATION: 'IGNORED_SMALL_DURATION',
  /** Size of plans is larger than the limit defined in config */
  IGNORED_LARGE_PLANS_SIZE: 'IGNORED_LARGE_PLANS_SIZE',
  /** If plans exist and are stored in the DB */
  EXISTS: 'EXISTS',
  /** Catchall for unknown states in graphql, to prevent it from crashing when it received an unknown enum type that is defined here but not in the graphql schema of the object. */
  UNKNOWN: 'UNKNOWN',
  /** When the query has no plans by default */
  EMPTY: 'EMPTY',
  /** When plans are filtered out in history backend because it is isIgnoredSparkPlanType, isIgnoredSparkPlanName or isDeltaLogScan */
  IGNORED_SPARK_PLAN_TYPE: 'IGNORED_SPARK_PLAN_TYPE',
} as const;
export type PlansState =
  | (typeof PlansState)[keyof typeof PlansState]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const QueryStatementType = {
  OTHER: 'OTHER',
  ALTER: 'ALTER',
  ANALYZE: 'ANALYZE',
  COPY: 'COPY',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  DESCRIBE: 'DESCRIBE',
  DROP: 'DROP',
  EXPLAIN: 'EXPLAIN',
  GRANT: 'GRANT',
  INSERT: 'INSERT',
  MERGE: 'MERGE',
  OPTIMIZE: 'OPTIMIZE',
  REFRESH: 'REFRESH',
  REPLACE: 'REPLACE',
  REVOKE: 'REVOKE',
  SELECT: 'SELECT',
  SET: 'SET',
  SHOW: 'SHOW',
  TRUNCATE: 'TRUNCATE',
  UPDATE: 'UPDATE',
  USE: 'USE',
} as const;
export type QueryStatementType =
  | (typeof QueryStatementType)[keyof typeof QueryStatementType]
  | (string & {});

/**
 * Statuses which are also used by OperationStatus in runtime.
 * When adding a new QueryStatus, make sure to update com.databricks.sqlgateway.history.QueryStatusOrdering
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const QueryStatus = {
  /** query has been received and queued */
  QUEUED: 'QUEUED',
  /**
   * query has been received and started by the driver
   * DEPRECATED: to be removed once runtime side change is picked up.
   */
  STARTED: 'STARTED',
  /**
   * query compilation has been started
   * This isn't currently used. We will soon use this.
   */
  COMPILING: 'COMPILING',
  /**
   * query has been compiled
   * DEPRECATED: to be removed once runtime side change is picked up.
   */
  COMPILED: 'COMPILED',
  /**
   * currently execution has been started (spark jobs for this query has been started running)
   * detail ui is available from this state
   */
  RUNNING: 'RUNNING',
  /** query has been cancelled by the user */
  CANCELED: 'CANCELED',
  /** query has failed */
  FAILED: 'FAILED',
  /** query execution has been completed */
  FINISHED: 'FINISHED',
} as const;
export type QueryStatus =
  | (typeof QueryStatus)[keyof typeof QueryStatus]
  | (string & {});

/** Details about a Channel. */
export interface ChannelInfo {
  /** Name of the channel */
  name?: ChannelName | undefined;
  /** DB SQL Version the Channel is mapped to. */
  dbsqlVersion?: string | undefined;
}

export interface ExternalQuerySource {
  /** The canonical identifier for this Lakeview dashboard */
  dashboardId?: string | undefined;
  /** The canonical identifier for this legacy dashboard */
  legacyDashboardId?: string | undefined;
  /** The canonical identifier for this SQL alert */
  alertId?: string | undefined;
  /** The canonical identifier for this notebook */
  notebookId?: string | undefined;
  /** The canonical identifier for this SQL query */
  sqlQueryId?: string | undefined;
  /** Identifiers of the job, job run, and task run that executed this statement, when it ran as part of a job. */
  jobInfo?: ExternalQuerySource_JobInfo | undefined;
  /** The canonical identifier for this Genie space */
  genieSpaceId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ExternalQuerySource_JobInfo {
  /** The canonical identifier for this job. */
  jobId?: string | undefined;
  /** The canonical identifier of the run. This ID is unique across all runs of all jobs. */
  jobRunId?: string | undefined;
  /** The canonical identifier of the task run. */
  jobTaskRunId?: string | undefined;
}

/**
 * Fetches a list of queries conforming to the provided set of query filters.
 *
 * If the number of queries to return takes > 10 seconds, the request will timeout.
 * In that case, please reduce the time range to ensure ListQueries conforms to the 10 second max query time limit.
 */
export interface ListQueriesRequest {
  /**
   * An optional filter object to limit query history results. Accepts parameters such as user IDs, warehouse IDs, and statuses to narrow the returned data.
   * In a URL, the parameters of this filter are specified with dot notation. For example: `filter_by.statement_ids`.
   */
  filterBy?: QueryFilter | undefined;
  /** Limit the number of results returned in one page. Must be no more than 1000; the default is 100. */
  maxResults?: number | undefined;
  /**
   * A token that can be used to get the next page of results. The token can contain characters that need to be encoded before using it in a URL.
   * For example, the character '+' needs to be replaced by %2B. This field is optional.
   */
  pageToken?: string | undefined;
  /**
   * Whether to include the query metrics with each query.
   * Only use this for a small subset of queries (max_results).
   * Defaults to false.
   */
  includeMetrics?: boolean | undefined;
}

export interface ListQueriesResponse {
  /** A token that can be used to get the next page of results. */
  nextPageToken?: string | undefined;
  /** Whether there is another page of results. */
  hasNextPage?: boolean | undefined;
  res?: QueryInfo[] | undefined;
}

export interface QueryFilter {
  /** A range filter for query submitted time. The time range must be less than or equal to 30 days. */
  queryStartTimeRange?: TimeRange | undefined;
  /** A list of user IDs who ran the queries. */
  userIds?: bigint[] | undefined;
  /**
   * A list of statuses (QUEUED, RUNNING, CANCELED, FAILED, FINISHED) to match query results. Corresponds to
   * the `status` field in the response.
   * Filtering for multiple statuses is not recommended. Instead, opt to filter by a single status
   * multiple times and then combine the results.
   */
  statuses?: QueryStatus[] | undefined;
  /** A list of warehouse IDs. */
  warehouseIds?: string[] | undefined;
  /** A list of statement IDs. */
  statementIds?: string[] | undefined;
}

export interface QueryInfo {
  /**
   * The UUID that uniquely identifies the query execution. It matches the statement ID shown in the Query History UI
   * and the values accepted by the `statement_ids` filter.
   */
  queryId?: string | undefined;
  /**
   * Query status with one of the following values:
   *
   * - `QUEUED`: Query has been received and queued.
   * - `RUNNING`: Query has started.
   * - `CANCELED`: Query has been cancelled by the user.
   * - `FAILED`: Query has failed.
   * - `FINISHED`: Query has completed.
   */
  status?: QueryStatus | undefined;
  /** The text of the query. */
  queryText?: string | undefined;
  /** The time the query started, in milliseconds since the Unix epoch. */
  queryStartTimeMs?: bigint | undefined;
  /** The time execution of the query ended, in milliseconds since the Unix epoch. */
  executionEndTimeMs?: bigint | undefined;
  /** The time the query ended, in milliseconds since the Unix epoch. */
  queryEndTimeMs?: bigint | undefined;
  /** The ID of the user who ran the query. */
  userId?: bigint | undefined;
  /** The email address or username of the user who ran the query. */
  userName?: string | undefined;
  /** URL to the Spark UI query plan. */
  sparkUiUrl?: string | undefined;
  /** Alias for `warehouse_id`. */
  endpointId?: string | undefined;
  /** The number of results returned by the query. */
  rowsProduced?: bigint | undefined;
  /** Message describing why the query could not complete. */
  errorMessage?: string | undefined;
  /** A key that can be used to look up query details. */
  lookupKey?: string | undefined;
  /** Metrics about query execution. Only returned when `include_metrics` is true in the request. */
  metrics?: QueryMetrics | undefined;
  /** The ID of the user whose credentials were used to run the query. */
  executedAsUserId?: bigint | undefined;
  /** The email address or username of the user whose credentials were used to run the query. */
  executedAsUserName?: string | undefined;
  /**
   * The spark session UUID that query ran on.
   * This is either the Spark Connect, DBSQL, or SDP session ID.
   */
  sessionId?: string | undefined;
  /** Whether the query has reached a final state, so no further updates to this record are expected. */
  isFinal?: boolean | undefined;
  /** SQL Warehouse channel information at the time of query execution */
  channelUsed?: ChannelInfo | undefined;
  /** Whether plans exist for the execution, or the reason why they are missing */
  plansState?: PlansState | undefined;
  /** Type of statement for this query */
  statementType?: QueryStatementType | undefined;
  /** ID of the warehouse that ran the query. */
  warehouseId?: string | undefined;
  /**
   * Total time of the statement execution, in milliseconds. This value does not include the time taken to retrieve the results, which
   * can result in a discrepancy between this value and the start-to-finish wall-clock time.
   */
  duration?: bigint | undefined;
  /**
   * Client application that ran the statement. For example: Databricks SQL Editor, Tableau, and Power BI.
   * This field is derived from information provided by client applications. While values are expected to
   * remain static over time, this cannot be guaranteed.
   */
  clientApplication?: string | undefined;
  /**
   * A struct that contains key-value pairs representing <Databricks> entities that were involved in the execution
   * of this statement, such as jobs, notebooks, or dashboards. This field only records <Databricks> entities.
   */
  querySource?: ExternalQuerySource | undefined;
  /** The ID of the query whose cached result was returned, if this result was retrieved from the cache. */
  cacheQueryId?: string | undefined;
  /**
   * Key-value tags attached to the query execution, for example with the `SET QUERY_TAGS` statement, for grouping
   * and filtering. See https://docs.databricks.com/aws/en/sql/user/queries/query-tags.
   */
  queryTags?: QueryTag[] | undefined;
}

/**
 * A query metric that encapsulates a set of measurements for a single query.
 * Metrics come from the driver and are stored in the history service database.
 */
export interface QueryMetrics {
  /** Total execution time of the query from the client’s point of view, in milliseconds. */
  totalTimeMs?: bigint | undefined;
  /** Total size of data read by the query, in bytes. */
  readBytes?: bigint | undefined;
  /** Total number of rows returned by the query. */
  rowsProducedCount?: bigint | undefined;
  /** Time spent loading metadata and optimizing the query, in milliseconds. */
  compilationTimeMs?: bigint | undefined;
  /** Time spent executing the query, in milliseconds. */
  executionTimeMs?: bigint | undefined;
  /** Size of persistent data read from cloud object storage on your cloud tenant, in bytes. */
  readRemoteBytes?: bigint | undefined;
  /** Size of persistent data written to cloud object storage in your cloud tenant, in bytes. */
  writeRemoteBytes?: bigint | undefined;
  /** Size of persistent data read from the cache, in bytes. */
  readCacheBytes?: bigint | undefined;
  /** Size of data temporarily written to disk while executing the query, in bytes. */
  spillToDiskBytes?: bigint | undefined;
  /** Sum of execution time for all of the query’s tasks, in milliseconds. */
  taskTotalTimeMs?: bigint | undefined;
  /** Number of files read after pruning */
  readFilesCount?: bigint | undefined;
  /** Number of partitions read after pruning. */
  readPartitionsCount?: bigint | undefined;
  /** Total execution time for all individual Photon query engine tasks in the query, in milliseconds. */
  photonTotalTimeMs?: bigint | undefined;
  /** Total number of rows read by the query. */
  rowsReadCount?: bigint | undefined;
  /** Time spent fetching the query results after the execution finished, in milliseconds. */
  resultFetchTimeMs?: bigint | undefined;
  /** Total amount of data sent over the network between executor nodes during shuffle, in bytes. */
  networkSentBytes?: bigint | undefined;
  /** `true` if the query result was fetched from cache, `false` otherwise. */
  resultFromCache?: boolean | undefined;
  /** Total number of file bytes in all tables not read due to pruning */
  prunedBytes?: bigint | undefined;
  /** Total number of files from all tables not read due to pruning */
  prunedFilesCount?: bigint | undefined;
  /**
   * Timestamp of when the query was enqueued waiting for a cluster to be provisioned for the warehouse, in milliseconds since the Unix epoch.
   * This field is optional and will not appear if the query skipped the provisioning queue.
   */
  provisioningQueueStartTimestamp?: bigint | undefined;
  /**
   * Timestamp of when the query was enqueued waiting while the warehouse was at max load, in milliseconds since the Unix epoch.
   * This field is optional and will not appear if the query skipped the overloading queue.
   */
  overloadingQueueStartTimestamp?: bigint | undefined;
  /** Timestamp of when the underlying compute started compilation of the query, in milliseconds since the Unix epoch. */
  queryCompilationStartTimestamp?: bigint | undefined;
  /**
   * sum of task times completed in a range of wall clock time, approximated to a configurable number of points
   * aggregated over all stages and jobs in the query (based on task_total_time_ms)
   */
  taskTimeOverTimeRange?: TaskTimeOverRange | undefined;
  /**
   * Deprecated: use `projected_remaining_task_total_time_ms` instead.
   * Remaining work to be done across all stages in the query, in milliseconds.
   */
  workToBeDone?: bigint | undefined;
  /**
   * Deprecated: use `remaining_task_count` instead.
   * Number of remaining tasks to complete.
   */
  runnableTasks?: bigint | undefined;
  /** projected remaining work to be done aggregated across all stages in the query, in milliseconds */
  projectedRemainingTaskTotalTimeMs?: bigint | undefined;
  /**
   * number of remaining tasks to complete
   * this is based on the current status and could be bigger or smaller in the future based on future updates
   */
  remainingTaskCount?: bigint | undefined;
  /** projected lower bound on remaining total task time based on projected_remaining_task_total_time_ms / maximum concurrency */
  projectedRemainingWallclockTimeMs?: bigint | undefined;
  /** Total number of file bytes in all tables read */
  readFilesBytes?: bigint | undefined;
}

/**
 * * A query execution can be annotated with an optional key-value pair to
 * allow users to attribute the executions by key and optional value to filter by.
 * QueryTag is the user-facing representation.
 */
export interface QueryTag {
  /** The key of the tag. */
  key?: string | undefined;
  /** The value of the tag. Key-only tags have no value. */
  value?: string | undefined;
}

export interface TaskTimeOverRange {
  /** Each entry covers one consecutive time bucket of length `interval`, starting at `query_start_time_ms`. */
  entries?: TaskTimeOverRangeEntry[] | undefined;
  /**
   * interval length for all entries (difference in start time and end time of an entry range)
   * the same for all entries
   * start time of first interval is query_start_time_ms
   */
  interval?: bigint | undefined;
}

export interface TaskTimeOverRangeEntry {
  /** total task completion time in this time range, aggregated over all stages and jobs in the query */
  taskCompletedTimeMs?: bigint | undefined;
}

export interface TimeRange {
  /** Start of the range, in milliseconds since the Unix epoch. */
  startTimeMs?: bigint | undefined;
  /** End of the range, in milliseconds since the Unix epoch. */
  endTimeMs?: bigint | undefined;
}

export const unmarshalChannelInfoSchema: z.ZodType<ChannelInfo> = z
  .object({
    name: z.string().optional(),
    dbsql_version: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    dbsqlVersion: d.dbsql_version,
  }));

export const unmarshalExternalQuerySourceSchema: z.ZodType<ExternalQuerySource> =
  z
    .object({
      dashboard_id: z.string().optional(),
      legacy_dashboard_id: z.string().optional(),
      alert_id: z.string().optional(),
      notebook_id: z.string().optional(),
      sql_query_id: z.string().optional(),
      job_info: z
        .lazy(() => unmarshalExternalQuerySource_JobInfoSchema)
        .nullish()
        .transform(v => v ?? undefined),
      genie_space_id: z.string().optional(),
    })
    .transform(d => ({
      dashboardId: d.dashboard_id,
      legacyDashboardId: d.legacy_dashboard_id,
      alertId: d.alert_id,
      notebookId: d.notebook_id,
      sqlQueryId: d.sql_query_id,
      jobInfo: d.job_info,
      genieSpaceId: d.genie_space_id,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalExternalQuerySource_JobInfoSchema: z.ZodType<ExternalQuerySource_JobInfo> =
  z
    .object({
      job_id: z.string().optional(),
      job_run_id: z.string().optional(),
      job_task_run_id: z.string().optional(),
    })
    .transform(d => ({
      jobId: d.job_id,
      jobRunId: d.job_run_id,
      jobTaskRunId: d.job_task_run_id,
    }));

export const unmarshalListQueriesResponseSchema: z.ZodType<ListQueriesResponse> =
  z
    .object({
      next_page_token: z.string().optional(),
      has_next_page: z.boolean().optional(),
      res: z.array(z.lazy(() => unmarshalQueryInfoSchema)).optional(),
    })
    .transform(d => ({
      nextPageToken: d.next_page_token,
      hasNextPage: d.has_next_page,
      res: d.res,
    }));

export const unmarshalQueryInfoSchema: z.ZodType<QueryInfo> = z
  .object({
    query_id: z.string().optional(),
    status: z.string().optional(),
    query_text: z.string().optional(),
    query_start_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    execution_end_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    query_end_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    user_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    user_name: z.string().optional(),
    spark_ui_url: z.string().optional(),
    endpoint_id: z.string().optional(),
    rows_produced: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    error_message: z.string().optional(),
    lookup_key: z.string().optional(),
    metrics: z
      .lazy(() => unmarshalQueryMetricsSchema)
      .nullish()
      .transform(v => v ?? undefined),
    executed_as_user_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    executed_as_user_name: z.string().optional(),
    session_id: z.string().optional(),
    is_final: z.boolean().optional(),
    channel_used: z
      .lazy(() => unmarshalChannelInfoSchema)
      .nullish()
      .transform(v => v ?? undefined),
    plans_state: z.string().optional(),
    statement_type: z.string().optional(),
    warehouse_id: z.string().optional(),
    duration: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    client_application: z.string().optional(),
    query_source: z
      .lazy(() => unmarshalExternalQuerySourceSchema)
      .nullish()
      .transform(v => v ?? undefined),
    cache_query_id: z.string().optional(),
    query_tags: z.array(z.lazy(() => unmarshalQueryTagSchema)).optional(),
  })
  .transform(d => ({
    queryId: d.query_id,
    status: d.status,
    queryText: d.query_text,
    queryStartTimeMs: d.query_start_time_ms,
    executionEndTimeMs: d.execution_end_time_ms,
    queryEndTimeMs: d.query_end_time_ms,
    userId: d.user_id,
    userName: d.user_name,
    sparkUiUrl: d.spark_ui_url,
    endpointId: d.endpoint_id,
    rowsProduced: d.rows_produced,
    errorMessage: d.error_message,
    lookupKey: d.lookup_key,
    metrics: d.metrics,
    executedAsUserId: d.executed_as_user_id,
    executedAsUserName: d.executed_as_user_name,
    sessionId: d.session_id,
    isFinal: d.is_final,
    channelUsed: d.channel_used,
    plansState: d.plans_state,
    statementType: d.statement_type,
    warehouseId: d.warehouse_id,
    duration: d.duration,
    clientApplication: d.client_application,
    querySource: d.query_source,
    cacheQueryId: d.cache_query_id,
    queryTags: d.query_tags,
  }));

export const unmarshalQueryMetricsSchema: z.ZodType<QueryMetrics> = z
  .object({
    total_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    read_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    rows_produced_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    compilation_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    execution_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    read_remote_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    write_remote_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    read_cache_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    spill_to_disk_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    task_total_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    read_files_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    read_partitions_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    photon_total_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    rows_read_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    result_fetch_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    network_sent_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    result_from_cache: z.boolean().optional(),
    pruned_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    pruned_files_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    provisioning_queue_start_timestamp: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    overloading_queue_start_timestamp: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    query_compilation_start_timestamp: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    task_time_over_time_range: z
      .lazy(() => unmarshalTaskTimeOverRangeSchema)
      .nullish()
      .transform(v => v ?? undefined),
    work_to_be_done: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    runnable_tasks: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    projected_remaining_task_total_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    remaining_task_count: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    projected_remaining_wallclock_time_ms: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    read_files_bytes: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    totalTimeMs: d.total_time_ms,
    readBytes: d.read_bytes,
    rowsProducedCount: d.rows_produced_count,
    compilationTimeMs: d.compilation_time_ms,
    executionTimeMs: d.execution_time_ms,
    readRemoteBytes: d.read_remote_bytes,
    writeRemoteBytes: d.write_remote_bytes,
    readCacheBytes: d.read_cache_bytes,
    spillToDiskBytes: d.spill_to_disk_bytes,
    taskTotalTimeMs: d.task_total_time_ms,
    readFilesCount: d.read_files_count,
    readPartitionsCount: d.read_partitions_count,
    photonTotalTimeMs: d.photon_total_time_ms,
    rowsReadCount: d.rows_read_count,
    resultFetchTimeMs: d.result_fetch_time_ms,
    networkSentBytes: d.network_sent_bytes,
    resultFromCache: d.result_from_cache,
    prunedBytes: d.pruned_bytes,
    prunedFilesCount: d.pruned_files_count,
    provisioningQueueStartTimestamp: d.provisioning_queue_start_timestamp,
    overloadingQueueStartTimestamp: d.overloading_queue_start_timestamp,
    queryCompilationStartTimestamp: d.query_compilation_start_timestamp,
    taskTimeOverTimeRange: d.task_time_over_time_range,
    workToBeDone: d.work_to_be_done,
    runnableTasks: d.runnable_tasks,
    projectedRemainingTaskTotalTimeMs: d.projected_remaining_task_total_time_ms,
    remainingTaskCount: d.remaining_task_count,
    projectedRemainingWallclockTimeMs: d.projected_remaining_wallclock_time_ms,
    readFilesBytes: d.read_files_bytes,
  }));

export const unmarshalQueryTagSchema: z.ZodType<QueryTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalTaskTimeOverRangeSchema: z.ZodType<TaskTimeOverRange> = z
  .object({
    entries: z
      .array(z.lazy(() => unmarshalTaskTimeOverRangeEntrySchema))
      .optional(),
    interval: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    entries: d.entries,
    interval: d.interval,
  }));

export const unmarshalTaskTimeOverRangeEntrySchema: z.ZodType<TaskTimeOverRangeEntry> =
  z
    .object({
      task_completed_time_ms: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      taskCompletedTimeMs: d.task_completed_time_ms,
    }));

export const marshalChannelInfoSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    dbsqlVersion: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    dbsql_version: d.dbsqlVersion,
  }));

export const marshalExternalQuerySourceSchema: z.ZodType = z
  .object({
    dashboardId: z.string().optional(),
    legacyDashboardId: z.string().optional(),
    alertId: z.string().optional(),
    notebookId: z.string().optional(),
    sqlQueryId: z.string().optional(),
    jobInfo: z.lazy(() => marshalExternalQuerySource_JobInfoSchema).optional(),
    genieSpaceId: z.string().optional(),
  })
  .transform(d => ({
    dashboard_id: d.dashboardId,
    legacy_dashboard_id: d.legacyDashboardId,
    alert_id: d.alertId,
    notebook_id: d.notebookId,
    sql_query_id: d.sqlQueryId,
    job_info: d.jobInfo,
    genie_space_id: d.genieSpaceId,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalExternalQuerySource_JobInfoSchema: z.ZodType = z
  .object({
    jobId: z.string().optional(),
    jobRunId: z.string().optional(),
    jobTaskRunId: z.string().optional(),
  })
  .transform(d => ({
    job_id: d.jobId,
    job_run_id: d.jobRunId,
    job_task_run_id: d.jobTaskRunId,
  }));

export const marshalListQueriesRequestSchema: z.ZodType = z
  .object({
    filterBy: z.lazy(() => marshalQueryFilterSchema).optional(),
    maxResults: z.number().optional(),
    pageToken: z.string().optional(),
    includeMetrics: z.boolean().optional(),
  })
  .transform(d => ({
    filter_by: d.filterBy,
    max_results: d.maxResults,
    page_token: d.pageToken,
    include_metrics: d.includeMetrics,
  }));

export const marshalListQueriesResponseSchema: z.ZodType = z
  .object({
    nextPageToken: z.string().optional(),
    hasNextPage: z.boolean().optional(),
    res: z.array(z.lazy(() => marshalQueryInfoSchema)).optional(),
  })
  .transform(d => ({
    next_page_token: d.nextPageToken,
    has_next_page: d.hasNextPage,
    res: d.res,
  }));

export const marshalQueryFilterSchema: z.ZodType = z
  .object({
    queryStartTimeRange: z.lazy(() => marshalTimeRangeSchema).optional(),
    userIds: z.array(z.bigint()).optional(),
    statuses: z.array(z.string()).optional(),
    warehouseIds: z.array(z.string()).optional(),
    statementIds: z.array(z.string()).optional(),
  })
  .transform(d => ({
    query_start_time_range: d.queryStartTimeRange,
    user_ids: d.userIds,
    statuses: d.statuses,
    warehouse_ids: d.warehouseIds,
    statement_ids: d.statementIds,
  }));

export const marshalQueryInfoSchema: z.ZodType = z
  .object({
    queryId: z.string().optional(),
    status: z.string().optional(),
    queryText: z.string().optional(),
    queryStartTimeMs: z.bigint().optional(),
    executionEndTimeMs: z.bigint().optional(),
    queryEndTimeMs: z.bigint().optional(),
    userId: z.bigint().optional(),
    userName: z.string().optional(),
    sparkUiUrl: z.string().optional(),
    endpointId: z.string().optional(),
    rowsProduced: z.bigint().optional(),
    errorMessage: z.string().optional(),
    lookupKey: z.string().optional(),
    metrics: z.lazy(() => marshalQueryMetricsSchema).optional(),
    executedAsUserId: z.bigint().optional(),
    executedAsUserName: z.string().optional(),
    sessionId: z.string().optional(),
    isFinal: z.boolean().optional(),
    channelUsed: z.lazy(() => marshalChannelInfoSchema).optional(),
    plansState: z.string().optional(),
    statementType: z.string().optional(),
    warehouseId: z.string().optional(),
    duration: z.bigint().optional(),
    clientApplication: z.string().optional(),
    querySource: z.lazy(() => marshalExternalQuerySourceSchema).optional(),
    cacheQueryId: z.string().optional(),
    queryTags: z.array(z.lazy(() => marshalQueryTagSchema)).optional(),
  })
  .transform(d => ({
    query_id: d.queryId,
    status: d.status,
    query_text: d.queryText,
    query_start_time_ms: d.queryStartTimeMs,
    execution_end_time_ms: d.executionEndTimeMs,
    query_end_time_ms: d.queryEndTimeMs,
    user_id: d.userId,
    user_name: d.userName,
    spark_ui_url: d.sparkUiUrl,
    endpoint_id: d.endpointId,
    rows_produced: d.rowsProduced,
    error_message: d.errorMessage,
    lookup_key: d.lookupKey,
    metrics: d.metrics,
    executed_as_user_id: d.executedAsUserId,
    executed_as_user_name: d.executedAsUserName,
    session_id: d.sessionId,
    is_final: d.isFinal,
    channel_used: d.channelUsed,
    plans_state: d.plansState,
    statement_type: d.statementType,
    warehouse_id: d.warehouseId,
    duration: d.duration,
    client_application: d.clientApplication,
    query_source: d.querySource,
    cache_query_id: d.cacheQueryId,
    query_tags: d.queryTags,
  }));

export const marshalQueryMetricsSchema: z.ZodType = z
  .object({
    totalTimeMs: z.bigint().optional(),
    readBytes: z.bigint().optional(),
    rowsProducedCount: z.bigint().optional(),
    compilationTimeMs: z.bigint().optional(),
    executionTimeMs: z.bigint().optional(),
    readRemoteBytes: z.bigint().optional(),
    writeRemoteBytes: z.bigint().optional(),
    readCacheBytes: z.bigint().optional(),
    spillToDiskBytes: z.bigint().optional(),
    taskTotalTimeMs: z.bigint().optional(),
    readFilesCount: z.bigint().optional(),
    readPartitionsCount: z.bigint().optional(),
    photonTotalTimeMs: z.bigint().optional(),
    rowsReadCount: z.bigint().optional(),
    resultFetchTimeMs: z.bigint().optional(),
    networkSentBytes: z.bigint().optional(),
    resultFromCache: z.boolean().optional(),
    prunedBytes: z.bigint().optional(),
    prunedFilesCount: z.bigint().optional(),
    provisioningQueueStartTimestamp: z.bigint().optional(),
    overloadingQueueStartTimestamp: z.bigint().optional(),
    queryCompilationStartTimestamp: z.bigint().optional(),
    taskTimeOverTimeRange: z
      .lazy(() => marshalTaskTimeOverRangeSchema)
      .optional(),
    workToBeDone: z.bigint().optional(),
    runnableTasks: z.bigint().optional(),
    projectedRemainingTaskTotalTimeMs: z.bigint().optional(),
    remainingTaskCount: z.bigint().optional(),
    projectedRemainingWallclockTimeMs: z.bigint().optional(),
    readFilesBytes: z.bigint().optional(),
  })
  .transform(d => ({
    total_time_ms: d.totalTimeMs,
    read_bytes: d.readBytes,
    rows_produced_count: d.rowsProducedCount,
    compilation_time_ms: d.compilationTimeMs,
    execution_time_ms: d.executionTimeMs,
    read_remote_bytes: d.readRemoteBytes,
    write_remote_bytes: d.writeRemoteBytes,
    read_cache_bytes: d.readCacheBytes,
    spill_to_disk_bytes: d.spillToDiskBytes,
    task_total_time_ms: d.taskTotalTimeMs,
    read_files_count: d.readFilesCount,
    read_partitions_count: d.readPartitionsCount,
    photon_total_time_ms: d.photonTotalTimeMs,
    rows_read_count: d.rowsReadCount,
    result_fetch_time_ms: d.resultFetchTimeMs,
    network_sent_bytes: d.networkSentBytes,
    result_from_cache: d.resultFromCache,
    pruned_bytes: d.prunedBytes,
    pruned_files_count: d.prunedFilesCount,
    provisioning_queue_start_timestamp: d.provisioningQueueStartTimestamp,
    overloading_queue_start_timestamp: d.overloadingQueueStartTimestamp,
    query_compilation_start_timestamp: d.queryCompilationStartTimestamp,
    task_time_over_time_range: d.taskTimeOverTimeRange,
    work_to_be_done: d.workToBeDone,
    runnable_tasks: d.runnableTasks,
    projected_remaining_task_total_time_ms: d.projectedRemainingTaskTotalTimeMs,
    remaining_task_count: d.remainingTaskCount,
    projected_remaining_wallclock_time_ms: d.projectedRemainingWallclockTimeMs,
    read_files_bytes: d.readFilesBytes,
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

export const marshalTaskTimeOverRangeSchema: z.ZodType = z
  .object({
    entries: z
      .array(z.lazy(() => marshalTaskTimeOverRangeEntrySchema))
      .optional(),
    interval: z.bigint().optional(),
  })
  .transform(d => ({
    entries: d.entries,
    interval: d.interval,
  }));

export const marshalTaskTimeOverRangeEntrySchema: z.ZodType = z
  .object({
    taskCompletedTimeMs: z.bigint().optional(),
  })
  .transform(d => ({
    task_completed_time_ms: d.taskCompletedTimeMs,
  }));

export const marshalTimeRangeSchema: z.ZodType = z
  .object({
    startTimeMs: z.bigint().optional(),
    endTimeMs: z.bigint().optional(),
  })
  .transform(d => ({
    start_time_ms: d.startTimeMs,
    end_time_ms: d.endTimeMs,
  }));
