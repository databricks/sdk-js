// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  GetSoftwareArtifactRequest,
  GetSoftwareArtifactVersionRequest,
  ListSoftwareArtifactVersionsRequest,
  ListSoftwareArtifactVersionsResponse,
  ListSoftwareArtifactsRequest,
  ListSoftwareArtifactsResponse,
  ResolveSoftwareArtifactVersionRequest,
  ResolveSoftwareArtifactVersionResponse,
  SoftwareArtifact,
  SoftwareArtifactVersion,
  UpdateSoftwareArtifactRequest,
} from './model';
import {
  marshalResolveSoftwareArtifactVersionRequestSchema,
  marshalSoftwareArtifactSchema,
  unmarshalListSoftwareArtifactVersionsResponseSchema,
  unmarshalListSoftwareArtifactsResponseSchema,
  unmarshalResolveSoftwareArtifactVersionResponseSchema,
  unmarshalSoftwareArtifactSchema,
  unmarshalSoftwareArtifactVersionSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class SoftwareArtifactsClient {
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

  /** Gets a software artifact. */
  async getSoftwareArtifact(
    req: GetSoftwareArtifactRequest,
    options?: CallOptions
  ): Promise<SoftwareArtifact> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.name ?? ''}`;
    let resp: SoftwareArtifact | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSoftwareArtifactSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets a software artifact version. */
  async getSoftwareArtifactVersion(
    req: GetSoftwareArtifactVersionRequest,
    options?: CallOptions
  ): Promise<SoftwareArtifactVersion> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.name ?? ''}`;
    let resp: SoftwareArtifactVersion | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSoftwareArtifactVersionSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists the versions of a software artifact. */
  async listSoftwareArtifactVersions(
    req: ListSoftwareArtifactVersionsRequest,
    options?: CallOptions
  ): Promise<ListSoftwareArtifactVersionsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.parent ?? ''}/versions`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSoftwareArtifactVersionsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListSoftwareArtifactVersionsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listSoftwareArtifactVersionsIter(
    req: ListSoftwareArtifactVersionsRequest,
    options?: CallOptions
  ): AsyncGenerator<SoftwareArtifactVersion> {
    const pageReq: ListSoftwareArtifactVersionsRequest = {...req};
    for (;;) {
      const resp = await this.listSoftwareArtifactVersions(pageReq, options);
      for (const item of resp.softwareArtifactVersions ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists software artifacts in a schema. */
  async listSoftwareArtifacts(
    req: ListSoftwareArtifactsRequest,
    options?: CallOptions
  ): Promise<ListSoftwareArtifactsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/software-artifacts`;
    const params = new URLSearchParams();
    if (req.parent !== undefined) {
      params.append('parent', req.parent);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSoftwareArtifactsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListSoftwareArtifactsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listSoftwareArtifactsIter(
    req: ListSoftwareArtifactsRequest,
    options?: CallOptions
  ): AsyncGenerator<SoftwareArtifact> {
    const pageReq: ListSoftwareArtifactsRequest = {...req};
    for (;;) {
      const resp = await this.listSoftwareArtifacts(pageReq, options);
      for (const item of resp.softwareArtifacts ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Resolves a software artifact version from its tag alias. */
  async resolveSoftwareArtifactVersion(
    req: ResolveSoftwareArtifactVersionRequest,
    options?: CallOptions
  ): Promise<ResolveSoftwareArtifactVersionResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.parent ?? ''}/versions:resolve`;
    const body = marshalRequest(
      req,
      marshalResolveSoftwareArtifactVersionRequestSchema
    );
    let resp: ResolveSoftwareArtifactVersionResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalResolveSoftwareArtifactVersionResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a software artifact. The name is immutable; only the owner may be changed.
   * The destination owner must exist in the account. The caller needs MANAGE_ACCESS_CONTROL
   * on the artifact. The response contains its name and the requested owner; audit fields are omitted.
   */
  async updateSoftwareArtifact(
    req: UpdateSoftwareArtifactRequest,
    options?: CallOptions
  ): Promise<SoftwareArtifact> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/${req.softwareArtifact?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.softwareArtifact,
      marshalSoftwareArtifactSchema
    );
    let resp: SoftwareArtifact | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
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
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSoftwareArtifactSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
