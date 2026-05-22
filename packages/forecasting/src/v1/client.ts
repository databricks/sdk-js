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
import {buildHttpRequest, executeCall, executeHttpCall, marshalRequest, parseResponse} from './utils';
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

  /** Creates a serverless forecasting experiment. Returns the experiment ID. */
  async createForecastingExperiment(req: CreateForecastingExperimentRequest, options?: CallOptions): Promise<CreateForecastingExperimentResponse> {
    const url = `${this.host}/api/2.0/automl/create-forecasting-experiment`;
    const body = marshalRequest(req, marshalCreateForecastingExperimentRequestSchema);
    let resp: CreateForecastingExperimentResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalCreateForecastingExperimentResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    return new CreateForecastingExperimentWaiter(
      this,
      resp.experimentId,
    );
  }

  /** Public RPC to get forecasting experiment */
  async getForecastingExperiment(req: GetForecastingExperimentRequest, options?: CallOptions): Promise<ForecastingExperiment> {
    const url = `${this.host}/api/2.0/automl/get-forecasting-experiment/${req.experimentId ?? ''}`;
    let resp: ForecastingExperiment | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalForecastingExperimentSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}

export class CreateForecastingExperimentWaiter {
  constructor(
    private readonly client: Client,
    readonly experimentId: string,
  ) {}

  /**
   * Polls until the operation reaches a terminal state.
   *
   * Throws if a failure state is reached.
   */
  async wait(options?: CallOptions): Promise<ForecastingExperiment> {
    let result: ForecastingExperiment | undefined;

    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const pollResp = await this.client.getForecastingExperiment(
        {
          experimentId: this.experimentId,
        },
        {...options, ...(callSignal !== undefined && {signal: callSignal})}
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
        case ForecastingExperiment_State.CANCELLED:
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
