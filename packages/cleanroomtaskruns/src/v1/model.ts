// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/**
 * Copied from elastic-spark-common/api/messages/runs.proto.
 * Using the original definition to remove coupling with jobs API definition
 */
export enum CleanRoomTaskRunLifeCycleState {
  RUN_LIFE_CYCLE_STATE_UNSPECIFIED = 'RUN_LIFE_CYCLE_STATE_UNSPECIFIED',
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  TERMINATING = 'TERMINATING',
  TERMINATED = 'TERMINATED',
  SKIPPED = 'SKIPPED',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  BLOCKED = 'BLOCKED',
  WAITING_FOR_RETRY = 'WAITING_FOR_RETRY',
  QUEUED = 'QUEUED',
}

/**
 * Copied from elastic-spark-common/api/messages/runs.proto.
 * Using the original definition to avoid cyclic dependency.
 */
export enum CleanRoomTaskRunResultState {
  RUN_RESULT_STATE_UNSPECIFIED = 'RUN_RESULT_STATE_UNSPECIFIED',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  TIMEDOUT = 'TIMEDOUT',
  CANCELED = 'CANCELED',
  MAXIMUM_CONCURRENT_RUNS_REACHED = 'MAXIMUM_CONCURRENT_RUNS_REACHED',
  UPSTREAM_CANCELED = 'UPSTREAM_CANCELED',
  UPSTREAM_FAILED = 'UPSTREAM_FAILED',
  EXCLUDED = 'EXCLUDED',
  EVICTED = 'EVICTED',
  SUCCESS_WITH_FAILURES = 'SUCCESS_WITH_FAILURES',
  UPSTREAM_EVICTED = 'UPSTREAM_EVICTED',
  /** 12 is reserved for previously used SUCCESS_WITH_SKIPPED_CELLS */
  DISABLED = 'DISABLED',
}

/** Stores information about a single task run. */
export interface CleanRoomNotebookTaskRun {
  /** Asset name of the notebook executed in this task run. */
  notebookName?: string | undefined;
  /** When the task run started, in epoch milliseconds. */
  startTime?: number | undefined;
  /** Duration of the task run, in milliseconds. */
  runDuration?: number | undefined;
  /** State of the task run. */
  notebookJobRunState?: CleanRoomTaskRunState | undefined;
  /**
   * Job run info of the task in the runner's local workspace.
   * This field is only included in the LIST API.
   * if the task was run within the same workspace the API is being called.
   * If the task run was in a different workspace under the same metastore, only the workspace_id is included.
   */
  collaboratorJobRunInfo?: CollaboratorJobRunInfo | undefined;
  /** Name of the output schema associated with the clean rooms notebook task run. */
  outputSchemaName?: string | undefined;
  /** Expiration time of the output schema of the task run (if any), in epoch milliseconds. */
  outputSchemaExpirationTime?: number | undefined;
  /** Etag of the notebook executed in this task run, used to identify the notebook version. */
  notebookEtag?: string | undefined;
  /** The timestamp of when the notebook was last updated. */
  notebookUpdatedAt?: number | undefined;
  /**
   * Name of the shared output schema associated with the clean rooms notebook task run.
   * This schema is accessible by all collaborators when enable_shared_output is true.
   */
  sharedOutputSchemaName?: string | undefined;
  /** Expiration time of the shared output schema of the task run (if any), in epoch milliseconds. */
  sharedOutputSchemaExpirationTime?: number | undefined;
}

/** Stores the run state of the clean rooms notebook task. */
export interface CleanRoomTaskRunState {
  /** A value indicating the run's current lifecycle state. This field is always available in the response. Note: Additional states might be introduced in future releases. */
  lifeCycleState?: CleanRoomTaskRunLifeCycleState | undefined;
  /** A value indicating the run's result. This field is only available for terminal lifecycle states. Note: Additional states might be introduced in future releases. */
  resultState?: CleanRoomTaskRunResultState | undefined;
}

export interface CollaboratorJobRunInfo {
  /** Job ID of the task run in the collaborator's workspace. */
  collaboratorJobId?: number | undefined;
  /** Job run ID of the task run in the collaborator's workspace. */
  collaboratorJobRunId?: number | undefined;
  /** Task run ID of the task run in the collaborator's workspace. */
  collaboratorTaskRunId?: number | undefined;
  /** ID of the collaborator's workspace that triggered the task run. */
  collaboratorWorkspaceId?: number | undefined;
  /** Alias of the collaborator that triggered the task run. */
  collaboratorAlias?: string | undefined;
}

export interface ListCleanRoomNotebookTaskRunsRequest {
  /** Name of the clean room. */
  cleanRoomName?: string | undefined;
  /** Notebook name */
  notebookName?: string | undefined;
  /** The maximum number of task runs to return. Currently ignored - all runs will be returned. */
  pageSize?: number | undefined;
  /** Opaque pagination token to go to next page based on previous query. */
  pageToken?: string | undefined;
}

export interface ListCleanRoomNotebookTaskRunsResponse {
  /** Name of the clean room. */
  runs?: CleanRoomNotebookTaskRun[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * page_token should be set to this value for the next request (for the next page of results).
   */
  nextPageToken?: string | undefined;
}

export const unmarshalCleanRoomNotebookTaskRunSchema: z.ZodType<CleanRoomNotebookTaskRun> =
  z
    .object({
      notebook_name: z.string().optional(),
      start_time: z.number().optional(),
      run_duration: z.number().optional(),
      notebook_job_run_state: z
        .lazy(() => unmarshalCleanRoomTaskRunStateSchema)
        .optional(),
      collaborator_job_run_info: z
        .lazy(() => unmarshalCollaboratorJobRunInfoSchema)
        .optional(),
      output_schema_name: z.string().optional(),
      output_schema_expiration_time: z.number().optional(),
      notebook_etag: z.string().optional(),
      notebook_updated_at: z.number().optional(),
      shared_output_schema_name: z.string().optional(),
      shared_output_schema_expiration_time: z.number().optional(),
    })
    .transform(d => ({
      notebookName: d.notebook_name,
      startTime: d.start_time,
      runDuration: d.run_duration,
      notebookJobRunState: d.notebook_job_run_state,
      collaboratorJobRunInfo: d.collaborator_job_run_info,
      outputSchemaName: d.output_schema_name,
      outputSchemaExpirationTime: d.output_schema_expiration_time,
      notebookEtag: d.notebook_etag,
      notebookUpdatedAt: d.notebook_updated_at,
      sharedOutputSchemaName: d.shared_output_schema_name,
      sharedOutputSchemaExpirationTime: d.shared_output_schema_expiration_time,
    }));

export const unmarshalCleanRoomTaskRunStateSchema: z.ZodType<CleanRoomTaskRunState> =
  z
    .object({
      life_cycle_state: z.enum(CleanRoomTaskRunLifeCycleState).optional(),
      result_state: z.enum(CleanRoomTaskRunResultState).optional(),
    })
    .transform(d => ({
      lifeCycleState: d.life_cycle_state,
      resultState: d.result_state,
    }));

export const unmarshalCollaboratorJobRunInfoSchema: z.ZodType<CollaboratorJobRunInfo> =
  z
    .object({
      collaborator_job_id: z.number().optional(),
      collaborator_job_run_id: z.number().optional(),
      collaborator_task_run_id: z.number().optional(),
      collaborator_workspace_id: z.number().optional(),
      collaborator_alias: z.string().optional(),
    })
    .transform(d => ({
      collaboratorJobId: d.collaborator_job_id,
      collaboratorJobRunId: d.collaborator_job_run_id,
      collaboratorTaskRunId: d.collaborator_task_run_id,
      collaboratorWorkspaceId: d.collaborator_workspace_id,
      collaboratorAlias: d.collaborator_alias,
    }));

export const unmarshalListCleanRoomNotebookTaskRunsResponseSchema: z.ZodType<ListCleanRoomNotebookTaskRunsResponse> =
  z
    .object({
      runs: z
        .array(z.lazy(() => unmarshalCleanRoomNotebookTaskRunSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      runs: d.runs,
      nextPageToken: d.next_page_token,
    }));
