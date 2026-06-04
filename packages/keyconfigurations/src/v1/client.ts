// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {VERSION as AUTH_VERSION} from '@databricks/sdk-auth';
import {createDefault} from '@databricks/sdk-core/clientinfo';
import type {Logger} from '@databricks/sdk-core/logger';
import {NoOpLogger} from '@databricks/sdk-core/logger';
import {DEFAULT_DEBUG_TRUNCATE_BYTES} from '@databricks/sdk-core/logger/debug';
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
import {z} from 'zod';
import type {
  CreateCustomerManagedKeyRequest,
  CustomerManagedKey,
  DeleteCustomerManagedKeyRequest,
  GetCustomerManagedKeyRequest,
  ListCustomerManagedKeyRequest,
  ListCustomerManagedKeyResponse,
} from './model';
import {
  marshalCreateCustomerManagedKeyRequestSchema,
  unmarshalCustomerManagedKeySchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class KeyConfigurationsClient {
  private readonly host: string;
  // Fallback for endpoints whose path contains {account_id}. If the request
  // already carries an accountId, that value wins.
  private readonly accountId: string | undefined;
  private readonly httpClient: HttpClient;
  private readonly logger: Logger;
  // Resolved debug-logging toggles passed into each HTTP call.
  private readonly debugHeaders: boolean;
  private readonly debugTruncateBytes: number;
  // User-Agent header value. Composed once at construction from
  // createDefault() merged with this package's identity and the active
  // credential's name.
  private readonly userAgent: string;

  constructor(options: ClientOptions) {
    if (options.host === undefined) {
      throw new Error('Host is required.');
    }
    this.host = options.host.replace(/\/$/, '');
    this.accountId = options.accountId;
    this.logger = options.logger ?? new NoOpLogger();
    this.debugHeaders = options.debugHeaders ?? false;
    this.debugTruncateBytes =
      options.debugTruncateBytes ?? DEFAULT_DEBUG_TRUNCATE_BYTES;
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /**
   * Creates a customer-managed key configuration object for an account, specified by ID.
   * This operation uploads a reference to a customer-managed key to <Databricks>.
   * If the key is assigned as a workspace's customer-managed key for managed services,
   * <Databricks> uses the key to encrypt the workspaces notebooks and secrets in the control plane,
   * in addition to Databricks SQL queries and query history. If it is specified as a
   * workspace's customer-managed key for workspace storage, the key encrypts the
   * workspace's root S3 bucket (which contains the workspace's root DBFS and system data)
   * and, optionally, cluster EBS volume data.
   *
   * **Important**: Customer-managed keys are supported only for some deployment types,
   * subscription types, and AWS regions that currently support creation of <Databricks> workspaces.
   *
   * This operation is available only if your account is on the E2 version of the
   * platform or on a select custom plan that allows multiple workspaces per account.
   *
   * **GCP only**: To create a customer-managed key on GCP, you must include the
   * `X-Databricks-GCP-SA-Access-Token` HTTP header in your request. This header must contain
   * a Google Cloud OAuth access token with the `cloud-platform` scope. The Google identity
   * associated with the token must also have the `setIamPermissions` and `getIamPermissions`
   * IAM permissions on the key resource. For details on obtaining this token, see
   * [Authenticate with Google ID tokens](https://docs.databricks.com/gcp/en/dev-tools/auth/authentication-google-id.html).
   */
  async createCustomerManagedKeyPublic(
    req: CreateCustomerManagedKeyRequest,
    options?: CallOptions
  ): Promise<CustomerManagedKey> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/customer-managed-keys`;
    const body = marshalRequest(
      req,
      marshalCreateCustomerManagedKeyRequestSchema
    );
    let resp: CustomerManagedKey | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalCustomerManagedKeySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Deletes a customer-managed key configuration object for an account. You cannot delete a configuration that is associated with a running workspace. */
  async deleteCustomerManagedKeyPublic(
    req: DeleteCustomerManagedKeyRequest,
    options?: CallOptions
  ): Promise<CustomerManagedKey> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/customer-managed-keys/${req.customerManagedKeyId ?? ''}`;
    let resp: CustomerManagedKey | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalCustomerManagedKeySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a customer-managed key configuration object for an account, specified by ID.
   * This operation uploads a reference to a customer-managed key to <Databricks>.
   * If assigned as a workspace's customer-managed key for managed services, <Databricks> uses the
   * key to encrypt the workspaces notebooks and secrets in the control plane, in addition to
   * Databricks SQL queries and query history. If it is specified as a workspace's
   * customer-managed key for storage, the key encrypts the workspace's root S3 bucket
   * (which contains the workspace's root DBFS and system data) and, optionally, cluster EBS volume data.
   *
   * **Important**: Customer-managed keys are supported only for some deployment types,
   * subscription types, and AWS regions.
   *
   * This operation is available only if your account is on the E2 version of the platform.",
   */
  async getCustomerManagedKeyPublic(
    req: GetCustomerManagedKeyRequest,
    options?: CallOptions
  ): Promise<CustomerManagedKey> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/customer-managed-keys/${req.customerManagedKeyId ?? ''}`;
    let resp: CustomerManagedKey | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = parseResponse(respBody, unmarshalCustomerManagedKeySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Lists <Databricks> customer-managed key configurations for an account. */
  async listCustomerManagedKeyPublic(
    req: ListCustomerManagedKeyRequest,
    options?: CallOptions
  ): Promise<ListCustomerManagedKeyResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/customer-managed-keys`;
    let resp: ListCustomerManagedKeyResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
        debugHeaders: this.debugHeaders,
        debugTruncateBytes: this.debugTruncateBytes,
      });
      resp = {
        customerManagedKeys: parseResponse(
          respBody,
          z.array(z.lazy(() => unmarshalCustomerManagedKeySchema))
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
