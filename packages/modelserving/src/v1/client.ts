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
import {buildHttpRequest, executeCall, executeHttpCall, sendAndCheckError, marshalRequest, parseResponse} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateInferenceEndpointRequest,
  CreatePtEndpointRequest,
  DeleteInferenceEndpointRequest,
  DeleteInferenceEndpointRequest_Response,
  ExportMetricsResponse,
  ExternalFunctionRequest,
  ExternalFunctionResponse,
  GetExportEndpointMetricsRequest,
  GetInferenceEndpointRequest,
  GetInferenceEndpointSchemaRequest,
  GetOpenApiResponse,
  GetServedModelBuildLogsRequest,
  GetServedModelBuildLogsRequest_Response,
  GetServedModelLogsRequest,
  GetServedModelLogsRequest_Response,
  InferenceEndpointDetailed,
  ListInferenceEndpointsRequest,
  ListInferenceEndpointsRequest_Response,
  PatchInferenceEndpointTagsRequest,
  PatchInferenceEndpointTagsRequest_Response,
  PutInferenceEndpointAiGatewayRequest,
  PutInferenceEndpointAiGatewayRequest_Response,
  PutInferenceEndpointConfigRequest,
  PutInferenceEndpointRateLimitsRequest,
  PutInferenceEndpointRateLimitsRequest_Response,
  PutPtEndpointConfigRequest,
  UpdateInferenceEndpointNotificationsRequest,
  UpdateInferenceEndpointNotificationsRequest_Response,
} from './model';
import {
  InferenceEndpointState_ConfigUpdateState,
  marshalCreateInferenceEndpointRequestSchema,
  marshalCreatePtEndpointRequestSchema,
  marshalExternalFunctionRequestSchema,
  marshalPatchInferenceEndpointTagsRequestSchema,
  marshalPutInferenceEndpointAiGatewayRequestSchema,
  marshalPutInferenceEndpointConfigRequestSchema,
  marshalPutInferenceEndpointRateLimitsRequestSchema,
  marshalPutPtEndpointConfigRequestSchema,
  marshalUpdateInferenceEndpointNotificationsRequestSchema,
  unmarshalDeleteInferenceEndpointRequest_ResponseSchema,
  unmarshalGetServedModelBuildLogsRequest_ResponseSchema,
  unmarshalGetServedModelLogsRequest_ResponseSchema,
  unmarshalInferenceEndpointDetailedSchema,
  unmarshalListInferenceEndpointsRequest_ResponseSchema,
  unmarshalPatchInferenceEndpointTagsRequest_ResponseSchema,
  unmarshalPutInferenceEndpointAiGatewayRequest_ResponseSchema,
  unmarshalPutInferenceEndpointRateLimitsRequest_ResponseSchema,
  unmarshalUpdateInferenceEndpointNotificationsRequest_ResponseSchema,
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

  /** Create a new serving endpoint. */
  async createInferenceEndpoint(req: CreateInferenceEndpointRequest, options?: CallOptions): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints`;
    const body = marshalRequest(req, marshalCreateInferenceEndpointRequestSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

async createInferenceEndpointWaiter(
    req: CreateInferenceEndpointRequest,
    options?: CallOptions
  ): Promise<CreateInferenceEndpointWaiter> {
    await this.createInferenceEndpoint(req, options);
    if (req.name === undefined) {
      throw new Error(
        'request field name required for polling is missing'
      );
    }
    return new CreateInferenceEndpointWaiter(
      this,
      req.name,
    );
  }

  /** Create a new PT serving endpoint. */
  async createProvisionedThroughputInferenceEndpoint(req: CreatePtEndpointRequest, options?: CallOptions): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints/pt`;
    const body = marshalRequest(req, marshalCreatePtEndpointRequestSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

async createProvisionedThroughputInferenceEndpointWaiter(
    req: CreatePtEndpointRequest,
    options?: CallOptions
  ): Promise<CreateProvisionedThroughputInferenceEndpointWaiter> {
    await this.createProvisionedThroughputInferenceEndpoint(req, options);
    if (req.name === undefined) {
      throw new Error(
        'request field name required for polling is missing'
      );
    }
    return new CreateProvisionedThroughputInferenceEndpointWaiter(
      this,
      req.name,
    );
  }

  /** Delete a serving endpoint. */
  async deleteInferenceEndpoint(req: DeleteInferenceEndpointRequest, options?: CallOptions): Promise<DeleteInferenceEndpointRequest_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}`;
    let resp: DeleteInferenceEndpointRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDeleteInferenceEndpointRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the metrics associated with the provided serving endpoint in either Prometheus or OpenMetrics exposition format. */
  async getExportEndpointMetrics(req: GetExportEndpointMetricsRequest, options?: CallOptions): Promise<ExportMetricsResponse> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/metrics`;
    let resp: ExportMetricsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const httpResp = await sendAndCheckError({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = {
        contents: httpResp.body ?? undefined,
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the details for a single serving endpoint. */
  async getInferenceEndpoint(req: GetInferenceEndpointRequest, options?: CallOptions): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}`;
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the query schema of the serving endpoint in OpenAPI format. The schema contains information for the supported paths, input and output format and datatypes. */
  async getInferenceEndpointSchema(req: GetInferenceEndpointSchemaRequest, options?: CallOptions): Promise<GetOpenApiResponse> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/openapi`;
    let resp: GetOpenApiResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const httpResp = await sendAndCheckError({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = {
        contents: httpResp.body ?? undefined,
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the build logs associated with the provided served model. */
  async getServedModelBuildLogs(req: GetServedModelBuildLogsRequest, options?: CallOptions): Promise<GetServedModelBuildLogsRequest_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/served-models/${req.servedModelName ?? ''}/build-logs`;
    let resp: GetServedModelBuildLogsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGetServedModelBuildLogsRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the service logs associated with the provided served model. */
  async getServedModelLogs(req: GetServedModelLogsRequest, options?: CallOptions): Promise<GetServedModelLogsRequest_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/served-models/${req.servedModelName ?? ''}/logs`;
    let resp: GetServedModelLogsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalGetServedModelLogsRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get all serving endpoints. */
  async listInferenceEndpoints(_req: ListInferenceEndpointsRequest, options?: CallOptions): Promise<ListInferenceEndpointsRequest_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints`;
    let resp: ListInferenceEndpointsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListInferenceEndpointsRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Used to batch add and delete tags from a serving endpoint with a single API call. */
  async patchInferenceEndpointTags(req: PatchInferenceEndpointTagsRequest, options?: CallOptions): Promise<PatchInferenceEndpointTagsRequest_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/tags`;
    const body = marshalRequest(req, marshalPatchInferenceEndpointTagsRequestSchema);
    let resp: PatchInferenceEndpointTagsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalPatchInferenceEndpointTagsRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Used to update the AI Gateway of a serving endpoint. NOTE: External model, provisioned throughput, and pay-per-token endpoints are fully supported; agent endpoints currently only support inference tables. */
  async putInferenceEndpointAiGateway(req: PutInferenceEndpointAiGatewayRequest, options?: CallOptions): Promise<PutInferenceEndpointAiGatewayRequest_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/ai-gateway`;
    const body = marshalRequest(req, marshalPutInferenceEndpointAiGatewayRequestSchema);
    let resp: PutInferenceEndpointAiGatewayRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalPutInferenceEndpointAiGatewayRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates any combination of the serving endpoint's served entities, the compute configuration of those served entities, and the endpoint's traffic config. An endpoint that already has an update in progress can not be updated until the current update completes or fails. */
  async putInferenceEndpointConfig(req: PutInferenceEndpointConfigRequest, options?: CallOptions): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/config`;
    const body = marshalRequest(req, marshalPutInferenceEndpointConfigRequestSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

async putInferenceEndpointConfigWaiter(
    req: PutInferenceEndpointConfigRequest,
    options?: CallOptions
  ): Promise<PutInferenceEndpointConfigWaiter> {
    await this.putInferenceEndpointConfig(req, options);
    if (req.name === undefined) {
      throw new Error(
        'request field name required for polling is missing'
      );
    }
    return new PutInferenceEndpointConfigWaiter(
      this,
      req.name,
    );
  }

  /** Deprecated: Please use AI Gateway to manage rate limits instead. */
  async putInferenceEndpointRateLimits(req: PutInferenceEndpointRateLimitsRequest, options?: CallOptions): Promise<PutInferenceEndpointRateLimitsRequest_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/rate-limits`;
    const body = marshalRequest(req, marshalPutInferenceEndpointRateLimitsRequestSchema);
    let resp: PutInferenceEndpointRateLimitsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalPutInferenceEndpointRateLimitsRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates any combination of the pt endpoint's served entities, the compute configuration of those served entities, and the endpoint's traffic config. Updates are instantaneous and endpoint should be updated instantly */
  async putProvisionedThroughputInferenceEndpointConfig(req: PutPtEndpointConfigRequest, options?: CallOptions): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints/pt/${req.name ?? ''}/config`;
    const body = marshalRequest(req, marshalPutPtEndpointConfigRequestSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

async putProvisionedThroughputInferenceEndpointConfigWaiter(
    req: PutPtEndpointConfigRequest,
    options?: CallOptions
  ): Promise<PutProvisionedThroughputInferenceEndpointConfigWaiter> {
    await this.putProvisionedThroughputInferenceEndpointConfig(req, options);
    if (req.name === undefined) {
      throw new Error(
        'request field name required for polling is missing'
      );
    }
    return new PutProvisionedThroughputInferenceEndpointConfigWaiter(
      this,
      req.name,
    );
  }

  /** Updates the email and webhook notification settings for an endpoint. */
  async updateInferenceEndpointNotifications(req: UpdateInferenceEndpointNotificationsRequest, options?: CallOptions): Promise<UpdateInferenceEndpointNotificationsRequest_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/notifications`;
    const body = marshalRequest(req, marshalUpdateInferenceEndpointNotificationsRequestSchema);
    let resp: UpdateInferenceEndpointNotificationsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalUpdateInferenceEndpointNotificationsRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Make external services call using the credentials stored in UC Connection. */
  async httpRequest(req: ExternalFunctionRequest, options?: CallOptions): Promise<ExternalFunctionResponse> {
    const url = `${this.host}/api/2.0/external-function`;
    const body = marshalRequest(req, marshalExternalFunctionRequestSchema);
    let resp: ExternalFunctionResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const httpResp = await sendAndCheckError({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = {
        contents: httpResp.body ?? undefined,
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class CreateInferenceEndpointWaiter {
  constructor(
    private readonly client: Client,
    readonly name: string,
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        {
          name: this.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
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
        case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED:
        {
          const msg = '(no message)';
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
    private readonly client: Client,
    readonly name: string,
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        {
          name: this.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
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
        case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED:
        {
          const msg = '(no message)';
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
    private readonly client: Client,
    readonly name: string,
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        {
          name: this.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
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
        case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED:
        {
          const msg = '(no message)';
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
    private readonly client: Client,
    readonly name: string,
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        {
          name: this.name,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
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
        case InferenceEndpointState_ConfigUpdateState.UPDATE_CANCELED:
        {
          const msg = '(no message)';
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
