// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {LroOptions} from '@databricks/sdk-options/lro';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  executeWait,
  StillRunningError,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  BaseJob,
  BaseRun,
  CancelAllRunsRequest,
  CancelAllRunsResponse,
  CancelRunRequest,
  CancelRunResponse,
  CreateJobRequest,
  CreateJobResponse,
  DeleteJobRequest,
  DeleteJobResponse,
  DeleteRunRequest,
  DeleteRunResponse,
  EnforcePolicyComplianceForJob,
  EnforcePolicyComplianceResponse,
  ExportRunRequest,
  ExportRunResponse,
  GetJobRequest,
  GetJobResponse,
  GetPolicyComplianceForJob,
  GetPolicyComplianceForJobResponse,
  GetRunOutputRequest,
  GetRunOutputResponse,
  GetRunRequest,
  GetRunResponse,
  ListJobComplianceForPolicy,
  ListJobComplianceForPolicy_JobCompliance,
  ListJobComplianceResponse,
  ListJobsRequest,
  ListJobsResponse,
  ListRunsRequest,
  ListRunsResponse,
  RepairRunRequest,
  RepairRunResponse,
  ResetJobRequest,
  ResetJobResponse,
  RunNowRequest,
  RunNowResponse,
  SubmitRunRequest,
  SubmitRunResponse,
  UpdateJobRequest,
  UpdateJobResponse,
} from './model';
import {
  RunLifeCycleState_RunLifeCycleState,
  marshalCancelAllRunsRequestSchema,
  marshalCancelRunRequestSchema,
  marshalCreateJobRequestSchema,
  marshalDeleteJobRequestSchema,
  marshalDeleteRunRequestSchema,
  marshalEnforcePolicyComplianceForJobSchema,
  marshalRepairRunRequestSchema,
  marshalResetJobRequestSchema,
  marshalRunNowRequestSchema,
  marshalSubmitRunRequestSchema,
  marshalUpdateJobRequestSchema,
  unmarshalCancelAllRunsResponseSchema,
  unmarshalCancelRunResponseSchema,
  unmarshalCreateJobResponseSchema,
  unmarshalDeleteJobResponseSchema,
  unmarshalDeleteRunResponseSchema,
  unmarshalEnforcePolicyComplianceResponseSchema,
  unmarshalExportRunResponseSchema,
  unmarshalGetJobResponseSchema,
  unmarshalGetPolicyComplianceForJobResponseSchema,
  unmarshalGetRunOutputResponseSchema,
  unmarshalGetRunResponseSchema,
  unmarshalListJobComplianceResponseSchema,
  unmarshalListJobsResponseSchema,
  unmarshalListRunsResponseSchema,
  unmarshalRepairRunResponseSchema,
  unmarshalResetJobResponseSchema,
  unmarshalRunNowResponseSchema,
  unmarshalSubmitRunResponseSchema,
  unmarshalUpdateJobResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class JobsClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /**
   * Updates a job so the job clusters that are created when running
   * the job (specified in `new_cluster`) are compliant with the
   * current versions of their respective cluster policies.
   * All-purpose clusters used in the job will not be updated.
   */
  async enforcePolicyComplianceForJob(
    req: EnforcePolicyComplianceForJob,
    options?: CallOptions
  ): Promise<EnforcePolicyComplianceResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/jobs/enforce-compliance`;
    const body = marshalRequest(
      req,
      marshalEnforcePolicyComplianceForJobSchema
    );
    let resp: EnforcePolicyComplianceResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalEnforcePolicyComplianceResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the policy compliance status of a job. Jobs could be out of
   * compliance if a cluster policy they use was updated after the job was
   * last edited and some of its job clusters no longer comply with
   * their updated policies.
   */
  async getPolicyComplianceForJob(
    req: GetPolicyComplianceForJob,
    options?: CallOptions
  ): Promise<GetPolicyComplianceForJobResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/jobs/get-compliance`;
    const params = new URLSearchParams();
    if (req.jobId !== undefined) {
      params.append('job_id', String(req.jobId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetPolicyComplianceForJobResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPolicyComplianceForJobResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Returns the policy compliance status of all jobs that use a
   * given policy. Jobs could be out of compliance if a cluster policy they
   * use was updated after the job was last edited and its job
   * clusters no longer comply with the updated policy.
   */
  async listJobComplianceForPolicy(
    req: ListJobComplianceForPolicy,
    options?: CallOptions
  ): Promise<ListJobComplianceResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/policies/jobs/list-compliance`;
    const params = new URLSearchParams();
    if (req.policyId !== undefined) {
      params.append('policy_id', req.policyId);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListJobComplianceResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListJobComplianceResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listJobComplianceForPolicyIter(
    req: ListJobComplianceForPolicy,
    options?: CallOptions
  ): AsyncGenerator<ListJobComplianceForPolicy_JobCompliance> {
    const pageReq: ListJobComplianceForPolicy = {...req};
    for (;;) {
      const resp = await this.listJobComplianceForPolicy(pageReq, options);
      for (const item of resp.jobs ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Cancels all active runs of a job. The runs are canceled asynchronously, so it doesn't
   * prevent new runs from being started.
   */
  async cancelAllRuns(
    req: CancelAllRunsRequest,
    options?: CallOptions
  ): Promise<CancelAllRunsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/jobs/runs/cancel-all`;
    const body = marshalRequest(req, marshalCancelAllRunsRequestSchema);
    let resp: CancelAllRunsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCancelAllRunsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Cancels a job run or a task run. The run is canceled asynchronously, so it may still be running when
   * this request completes.
   */
  private async cancelRunBase(
    req: CancelRunRequest,
    options?: CallOptions
  ): Promise<CancelRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/jobs/runs/cancel`;
    const body = marshalRequest(req, marshalCancelRunRequestSchema);
    let resp: CancelRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCancelRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Cancels a job run or a task run. The run is canceled asynchronously, so it may still be running when
   * this request completes.
   */
  async cancelRun(
    req: CancelRunRequest,
    options?: CallOptions
  ): Promise<CancelRunWaiter> {
    await this.cancelRunBase(req, options);
    if (req.runId === undefined) {
      throw new Error('request field runId required for polling is missing');
    }
    return new CancelRunWaiter(this, req.runId);
  }

  /** Create a new job. */
  async createJob(
    req: CreateJobRequest,
    options?: CallOptions
  ): Promise<CreateJobResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/jobs/create`;
    const body = marshalRequest(req, marshalCreateJobRequestSchema);
    let resp: CreateJobResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateJobResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a job. */
  async deleteJob(
    req: DeleteJobRequest,
    options?: CallOptions
  ): Promise<DeleteJobResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/jobs/delete`;
    const body = marshalRequest(req, marshalDeleteJobRequestSchema);
    let resp: DeleteJobResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteJobResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a non-active run. Returns an error if the run is active. */
  async deleteRun(
    req: DeleteRunRequest,
    options?: CallOptions
  ): Promise<DeleteRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/jobs/runs/delete`;
    const body = marshalRequest(req, marshalDeleteRunRequestSchema);
    let resp: DeleteRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Export and retrieve the job run task. */
  async exportRun(
    req: ExportRunRequest,
    options?: CallOptions
  ): Promise<ExportRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.2/jobs/runs/export`;
    const params = new URLSearchParams();
    if (req.runId !== undefined) {
      params.append('run_id', String(req.runId));
    }
    if (req.viewsToExport !== undefined) {
      params.append('views_to_export', req.viewsToExport);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ExportRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalExportRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Retrieves the details for a single job.
   *
   * Large arrays in the results will be paginated when they exceed 100 elements.
   * A request for a single job will return all properties for that job, and the first 100 elements of array properties (`tasks`, `job_clusters`, `environments` and `parameters`).
   * Use the `next_page_token` field to check for more results and pass its value as the `page_token` in subsequent requests.
   * If any array properties have more than 100 elements, additional results will be returned on subsequent requests. Arrays without additional results will be empty on later pages.
   */
  async getJob(
    req: GetJobRequest,
    options?: CallOptions
  ): Promise<GetJobResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.2/jobs/get`;
    const params = new URLSearchParams();
    if (req.jobId !== undefined) {
      params.append('job_id', String(req.jobId));
    }
    if (req.includeTriggerState !== undefined) {
      params.append('include_trigger_state', String(req.includeTriggerState));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetJobResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetJobResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Retrieves the metadata of a run.
   *
   * Large arrays in the results will be paginated when they exceed 100 elements.
   * A request for a single run will return all properties for that run, and the first 100 elements of array properties (`tasks`, `job_clusters`, `job_parameters` and `repair_history`).
   * Use the next_page_token field to check for more results and pass its value as the page_token in subsequent requests.
   * If any array properties have more than 100 elements, additional results will be returned on subsequent requests. Arrays without additional results will be empty on later pages.
   */
  async getRun(
    req: GetRunRequest,
    options?: CallOptions
  ): Promise<GetRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.2/jobs/runs/get`;
    const params = new URLSearchParams();
    if (req.runId !== undefined) {
      params.append('run_id', String(req.runId));
    }
    if (req.includeHistory !== undefined) {
      params.append('include_history', String(req.includeHistory));
    }
    if (req.includeResolvedValues !== undefined) {
      params.append(
        'include_resolved_values',
        String(req.includeResolvedValues)
      );
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Retrieve the output and metadata of a single task run. When a notebook task returns
   * a value through the `dbutils.notebook.exit()` call, you can use this endpoint to retrieve
   * that value. <Databricks> restricts this API to returning the first 5 MB of the output.
   * To return a larger result, you can store job results in a cloud storage service.
   *
   * This endpoint validates that the __run_id__ parameter is valid and returns an HTTP status
   * code 400 if the __run_id__ parameter is invalid. Runs are automatically removed after
   * 60 days. If you to want to reference them beyond 60 days, you must save old run results
   * before they expire.
   */
  async getRunOutput(
    req: GetRunOutputRequest,
    options?: CallOptions
  ): Promise<GetRunOutputResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.2/jobs/runs/get-output`;
    const params = new URLSearchParams();
    if (req.runId !== undefined) {
      params.append('run_id', String(req.runId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetRunOutputResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetRunOutputResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves a list of jobs. */
  async listJobs(
    req: ListJobsRequest,
    options?: CallOptions
  ): Promise<ListJobsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.2/jobs/list`;
    const params = new URLSearchParams();
    if (req.offset !== undefined) {
      params.append('offset', String(req.offset));
    }
    if (req.limit !== undefined) {
      params.append('limit', String(req.limit));
    }
    if (req.expandTasks !== undefined) {
      params.append('expand_tasks', String(req.expandTasks));
    }
    if (req.name !== undefined) {
      params.append('name', req.name);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListJobsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListJobsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listJobsIter(
    req: ListJobsRequest,
    options?: CallOptions
  ): AsyncGenerator<BaseJob> {
    const pageReq: ListJobsRequest = {...req};
    for (;;) {
      const resp = await this.listJobs(pageReq, options);
      for (const item of resp.jobs ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List runs in descending order by start time. */
  async listRuns(
    req: ListRunsRequest,
    options?: CallOptions
  ): Promise<ListRunsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.2/jobs/runs/list`;
    const params = new URLSearchParams();
    if (req.jobId !== undefined) {
      params.append('job_id', String(req.jobId));
    }
    if (req.stateConstraint?.$case === 'activeOnly') {
      params.append('active_only', String(req.stateConstraint.activeOnly));
    }
    if (req.stateConstraint?.$case === 'completedOnly') {
      params.append(
        'completed_only',
        String(req.stateConstraint.completedOnly)
      );
    }
    if (req.offset !== undefined) {
      params.append('offset', String(req.offset));
    }
    if (req.limit !== undefined) {
      params.append('limit', String(req.limit));
    }
    if (req.runType !== undefined) {
      params.append('run_type', req.runType);
    }
    if (req.expandTasks !== undefined) {
      params.append('expand_tasks', String(req.expandTasks));
    }
    if (req.startTimeFrom !== undefined) {
      params.append('start_time_from', String(req.startTimeFrom));
    }
    if (req.startTimeTo !== undefined) {
      params.append('start_time_to', String(req.startTimeTo));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListRunsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListRunsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listRunsIter(
    req: ListRunsRequest,
    options?: CallOptions
  ): AsyncGenerator<BaseRun> {
    const pageReq: ListRunsRequest = {...req};
    for (;;) {
      const resp = await this.listRuns(pageReq, options);
      for (const item of resp.runs ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Re-run one or more tasks. Tasks are re-run as part of the original job run.
   * They use the current job and task settings, and can be viewed in the history for the
   * original job run.
   */
  private async repairBase(
    req: RepairRunRequest,
    options?: CallOptions
  ): Promise<RepairRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/jobs/runs/repair`;
    const body = marshalRequest(req, marshalRepairRunRequestSchema);
    let resp: RepairRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRepairRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Re-run one or more tasks. Tasks are re-run as part of the original job run.
   * They use the current job and task settings, and can be viewed in the history for the
   * original job run.
   */
  async repair(
    req: RepairRunRequest,
    options?: CallOptions
  ): Promise<RepairWaiter> {
    await this.repairBase(req, options);
    if (req.runId === undefined) {
      throw new Error('request field runId required for polling is missing');
    }
    return new RepairWaiter(this, req.runId);
  }

  /** Overwrite all settings for the given job. Use the [_Update_ endpoint](:method:jobs/update) to update job settings partially. */
  async resetJob(
    req: ResetJobRequest,
    options?: CallOptions
  ): Promise<ResetJobResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/jobs/reset`;
    const body = marshalRequest(req, marshalResetJobRequestSchema);
    let resp: ResetJobResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResetJobResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Run a job and return the `run_id` of the triggered run. */
  private async runNowBase(
    req: RunNowRequest,
    options?: CallOptions
  ): Promise<RunNowResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/jobs/run-now`;
    const body = marshalRequest(req, marshalRunNowRequestSchema);
    let resp: RunNowResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRunNowResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Run a job and return the `run_id` of the triggered run. */
  async runNow(
    req: RunNowRequest,
    options?: CallOptions
  ): Promise<RunNowWaiter> {
    const resp = await this.runNowBase(req, options);
    if (resp.runId === undefined) {
      throw new Error('response field runId required for polling is missing');
    }
    return new RunNowWaiter(this, resp.runId);
  }

  /**
   * Submit a one-time run. This endpoint allows you to submit a workload directly
   * without creating a job. Runs submitted using this endpoint don’t display in
   * the UI. Use the `jobs/runs/get` API to check the run state after the job is
   * submitted.
   *
   * **Important:** Jobs submitted using this endpoint are not saved as a job.
   * They do not show up in the Jobs UI, and do not retry when they fail. Because
   * they are not saved, <Databricks> cannot auto-optimize serverless compute in case
   * of failure. If your job fails, you may want to use classic compute to specify
   * the compute needs for the job. Alternatively, use the `POST /jobs/create` and
   * `POST /jobs/run-now` endpoints to create and run a saved job.
   */
  private async submitRunBase(
    req: SubmitRunRequest,
    options?: CallOptions
  ): Promise<SubmitRunResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/jobs/runs/submit`;
    const body = marshalRequest(req, marshalSubmitRunRequestSchema);
    let resp: SubmitRunResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSubmitRunResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Submit a one-time run. This endpoint allows you to submit a workload directly
   * without creating a job. Runs submitted using this endpoint don’t display in
   * the UI. Use the `jobs/runs/get` API to check the run state after the job is
   * submitted.
   *
   * **Important:** Jobs submitted using this endpoint are not saved as a job.
   * They do not show up in the Jobs UI, and do not retry when they fail. Because
   * they are not saved, <Databricks> cannot auto-optimize serverless compute in case
   * of failure. If your job fails, you may want to use classic compute to specify
   * the compute needs for the job. Alternatively, use the `POST /jobs/create` and
   * `POST /jobs/run-now` endpoints to create and run a saved job.
   */
  async submitRun(
    req: SubmitRunRequest,
    options?: CallOptions
  ): Promise<SubmitRunWaiter> {
    const resp = await this.submitRunBase(req, options);
    if (resp.runId === undefined) {
      throw new Error('response field runId required for polling is missing');
    }
    return new SubmitRunWaiter(this, resp.runId);
  }

  /** Add, update, or remove specific settings of an existing job. Use the [_Reset_ endpoint](:method:jobs/reset) to overwrite all job settings. */
  async updateJob(
    req: UpdateJobRequest,
    options?: CallOptions
  ): Promise<UpdateJobResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/jobs/update`;
    const body = marshalRequest(req, marshalUpdateJobRequestSchema);
    let resp: UpdateJobResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateJobResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}

export class CancelRunWaiter {
  constructor(
    private readonly client: JobsClient,
    readonly runId: bigint
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetRunResponse> {
    let result: GetRunResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getRun(
        {
          runId: this.runId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state?.lifeCycleState;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case RunLifeCycleState_RunLifeCycleState.TERMINATED:
        case RunLifeCycleState_RunLifeCycleState.SKIPPED:
          result = pollResp;
          return;
        case RunLifeCycleState_RunLifeCycleState.INTERNAL_ERROR: {
          const msg = pollResp.state?.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getRun(
      {
        runId: this.runId,
      },
      options
    );

    const status = pollResp.state?.lifeCycleState;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case RunLifeCycleState_RunLifeCycleState.TERMINATED:
      case RunLifeCycleState_RunLifeCycleState.SKIPPED:
      case RunLifeCycleState_RunLifeCycleState.INTERNAL_ERROR:
        return true;
      default:
        return false;
    }
  }
}

export class RepairWaiter {
  constructor(
    private readonly client: JobsClient,
    readonly runId: bigint
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetRunResponse> {
    let result: GetRunResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getRun(
        {
          runId: this.runId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state?.lifeCycleState;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case RunLifeCycleState_RunLifeCycleState.TERMINATED:
        case RunLifeCycleState_RunLifeCycleState.SKIPPED:
          result = pollResp;
          return;
        case RunLifeCycleState_RunLifeCycleState.INTERNAL_ERROR: {
          const msg = pollResp.state?.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getRun(
      {
        runId: this.runId,
      },
      options
    );

    const status = pollResp.state?.lifeCycleState;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case RunLifeCycleState_RunLifeCycleState.TERMINATED:
      case RunLifeCycleState_RunLifeCycleState.SKIPPED:
      case RunLifeCycleState_RunLifeCycleState.INTERNAL_ERROR:
        return true;
      default:
        return false;
    }
  }
}

export class RunNowWaiter {
  constructor(
    private readonly client: JobsClient,
    readonly runId: bigint
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetRunResponse> {
    let result: GetRunResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getRun(
        {
          runId: this.runId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state?.lifeCycleState;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case RunLifeCycleState_RunLifeCycleState.TERMINATED:
        case RunLifeCycleState_RunLifeCycleState.SKIPPED:
          result = pollResp;
          return;
        case RunLifeCycleState_RunLifeCycleState.INTERNAL_ERROR: {
          const msg = pollResp.state?.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getRun(
      {
        runId: this.runId,
      },
      options
    );

    const status = pollResp.state?.lifeCycleState;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case RunLifeCycleState_RunLifeCycleState.TERMINATED:
      case RunLifeCycleState_RunLifeCycleState.SKIPPED:
      case RunLifeCycleState_RunLifeCycleState.INTERNAL_ERROR:
        return true;
      default:
        return false;
    }
  }
}

export class SubmitRunWaiter {
  constructor(
    private readonly client: JobsClient,
    readonly runId: bigint
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetRunResponse> {
    let result: GetRunResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getRun(
        {
          runId: this.runId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state?.lifeCycleState;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case RunLifeCycleState_RunLifeCycleState.TERMINATED:
        case RunLifeCycleState_RunLifeCycleState.SKIPPED:
          result = pollResp;
          return;
        case RunLifeCycleState_RunLifeCycleState.INTERNAL_ERROR: {
          const msg = pollResp.state?.stateMessage ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getRun(
      {
        runId: this.runId,
      },
      options
    );

    const status = pollResp.state?.lifeCycleState;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case RunLifeCycleState_RunLifeCycleState.TERMINATED:
      case RunLifeCycleState_RunLifeCycleState.SKIPPED:
      case RunLifeCycleState_RunLifeCycleState.INTERNAL_ERROR:
        return true;
      default:
        return false;
    }
  }
}
