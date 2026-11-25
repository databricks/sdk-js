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
  CreateWorkspaceBaseEnvironmentRequest,
  DefaultWorkspaceBaseEnvironment,
  DeleteWorkspaceBaseEnvironmentRequest,
  GetDefaultWorkspaceBaseEnvironmentRequest,
  GetOperationRequest,
  GetWorkspaceBaseEnvironmentRequest,
  ListWorkspaceBaseEnvironmentsRequest,
  ListWorkspaceBaseEnvironmentsResponse,
  Operation,
  RefreshWorkspaceBaseEnvironmentRequest,
  UpdateDefaultWorkspaceBaseEnvironmentRequest,
  UpdateWorkspaceBaseEnvironmentRequest,
  WorkspaceBaseEnvironment,
  WorkspaceBaseEnvironmentOperationMetadata,
} from './model';
import {
  marshalDefaultWorkspaceBaseEnvironmentSchema,
  marshalRefreshWorkspaceBaseEnvironmentRequestSchema,
  marshalWorkspaceBaseEnvironmentSchema,
  unmarshalDefaultWorkspaceBaseEnvironmentSchema,
  unmarshalListWorkspaceBaseEnvironmentsResponseSchema,
  unmarshalOperationSchema,
  unmarshalWorkspaceBaseEnvironmentOperationMetadataSchema,
  unmarshalWorkspaceBaseEnvironmentSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class EnvironmentsClient {
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
   * Creates a new WorkspaceBaseEnvironment.
   * This is a long-running operation. The operation will asynchronously generate a materialized environment
   * to optimize dependency resolution and is only marked as done when the materialized environment has been
   * successfully generated or has failed. Poll the returned operation with GetOperation.
   */
  private async createWorkspaceBaseEnvironmentBase(
    req: CreateWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/environments/v1/workspace-base-environments`;
    const params = new URLSearchParams();
    if (req.workspaceBaseEnvironmentId !== undefined) {
      params.append(
        'workspace_base_environment_id',
        req.workspaceBaseEnvironmentId
      );
    }
    if (req.requestId !== undefined) {
      params.append('request_id', req.requestId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.workspaceBaseEnvironment === undefined
        ? 'null'
        : marshalRequest(
            req.workspaceBaseEnvironment,
            marshalWorkspaceBaseEnvironmentSchema
          );
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest(
        'POST',
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
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new WorkspaceBaseEnvironment.
   * This is a long-running operation. The operation will asynchronously generate a materialized environment
   * to optimize dependency resolution and is only marked as done when the materialized environment has been
   * successfully generated or has failed. Poll the returned operation with GetOperation.
   */
  async createWorkspaceBaseEnvironment(
    req: CreateWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<CreateWorkspaceBaseEnvironmentOperation> {
    const op = await this.createWorkspaceBaseEnvironmentBase(req, options);
    if (op.name === undefined || op.name === '') {
      throw new Error('invalid operation response: missing operation name');
    }
    return new CreateWorkspaceBaseEnvironmentOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /**
   * Deletes a WorkspaceBaseEnvironment.
   * Deleting a base environment may impact linked notebooks and jobs.
   * This operation is irreversible and should be performed only when you are certain the environment is no longer needed.
   * Databricks-provided base environments cannot be deleted.
   */
  async deleteWorkspaceBaseEnvironment(
    req: DeleteWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<void> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/environments/v1/${encodePathVariable(req.name)}`;
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
   * Gets the default WorkspaceBaseEnvironment configuration for the workspace.
   * Returns the current default base environment settings for both CPU and GPU compute.
   * An unset CPU or GPU field means that compute type uses the Databricks Standard base
   * environment.
   */
  async getDefaultWorkspaceBaseEnvironment(
    req: GetDefaultWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<DefaultWorkspaceBaseEnvironment> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/environments/v1/${encodePathVariable(req.name)}`;
    let resp: DefaultWorkspaceBaseEnvironment | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalDefaultWorkspaceBaseEnvironmentSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the status of a long-running operation.
   * Clients can use this method to poll the operation result.
   * Create, update and refresh return an operation named `operations/{workspace_base_environment_id}`.
   * The operation is done when the materialized environment build finishes. On success, `response` contains the
   * WorkspaceBaseEnvironment with status `CREATED`. When the status is `FAILED`, `EXPIRED` or `INVALID`, `error` is
   * set instead, and `error.message` carries the environment's status message when one is available.
   */
  private async getOperation(
    req: GetOperationRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/environments/v1/${encodePathVariable(req.name ?? '')}`;
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

  /** Retrieves a WorkspaceBaseEnvironment by its name. */
  async getWorkspaceBaseEnvironment(
    req: GetWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<WorkspaceBaseEnvironment> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/environments/v1/${encodePathVariable(req.name)}`;
    let resp: WorkspaceBaseEnvironment | undefined;
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
      resp = parseResponse(respBody, unmarshalWorkspaceBaseEnvironmentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists all WorkspaceBaseEnvironments in the workspace.
   *
   * <Databricks> provides the following base environments:
   *
   * - `workspace-base-environments/databricks_ai_...`: includes popular AI and deep learning packages for serverless GPU compute.
   *
   *
   *
   * - `workspace-base-environments/databricks_ml_...`: includes popular ML packages for serverless compute.
   *
   *
   *
   *
   * Databricks-provided base environments are versioned. For example, `workspace-base-environments/databricks_ml_v5` corresponds to the ML environment built on environment version 5.
   */
  async listWorkspaceBaseEnvironments(
    req: ListWorkspaceBaseEnvironmentsRequest,
    options?: CallOptions
  ): Promise<ListWorkspaceBaseEnvironmentsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/environments/v1/workspace-base-environments`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListWorkspaceBaseEnvironmentsResponse | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalListWorkspaceBaseEnvironmentsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listWorkspaceBaseEnvironmentsIter(
    req: ListWorkspaceBaseEnvironmentsRequest,
    options?: CallOptions
  ): AsyncGenerator<WorkspaceBaseEnvironment> {
    const pageReq: ListWorkspaceBaseEnvironmentsRequest = {...req};
    for (;;) {
      const resp = await this.listWorkspaceBaseEnvironments(pageReq, options);
      for (const item of resp.workspaceBaseEnvironments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Refreshes the materialized environment for a WorkspaceBaseEnvironment.
   * This is a long-running operation. The operation will asynchronously regenerate the materialized environment
   * and is only marked as done when the materialized environment has been successfully generated or has failed.
   * The existing materialized environment remains available until it expires.
   * Poll the returned operation with GetOperation. Databricks-provided base environments cannot be refreshed.
   */
  private async refreshWorkspaceBaseEnvironmentBase(
    req: RefreshWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<Operation> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/environments/v1/${encodePathVariable(req.name)}/refresh`;
    const body = marshalRequest(
      req,
      marshalRefreshWorkspaceBaseEnvironmentRequestSchema
    );
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
   * Refreshes the materialized environment for a WorkspaceBaseEnvironment.
   * This is a long-running operation. The operation will asynchronously regenerate the materialized environment
   * and is only marked as done when the materialized environment has been successfully generated or has failed.
   * The existing materialized environment remains available until it expires.
   * Poll the returned operation with GetOperation. Databricks-provided base environments cannot be refreshed.
   */
  async refreshWorkspaceBaseEnvironment(
    req: RefreshWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<RefreshWorkspaceBaseEnvironmentOperation> {
    const op = await this.refreshWorkspaceBaseEnvironmentBase(req, options);
    if (op.name === undefined || op.name === '') {
      throw new Error('invalid operation response: missing operation name');
    }
    return new RefreshWorkspaceBaseEnvironmentOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }

  /**
   * Updates the default WorkspaceBaseEnvironment configuration for the workspace.
   * Sets the specified base environments as the workspace defaults for CPU and/or GPU compute.
   * Unsetting a default makes that compute type use the Databricks Standard base environment.
   * The Standard base environment has no resource name, so unsetting the field is the only way
   * to select it.
   */
  async updateDefaultWorkspaceBaseEnvironment(
    req: UpdateDefaultWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<DefaultWorkspaceBaseEnvironment> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/environments/v1/${encodePathVariable(req.defaultWorkspaceBaseEnvironment?.name ?? '')}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.defaultWorkspaceBaseEnvironment === undefined
        ? 'null'
        : marshalRequest(
            req.defaultWorkspaceBaseEnvironment,
            marshalDefaultWorkspaceBaseEnvironmentSchema
          );
    let resp: DefaultWorkspaceBaseEnvironment | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalDefaultWorkspaceBaseEnvironmentSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates an existing WorkspaceBaseEnvironment.
   * This is a long-running operation. The operation will asynchronously regenerate the materialized environment
   * and is only marked as done when the materialized environment has been successfully generated or has failed.
   * The existing materialized environment remains available until it expires.
   * Poll the returned operation with GetOperation. Databricks-provided base environments cannot be updated.
   */
  private async updateWorkspaceBaseEnvironmentBase(
    req: UpdateWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<Operation> {
    if (req.name === undefined) {
      throw new Error('path parameter "name" is required');
    }
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/environments/v1/${encodePathVariable(req.name)}`;
    const body =
      req.workspaceBaseEnvironment === undefined
        ? 'null'
        : marshalRequest(
            req.workspaceBaseEnvironment,
            marshalWorkspaceBaseEnvironmentSchema
          );
    let resp: Operation | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
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
   * Updates an existing WorkspaceBaseEnvironment.
   * This is a long-running operation. The operation will asynchronously regenerate the materialized environment
   * and is only marked as done when the materialized environment has been successfully generated or has failed.
   * The existing materialized environment remains available until it expires.
   * Poll the returned operation with GetOperation. Databricks-provided base environments cannot be updated.
   */
  async updateWorkspaceBaseEnvironment(
    req: UpdateWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<UpdateWorkspaceBaseEnvironmentOperation> {
    const op = await this.updateWorkspaceBaseEnvironmentBase(req, options);
    if (op.name === undefined || op.name === '') {
      throw new Error('invalid operation response: missing operation name');
    }
    return new UpdateWorkspaceBaseEnvironmentOperation(op, (req, options) =>
      this.getOperation(req, options)
    );
  }
}

export class CreateWorkspaceBaseEnvironmentOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<WorkspaceBaseEnvironmentOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalWorkspaceBaseEnvironmentOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<WorkspaceBaseEnvironment> {
    let result: WorkspaceBaseEnvironment | undefined;

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
        .lazy(() => unmarshalWorkspaceBaseEnvironmentSchema)
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
}

export class RefreshWorkspaceBaseEnvironmentOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<WorkspaceBaseEnvironmentOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalWorkspaceBaseEnvironmentOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<WorkspaceBaseEnvironment> {
    let result: WorkspaceBaseEnvironment | undefined;

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
        .lazy(() => unmarshalWorkspaceBaseEnvironmentSchema)
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
}

export class UpdateWorkspaceBaseEnvironmentOperation {
  constructor(
    private operation: Operation,
    private readonly getOperation: (
      req: GetOperationRequest,
      options?: CallOptions
    ) => Promise<Operation>
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<WorkspaceBaseEnvironmentOperationMetadata | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z
        .lazy(() => unmarshalWorkspaceBaseEnvironmentOperationMetadataSchema)
        .parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: LroOptions): Promise<WorkspaceBaseEnvironment> {
    let result: WorkspaceBaseEnvironment | undefined;

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
        .lazy(() => unmarshalWorkspaceBaseEnvironmentSchema)
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
}
