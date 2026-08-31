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
   * An optional filter object to limit query history results. Accepts parameters such as user IDs, endpoint IDs, and statuses to narrow the returned data.
   * In a URL, the parameters of this filter are specified with dot notation. For example: `filter_by.statement_ids`.
   */
  filterBy?: QueryFilter | undefined;
  /** Limit the number of results returned in one page. Must be less than 1000 and the default is 100. */
  maxResults?: number | undefined;
  /**
   * A token that can be used to get the next page of results. The token can contains characters that need to be encoded before using it in a URL.
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
  /** The query ID. */
  queryId?: string | undefined;
  /**
   * Query status with one the following values:
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
  /** The time the query started. */
  queryStartTimeMs?: bigint | undefined;
  /** The time execution of the query ended. */
  executionEndTimeMs?: bigint | undefined;
  /** The time the query ended. */
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
  /** Metrics about query execution. */
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
  /** Whether more updates for the query are expected. */
  isFinal?: boolean | undefined;
  /** SQL Warehouse channel information at the time of query execution */
  channelUsed?: ChannelInfo | undefined;
  /** Whether plans exist for the execution, or the reason why they are missing */
  plansState?: PlansState | undefined;
  /** Type of statement for this query */
  statementType?: QueryStatementType | undefined;
  /** Warehouse ID. */
  warehouseId?: string | undefined;
  /**
   * Total time of the statement execution. This value does not include the time taken to retrieve the results, which
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
  /** The ID of the cached query if this result retrieved from cache */
  cacheQueryId?: string | undefined;
  /** A query execution can be optionally annotated with query tags */
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
  /** Size pf persistent data written to cloud object storage in your cloud tenant, in bytes. */
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
   * Timestamp of when the query was enqueued waiting for a cluster to be provisioned for the warehouse.
   * This field is optional and will not appear if the query skipped the provisioning queue.
   */
  provisioningQueueStartTimestamp?: bigint | undefined;
  /**
   * Timestamp of when the query was enqueued waiting while the warehouse was at max load.
   * This field is optional and will not appear if the query skipped the overloading queue.
   */
  overloadingQueueStartTimestamp?: bigint | undefined;
  /** Timestamp of when the underlying compute started compilation of the query. */
  queryCompilationStartTimestamp?: bigint | undefined;
  /**
   * sum of task times completed in a range of wall clock time, approximated to a configurable number of points
   * aggregated over all stages and jobs in the query (based on task_total_time_ms)
   */
  taskTimeOverTimeRange?: TaskTimeOverRange | undefined;
  /**
   * remaining work to be done across all stages in the query, calculated by autoscaler StatementAnalysis.scala, in milliseconds
   * deprecated: using projected_remaining_task_total_time_ms instead
   */
  workToBeDone?: bigint | undefined;
  /**
   * number of remaining tasks to complete, calculated by autoscaler StatementAnalysis.scala
   * deprecated: use remaining_task_count instead
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
  key: string;
  value?: string | undefined;
}

export interface TaskTimeOverRange {
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
  /** The start time in milliseconds. */
  startTimeMs?: bigint | undefined;
  /** The end time in milliseconds. */
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
        .optional(),
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
    metrics: z.lazy(() => unmarshalQueryMetricsSchema).optional(),
    executed_as_user_id: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    executed_as_user_name: z.string().optional(),
    session_id: z.string().optional(),
    is_final: z.boolean().optional(),
    channel_used: z.lazy(() => unmarshalChannelInfoSchema).optional(),
    plans_state: z.string().optional(),
    statement_type: z.string().optional(),
    warehouse_id: z.string().optional(),
    duration: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    client_application: z.string().optional(),
    query_source: z.lazy(() => unmarshalExternalQuerySourceSchema).optional(),
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
      .optional(),
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
    key: z.string(),
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

export const marshalTimeRangeSchema: z.ZodType = z
  .object({
    startTimeMs: z.bigint().optional(),
    endTimeMs: z.bigint().optional(),
  })
  .transform(d => ({
    start_time_ms: d.startTimeMs,
    end_time_ms: d.endTimeMs,
  }));
