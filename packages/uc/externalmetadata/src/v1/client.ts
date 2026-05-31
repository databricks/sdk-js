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
  CreateExternalMetadataRequest,
  DeleteExternalMetadataRequest,
  ExternalMetadata,
  GetExternalMetadataRequest,
  ListExternalMetadataRequest,
  ListExternalMetadataResponseV2,
  UpdateExternalMetadataRequest,
} from './model';
import {
  marshalExternalMetadataSchema,
  unmarshalExternalMetadataSchema,
  unmarshalListExternalMetadataResponseV2Schema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ExternalMetadataClient {
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
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Creates a new external metadata object in the parent metastore if the caller is a metastore admin or has the **CREATE_EXTERNAL_METADATA** privilege.
   * Grants **BROWSE** to all account users upon creation by default.
   */
  async createExternalMetadataV2(
    req: CreateExternalMetadataRequest,
    options?: CallOptions
  ): Promise<ExternalMetadata> {
    const url = `${this.host}/api/2.0/lineage-tracking/external-metadata`;
    const body = marshalRequest(
      req.externalMetadata,
      marshalExternalMetadataSchema
    );
    let resp: ExternalMetadata | undefined;
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
      resp = parseResponse(respBody, unmarshalExternalMetadataSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes the external metadata object that matches the supplied name.
   * The caller must be a metastore admin, the owner of the external metadata object, or a user that has the **MANAGE** privilege.
   */
  async deleteExternalMetadataV2(
    req: DeleteExternalMetadataRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/lineage-tracking/external-metadata/${req.name ?? ''}`;
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
   * Gets the specified external metadata object in a metastore.
   * The caller must be a metastore admin, the owner of the external metadata object, or a user that has the **BROWSE** privilege.
   */
  async getExternalMetadataV2(
    req: GetExternalMetadataRequest,
    options?: CallOptions
  ): Promise<ExternalMetadata> {
    const url = `${this.host}/api/2.0/lineage-tracking/external-metadata/${req.name ?? ''}`;
    let resp: ExternalMetadata | undefined;
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
      resp = parseResponse(respBody, unmarshalExternalMetadataSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of external metadata objects in the metastore.
   * If the caller is the metastore admin, all external metadata objects will be retrieved.
   * Otherwise, only external metadata objects that the caller has **BROWSE** on will be retrieved.
   * There is no guarantee of a specific ordering of the elements in the array.
   */
  async listExternalMetadataV2(
    req: ListExternalMetadataRequest,
    options?: CallOptions
  ): Promise<ListExternalMetadataResponseV2> {
    const url = `${this.host}/api/2.0/lineage-tracking/external-metadata`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListExternalMetadataResponseV2 | undefined;
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
        unmarshalListExternalMetadataResponseV2Schema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listExternalMetadataV2Iter(
    req: ListExternalMetadataRequest,
    options?: CallOptions
  ): AsyncGenerator<ExternalMetadata> {
    const pageReq: ListExternalMetadataRequest = {...req};
    for (;;) {
      const resp = await this.listExternalMetadataV2(pageReq, options);
      for (const item of resp.externalMetadata ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates the external metadata object that matches the supplied name. The caller can only update either the owner or other metadata fields in one request.
   * The caller must be a metastore admin, the owner of the external metadata object, or a user that has the **MODIFY** privilege.
   * If the caller is updating the owner, they must also have the **MANAGE** privilege.
   */
  async updateExternalMetadataV2(
    req: UpdateExternalMetadataRequest,
    options?: CallOptions
  ): Promise<ExternalMetadata> {
    const url = `${this.host}/api/2.0/lineage-tracking/external-metadata/${req.externalMetadata?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.externalMetadata,
      marshalExternalMetadataSchema
    );
    let resp: ExternalMetadata | undefined;
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
      resp = parseResponse(respBody, unmarshalExternalMetadataSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
