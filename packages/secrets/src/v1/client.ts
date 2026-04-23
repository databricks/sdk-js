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
  AclItem,
  CreateScope,
  CreateScope_Response,
  DeleteAcl,
  DeleteAcl_Response,
  DeleteScope,
  DeleteScope_Response,
  DeleteSecret,
  DeleteSecret_Response,
  GetAcl,
  GetSecret,
  GetSecret_Response,
  ListAcls,
  ListAcls_Response,
  ListScopes,
  ListScopes_Response,
  ListSecrets,
  ListSecrets_Response,
  PutAcl,
  PutAcl_Response,
  PutSecret,
  PutSecret_Response,
} from './model';
import {
  marshalCreateScopeSchema,
  marshalDeleteAclSchema,
  marshalDeleteScopeSchema,
  marshalDeleteSecretSchema,
  marshalPutAclSchema,
  marshalPutSecretSchema,
  unmarshalAclItemSchema,
  unmarshalCreateScope_ResponseSchema,
  unmarshalDeleteAcl_ResponseSchema,
  unmarshalDeleteScope_ResponseSchema,
  unmarshalDeleteSecret_ResponseSchema,
  unmarshalGetSecret_ResponseSchema,
  unmarshalListAcls_ResponseSchema,
  unmarshalListScopes_ResponseSchema,
  unmarshalListSecrets_ResponseSchema,
  unmarshalPutAcl_ResponseSchema,
  unmarshalPutSecret_ResponseSchema,
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
    signal: AbortSignal | undefined,
    req: CreateScope,
    options?: Options
  ): Promise<CreateScope_Response> {
    const url = `${this.host}/api/2.0/secrets/scopes/create`;
    const body = marshalRequest(req, marshalCreateScopeSchema);
    let resp: CreateScope_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCreateScope_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: DeleteAcl,
    options?: Options
  ): Promise<DeleteAcl_Response> {
    const url = `${this.host}/api/2.0/secrets/acls/delete`;
    const body = marshalRequest(req, marshalDeleteAclSchema);
    let resp: DeleteAcl_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteAcl_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: DeleteScope,
    options?: Options
  ): Promise<DeleteScope_Response> {
    const url = `${this.host}/api/2.0/secrets/scopes/delete`;
    const body = marshalRequest(req, marshalDeleteScopeSchema);
    let resp: DeleteScope_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteScope_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: DeleteSecret,
    options?: Options
  ): Promise<DeleteSecret_Response> {
    const url = `${this.host}/api/2.0/secrets/delete`;
    const body = marshalRequest(req, marshalDeleteSecretSchema);
    let resp: DeleteSecret_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteSecret_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
  async getAcl(
    signal: AbortSignal | undefined,
    req: GetAcl,
    options?: Options
  ): Promise<AclItem> {
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAclItemSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: GetSecret,
    options?: Options
  ): Promise<GetSecret_Response> {
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
    let resp: GetSecret_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalGetSecret_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: ListAcls,
    options?: Options
  ): Promise<ListAcls_Response> {
    const url = `${this.host}/api/2.0/secrets/acls/list`;
    const params = new URLSearchParams();
    if (req.scope !== undefined) {
      params.append('scope', req.scope);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAcls_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListAcls_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    _req: ListScopes,
    options?: Options
  ): Promise<ListScopes_Response> {
    const url = `${this.host}/api/2.0/secrets/scopes/list`;
    let resp: ListScopes_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListScopes_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: ListSecrets,
    options?: Options
  ): Promise<ListSecrets_Response> {
    const url = `${this.host}/api/2.0/secrets/list`;
    const params = new URLSearchParams();
    if (req.scope !== undefined) {
      params.append('scope', req.scope);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSecrets_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListSecrets_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: PutAcl,
    options?: Options
  ): Promise<PutAcl_Response> {
    const url = `${this.host}/api/2.0/secrets/acls/put`;
    const body = marshalRequest(req, marshalPutAclSchema);
    let resp: PutAcl_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPutAcl_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: PutSecret,
    options?: Options
  ): Promise<PutSecret_Response> {
    const url = `${this.host}/api/2.0/secrets/put`;
    const body = marshalRequest(req, marshalPutSecretSchema);
    let resp: PutSecret_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPutSecret_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
