// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
import {retryOn} from '@databricks/sdk-core/api';
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
import {z} from 'zod';
import type {
  App,
  AppDeployment,
  AppThumbnail,
  AppUpdate,
  AsyncUpdateAppRequest,
  CreateAppDeploymentRequest,
  CreateAppRequest,
  CreateCustomTemplateRequest,
  CreateSpaceRequest,
  CustomTemplate,
  DeleteAppRequest,
  DeleteAppThumbnailRequest,
  DeleteCustomTemplateRequest,
  DeleteSpaceRequest,
  GetAppDeploymentRequest,
  GetAppRequest,
  GetAppUpdateRequest,
  GetCustomTemplateRequest,
  GetOperationRequest,
  GetSpaceRequest,
  ListAppDeploymentsRequest,
  ListAppDeploymentsResponse,
  ListAppsRequest,
  ListAppsResponse,
  ListCustomTemplatesRequest,
  ListCustomTemplatesResponse,
  ListSpacesRequest,
  ListSpacesResponse,
  Operation,
  Space,
  SpaceUpdate,
  StartAppRequest,
  StopAppRequest,
  UpdateAppRequest,
  UpdateAppThumbnailRequest,
  UpdateCustomTemplateRequest,
  UpdateSpaceRequest,
} from './model';
import {
  AppDeployment_State,
  AppUpdate_UpdateStatus_UpdateState,
  ComputeStatus_ComputeState,
  marshalAppDeploymentSchema,
  marshalAppSchema,
  marshalAsyncUpdateAppRequestSchema,
  marshalCustomTemplateSchema,
  marshalSpaceSchema,
  marshalStartAppRequestSchema,
  marshalStopAppRequestSchema,
  marshalUpdateAppThumbnailRequestSchema,
  unmarshalAppDeploymentSchema,
  unmarshalAppSchema,
  unmarshalAppThumbnailSchema,
  unmarshalAppUpdateSchema,
  unmarshalCustomTemplateSchema,
  unmarshalListAppDeploymentsResponseSchema,
  unmarshalListAppsResponseSchema,
  unmarshalListCustomTemplatesResponseSchema,
  unmarshalListSpacesResponseSchema,
  unmarshalOperationSchema,
  unmarshalSpaceSchema,
  unmarshalSpaceUpdateSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

class StillRunningError extends Error {}

export class AppsClient {
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

  /** Creates an app update and starts the update process. The update process is asynchronous and the status of the update can be checked with the GetAppUpdate method. */
  async asyncUpdateApp(
    req: AsyncUpdateAppRequest,
    options?: CallOptions
  ): Promise<AppUpdate> {
    const url = `${this.host}/api/2.0/apps/${req.appName ?? ''}/update`;
    const body = marshalRequest(req, marshalAsyncUpdateAppRequestSchema);
    let resp: AppUpdate | undefined;
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
      resp = parseResponse(respBody, unmarshalAppUpdateSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async asyncUpdateAppWaiter(
    req: AsyncUpdateAppRequest,
    options?: CallOptions
  ): Promise<AsyncUpdateAppWaiter> {
    await this.asyncUpdateApp(req, options);
    if (req.appName === undefined) {
      throw new Error('request field appName required for polling is missing');
    }
    return new AsyncUpdateAppWaiter(this, req.appName);
  }

  /** Creates a new app. */
  async createApp(req: CreateAppRequest, options?: CallOptions): Promise<App> {
    const url = `${this.host}/api/2.0/apps`;
    const params = new URLSearchParams();
    if (req.noCompute !== undefined) {
      params.append('no_compute', String(req.noCompute));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.app, marshalAppSchema);
    let resp: App | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
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
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createAppWaiter(
    req: CreateAppRequest,
    options?: CallOptions
  ): Promise<CreateAppWaiter> {
    const resp = await this.createApp(req, options);
    if (resp.name === undefined) {
      throw new Error('response field name required for polling is missing');
    }
    return new CreateAppWaiter(this, resp.name);
  }

  /** Creates an app deployment for the app with the supplied name. */
  async createAppDeployment(
    req: CreateAppDeploymentRequest,
    options?: CallOptions
  ): Promise<AppDeployment> {
    const url = `${this.host}/api/2.0/apps/${req.appName ?? ''}/deployments`;
    const body = marshalRequest(req.appDeployment, marshalAppDeploymentSchema);
    let resp: AppDeployment | undefined;
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
      resp = parseResponse(respBody, unmarshalAppDeploymentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createAppDeploymentWaiter(
    req: CreateAppDeploymentRequest,
    options?: CallOptions
  ): Promise<CreateAppDeploymentWaiter> {
    const resp = await this.createAppDeployment(req, options);
    if (resp.deploymentId === undefined) {
      throw new Error(
        'response field deploymentId required for polling is missing'
      );
    }
    if (req.appName === undefined) {
      throw new Error('request field appName required for polling is missing');
    }
    return new CreateAppDeploymentWaiter(this, resp.deploymentId, req.appName);
  }

  /** Creates a custom template. */
  async createCustomTemplate(
    req: CreateCustomTemplateRequest,
    options?: CallOptions
  ): Promise<CustomTemplate> {
    const url = `${this.host}/api/2.0/apps-settings/templates`;
    const body = marshalRequest(req.template, marshalCustomTemplateSchema);
    let resp: CustomTemplate | undefined;
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
      resp = parseResponse(respBody, unmarshalCustomTemplateSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a new app space. */
  async createSpace(
    req: CreateSpaceRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/app-spaces`;
    const body = marshalRequest(req.space, marshalSpaceSchema);
    let resp: Operation | undefined;
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
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createSpaceOperation(
    req: CreateSpaceRequest,
    options?: CallOptions
  ): Promise<CreateSpaceOperation> {
    const op = await this.createSpace(req, options);
    return new CreateSpaceOperation(this, op);
  }

  /** Deletes an app. */
  async deleteApp(req: DeleteAppRequest, options?: CallOptions): Promise<App> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}`;
    let resp: App | undefined;
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
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the thumbnail for an app. */
  async deleteAppThumbnail(
    req: DeleteAppThumbnailRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}/thumbnail`;
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

  /** Deletes the custom template with the specified name. */
  async deleteCustomTemplate(
    req: DeleteCustomTemplateRequest,
    options?: CallOptions
  ): Promise<CustomTemplate> {
    const url = `${this.host}/api/2.0/apps-settings/templates/${req.name ?? ''}`;
    let resp: CustomTemplate | undefined;
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
      resp = parseResponse(respBody, unmarshalCustomTemplateSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes an app space. */
  async deleteSpace(
    req: DeleteSpaceRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/app-spaces/${req.name ?? ''}`;
    let resp: Operation | undefined;
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
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async deleteSpaceOperation(
    req: DeleteSpaceRequest,
    options?: CallOptions
  ): Promise<DeleteSpaceOperation> {
    const op = await this.deleteSpace(req, options);
    return new DeleteSpaceOperation(this, op);
  }

  /** Retrieves information for the app with the supplied name. */
  async getApp(req: GetAppRequest, options?: CallOptions): Promise<App> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}`;
    let resp: App | undefined;
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
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information for the app deployment with the supplied name and deployment id. */
  async getAppDeployment(
    req: GetAppDeploymentRequest,
    options?: CallOptions
  ): Promise<AppDeployment> {
    const url = `${this.host}/api/2.0/apps/${req.appName ?? ''}/deployments/${req.deploymentId ?? ''}`;
    let resp: AppDeployment | undefined;
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
      resp = parseResponse(respBody, unmarshalAppDeploymentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the status of an app update. */
  async getAppUpdate(
    req: GetAppUpdateRequest,
    options?: CallOptions
  ): Promise<AppUpdate> {
    const url = `${this.host}/api/2.0/apps/${req.appName ?? ''}/update`;
    let resp: AppUpdate | undefined;
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
      resp = parseResponse(respBody, unmarshalAppUpdateSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the custom template with the specified name. */
  async getCustomTemplate(
    req: GetCustomTemplateRequest,
    options?: CallOptions
  ): Promise<CustomTemplate> {
    const url = `${this.host}/api/2.0/apps-settings/templates/${req.name ?? ''}`;
    let resp: CustomTemplate | undefined;
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
      resp = parseResponse(respBody, unmarshalCustomTemplateSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information for the app space with the supplied name. */
  async getSpace(req: GetSpaceRequest, options?: CallOptions): Promise<Space> {
    const url = `${this.host}/api/2.0/app-spaces/${req.name ?? ''}`;
    let resp: Space | undefined;
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
      resp = parseResponse(respBody, unmarshalSpaceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the status of an app space update operation. */
  async getSpaceOperation(
    req: GetOperationRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/app-spaces/${req.name ?? ''}/operation`;
    let resp: Operation | undefined;
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
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all app deployments for the app with the supplied name. */
  async listAppDeployments(
    req: ListAppDeploymentsRequest,
    options?: CallOptions
  ): Promise<ListAppDeploymentsResponse> {
    const url = `${this.host}/api/2.0/apps/${req.appName ?? ''}/deployments`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAppDeploymentsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListAppDeploymentsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listAppDeploymentsIter(
    req: ListAppDeploymentsRequest,
    options?: CallOptions
  ): AsyncGenerator<AppDeployment> {
    const pageReq: ListAppDeploymentsRequest = {...req};
    for (;;) {
      const resp = await this.listAppDeployments(pageReq, options);
      for (const item of resp.appDeployments ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists all apps in the workspace. */
  async listApps(
    req: ListAppsRequest,
    options?: CallOptions
  ): Promise<ListAppsResponse> {
    const url = `${this.host}/api/2.0/apps`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.space !== undefined) {
      params.append('space', req.space);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAppsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListAppsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listAppsIter(
    req: ListAppsRequest,
    options?: CallOptions
  ): AsyncGenerator<App> {
    const pageReq: ListAppsRequest = {...req};
    for (;;) {
      const resp = await this.listApps(pageReq, options);
      for (const item of resp.apps ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists all custom templates in the workspace. */
  async listCustomTemplates(
    req: ListCustomTemplatesRequest,
    options?: CallOptions
  ): Promise<ListCustomTemplatesResponse> {
    const url = `${this.host}/api/2.0/apps-settings/templates`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCustomTemplatesResponse | undefined;
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
        unmarshalListCustomTemplatesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCustomTemplatesIter(
    req: ListCustomTemplatesRequest,
    options?: CallOptions
  ): AsyncGenerator<CustomTemplate> {
    const pageReq: ListCustomTemplatesRequest = {...req};
    for (;;) {
      const resp = await this.listCustomTemplates(pageReq, options);
      for (const item of resp.templates ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Lists all app spaces in the workspace. */
  async listSpaces(
    req: ListSpacesRequest,
    options?: CallOptions
  ): Promise<ListSpacesResponse> {
    const url = `${this.host}/api/2.0/app-spaces`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSpacesResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalListSpacesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listSpacesIter(
    req: ListSpacesRequest,
    options?: CallOptions
  ): AsyncGenerator<Space> {
    const pageReq: ListSpacesRequest = {...req};
    for (;;) {
      const resp = await this.listSpaces(pageReq, options);
      for (const item of resp.spaces ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Start the last active deployment of the app in the workspace. */
  async startApp(req: StartAppRequest, options?: CallOptions): Promise<App> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}/start`;
    const body = marshalRequest(req, marshalStartAppRequestSchema);
    let resp: App | undefined;
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
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async startAppWaiter(
    req: StartAppRequest,
    options?: CallOptions
  ): Promise<StartAppWaiter> {
    await this.startApp(req, options);
    if (req.name === undefined) {
      throw new Error('request field name required for polling is missing');
    }
    return new StartAppWaiter(this, req.name);
  }

  /** Stops the active deployment of the app in the workspace. */
  async stopApp(req: StopAppRequest, options?: CallOptions): Promise<App> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}/stop`;
    const body = marshalRequest(req, marshalStopAppRequestSchema);
    let resp: App | undefined;
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
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async stopAppWaiter(
    req: StopAppRequest,
    options?: CallOptions
  ): Promise<StopAppWaiter> {
    await this.stopApp(req, options);
    if (req.name === undefined) {
      throw new Error('request field name required for polling is missing');
    }
    return new StopAppWaiter(this, req.name);
  }

  /** Updates the app with the supplied name. */
  async updateApp(req: UpdateAppRequest, options?: CallOptions): Promise<App> {
    const url = `${this.host}/api/2.0/apps/${req.app?.name ?? ''}`;
    const body = marshalRequest(req.app, marshalAppSchema);
    let resp: App | undefined;
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
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the thumbnail for an app. */
  async updateAppThumbnail(
    req: UpdateAppThumbnailRequest,
    options?: CallOptions
  ): Promise<AppThumbnail> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}/thumbnail`;
    const body = marshalRequest(req, marshalUpdateAppThumbnailRequestSchema);
    let resp: AppThumbnail | undefined;
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
      resp = parseResponse(respBody, unmarshalAppThumbnailSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the custom template with the specified name. Note that the template name cannot be updated. */
  async updateCustomTemplate(
    req: UpdateCustomTemplateRequest,
    options?: CallOptions
  ): Promise<CustomTemplate> {
    const url = `${this.host}/api/2.0/apps-settings/templates/${req.template?.name ?? ''}`;
    const body = marshalRequest(req.template, marshalCustomTemplateSchema);
    let resp: CustomTemplate | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomTemplateSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates an app space. The update process is asynchronous and the status of the update can be checked with the GetSpaceOperation method. */
  async updateSpace(
    req: UpdateSpaceRequest,
    options?: CallOptions
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/app-spaces/${req.space?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.space, marshalSpaceSchema);
    let resp: Operation | undefined;
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
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateSpaceOperation(
    req: UpdateSpaceRequest,
    options?: CallOptions
  ): Promise<UpdateSpaceOperation> {
    const op = await this.updateSpace(req, options);
    return new UpdateSpaceOperation(this, op);
  }
}

export class CreateSpaceOperation {
  constructor(
    private readonly client: AppsClient,
    private operation: Operation
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<Space | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z.lazy(() => unmarshalSpaceSchema).parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: CallOptions): Promise<Space> {
    const errStillRunning = new Error('operation still in progress');
    let result: Space | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getSpaceOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalSpaceSchema).parse(op.result.response);
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getSpaceOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class DeleteSpaceOperation {
  constructor(
    private readonly client: AppsClient,
    private operation: Operation
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<Space | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z.lazy(() => unmarshalSpaceSchema).parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: CallOptions): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getSpaceOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getSpaceOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class UpdateSpaceOperation {
  constructor(
    private readonly client: AppsClient,
    private operation: Operation
  ) {}

  /** Returns the server-assigned name of the long-running operation. */
  name(): Promise<string | undefined> {
    return Promise.resolve(this.operation.name);
  }

  /** Returns metadata associated with the long-running operation. */
  metadata(): Promise<SpaceUpdate | undefined> {
    if (this.operation.metadata === undefined) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(
      z.lazy(() => unmarshalSpaceUpdateSchema).parse(this.operation.metadata)
    );
  }

  /**
   * Polls the operation until it completes.
   *
   * Throws if the operation failed.
   */
  async wait(options?: CallOptions): Promise<Space> {
    const errStillRunning = new Error('operation still in progress');
    let result: Space | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getSpaceOperation(
        {
          name: this.operation.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );
      this.operation = op;
      if (op.done === undefined) {
        throw new Error('operation is missing the done field');
      }
      if (!op.done) {
        throw errStillRunning;
      }

      if (op.result?.$case === 'error') {
        const err = op.result.error;
        const msg =
          err.message !== undefined && err.message !== ''
            ? err.message
            : 'unknown error';
        const errorMsg =
          err.errorCode !== undefined ? `[${err.errorCode}] ${msg}` : msg;
        throw new Error(`operation failed: ${errorMsg}`, {
          cause: err,
        });
      }

      if (op.result?.$case !== 'response') {
        throw new Error('operation completed without a response');
      }

      result = z.lazy(() => unmarshalSpaceSchema).parse(op.result.response);
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(options?: CallOptions): Promise<boolean | undefined> {
    const op = await this.client.getSpaceOperation(
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class AsyncUpdateAppWaiter {
  constructor(
    private readonly client: AppsClient,
    readonly appName: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<AppUpdate> {
    let result: AppUpdate | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getAppUpdate(
        {
          appName: this.appName,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );

      const status = pollResp.status?.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case AppUpdate_UpdateStatus_UpdateState.SUCCEEDED:
          result = pollResp;
          return;
        case AppUpdate_UpdateStatus_UpdateState.FAILED: {
          const msg = pollResp.status?.message ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getAppUpdate(
      {
        appName: this.appName,
      },
      options
    );

    const status = pollResp.status?.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case AppUpdate_UpdateStatus_UpdateState.SUCCEEDED:
      case AppUpdate_UpdateStatus_UpdateState.FAILED:
        return true;
      default:
        return false;
    }
  }
}

export class CreateAppWaiter {
  constructor(
    private readonly client: AppsClient,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<App> {
    let result: App | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getApp(
        {
          name: this.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );

      const status = pollResp.computeStatus?.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ComputeStatus_ComputeState.ACTIVE:
          result = pollResp;
          return;
        case ComputeStatus_ComputeState.ERROR:
        case ComputeStatus_ComputeState.STOPPED: {
          const msg = pollResp.computeStatus?.message ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getApp(
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.computeStatus?.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ComputeStatus_ComputeState.ACTIVE:
      case ComputeStatus_ComputeState.ERROR:
      case ComputeStatus_ComputeState.STOPPED:
        return true;
      default:
        return false;
    }
  }
}

export class CreateAppDeploymentWaiter {
  constructor(
    private readonly client: AppsClient,
    readonly deploymentId: string,
    readonly appName: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<AppDeployment> {
    let result: AppDeployment | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getAppDeployment(
        {
          deploymentId: this.deploymentId,
          appName: this.appName,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );

      const status = pollResp.status?.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case AppDeployment_State.SUCCEEDED:
          result = pollResp;
          return;
        case AppDeployment_State.FAILED: {
          const msg = pollResp.status?.message ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getAppDeployment(
      {
        deploymentId: this.deploymentId,
        appName: this.appName,
      },
      options
    );

    const status = pollResp.status?.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case AppDeployment_State.SUCCEEDED:
      case AppDeployment_State.FAILED:
        return true;
      default:
        return false;
    }
  }
}

export class StartAppWaiter {
  constructor(
    private readonly client: AppsClient,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<App> {
    let result: App | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getApp(
        {
          name: this.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );

      const status = pollResp.computeStatus?.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ComputeStatus_ComputeState.ACTIVE:
          result = pollResp;
          return;
        case ComputeStatus_ComputeState.ERROR:
        case ComputeStatus_ComputeState.STOPPED: {
          const msg = pollResp.computeStatus?.message ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getApp(
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.computeStatus?.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ComputeStatus_ComputeState.ACTIVE:
      case ComputeStatus_ComputeState.ERROR:
      case ComputeStatus_ComputeState.STOPPED:
        return true;
      default:
        return false;
    }
  }
}

export class StopAppWaiter {
  constructor(
    private readonly client: AppsClient,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<App> {
    let result: App | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getApp(
        {
          name: this.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
      );

      const status = pollResp.computeStatus?.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ComputeStatus_ComputeState.STOPPED:
          result = pollResp;
          return;
        case ComputeStatus_ComputeState.ERROR: {
          const msg = pollResp.computeStatus?.message ?? '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    const retryOptions: CallOptions = {
      ...(options?.signal !== undefined && {signal: options.signal}),
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getApp(
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.computeStatus?.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ComputeStatus_ComputeState.STOPPED:
      case ComputeStatus_ComputeState.ERROR:
        return true;
      default:
        return false;
    }
  }
}
