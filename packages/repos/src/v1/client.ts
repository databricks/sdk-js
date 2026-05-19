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
  CreateRepo,
  CreateRepo_Response,
  DeleteProject,
  DeleteProject_Response,
  GetRepo,
  GetRepo_Response,
  ListRepos,
  ListRepos_Response,
  RepoInfo,
  UpdateRepo,
  UpdateRepo_Response,
} from './model';
import {
  marshalCreateRepoSchema,
  marshalUpdateRepoSchema,
  unmarshalCreateRepo_ResponseSchema,
  unmarshalDeleteProject_ResponseSchema,
  unmarshalGetRepo_ResponseSchema,
  unmarshalListRepos_ResponseSchema,
  unmarshalUpdateRepo_ResponseSchema,
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
   * Creates a repo in the workspace and links it to the remote Git repo specified.
   * Note that repos created programmatically must be linked to a remote Git repo, unlike repos
   * created in the browser.
   */
  async createRepo(
    req: CreateRepo,
    options?: CallOptions
  ): Promise<CreateRepo_Response> {
    const url = `${this.host}/api/2.0/repos`;
    const body = marshalRequest(req, marshalCreateRepoSchema);
    let resp: CreateRepo_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateRepo_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified repo. */
  async deleteProject(
    req: DeleteProject,
    options?: CallOptions
  ): Promise<DeleteProject_Response> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    let resp: DeleteProject_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteProject_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns the repo with the given repo ID. */
  async getRepo(
    req: GetRepo,
    options?: CallOptions
  ): Promise<GetRepo_Response> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    let resp: GetRepo_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetRepo_ResponseSchema);
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
    req: ListRepos,
    options?: CallOptions
  ): Promise<ListRepos_Response> {
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
    let resp: ListRepos_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListRepos_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listReposIter(
    req: ListRepos,
    options?: CallOptions
  ): AsyncGenerator<RepoInfo> {
    const pageReq: ListRepos = {...req};
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
    req: UpdateRepo,
    options?: CallOptions
  ): Promise<UpdateRepo_Response> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    const body = marshalRequest(req, marshalUpdateRepoSchema);
    let resp: UpdateRepo_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateRepo_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
