// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
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
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  CreateLogDeliveryConfiguration,
  CreateLogDeliveryConfiguration_Response,
  GetLogDeliveryConfiguration,
  GetLogDeliveryConfiguration_Response,
  ListLogDeliveryConfiguration,
  ListLogDeliveryConfiguration_Response,
  LogDeliveryConfiguration,
  UpdateLogDeliveryConfiguration,
  UpdateLogDeliveryConfiguration_Response,
} from './model';
import {
  marshalCreateLogDeliveryConfigurationSchema,
  marshalUpdateLogDeliveryConfigurationSchema,
  unmarshalCreateLogDeliveryConfiguration_ResponseSchema,
  unmarshalGetLogDeliveryConfiguration_ResponseSchema,
  unmarshalListLogDeliveryConfiguration_ResponseSchema,
  unmarshalUpdateLogDeliveryConfiguration_ResponseSchema,
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
   * Creates a new <Databricks> log delivery configuration to enable delivery of the specified type of logs to your storage location.
   * This requires that you already created a [credential object](:method:Credentials/Create) (which encapsulates a cross-account service IAM role)
   * and a [storage configuration object](:method:Storage/Create) (which encapsulates an S3 bucket).
   *
   * For full details, including the required IAM role policies and bucket policies,
   * see [Deliver and access billable usage logs](https://docs.databricks.com/administration-guide/account-settings/billable-usage-delivery.html)
   * or [Configure audit logging](https://docs.databricks.com/administration-guide/account-settings/audit-logs.html).
   *
   * **Note**: There is a limit on the number of log delivery configurations available per account (each limit applies separately to each log type including billable usage and audit logs).
   * You can create a maximum of two enabled account-level delivery configurations (configurations without a workspace filter) per type.
   * Additionally, you can create two enabled workspace-level delivery configurations per workspace for each log type, which means that the same workspace ID can occur in the workspace filter for no more than two delivery configurations per log type.
   *
   * You cannot delete a log delivery configuration, but you can disable it (see [Enable or disable log delivery configuration](:method:LogDelivery/PatchStatus)).
   */
  async createLogDeliveryConfiguration(
    signal: AbortSignal | undefined,
    req: CreateLogDeliveryConfiguration,
    options?: CallOptions
  ): Promise<CreateLogDeliveryConfiguration_Response> {
    const url = `${this.host}/api/2.0/accounts/${req.logDeliveryConfiguration?.accountId ?? ''}/log-delivery`;
    const body = marshalRequest(
      req,
      marshalCreateLogDeliveryConfigurationSchema
    );
    let resp: CreateLogDeliveryConfiguration_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalCreateLogDeliveryConfiguration_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a <Databricks> log delivery configuration object for an account, both specified by ID. */
  async getLogDeliveryConfiguration(
    signal: AbortSignal | undefined,
    req: GetLogDeliveryConfiguration,
    options?: CallOptions
  ): Promise<GetLogDeliveryConfiguration_Response> {
    const url = `${this.host}/api/2.0/accounts//log-delivery/${req.configId ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetLogDeliveryConfiguration_Response | undefined;
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
        unmarshalGetLogDeliveryConfiguration_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets all <Databricks> log delivery configurations associated with an account specified by ID. */
  async listLogDeliveryConfiguration(
    signal: AbortSignal | undefined,
    req: ListLogDeliveryConfiguration,
    options?: CallOptions
  ): Promise<ListLogDeliveryConfiguration_Response> {
    const url = `${this.host}/api/2.0/accounts/{account_id}/log-delivery`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.credentialsId !== undefined) {
      params.append('credentials_id', req.credentialsId);
    }
    if (req.storageConfigurationId !== undefined) {
      params.append('storage_configuration_id', req.storageConfigurationId);
    }
    if (req.status !== undefined) {
      params.append('status', req.status);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListLogDeliveryConfiguration_Response | undefined;
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
        unmarshalListLogDeliveryConfiguration_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listLogDeliveryConfigurationIter(
    signal: AbortSignal | undefined,
    req: ListLogDeliveryConfiguration,
    options?: CallOptions
  ): AsyncGenerator<LogDeliveryConfiguration> {
    const pageReq: ListLogDeliveryConfiguration = {...req};
    for (;;) {
      const resp = await this.listLogDeliveryConfiguration(
        signal,
        pageReq,
        options
      );
      for (const item of resp.logDeliveryConfigurations ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Enables or disables a log delivery configuration.
   * Deletion of delivery configurations is not supported, so disable log delivery configurations that are no longer needed.
   * Note that you can't re-enable a delivery configuration if this would violate the delivery configuration limits described under [Create log delivery](:method:LogDelivery/Create).
   */
  async updateLogDeliveryConfiguration(
    signal: AbortSignal | undefined,
    req: UpdateLogDeliveryConfiguration,
    options?: CallOptions
  ): Promise<UpdateLogDeliveryConfiguration_Response> {
    const url = `${this.host}/api/2.0/accounts//log-delivery/${req.configId ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateLogDeliveryConfigurationSchema
    );
    let resp: UpdateLogDeliveryConfiguration_Response | undefined;
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
        unmarshalUpdateLogDeliveryConfiguration_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
