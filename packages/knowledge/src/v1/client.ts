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
  AssetLink,
  CreateAssetLinkRequest,
  CreatePageRequest,
  DeleteAssetLinkRequest,
  DeletePageRequest,
  GetAssetLinkRequest,
  GetPageRequest,
  ListPagesRequest,
  ListPagesResponse,
  Page,
  UpdatePageRequest,
} from './model';
import {
  marshalAssetLinkSchema,
  marshalPageSchema,
  unmarshalAssetLinkSchema,
  unmarshalListPagesResponseSchema,
  unmarshalPageSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class KnowledgeClient {
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
   * Create an asset link on a page. For REST, send AssetLink fields directly
   * as the JSON request body; the parent path supplies the page and category.
   * An existing target with the same asset type, scope, and resolved asset ID
   * in that page/category returns the original link and creation time.
   */
  async createAssetLink(
    req: CreateAssetLinkRequest,
    options?: CallOptions
  ): Promise<AssetLink> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/knowledge/${req.parent ?? ''}/asset-links`;
    const body = marshalRequest(req.assetLink, marshalAssetLinkSchema);
    let resp: AssetLink | undefined;
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
      resp = parseResponse(respBody, unmarshalAssetLinkSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Create a knowledge page. Optional `request_id` makes retries idempotent while
   * the page exists; without it, retries can create duplicate drafts.
   * For REST, send Page fields as the JSON body and `request_id` as a query parameter.
   * When page permissions are enforced, creating a published page or assigning
   * another owner requires Page Manager or Domain Admin permissions on the domain,
   * including inherited grants. Creating your own draft requires neither grant.
   *
   * Errors: `INVALID_PARAMETER_VALUE` (missing `page`/`domain` or field validation),
   * `NOT_FOUND` (the referenced `domain` does not exist), `ALREADY_EXISTS` (a
   * published page with the same `domain` and `display_name` already exists),
   * `PERMISSION_DENIED` (insufficient permissions), `RESOURCE_EXHAUSTED`
   * (rate limited), `INTERNAL_ERROR` (unexpected failure).
   */
  async createPage(
    req: CreatePageRequest,
    options?: CallOptions
  ): Promise<Page> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/knowledge/pages`;
    const params = new URLSearchParams();
    if (req.requestId !== undefined) {
      params.append('request_id', req.requestId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.page, marshalPageSchema);
    let resp: Page | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'POST',
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
      resp = parseResponse(respBody, unmarshalPageSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Delete an asset link by its full resource name. Returns NOT_FOUND if the
   * link does not exist, including when it has already been deleted.
   */
  async deleteAssetLink(
    req: DeleteAssetLinkRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/knowledge/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Delete a knowledge page by resource name.
   *
   * Returns `NOT_FOUND` if no page with the given `name` exists.
   */
  async deletePage(
    req: DeletePageRequest,
    options?: CallOptions
  ): Promise<void> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/knowledge/${req.name ?? ''}`;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /**
   * Get an asset link by its full resource name. Table links return the table's
   * current FQN and require access to that table. Query and Genie
   * links return native UUIDs and require access in the caller's workspace.
   * Returns NOT_FOUND if the link is missing or its target identifier cannot be
   * resolved.
   */
  async getAssetLink(
    req: GetAssetLinkRequest,
    options?: CallOptions
  ): Promise<AssetLink> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/knowledge/${req.name ?? ''}`;
    let resp: AssetLink | undefined;
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
      resp = parseResponse(respBody, unmarshalAssetLinkSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get a knowledge page by resource name.
   *
   * Returns `NOT_FOUND` if no page with the given `name` exists.
   */
  async getPage(req: GetPageRequest, options?: CallOptions): Promise<Page> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/knowledge/${req.name ?? ''}`;
    let resp: Page | undefined;
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
      resp = parseResponse(respBody, unmarshalPageSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * List visible knowledge pages in the account, optionally narrowed by
   * `domain` and `state`. With a domain filter, the caller must administer that
   * domain, including through inherited grants. Without a domain filter,
   * including when filtering only by state, account-wide Manage Discover or
   * Account Admin permission is required. List returns page metadata.
   */
  async listPages(
    req: ListPagesRequest,
    options?: CallOptions
  ): Promise<ListPagesResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/knowledge/pages`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.filter !== undefined) {
      params.append('filter', req.filter);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListPagesResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListPagesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listPagesIter(
    req: ListPagesRequest,
    options?: CallOptions
  ): AsyncGenerator<Page> {
    const pageReq: ListPagesRequest = {...req};
    for (;;) {
      const resp = await this.listPages(pageReq, options);
      for (const item of resp.pages ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Update an existing knowledge page. For REST, send Page fields directly as
   * the JSON body and supply `update_mask` as a query parameter. The resource
   * `name` identifies the page; omitted mask fields retain their stored values.
   *
   * Errors: `INVALID_PARAMETER_VALUE` (field validation), `NOT_FOUND` (the page does
   * not exist), `ALREADY_EXISTS` (a rename would collide with another published
   * page), `RESOURCE_EXHAUSTED`, `ABORTED`, `INTERNAL_ERROR`.
   */
  async updatePage(
    req: UpdatePageRequest,
    options?: CallOptions
  ): Promise<Page> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/knowledge/${req.page?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.page, marshalPageSchema);
    let resp: Page | undefined;
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
      resp = parseResponse(respBody, unmarshalPageSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
