// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
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
import type {
  AddInstanceProfile,
  AddInstanceProfile_Response,
  EditInstanceProfile,
  EditInstanceProfile_Response,
  ListInstanceProfiles,
  ListInstanceProfiles_Response,
  RemoveInstanceProfile,
  RemoveInstanceProfile_Response,
} from './model';
import {
  marshalAddInstanceProfileSchema,
  marshalEditInstanceProfileSchema,
  marshalRemoveInstanceProfileSchema,
  unmarshalAddInstanceProfile_ResponseSchema,
  unmarshalEditInstanceProfile_ResponseSchema,
  unmarshalListInstanceProfiles_ResponseSchema,
  unmarshalRemoveInstanceProfile_ResponseSchema,
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
   * Registers an instance profile in <Databricks>. In the UI, you can then give users the permission
   * to use this instance profile when launching clusters.
   *
   * This API is only available to admin users.
   */
  async addInstanceProfile(
    signal: AbortSignal | undefined,
    req: AddInstanceProfile,
    options?: Options
  ): Promise<AddInstanceProfile_Response> {
    const url = `${this.host}/api/2.0/instance-profiles/add`;
    const body = marshalRequest(req, marshalAddInstanceProfileSchema);
    let resp: AddInstanceProfile_Response | undefined;
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
        unmarshalAddInstanceProfile_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * The only supported field to change is the optional IAM role ARN associated with
   * the instance profile. It is required to specify the IAM role ARN if both of
   * the following are true:
   *
   * * Your role name and instance profile name do not match. The name is the part
   * after the last slash in each ARN.
   * * You want to use the instance profile with [Databricks SQL Serverless](/sql/admin/serverless.html).
   *
   * To understand where these fields are in the AWS console, see
   * [Enable serverless SQL warehouses](/sql/admin/serverless.html).
   *
   * This API is only available to admin users.
   */
  async editInstanceProfile(
    signal: AbortSignal | undefined,
    req: EditInstanceProfile,
    options?: Options
  ): Promise<EditInstanceProfile_Response> {
    const url = `${this.host}/api/2.0/instance-profiles/edit`;
    const body = marshalRequest(req, marshalEditInstanceProfileSchema);
    let resp: EditInstanceProfile_Response | undefined;
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
        unmarshalEditInstanceProfile_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * List the instance profiles that the calling user can use to launch a cluster.
   *
   * This API is available to all users.
   */
  async listInstanceProfiles(
    signal: AbortSignal | undefined,
    _req: ListInstanceProfiles,
    options?: Options
  ): Promise<ListInstanceProfiles_Response> {
    const url = `${this.host}/api/2.0/instance-profiles/list`;
    let resp: ListInstanceProfiles_Response | undefined;
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
        unmarshalListInstanceProfiles_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Remove the instance profile with the provided ARN.
   * Existing clusters with this instance profile will continue to function.
   *
   * This API is only accessible to admin users.
   */
  async removeInstanceProfile(
    signal: AbortSignal | undefined,
    req: RemoveInstanceProfile,
    options?: Options
  ): Promise<RemoveInstanceProfile_Response> {
    const url = `${this.host}/api/2.0/instance-profiles/remove`;
    const body = marshalRequest(req, marshalRemoveInstanceProfileSchema);
    let resp: RemoveInstanceProfile_Response | undefined;
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
        unmarshalRemoveInstanceProfile_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
