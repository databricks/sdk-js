// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call, Options} from '@databricks/sdk-core/api';
import {execute, retryOn} from '@databricks/sdk-core/api';
import {createDefault} from '@databricks/sdk-core/clientinfo';
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
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

class StillRunningError extends Error {}

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

  /** Creates an app update and starts the update process. The update process is asynchronous and the status of the update can be checked with the GetAppUpdate method. */
  async asyncUpdateApp(
    signal: AbortSignal | undefined,
    req: AsyncUpdateAppRequest,
    options?: Options
  ): Promise<AppUpdate> {
    const url = `${this.host}/api/2.0/apps/${req.appName ?? ''}/update`;
    const body = marshalRequest(req, marshalAsyncUpdateAppRequestSchema);
    let resp: AppUpdate | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAppUpdateSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async asyncUpdateAppWaiter(
    signal: AbortSignal | undefined,
    req: AsyncUpdateAppRequest,
    options?: Options
  ): Promise<AsyncUpdateAppWaiter> {
    await this.asyncUpdateApp(signal, req, options);
    if (req.appName === undefined) {
      throw new Error('request field appName required for polling is missing');
    }
    return new AsyncUpdateAppWaiter(this, req.appName);
  }

  /** Creates a new app. */
  async createApp(
    signal: AbortSignal | undefined,
    req: CreateAppRequest,
    options?: Options
  ): Promise<App> {
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createAppWaiter(
    signal: AbortSignal | undefined,
    req: CreateAppRequest,
    options?: Options
  ): Promise<CreateAppWaiter> {
    const resp = await this.createApp(signal, req, options);
    if (resp.name === undefined) {
      throw new Error('response field name required for polling is missing');
    }
    return new CreateAppWaiter(this, resp.name);
  }

  /** Creates an app deployment for the app with the supplied name. */
  async createAppDeployment(
    signal: AbortSignal | undefined,
    req: CreateAppDeploymentRequest,
    options?: Options
  ): Promise<AppDeployment> {
    const url = `${this.host}/api/2.0/apps/${req.appName ?? ''}/deployments`;
    const params = new URLSearchParams();
    if (req.autoDeploy !== undefined) {
      params.append('auto_deploy', String(req.autoDeploy));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.appDeployment, marshalAppDeploymentSchema);
    let resp: AppDeployment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
      resp = parseResponse(respBody, unmarshalAppDeploymentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createAppDeploymentWaiter(
    signal: AbortSignal | undefined,
    req: CreateAppDeploymentRequest,
    options?: Options
  ): Promise<CreateAppDeploymentWaiter> {
    const resp = await this.createAppDeployment(signal, req, options);
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
    signal: AbortSignal | undefined,
    req: CreateCustomTemplateRequest,
    options?: Options
  ): Promise<CustomTemplate> {
    const url = `${this.host}/api/2.0/apps-settings/templates`;
    const body = marshalRequest(req.template, marshalCustomTemplateSchema);
    let resp: CustomTemplate | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomTemplateSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Creates a new app space. */
  async createSpace(
    signal: AbortSignal | undefined,
    req: CreateSpaceRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/app-spaces`;
    const body = marshalRequest(req.space, marshalSpaceSchema);
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createSpaceOperation(
    signal: AbortSignal | undefined,
    req: CreateSpaceRequest,
    options?: Options
  ): Promise<CreateSpaceOperation> {
    const op = await this.createSpace(signal, req, options);
    return new CreateSpaceOperation(this, op);
  }

  /** Deletes an app. */
  async deleteApp(
    signal: AbortSignal | undefined,
    req: DeleteAppRequest,
    options?: Options
  ): Promise<App> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}`;
    let resp: App | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the thumbnail for an app. */
  async deleteAppThumbnail(
    signal: AbortSignal | undefined,
    req: DeleteAppThumbnailRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}/thumbnail`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Deletes the custom template with the specified name. */
  async deleteCustomTemplate(
    signal: AbortSignal | undefined,
    req: DeleteCustomTemplateRequest,
    options?: Options
  ): Promise<CustomTemplate> {
    const url = `${this.host}/api/2.0/apps-settings/templates/${req.name ?? ''}`;
    let resp: CustomTemplate | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomTemplateSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes an app space. */
  async deleteSpace(
    signal: AbortSignal | undefined,
    req: DeleteSpaceRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/app-spaces/${req.name ?? ''}`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async deleteSpaceOperation(
    signal: AbortSignal | undefined,
    req: DeleteSpaceRequest,
    options?: Options
  ): Promise<DeleteSpaceOperation> {
    const op = await this.deleteSpace(signal, req, options);
    return new DeleteSpaceOperation(this, op);
  }

  /** Retrieves information for the app with the supplied name. */
  async getApp(
    signal: AbortSignal | undefined,
    req: GetAppRequest,
    options?: Options
  ): Promise<App> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}`;
    let resp: App | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information for the app deployment with the supplied name and deployment id. */
  async getAppDeployment(
    signal: AbortSignal | undefined,
    req: GetAppDeploymentRequest,
    options?: Options
  ): Promise<AppDeployment> {
    const url = `${this.host}/api/2.0/apps/${req.appName ?? ''}/deployments/${req.deploymentId ?? ''}`;
    let resp: AppDeployment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAppDeploymentSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the status of an app update. */
  async getAppUpdate(
    signal: AbortSignal | undefined,
    req: GetAppUpdateRequest,
    options?: Options
  ): Promise<AppUpdate> {
    const url = `${this.host}/api/2.0/apps/${req.appName ?? ''}/update`;
    let resp: AppUpdate | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAppUpdateSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the custom template with the specified name. */
  async getCustomTemplate(
    signal: AbortSignal | undefined,
    req: GetCustomTemplateRequest,
    options?: Options
  ): Promise<CustomTemplate> {
    const url = `${this.host}/api/2.0/apps-settings/templates/${req.name ?? ''}`;
    let resp: CustomTemplate | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomTemplateSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves information for the app space with the supplied name. */
  async getSpace(
    signal: AbortSignal | undefined,
    req: GetSpaceRequest,
    options?: Options
  ): Promise<Space> {
    const url = `${this.host}/api/2.0/app-spaces/${req.name ?? ''}`;
    let resp: Space | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSpaceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the status of an app space update operation. */
  async getSpaceOperation(
    signal: AbortSignal | undefined,
    req: GetOperationRequest,
    options?: Options
  ): Promise<Operation> {
    const url = `${this.host}/api/2.0/app-spaces/${req.name ?? ''}/operation`;
    let resp: Operation | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalOperationSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Lists all app deployments for the app with the supplied name. */
  async listAppDeployments(
    signal: AbortSignal | undefined,
    req: ListAppDeploymentsRequest,
    options?: Options
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
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListAppDeploymentsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listAppDeploymentsIter(
    signal: AbortSignal | undefined,
    req: ListAppDeploymentsRequest,
    options?: Options
  ): AsyncGenerator<AppDeployment> {
    const pageReq: ListAppDeploymentsRequest = {...req};
    for (;;) {
      const resp = await this.listAppDeployments(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListAppsRequest,
    options?: Options
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
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListAppsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listAppsIter(
    signal: AbortSignal | undefined,
    req: ListAppsRequest,
    options?: Options
  ): AsyncGenerator<App> {
    const pageReq: ListAppsRequest = {...req};
    for (;;) {
      const resp = await this.listApps(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListCustomTemplatesRequest,
    options?: Options
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCustomTemplatesIter(
    signal: AbortSignal | undefined,
    req: ListCustomTemplatesRequest,
    options?: Options
  ): AsyncGenerator<CustomTemplate> {
    const pageReq: ListCustomTemplatesRequest = {...req};
    for (;;) {
      const resp = await this.listCustomTemplates(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListSpacesRequest,
    options?: Options
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
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListSpacesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listSpacesIter(
    signal: AbortSignal | undefined,
    req: ListSpacesRequest,
    options?: Options
  ): AsyncGenerator<Space> {
    const pageReq: ListSpacesRequest = {...req};
    for (;;) {
      const resp = await this.listSpaces(signal, pageReq, options);
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
  async startApp(
    signal: AbortSignal | undefined,
    req: StartAppRequest,
    options?: Options
  ): Promise<App> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}/start`;
    const body = marshalRequest(req, marshalStartAppRequestSchema);
    let resp: App | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async startAppWaiter(
    signal: AbortSignal | undefined,
    req: StartAppRequest,
    options?: Options
  ): Promise<StartAppWaiter> {
    await this.startApp(signal, req, options);
    if (req.name === undefined) {
      throw new Error('request field name required for polling is missing');
    }
    return new StartAppWaiter(this, req.name);
  }

  /** Stops the active deployment of the app in the workspace. */
  async stopApp(
    signal: AbortSignal | undefined,
    req: StopAppRequest,
    options?: Options
  ): Promise<App> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}/stop`;
    const body = marshalRequest(req, marshalStopAppRequestSchema);
    let resp: App | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async stopAppWaiter(
    signal: AbortSignal | undefined,
    req: StopAppRequest,
    options?: Options
  ): Promise<StopAppWaiter> {
    await this.stopApp(signal, req, options);
    if (req.name === undefined) {
      throw new Error('request field name required for polling is missing');
    }
    return new StopAppWaiter(this, req.name);
  }

  /** Updates the app with the supplied name. */
  async updateApp(
    signal: AbortSignal | undefined,
    req: UpdateAppRequest,
    options?: Options
  ): Promise<App> {
    const url = `${this.host}/api/2.0/apps/${req.app?.name ?? ''}`;
    const body = marshalRequest(req.app, marshalAppSchema);
    let resp: App | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAppSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the thumbnail for an app. */
  async updateAppThumbnail(
    signal: AbortSignal | undefined,
    req: UpdateAppThumbnailRequest,
    options?: Options
  ): Promise<AppThumbnail> {
    const url = `${this.host}/api/2.0/apps/${req.name ?? ''}/thumbnail`;
    const body = marshalRequest(req, marshalUpdateAppThumbnailRequestSchema);
    let resp: AppThumbnail | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAppThumbnailSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the custom template with the specified name. Note that the template name cannot be updated. */
  async updateCustomTemplate(
    signal: AbortSignal | undefined,
    req: UpdateCustomTemplateRequest,
    options?: Options
  ): Promise<CustomTemplate> {
    const url = `${this.host}/api/2.0/apps-settings/templates/${req.template?.name ?? ''}`;
    const body = marshalRequest(req.template, marshalCustomTemplateSchema);
    let resp: CustomTemplate | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCustomTemplateSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates an app space. The update process is asynchronous and the status of the update can be checked with the GetSpaceOperation method. */
  async updateSpace(
    signal: AbortSignal | undefined,
    req: UpdateSpaceRequest,
    options?: Options
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async updateSpaceOperation(
    signal: AbortSignal | undefined,
    req: UpdateSpaceRequest,
    options?: Options
  ): Promise<UpdateSpaceOperation> {
    const op = await this.updateSpace(signal, req, options);
    return new UpdateSpaceOperation(this, op);
  }
}

export class CreateSpaceOperation {
  constructor(
    private readonly client: Client,
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
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<Space> {
    const errStillRunning = new Error('operation still in progress');
    let result: Space | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getSpaceOperation(
        callSignal,
        {
          name: this.operation.name,
        },
        options
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean | undefined> {
    const op = await this.client.getSpaceOperation(
      signal,
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class DeleteSpaceOperation {
  constructor(
    private readonly client: Client,
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
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<void> {
    const errStillRunning = new Error('operation still in progress');

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getSpaceOperation(
        callSignal,
        {
          name: this.operation.name,
        },
        options
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await execute(signal, call, retryOptions);
  }

  /** Checks whether the operation has completed */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean | undefined> {
    const op = await this.client.getSpaceOperation(
      signal,
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class UpdateSpaceOperation {
  constructor(
    private readonly client: Client,
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
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<Space> {
    const errStillRunning = new Error('operation still in progress');
    let result: Space | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const op = await this.client.getSpaceOperation(
        callSignal,
        {
          name: this.operation.name,
        },
        options
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err.message.includes('operation still in progress');
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has completed */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean | undefined> {
    const op = await this.client.getSpaceOperation(
      signal,
      {name: this.operation.name},
      options
    );
    this.operation = op;
    return op.done;
  }
}

export class AsyncUpdateAppWaiter {
  constructor(
    private readonly client: Client,
    readonly appName: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<AppUpdate> {
    let result: AppUpdate | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getAppUpdate(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getAppUpdate(
      signal,
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
    private readonly client: Client,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(signal: AbortSignal | undefined, options?: Options): Promise<App> {
    let result: App | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getApp(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getApp(
      signal,
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
    private readonly client: Client,
    readonly deploymentId: string,
    readonly appName: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<AppDeployment> {
    let result: AppDeployment | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getAppDeployment(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getAppDeployment(
      signal,
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
    private readonly client: Client,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(signal: AbortSignal | undefined, options?: Options): Promise<App> {
    let result: App | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getApp(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getApp(
      signal,
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
    private readonly client: Client,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(signal: AbortSignal | undefined, options?: Options): Promise<App> {
    let result: App | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getApp(
        callSignal,
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

    const retryOptions: Options = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await execute(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: Options
  ): Promise<boolean> {
    const pollResp = await this.client.getApp(
      signal,
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
