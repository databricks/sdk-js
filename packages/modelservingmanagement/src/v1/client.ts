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
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  sendAndCheckError,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
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
  ListInferenceEndpoints,
  ListInferenceEndpoints_Response,
  PatchInferenceEndpointTags,
  PatchInferenceEndpointTags_Response,
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
  InferenceEndpointState_ConfigUpdateState,
  marshalCreateInferenceEndpointSchema,
  marshalCreatePtEndpointSchema,
  marshalExternalFunctionRequestSchema,
  marshalPatchInferenceEndpointTagsSchema,
  marshalPutInferenceEndpointAiGatewaySchema,
  marshalPutInferenceEndpointConfigSchema,
  marshalPutInferenceEndpointRateLimitsSchema,
  marshalPutPtEndpointConfigSchema,
  marshalUpdateInferenceEndpointNotificationsSchema,
  unmarshalDeleteInferenceEndpoint_ResponseSchema,
  unmarshalInferenceEndpointDetailedSchema,
  unmarshalListInferenceEndpoints_ResponseSchema,
  unmarshalPatchInferenceEndpointTags_ResponseSchema,
  unmarshalPutInferenceEndpointAiGateway_ResponseSchema,
  unmarshalPutInferenceEndpointRateLimits_ResponseSchema,
  unmarshalUpdateInferenceEndpointNotifications_ResponseSchema,
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
  async createInferenceEndpoint(
    signal: AbortSignal | undefined,
    req: CreateInferenceEndpoint,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints`;
    const body = marshalRequest(req, marshalCreateInferenceEndpointSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createInferenceEndpointWaiter(
    signal: AbortSignal | undefined,
    req: CreateInferenceEndpoint,
    options?: CallOptions
  ): Promise<CreateInferenceEndpointWaiter> {
    await this.createInferenceEndpoint(signal, req, options);
    if (req.name === undefined) {
      throw new Error('request field name required for polling is missing');
    }
    return new CreateInferenceEndpointWaiter(this, req.name);
  }

  /** Create a new PT serving endpoint. */
  async createProvisionedThroughputInferenceEndpoint(
    signal: AbortSignal | undefined,
    req: CreatePtEndpoint,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints/pt`;
    const body = marshalRequest(req, marshalCreatePtEndpointSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async createProvisionedThroughputInferenceEndpointWaiter(
    signal: AbortSignal | undefined,
    req: CreatePtEndpoint,
    options?: CallOptions
  ): Promise<CreateProvisionedThroughputInferenceEndpointWaiter> {
    await this.createProvisionedThroughputInferenceEndpoint(
      signal,
      req,
      options
    );
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
    signal: AbortSignal | undefined,
    req: DeleteInferenceEndpoint,
    options?: CallOptions
  ): Promise<DeleteInferenceEndpoint_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}`;
    let resp: DeleteInferenceEndpoint_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
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
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the details for a single serving endpoint. */
  async getInferenceEndpoint(
    signal: AbortSignal | undefined,
    req: GetInferenceEndpoint,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}`;
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get the query schema of the serving endpoint in OpenAPI format. The schema contains information for the supported paths, input and output format and datatypes. */
  async getInferenceEndpointSchema(
    signal: AbortSignal | undefined,
    req: GetInferenceEndpointSchema,
    options?: CallOptions
  ): Promise<GetOpenApiResponse> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/openapi`;
    let resp: GetOpenApiResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const httpResp = await sendAndCheckError({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = {
        contents: httpResp.body ?? undefined,
      };
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get all serving endpoints. */
  async listInferenceEndpoints(
    signal: AbortSignal | undefined,
    _req: ListInferenceEndpoints,
    options?: CallOptions
  ): Promise<ListInferenceEndpoints_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints`;
    let resp: ListInferenceEndpoints_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
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
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Used to batch add and delete tags from a serving endpoint with a single API call. */
  async patchInferenceEndpointTags(
    signal: AbortSignal | undefined,
    req: PatchInferenceEndpointTags,
    options?: CallOptions
  ): Promise<PatchInferenceEndpointTags_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/tags`;
    const body = marshalRequest(req, marshalPatchInferenceEndpointTagsSchema);
    let resp: PatchInferenceEndpointTags_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
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
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Used to update the AI Gateway of a serving endpoint. NOTE: External model, provisioned throughput, and pay-per-token endpoints are fully supported; agent endpoints currently only support inference tables. */
  async putInferenceEndpointAiGateway(
    signal: AbortSignal | undefined,
    req: PutInferenceEndpointAiGateway,
    options?: CallOptions
  ): Promise<PutInferenceEndpointAiGateway_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/ai-gateway`;
    const body = marshalRequest(
      req,
      marshalPutInferenceEndpointAiGatewaySchema
    );
    let resp: PutInferenceEndpointAiGateway_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
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
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates any combination of the serving endpoint's served entities, the compute configuration of those served entities, and the endpoint's traffic config. An endpoint that already has an update in progress can not be updated until the current update completes or fails. */
  async putInferenceEndpointConfig(
    signal: AbortSignal | undefined,
    req: PutInferenceEndpointConfig,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/config`;
    const body = marshalRequest(req, marshalPutInferenceEndpointConfigSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async putInferenceEndpointConfigWaiter(
    signal: AbortSignal | undefined,
    req: PutInferenceEndpointConfig,
    options?: CallOptions
  ): Promise<PutInferenceEndpointConfigWaiter> {
    await this.putInferenceEndpointConfig(signal, req, options);
    if (req.name === undefined) {
      throw new Error('request field name required for polling is missing');
    }
    return new PutInferenceEndpointConfigWaiter(this, req.name);
  }

  /** Deprecated: Please use AI Gateway to manage rate limits instead. */
  async putInferenceEndpointRateLimits(
    signal: AbortSignal | undefined,
    req: PutInferenceEndpointRateLimits,
    options?: CallOptions
  ): Promise<PutInferenceEndpointRateLimits_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/rate-limits`;
    const body = marshalRequest(
      req,
      marshalPutInferenceEndpointRateLimitsSchema
    );
    let resp: PutInferenceEndpointRateLimits_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
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
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates any combination of the pt endpoint's served entities, the compute configuration of those served entities, and the endpoint's traffic config. Updates are instantaneous and endpoint should be updated instantly */
  async putProvisionedThroughputInferenceEndpointConfig(
    signal: AbortSignal | undefined,
    req: PutPtEndpointConfig,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    const url = `${this.host}/api/2.0/serving-endpoints/pt/${req.name ?? ''}/config`;
    const body = marshalRequest(req, marshalPutPtEndpointConfigSchema);
    let resp: InferenceEndpointDetailed | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalInferenceEndpointDetailedSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async putProvisionedThroughputInferenceEndpointConfigWaiter(
    signal: AbortSignal | undefined,
    req: PutPtEndpointConfig,
    options?: CallOptions
  ): Promise<PutProvisionedThroughputInferenceEndpointConfigWaiter> {
    await this.putProvisionedThroughputInferenceEndpointConfig(
      signal,
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
    signal: AbortSignal | undefined,
    req: UpdateInferenceEndpointNotifications,
    options?: CallOptions
  ): Promise<UpdateInferenceEndpointNotifications_Response> {
    const url = `${this.host}/api/2.0/serving-endpoints/${req.name ?? ''}/notifications`;
    const body = marshalRequest(
      req,
      marshalUpdateInferenceEndpointNotificationsSchema
    );
    let resp: UpdateInferenceEndpointNotifications_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
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
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Make external services call using the credentials stored in UC Connection. */
  async httpRequest(
    signal: AbortSignal | undefined,
    req: ExternalFunctionRequest,
    options?: CallOptions
  ): Promise<ExternalFunctionResponse> {
    const url = `${this.host}/api/2.0/external-function`;
    const body = marshalRequest(req, marshalExternalFunctionRequestSchema);
    let resp: ExternalFunctionResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const httpResp = await sendAndCheckError({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = {
        contents: httpResp.body ?? undefined,
      };
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class CreateInferenceEndpointWaiter {
  constructor(
    private readonly client: Client,
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        callSignal,
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

    const retryOptions: CallOptions = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<boolean> {
    const pollResp = await this.client.getInferenceEndpoint(
      signal,
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
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        callSignal,
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

    const retryOptions: CallOptions = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<boolean> {
    const pollResp = await this.client.getInferenceEndpoint(
      signal,
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
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        callSignal,
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

    const retryOptions: CallOptions = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<boolean> {
    const pollResp = await this.client.getInferenceEndpoint(
      signal,
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
    readonly name: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<InferenceEndpointDetailed> {
    let result: InferenceEndpointDetailed | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getInferenceEndpoint(
        callSignal,
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

    const retryOptions: CallOptions = {
      retrier: () =>
        retryOn({}, (err: Error) => {
          return err instanceof StillRunningError;
        }),
    };
    await executeCall(signal, call, retryOptions);
    if (result === undefined) {
      throw new Error('API call completed without a result.');
    }
    return result;
  }

  /** Checks whether the operation has reached a terminal state. */
  async done(
    signal: AbortSignal | undefined,
    options?: CallOptions
  ): Promise<boolean> {
    const pollResp = await this.client.getInferenceEndpoint(
      signal,
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
