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
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
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
    const url = `${this.host}/api/3.0/rfa/requests`;
    const body = marshalRequest(
      req,
      marshalBatchCreateAccessRequestsRequestSchema
    );
    let resp: BatchCreateAccessRequestsResponse | undefined;
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
        unmarshalBatchCreateAccessRequestsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    const url = `${this.host}/api/3.0/rfa/destinations/${req.securableType ?? ''}/${req.fullName ?? ''}`;
    let resp: AccessRequestDestinations | undefined;
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
      resp = parseResponse(respBody, unmarshalAccessRequestDestinationsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the access request destinations for the given securable.
   * The caller must be a metastore admin, the owner of the securable, or a user that has the **MANAGE** privilege on the securable in order to assign destinations.
   * Destinations cannot be updated for securables underneath schemas (tables, volumes, functions, and models). For these securable types, destinations are inherited from the parent securable.
   * A maximum of 5 emails and 5 external notification destinations (Slack, Microsoft Teams, and Generic Webhook destinations) can be assigned to a securable.
   * If a URL destination is assigned, no other destinations can be set.
   *
   * The supported securable types are: "metastore", "catalog", "schema", "table",
   * "external_location", "connection", "credential", "function", "registered_model", and "volume".
   */
  async updateAccessRequestDestinations(
    req: UpdateAccessRequestDestinationsRequest,
    options?: CallOptions
  ): Promise<AccessRequestDestinations> {
    const url = `${this.host}/api/3.0/rfa/destinations`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.accessRequestDestinations,
      marshalAccessRequestDestinationsSchema
    );
    let resp: AccessRequestDestinations | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccessRequestDestinationsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
