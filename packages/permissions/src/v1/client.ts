// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-core/api';
import {execute} from '@databricks/sdk-core/api';
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
import type {
  GetObjectPermissions,
  GetPermissionLevels,
  GetPermissionLevels_Response,
  PermissionsResponse,
  SetObjectPermissions,
  UpdateObjectPermissions,
} from './model';
import {
  marshalSetObjectPermissionsSchema,
  marshalUpdateObjectPermissionsSchema,
  unmarshalGetPermissionLevels_ResponseSchema,
  unmarshalPermissionsResponseSchema,
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

  /** Gets the permissions of an object. Objects can inherit permissions from their parent objects or root object. */
  async getObjectPermissions(
    signal: AbortSignal | undefined,
    req: GetObjectPermissions,
    options?: Options
  ): Promise<PermissionsResponse> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}`;
    let resp: PermissionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the permission levels that a user can have on an object. */
  async getPermissionLevels(
    signal: AbortSignal | undefined,
    req: GetPermissionLevels,
    options?: Options
  ): Promise<GetPermissionLevels_Response> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}/permissionLevels`;
    let resp: GetPermissionLevels_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGetPermissionLevels_ResponseSchema
      );
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Sets permissions on an object, replacing existing permissions if they exist. Deletes all direct permissions if none are specified. Objects can inherit permissions from their parent objects or root object. */
  async setObjectPermissions(
    signal: AbortSignal | undefined,
    req: SetObjectPermissions,
    options?: Options
  ): Promise<PermissionsResponse> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}`;
    const body = marshalRequest(req, marshalSetObjectPermissionsSchema);
    let resp: PermissionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PUT', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the permissions on an object. Objects can inherit permissions from their parent objects or root object. */
  async updateObjectPermissions(
    signal: AbortSignal | undefined,
    req: UpdateObjectPermissions,
    options?: Options
  ): Promise<PermissionsResponse> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateObjectPermissionsSchema);
    let resp: PermissionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
