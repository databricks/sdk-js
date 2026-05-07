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
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
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
  EndpointStatus_State,
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

  /** Create a new endpoint. */
  async createEndpoint(
    signal: AbortSignal | undefined,
    req: CreateEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/vector-search/endpoints`;
    const body = marshalRequest(req, marshalCreateEndpointRequestSchema);
    let resp: Endpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createEndpointWaiter(
    signal: AbortSignal | undefined,
    req: CreateEndpointRequest,
    options?: CallOptions
  ): Promise<CreateEndpointWaiter> {
    const resp = await this.createEndpoint(signal, req, options);
    if (resp.name === undefined) {
      throw new Error('response field name required for polling is missing');
    }
    return new CreateEndpointWaiter(this, resp.name);
  }

  /** Delete a vector search endpoint. */
  async deleteEndpoint(
    signal: AbortSignal | undefined,
    req: DeleteEndpointRequest,
    options?: CallOptions
  ): Promise<DeleteEndpointResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}`;
    let resp: DeleteEndpointResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteEndpointResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get details for a single vector search endpoint. */
  async getEndpoint(
    signal: AbortSignal | undefined,
    req: GetEndpointRequest,
    options?: CallOptions
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}`;
    let resp: Endpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List all vector search endpoints in the workspace. */
  async listEndpoint(
    signal: AbortSignal | undefined,
    req: ListEndpointRequest,
    options?: CallOptions
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
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListEndpointResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listEndpointIter(
    signal: AbortSignal | undefined,
    req: ListEndpointRequest,
    options?: CallOptions
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
    options?: CallOptions
  ): Promise<Endpoint> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}`;
    const body = marshalRequest(req, marshalPatchEndpointRequestSchema);
    let resp: Endpoint | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEndpointSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update the budget policy of an endpoint */
  async patchEndpointBudgetPolicy(
    signal: AbortSignal | undefined,
    req: PatchEndpointBudgetPolicyRequest,
    options?: CallOptions
  ): Promise<PatchEndpointBudgetPolicyResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}/budget-policy`;
    const body = marshalRequest(
      req,
      marshalPatchEndpointBudgetPolicyRequestSchema
    );
    let resp: PatchEndpointBudgetPolicyResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
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
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update the throughput (concurrency) of an endpoint */
  async patchEndpointThroughput(
    signal: AbortSignal | undefined,
    req: PatchEndpointThroughputRequest,
    options?: CallOptions
  ): Promise<PatchEndpointThroughputResponse> {
    const url = `${this.host}/api/2.0/vector-search/endpoints/${req.name ?? ''}/throughput`;
    const body = marshalRequest(
      req,
      marshalPatchEndpointThroughputRequestSchema
    );
    let resp: PatchEndpointThroughputResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
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
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class CreateEndpointWaiter {
  constructor(
    private readonly client: Client,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<Endpoint> {
    let result: Endpoint | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getEndpoint(
        callSignal,
        {
          name: this.name,
        },
        options
      );

      const status = pollResp.endpointStatus?.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case EndpointStatus_State.ONLINE:
          result = pollResp;
          return;
        case EndpointStatus_State.OFFLINE: {
          const msg = pollResp.endpointStatus?.message ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: CallOptions = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<boolean> {
    const pollResp = await this.client.getEndpoint(
      signal,
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.endpointStatus?.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case EndpointStatus_State.ONLINE:
      case EndpointStatus_State.OFFLINE:
        return true;
      default:
        return false;
    }
  }
}
