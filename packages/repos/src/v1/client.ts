// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
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

export class Client {
  private readonly host: string;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.logger = options.logger ?? new NoOpLogger();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Creates a repo in the workspace and links it to the remote Git repo specified.
   * Note that repos created programmatically must be linked to a remote Git repo, unlike repos
   * created in the browser.
   */
  async createRepo(
    signal: AbortSignal | undefined,
    req: CreateRepo,
    options?: Options
  ): Promise<CreateRepo_Response> {
    const url = `${this.host}/api/2.0/repos`;
    const body = marshalRequest(req, marshalCreateRepoSchema);
    let resp: CreateRepo_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateRepo_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified repo. */
  async deleteProject(
    signal: AbortSignal | undefined,
    req: DeleteProject,
    options?: Options
  ): Promise<DeleteProject_Response> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    let resp: DeleteProject_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteProject_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Returns the repo with the given repo ID. */
  async getRepo(
    signal: AbortSignal | undefined,
    req: GetRepo,
    options?: Options
  ): Promise<GetRepo_Response> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    let resp: GetRepo_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetRepo_ResponseSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ListRepos,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListRepos_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listReposIter(
    signal: AbortSignal | undefined,
    req: ListRepos,
    options?: Options
  ): AsyncGenerator<RepoInfo> {
    const pageReq: ListRepos = {...req};
    for (;;) {
      const resp = await this.listRepos(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: UpdateRepo,
    options?: Options
  ): Promise<UpdateRepo_Response> {
    const url = `${this.host}/api/2.0/repos/${String(req.id ?? '')}`;
    const body = marshalRequest(req, marshalUpdateRepoSchema);
    let resp: UpdateRepo_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUpdateRepo_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
