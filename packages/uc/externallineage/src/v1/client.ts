// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {HttpClient} from '@databricks/sdk-core/http';
import {resolveClientConfig} from '@databricks/sdk-core/config';
import {newHttpClient} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  flattenQueryParams,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateExternalLineageRelationshipRequest,
  DeleteExternalLineageRelationshipRequest,
  ExternalLineageInfo,
  ExternalLineageRelationship,
  ListExternalLineageRelationshipsRequest,
  ListExternalLineageRelationshipsResponse,
  UpdateExternalLineageRelationshipRequest,
} from './model';
import {
  marshalCreateRequestExternalLineageSchema,
  marshalDeleteRequestExternalLineageSchema,
  marshalExternalLineageRelationshipObjectSchema,
  marshalUpdateRequestExternalLineageSchema,
  unmarshalExternalLineageRelationshipSchema,
  unmarshalListExternalLineageRelationshipsResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ExternalLineageClient {
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
    // Resolve host and credentials from one source so they share a profile.
    const config = resolveClientConfig(options);
    this.host = (config.host ?? '').replace(/\/$/, '');
    this.workspaceId = config.workspaceId;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Creates an external lineage relationship between a <Databricks> or external metadata object and another external metadata object. */
  async createExternalLineageRelationship(
    req: CreateExternalLineageRelationshipRequest,
    options?: CallOptions
  ): Promise<ExternalLineageRelationship> {
    const url = `${this.host}/api/2.0/lineage-tracking/external-lineage`;
    const body = marshalRequest(
      req.externalLineageRelationship,
      marshalCreateRequestExternalLineageSchema
    );
    let resp: ExternalLineageRelationship | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(
        respBody,
        unmarshalExternalLineageRelationshipSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes an external lineage relationship between a <Databricks> or external metadata object and another external metadata object. */
  async deleteExternalLineageRelationship(
    req: DeleteExternalLineageRelationshipRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/lineage-tracking/external-lineage`;
    const params = new URLSearchParams();
    if (req.externalLineageRelationship !== undefined) {
      flattenQueryParams(
        'external_lineage_relationship',
        marshalDeleteRequestExternalLineageSchema.parse(
          req.externalLineageRelationship
        ),
        params
      );
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Lists external lineage relationships of a <Databricks> object or external metadata given a supplied direction. */
  async listExternalLineageRelationships(
    req: ListExternalLineageRelationshipsRequest,
    options?: CallOptions
  ): Promise<ListExternalLineageRelationshipsResponse> {
    const url = `${this.host}/api/2.0/lineage-tracking/external-lineage`;
    const params = new URLSearchParams();
    if (req.objectInfo !== undefined) {
      flattenQueryParams(
        'object_info',
        marshalExternalLineageRelationshipObjectSchema.parse(req.objectInfo),
        params
      );
    }
    if (req.lineageDirection !== undefined) {
      params.append('lineage_direction', req.lineageDirection);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListExternalLineageRelationshipsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListExternalLineageRelationshipsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listExternalLineageRelationshipsIter(
    req: ListExternalLineageRelationshipsRequest,
    options?: CallOptions
  ): AsyncGenerator<ExternalLineageInfo> {
    const pageReq: ListExternalLineageRelationshipsRequest = {...req};
    for (;;) {
      const resp = await this.listExternalLineageRelationships(
        pageReq,
        options
      );
      for (const item of resp.externalLineageRelationships ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Updates an external lineage relationship between a <Databricks> or external metadata object and another external metadata object. */
  async updateExternalLineageRelationship(
    req: UpdateExternalLineageRelationshipRequest,
    options?: CallOptions
  ): Promise<ExternalLineageRelationship> {
    const url = `${this.host}/api/2.0/lineage-tracking/external-lineage`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.externalLineageRelationship,
      marshalUpdateRequestExternalLineageSchema
    );
    let resp: ExternalLineageRelationship | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(
        respBody,
        unmarshalExternalLineageRelationshipSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
