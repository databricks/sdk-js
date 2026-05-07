// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
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
  CreateExampleRequest,
  CreateKnowledgeAssistantRequest,
  CreateKnowledgeSourceRequest,
  DeleteExampleRequest,
  DeleteKnowledgeAssistantRequest,
  DeleteKnowledgeSourceRequest,
  Example,
  GetExampleRequest,
  GetKnowledgeAssistantRequest,
  GetKnowledgeSourceRequest,
  KnowledgeAssistant,
  KnowledgeSource,
  ListExamplesRequest,
  ListExamplesResponse,
  ListKnowledgeAssistantsRequest,
  ListKnowledgeAssistantsResponse,
  ListKnowledgeSourcesRequest,
  ListKnowledgeSourcesResponse,
  SyncKnowledgeSourcesRequest,
  UpdateExampleRequest,
  UpdateKnowledgeAssistantRequest,
  UpdateKnowledgeSourceRequest,
} from './model';
import {
  marshalExampleSchema,
  marshalKnowledgeAssistantSchema,
  marshalKnowledgeSourceSchema,
  marshalSyncKnowledgeSourcesRequestSchema,
  unmarshalExampleSchema,
  unmarshalKnowledgeAssistantSchema,
  unmarshalKnowledgeSourceSchema,
  unmarshalListExamplesResponseSchema,
  unmarshalListKnowledgeAssistantsResponseSchema,
  unmarshalListKnowledgeSourcesResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

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

  /** Creates an example for a Knowledge Assistant. */
  async createExample(
    req: CreateExampleRequest,
    options?: CallOptions
  ): Promise<Example> {
    const url = `${this.host}/api/2.1/${req.parent ?? ''}/examples`;
    const body = marshalRequest(req.example, marshalExampleSchema);
    let resp: Example | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalExampleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a Knowledge Assistant. */
  async createKnowledgeAssistant(
    req: CreateKnowledgeAssistantRequest,
    options?: CallOptions
  ): Promise<KnowledgeAssistant> {
    const url = `${this.host}/api/2.1/knowledge-assistants`;
    const body = marshalRequest(
      req.knowledgeAssistant,
      marshalKnowledgeAssistantSchema
    );
    let resp: KnowledgeAssistant | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalKnowledgeAssistantSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a Knowledge Source under a Knowledge Assistant. */
  async createKnowledgeSource(
    req: CreateKnowledgeSourceRequest,
    options?: CallOptions
  ): Promise<KnowledgeSource> {
    const url = `${this.host}/api/2.1/${req.parent ?? ''}/knowledge-sources`;
    const body = marshalRequest(
      req.knowledgeSource,
      marshalKnowledgeSourceSchema
    );
    let resp: KnowledgeSource | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalKnowledgeSourceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes an example from a Knowledge Assistant. */
  async deleteExample(
    req: DeleteExampleRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.1/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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

  /** Deletes a Knowledge Assistant. */
  async deleteKnowledgeAssistant(
    req: DeleteKnowledgeAssistantRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.1/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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

  /** Deletes a Knowledge Source. */
  async deleteKnowledgeSource(
    req: DeleteKnowledgeSourceRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.1/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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

  /** Gets an example from a Knowledge Assistant. */
  async getExample(
    req: GetExampleRequest,
    options?: CallOptions
  ): Promise<Example> {
    const url = `${this.host}/api/2.1/${req.name ?? ''}`;
    let resp: Example | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalExampleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a Knowledge Assistant. */
  async getKnowledgeAssistant(
    req: GetKnowledgeAssistantRequest,
    options?: CallOptions
  ): Promise<KnowledgeAssistant> {
    const url = `${this.host}/api/2.1/${req.name ?? ''}`;
    let resp: KnowledgeAssistant | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalKnowledgeAssistantSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a Knowledge Source. */
  async getKnowledgeSource(
    req: GetKnowledgeSourceRequest,
    options?: CallOptions
  ): Promise<KnowledgeSource> {
    const url = `${this.host}/api/2.1/${req.name ?? ''}`;
    let resp: KnowledgeSource | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalKnowledgeSourceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists examples under a Knowledge Assistant. */
  async listExamples(
    req: ListExamplesRequest,
    options?: CallOptions
  ): Promise<ListExamplesResponse> {
    const url = `${this.host}/api/2.1/${req.parent ?? ''}/examples`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListExamplesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListExamplesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listExamplesIter(
    req: ListExamplesRequest,
    options?: CallOptions
  ): AsyncGenerator<Example> {
    const pageReq: ListExamplesRequest = {...req};
    for (;;) {
      const resp = await this.listExamples(pageReq, options);
      for (const item of resp.examples ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List Knowledge Assistants */
  async listKnowledgeAssistants(
    req: ListKnowledgeAssistantsRequest,
    options?: CallOptions
  ): Promise<ListKnowledgeAssistantsResponse> {
    const url = `${this.host}/api/2.1/knowledge-assistants`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListKnowledgeAssistantsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListKnowledgeAssistantsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listKnowledgeAssistantsIter(
    req: ListKnowledgeAssistantsRequest,
    options?: CallOptions
  ): AsyncGenerator<KnowledgeAssistant> {
    const pageReq: ListKnowledgeAssistantsRequest = {...req};
    for (;;) {
      const resp = await this.listKnowledgeAssistants(pageReq, options);
      for (const item of resp.knowledgeAssistants ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists Knowledge Sources under a Knowledge Assistant. */
  async listKnowledgeSources(
    req: ListKnowledgeSourcesRequest,
    options?: CallOptions
  ): Promise<ListKnowledgeSourcesResponse> {
    const url = `${this.host}/api/2.1/${req.parent ?? ''}/knowledge-sources`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListKnowledgeSourcesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListKnowledgeSourcesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listKnowledgeSourcesIter(
    req: ListKnowledgeSourcesRequest,
    options?: CallOptions
  ): AsyncGenerator<KnowledgeSource> {
    const pageReq: ListKnowledgeSourcesRequest = {...req};
    for (;;) {
      const resp = await this.listKnowledgeSources(pageReq, options);
      for (const item of resp.knowledgeSources ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Sync all non-index Knowledge Sources for a Knowledge Assistant (index sources do not require sync) */
  async syncKnowledgeSources(
    req: SyncKnowledgeSourcesRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.1/${req.name ?? ''}/knowledge-sources:sync`;
    const body = marshalRequest(req, marshalSyncKnowledgeSourcesRequestSchema);
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Updates an example in a Knowledge Assistant. */
  async updateExample(
    req: UpdateExampleRequest,
    options?: CallOptions
  ): Promise<Example> {
    const url = `${this.host}/api/2.1/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.example, marshalExampleSchema);
    let resp: Example | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      resp = parseResponse(respBody, unmarshalExampleSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates a Knowledge Assistant. */
  async updateKnowledgeAssistant(
    req: UpdateKnowledgeAssistantRequest,
    options?: CallOptions
  ): Promise<KnowledgeAssistant> {
    const url = `${this.host}/api/2.1/${req.knowledgeAssistant?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.knowledgeAssistant,
      marshalKnowledgeAssistantSchema
    );
    let resp: KnowledgeAssistant | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      resp = parseResponse(respBody, unmarshalKnowledgeAssistantSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates a Knowledge Source. */
  async updateKnowledgeSource(
    req: UpdateKnowledgeSourceRequest,
    options?: CallOptions
  ): Promise<KnowledgeSource> {
    const url = `${this.host}/api/2.1/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.knowledgeSource,
      marshalKnowledgeSourceSchema
    );
    let resp: KnowledgeSource | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      resp = parseResponse(respBody, unmarshalKnowledgeSourceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
