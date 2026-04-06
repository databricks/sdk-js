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
  CreateEndpointRequest,
  DeleteEndpointRequest,
  DeleteEndpointResponse,
  Endpoint,
  GetEndpointRequest,
  ListEndpointRequest,
  ListEndpointResponse,
  PatchEndpointBudgetPolicyRequest,
  PatchEndpointBudgetPolicyResponse,
  PatchEndpointRequest,
  PatchEndpointThroughputRequest,
  PatchEndpointThroughputResponse,
} from './model';
import {
  marshalCreateEndpointRequestSchema,
  marshalPatchEndpointBudgetPolicyRequestSchema,
  marshalPatchEndpointRequestSchema,
  marshalPatchEndpointThroughputRequestSchema,
  unmarshalDeleteEndpointResponseSchema,
  unmarshalEndpointSchema,
  unmarshalListEndpointResponseSchema,
  unmarshalPatchEndpointBudgetPolicyResponseSchema,
  unmarshalPatchEndpointThroughputResponseSchema,
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

  /** Create a new endpoint. */
  async createEndpoint(
    signal: AbortSignal | undefined,
    req: CreateEndpointRequest,
    options?: Options
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/vector-search/endpoints`;
    const body = marshalRequest(req, marshalCreateEndpointRequestSchema);
    let resp: Endpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a vector search endpoint. */
  async deleteEndpoint(
    signal: AbortSignal | undefined,
    req: DeleteEndpointRequest,
    options?: Options
  ): Promise<DeleteEndpointResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}`;
    let resp: DeleteEndpointResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteEndpointResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get details for a single vector search endpoint. */
  async getEndpoint(
    signal: AbortSignal | undefined,
    req: GetEndpointRequest,
    options?: Options
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}`;
    let resp: Endpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List all vector search endpoints in the workspace. */
  async listEndpoint(
    signal: AbortSignal | undefined,
    req: ListEndpointRequest,
    options?: Options
  ): Promise<ListEndpointResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListEndpointResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListEndpointResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listEndpointIter(
    signal: AbortSignal | undefined,
    req: ListEndpointRequest,
    options?: Options
  ): AsyncGenerator<Endpoint> {
    const pageReq: ListEndpointRequest = {...req};
    for (;;) {
      const resp = await this.listEndpoint(signal, pageReq, options);
      for (const item of resp.endpoints ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Update an endpoint */
  async patchEndpoint(
    signal: AbortSignal | undefined,
    req: PatchEndpointRequest,
    options?: Options
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}`;
    const body = marshalRequest(req, marshalPatchEndpointRequestSchema);
    let resp: Endpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update the budget policy of an endpoint */
  async patchEndpointBudgetPolicy(
    signal: AbortSignal | undefined,
    req: PatchEndpointBudgetPolicyRequest,
    options?: Options
  ): Promise<PatchEndpointBudgetPolicyResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}/budget-policy`;
    const body = marshalRequest(
      req,
      marshalPatchEndpointBudgetPolicyRequestSchema
    );
    let resp: PatchEndpointBudgetPolicyResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPatchEndpointBudgetPolicyResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update the throughput (concurrency) of an endpoint */
  async patchEndpointThroughput(
    signal: AbortSignal | undefined,
    req: PatchEndpointThroughputRequest,
    options?: Options
  ): Promise<PatchEndpointThroughputResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}/throughput`;
    const body = marshalRequest(
      req,
      marshalPatchEndpointThroughputRequestSchema
    );
    let resp: PatchEndpointThroughputResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPatchEndpointThroughputResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
