// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
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
  AclItem,
  CreateScopeRequest,
  CreateScopeRequest_Response,
  DeleteAclRequest,
  DeleteAclRequest_Response,
  DeleteScopeRequest,
  DeleteScopeRequest_Response,
  DeleteSecretRequest,
  DeleteSecretRequest_Response,
  GetAclRequest,
  GetSecretRequest,
  GetSecretRequest_Response,
  ListAclsRequest,
  ListAclsRequest_Response,
  ListScopesRequest,
  ListScopesRequest_Response,
  ListSecretsRequest,
  ListSecretsRequest_Response,
  PutAclRequest,
  PutAclRequest_Response,
  PutSecretRequest,
  PutSecretRequest_Response,
} from './model';
import {
  marshalCreateScopeRequestSchema,
  marshalDeleteAclRequestSchema,
  marshalDeleteScopeRequestSchema,
  marshalDeleteSecretRequestSchema,
  marshalPutAclRequestSchema,
  marshalPutSecretRequestSchema,
  unmarshalAclItemSchema,
  unmarshalCreateScopeRequest_ResponseSchema,
  unmarshalDeleteAclRequest_ResponseSchema,
  unmarshalDeleteScopeRequest_ResponseSchema,
  unmarshalDeleteSecretRequest_ResponseSchema,
  unmarshalGetSecretRequest_ResponseSchema,
  unmarshalListAclsRequest_ResponseSchema,
  unmarshalListScopesRequest_ResponseSchema,
  unmarshalListSecretsRequest_ResponseSchema,
  unmarshalPutAclRequest_ResponseSchema,
  unmarshalPutSecretRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class SecretsClient {
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
   * Creates a new secret scope.
   *
   * The scope name must consist of alphanumeric characters, dashes, underscores, and
   * periods, and may not exceed 128 characters.
   *
   * Example request:
   *
   * .. code::
   *
   * {
   * "scope": "my-simple-databricks-scope",
   * "initial_manage_principal": "users"
   * "scope_backend_type": "databricks|azure_keyvault",
   * # below is only required if scope type is azure_keyvault
   * "backend_azure_keyvault": {
   * "resource_id": "/subscriptions/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx/resourceGroups/xxxx/providers/Microsoft.KeyVault/vaults/xxxx",
   * "tenant_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
   * "dns_name": "https://xxxx.vault.azure.net/",
   * }
   * }
   *
   * If ``initial_manage_principal`` is specified, the initial ACL applied to the scope is
   * applied to the supplied principal (user or group) with ``MANAGE`` permissions.
   * The only supported principal for this option is the group ``users``, which
   * contains all users in the workspace. If ``initial_manage_principal`` is not specified,
   * the initial ACL with ``MANAGE`` permission applied to the scope is assigned to the
   * API request issuer's user identity.
   *
   * If ``scope_backend_type`` is ``azure_keyvault``, a secret scope is created with secrets
   * from a given Azure KeyVault. The caller must provide the keyvault_resource_id and the tenant_id
   * for the key vault. If ``scope_backend_type`` is ``databricks`` or is unspecified, an empty
   * secret scope is created and stored in <Databricks>'s own storage.
   *
   *
   * Throws ``RESOURCE_ALREADY_EXISTS`` if a scope with the given name already exists.
   * Throws ``RESOURCE_LIMIT_EXCEEDED`` if maximum number of scopes in the workspace is exceeded.
   * Throws ``INVALID_PARAMETER_VALUE`` if the scope name is invalid.
   * Throws ``BAD_REQUEST`` if request violated constraints.
   * Throws ``CUSTOMER_UNAUTHORIZED`` if normal user attempts to create a scope with name reserved for databricks internal usage.
   * Throws ``UNAUTHENTICATED`` if unable to verify user access permission on Azure KeyVault
   */
  async createScope(
    req: CreateScopeRequest,
    options?: CallOptions
  ): Promise<CreateScopeRequest_Response> {
    const url = `${this.host}/api/2.0/secrets/scopes/create`;
    const body = marshalRequest(req, marshalCreateScopeRequestSchema);
    let resp: CreateScopeRequest_Response | undefined;
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
        unmarshalCreateScopeRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes the given ACL on the given scope.
   *
   * Users must have the ``MANAGE`` permission to invoke this API.
   *
   * Example request:
   *
   * .. code::
   *
   * {
   * "scope": "my-secret-scope",
   * "principal": "data-scientists"
   * }
   *
   * Throws ``RESOURCE_DOES_NOT_EXIST`` if no such secret scope, principal, or ACL exists.
   * Throws ``PERMISSION_DENIED`` if the user does not have permission to make this API call.
   * Throws ``INVALID_PARAMETER_VALUE`` if the permission or principal is invalid.
   */
  async deleteAcl(
    req: DeleteAclRequest,
    options?: CallOptions
  ): Promise<DeleteAclRequest_Response> {
    const url = `${this.host}/api/2.0/secrets/acls/delete`;
    const body = marshalRequest(req, marshalDeleteAclRequestSchema);
    let resp: DeleteAclRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalDeleteAclRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a secret scope.
   *
   * Example request:
   *
   * .. code::
   *
   * {
   * "scope": "my-secret-scope"
   * }
   *
   * Throws ``RESOURCE_DOES_NOT_EXIST`` if the scope does not exist.
   * Throws ``PERMISSION_DENIED`` if the user does not have permission to make this API call.
   * Throws ``BAD_REQUEST`` if system user attempts to delete internal secret scope.
   */
  async deleteScope(
    req: DeleteScopeRequest,
    options?: CallOptions
  ): Promise<DeleteScopeRequest_Response> {
    const url = `${this.host}/api/2.0/secrets/scopes/delete`;
    const body = marshalRequest(req, marshalDeleteScopeRequestSchema);
    let resp: DeleteScopeRequest_Response | undefined;
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
        unmarshalDeleteScopeRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes the secret stored in this secret scope. You must have ``WRITE`` or ``MANAGE``
   * permission on the Secret Scope.
   *
   * Example request:
   *
   * .. code::
   *
   * {
   * "scope": "my-secret-scope",
   * "key": "my-secret-key"
   * }
   *
   * Throws ``RESOURCE_DOES_NOT_EXIST`` if no such secret scope or secret exists.
   * Throws ``PERMISSION_DENIED`` if the user does not have permission to make this API call.
   * Throws ``BAD_REQUEST`` if system user attempts to delete an internal secret, or request is made against Azure KeyVault backed scope.
   */
  async deleteSecret(
    req: DeleteSecretRequest,
    options?: CallOptions
  ): Promise<DeleteSecretRequest_Response> {
    const url = `${this.host}/api/2.0/secrets/delete`;
    const body = marshalRequest(req, marshalDeleteSecretRequestSchema);
    let resp: DeleteSecretRequest_Response | undefined;
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
        unmarshalDeleteSecretRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Describes the details about the given ACL, such as the group and permission.
   *
   * Users must have the ``MANAGE`` permission to invoke this API.
   *
   * Example response:
   *
   * .. code::
   *
   * {
   * "principal": "data-scientists",
   * "permission": "READ"
   * }
   *
   * Throws ``RESOURCE_DOES_NOT_EXIST`` if no such secret scope exists.
   * Throws ``PERMISSION_DENIED`` if the user does not have permission to make this API call.
   * Throws ``INVALID_PARAMETER_VALUE`` if the permission or principal is invalid.
   */
  async getAcl(req: GetAclRequest, options?: CallOptions): Promise<AclItem> {
    const url = `${this.host}/api/2.0/secrets/acls/get`;
    const params = new URLSearchParams();
    if (req.scope !== undefined) {
      params.append('scope', req.scope);
    }
    if (req.principal !== undefined) {
      params.append('principal', req.principal);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: AclItem | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAclItemSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a secret for a given key and scope. This API can only be called from the DBUtils
   * interface. Users need the READ permission to make this call.
   *
   * Example response:
   *
   * .. code::
   *
   * {
   * "key": "my-string-key",
   * "value": <bytes of the secret value>
   * }
   *
   * Note that the secret value returned is in bytes. The interpretation of the bytes
   * is determined by the caller in DBUtils and the type the data is decoded into.
   *
   * Throws ``RESOURCE_DOES_NOT_EXIST`` if no such secret or secret scope exists.
   * Throws ``PERMISSION_DENIED`` if the user does not have permission to make this API call.
   *
   * Note: This is explicitly an undocumented API. It also doesn't need to be supported
   * for the /preview prefix, because it's not a customer-facing API (i.e. only used
   * for DBUtils SecretUtils to fetch secrets).
   *
   * Throws ``RESOURCE_DOES_NOT_EXIST`` if no such secret scope or secret exists.
   * Throws ``BAD_REQUEST`` if normal user calls get secret outside of a notebook.
   * AKV specific errors:
   * Throws ``INVALID_PARAMETER_VALUE`` if secret name is not alphanumeric or too long.
   * Throws ``PERMISSION_DENIED`` if secret manager cannot access AKV with 403 error
   * Throws ``MALFORMED_REQUEST`` if secret manager cannot access AKV with any other 4xx error
   */
  async getSecret(
    req: GetSecretRequest,
    options?: CallOptions
  ): Promise<GetSecretRequest_Response> {
    const url = `${this.host}/api/2.0/secrets/get`;
    const params = new URLSearchParams();
    if (req.scope !== undefined) {
      params.append('scope', req.scope);
    }
    if (req.key !== undefined) {
      params.append('key', req.key);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetSecretRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetSecretRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists the ACLs set on the given scope.
   *
   * Users must have the ``MANAGE`` permission to invoke this API.
   *
   * Example response:
   *
   * .. code::
   *
   * {
   * "acls": [{
   * "principal": "admins",
   * "permission": "MANAGE"
   * },{
   * "principal": "data-scientists",
   * "permission": "READ"
   * }]
   * }
   *
   * Throws ``RESOURCE_DOES_NOT_EXIST`` if no such secret scope exists.
   * Throws ``PERMISSION_DENIED`` if the user does not have permission to make this API call.
   */
  async listAcls(
    req: ListAclsRequest,
    options?: CallOptions
  ): Promise<ListAclsRequest_Response> {
    const url = `${this.host}/api/2.0/secrets/acls/list`;
    const params = new URLSearchParams();
    if (req.scope !== undefined) {
      params.append('scope', req.scope);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAclsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListAclsRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists all secret scopes available in the workspace.
   *
   * Example response:
   *
   * .. code::
   *
   * {
   * "scopes": [{
   * "name": "my-databricks-scope",
   * "backend_type": "DATABRICKS"
   * },{
   * "name": "mount-points",
   * "backend_type": "DATABRICKS"
   * }]
   * }
   *
   * Throws ``PERMISSION_DENIED`` if the user does not have permission to make this API call.
   */
  async listScopes(
    _req: ListScopesRequest,
    options?: CallOptions
  ): Promise<ListScopesRequest_Response> {
    const url = `${this.host}/api/2.0/secrets/scopes/list`;
    let resp: ListScopesRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalListScopesRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Lists the secret keys that are stored at this scope. This is a metadata-only
   * operation; secret data cannot be retrieved using this API. Users need the READ
   * permission to make this call.
   *
   * Example response:
   *
   * .. code::
   *
   * {
   * "secrets": [
   * {
   * "key": "my-string-key"",
   * "last_updated_timestamp": "1520467595000"
   * },
   * {
   * "key": "my-byte-key",
   * "last_updated_timestamp": "1520467595000"
   * },
   * ]
   * }
   *
   * The lastUpdatedTimestamp returned is in milliseconds since epoch.
   *
   * Throws ``RESOURCE_DOES_NOT_EXIST`` if no such secret scope exists.
   * Throws ``PERMISSION_DENIED`` if the user does not have permission to make this API call.
   */
  async listSecrets(
    req: ListSecretsRequest,
    options?: CallOptions
  ): Promise<ListSecretsRequest_Response> {
    const url = `${this.host}/api/2.0/secrets/list`;
    const params = new URLSearchParams();
    if (req.scope !== undefined) {
      params.append('scope', req.scope);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSecretsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListSecretsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates or overwrites the ACL associated with the given principal (user or group) on the
   * specified scope point. In general, a user or group will use the most powerful
   * permission available to them, and permissions are ordered as follows:
   *
   * * ``MANAGE`` - Allowed to change ACLs, and read and write to this secret scope.
   * * ``WRITE`` - Allowed to read and write to this secret scope.
   * * ``READ`` - Allowed to read this secret scope and list what secrets are available.
   *
   * Note that in general, secret values can only be read from within a command
   * on a cluster (for example, through a notebook). There is no API to read the actual
   * secret value material outside of a cluster. However, the user's permission will be
   * applied based on who is executing the command, and they must have at least READ permission.
   *
   * Users must have the ``MANAGE`` permission to invoke this API.
   *
   * Example request:
   *
   * .. code::
   *
   * {
   * "scope": "my-secret-scope",
   * "principal": "data-scientists",
   * "permission": "READ"
   * }
   *
   * The principal is a user or group name corresponding to an existing <Databricks>
   * principal to be granted or revoked access.
   *
   * Throws ``RESOURCE_DOES_NOT_EXIST`` if no such secret scope exists.
   * Throws ``RESOURCE_ALREADY_EXISTS`` if a permission for the principal already exists.
   * Throws ``INVALID_PARAMETER_VALUE`` if the permission or principal is invalid.
   * Throws ``PERMISSION_DENIED`` if the user does not have permission to make this API call.
   */
  async putAcl(
    req: PutAclRequest,
    options?: CallOptions
  ): Promise<PutAclRequest_Response> {
    const url = `${this.host}/api/2.0/secrets/acls/put`;
    const body = marshalRequest(req, marshalPutAclRequestSchema);
    let resp: PutAclRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalPutAclRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Inserts a secret under the provided scope with the given name. If a secret already
   * exists with the same name, this command overwrites the existing secret's value.
   * The server encrypts the secret using the secret scope's encryption settings before
   * storing it. You must have ``WRITE`` or ``MANAGE`` permission on the secret scope.
   *
   * The secret key must consist of alphanumeric characters, dashes, underscores,
   * and periods, and cannot exceed 128 characters. The maximum allowed secret
   * value size is 128 KB. The maximum number of secrets in a given scope is
   * 1000.
   *
   * Example request:
   *
   * .. code::
   *
   * {
   * "scope": "my-databricks-scope",
   * "key": "my-string-key",
   * "string_value": "foobar"
   * }
   *
   * The input fields "string_value" or "bytes_value"
   * specify the type of the secret, which will determine the value returned when
   * the secret value is requested. Exactly one must be specified.
   *
   * Throws ``RESOURCE_DOES_NOT_EXIST`` if no such secret scope exists.
   * Throws ``RESOURCE_LIMIT_EXCEEDED`` if maximum number of secrets in scope is exceeded.
   * Throws ``INVALID_PARAMETER_VALUE`` if the request parameters are invalid.
   * Throws ``PERMISSION_DENIED`` if the user does not have permission to make this API call.
   * Throws ``MALFORMED_REQUEST`` if request is incorrectly formatted or conflicting.
   * Throws ``BAD_REQUEST`` if request is made against Azure KeyVault backed scope.
   */
  async putSecret(
    req: PutSecretRequest,
    options?: CallOptions
  ): Promise<PutSecretRequest_Response> {
    const url = `${this.host}/api/2.0/secrets/put`;
    const body = marshalRequest(req, marshalPutSecretRequestSchema);
    let resp: PutSecretRequest_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalPutSecretRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
