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

  /** Gets the permissions of an object. Objects can inherit permissions from their parent objects or root object. */
  async getObjectPermissions(
    signal: AbortSignal | undefined,
    req: GetObjectPermissions,
    options?: CallOptions
  ): Promise<PermissionsResponse> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}`;
    let resp: PermissionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the permission levels that a user can have on an object. */
  async getPermissionLevels(
    signal: AbortSignal | undefined,
    req: GetPermissionLevels,
    options?: CallOptions
  ): Promise<GetPermissionLevels_Response> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}/permissionLevels`;
    let resp: GetPermissionLevels_Response | undefined;
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
        unmarshalGetPermissionLevels_ResponseSchema
      );
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Sets permissions on an object, replacing existing permissions if they exist. Deletes all direct permissions if none are specified. Objects can inherit permissions from their parent objects or root object. */
  async setObjectPermissions(
    signal: AbortSignal | undefined,
    req: SetObjectPermissions,
    options?: CallOptions
  ): Promise<PermissionsResponse> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}`;
    const body = marshalRequest(req, marshalSetObjectPermissionsSchema);
    let resp: PermissionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the permissions on an object. Objects can inherit permissions from their parent objects or root object. */
  async updateObjectPermissions(
    signal: AbortSignal | undefined,
    req: UpdateObjectPermissions,
    options?: CallOptions
  ): Promise<PermissionsResponse> {
    const url = `${this.host}/api/2.0/permissions/${req.requestObjectType ?? ''}/${req.requestObjectId ?? ''}`;
    const body = marshalRequest(req, marshalUpdateObjectPermissionsSchema);
    let resp: PermissionsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPermissionsResponseSchema);
    };
    await executeCall(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
