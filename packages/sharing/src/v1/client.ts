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
  CreateFederationPolicyRequest,
  CreateProviderRequest,
  CreateRecipientRequest,
  CreateShareRequest,
  DeleteFederationPolicyRequest,
  DeleteProviderRequest,
  DeleteProviderRequest_Response,
  DeleteRecipientRequest,
  DeleteRecipientRequest_Response,
  DeleteShareRequest,
  DeleteShareRequest_Response,
  FederationPolicy,
  GetActivationUrlInfoRequest,
  GetActivationUrlInfoRequest_Response,
  GetFederationPolicyRequest,
  GetProviderRequest,
  GetRecipientRequest,
  GetRecipientSharePermissionsRequest,
  GetRecipientSharePermissionsRequest_Response,
  GetSharePermissionsRequest,
  GetSharePermissionsRequest_Response,
  GetShareRequest,
  ListFederationPoliciesRequest,
  ListFederationPoliciesResponse,
  ListProviderShareAssetsRequest,
  ListProviderShareAssetsResponse,
  ListProviderSharesRequest,
  ListProviderSharesRequest_Response,
  ListProvidersRequest,
  ListProvidersRequest_Response,
  ListRecipientsRequest,
  ListRecipientsRequest_Response,
  ListSharesRequest,
  ListSharesRequest_Response,
  ProviderInfo,
  ProviderShare,
  RecipientInfo,
  RetrieveToken,
  RetrieveToken_Response,
  RotateRecipientTokenRequest,
  ShareInfo,
  UpdateProviderRequest,
  UpdateRecipientRequest,
  UpdateSharePermissionsRequest,
  UpdateSharePermissionsRequest_Response,
  UpdateShareRequest,
} from './model';
import {
  marshalCreateProviderRequestSchema,
  marshalCreateRecipientRequestSchema,
  marshalCreateShareRequestSchema,
  marshalFederationPolicySchema,
  marshalRotateRecipientTokenRequestSchema,
  marshalUpdateProviderRequestSchema,
  marshalUpdateRecipientRequestSchema,
  marshalUpdateSharePermissionsRequestSchema,
  marshalUpdateShareRequestSchema,
  unmarshalDeleteProviderRequest_ResponseSchema,
  unmarshalDeleteRecipientRequest_ResponseSchema,
  unmarshalDeleteShareRequest_ResponseSchema,
  unmarshalFederationPolicySchema,
  unmarshalGetActivationUrlInfoRequest_ResponseSchema,
  unmarshalGetRecipientSharePermissionsRequest_ResponseSchema,
  unmarshalGetSharePermissionsRequest_ResponseSchema,
  unmarshalListFederationPoliciesResponseSchema,
  unmarshalListProviderShareAssetsResponseSchema,
  unmarshalListProviderSharesRequest_ResponseSchema,
  unmarshalListProvidersRequest_ResponseSchema,
  unmarshalListRecipientsRequest_ResponseSchema,
  unmarshalListSharesRequest_ResponseSchema,
  unmarshalProviderInfoSchema,
  unmarshalRecipientInfoSchema,
  unmarshalRetrieveToken_ResponseSchema,
  unmarshalShareInfoSchema,
  unmarshalUpdateSharePermissionsRequest_ResponseSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class SharingClient {
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
   * Create a federation policy for an OIDC_FEDERATION recipient for sharing data from <Databricks> to non-<Databricks> recipients.
   * The caller must be the owner of the recipient.
   * When sharing data from <Databricks> to non-<Databricks> clients,
   * you can define a federation policy to authenticate non-<Databricks> recipients.
   * The federation policy validates OIDC claims in federated tokens and is defined at the recipient level.
   * This enables secretless sharing clients to authenticate using OIDC tokens.
   *
   * Supported scenarios for federation policies:
   * 1. **User-to-Machine (U2M) flow** (e.g., PowerBI): A user accesses a resource using their own identity.
   * 2. **Machine-to-Machine (M2M) flow** (e.g., OAuth App): An OAuth App accesses a resource using its own identity,
   * typically for tasks like running nightly jobs.
   *
   * For an overview, refer to:
   * - Blog post: Overview of feature: https://www.databricks.com/blog/announcing-oidc-token-federation-enhanced-delta-sharing-security
   *
   * For detailed configuration guides based on your use case:
   * - Creating a Federation Policy as a provider: https://docs.databricks.com/en/delta-sharing/create-recipient-oidc-fed
   * - Configuration and usage for Machine-to-Machine (M2M) applications (e.g., Python Delta Sharing Client): https://docs.databricks.com/aws/en/delta-sharing/sharing-over-oidc-m2m
   * - Configuration and usage for User-to-Machine (U2M) applications (e.g., PowerBI): https://docs.databricks.com/aws/en/delta-sharing/sharing-over-oidc-u2m
   */
  async createFederationPolicy(
    req: CreateFederationPolicyRequest,
    options?: CallOptions
  ): Promise<FederationPolicy> {
    const url = `${this.host}/api/2.0/data-sharing/recipients/${req.recipientName ?? ''}/federation-policies`;
    const body = marshalRequest(req.policy, marshalFederationPolicySchema);
    let resp: FederationPolicy | undefined;
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
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new authentication provider minimally based on a name and authentication type.
   * The caller must be an admin on the metastore.
   */
  async createProvider(
    req: CreateProviderRequest,
    options?: CallOptions
  ): Promise<ProviderInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/providers`;
    const body = marshalRequest(req, marshalCreateProviderRequestSchema);
    let resp: ProviderInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalProviderInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new recipient with the delta sharing authentication type in the metastore.
   * The caller must be a metastore admin or have the **CREATE_RECIPIENT** privilege on the metastore.
   */
  async createRecipient(
    req: CreateRecipientRequest,
    options?: CallOptions
  ): Promise<RecipientInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/recipients`;
    const body = marshalRequest(req, marshalCreateRecipientRequestSchema);
    let resp: RecipientInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalRecipientInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Creates a new share for data objects. Data objects can be added after creation with **update**.
   * The caller must be a metastore admin or have the **CREATE_SHARE** privilege on the metastore.
   */
  async createShare(
    req: CreateShareRequest,
    options?: CallOptions
  ): Promise<ShareInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/shares`;
    const body = marshalRequest(req, marshalCreateShareRequestSchema);
    let resp: ShareInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalShareInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes an existing federation policy for an OIDC_FEDERATION recipient.
   * The caller must be the owner of the recipient.
   */
  async deleteFederationPolicy(
    req: DeleteFederationPolicyRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/data-sharing/recipients/${req.recipientName ?? ''}/federation-policies/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await executeCall(call, options);
  }

  /** Deletes an authentication provider, if the caller is a metastore admin or is the owner of the provider. */
  async deleteProvider(
    req: DeleteProviderRequest,
    options?: CallOptions
  ): Promise<DeleteProviderRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/providers/${req.nameArg ?? ''}`;
    let resp: DeleteProviderRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteProviderRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the specified recipient from the metastore. The caller must be the owner of the recipient. */
  async deleteRecipient(
    req: DeleteRecipientRequest,
    options?: CallOptions
  ): Promise<DeleteRecipientRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/recipients/${req.name ?? ''}`;
    let resp: DeleteRecipientRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteRecipientRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes a data object share from the metastore. The caller must be an owner of the share. */
  async deleteShare(
    req: DeleteShareRequest,
    options?: CallOptions
  ): Promise<DeleteShareRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/shares/${req.name ?? ''}`;
    let resp: DeleteShareRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('DELETE', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDeleteShareRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets an activation URL for a share. */
  async getActivationUrlInfo(
    req: GetActivationUrlInfoRequest,
    options?: CallOptions
  ): Promise<GetActivationUrlInfoRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/public/data_sharing_activation_info/${req.activationUrl ?? ''}`;
    let resp: GetActivationUrlInfoRequest_Response | undefined;
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
      resp = parseResponse(
        respBody,
        unmarshalGetActivationUrlInfoRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Reads an existing federation policy for an OIDC_FEDERATION recipient for sharing data from <Databricks> to non-<Databricks> recipients.
   * The caller must have read access to the recipient.
   */
  async getFederationPolicy(
    req: GetFederationPolicyRequest,
    options?: CallOptions
  ): Promise<FederationPolicy> {
    const url = `${this.host}/api/2.0/data-sharing/recipients/${req.recipientName ?? ''}/federation-policies/${req.name ?? ''}`;
    let resp: FederationPolicy | undefined;
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
      resp = parseResponse(respBody, unmarshalFederationPolicySchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a specific authentication provider.
   * The caller must supply the name of the provider, and must either be a metastore admin or the owner of the provider.
   */
  async getProvider(
    req: GetProviderRequest,
    options?: CallOptions
  ): Promise<ProviderInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/providers/${req.nameArg ?? ''}`;
    let resp: ProviderInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalProviderInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a share recipient from the metastore. The caller must be one of:
   * * A user with **USE_RECIPIENT** privilege on the metastore
   * * The owner of the share recipient
   * * A metastore admin
   */
  async getRecipient(
    req: GetRecipientRequest,
    options?: CallOptions
  ): Promise<RecipientInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/recipients/${req.name ?? ''}`;
    let resp: RecipientInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalRecipientInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the share permissions for the specified Recipient. The caller must have the **USE_RECIPIENT** privilege on the metastore or be the owner of the Recipient. */
  async getRecipientSharePermissions(
    req: GetRecipientSharePermissionsRequest,
    options?: CallOptions
  ): Promise<GetRecipientSharePermissionsRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/recipients/${req.name ?? ''}/share-permissions`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetRecipientSharePermissionsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalGetRecipientSharePermissionsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets a data object share from the metastore. The caller must have the USE_SHARE privilege on the metastore or be the owner of the share. */
  async getShare(
    req: GetShareRequest,
    options?: CallOptions
  ): Promise<ShareInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/shares/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeSharedData !== undefined) {
      params.append('include_shared_data', String(req.includeSharedData));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ShareInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(respBody, unmarshalShareInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets the permissions for a data share from the metastore.
   * The caller must have the USE_SHARE privilege on the metastore or be the owner of the share.
   */
  async getSharePermissions(
    req: GetSharePermissionsRequest,
    options?: CallOptions
  ): Promise<GetSharePermissionsRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/shares/${req.name ?? ''}/permissions`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: GetSharePermissionsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalGetSharePermissionsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Lists federation policies for an OIDC_FEDERATION recipient for sharing data from <Databricks> to non-<Databricks> recipients.
   * The caller must have read access to the recipient.
   */
  async listFederationPolicies(
    req: ListFederationPoliciesRequest,
    options?: CallOptions
  ): Promise<ListFederationPoliciesResponse> {
    const url = `${this.host}/api/2.0/data-sharing/recipients/${req.recipientName ?? ''}/federation-policies`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListFederationPoliciesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListFederationPoliciesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listFederationPoliciesIter(
    req: ListFederationPoliciesRequest,
    options?: CallOptions
  ): AsyncGenerator<FederationPolicy> {
    const pageReq: ListFederationPoliciesRequest = {...req};
    for (;;) {
      const resp = await this.listFederationPolicies(pageReq, options);
      for (const item of resp.policies ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Get arrays of assets associated with a specified provider's share.
   * The caller is the recipient of the share.
   */
  async listProviderShareAssets(
    req: ListProviderShareAssetsRequest,
    options?: CallOptions
  ): Promise<ListProviderShareAssetsResponse> {
    const url = `${this.host}/api/2.1/data-sharing/providers/${req.providerNameArg ?? ''}/shares/${req.shareNameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.tableMaxResults !== undefined) {
      params.append('table_max_results', String(req.tableMaxResults));
    }
    if (req.functionMaxResults !== undefined) {
      params.append('function_max_results', String(req.functionMaxResults));
    }
    if (req.volumeMaxResults !== undefined) {
      params.append('volume_max_results', String(req.volumeMaxResults));
    }
    if (req.notebookMaxResults !== undefined) {
      params.append('notebook_max_results', String(req.notebookMaxResults));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListProviderShareAssetsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListProviderShareAssetsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of a specified provider's shares within the metastore where:
   *
   * * the caller is a metastore admin, or
   * * the caller is the owner.
   */
  async listProviderShares(
    req: ListProviderSharesRequest,
    options?: CallOptions
  ): Promise<ListProviderSharesRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/providers/${req.providerNameArg ?? ''}/shares`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListProviderSharesRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListProviderSharesRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listProviderSharesIter(
    req: ListProviderSharesRequest,
    options?: CallOptions
  ): AsyncGenerator<ProviderShare> {
    const pageReq: ListProviderSharesRequest = {...req};
    for (;;) {
      const resp = await this.listProviderShares(pageReq, options);
      for (const item of resp.shares ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Gets an array of available authentication providers.
   * The caller must either be a metastore admin, have the **USE_PROVIDER** privilege on the providers,
   * or be the owner of the providers. Providers not owned by the caller and for which the caller does
   * not have the **USE_PROVIDER** privilege are not included in the response.
   * There is no guarantee of a specific ordering of the elements in the array.
   */
  async listProviders(
    req: ListProvidersRequest,
    options?: CallOptions
  ): Promise<ListProvidersRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/providers`;
    const params = new URLSearchParams();
    if (req.dataProviderGlobalMetastoreId !== undefined) {
      params.append(
        'data_provider_global_metastore_id',
        req.dataProviderGlobalMetastoreId
      );
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListProvidersRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListProvidersRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listProvidersIter(
    req: ListProvidersRequest,
    options?: CallOptions
  ): AsyncGenerator<ProviderInfo> {
    const pageReq: ListProvidersRequest = {...req};
    for (;;) {
      const resp = await this.listProviders(pageReq, options);
      for (const item of resp.providers ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Gets an array of all share recipients within the current metastore where:
   *
   * * the caller is a metastore admin, or
   * * the caller is the owner.
   * There is no guarantee of a specific ordering of the elements in the array.
   */
  async listRecipients(
    req: ListRecipientsRequest,
    options?: CallOptions
  ): Promise<ListRecipientsRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/recipients`;
    const params = new URLSearchParams();
    if (req.dataRecipientGlobalMetastoreId !== undefined) {
      params.append(
        'data_recipient_global_metastore_id',
        req.dataRecipientGlobalMetastoreId
      );
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListRecipientsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListRecipientsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listRecipientsIter(
    req: ListRecipientsRequest,
    options?: CallOptions
  ): AsyncGenerator<RecipientInfo> {
    const pageReq: ListRecipientsRequest = {...req};
    for (;;) {
      const resp = await this.listRecipients(pageReq, options);
      for (const item of resp.recipients ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Gets an array of data object shares from the metastore. If the caller has the USE_SHARE privilege on the metastore, all shares are returned. Otherwise, only shares owned by the caller are returned.
   * There is no guarantee of a specific ordering of the elements in the array.
   */
  async listShares(
    req: ListSharesRequest,
    options?: CallOptions
  ): Promise<ListSharesRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/shares`;
    const params = new URLSearchParams();
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListSharesRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(respBody, unmarshalListSharesRequest_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listSharesIter(
    req: ListSharesRequest,
    options?: CallOptions
  ): AsyncGenerator<ShareInfo> {
    const pageReq: ListSharesRequest = {...req};
    for (;;) {
      const resp = await this.listShares(pageReq, options);
      for (const item of resp.shares ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Retrieve access token with an activation url.
   * This is a public API without any authentication.
   */
  async retrieveAccessToken(
    req: RetrieveToken,
    options?: CallOptions
  ): Promise<RetrieveToken_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/public/data_sharing_activation/${req.activationUrl ?? ''}`;
    let resp: RetrieveToken_Response | undefined;
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
      resp = parseResponse(respBody, unmarshalRetrieveToken_ResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Refreshes the specified recipient's delta sharing authentication token with the provided token info.
   * The caller must be the owner of the recipient.
   */
  async rotateRecipientToken(
    req: RotateRecipientTokenRequest,
    options?: CallOptions
  ): Promise<RecipientInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/recipients/${req.name ?? ''}/rotate-token`;
    const body = marshalRequest(req, marshalRotateRecipientTokenRequestSchema);
    let resp: RecipientInfo | undefined;
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
      resp = parseResponse(respBody, unmarshalRecipientInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the information for an authentication provider, if the caller is a metastore admin or is the owner of the provider.
   * If the update changes the provider name, the caller must be both a metastore admin and the owner of the provider.
   */
  async updateProvider(
    req: UpdateProviderRequest,
    options?: CallOptions
  ): Promise<ProviderInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/providers/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateProviderRequestSchema);
    let resp: ProviderInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalProviderInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates an existing recipient in the metastore. The caller must be a metastore admin or the owner of the recipient.
   * If the recipient name will be updated, the user must be both a metastore admin and the owner of the recipient.
   */
  async updateRecipient(
    req: UpdateRecipientRequest,
    options?: CallOptions
  ): Promise<RecipientInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/recipients/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateRecipientRequestSchema);
    let resp: RecipientInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalRecipientInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the share with the changes and data objects in the request.
   * The caller must be the owner of the share or a metastore admin.
   *
   * When the caller is a metastore admin, only the __owner__ field can be updated.
   *
   * In the case the share name is changed, **updateShare** requires that the caller is the owner of the share
   * and has the CREATE_SHARE privilege.
   *
   * If there are notebook files in the share, the __storage_root__ field cannot be updated.
   *
   * For each table that is added through this method, the share owner must also have **SELECT** privilege on the table.
   * This privilege must be maintained indefinitely for recipients to be able to access the table.
   * Typically, you should use a group as the share owner.
   *
   * Table removals through **update** do not require additional privileges.
   */
  async updateShare(
    req: UpdateShareRequest,
    options?: CallOptions
  ): Promise<ShareInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/shares/${req.nameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateShareRequestSchema);
    let resp: ShareInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalShareInfoSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the permissions for a data share in the metastore.
   * The caller must have both the USE_SHARE and SET_SHARE_PERMISSION privileges on the metastore,
   * or be the owner of the share.
   *
   * For new recipient grants, the user must also be the owner of the recipients.
   * recipient revocations do not require additional privileges.
   */
  async updateSharePermissions(
    req: UpdateSharePermissionsRequest,
    options?: CallOptions
  ): Promise<UpdateSharePermissionsRequest_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/shares/${req.name ?? ''}/permissions`;
    const body = marshalRequest(
      req,
      marshalUpdateSharePermissionsRequestSchema
    );
    let resp: UpdateSharePermissionsRequest_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      if (this.workspaceId !== undefined) {
        headers.set('X-Databricks-Org-Id', this.workspaceId);
      }
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalUpdateSharePermissionsRequest_ResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
