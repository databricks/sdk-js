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
   * Creates a new credential. The type of credential to be created is determined by the **purpose** field,
   * which should be either **SERVICE** or **STORAGE**.
   *
   * The caller must be a metastore admin or have the metastore privilege **CREATE_STORAGE_CREDENTIAL** for storage
   * credentials, or **CREATE_SERVICE_CREDENTIAL** for service credentials.
   */
  async createCredential(
    signal: AbortSignal | undefined,
    req: CreateCredential,
    options?: Options
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/credentials`;
    const body = marshalRequest(req, marshalCreateCredentialSchema);
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: CreateStorageCredential,
    options?: Options
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/storage-credentials`;
    const body = marshalRequest(req, marshalCreateStorageCredentialSchema);
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a service or storage credential from the metastore. The caller must be an owner of the credential. */
  async deleteCredential(
    signal: AbortSignal | undefined,
    req: DeleteCredential,
    options?: Options
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
      const httpReq = buildHttpRequest('DELETE', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDeleteCredential_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a storage credential from the metastore. The caller must be an owner of the storage credential. */
  async deleteStorageCredential(
    signal: AbortSignal | undefined,
    req: DeleteStorageCredential,
    options?: Options
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GenerateTemporaryPathCredential,
    options?: Options
  ): Promise<GenerateTemporaryPathCredential_Response> {
    const url = `${this.host}/api/2.0/unity-catalog/temporary-path-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryPathCredentialSchema
    );
    let resp: GenerateTemporaryPathCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GenerateTemporaryServiceCredential,
    options?: Options
  ): Promise<TemporaryCredentials> {
    const url = `${this.host}/api/2.1/unity-catalog/temporary-service-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryServiceCredentialSchema
    );
    let resp: TemporaryCredentials | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalTemporaryCredentialsSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GenerateTemporaryTableCredential,
    options?: Options
  ): Promise<GenerateTemporaryTableCredential_Response> {
    const url = `${this.host}/api/2.0/unity-catalog/temporary-table-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryTableCredentialSchema
    );
    let resp: GenerateTemporaryTableCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GenerateTemporaryVolumeCredential,
    options?: Options
  ): Promise<GenerateTemporaryVolumeCredential_Response> {
    const url = `${this.host}/api/2.0/unity-catalog/temporary-volume-credentials`;
    const body = marshalRequest(
      req,
      marshalGenerateTemporaryVolumeCredentialSchema
    );
    let resp: GenerateTemporaryVolumeCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetCredential,
    options?: Options
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/credentials/${req.nameArg ?? ''}`;
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetStorageCredential,
    options?: Options
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/storage-credentials/${req.nameArg ?? ''}`;
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ListCredentials,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListCredentials_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listCredentialsIter(
    signal: AbortSignal | undefined,
    req: ListCredentials,
    options?: Options
  ): AsyncGenerator<CredentialInfo> {
    const pageReq: ListCredentials = {...req};
    for (;;) {
      const resp = await this.listCredentials(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListStorageCredentials,
    options?: Options
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listStorageCredentialsIter(
    signal: AbortSignal | undefined,
    req: ListStorageCredentials,
    options?: Options
  ): AsyncGenerator<StorageCredentialInfo> {
    const pageReq: ListStorageCredentials = {...req};
    for (;;) {
      const resp = await this.listStorageCredentials(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: UpdateCredential,
    options?: Options
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/credentials/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateCredentialSchema);
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateStorageCredential,
    options?: Options
  ): Promise<StorageCredentialInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/storage-credentials/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateStorageCredentialSchema);
    let resp: StorageCredentialInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalStorageCredentialInfoSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ValidateCredential,
    options?: Options
  ): Promise<ValidateCredential_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/validate-credentials`;
    const body = marshalRequest(req, marshalValidateCredentialSchema);
    let resp: ValidateCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: ValidateStorageCredential,
    options?: Options
  ): Promise<ValidateStorageCredential_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/validate-storage-credentials`;
    const body = marshalRequest(req, marshalValidateStorageCredentialSchema);
    let resp: ValidateStorageCredential_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
