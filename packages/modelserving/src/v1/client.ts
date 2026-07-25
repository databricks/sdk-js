// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {LroOptions} from '@databricks/sdk-options/lro';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  sendAndCheckError,
  marshalRequest,
  parseResponse,
  executeWait,
  StillRunningError,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateInferenceEndpointRequest,
  CreatePtEndpointRequest,
  DeleteInferenceEndpointRequest,
  DeleteInferenceEndpointResponse,
  ExportMetricsResponse,
  ExternalFunctionRequest,
  ExternalFunctionResponse,
  GetExportEndpointMetricsRequest,
  GetInferenceEndpointRequest,
  GetInferenceEndpointSchemaRequest,
  GetOpenApiResponse,
  GetServedModelBuildLogsRequest,
  GetServedModelBuildLogsResponse,
  GetServedModelLogsRequest,
  GetServedModelLogsResponse,
  InferenceEndpointDetailed,
  ListInferenceEndpointsRequest,
  ListInferenceEndpointsResponse,
  PatchInferenceEndpointTagsRequest,
  PatchInferenceEndpointTagsResponse,
  PatchInferenceEndpointTelemetryConfigRequest,
  PutInferenceEndpointAiGatewayRequest,
  PutInferenceEndpointAiGatewayResponse,
  PutInferenceEndpointConfigRequest,
  PutInferenceEndpointRateLimitsRequest,
  PutInferenceEndpointRateLimitsResponse,
  PutPtEndpointConfigRequest,
  UpdateInferenceEndpointNotificationsRequest,
  UpdateInferenceEndpointNotificationsResponse,
} from './model';
import {
  InferenceEndpointState_ConfigUpdateState,
  marshalCreateInferenceEndpointRequestSchema,
  marshalCreatePtEndpointRequestSchema,
  marshalExternalFunctionRequestSchema,
  marshalPatchInferenceEndpointTagsRequestSchema,
  marshalPatchInferenceEndpointTelemetryConfigRequestSchema,
  marshalPutInferenceEndpointAiGatewayRequestSchema,
  marshalPutInferenceEndpointConfigRequestSchema,
  marshalPutInferenceEndpointRateLimitsRequestSchema,
  marshalPutPtEndpointConfigRequestSchema,
  marshalUpdateInferenceEndpointNotificationsRequestSchema,
  unmarshalDeleteInferenceEndpointResponseSchema,
  unmarshalGetServedModelBuildLogsResponseSchema,
  unmarshalGetServedModelLogsResponseSchema,
  unmarshalInferenceEndpointDetailedSchema,
  unmarshalListInferenceEndpointsResponseSchema,
  unmarshalPatchInferenceEndpointTagsResponseSchema,
  unmarshalPutInferenceEndpointAiGatewayResponseSchema,
  unmarshalPutInferenceEndpointRateLimitsResponseSchema,
  unmarshalUpdateInferenceEndpointNotificationsResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ModelServingClient {
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

  /** Create a new serving endpoint. */
  private async createInferenceEndpointBase(
    req: CreateInferenceEndpointRequest,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints`;
    const body = marshalRequest(
      req,
      marshalCreateInferenceEndpointRequestSchema
    );
    let resp: InferenceEndpointDetailed | undefined;
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
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a new serving endpoint. */
  async createInferenceEndpoint(
    req: CreateInferenceEndpointRequest,
    options?: CallOptions
  ): Promise<CreateInferenceEndpointWaiter> {
    await this.createInferenceEndpointBase(req, options);
    if (req.name === undefined) {
      throw new Error('request field name required for polling is missing');
    }
    return new CreateInferenceEndpointWaiter(this, req.name);
  }

  /** Create a new PT serving endpoint. */
  private async createProvisionedThroughputInferenceEndpointBase(
    req: CreatePtEndpointRequest,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/pt`;
    const body = marshalRequest(req, marshalCreatePtEndpointRequestSchema);
    let resp: InferenceEndpointDetailed | undefined;
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
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Create a new PT serving endpoint. */
  async createProvisionedThroughputInferenceEndpoint(
    req: CreatePtEndpointRequest,
    options?: CallOptions
  ): Promise<CreateProvisionedThroughputInferenceEndpointWaiter> {
    await this.createProvisionedThroughputInferenceEndpointBase(req, options);
    if (req.name === undefined) {
      throw new Error('request field name required for polling is missing');
    }
    return new CreateProvisionedThroughputInferenceEndpointWaiter(
      this,
      req.name
    );
  }

  /** Delete a serving endpoint. */
  async deleteInferenceEndpoint(
    req: DeleteInferenceEndpointRequest,
    options?: CallOptions
  ): Promise<DeleteInferenceEndpointResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}`;
    let resp: DeleteInferenceEndpointResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteInferenceEndpointResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves the metrics associated with the provided serving endpoint in either Prometheus or OpenMetrics exposition format. */
  async getExportEndpointMetrics(
    req: GetExportEndpointMetricsRequest,
    options?: CallOptions
  ): Promise<ExportMetricsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}/metrics`;
    let resp: ExportMetricsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const httpResp = await sendAndCheckError({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = {
        contents: httpResp.body ?? undefined,
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves the details for a single serving endpoint. */
  async getInferenceEndpoint(
    req: GetInferenceEndpointRequest,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}`;
    let resp: InferenceEndpointDetailed | undefined;
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
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get the query schema of the serving endpoint in OpenAPI format. The schema contains information for the supported paths, input and output format and datatypes. */
  async getInferenceEndpointSchema(
    req: GetInferenceEndpointSchemaRequest,
    options?: CallOptions
  ): Promise<GetOpenApiResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}/openapi`;
    let resp: GetOpenApiResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const httpResp = await sendAndCheckError({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = {
        contents: httpResp.body ?? undefined,
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves the build logs associated with the provided served model. */
  async getServedModelBuildLogs(
    req: GetServedModelBuildLogsRequest,
    options?: CallOptions
  ): Promise<GetServedModelBuildLogsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}/served-models/${req.servedModelName ?? ''}/build-logs`;
    let resp: GetServedModelBuildLogsResponse | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalGetServedModelBuildLogsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Retrieves the service logs associated with the provided served model. */
  async getServedModelLogs(
    req: GetServedModelLogsRequest,
    options?: CallOptions
  ): Promise<GetServedModelLogsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}/served-models/${req.servedModelName ?? ''}/logs`;
    let resp: GetServedModelLogsResponse | undefined;
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
      resp = parseResponse(respBody, unmarshalGetServedModelLogsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get all serving endpoints. */
  async listInferenceEndpoints(
    _req: ListInferenceEndpointsRequest,
    options?: CallOptions
  ): Promise<ListInferenceEndpointsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints`;
    let resp: ListInferenceEndpointsResponse | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalListInferenceEndpointsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Used to batch add and delete tags from a serving endpoint with a single API call. */
  async patchInferenceEndpointTags(
    req: PatchInferenceEndpointTagsRequest,
    options?: CallOptions
  ): Promise<PatchInferenceEndpointTagsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}/tags`;
    const body = marshalRequest(
      req,
      marshalPatchInferenceEndpointTagsRequestSchema
    );
    let resp: PatchInferenceEndpointTagsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPatchInferenceEndpointTagsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates the telemetry configuration of a serving endpoint. */
  async patchInferenceEndpointTelemetryConfig(
    req: PatchInferenceEndpointTelemetryConfigRequest,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}/telemetry-config`;
    const body = marshalRequest(
      req,
      marshalPatchInferenceEndpointTelemetryConfigRequestSchema
    );
    let resp: InferenceEndpointDetailed | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Used to update the AI Gateway of a serving endpoint. NOTE: External model, provisioned throughput, and pay-per-token endpoints are fully supported; agent endpoints currently only support inference tables. */
  async putInferenceEndpointAiGateway(
    req: PutInferenceEndpointAiGatewayRequest,
    options?: CallOptions
  ): Promise<PutInferenceEndpointAiGatewayResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}/ai-gateway`;
    const body = marshalRequest(
      req,
      marshalPutInferenceEndpointAiGatewayRequestSchema
    );
    let resp: PutInferenceEndpointAiGatewayResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPutInferenceEndpointAiGatewayResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates any combination of the serving endpoint's served entities, the compute configuration of those served entities, and the endpoint's traffic config. An endpoint that already has an update in progress can not be updated until the current update completes or fails. */
  private async putInferenceEndpointConfigBase(
    req: PutInferenceEndpointConfigRequest,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}/config`;
    const body = marshalRequest(
      req,
      marshalPutInferenceEndpointConfigRequestSchema
    );
    let resp: InferenceEndpointDetailed | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates any combination of the serving endpoint's served entities, the compute configuration of those served entities, and the endpoint's traffic config. An endpoint that already has an update in progress can not be updated until the current update completes or fails. */
  async putInferenceEndpointConfig(
    req: PutInferenceEndpointConfigRequest,
    options?: CallOptions
  ): Promise<PutInferenceEndpointConfigWaiter> {
    await this.putInferenceEndpointConfigBase(req, options);
    if (req.name === undefined) {
      throw new Error('request field name required for polling is missing');
    }
    return new PutInferenceEndpointConfigWaiter(this, req.name);
  }

  /** Deprecated: Please use AI Gateway to manage rate limits instead. */
  async putInferenceEndpointRateLimits(
    req: PutInferenceEndpointRateLimitsRequest,
    options?: CallOptions
  ): Promise<PutInferenceEndpointRateLimitsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}/rate-limits`;
    const body = marshalRequest(
      req,
      marshalPutInferenceEndpointRateLimitsRequestSchema
    );
    let resp: PutInferenceEndpointRateLimitsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPutInferenceEndpointRateLimitsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates any combination of the pt endpoint's served entities, the compute configuration of those served entities, and the endpoint's traffic config. Updates are instantaneous and endpoint should be updated instantly */
  private async putProvisionedThroughputInferenceEndpointConfigBase(
    req: PutPtEndpointConfigRequest,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/pt/${req.name ?? ''}/config`;
    const body = marshalRequest(req, marshalPutPtEndpointConfigRequestSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Updates any combination of the pt endpoint's served entities, the compute configuration of those served entities, and the endpoint's traffic config. Updates are instantaneous and endpoint should be updated instantly */
  async putProvisionedThroughputInferenceEndpointConfig(
    req: PutPtEndpointConfigRequest,
    options?: CallOptions
  ): Promise<PutProvisionedThroughputInferenceEndpointConfigWaiter> {
    await this.putProvisionedThroughputInferenceEndpointConfigBase(
      req,
      options
    );
    if (req.name === undefined) {
      throw new Error('request field name required for polling is missing');
    }
    return new PutProvisionedThroughputInferenceEndpointConfigWaiter(
      this,
      req.name
    );
  }

  /** Updates the email and webhook notification settings for an endpoint. */
  async updateInferenceEndpointNotifications(
    req: UpdateInferenceEndpointNotificationsRequest,
    options?: CallOptions
  ): Promise<UpdateInferenceEndpointNotificationsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/serving-endpoints/${req.name ?? ''}/notifications`;
    const body = marshalRequest(
      req,
      marshalUpdateInferenceEndpointNotificationsRequestSchema
    );
    let resp: UpdateInferenceEndpointNotificationsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateInferenceEndpointNotificationsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Make external services call using the credentials stored in UC Connection. */
  async httpRequest(
    req: ExternalFunctionRequest,
    options?: CallOptions
  ): Promise<ExternalFunctionResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/external-function`;
    const body = marshalRequest(req, marshalExternalFunctionRequestSchema);
    let resp: ExternalFunctionResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const httpResp = await sendAndCheckError({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = {
        contents: httpResp.body ?? undefined,
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}

export class CreateInferenceEndpointWaiter {
  constructor(
    private readonly client: ModelServingClient,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        {
          name: this.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state?.configUpdate;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case InferenceEndpointState_ConfigUpdateState.NOT_UPDATING:
          result = pollResp;
          return;
        case InferenceEndpointState_ConfigUpdateState.UPDATE_FAILED:
        case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED: {
          const msg = '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getInferenceEndpoint(
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.state?.configUpdate;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case InferenceEndpointState_ConfigUpdateState.NOT_UPDATING:
      case InferenceEndpointState_ConfigUpdateState.UPDATE_FAILED:
      case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED:
        return true;
      default:
        return false;
    }
  }
}

export class CreateProvisionedThroughputInferenceEndpointWaiter {
  constructor(
    private readonly client: ModelServingClient,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        {
          name: this.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state?.configUpdate;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case InferenceEndpointState_ConfigUpdateState.NOT_UPDATING:
          result = pollResp;
          return;
        case InferenceEndpointState_ConfigUpdateState.UPDATE_FAILED:
        case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED: {
          const msg = '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getInferenceEndpoint(
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.state?.configUpdate;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case InferenceEndpointState_ConfigUpdateState.NOT_UPDATING:
      case InferenceEndpointState_ConfigUpdateState.UPDATE_FAILED:
      case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED:
        return true;
      default:
        return false;
    }
  }
}

export class PutInferenceEndpointConfigWaiter {
  constructor(
    private readonly client: ModelServingClient,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        {
          name: this.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state?.configUpdate;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case InferenceEndpointState_ConfigUpdateState.NOT_UPDATING:
          result = pollResp;
          return;
        case InferenceEndpointState_ConfigUpdateState.UPDATE_FAILED:
        case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED: {
          const msg = '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getInferenceEndpoint(
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.state?.configUpdate;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case InferenceEndpointState_ConfigUpdateState.NOT_UPDATING:
      case InferenceEndpointState_ConfigUpdateState.UPDATE_FAILED:
      case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED:
        return true;
      default:
        return false;
    }
  }
}

export class PutProvisionedThroughputInferenceEndpointConfigWaiter {
  constructor(
    private readonly client: ModelServingClient,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        {
          name: this.name,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state?.configUpdate;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case InferenceEndpointState_ConfigUpdateState.NOT_UPDATING:
          result = pollResp;
          return;
        case InferenceEndpointState_ConfigUpdateState.UPDATE_FAILED:
        case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED: {
          const msg = '(no message)';
          throw new Error(`terminal state ${status}: ${msg}`);
        }
        default:
          throw new StillRunningError();
      }
    };

    await executeWait(call, options);
    if (result === undefined) {
      throw new Error('operation completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(options?: CallOptions): Promise<boolean> {
    const pollResp = await this.client.getInferenceEndpoint(
      {
        name: this.name,
      },
      options
    );

    const status = pollResp.state?.configUpdate;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case InferenceEndpointState_ConfigUpdateState.NOT_UPDATING:
      case InferenceEndpointState_ConfigUpdateState.UPDATE_FAILED:
      case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED:
        return true;
      default:
        return false;
    }
  }
}
