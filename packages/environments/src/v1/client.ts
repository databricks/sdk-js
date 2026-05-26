// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
import {retryOn} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
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
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
  private readonly host: string;
  // Workspace ID used to route workspace-level calls on unified hosts (SPOG).
  // When set, workspace-level methods send X-Databricks-Org-Id on every
  // request.
  private readonly workspaceId: string | undefined;
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
    this.workspaceId = options.workspaceId;
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
   * Creates a new WorkspaceBaseEnvironment.
   * This is a long-running operation. The operation will asynchronously generate a materialized environment
   * to optimize dependency resolution and is only marked as done when the materialized environment has been
   * successfully generated or has failed.
   */
  async createWorkspaceBaseEnvironment(
    req: CreateWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/environments/v1/workspace-base-environments`;
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
    const body = marshalRequest(
      req.workspaceBaseEnvironment,
      marshalWorkspaceBaseEnvironmentSchema
    );
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'POST',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createWorkspaceBaseEnvironmentOperation(
    req: CreateWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<CreateWorkspaceBaseEnvironmentOperation> {
    const op = await this.createWorkspaceBaseEnvironment(req, options);
    return new CreateWorkspaceBaseEnvironmentOperation(this, op);
  }

  /**
   * Deletes a WorkspaceBaseEnvironment.
   * Deleting a base environment may impact linked notebooks and jobs.
   * This operation is irreversible and should be performed only when you are certain the environment is no longer needed.
   */
  async deleteWorkspaceBaseEnvironment(
    req: DeleteWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Gets the default WorkspaceBaseEnvironment configuration for the workspace.
   * Returns the current default base environment settings for both CPU and GPU compute.
   */
  async getDefaultWorkspaceBaseEnvironment(
    req: GetDefaultWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<DefaultWorkspaceBaseEnvironment> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}`;
    let resp: DefaultWorkspaceBaseEnvironment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDefaultWorkspaceBaseEnvironmentSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the status of a long-running operation.
   * Clients can use this method to poll the operation result.
   */
  async getOperation(
    req: GetOperationRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves a WorkspaceBaseEnvironment by its name. */
  async getWorkspaceBaseEnvironment(
    req: GetWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<WorkspaceBaseEnvironment> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}`;
    let resp: WorkspaceBaseEnvironment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceBaseEnvironmentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    const url = `${this.host}/api/environments/v1/workspace-base-environments`;
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListWorkspaceBaseEnvironmentsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
   */
  async refreshWorkspaceBaseEnvironment(
    req: RefreshWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}/refresh`;
    const body = marshalRequest(
      req,
      marshalRefreshWorkspaceBaseEnvironmentRequestSchema
    );
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async refreshWorkspaceBaseEnvironmentOperation(
    req: RefreshWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<RefreshWorkspaceBaseEnvironmentOperation> {
    const op = await this.refreshWorkspaceBaseEnvironment(req, options);
    return new RefreshWorkspaceBaseEnvironmentOperation(this, op);
  }

  /**
   * Updates the default WorkspaceBaseEnvironment configuration for the workspace.
   * Sets the specified base environments as the workspace defaults for CPU and/or GPU compute.
   */
  async updateDefaultWorkspaceBaseEnvironment(
    req: UpdateDefaultWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<DefaultWorkspaceBaseEnvironment> {
    const url = `${this.host}/api/environments/v1/${req.defaultWorkspaceBaseEnvironment?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.defaultWorkspaceBaseEnvironment,
      marshalDefaultWorkspaceBaseEnvironmentSchema
    );
    let resp: DefaultWorkspaceBaseEnvironment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDefaultWorkspaceBaseEnvironmentSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates an existing WorkspaceBaseEnvironment.
   * This is a long-running operation. The operation will asynchronously regenerate the materialized environment
   * and is only marked as done when the materialized environment has been successfully generated or has failed.
   * The existing materialized environment remains available until it expires.
   */
  async updateWorkspaceBaseEnvironment(
    req: UpdateWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}`;
    const body = marshalRequest(
      req.workspaceBaseEnvironment,
      marshalWorkspaceBaseEnvironmentSchema
    );
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateWorkspaceBaseEnvironmentOperation(
    req: UpdateWorkspaceBaseEnvironmentRequest,
    options?: CallOptions
  ): Promise<UpdateWorkspaceBaseEnvironmentOperation> {
    const op = await this.updateWorkspaceBaseEnvironment(req, options);
    return new UpdateWorkspaceBaseEnvironmentOperation(this, op);
  }
}

export class CreateWorkspaceBaseEnvironmentOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<WorkspaceBaseEnvironment> {
    const errStillRunning = new Error('operation still in progress');
    let result: WorkspaceBaseEnvironment | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class RefreshWorkspaceBaseEnvironmentOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<WorkspaceBaseEnvironment> {
    const errStillRunning = new Error('operation still in progress');
    let result: WorkspaceBaseEnvironment | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class UpdateWorkspaceBaseEnvironmentOperation {
  constructor(
    private readonly client: Client,
    private operation: Operation
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
  async wait(options?: CallOptions): Promise<WorkspaceBaseEnvironment> {
    const errStillRunning = new Error('operation still in progress');
    let result: WorkspaceBaseEnvironment | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
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

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}
