// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call, Options} from '@databricks/sdk-core/api';
import {execute, retryOn} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  BaseJob,
  BaseRun,
  CancelAllRuns,
  CancelAllRuns_Response,
  CancelRun,
  CancelRun_Response,
  CreateJob,
  CreateJob_Response,
  DeleteJob,
  DeleteJob_Response,
  DeleteRun,
  DeleteRun_Response,
  ExportRun,
  ExportRun_Response,
  GetJob,
  GetJob_Response,
  GetRun,
  GetRunOutput,
  GetRunOutput_Response,
  GetRun_Response,
  ListJobs,
  ListJobs_Response,
  ListRuns,
  ListRuns_Response,
  RepairRun,
  RepairRun_Response,
  ResetJob,
  ResetJob_Response,
  RunNow,
  RunNow_Response,
  SubmitRun,
  SubmitRun_Response,
  UpdateJob,
  UpdateJob_Response,
} from './model';
import {
  RunLifeCycleState_RunLifeCycleState,
  marshalCancelAllRunsSchema,
  marshalCancelRunSchema,
  marshalCreateJobSchema,
  marshalDeleteJobSchema,
  marshalDeleteRunSchema,
  marshalRepairRunSchema,
  marshalResetJobSchema,
  marshalRunNowSchema,
  marshalSubmitRunSchema,
  marshalUpdateJobSchema,
  unmarshalCancelAllRuns_ResponseSchema,
  unmarshalCancelRun_ResponseSchema,
  unmarshalCreateJob_ResponseSchema,
  unmarshalDeleteJob_ResponseSchema,
  unmarshalDeleteRun_ResponseSchema,
  unmarshalExportRun_ResponseSchema,
  unmarshalGetJob_ResponseSchema,
  unmarshalGetRunOutput_ResponseSchema,
  unmarshalGetRun_ResponseSchema,
  unmarshalListJobs_ResponseSchema,
  unmarshalListRuns_ResponseSchema,
  unmarshalRepairRun_ResponseSchema,
  unmarshalResetJob_ResponseSchema,
  unmarshalRunNow_ResponseSchema,
  unmarshalSubmitRun_ResponseSchema,
  unmarshalUpdateJob_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

class StillRunningError extends Error {}

export class Client {
  private readonly host: string;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
    let info = createDefault().with(PACKAGE_SEGMENT);
    if (options.credentials !== undefined) {
      info = info
        .with({key: 'sdk-auth', value: AUTH_VERSION})
        .with({key: 'auth', value: options.credentials.name()});
    }
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Cancels all active runs of a job. The runs are canceled asynchronously, so it doesn't
   * prevent new runs from being started.
   */
  async cancelAllRuns(
    signal: AbortSignal | undefined,
    req: CancelAllRuns,
    options?: Options
  ): Promise<CancelAllRuns_Response> {
    const url = `${this.host}/api/2.2/jobs/runs/cancel-all`;
    const body = marshalRequest(req, marshalCancelAllRunsSchema);
    let resp: CancelAllRuns_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCancelAllRuns_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Cancels a job run or a task run. The run is canceled asynchronously, so it may still be running when
   * this request completes.
   */
  async cancelRun(
    signal: AbortSignal | undefined,
    req: CancelRun,
    options?: Options
  ): Promise<CancelRun_Response> {
    const url = `${this.host}/api/2.2/jobs/runs/cancel`;
    const body = marshalRequest(req, marshalCancelRunSchema);
    let resp: CancelRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCancelRun_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async cancelRunWaiter(
    signal: AbortSignal | undefined,
    req: CancelRun,
    options?: Options
  ): Promise<CancelRunWaiter> {
    await this.cancelRun(signal, req, options);
    if (req.runId === undefined) {
      throw new Error('request field runId required for polling is missing');
    }
    return new CancelRunWaiter(this, req.runId);
  }

  /** Create a new job. */
  async createJob(
    signal: AbortSignal | undefined,
    req: CreateJob,
    options?: Options
  ): Promise<CreateJob_Response> {
    const url = `${this.host}/api/2.2/jobs/create`;
    const body = marshalRequest(req, marshalCreateJobSchema);
    let resp: CreateJob_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateJob_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a job. */
  async deleteJob(
    signal: AbortSignal | undefined,
    req: DeleteJob,
    options?: Options
  ): Promise<DeleteJob_Response> {
    const url = `${this.host}/api/2.2/jobs/delete`;
    const body = marshalRequest(req, marshalDeleteJobSchema);
    let resp: DeleteJob_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteJob_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a non-active run. Returns an error if the run is active. */
  async deleteRun(
    signal: AbortSignal | undefined,
    req: DeleteRun,
    options?: Options
  ): Promise<DeleteRun_Response> {
    const url = `${this.host}/api/2.2/jobs/runs/delete`;
    const body = marshalRequest(req, marshalDeleteRunSchema);
    let resp: DeleteRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteRun_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Export and retrieve the job run task. */
  async exportRun(
    signal: AbortSignal | undefined,
    req: ExportRun,
    options?: Options
  ): Promise<ExportRun_Response> {
    const url = `${this.host}/api/2.2/jobs/runs/export`;
    const params = new URLSearchParams();
    if (req.runId !== undefined) {
      params.append('run_id', String(req.runId));
    }
    if (req.viewsToExport !== undefined) {
      params.append('views_to_export', req.viewsToExport);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ExportRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalExportRun_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: GetJob,
    options?: Options
  ): Promise<GetJob_Response> {
    const url = `${this.host}/api/2.2/jobs/get`;
    const params = new URLSearchParams();
    if (req.jobId !== undefined) {
      params.append('job_id', String(req.jobId));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetJob_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetJob_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: GetRun,
    options?: Options
  ): Promise<GetRun_Response> {
    const url = `${this.host}/api/2.2/jobs/runs/get`;
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
    let resp: GetRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetRun_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: GetRunOutput,
    options?: Options
  ): Promise<GetRunOutput_Response> {
    const url = `${this.host}/api/2.2/jobs/runs/get-output`;
    const params = new URLSearchParams();
    if (req.runId !== undefined) {
      params.append('run_id', String(req.runId));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetRunOutput_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetRunOutput_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves a list of jobs. */
  async listJobs(
    signal: AbortSignal | undefined,
    req: ListJobs,
    options?: Options
  ): Promise<ListJobs_Response> {
    const url = `${this.host}/api/2.2/jobs/list`;
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
    let resp: ListJobs_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListJobs_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listJobsIter(
    signal: AbortSignal | undefined,
    req: ListJobs,
    options?: Options
  ): AsyncGenerator<BaseJob> {
    const pageReq: ListJobs = {...req};
    for (;;) {
      const resp = await this.listJobs(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListRuns,
    options?: Options
  ): Promise<ListRuns_Response> {
    const url = `${this.host}/api/2.2/jobs/runs/list`;
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
    let resp: ListRuns_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListRuns_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listRunsIter(
    signal: AbortSignal | undefined,
    req: ListRuns,
    options?: Options
  ): AsyncGenerator<BaseRun> {
    const pageReq: ListRuns = {...req};
    for (;;) {
      const resp = await this.listRuns(signal, pageReq, options);
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
  async repair(
    signal: AbortSignal | undefined,
    req: RepairRun,
    options?: Options
  ): Promise<RepairRun_Response> {
    const url = `${this.host}/api/2.2/jobs/runs/repair`;
    const body = marshalRequest(req, marshalRepairRunSchema);
    let resp: RepairRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRepairRun_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async repairWaiter(
    signal: AbortSignal | undefined,
    req: RepairRun,
    options?: Options
  ): Promise<RepairWaiter> {
    await this.repair(signal, req, options);
    if (req.runId === undefined) {
      throw new Error('request field runId required for polling is missing');
    }
    return new RepairWaiter(this, req.runId);
  }

  /** Overwrite all settings for the given job. Use the [_Update_ endpoint](:method:jobs/update) to update job settings partially. */
  async resetJob(
    signal: AbortSignal | undefined,
    req: ResetJob,
    options?: Options
  ): Promise<ResetJob_Response> {
    const url = `${this.host}/api/2.2/jobs/reset`;
    const body = marshalRequest(req, marshalResetJobSchema);
    let resp: ResetJob_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalResetJob_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Run a job and return the `run_id` of the triggered run. */
  async runNow(
    signal: AbortSignal | undefined,
    req: RunNow,
    options?: Options
  ): Promise<RunNow_Response> {
    const url = `${this.host}/api/2.2/jobs/run-now`;
    const body = marshalRequest(req, marshalRunNowSchema);
    let resp: RunNow_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRunNow_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async runNowWaiter(
    signal: AbortSignal | undefined,
    req: RunNow,
    options?: Options
  ): Promise<RunNowWaiter> {
    const resp = await this.runNow(signal, req, options);
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
  async submitRun(
    signal: AbortSignal | undefined,
    req: SubmitRun,
    options?: Options
  ): Promise<SubmitRun_Response> {
    const url = `${this.host}/api/2.2/jobs/runs/submit`;
    const body = marshalRequest(req, marshalSubmitRunSchema);
    let resp: SubmitRun_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSubmitRun_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async submitRunWaiter(
    signal: AbortSignal | undefined,
    req: SubmitRun,
    options?: Options
  ): Promise<SubmitRunWaiter> {
    const resp = await this.submitRun(signal, req, options);
    if (resp.runId === undefined) {
      throw new Error('response field runId required for polling is missing');
    }
    return new SubmitRunWaiter(this, resp.runId);
  }

  /** Add, update, or remove specific settings of an existing job. Use the [_Reset_ endpoint](:method:jobs/reset) to overwrite all job settings. */
  async updateJob(
    signal: AbortSignal | undefined,
    req: UpdateJob,
    options?: Options
  ): Promise<UpdateJob_Response> {
    const url = `${this.host}/api/2.2/jobs/update`;
    const body = marshalRequest(req, marshalUpdateJobSchema);
    let resp: UpdateJob_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateJob_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class CancelRunWaiter {
  constructor(
    private readonly client: Client,
    readonly runId: number
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetRun_Response> {
    let result: GetRun_Response | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getRun(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getRun(
      signal,
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
    private readonly client: Client,
    readonly runId: number
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetRun_Response> {
    let result: GetRun_Response | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getRun(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getRun(
      signal,
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
    private readonly client: Client,
    readonly runId: number
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetRun_Response> {
    let result: GetRun_Response | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getRun(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getRun(
      signal,
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
    private readonly client: Client,
    readonly runId: number
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetRun_Response> {
    let result: GetRun_Response | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getRun(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getRun(
      signal,
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
