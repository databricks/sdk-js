// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import type {
  CreateInferenceEndpoint,
  CreatePtEndpoint,
  DeleteInferenceEndpoint,
  DeleteInferenceEndpoint_Response,
  ExternalFunctionRequest,
  ExternalFunctionResponse,
  GetInferenceEndpoint,
  GetInferenceEndpointSchema,
  GetOpenApiResponse,
  InferenceEndpointDetailed,
  ListFoundationModelEndpoints,
  ListFoundationModelEndpoints_Response,
  ListInferenceEndpoints,
  ListInferenceEndpoints_Response,
  PatchInferenceEndpointBudgetPolicy,
  PatchInferenceEndpointBudgetPolicy_Response,
  PatchInferenceEndpointDescription,
  PatchInferenceEndpointDescription_Response,
  PatchInferenceEndpointTags,
  PatchInferenceEndpointTags_Response,
  PatchInferenceEndpointUsagePolicy,
  PatchInferenceEndpointUsagePolicy_Response,
  PutInferenceEndpointAiGateway,
  PutInferenceEndpointAiGateway_Response,
  PutInferenceEndpointConfig,
  PutInferenceEndpointRateLimits,
  PutInferenceEndpointRateLimits_Response,
  PutPtEndpointConfig,
  UpdateInferenceEndpointNotifications,
  UpdateInferenceEndpointNotifications_Response,
} from './model';
import {
  marshalCreateInferenceEndpointSchema,
  marshalCreatePtEndpointSchema,
  marshalExternalFunctionRequestSchema,
  marshalPatchInferenceEndpointBudgetPolicySchema,
  marshalPatchInferenceEndpointDescriptionSchema,
  marshalPatchInferenceEndpointTagsSchema,
  marshalPatchInferenceEndpointUsagePolicySchema,
  marshalPutInferenceEndpointAiGatewaySchema,
  marshalPutInferenceEndpointConfigSchema,
  marshalPutInferenceEndpointRateLimitsSchema,
  marshalPutPtEndpointConfigSchema,
  marshalUpdateInferenceEndpointNotificationsSchema,
  unmarshalDeleteInferenceEndpoint_ResponseSchema,
  unmarshalExternalFunctionResponseSchema,
  unmarshalGetOpenApiResponseSchema,
  unmarshalInferenceEndpointDetailedSchema,
  unmarshalListFoundationModelEndpoints_ResponseSchema,
  unmarshalListInferenceEndpoints_ResponseSchema,
  unmarshalPatchInferenceEndpointBudgetPolicy_ResponseSchema,
  unmarshalPatchInferenceEndpointDescription_ResponseSchema,
  unmarshalPatchInferenceEndpointTags_ResponseSchema,
  unmarshalPatchInferenceEndpointUsagePolicy_ResponseSchema,
  unmarshalPutInferenceEndpointAiGateway_ResponseSchema,
  unmarshalPutInferenceEndpointRateLimits_ResponseSchema,
  unmarshalUpdateInferenceEndpointNotifications_ResponseSchema,
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

  /** Create a new serving endpoint. */
  async createInferenceEndpoint(
    signal: AbortSignal | undefined,
    req: CreateInferenceEndpoint,
    options?: Options
  ): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints`;
    const body = marshalRequest(req, marshalCreateInferenceEndpointSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a new PT serving endpoint. */
  async createProvisionedThroughputInferenceEndpoint(
    signal: AbortSignal | undefined,
    req: CreatePtEndpoint,
    options?: Options
  ): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints/pt`;
    const body = marshalRequest(req, marshalCreatePtEndpointSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a serving endpoint. */
  async deleteInferenceEndpoint(
    signal: AbortSignal | undefined,
    req: DeleteInferenceEndpoint,
    options?: Options
  ): Promise<DeleteInferenceEndpoint_Response> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints/${req.name ?? ''}`;
    let resp: DeleteInferenceEndpoint_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteInferenceEndpoint_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the details for a single serving endpoint. */
  async getInferenceEndpoint(
    signal: AbortSignal | undefined,
    req: GetInferenceEndpoint,
    options?: Options
  ): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints/${req.name ?? ''}`;
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the query schema of the serving endpoint in OpenAPI format. The schema contains information for the supported paths, input and output format and datatypes. */
  async getInferenceEndpointSchema(
    signal: AbortSignal | undefined,
    req: GetInferenceEndpointSchema,
    options?: Options
  ): Promise<GetOpenApiResponse> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints/${req.name ?? ''}/openapi`;
    let resp: GetOpenApiResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetOpenApiResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List only foundation model endpoints */
  async listFoundationModelEndpoints(
    signal: AbortSignal | undefined,
    req: ListFoundationModelEndpoints,
    options?: Options
  ): Promise<ListFoundationModelEndpoints_Response> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints:foundation-models`;
    const params = new URLSearchParams();
    if (req.product !== undefined) {
      params.append('product', req.product);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListFoundationModelEndpoints_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListFoundationModelEndpoints_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get all serving endpoints. */
  async listInferenceEndpoints(
    signal: AbortSignal | undefined,
    req: ListInferenceEndpoints,
    options?: Options
  ): Promise<ListInferenceEndpoints_Response> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints`;
    let resp: ListInferenceEndpoints_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListInferenceEndpoints_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the budget policy of a serving endpoint. */
  async patchInferenceEndpointBudgetPolicy(
    signal: AbortSignal | undefined,
    req: PatchInferenceEndpointBudgetPolicy,
    options?: Options
  ): Promise<PatchInferenceEndpointBudgetPolicy_Response> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints/${req.name ?? ''}/budget-policy`;
    const body = marshalRequest(
      req,
      marshalPatchInferenceEndpointBudgetPolicySchema
    );
    let resp: PatchInferenceEndpointBudgetPolicy_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPatchInferenceEndpointBudgetPolicy_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async patchInferenceEndpointDescription(
    signal: AbortSignal | undefined,
    req: PatchInferenceEndpointDescription,
    options?: Options
  ): Promise<PatchInferenceEndpointDescription_Response> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints/${req.name ?? ''}/description`;
    const body = marshalRequest(
      req,
      marshalPatchInferenceEndpointDescriptionSchema
    );
    let resp: PatchInferenceEndpointDescription_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPatchInferenceEndpointDescription_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Used to batch add and delete tags from a serving endpoint with a single API call. */
  async patchInferenceEndpointTags(
    signal: AbortSignal | undefined,
    req: PatchInferenceEndpointTags,
    options?: Options
  ): Promise<PatchInferenceEndpointTags_Response> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints/${req.name ?? ''}/tags`;
    const body = marshalRequest(req, marshalPatchInferenceEndpointTagsSchema);
    let resp: PatchInferenceEndpointTags_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPatchInferenceEndpointTags_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the usage policy of a serving endpoint. */
  async patchInferenceEndpointUsagePolicy(
    signal: AbortSignal | undefined,
    req: PatchInferenceEndpointUsagePolicy,
    options?: Options
  ): Promise<PatchInferenceEndpointUsagePolicy_Response> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints/${req.name ?? ''}/usage-policy`;
    const body = marshalRequest(
      req,
      marshalPatchInferenceEndpointUsagePolicySchema
    );
    let resp: PatchInferenceEndpointUsagePolicy_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPatchInferenceEndpointUsagePolicy_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Used to update the AI Gateway of a serving endpoint. NOTE: External model, provisioned throughput, and pay-per-token endpoints are fully supported; agent endpoints currently only support inference tables. */
  async putInferenceEndpointAiGateway(
    signal: AbortSignal | undefined,
    req: PutInferenceEndpointAiGateway,
    options?: Options
  ): Promise<PutInferenceEndpointAiGateway_Response> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints/${req.name ?? ''}/ai-gateway`;
    const body = marshalRequest(
      req,
      marshalPutInferenceEndpointAiGatewaySchema
    );
    let resp: PutInferenceEndpointAiGateway_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPutInferenceEndpointAiGateway_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates any combination of the serving endpoint's served entities, the compute configuration of those served entities, and the endpoint's traffic config. An endpoint that already has an update in progress can not be updated until the current update completes or fails. */
  async putInferenceEndpointConfig(
    signal: AbortSignal | undefined,
    req: PutInferenceEndpointConfig,
    options?: Options
  ): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints/${req.name ?? ''}/config`;
    const body = marshalRequest(req, marshalPutInferenceEndpointConfigSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deprecated: Please use AI Gateway to manage rate limits instead. */
  async putInferenceEndpointRateLimits(
    signal: AbortSignal | undefined,
    req: PutInferenceEndpointRateLimits,
    options?: Options
  ): Promise<PutInferenceEndpointRateLimits_Response> {
    const url = `${this.host}/api/2.0/preview/serving-endpoints/${req.name ?? ''}/rate-limits`;
    const body = marshalRequest(
      req,
      marshalPutInferenceEndpointRateLimitsSchema
    );
    let resp: PutInferenceEndpointRateLimits_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalPutInferenceEndpointRateLimits_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates any combination of the pt endpoint's served entities, the compute configuration of those served entities, and the endpoint's traffic config. Updates are instantaneous and endpoint should be updated instantly */
  async putProvisionedThroughputInferenceEndpointConfig(
    signal: AbortSignal | undefined,
    req: PutPtEndpointConfig,
    options?: Options
  ): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints/pt/${req.name ?? ''}/config`;
    const body = marshalRequest(req, marshalPutPtEndpointConfigSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the email and webhook notification settings for an endpoint. */
  async updateInferenceEndpointNotifications(
    signal: AbortSignal | undefined,
    req: UpdateInferenceEndpointNotifications,
    options?: Options
  ): Promise<UpdateInferenceEndpointNotifications_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/notifications`;
    const body = marshalRequest(
      req,
      marshalUpdateInferenceEndpointNotificationsSchema
    );
    let resp: UpdateInferenceEndpointNotifications_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateInferenceEndpointNotifications_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Make external services call using the credentials stored in UC Connection. */
  async httpRequest(
    signal: AbortSignal | undefined,
    req: ExternalFunctionRequest,
    options?: Options
  ): Promise<ExternalFunctionResponse> {
    const url = `${this.host}/api/2.0/external-function`;
    const body = marshalRequest(req, marshalExternalFunctionRequestSchema);
    let resp: ExternalFunctionResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalExternalFunctionResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
