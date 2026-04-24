// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute, retryOn} from '@databricks/sdk-core/api';
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

export class Client {
  private readonly host: string;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Creates a new WorkspaceBaseEnvironment.
   * This is a long-running operation. The operation will asynchronously generate a materialized environment
   * to optimize dependency resolution and is only marked as done when the materialized environment has been
   * successfully generated or has failed.
   */
  async createWorkspaceBaseEnvironment(
    signal: AbortSignal | undefined,
    req: CreateWorkspaceBaseEnvironmentRequest,
    options?: Options
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createWorkspaceBaseEnvironmentOperation(
    signal: AbortSignal | undefined,
    req: CreateWorkspaceBaseEnvironmentRequest,
    options?: Options
  ): Promise<CreateWorkspaceBaseEnvironmentOperation> {
    const op = await this.createWorkspaceBaseEnvironment(signal, req, options);
    return new CreateWorkspaceBaseEnvironmentOperation(this, op);
  }

  /**
   * Deletes a WorkspaceBaseEnvironment.
   * Deleting a base environment may impact linked notebooks and jobs.
   * This operation is irreversible and should be performed only when you are certain the environment is no longer needed.
   */
  async deleteWorkspaceBaseEnvironment(
    signal: AbortSignal | undefined,
    req: DeleteWorkspaceBaseEnvironmentRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /**
   * Gets the default WorkspaceBaseEnvironment configuration for the workspace.
   * Returns the current default base environment settings for both CPU and GPU compute.
   */
  async getDefaultWorkspaceBaseEnvironment(
    signal: AbortSignal | undefined,
    req: GetDefaultWorkspaceBaseEnvironmentRequest,
    options?: Options
  ): Promise<DefaultWorkspaceBaseEnvironment> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}`;
    let resp: DefaultWorkspaceBaseEnvironment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetOperationRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves a WorkspaceBaseEnvironment by its name. */
  async getWorkspaceBaseEnvironment(
    signal: AbortSignal | undefined,
    req: GetWorkspaceBaseEnvironmentRequest,
    options?: Options
  ): Promise<WorkspaceBaseEnvironment> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}`;
    let resp: WorkspaceBaseEnvironment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalWorkspaceBaseEnvironmentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all WorkspaceBaseEnvironments in the workspace. */
  async listWorkspaceBaseEnvironments(
    signal: AbortSignal | undefined,
    req: ListWorkspaceBaseEnvironmentsRequest,
    options?: Options
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listWorkspaceBaseEnvironmentsIter(
    signal: AbortSignal | undefined,
    req: ListWorkspaceBaseEnvironmentsRequest,
    options?: Options
  ): AsyncGenerator<WorkspaceBaseEnvironment> {
    const pageReq: ListWorkspaceBaseEnvironmentsRequest = {...req};
    for (;;) {
      const resp = await this.listWorkspaceBaseEnvironments(
        signal,
        pageReq,
        options
      );
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
    signal: AbortSignal | undefined,
    req: RefreshWorkspaceBaseEnvironmentRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}/refresh`;
    const body = marshalRequest(
      req,
      marshalRefreshWorkspaceBaseEnvironmentRequestSchema
    );
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async refreshWorkspaceBaseEnvironmentOperation(
    signal: AbortSignal | undefined,
    req: RefreshWorkspaceBaseEnvironmentRequest,
    options?: Options
  ): Promise<RefreshWorkspaceBaseEnvironmentOperation> {
    const op = await this.refreshWorkspaceBaseEnvironment(signal, req, options);
    return new RefreshWorkspaceBaseEnvironmentOperation(this, op);
  }

  /**
   * Updates the default WorkspaceBaseEnvironment configuration for the workspace.
   * Sets the specified base environments as the workspace defaults for CPU and/or GPU compute.
   */
  async updateDefaultWorkspaceBaseEnvironment(
    signal: AbortSignal | undefined,
    req: UpdateDefaultWorkspaceBaseEnvironmentRequest,
    options?: Options
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateWorkspaceBaseEnvironmentRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/environments/v1/${req.name ?? ''}`;
    const body = marshalRequest(
      req.workspaceBaseEnvironment,
      marshalWorkspaceBaseEnvironmentSchema
    );
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateWorkspaceBaseEnvironmentOperation(
    signal: AbortSignal | undefined,
    req: UpdateWorkspaceBaseEnvironmentRequest,
    options?: Options
  ): Promise<UpdateWorkspaceBaseEnvironmentOperation> {
    const op = await this.updateWorkspaceBaseEnvironment(signal, req, options);
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
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<WorkspaceBaseEnvironment> {
    const errStillRunning = new Error('operation still in progress');
    let result: WorkspaceBaseEnvironment | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        callSignal,
        {
          name: this.operation.name,
        },
        options
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
      }

      if (op.error !== undefined) {
        const msg =
          op.error.message !== undefined && op.error.message !== ''
            ? op.error.message
            : 'unknown error';
        const errorMsg =
          op.error.errorCode !== undefined
            ? `[${op.error.errorCode}] ${msg}`
            : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: op.error,
        });
      }

      if (op.response === undefined) {
        throw new Error('operation completed without a response');
      }

      result = z
        .lazy(() => unmarshalWorkspaceBaseEnvironmentSchema)
        .parse(op.response);
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      signal,
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
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<WorkspaceBaseEnvironment> {
    const errStillRunning = new Error('operation still in progress');
    let result: WorkspaceBaseEnvironment | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        callSignal,
        {
          name: this.operation.name,
        },
        options
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
      }

      if (op.error !== undefined) {
        const msg =
          op.error.message !== undefined && op.error.message !== ''
            ? op.error.message
            : 'unknown error';
        const errorMsg =
          op.error.errorCode !== undefined
            ? `[${op.error.errorCode}] ${msg}`
            : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: op.error,
        });
      }

      if (op.response === undefined) {
        throw new Error('operation completed without a response');
      }

      result = z
        .lazy(() => unmarshalWorkspaceBaseEnvironmentSchema)
        .parse(op.response);
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      signal,
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
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<WorkspaceBaseEnvironment> {
    const errStillRunning = new Error('operation still in progress');
    let result: WorkspaceBaseEnvironment | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getOperation(
        callSignal,
        {
          name: this.operation.name,
        },
        options
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
      }

      if (op.error !== undefined) {
        const msg =
          op.error.message !== undefined && op.error.message !== ''
            ? op.error.message
            : 'unknown error';
        const errorMsg =
          op.error.errorCode !== undefined
            ? `[${op.error.errorCode}] ${msg}`
            : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: op.error,
        });
      }

      if (op.response === undefined) {
        throw new Error('operation completed without a response');
      }

      result = z
        .lazy(() => unmarshalWorkspaceBaseEnvironmentSchema)
        .parse(op.response);
    };

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean | undefined> {
    const op = await this.client.getOperation(
      signal,
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}
