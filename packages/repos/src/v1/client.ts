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
  CreateRepoRequest,
  CreateRepoRequest_Response,
  DeleteProjectRequest,
  DeleteProjectRequest_Response,
  GetRepoRequest,
  GetRepoRequest_Response,
  ListReposRequest,
  ListReposRequest_Response,
  RepoInfo,
  UpdateRepoRequest,
  UpdateRepoRequest_Response,
} from './model';
import {
  marshalCreateRepoRequestSchema,
  marshalUpdateRepoRequestSchema,
  unmarshalCreateRepoRequest_ResponseSchema,
  unmarshalDeleteProjectRequest_ResponseSchema,
  unmarshalGetRepoRequest_ResponseSchema,
  unmarshalListReposRequest_ResponseSchema,
  unmarshalUpdateRepoRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
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
   * Creates a repo in the workspace and links it to the remote Git repo specified.
   * Note that repos created programmatically must be linked to a remote Git repo, unlike repos
   * created in the browser.
   */
  async createRepo(
    req: CreateRepoRequest,
    options?: CallOptions
  ): Promise<CreateRepoRequest_Response> {
    const url = `${this.host}/api/2.0/repos`;
    const body = marshalRequest(req, marshalCreateRepoRequestSchema);
    let resp: CreateRepoRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalCreateRepoRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified repo. */
  async deleteProject(
    req: DeleteProjectRequest,
    options?: CallOptions
  ): Promise<DeleteProjectRequest_Response> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    let resp: DeleteProjectRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(
        respBody,
        unmarshalDeleteProjectRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns the repo with the given repo ID. */
  async getRepo(
    req: GetRepoRequest,
    options?: CallOptions
  ): Promise<GetRepoRequest_Response> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    let resp: GetRepoRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalGetRepoRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<ListReposRequest_Response> {
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
    let resp: ListReposRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalListReposRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  ): Promise<UpdateRepoRequest_Response> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    const body = marshalRequest(req, marshalUpdateRepoRequestSchema);
    let resp: UpdateRepoRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(respBody, unmarshalUpdateRepoRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
