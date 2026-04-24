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
import type {
  CancelCommandRequest,
  CancelResponse,
  CreateContextRequest,
  CreateResponse,
  DestroyContextRequest,
  DestroyResponse,
  ExecuteCommandRequest,
  GetCommandStatusRequest,
  GetCommandStatusResponse,
  GetContextStatusRequest,
  GetContextStatusResponse,
} from './model';
import {
  CommandStatus,
  ContextStatus,
  marshalCancelCommandRequestSchema,
  marshalCreateContextRequestSchema,
  marshalDestroyContextRequestSchema,
  marshalExecuteCommandRequestSchema,
  unmarshalCancelResponseSchema,
  unmarshalCreateResponseSchema,
  unmarshalDestroyResponseSchema,
  unmarshalGetCommandStatusResponseSchema,
  unmarshalGetContextStatusResponseSchema,
} from './model';

class StillRunningError extends Error {}

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
   * Cancels a currently running command within an execution context.
   *
   * The command ID is obtained from a prior successful call to __execute__.
   */
  async cancel(
    signal: AbortSignal | undefined,
    req: CancelCommandRequest,
    options?: Options
  ): Promise<CancelResponse> {
    const url = `${this.host}/api/1.2/commands/cancel`;
    const body = marshalRequest(req, marshalCancelCommandRequestSchema);
    let resp: CancelResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCancelResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async cancelWaiter(
    signal: AbortSignal | undefined,
    req: CancelCommandRequest,
    options?: Options
  ): Promise<CancelWaiter> {
    await this.cancel(signal, req, options);
    if (req.clusterId === undefined) {
      throw new Error(
        'request field clusterId required for polling is missing'
      );
    }
    if (req.contextId === undefined) {
      throw new Error(
        'request field contextId required for polling is missing'
      );
    }
    if (req.commandId === undefined) {
      throw new Error(
        'request field commandId required for polling is missing'
      );
    }
    return new CancelWaiter(this, req.clusterId, req.contextId, req.commandId);
  }

  /**
   * Gets the status of and, if available, the results from a currently executing command.
   *
   * The command ID is obtained from a prior successful call to __execute__.
   */
  async commandStatus(
    signal: AbortSignal | undefined,
    req: GetCommandStatusRequest,
    options?: Options
  ): Promise<GetCommandStatusResponse> {
    const url = `${this.host}/api/1.2/commands/status`;
    const params = new URLSearchParams();
    if (req.clusterId !== undefined) {
      params.append('clusterId', req.clusterId);
    }
    if (req.contextId !== undefined) {
      params.append('contextId', req.contextId);
    }
    if (req.commandId !== undefined) {
      params.append('commandId', req.commandId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetCommandStatusResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetCommandStatusResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the status for an execution context. */
  async contextStatus(
    signal: AbortSignal | undefined,
    req: GetContextStatusRequest,
    options?: Options
  ): Promise<GetContextStatusResponse> {
    const url = `${this.host}/api/1.2/contexts/status`;
    const params = new URLSearchParams();
    if (req.clusterId !== undefined) {
      params.append('clusterId', req.clusterId);
    }
    if (req.contextId !== undefined) {
      params.append('contextId', req.contextId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetContextStatusResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetContextStatusResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates an execution context for running cluster commands.
   *
   * If successful, this method returns the ID of the new execution context.
   */
  async create(
    signal: AbortSignal | undefined,
    req: CreateContextRequest,
    options?: Options
  ): Promise<CreateResponse> {
    const url = `${this.host}/api/1.2/contexts/create`;
    const body = marshalRequest(req, marshalCreateContextRequestSchema);
    let resp: CreateResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createWaiter(
    signal: AbortSignal | undefined,
    req: CreateContextRequest,
    options?: Options
  ): Promise<CreateWaiter> {
    const resp = await this.create(signal, req, options);
    if (req.clusterId === undefined) {
      throw new Error(
        'request field clusterId required for polling is missing'
      );
    }
    if (resp.id === undefined) {
      throw new Error('response field id required for polling is missing');
    }
    return new CreateWaiter(this, req.clusterId, resp.id);
  }

  /** Deletes an execution context. */
  async destroy(
    signal: AbortSignal | undefined,
    req: DestroyContextRequest,
    options?: Options
  ): Promise<DestroyResponse> {
    const url = `${this.host}/api/1.2/contexts/destroy`;
    const body = marshalRequest(req, marshalDestroyContextRequestSchema);
    let resp: DestroyResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDestroyResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Runs a cluster command in the given execution context, using the provided language.
   *
   * If successful, it returns an ID for tracking the status of the command's execution.
   */
  async execute(
    signal: AbortSignal | undefined,
    req: ExecuteCommandRequest,
    options?: Options
  ): Promise<CreateResponse> {
    const url = `${this.host}/api/1.2/commands/execute`;
    const body = marshalRequest(req, marshalExecuteCommandRequestSchema);
    let resp: CreateResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async executeWaiter(
    signal: AbortSignal | undefined,
    req: ExecuteCommandRequest,
    options?: Options
  ): Promise<ExecuteWaiter> {
    const resp = await this.execute(signal, req, options);
    if (req.clusterId === undefined) {
      throw new Error(
        'request field clusterId required for polling is missing'
      );
    }
    if (req.contextId === undefined) {
      throw new Error(
        'request field contextId required for polling is missing'
      );
    }
    if (resp.id === undefined) {
      throw new Error('response field id required for polling is missing');
    }
    return new ExecuteWaiter(this, req.clusterId, req.contextId, resp.id);
  }
}

export class CancelWaiter {
  constructor(
    private readonly client: Client,
    readonly clusterId: string,
    readonly contextId: string,
    readonly commandId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetCommandStatusResponse> {
    let result: GetCommandStatusResponse | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.commandStatus(
        callSignal,
        {
          clusterId: this.clusterId,
          contextId: this.contextId,
          commandId: this.commandId,
        },
        options
      );

      const status = pollResp.status;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case CommandStatus.COMMAND_CANCELLED:
          result = pollResp;
          return;
        case CommandStatus.COMMAND_ERROR: {
          const msg = pollResp.results?.cause ?? '(no message)';
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
    const pollResp = await this.client.commandStatus(
      signal,
      {
        clusterId: this.clusterId,
        contextId: this.contextId,
        commandId: this.commandId,
      },
      options
    );

    const status = pollResp.status;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case CommandStatus.COMMAND_CANCELLED:
      case CommandStatus.COMMAND_ERROR:
        return true;
      default:
        return false;
    }
  }
}

export class CreateWaiter {
  constructor(
    private readonly client: Client,
    readonly clusterId: string,
    readonly contextId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetContextStatusResponse> {
    let result: GetContextStatusResponse | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.contextStatus(
        callSignal,
        {
          clusterId: this.clusterId,
          contextId: this.contextId,
        },
        options
      );

      const status = pollResp.status;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ContextStatus.CONTEXT_RUNNING:
          result = pollResp;
          return;
        case ContextStatus.CONTEXT_ERROR: {
          const msg = '(no message)';
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
    const pollResp = await this.client.contextStatus(
      signal,
      {
        clusterId: this.clusterId,
        contextId: this.contextId,
      },
      options
    );

    const status = pollResp.status;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ContextStatus.CONTEXT_RUNNING:
      case ContextStatus.CONTEXT_ERROR:
        return true;
      default:
        return false;
    }
  }
}

export class ExecuteWaiter {
  constructor(
    private readonly client: Client,
    readonly clusterId: string,
    readonly contextId: string,
    readonly commandId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<GetCommandStatusResponse> {
    let result: GetCommandStatusResponse | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.commandStatus(
        callSignal,
        {
          clusterId: this.clusterId,
          contextId: this.contextId,
          commandId: this.commandId,
        },
        options
      );

      const status = pollResp.status;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case CommandStatus.COMMAND_FINISHED:
        case CommandStatus.COMMAND_ERROR:
          result = pollResp;
          return;
        case CommandStatus.COMMAND_CANCELLED:
        case CommandStatus.COMMAND_CANCELLING: {
          const msg = '(no message)';
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
    const pollResp = await this.client.commandStatus(
      signal,
      {
        clusterId: this.clusterId,
        contextId: this.contextId,
        commandId: this.commandId,
      },
      options
    );

    const status = pollResp.status;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case CommandStatus.COMMAND_FINISHED:
      case CommandStatus.COMMAND_ERROR:
      case CommandStatus.COMMAND_CANCELLED:
      case CommandStatus.COMMAND_CANCELLING:
        return true;
      default:
        return false;
    }
  }
}
