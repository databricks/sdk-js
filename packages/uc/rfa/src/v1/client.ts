// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import type {ClientInfo} from '@databricks/sdk-core/clientinfo';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  encodePathVariable,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import type {
  AccessRequestDestinations,
  BatchCreateAccessRequestsRequest,
  BatchCreateAccessRequestsResponse,
  GetAccessRequestDestinationsRequest,
  UpdateAccessRequestDestinationsRequest,
} from './model';
import {
  marshalAccessRequestDestinationsSchema,
  marshalBatchCreateAccessRequestsRequestSchema,
  unmarshalAccessRequestDestinationsSchema,
  unmarshalBatchCreateAccessRequestsResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class RfaClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent segments, composed once at construction from createDefault()
  // merged with this package's identity. Each request adds the auth method,
  // which default credentials choose only when they first sign a request.
  private readonly clientInfo: ClientInfo;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    this.clientInfo = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION});
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options, this.clientInfo);
    return this.config;
  }

  /**
   * Creates access requests for Unity Catalog permissions for a specified principal on a securable object.
   * This Batch API can take in multiple principals, securable objects,
   * and permissions as the input and returns the access request destinations for each.
   * Principals must be unique across the API call.
   *
   * The supported securable types are: "metastore", "catalog", "schema", "table",
   * "external_location", "connection", "credential", "function", "registered_model", and "volume".
   */
  async batchCreateAccessRequests(
    req: BatchCreateAccessRequestsRequest,
    options?: CallOptions
  ): Promise<BatchCreateAccessRequestsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/3.0/rfa/requests`;
    const body = marshalRequest(
      req,
      marshalBatchCreateAccessRequestsRequestSchema
    );
    let resp: BatchCreateAccessRequestsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalBatchCreateAccessRequestsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of access request destinations for the specified securable.
   * Any caller can see URL destinations or the destinations on the metastore.
   * Otherwise, only those with **BROWSE** permissions on the securable can see destinations.
   *
   * The supported securable types are: "metastore", "catalog", "schema", "table",
   * "external_location", "connection", "credential", "function", "registered_model", and "volume".
   */
  async getAccessRequestDestinations(
    req: GetAccessRequestDestinationsRequest,
    options?: CallOptions
  ): Promise<AccessRequestDestinations> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/3.0/rfa/destinations/${encodePathVariable(req.securableType ?? '')}/${encodePathVariable(req.fullName ?? '')}`;
    let resp: AccessRequestDestinations | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccessRequestDestinationsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the access request destinations for the given securable.
   * The caller must be a metastore admin, the owner of the securable, or a user that has the **MANAGE** privilege on the securable in order to assign destinations.
   * A maximum of 5 emails and 5 external notification destinations (Slack, Microsoft Teams, Generic Webhook, Databricks App Slack/Teams, Asana, ServiceNow, and EventBridge destinations) can be assigned to a securable.
   * If a URL destination is assigned, no other destinations can be set.
   * An update replaces every destination assigned directly to the securable in this workspace. An empty list removes them all.
   *
   * The supported securable types are: "metastore", "catalog", "schema", "table",
   * "external_location", "connection", "credential", "function", "registered_model", and "volume".
   *
   * On a metastore that has a **url_configuration**, its URLs are shared by every workspace, while emails and
   * webhooks are still saved per workspace. There, a URL destination replaces the configuration's
   * **redirect_url** and clears its **dynamic_url**, so requests that used the **dynamic_url** go to the new URL.
   * An update that has no URL destination and does not set **url_configuration** clears both URLs, in every
   * workspace.
   */
  async updateAccessRequestDestinations(
    req: UpdateAccessRequestDestinationsRequest,
    options?: CallOptions
  ): Promise<AccessRequestDestinations> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/3.0/rfa/destinations`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body =
      req.accessRequestDestinations === undefined
        ? 'null'
        : marshalRequest(
            req.accessRequestDestinations,
            marshalAccessRequestDestinationsSchema
          );
    let resp: AccessRequestDestinations | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined && workspaceId !== '') {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccessRequestDestinationsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
