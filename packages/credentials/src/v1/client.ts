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
  CreateCredential,
  CreateStorageCredential,
  CredentialInfo,
  DeleteCredential,
  DeleteCredential_Response,
  DeleteStorageCredential,
  DeleteStorageCredential_Response,
  GenerateTemporaryPathCredential,
  GenerateTemporaryPathCredential_Response,
  GenerateTemporaryServiceCredential,
  GenerateTemporaryTableCredential,
  GenerateTemporaryTableCredential_Response,
  GenerateTemporaryVolumeCredential,
  GenerateTemporaryVolumeCredential_Response,
  GetCredential,
  GetStorageCredential,
  ListCredentials,
  ListCredentials_Response,
  ListStorageCredentials,
  ListStorageCredentials_Response,
  StorageCredentialInfo,
  TemporaryCredentials,
  UpdateCredential,
  UpdateStorageCredential,
  ValidateCredential,
  ValidateCredential_Response,
  ValidateStorageCredential,
  ValidateStorageCredential_Response,
} from './model';
import {
  marshalCreateCredentialSchema,
  marshalCreateStorageCredentialSchema,
  marshalGenerateTemporaryPathCredentialSchema,
  marshalGenerateTemporaryServiceCredentialSchema,
  marshalGenerateTemporaryTableCredentialSchema,
  marshalGenerateTemporaryVolumeCredentialSchema,
  marshalUpdateCredentialSchema,
  marshalUpdateStorageCredentialSchema,
  marshalValidateCredentialSchema,
  marshalValidateStorageCredentialSchema,
  unmarshalDeleteCredential_ResponseSchema,
  unmarshalDeleteStorageCredential_ResponseSchema,
  unmarshalGenerateTemporaryPathCredential_ResponseSchema,
  unmarshalGenerateTemporaryTableCredential_ResponseSchema,
  unmarshalGenerateTemporaryVolumeCredential_ResponseSchema,
  unmarshalListCredentials_ResponseSchema,
  unmarshalListStorageCredentials_ResponseSchema,
  unmarshalStorageCredentialInfoSchema,
  unmarshalTemporaryCredentialsSchema,
  unmarshalValidateCredential_ResponseSchema,
  unmarshalValidateStorageCredential_ResponseSchema,
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
   * Creates a new credential. The type of credential to be created is determined by the **purpose** field,
   * which should be either **SERVICE** or **STORAGE**.
   *
   * The caller must be a metastore admin or have the metastore privilege **CREATE_STORAGE_CREDENTIAL** for storage
   * credentials, or **CREATE_SERVICE_CREDENTIAL** for service credentials.
   */
  async createCredential(
    req: CreateCredential,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/credentials`;
    const body = marshalRequest(req, marshalCreateCredentialSchema);
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new storage credential.
   *
   * The caller must be a metastore admin or have the **CREATE_STORAGE_CREDENTIAL** privilege on the metastore.
   */
  async createStorageCredential(
    req: CreateStorageCredential,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/storage-credentials`;
    const body = marshalRequest(req, marshalCreateStorageCredentialSchema);
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a service or storage credential from the metastore. The caller must be an owner of the credential. */
  async deleteCredential(
    req: DeleteCredential,
    options?: CallOptions
  ): Promise<DeleteCredential_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/credentials/${req.nameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteCredential_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a storage credential from the metastore. The caller must be an owner of the storage credential. */
  async deleteStorageCredential(
    req: DeleteStorageCredential,
    options?: CallOptions
  ): Promise<DeleteStorageCredential_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/storage-credentials/${req.nameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.force !== undefined) {
      params.append('force', String(req.force));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteStorageCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteStorageCredential_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: GenerateTemporaryPathCredential,
    options?: CallOptions
  ): Promise<GenerateTemporaryPathCredential_Response> {
    const url = `${this.host}/api/2.0/unity-catalog/temporary-path-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryPathCredentialSchema
    );
    let resp: GenerateTemporaryPathCredential_Response | undefined;
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
        unmarshalGenerateTemporaryPathCredential_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Returns a set of temporary credentials generated using the specified service credential.
   * The caller must be a metastore admin or have the metastore privilege **ACCESS** on the service credential.
   */
  async generateTemporaryServiceCredential(
    req: GenerateTemporaryServiceCredential,
    options?: CallOptions
  ): Promise<TemporaryCredentials> {
    const url = `${this.host}/api/2.1/unity-catalog/temporary-service-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryServiceCredentialSchema
    );
    let resp: TemporaryCredentials | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTemporaryCredentialsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: GenerateTemporaryTableCredential,
    options?: CallOptions
  ): Promise<GenerateTemporaryTableCredential_Response> {
    const url = `${this.host}/api/2.0/unity-catalog/temporary-table-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryTableCredentialSchema
    );
    let resp: GenerateTemporaryTableCredential_Response | undefined;
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
        unmarshalGenerateTemporaryTableCredential_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: GenerateTemporaryVolumeCredential,
    options?: CallOptions
  ): Promise<GenerateTemporaryVolumeCredential_Response> {
    const url = `${this.host}/api/2.0/unity-catalog/temporary-volume-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryVolumeCredentialSchema
    );
    let resp: GenerateTemporaryVolumeCredential_Response | undefined;
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
        unmarshalGenerateTemporaryVolumeCredential_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a service or storage credential from the metastore.
   * The caller must be a metastore admin, the owner of the credential, or have any permission on the credential.
   */
  async getCredential(
    req: GetCredential,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/credentials/${req.nameArg ?? ''}`;
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a storage credential from the metastore.
   * The caller must be a metastore admin, the owner of the storage credential, or have some permission on the storage credential.
   */
  async getStorageCredential(
    req: GetStorageCredential,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/storage-credentials/${req.nameArg ?? ''}`;
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: ListCredentials,
    options?: CallOptions
  ): Promise<ListCredentials_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/credentials`;
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
    let resp: ListCredentials_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListCredentials_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCredentialsIter(
    req: ListCredentials,
    options?: CallOptions
  ): AsyncGenerator<CredentialInfo> {
    const pageReq: ListCredentials = {...req};
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
    req: ListStorageCredentials,
    options?: CallOptions
  ): Promise<ListStorageCredentials_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/storage-credentials`;
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
    let resp: ListStorageCredentials_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalListStorageCredentials_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listStorageCredentialsIter(
    req: ListStorageCredentials,
    options?: CallOptions
  ): AsyncGenerator<StorageCredentialInfo> {
    const pageReq: ListStorageCredentials = {...req};
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
    req: UpdateCredential,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/credentials/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateCredentialSchema);
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: UpdateStorageCredential,
    options?: CallOptions
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/storage-credentials/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateStorageCredentialSchema);
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: ValidateCredential,
    options?: CallOptions
  ): Promise<ValidateCredential_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/validate-credentials`;
    const body = marshalRequest(req, marshalValidateCredentialSchema);
    let resp: ValidateCredential_Response | undefined;
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
        unmarshalValidateCredential_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    req: ValidateStorageCredential,
    options?: CallOptions
  ): Promise<ValidateStorageCredential_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/validate-storage-credentials`;
    const body = marshalRequest(req, marshalValidateStorageCredentialSchema);
    let resp: ValidateStorageCredential_Response | undefined;
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
        unmarshalValidateStorageCredential_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
