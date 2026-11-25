// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {ClientInfo} from '@databricks/sdk-core/clientinfo';
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
  encodePathVariable,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  executeWait,
  StillRunningError,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import {z} from 'zod';
import type {
  AddProjectFilesRequest,
  AddProjectFilesResponse,
  CancelOperationRequest,
  ConversionRun,
  ConvertProjectFilesRequest,
  ConvertProjectFilesResponse,
  CreateProjectRequest,
  DeleteProjectRequest,
  GetOperationRequest,
  GetProjectFileRequest,
  GetProjectRequest,
  ListProjectFilesRequest,
  ListProjectFilesResponse,
  ListProjectsRequest,
  ListProjectsResponse,
  Operation,
  Project,
  ProjectFile,
  RemoveProjectFilesRequest,
  RemoveProjectFilesResponse,
  ReviewProjectFilesRequest,
  ReviewProjectFilesResponse,
  UnreviewProjectFilesRequest,
  UnreviewProjectFilesResponse,
  UpdateProjectRequest,
} from './model';
import {
  marshalAddProjectFilesRequestSchema,
  marshalCancelOperationRequestSchema,
  marshalConvertProjectFilesRequestSchema,
  marshalProjectSchema,
  marshalRemoveProjectFilesRequestSchema,
  marshalReviewProjectFilesRequestSchema,
  marshalUnreviewProjectFilesRequestSchema,
  unmarshalAddProjectFilesResponseSchema,
  unmarshalConversionRunSchema,
  unmarshalConvertProjectFilesResponseSchema,
  unmarshalListProjectFilesResponseSchema,
  unmarshalListProjectsResponseSchema,
  unmarshalOperationSchema,
  unmarshalProjectFileSchema,
  unmarshalProjectSchema,
  unmarshalRemoveProjectFilesResponseSchema,
  unmarshalReviewProjectFilesResponseSchema,
  unmarshalUnreviewProjectFilesResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class GenieMigrateClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent segments, composed once at construction from createDefault()
  // merged with this package's identity. Each request adds the auth method,
  // which default credentials choose only when they first sign a request.
  private readonly clientInfo: ClientInfo;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    this.clientInfo = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION});
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options, this.clientInfo);
    return this.config;
  }

  /**
   * Adds source files to a migration project. Files that are already in the project are skipped and
   * keep their conversion results.
   */
  async addProjectFiles(
    req: AddProjectFilesRequest,
    options?: CallOptions
  ): Promise<AddProjectFilesResponse> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.name)}/files:add`;
    const body = marshalRequest(req, marshalAddProjectFilesRequestSchema);
    let resp: AddProjectFilesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAddProjectFilesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Requests cancellation of a long-running operation. Requires `CAN_EDIT` permission on the
   * project. Cancellation is best effort: the operation can complete before cancellation takes
   * effect. Call `GetOperation` to see its final state.
   */
  private async cancelOperation(
    req: CancelOperationRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.name ?? '')}/cancel`;
    const body = marshalRequest(req, marshalCancelOperationRequestSchema);
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Converts files of a migration project in a background job. Returns an operation; poll it with
   * `GetOperation`. The operation's metadata is the current `ConversionRun`, with the run's state
   * and the status of each file. When the run completes, the operation's response is a
   * `ConvertProjectFilesResponse`. A failed or cancelled run sets the operation's `error` instead.
   * Files that fail to convert don't fail the run.
   *
   * To stop a conversion, call `CancelOperation`. Cancellation is best effort, and the conversion
   * can complete first. `GetOperation` reports the final outcome.
   */
  private async convertProjectFilesBase(
    req: ConvertProjectFilesRequest,
    options?: CallOptions
  ): Promise<Operation> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.parent)}/files:convert`;
    const body = marshalRequest(req, marshalConvertProjectFilesRequestSchema);
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Converts files of a migration project in a background job. Returns an operation; poll it with
   * `GetOperation`. The operation's metadata is the current `ConversionRun`, with the run's state
   * and the status of each file. When the run completes, the operation's response is a
   * `ConvertProjectFilesResponse`. A failed or cancelled run sets the operation's `error` instead.
   * Files that fail to convert don't fail the run.
   *
   * To stop a conversion, call `CancelOperation`. Cancellation is best effort, and the conversion
   * can complete first. `GetOperation` reports the final outcome.
   */
  async convertProjectFiles(
    req: ConvertProjectFilesRequest,
    options?: CallOptions
  ): Promise<ConvertProjectFilesOperation> {
    const op = await this.convertProjectFilesBase(req, options);
    if (op.name === undefined || op.name === '') {
      throw new Error('invalid operation response: missing operation name');
    }
    return new ConvertProjectFilesOperation(
      op,
      (req, options) => this.getOperation(req, options),
      (req, options) => this.cancelOperation(req, options)
    );
  }

  /**
   * Creates a migration project in a workspace folder. The server assigns the project ID. Add
   * source files to the project with `AddProjectFiles`.
   */
  async createProject(
    req: CreateProjectRequest,
    options?: CallOptions
  ): Promise<Project> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/projects`;
    const body =
      req.project === undefined
        ? 'null'
        : marshalRequest(req.project, marshalProjectSchema);
    let resp: Project | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalProjectSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Moves a migration project to the workspace trash. The project keeps its ID until it's removed
   * from the trash.
   */
  async deleteProject(
    req: DeleteProjectRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.name)}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Gets the latest state of a long-running operation, such as a conversion started by
   * `ConvertProjectFiles`. Operation names have the format
   * `projects/{project_id}/operations/{operation_id}`. Use the full name that the service returned,
   * and treat the operation ID as opaque. Requires `CAN_READ` permission on the project.
   */
  private async getOperation(
    req: GetOperationRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.name ?? '')}`;
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a migration project, including its conversion settings and whether they're locked. To list
   * the project's source files, call `ListProjectFiles`. To track a conversion, call
   * `GetOperation`.
   */
  async getProject(
    req: GetProjectRequest,
    options?: CallOptions
  ): Promise<Project> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.name)}`;
    let resp: Project | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalProjectSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a file of a migration project, including the conversion details stored with its converted
   * file, when available. Requires `CAN_READ` permission on the project and, once the file is
   * converted, on the converted file.
   */
  async getProjectFile(
    req: GetProjectFileRequest,
    options?: CallOptions
  ): Promise<ProjectFile> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.name)}`;
    let resp: ProjectFile | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalProjectFileSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists the files of a migration project with their latest conversion statuses. To read a file's
   * changes, to-do items, blockers, and notes, call `GetProjectFile`. A page can have fewer files
   * than requested, or none, even when more pages follow; keep requesting pages until
   * `next_page_token` is empty.
   */
  async listProjectFiles(
    req: ListProjectFilesRequest,
    options?: CallOptions
  ): Promise<ListProjectFilesResponse> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.parent)}/files`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListProjectFilesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListProjectFilesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listProjectFilesIter(
    req: ListProjectFilesRequest,
    options?: CallOptions
  ): AsyncGenerator<ProjectFile> {
    const pageReq: ListProjectFilesRequest = {...req};
    for (;;) {
      const resp = await this.listProjectFiles(pageReq, options);
      for (const item of resp.projectFiles ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Lists the migration projects in a workspace folder. Select the folder with `filter`; without a
   * filter, lists the caller's home folder. Listing every project in the workspace isn't supported.
   *
   * Returns project summaries without conversion settings; call `GetProject` for the full project.
   * A page can be empty even when more pages follow, so keep requesting pages until
   * `next_page_token` is empty.
   */
  async listProjects(
    req: ListProjectsRequest,
    options?: CallOptions
  ): Promise<ListProjectsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/projects`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListProjectsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListProjectsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listProjectsIter(
    req: ListProjectsRequest,
    options?: CallOptions
  ): AsyncGenerator<Project> {
    const pageReq: ListProjectsRequest = {...req};
    for (;;) {
      const resp = await this.listProjects(pageReq, options);
      for (const item of resp.projects ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Removes files from a migration project by their resource names. The source files and their
   * converted output stay in the workspace.
   */
  async removeProjectFiles(
    req: RemoveProjectFilesRequest,
    options?: CallOptions
  ): Promise<RemoveProjectFilesResponse> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.name)}/files:remove`;
    const body = marshalRequest(req, marshalRemoveProjectFilesRequestSchema);
    let resp: RemoveProjectFilesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRemoveProjectFilesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Marks files of a migration project as reviewed, accepting their converted output. Each file's
   * status becomes `FILE_STATUS_REVIEWED`, and reviewed files aren't converted again. Files that
   * are already reviewed don't change. Returns the files in request order.
   */
  async reviewProjectFiles(
    req: ReviewProjectFilesRequest,
    options?: CallOptions
  ): Promise<ReviewProjectFilesResponse> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.parent)}/files:review`;
    const body = marshalRequest(req, marshalReviewProjectFilesRequestSchema);
    let resp: ReviewProjectFilesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalReviewProjectFilesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Removes the reviewed status from files of a migration project. Each file returns to the status
   * it had before it was reviewed. Files that aren't reviewed don't change. Returns the files in
   * request order.
   */
  async unreviewProjectFiles(
    req: UnreviewProjectFilesRequest,
    options?: CallOptions
  ): Promise<UnreviewProjectFilesResponse> {
    if (req.parent === undefined) {
      throw new Error('path parameter "parent" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.parent)}/files:unreview`;
    const body = marshalRequest(req, marshalUnreviewProjectFilesRequestSchema);
    let resp: UnreviewProjectFilesResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUnreviewProjectFilesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a migration project. Only the fields listed in `update_mask` change. An empty mask, or
   * a mask with an unsupported field, returns `INVALID_PARAMETER_VALUE`. When `changes_locked` is
   * `true`, the source dialect and target framework can't be changed.
   */
  async updateProject(
    req: UpdateProjectRequest,
    options?: CallOptions
  ): Promise<Project> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/migrations/${encodePathVariable(req.project?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.project === undefined
        ? 'null'
        : marshalRequest(req.project, marshalProjectSchema);
    let resp: Project | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalProjectSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}

export class ConvertProjectFilesOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>,
    private readonly cancelOperation: (
      req: CancelOperationRequest,
      options?: CallOptions
    ) => Promise<void>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<ConversionRun | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z.lazy(() => unmarshalConversionRunSchema).parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<ConvertProjectFilesResponse> {
    let result: ConvertProjectFilesResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.getOperation(
        {
          name: this.operation.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );
      if (op.name === undefined || op.name === '') {
        throw new Error('invalid operation response: missing operation name');
      }
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('invalid operation response: missing done field');
      }
      if (!op.done) {
        throw new StillRunningError();
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z
        .lazy(() => unmarshalConvertProjectFilesResponseSchema)
        .parse(op.result.response);
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean> {
    const op = await this.getOperation({name: this.operation.name}, options);
    if (op.name === undefined || op.name === '') {
      throw new Error('invalid operation response: missing operation name');
    }
    this.operation = op;
    if (op.done === undefined) {
      throw new Error('invalid operation response: missing done field');
    }
    return op.done;
  }

  /** Starts asynchronous cancellation on the long-running operation. */
  async cancel(options?: CallOptions): Promise<void> {
    await this.cancelOperation({name: this.operation.name}, options);
  }
}
