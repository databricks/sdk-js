// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import type {CallOptions} from '@databricks/sdk-options/call';
import type {ClientOptions} from '@databricks/sdk-options/client';
import type {ResolvedClientConfig} from './transport';
import {resolveClientConfig} from './transport';
import {
  buildHttpRequest,
  executeCall,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
import pkgJson from '../../package.json' with {type: 'json'};
import {z} from 'zod';
import type {
  AccountsCreateStorageCredentialRequest,
  AccountsCreateStorageCredentialResponse,
  AccountsDeleteStorageCredentialRequest,
  AccountsDeleteStorageCredentialResponse,
  AccountsGetStorageCredentialRequest,
  AccountsGetStorageCredentialResponse,
  AccountsListStorageCredentialsRequest,
  AccountsListStorageCredentialsResponse,
  AccountsUpdateStorageCredentialRequest,
  AccountsUpdateStorageCredentialResponse,
  CreateCredentialRequest,
  CreateCredentialsRequest,
  CreateStorageCredentialRequest,
  CredentialInfo,
  Credentials,
  DeleteCredentialRequest,
  DeleteCredentialResponse,
  DeleteCredentialsRequest,
  DeleteStorageCredentialRequest,
  DeleteStorageCredentialResponse,
  GenerateTemporaryPathCredentialRequest,
  GenerateTemporaryPathCredentialResponse,
  GenerateTemporaryServiceCredentialRequest,
  GenerateTemporaryTableCredentialRequest,
  GenerateTemporaryTableCredentialResponse,
  GenerateTemporaryVolumeCredentialRequest,
  GenerateTemporaryVolumeCredentialResponse,
  GetCredentialRequest,
  GetCredentialsRequest,
  GetStorageCredentialRequest,
  ListCredentialsPublicRequest,
  ListCredentialsRequest,
  ListCredentialsRequest_Response,
  ListCredentialsResponse,
  ListStorageCredentialsRequest,
  ListStorageCredentialsResponse,
  StorageCredentialInfo,
  TemporaryCredentials,
  UpdateCredentialRequest,
  UpdateStorageCredentialRequest,
  ValidateCredentialRequest,
  ValidateCredentialResponse,
  ValidateStorageCredentialRequest,
  ValidateStorageCredentialResponse,
} from './model';
import {
  marshalAccountsCreateStorageCredentialRequestSchema,
  marshalAccountsUpdateStorageCredentialRequestSchema,
  marshalCreateCredentialRequestSchema,
  marshalCreateCredentialsRequestSchema,
  marshalCreateStorageCredentialRequestSchema,
  marshalGenerateTemporaryPathCredentialRequestSchema,
  marshalGenerateTemporaryServiceCredentialRequestSchema,
  marshalGenerateTemporaryTableCredentialRequestSchema,
  marshalGenerateTemporaryVolumeCredentialRequestSchema,
  marshalUpdateCredentialRequestSchema,
  marshalUpdateStorageCredentialRequestSchema,
  marshalValidateCredentialRequestSchema,
  marshalValidateStorageCredentialRequestSchema,
  unmarshalAccountsCreateStorageCredentialResponseSchema,
  unmarshalAccountsDeleteStorageCredentialResponseSchema,
  unmarshalAccountsGetStorageCredentialResponseSchema,
  unmarshalAccountsListStorageCredentialsResponseSchema,
  unmarshalAccountsUpdateStorageCredentialResponseSchema,
  unmarshalCredentialsSchema,
  unmarshalDeleteCredentialResponseSchema,
  unmarshalDeleteStorageCredentialResponseSchema,
  unmarshalGenerateTemporaryPathCredentialResponseSchema,
  unmarshalGenerateTemporaryTableCredentialResponseSchema,
  unmarshalGenerateTemporaryVolumeCredentialResponseSchema,
  unmarshalListCredentialsRequest_ResponseSchema,
  unmarshalListStorageCredentialsResponseSchema,
  unmarshalStorageCredentialInfoSchema,
  unmarshalTemporaryCredentialsSchema,
  unmarshalValidateCredentialResponseSchema,
  unmarshalValidateStorageCredentialResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class CredentialsClient {
  private readonly options: ClientOptions;
  private readonly logger: Logger;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;
  // Memoized configuration. The profile is resolved once, lazily, on the first
  // request, then reused; host, workspaceId/accountId, and credentials are
  // filled from it when not set explicitly on the options.
  private config: Promise<ResolvedClientConfig> | undefined;

  constructor(options: ClientOptions) {
    this.options = options;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
  }

  private resolveConfig(): Promise<ResolvedClientConfig> {
    this.config ??= resolveClientConfig(this.options);
    return this.config;
  }

  /**
   * Creates a new storage credential. The request object is specific to the cloud:
   * - **AwsIamRole** for AWS credentials
   * - **AzureServicePrincipal** for Azure credentials
   * - **GcpServiceAccountKey** for GCP credentials
   *
   * The caller must be a metastore admin and have the `CREATE_STORAGE_CREDENTIAL` privilege on the metastore.
   */
  async createAccountsStorageCredential(
    req: AccountsCreateStorageCredentialRequest,
    options?: CallOptions
  ): Promise<AccountsCreateStorageCredentialResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/metastores/${req.metastoreId ?? ''}/storage-credentials`;
    const body = marshalRequest(
      req,
      marshalAccountsCreateStorageCredentialRequestSchema
    );
    let resp: AccountsCreateStorageCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalAccountsCreateStorageCredentialResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a storage credential from the metastore. The caller must be an owner of the storage credential. */
  async deleteAccountsStorageCredential(
    req: AccountsDeleteStorageCredentialRequest,
    options?: CallOptions
  ): Promise<AccountsDeleteStorageCredentialResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/metastores/${req.metastoreId ?? ''}/storage-credentials/${req.nameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: AccountsDeleteStorageCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalAccountsDeleteStorageCredentialResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a storage credential from the metastore. The caller must be a metastore admin, the owner of the
   * storage credential, or have a level of privilege on the storage credential.
   */
  async getAccountsStorageCredential(
    req: AccountsGetStorageCredentialRequest,
    options?: CallOptions
  ): Promise<AccountsGetStorageCredentialResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/metastores/${req.metastoreId ?? ''}/storage-credentials/${req.nameArg ?? ''}`;
    let resp: AccountsGetStorageCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalAccountsGetStorageCredentialResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets a list of all storage credentials that have been assigned to given metastore. */
  async listAccountsStorageCredentials(
    req: AccountsListStorageCredentialsRequest,
    options?: CallOptions
  ): Promise<AccountsListStorageCredentialsResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/metastores/${req.metastoreId ?? ''}/storage-credentials`;
    let resp: AccountsListStorageCredentialsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalAccountsListStorageCredentialsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a storage credential on the metastore. The caller must be the owner of the storage credential.
   * If the caller is a metastore admin, only the **owner** credential can be changed.
   */
  async updateAccountsStorageCredential(
    req: AccountsUpdateStorageCredentialRequest,
    options?: CallOptions
  ): Promise<AccountsUpdateStorageCredentialResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/metastores/${req.metastoreId ?? ''}/storage-credentials/${req.nameArg ?? ''}`;
    const body = marshalRequest(
      req,
      marshalAccountsUpdateStorageCredentialRequestSchema
    );
    let resp: AccountsUpdateStorageCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PUT', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalAccountsUpdateStorageCredentialResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new credential. The type of credential to be created is determined by the **purpose** field,
   * which should be either **SERVICE** or **STORAGE**.
   *
   * The caller must be a metastore admin or have the metastore privilege **CREATE_STORAGE_CREDENTIAL** for storage
   * credentials, or **CREATE_SERVICE_CREDENTIAL** for service credentials.
   */
  async createCredential(
    req: CreateCredentialRequest,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/credentials`;
    const body = marshalRequest(req, marshalCreateCredentialRequestSchema);
    let resp: StorageCredentialInfo | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new storage credential.
   *
   * The caller must be a metastore admin or have the **CREATE_STORAGE_CREDENTIAL** privilege on the metastore.
   */
  async createStorageCredential(
    req: CreateStorageCredentialRequest,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/storage-credentials`;
    const body = marshalRequest(
      req,
      marshalCreateStorageCredentialRequestSchema
    );
    let resp: StorageCredentialInfo | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a service or storage credential from the metastore. The caller must be an owner of the credential. */
  async deleteCredential(
    req: DeleteCredentialRequest,
    options?: CallOptions
  ): Promise<DeleteCredentialResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/credentials/${req.nameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteCredentialResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a storage credential from the metastore. The caller must be an owner of the storage credential. */
  async deleteStorageCredential(
    req: DeleteStorageCredentialRequest,
    options?: CallOptions
  ): Promise<DeleteStorageCredentialResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/storage-credentials/${req.nameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteStorageCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteStorageCredentialResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get a short-lived credential for directly accessing cloud storage locations registered in <Databricks>.
   * The Generate Temporary Path Credentials API is only supported for external storage paths, specifically external
   * locations and external tables. Managed tables are not supported by this API.
   * The metastore must have **external_access_enabled** flag set to true (default false).
   * The caller must have the **EXTERNAL_USE_LOCATION** privilege on the external location; this privilege can only be granted
   * by external location owners.
   * For requests on existing external tables, the caller must also have the **EXTERNAL_USE_SCHEMA** privilege on the parent schema;
   * this privilege can only be granted by catalog owners.
   */
  async generateTemporaryPathCredential(
    req: GenerateTemporaryPathCredentialRequest,
    options?: CallOptions
  ): Promise<GenerateTemporaryPathCredentialResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/unity-catalog/temporary-path-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryPathCredentialRequestSchema
    );
    let resp: GenerateTemporaryPathCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenerateTemporaryPathCredentialResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Returns a set of temporary credentials generated using the specified service credential.
   * The caller must be a metastore admin or have the metastore privilege **ACCESS** on the service credential.
   */
  async generateTemporaryServiceCredential(
    req: GenerateTemporaryServiceCredentialRequest,
    options?: CallOptions
  ): Promise<TemporaryCredentials> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/temporary-service-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryServiceCredentialRequestSchema
    );
    let resp: TemporaryCredentials | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTemporaryCredentialsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get a short-lived credential for directly accessing the table data on cloud storage.
   * The metastore must have **external_access_enabled** flag set to true (default false).
   * The caller must have the **EXTERNAL_USE_SCHEMA** privilege on the parent schema and this privilege can only be granted
   * by catalog owners.
   */
  async generateTemporaryTableCredential(
    req: GenerateTemporaryTableCredentialRequest,
    options?: CallOptions
  ): Promise<GenerateTemporaryTableCredentialResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/unity-catalog/temporary-table-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryTableCredentialRequestSchema
    );
    let resp: GenerateTemporaryTableCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenerateTemporaryTableCredentialResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get a short-lived credential for directly accessing the volume data on cloud storage.
   * The metastore must have **external_access_enabled** flag set to true (default false).
   * The caller must have the **EXTERNAL_USE_SCHEMA** privilege on the parent schema and this privilege can only be granted
   * by catalog owners.
   */
  async generateTemporaryVolumeCredential(
    req: GenerateTemporaryVolumeCredentialRequest,
    options?: CallOptions
  ): Promise<GenerateTemporaryVolumeCredentialResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/unity-catalog/temporary-volume-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryVolumeCredentialRequestSchema
    );
    let resp: GenerateTemporaryVolumeCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalGenerateTemporaryVolumeCredentialResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a service or storage credential from the metastore.
   * The caller must be a metastore admin, the owner of the credential, or have any permission on the credential.
   */
  async getCredential(
    req: GetCredentialRequest,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/credentials/${req.nameArg ?? ''}`;
    let resp: StorageCredentialInfo | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a storage credential from the metastore.
   * The caller must be a metastore admin, the owner of the storage credential, or have some permission on the storage credential.
   */
  async getStorageCredential(
    req: GetStorageCredentialRequest,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/storage-credentials/${req.nameArg ?? ''}`;
    let resp: StorageCredentialInfo | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of credentials (as __CredentialInfo__ objects).
   *
   * The array is limited to only the credentials that the caller has permission to access.
   * If the caller is a metastore admin, retrieval of credentials is unrestricted.
   * There is no guarantee of a specific ordering of the elements in the array.
   *
   * PAGINATION BEHAVIOR: The API is by default paginated, a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listCredentials(
    req: ListCredentialsRequest,
    options?: CallOptions
  ): Promise<ListCredentialsRequest_Response> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/credentials`;
    const params = new URLSearchParams();
    if (req.includeUnbound !== undefined) {
      params.append('include_unbound', String(req.includeUnbound));
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListCredentialsRequest_Response | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListCredentialsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listCredentialsIter(
    req: ListCredentialsRequest,
    options?: CallOptions
  ): AsyncGenerator<CredentialInfo> {
    const pageReq: ListCredentialsRequest = {...req};
    for (;;) {
      const resp = await this.listCredentials(pageReq, options);
      for (const item of resp.credentials ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Gets an array of storage credentials (as __StorageCredentialInfo__ objects).
   * The array is limited to only those storage credentials the caller has permission to access.
   * If the caller is a metastore admin, retrieval of credentials is unrestricted.
   * There is no guarantee of a specific ordering of the elements in the array.
   *
   * NOTE: we recommend using max_results=0 to use the paginated version of this API. Unpaginated calls will be deprecated soon.
   *
   * PAGINATION BEHAVIOR: When using pagination (max_results >= 0), a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listStorageCredentials(
    req: ListStorageCredentialsRequest,
    options?: CallOptions
  ): Promise<ListStorageCredentialsResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/storage-credentials`;
    const params = new URLSearchParams();
    if (req.includeUnbound !== undefined) {
      params.append('include_unbound', String(req.includeUnbound));
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListStorageCredentialsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListStorageCredentialsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listStorageCredentialsIter(
    req: ListStorageCredentialsRequest,
    options?: CallOptions
  ): AsyncGenerator<StorageCredentialInfo> {
    const pageReq: ListStorageCredentialsRequest = {...req};
    for (;;) {
      const resp = await this.listStorageCredentials(pageReq, options);
      for (const item of resp.storageCredentials ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Updates a service or storage credential on the metastore.
   *
   * The caller must be the owner of the credential or a metastore admin or have the `MANAGE` permission. If the caller is
   * a metastore admin, only the __owner__ field can be changed.
   */
  async updateCredential(
    req: UpdateCredentialRequest,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/credentials/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateCredentialRequestSchema);
    let resp: StorageCredentialInfo | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Updates a storage credential on the metastore.
   *
   * The caller must be the owner of the storage credential or a metastore admin.
   * If the caller is a metastore admin, only the **owner** field can be changed.
   */
  async updateStorageCredential(
    req: UpdateStorageCredentialRequest,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/storage-credentials/${req.nameArg ?? ''}`;
    const body = marshalRequest(
      req,
      marshalUpdateStorageCredentialRequestSchema
    );
    let resp: StorageCredentialInfo | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Validates a credential.
   *
   * For service credentials (purpose is **SERVICE**), either the __credential_name__ or the cloud-specific credential
   * must be provided.
   *
   * For storage credentials (purpose is **STORAGE**), at least one of __external_location_name__ and __url__ need to be
   * provided. If only one of them is provided, it will be used for validation. And if both are provided, the __url__
   * will be used for validation, and __external_location_name__ will be ignored when checking overlapping urls. Either
   * the __credential_name__ or the cloud-specific credential must be provided.
   *
   * The caller must be a metastore admin or the credential owner or have the required permission on the metastore and
   * the credential (e.g., **CREATE_EXTERNAL_LOCATION** when purpose is **STORAGE**).
   */
  async validateCredential(
    req: ValidateCredentialRequest,
    options?: CallOptions
  ): Promise<ValidateCredentialResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/validate-credentials`;
    const body = marshalRequest(req, marshalValidateCredentialRequestSchema);
    let resp: ValidateCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalValidateCredentialResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Validates a storage credential.
   * At least one of __external_location_name__ and __url__ need to be provided. If only one of them is
   * provided, it will be used for validation. And if both are provided, the __url__ will be used for
   * validation, and __external_location_name__ will be ignored when checking overlapping urls.
   *
   * Either the __storage_credential_name__ or the cloud-specific credential must be provided.
   *
   * The caller must be a metastore admin or the storage credential owner or
   * have the **CREATE_EXTERNAL_LOCATION** privilege on the metastore and the storage credential.
   */
  async validateStorageCredential(
    req: ValidateStorageCredentialRequest,
    options?: CallOptions
  ): Promise<ValidateStorageCredentialResponse> {
    const {host, workspaceId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.1/unity-catalog/validate-storage-credentials`;
    const body = marshalRequest(
      req,
      marshalValidateStorageCredentialRequestSchema
    );
    let resp: ValidateStorageCredentialResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (workspaceId !== undefined) {
        headers.set('X-Databricks-Workspace-Id', workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalValidateStorageCredentialResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a <Databricks> credential configuration that represents cloud cross-account credentials for a specified account. <Databricks> uses this to set up network infrastructure properly to host <Databricks> clusters. For your AWS IAM role, you need to trust the External ID (the Databricks Account API account ID)  in the returned credential object, and configure the required access policy.
   *
   * Save the response's `credentials_id` field, which is the ID for your new credential configuration object.
   *
   * For information about how to create a new workspace with this API, see [Create a new workspace using the Account API](http://docs.databricks.com/administration-guide/account-api/new-workspace.html)
   */
  async createCredentialsPublic(
    req: CreateCredentialsRequest,
    options?: CallOptions
  ): Promise<Credentials> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/credentials`;
    const body = marshalRequest(req, marshalCreateCredentialsRequestSchema);
    let resp: Credentials | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCredentialsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a <Databricks> credential configuration object for an account, both specified by ID. You cannot delete a credential that is associated with any workspace. */
  async deleteCredentialsPublic(
    req: DeleteCredentialsRequest,
    options?: CallOptions
  ): Promise<Credentials> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/credentials/${req.credentialsId ?? ''}`;
    let resp: Credentials | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCredentialsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Gets a <Databricks> credential configuration object for an account, both specified by ID. */
  async getCredentialsPublic(
    req: GetCredentialsRequest,
    options?: CallOptions
  ): Promise<Credentials> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/credentials/${req.credentialsId ?? ''}`;
    let resp: Credentials | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalCredentialsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** List <Databricks> credential configuration objects for an account, specified by ID. */
  async listCredentialsPublic(
    req: ListCredentialsPublicRequest,
    options?: CallOptions
  ): Promise<ListCredentialsResponse> {
    const {host, accountId, httpClient} = await this.resolveConfig();
    const url = `${host}/api/2.0/accounts/${req.accountId ?? accountId ?? ''}/credentials`;
    let resp: ListCredentialsResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient,
        logger: this.logger,
      });
      resp = {
        credentials: parseResponse(
          respBody,
          z.array(z.lazy(() => unmarshalCredentialsSchema))
        ),
      };
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
