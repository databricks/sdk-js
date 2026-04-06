// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
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
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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
}
