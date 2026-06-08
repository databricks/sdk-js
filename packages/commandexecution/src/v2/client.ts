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

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class CommandExecutionClient {
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
   * Cancels a currently running command within an execution context.
   *
   * The command ID is obtained from a prior successful call to __execute__.
   */
  private async cancel(
    req: CancelCommandRequest,
    options?: CallOptions
  ): Promise<CancelResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/1.2/commands/cancel`;
    const body = marshalRequest(req, marshalCancelCommandRequestSchema);
    let resp: CancelResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalCancelResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async cancelWaiter(
    req: CancelCommandRequest,
    options?: CallOptions
  ): Promise<CancelWaiter> {
    await this.cancel(req, options);
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
    req: GetCommandStatusRequest,
    options?: CallOptions
  ): Promise<GetCommandStatusResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/1.2/commands/status`;
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
      resp = parseResponse(respBody, unmarshalGetCommandStatusResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets the status for an execution context. */
  async contextStatus(
    req: GetContextStatusRequest,
    options?: CallOptions
  ): Promise<GetContextStatusResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/1.2/contexts/status`;
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
      resp = parseResponse(respBody, unmarshalGetContextStatusResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates an execution context for running cluster commands.
   *
   * If successful, this method returns the ID of the new execution context.
   */
  private async create(
    req: CreateContextRequest,
    options?: CallOptions
  ): Promise<CreateResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/1.2/contexts/create`;
    const body = marshalRequest(req, marshalCreateContextRequestSchema);
    let resp: CreateResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalCreateResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async createWaiter(
    req: CreateContextRequest,
    options?: CallOptions
  ): Promise<CreateWaiter> {
    const resp = await this.create(req, options);
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
    req: DestroyContextRequest,
    options?: CallOptions
  ): Promise<DestroyResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/1.2/contexts/destroy`;
    const body = marshalRequest(req, marshalDestroyContextRequestSchema);
    let resp: DestroyResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalDestroyResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Runs a cluster command in the given execution context, using the provided language.
   *
   * If successful, it returns an ID for tracking the status of the command's execution.
   */
  private async execute(
    req: ExecuteCommandRequest,
    options?: CallOptions
  ): Promise<CreateResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/1.2/commands/execute`;
    const body = marshalRequest(req, marshalExecuteCommandRequestSchema);
    let resp: CreateResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalCreateResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async executeWaiter(
    req: ExecuteCommandRequest,
    options?: CallOptions
  ): Promise<ExecuteWaiter> {
    const resp = await this.execute(req, options);
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
    private readonly client: CommandExecutionClient,
    readonly clusterId: string,
    readonly contextId: string,
    readonly commandId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetCommandStatusResponse> {
    let result: GetCommandStatusResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.commandStatus(
        {
          clusterId: this.clusterId,
          contextId: this.contextId,
          commandId: this.commandId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
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

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.commandStatus(
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
    private readonly client: CommandExecutionClient,
    readonly clusterId: string,
    readonly contextId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetContextStatusResponse> {
    let result: GetContextStatusResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.contextStatus(
        {
          clusterId: this.clusterId,
          contextId: this.contextId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
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

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.contextStatus(
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
    private readonly client: CommandExecutionClient,
    readonly clusterId: string,
    readonly contextId: string,
    readonly commandId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<GetCommandStatusResponse> {
    let result: GetCommandStatusResponse | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.commandStatus(
        {
          clusterId: this.clusterId,
          contextId: this.contextId,
          commandId: this.commandId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
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

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.commandStatus(
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
