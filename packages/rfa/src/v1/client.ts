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
    signal: AbortSignal | undefined,
    req: BatchCreateAccessRequestsRequest,
    options?: Options
  ): Promise<BatchCreateAccessRequestsResponse> {
    const url = `${this.host}/api/3.0/rfa/requests`;
    const body = marshalRequest(
      req,
      marshalBatchCreateAccessRequestsRequestSchema
    );
    let resp: BatchCreateAccessRequestsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetAccessRequestDestinationsRequest,
    options?: Options
  ): Promise<AccessRequestDestinations> {
    const url = `${this.host}/api/3.0/rfa/destinations/${req.securableType ?? ''}/${req.fullName ?? ''}`;
    let resp: AccessRequestDestinations | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccessRequestDestinationsSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateAccessRequestDestinationsRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccessRequestDestinationsSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
