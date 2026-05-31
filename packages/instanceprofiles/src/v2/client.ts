// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {Call} from '@databricks/sdk-core/api';
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
import type {
  AddInstanceProfileRequest,
  AddInstanceProfileRequest_Response,
  EditInstanceProfileRequest,
  EditInstanceProfileRequest_Response,
  ListInstanceProfilesRequest,
  ListInstanceProfilesRequest_Response,
  RemoveInstanceProfileRequest,
  RemoveInstanceProfileRequest_Response,
} from './model';
import {
  marshalAddInstanceProfileRequestSchema,
  marshalEditInstanceProfileRequestSchema,
  marshalRemoveInstanceProfileRequestSchema,
  unmarshalAddInstanceProfileRequest_ResponseSchema,
  unmarshalEditInstanceProfileRequest_ResponseSchema,
  unmarshalListInstanceProfilesRequest_ResponseSchema,
  unmarshalRemoveInstanceProfileRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class InstanceProfilesClient {
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

  /**
   * Registers an instance profile in <Databricks>. In the UI, you can then give users the permission
   * to use this instance profile when launching clusters.
   *
   * This API is only available to admin users.
   */
  async addInstanceProfile(
    req: AddInstanceProfileRequest,
    options?: CallOptions
  ): Promise<AddInstanceProfileRequest_Response> {
    const url = `${this.host}/api/2.0/instance-profiles/add`;
    const body = marshalRequest(req, marshalAddInstanceProfileRequestSchema);
    let resp: AddInstanceProfileRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalAddInstanceProfileRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
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
    req: EditInstanceProfileRequest,
    options?: CallOptions
  ): Promise<EditInstanceProfileRequest_Response> {
    const url = `${this.host}/api/2.0/instance-profiles/edit`;
    const body = marshalRequest(req, marshalEditInstanceProfileRequestSchema);
    let resp: EditInstanceProfileRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalEditInstanceProfileRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
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
    _req: ListInstanceProfilesRequest,
    options?: CallOptions
  ): Promise<ListInstanceProfilesRequest_Response> {
    const url = `${this.host}/api/2.0/instance-profiles/list`;
    let resp: ListInstanceProfilesRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalListInstanceProfilesRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
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
    req: RemoveInstanceProfileRequest,
    options?: CallOptions
  ): Promise<RemoveInstanceProfileRequest_Response> {
    const url = `${this.host}/api/2.0/instance-profiles/remove`;
    const body = marshalRequest(req, marshalRemoveInstanceProfileRequestSchema);
    let resp: RemoveInstanceProfileRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalRemoveInstanceProfileRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
