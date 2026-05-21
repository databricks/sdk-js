// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from './transport';
import {buildHttpRequest, executeCall, executeHttpCall, marshalRequest, parseResponse} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  DisableSystemSchemaRequest,
  DisableSystemSchemaRequest_Response,
  EnableSystemSchemaRequest,
  EnableSystemSchemaRequest_Response,
  ListSystemSchemasRequest,
  ListSystemSchemasRequest_Response,
  SystemSchemaInfo,
} from './model';
import {
  marshalEnableSystemSchemaRequestSchema,
  unmarshalDisableSystemSchemaRequest_ResponseSchema,
  unmarshalEnableSystemSchemaRequest_ResponseSchema,
  unmarshalListSystemSchemasRequest_ResponseSchema,
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

  /**
   * Disables the system schema and removes it from the system catalog.
   * The caller must be an account admin or a metastore admin.
   */
  async disableSystemSchema(req: DisableSystemSchemaRequest, options?: CallOptions): Promise<DisableSystemSchemaRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.metastoreId ?? ''}/systemschemas/${req.schema ?? ''}`;
    let resp: DisableSystemSchemaRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDisableSystemSchemaRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Enables the system schema and adds it to the system catalog.
   * The caller must be an account admin or a metastore admin.
   */
  async enableSystemSchema(req: EnableSystemSchemaRequest, options?: CallOptions): Promise<EnableSystemSchemaRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.metastoreId ?? ''}/systemschemas/${req.schema ?? ''}`;
    const body = marshalRequest(req, marshalEnableSystemSchemaRequestSchema);
    let resp: EnableSystemSchemaRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalEnableSystemSchemaRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of system schemas for a metastore.
   * The caller must be an account admin or a metastore admin.
   * 
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   * 
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listSystemSchemas(req: ListSystemSchemasRequest, options?: CallOptions): Promise<ListSystemSchemasRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/metastores/${req.metastoreId ?? ''}/systemschemas`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSystemSchemasRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListSystemSchemasRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listSystemSchemasIter(req: ListSystemSchemasRequest, options?: CallOptions): AsyncGenerator<SystemSchemaInfo> {
    const pageReq: ListSystemSchemasRequest = {...req};
    for (;;) {
      const resp = await this.listSystemSchemas(pageReq, options);
      for (const item of resp.schemas ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

}
