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
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  GetEffectivePermissionsRequest,
  GetEffectivePermissionsRequest_Response,
  GetPermissionsRequest,
  GetPermissionsRequest_Response,
  UpdatePermissionsRequest,
  UpdatePermissionsRequest_Response,
} from './model';
import {
  marshalUpdatePermissionsRequestSchema,
  unmarshalGetEffectivePermissionsRequest_ResponseSchema,
  unmarshalGetPermissionsRequest_ResponseSchema,
  unmarshalUpdatePermissionsRequest_ResponseSchema,
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
   * Gets the effective permissions for a securable. Includes inherited permissions from any parent securables.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async getEffectivePermissions(
    req: GetEffectivePermissionsRequest,
    options?: CallOptions
  ): Promise<GetEffectivePermissionsRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/effective-permissions/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.principal !== undefined) {
      params.append('principal', req.principal);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetEffectivePermissionsRequest_Response | undefined;
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
        unmarshalGetEffectivePermissionsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the permissions for a securable. Does not include inherited permissions.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async getPermissions(
    req: GetPermissionsRequest,
    options?: CallOptions
  ): Promise<GetPermissionsRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/permissions/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.principal !== undefined) {
      params.append('principal', req.principal);
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetPermissionsRequest_Response | undefined;
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
        unmarshalGetPermissionsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the permissions for a securable. */
  async updatePermissions(
    req: UpdatePermissionsRequest,
    options?: CallOptions
  ): Promise<UpdatePermissionsRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/permissions/${req.securableType ?? ''}/${req.securableFullName ?? ''}`;
    const body = marshalRequest(req, marshalUpdatePermissionsRequestSchema);
    let resp: UpdatePermissionsRequest_Response | undefined;
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
        unmarshalUpdatePermissionsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
