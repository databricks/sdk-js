// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
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
  CreateRepoRequest,
  CreateRepoResponse,
  DeleteProjectRequest,
  DeleteProjectResponse,
  GetRepoRequest,
  GetRepoResponse,
  ListReposRequest,
  ListReposResponse,
  RepoInfo,
  UpdateRepoRequest,
  UpdateRepoResponse,
} from './model';
import {
  marshalCreateRepoRequestSchema,
  marshalUpdateRepoRequestSchema,
  unmarshalCreateRepoResponseSchema,
  unmarshalDeleteProjectResponseSchema,
  unmarshalGetRepoResponseSchema,
  unmarshalListReposResponseSchema,
  unmarshalUpdateRepoResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ReposClient {
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
   * Creates a repo in the workspace and links it to the remote Git repo specified.
   * Note that repos created programmatically must be linked to a remote Git repo, unlike repos
   * created in the browser.
   */
  async createRepo(
    req: CreateRepoRequest,
    options?: CallOptions
  ): Promise<CreateRepoResponse> {
    const url = `${this.host}/api/2.0/repos`;
    const body = marshalRequest(req, marshalCreateRepoRequestSchema);
    let resp: CreateRepoResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalCreateRepoResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified repo. */
  async deleteProject(
    req: DeleteProjectRequest,
    options?: CallOptions
  ): Promise<DeleteProjectResponse> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    let resp: DeleteProjectResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteProjectResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Returns the repo with the given repo ID. */
  async getRepo(
    req: GetRepoRequest,
    options?: CallOptions
  ): Promise<GetRepoResponse> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    let resp: GetRepoResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(respBody, unmarshalGetRepoResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Returns repos that the calling user has Manage permissions on.
   * Use `next_page_token` to iterate through additional pages.
   */
  async listRepos(
    req: ListReposRequest,
    options?: CallOptions
  ): Promise<ListReposResponse> {
    const url = `${this.host}/api/2.0/repos`;
    const params = new URLSearchParams();
    if (req.pathPrefix !== undefined) {
      params.append('path_prefix', req.pathPrefix);
    }
    if (req.nextPageToken !== undefined) {
      params.append('next_page_token', req.nextPageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListReposResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListReposResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listReposIter(
    req: ListReposRequest,
    options?: CallOptions
  ): AsyncGenerator<RepoInfo> {
    const pageReq: ListReposRequest = {...req};
    for (;;) {
      const resp = await this.listRepos(pageReq, options);
      for (const item of resp.repos ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.nextPageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates the repo to a different branch or tag, or updates the repo to the latest commit on
   * the same branch.
   */
  async updateRepo(
    req: UpdateRepoRequest,
    options?: CallOptions
  ): Promise<UpdateRepoResponse> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    const body = marshalRequest(req, marshalUpdateRepoRequestSchema);
    let resp: UpdateRepoResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateRepoResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
