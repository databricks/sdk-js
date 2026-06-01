// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {LroOptions} from '@databricks/sdk-options/lro';
import type {HttpClient} from '@databricks/sdk-core/http';
import {newHttpClient} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
  executeWait,
  StillRunningError,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateForecastingExperimentRequest,
  CreateForecastingExperimentResponse,
  ForecastingExperiment,
  GetForecastingExperimentRequest,
} from './model';
import {
  ForecastingExperiment_State,
  marshalCreateForecastingExperimentRequestSchema,
  unmarshalCreateForecastingExperimentResponseSchema,
  unmarshalForecastingExperimentSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class ForecastingClient {
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

  /** Creates a serverless forecasting experiment. Returns the experiment ID. */
  private async createForecastingExperiment(
    req: CreateForecastingExperimentRequest,
    options?: CallOptions
  ): Promise<CreateForecastingExperimentResponse> {
    const url = `${this.host}/api/2.0/automl/create-forecasting-experiment`;
    const body = marshalRequest(
      req,
      marshalCreateForecastingExperimentRequestSchema
    );
    let resp: CreateForecastingExperimentResponse | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalCreateForecastingExperimentResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async createForecastingExperimentWaiter(
    req: CreateForecastingExperimentRequest,
    options?: CallOptions
  ): Promise<CreateForecastingExperimentWaiter> {
    const resp = await this.createForecastingExperiment(req, options);
    if (resp.experimentId === undefined) {
      throw new Error(
        'response field experimentId required for polling is missing'
      );
    }
    return new CreateForecastingExperimentWaiter(this, resp.experimentId);
  }

  /** Public RPC to get forecasting experiment */
  async getForecastingExperiment(
    req: GetForecastingExperimentRequest,
    options?: CallOptions
  ): Promise<ForecastingExperiment> {
    const url = `${this.host}/api/2.0/automl/get-forecasting-experiment/${req.experimentId ?? ''}`;
    let resp: ForecastingExperiment | undefined;
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
      resp = parseResponse(respBody, unmarshalForecastingExperimentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}

export class CreateForecastingExperimentWaiter {
  constructor(
    private readonly client: ForecastingClient,
    readonly experimentId: string
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: LroOptions): Promise<ForecastingExperiment> {
    let result: ForecastingExperiment | undefined;

    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getForecastingExperiment(
        {
          experimentId: this.experimentId,
        },
        callSignal !== undefined ? {signal: callSignal} : undefined
      );

      const status = pollResp.state;
      if (status === undefined) {
        throw new Error('response missing required status field');
      }

      switch (status) {
        case ForecastingExperiment_State.SUCCEEDED:
          result = pollResp;
          return;
        case ForecastingExperiment_State.FAILED:
        case ForecastingExperiment_State.CANCELLED: {
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
    const pollResp = await this.client.getForecastingExperiment(
      {
        experimentId: this.experimentId,
      },
      options
    );

    const status = pollResp.state;
    if (status === undefined) {
      throw new Error('response missing required status field');
    }

    switch (status) {
      case ForecastingExperiment_State.SUCCEEDED:
      case ForecastingExperiment_State.FAILED:
      case ForecastingExperiment_State.CANCELLED:
        return true;
      default:
        return false;
    }
  }
}
