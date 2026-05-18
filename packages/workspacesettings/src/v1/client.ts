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
  AibiDashboardEmbeddingAccessPolicySetting,
  AibiDashboardEmbeddingApprovedDomainsSetting,
  AutomaticClusterUpdateSetting,
  ComplianceSecurityProfileSetting,
  DashboardEmailSubscriptions,
  DefaultNamespaceSetting,
  DefaultWarehouseId,
  DeleteAibiDashboardEmbeddingAccessPolicySettingRequest,
  DeleteAibiDashboardEmbeddingAccessPolicySettingResponse,
  DeleteAibiDashboardEmbeddingApprovedDomainsSettingRequest,
  DeleteAibiDashboardEmbeddingApprovedDomainsSettingResponse,
  DeleteDashboardEmailSubscriptionsRequest,
  DeleteDashboardEmailSubscriptionsResponse,
  DeleteDefaultNamespaceSettingRequest,
  DeleteDefaultNamespaceSettingResponse,
  DeleteDefaultWarehouseIdRequest,
  DeleteDefaultWarehouseIdResponse,
  DeleteDisableLegacyAccessRequest,
  DeleteDisableLegacyAccessResponse,
  DeleteDisableLegacyDbfsRequest,
  DeleteDisableLegacyDbfsResponse,
  DeleteLlmProxyPartnerPoweredWorkspaceRequest,
  DeleteLlmProxyPartnerPoweredWorkspaceResponse,
  DeleteRestrictWorkspaceAdminsSettingRequest,
  DeleteRestrictWorkspaceAdminsSettingResponse,
  DeleteSqlResultsDownloadRequest,
  DeleteSqlResultsDownloadResponse,
  DisableLegacyAccess,
  DisableLegacyDbfs,
  EnableExportNotebook,
  EnableNotebookTableClipboard,
  EnableResultsDownloading,
  EnhancedSecurityMonitoringSetting,
  GetAibiDashboardEmbeddingAccessPolicySettingRequest,
  GetAibiDashboardEmbeddingApprovedDomainsSettingRequest,
  GetAutomaticClusterUpdateSettingRequest,
  GetComplianceSecurityProfileSettingRequest,
  GetDashboardEmailSubscriptionsRequest,
  GetDefaultNamespaceSettingRequest,
  GetDefaultWarehouseIdRequest,
  GetDisableLegacyAccessRequest,
  GetDisableLegacyDbfsRequest,
  GetEnableExportNotebookRequest,
  GetEnableNotebookTableClipboardRequest,
  GetEnableResultsDownloadingRequest,
  GetEnhancedSecurityMonitoringSettingRequest,
  GetLlmProxyPartnerPoweredWorkspaceRequest,
  GetRestrictWorkspaceAdminsSettingRequest,
  GetSqlResultsDownloadRequest,
  LlmProxyPartnerPoweredWorkspace,
  PatchEnableExportNotebookRequest,
  PatchEnableNotebookTableClipboardRequest,
  PatchEnableResultsDownloadingRequest,
  RestrictWorkspaceAdminsSetting,
  SqlResultsDownload,
  UpdateAibiDashboardEmbeddingAccessPolicySettingRequest,
  UpdateAibiDashboardEmbeddingApprovedDomainsSettingRequest,
  UpdateAutomaticClusterUpdateSettingRequest,
  UpdateComplianceSecurityProfileSettingRequest,
  UpdateDashboardEmailSubscriptionsRequest,
  UpdateDefaultNamespaceSettingRequest,
  UpdateDefaultWarehouseIdRequest,
  UpdateDisableLegacyAccessRequest,
  UpdateDisableLegacyDbfsRequest,
  UpdateEnhancedSecurityMonitoringSettingRequest,
  UpdateLlmProxyPartnerPoweredWorkspaceRequest,
  UpdateRestrictWorkspaceAdminsSettingRequest,
  UpdateSqlResultsDownloadRequest,
} from './model';
import {
  marshalPatchEnableExportNotebookRequestSchema,
  marshalPatchEnableNotebookTableClipboardRequestSchema,
  marshalPatchEnableResultsDownloadingRequestSchema,
  marshalUpdateAibiDashboardEmbeddingAccessPolicySettingRequestSchema,
  marshalUpdateAibiDashboardEmbeddingApprovedDomainsSettingRequestSchema,
  marshalUpdateAutomaticClusterUpdateSettingRequestSchema,
  marshalUpdateComplianceSecurityProfileSettingRequestSchema,
  marshalUpdateDashboardEmailSubscriptionsRequestSchema,
  marshalUpdateDefaultNamespaceSettingRequestSchema,
  marshalUpdateDefaultWarehouseIdRequestSchema,
  marshalUpdateDisableLegacyAccessRequestSchema,
  marshalUpdateDisableLegacyDbfsRequestSchema,
  marshalUpdateEnhancedSecurityMonitoringSettingRequestSchema,
  marshalUpdateLlmProxyPartnerPoweredWorkspaceRequestSchema,
  marshalUpdateRestrictWorkspaceAdminsSettingRequestSchema,
  marshalUpdateSqlResultsDownloadRequestSchema,
  unmarshalAibiDashboardEmbeddingAccessPolicySettingSchema,
  unmarshalAibiDashboardEmbeddingApprovedDomainsSettingSchema,
  unmarshalAutomaticClusterUpdateSettingSchema,
  unmarshalComplianceSecurityProfileSettingSchema,
  unmarshalDashboardEmailSubscriptionsSchema,
  unmarshalDefaultNamespaceSettingSchema,
  unmarshalDefaultWarehouseIdSchema,
  unmarshalDeleteAibiDashboardEmbeddingAccessPolicySettingResponseSchema,
  unmarshalDeleteAibiDashboardEmbeddingApprovedDomainsSettingResponseSchema,
  unmarshalDeleteDashboardEmailSubscriptionsResponseSchema,
  unmarshalDeleteDefaultNamespaceSettingResponseSchema,
  unmarshalDeleteDefaultWarehouseIdResponseSchema,
  unmarshalDeleteDisableLegacyAccessResponseSchema,
  unmarshalDeleteDisableLegacyDbfsResponseSchema,
  unmarshalDeleteLlmProxyPartnerPoweredWorkspaceResponseSchema,
  unmarshalDeleteRestrictWorkspaceAdminsSettingResponseSchema,
  unmarshalDeleteSqlResultsDownloadResponseSchema,
  unmarshalDisableLegacyAccessSchema,
  unmarshalDisableLegacyDbfsSchema,
  unmarshalEnableExportNotebookSchema,
  unmarshalEnableNotebookTableClipboardSchema,
  unmarshalEnableResultsDownloadingSchema,
  unmarshalEnhancedSecurityMonitoringSettingSchema,
  unmarshalLlmProxyPartnerPoweredWorkspaceSchema,
  unmarshalRestrictWorkspaceAdminsSettingSchema,
  unmarshalSqlResultsDownloadSchema,
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

  /** Gets the Notebook and File exporting setting. */
  async getEnableExportNotebook(
    _req: GetEnableExportNotebookRequest,
    options?: CallOptions
  ): Promise<EnableExportNotebook> {
    const url = `${this.host}/api/2.0/settings/types/enable-export-notebook/names/default`;
    let resp: EnableExportNotebook | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEnableExportNotebookSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the Notebook and File exporting setting. The model follows eventual consistency, which means the get after the update operation might receive stale values for some time. */
  async patchEnableExportNotebook(
    req: PatchEnableExportNotebookRequest,
    options?: CallOptions
  ): Promise<EnableExportNotebook> {
    const url = `${this.host}/api/2.0/settings/types/enable-export-notebook/names/default`;
    const body = marshalRequest(
      req,
      marshalPatchEnableExportNotebookRequestSchema
    );
    let resp: EnableExportNotebook | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEnableExportNotebookSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the Results Table Clipboard features setting. */
  async getEnableNotebookTableClipboard(
    _req: GetEnableNotebookTableClipboardRequest,
    options?: CallOptions
  ): Promise<EnableNotebookTableClipboard> {
    const url = `${this.host}/api/2.0/settings/types/enable-notebook-table-clipboard/names/default`;
    let resp: EnableNotebookTableClipboard | undefined;
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
        unmarshalEnableNotebookTableClipboardSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the Results Table Clipboard features setting. The model follows eventual consistency, which means the get after the update operation might receive stale values for some time. */
  async patchEnableNotebookTableClipboard(
    req: PatchEnableNotebookTableClipboardRequest,
    options?: CallOptions
  ): Promise<EnableNotebookTableClipboard> {
    const url = `${this.host}/api/2.0/settings/types/enable-notebook-table-clipboard/names/default`;
    const body = marshalRequest(
      req,
      marshalPatchEnableNotebookTableClipboardRequestSchema
    );
    let resp: EnableNotebookTableClipboard | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalEnableNotebookTableClipboardSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the Notebook results download setting. */
  async getEnableResultsDownloading(
    _req: GetEnableResultsDownloadingRequest,
    options?: CallOptions
  ): Promise<EnableResultsDownloading> {
    const url = `${this.host}/api/2.0/settings/types/enable-results-downloading/names/default`;
    let resp: EnableResultsDownloading | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEnableResultsDownloadingSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the Notebook results download setting. The model follows eventual consistency, which means the get after the update operation might receive stale values for some time. */
  async patchEnableResultsDownloading(
    req: PatchEnableResultsDownloadingRequest,
    options?: CallOptions
  ): Promise<EnableResultsDownloading> {
    const url = `${this.host}/api/2.0/settings/types/enable-results-downloading/names/default`;
    const body = marshalRequest(
      req,
      marshalPatchEnableResultsDownloadingRequestSchema
    );
    let resp: EnableResultsDownloading | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalEnableResultsDownloadingSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete the AI/BI dashboard embedding access policy, reverting back to the default. */
  async deleteAibiDashboardEmbeddingAccessPolicySetting(
    req: DeleteAibiDashboardEmbeddingAccessPolicySettingRequest,
    options?: CallOptions
  ): Promise<DeleteAibiDashboardEmbeddingAccessPolicySettingResponse> {
    const url = `${this.host}/api/2.0/settings/types/aibi_dash_embed_ws_acc_policy/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp:
      | DeleteAibiDashboardEmbeddingAccessPolicySettingResponse
      | undefined;
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
        unmarshalDeleteAibiDashboardEmbeddingAccessPolicySettingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete the list of domains approved to host embedded AI/BI dashboards, reverting back to the default empty list. */
  async deleteAibiDashboardEmbeddingApprovedDomainsSetting(
    req: DeleteAibiDashboardEmbeddingApprovedDomainsSettingRequest,
    options?: CallOptions
  ): Promise<DeleteAibiDashboardEmbeddingApprovedDomainsSettingResponse> {
    const url = `${this.host}/api/2.0/settings/types/aibi_dash_embed_ws_apprvd_domains/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp:
      | DeleteAibiDashboardEmbeddingApprovedDomainsSettingResponse
      | undefined;
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
        unmarshalDeleteAibiDashboardEmbeddingApprovedDomainsSettingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Reverts the Dashboard Email Subscriptions setting to its default value. */
  async deleteDashboardEmailSubscriptions(
    req: DeleteDashboardEmailSubscriptionsRequest,
    options?: CallOptions
  ): Promise<DeleteDashboardEmailSubscriptionsResponse> {
    const url = `${this.host}/api/2.0/settings/types/dashboard_email_subscriptions/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteDashboardEmailSubscriptionsResponse | undefined;
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
        unmarshalDeleteDashboardEmailSubscriptionsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes the default namespace setting for the workspace. A fresh etag needs to be provided in `DELETE`
   * requests (as a query parameter). The etag can be retrieved by making a `GET` request before the `DELETE` request.
   * If the setting is updated/deleted concurrently, `DELETE` fails with 409 and the
   * request must be retried by using the fresh etag in the 409 response.
   */
  async deleteDefaultNamespaceSetting(
    req: DeleteDefaultNamespaceSettingRequest,
    options?: CallOptions
  ): Promise<DeleteDefaultNamespaceSettingResponse> {
    const url = `${this.host}/api/2.0/settings/types/default_namespace_ws/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteDefaultNamespaceSettingResponse | undefined;
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
        unmarshalDeleteDefaultNamespaceSettingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Reverts the Default Warehouse Id setting to its default value. */
  async deleteDefaultWarehouseId(
    req: DeleteDefaultWarehouseIdRequest,
    options?: CallOptions
  ): Promise<DeleteDefaultWarehouseIdResponse> {
    const url = `${this.host}/api/2.0/settings/types/default_warehouse_id/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteDefaultWarehouseIdResponse | undefined;
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
        unmarshalDeleteDefaultWarehouseIdResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes legacy access disablement status. */
  async deleteDisableLegacyAccess(
    req: DeleteDisableLegacyAccessRequest,
    options?: CallOptions
  ): Promise<DeleteDisableLegacyAccessResponse> {
    const url = `${this.host}/api/2.0/settings/types/disable_legacy_access/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteDisableLegacyAccessResponse | undefined;
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
        unmarshalDeleteDisableLegacyAccessResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the disable legacy DBFS setting for a workspace, reverting back to the default. */
  async deleteDisableLegacyDbfs(
    req: DeleteDisableLegacyDbfsRequest,
    options?: CallOptions
  ): Promise<DeleteDisableLegacyDbfsResponse> {
    const url = `${this.host}/api/2.0/settings/types/disable_legacy_dbfs/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteDisableLegacyDbfsResponse | undefined;
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
        unmarshalDeleteDisableLegacyDbfsResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Reverts the enable partner powered AI features workspace setting to its default value. */
  async deleteLlmProxyPartnerPoweredWorkspace(
    req: DeleteLlmProxyPartnerPoweredWorkspaceRequest,
    options?: CallOptions
  ): Promise<DeleteLlmProxyPartnerPoweredWorkspaceResponse> {
    const url = `${this.host}/api/2.0/settings/types/llm_proxy_partner_powered/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteLlmProxyPartnerPoweredWorkspaceResponse | undefined;
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
        unmarshalDeleteLlmProxyPartnerPoweredWorkspaceResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Reverts the restrict workspace admins setting status for the workspace. A fresh etag needs
   * to be provided in `DELETE` requests (as a query parameter). The etag can be retrieved by making a `GET` request
   * before the DELETE request. If the setting is updated/deleted concurrently, `DELETE` fails with 409 and the
   * request must be retried by using the fresh etag in the 409 response.
   */
  async deleteRestrictWorkspaceAdminsSetting(
    req: DeleteRestrictWorkspaceAdminsSettingRequest,
    options?: CallOptions
  ): Promise<DeleteRestrictWorkspaceAdminsSettingResponse> {
    const url = `${this.host}/api/2.0/settings/types/restrict_workspace_admins/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteRestrictWorkspaceAdminsSettingResponse | undefined;
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
        unmarshalDeleteRestrictWorkspaceAdminsSettingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Reverts the SQL Results Download setting to its default value. */
  async deleteSqlResultsDownload(
    req: DeleteSqlResultsDownloadRequest,
    options?: CallOptions
  ): Promise<DeleteSqlResultsDownloadResponse> {
    const url = `${this.host}/api/2.0/settings/types/sql_results_download/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DeleteSqlResultsDownloadResponse | undefined;
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
        unmarshalDeleteSqlResultsDownloadResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Retrieves the AI/BI dashboard embedding access policy.
   * The default setting is ALLOW_APPROVED_DOMAINS, permitting AI/BI dashboards to be embedded on approved domains.
   */
  async getAibiDashboardEmbeddingAccessPolicySetting(
    req: GetAibiDashboardEmbeddingAccessPolicySettingRequest,
    options?: CallOptions
  ): Promise<AibiDashboardEmbeddingAccessPolicySetting> {
    const url = `${this.host}/api/2.0/settings/types/aibi_dash_embed_ws_acc_policy/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: AibiDashboardEmbeddingAccessPolicySetting | undefined;
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
        unmarshalAibiDashboardEmbeddingAccessPolicySettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves the list of domains approved to host embedded AI/BI dashboards. */
  async getAibiDashboardEmbeddingApprovedDomainsSetting(
    req: GetAibiDashboardEmbeddingApprovedDomainsSettingRequest,
    options?: CallOptions
  ): Promise<AibiDashboardEmbeddingApprovedDomainsSetting> {
    const url = `${this.host}/api/2.0/settings/types/aibi_dash_embed_ws_apprvd_domains/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: AibiDashboardEmbeddingApprovedDomainsSetting | undefined;
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
        unmarshalAibiDashboardEmbeddingApprovedDomainsSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the automatic cluster update setting. */
  async getAutomaticClusterUpdateSetting(
    req: GetAutomaticClusterUpdateSettingRequest,
    options?: CallOptions
  ): Promise<AutomaticClusterUpdateSetting> {
    const url = `${this.host}/api/2.0/settings/types/automatic_cluster_update/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: AutomaticClusterUpdateSetting | undefined;
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
        unmarshalAutomaticClusterUpdateSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the compliance security profile setting. */
  async getComplianceSecurityProfileSetting(
    req: GetComplianceSecurityProfileSettingRequest,
    options?: CallOptions
  ): Promise<ComplianceSecurityProfileSetting> {
    const url = `${this.host}/api/2.0/settings/types/shield_csp_enablement_ws_db/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ComplianceSecurityProfileSetting | undefined;
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
        unmarshalComplianceSecurityProfileSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the Dashboard Email Subscriptions setting. */
  async getDashboardEmailSubscriptions(
    req: GetDashboardEmailSubscriptionsRequest,
    options?: CallOptions
  ): Promise<DashboardEmailSubscriptions> {
    const url = `${this.host}/api/2.0/settings/types/dashboard_email_subscriptions/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DashboardEmailSubscriptions | undefined;
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
        unmarshalDashboardEmailSubscriptionsSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the default namespace setting. */
  async getDefaultNamespaceSetting(
    req: GetDefaultNamespaceSettingRequest,
    options?: CallOptions
  ): Promise<DefaultNamespaceSetting> {
    const url = `${this.host}/api/2.0/settings/types/default_namespace_ws/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DefaultNamespaceSetting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultNamespaceSettingSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the Default Warehouse Id setting. */
  async getDefaultWarehouseId(
    req: GetDefaultWarehouseIdRequest,
    options?: CallOptions
  ): Promise<DefaultWarehouseId> {
    const url = `${this.host}/api/2.0/settings/types/default_warehouse_id/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DefaultWarehouseId | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultWarehouseIdSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Retrieves legacy access disablement Status. */
  async getDisableLegacyAccess(
    req: GetDisableLegacyAccessRequest,
    options?: CallOptions
  ): Promise<DisableLegacyAccess> {
    const url = `${this.host}/api/2.0/settings/types/disable_legacy_access/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DisableLegacyAccess | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDisableLegacyAccessSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the disable legacy DBFS setting. */
  async getDisableLegacyDbfs(
    req: GetDisableLegacyDbfsRequest,
    options?: CallOptions
  ): Promise<DisableLegacyDbfs> {
    const url = `${this.host}/api/2.0/settings/types/disable_legacy_dbfs/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: DisableLegacyDbfs | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDisableLegacyDbfsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the enhanced security monitoring setting. */
  async getEnhancedSecurityMonitoringSetting(
    req: GetEnhancedSecurityMonitoringSettingRequest,
    options?: CallOptions
  ): Promise<EnhancedSecurityMonitoringSetting> {
    const url = `${this.host}/api/2.0/settings/types/shield_esm_enablement_ws_db/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: EnhancedSecurityMonitoringSetting | undefined;
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
        unmarshalEnhancedSecurityMonitoringSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the enable partner powered AI features workspace setting. */
  async getLlmProxyPartnerPoweredWorkspace(
    req: GetLlmProxyPartnerPoweredWorkspaceRequest,
    options?: CallOptions
  ): Promise<LlmProxyPartnerPoweredWorkspace> {
    const url = `${this.host}/api/2.0/settings/types/llm_proxy_partner_powered/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: LlmProxyPartnerPoweredWorkspace | undefined;
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
        unmarshalLlmProxyPartnerPoweredWorkspaceSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the restrict workspace admins setting. */
  async getRestrictWorkspaceAdminsSetting(
    req: GetRestrictWorkspaceAdminsSettingRequest,
    options?: CallOptions
  ): Promise<RestrictWorkspaceAdminsSetting> {
    const url = `${this.host}/api/2.0/settings/types/restrict_workspace_admins/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: RestrictWorkspaceAdminsSetting | undefined;
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
        unmarshalRestrictWorkspaceAdminsSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the SQL Results Download setting. */
  async getSqlResultsDownload(
    req: GetSqlResultsDownloadRequest,
    options?: CallOptions
  ): Promise<SqlResultsDownload> {
    const url = `${this.host}/api/2.0/settings/types/sql_results_download/names/default`;
    const params = new URLSearchParams();
    if (req.settingTypeName !== undefined) {
      params.append('setting_type_name', req.settingTypeName);
    }
    if (req.settingName !== undefined) {
      params.append('setting_name', req.settingName);
    }
    if (req.etag !== undefined) {
      params.append('etag', req.etag);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: SqlResultsDownload | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSqlResultsDownloadSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the AI/BI dashboard embedding access policy at the workspace level. */
  async updateAibiDashboardEmbeddingAccessPolicySetting(
    req: UpdateAibiDashboardEmbeddingAccessPolicySettingRequest,
    options?: CallOptions
  ): Promise<AibiDashboardEmbeddingAccessPolicySetting> {
    const url = `${this.host}/api/2.0/settings/types/aibi_dash_embed_ws_acc_policy/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateAibiDashboardEmbeddingAccessPolicySettingRequestSchema
    );
    let resp: AibiDashboardEmbeddingAccessPolicySetting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalAibiDashboardEmbeddingAccessPolicySettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the list of domains approved to host embedded AI/BI dashboards.
   * This update will fail if the current workspace access policy is not ALLOW_APPROVED_DOMAINS.
   */
  async updateAibiDashboardEmbeddingApprovedDomainsSetting(
    req: UpdateAibiDashboardEmbeddingApprovedDomainsSettingRequest,
    options?: CallOptions
  ): Promise<AibiDashboardEmbeddingApprovedDomainsSetting> {
    const url = `${this.host}/api/2.0/settings/types/aibi_dash_embed_ws_apprvd_domains/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateAibiDashboardEmbeddingApprovedDomainsSettingRequestSchema
    );
    let resp: AibiDashboardEmbeddingApprovedDomainsSetting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalAibiDashboardEmbeddingApprovedDomainsSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the automatic cluster update setting for the workspace. A fresh etag needs to be provided in `PATCH`
   * requests (as part of the setting field). The etag can be retrieved by making a `GET` request before the `PATCH` request.
   * If the setting is updated concurrently, `PATCH` fails with 409 and the request must be retried by using the fresh etag in the 409 response.
   */
  async updateAutomaticClusterUpdateSetting(
    req: UpdateAutomaticClusterUpdateSettingRequest,
    options?: CallOptions
  ): Promise<AutomaticClusterUpdateSetting> {
    const url = `${this.host}/api/2.0/settings/types/automatic_cluster_update/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateAutomaticClusterUpdateSettingRequestSchema
    );
    let resp: AutomaticClusterUpdateSetting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalAutomaticClusterUpdateSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the compliance security profile setting for the workspace. A fresh etag needs
   * to be provided in `PATCH` requests (as part of the setting field). The etag can be retrieved by making a `GET`
   * request before the `PATCH` request. If the setting is updated concurrently, `PATCH` fails with 409 and the
   * request must be retried by using the fresh etag in the 409 response.
   */
  async updateComplianceSecurityProfileSetting(
    req: UpdateComplianceSecurityProfileSettingRequest,
    options?: CallOptions
  ): Promise<ComplianceSecurityProfileSetting> {
    const url = `${this.host}/api/2.0/settings/types/shield_csp_enablement_ws_db/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateComplianceSecurityProfileSettingRequestSchema
    );
    let resp: ComplianceSecurityProfileSetting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalComplianceSecurityProfileSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the Dashboard Email Subscriptions setting. */
  async updateDashboardEmailSubscriptions(
    req: UpdateDashboardEmailSubscriptionsRequest,
    options?: CallOptions
  ): Promise<DashboardEmailSubscriptions> {
    const url = `${this.host}/api/2.0/settings/types/dashboard_email_subscriptions/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateDashboardEmailSubscriptionsRequestSchema
    );
    let resp: DashboardEmailSubscriptions | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalDashboardEmailSubscriptionsSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the default namespace setting for the workspace. A fresh etag needs to be provided in `PATCH`
   * requests (as part of the setting field). The etag can be retrieved by making a `GET` request before the `PATCH` request.
   * Note that if the setting does not exist, `GET` returns a NOT_FOUND error and the etag is present in the error response,
   * which should be set in the `PATCH` request. If the setting is updated concurrently, `PATCH` fails with 409 and the request
   * must be retried by using the fresh etag in the 409 response.
   */
  async updateDefaultNamespaceSetting(
    req: UpdateDefaultNamespaceSettingRequest,
    options?: CallOptions
  ): Promise<DefaultNamespaceSetting> {
    const url = `${this.host}/api/2.0/settings/types/default_namespace_ws/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateDefaultNamespaceSettingRequestSchema
    );
    let resp: DefaultNamespaceSetting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultNamespaceSettingSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the Default Warehouse Id setting. */
  async updateDefaultWarehouseId(
    req: UpdateDefaultWarehouseIdRequest,
    options?: CallOptions
  ): Promise<DefaultWarehouseId> {
    const url = `${this.host}/api/2.0/settings/types/default_warehouse_id/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateDefaultWarehouseIdRequestSchema
    );
    let resp: DefaultWarehouseId | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDefaultWarehouseIdSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates legacy access disablement status. */
  async updateDisableLegacyAccess(
    req: UpdateDisableLegacyAccessRequest,
    options?: CallOptions
  ): Promise<DisableLegacyAccess> {
    const url = `${this.host}/api/2.0/settings/types/disable_legacy_access/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateDisableLegacyAccessRequestSchema
    );
    let resp: DisableLegacyAccess | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDisableLegacyAccessSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the disable legacy DBFS setting for the workspace. */
  async updateDisableLegacyDbfs(
    req: UpdateDisableLegacyDbfsRequest,
    options?: CallOptions
  ): Promise<DisableLegacyDbfs> {
    const url = `${this.host}/api/2.0/settings/types/disable_legacy_dbfs/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateDisableLegacyDbfsRequestSchema
    );
    let resp: DisableLegacyDbfs | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDisableLegacyDbfsSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the enhanced security monitoring setting for the workspace. A fresh etag needs
   * to be provided in `PATCH` requests (as part of the setting field). The etag can be retrieved by making a `GET`
   * request before the `PATCH` request. If the setting is updated concurrently, `PATCH` fails with 409 and the
   * request must be retried by using the fresh etag in the 409 response.
   */
  async updateEnhancedSecurityMonitoringSetting(
    req: UpdateEnhancedSecurityMonitoringSettingRequest,
    options?: CallOptions
  ): Promise<EnhancedSecurityMonitoringSetting> {
    const url = `${this.host}/api/2.0/settings/types/shield_esm_enablement_ws_db/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateEnhancedSecurityMonitoringSettingRequestSchema
    );
    let resp: EnhancedSecurityMonitoringSetting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalEnhancedSecurityMonitoringSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the enable partner powered AI features workspace setting. */
  async updateLlmProxyPartnerPoweredWorkspace(
    req: UpdateLlmProxyPartnerPoweredWorkspaceRequest,
    options?: CallOptions
  ): Promise<LlmProxyPartnerPoweredWorkspace> {
    const url = `${this.host}/api/2.0/settings/types/llm_proxy_partner_powered/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateLlmProxyPartnerPoweredWorkspaceRequestSchema
    );
    let resp: LlmProxyPartnerPoweredWorkspace | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalLlmProxyPartnerPoweredWorkspaceSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Updates the restrict workspace admins setting for the workspace. A fresh etag needs
   * to be provided in `PATCH` requests (as part of the setting field). The etag can be retrieved by making a GET
   * request before the `PATCH` request. If the setting is updated concurrently, `PATCH` fails with 409 and the
   * request must be retried by using the fresh etag in the 409 response.
   */
  async updateRestrictWorkspaceAdminsSetting(
    req: UpdateRestrictWorkspaceAdminsSettingRequest,
    options?: CallOptions
  ): Promise<RestrictWorkspaceAdminsSetting> {
    const url = `${this.host}/api/2.0/settings/types/restrict_workspace_admins/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateRestrictWorkspaceAdminsSettingRequestSchema
    );
    let resp: RestrictWorkspaceAdminsSetting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(
        respBody,
        unmarshalRestrictWorkspaceAdminsSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the SQL Results Download setting. */
  async updateSqlResultsDownload(
    req: UpdateSqlResultsDownloadRequest,
    options?: CallOptions
  ): Promise<SqlResultsDownload> {
    const url = `${this.host}/api/2.0/settings/types/sql_results_download/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateSqlResultsDownloadRequestSchema
    );
    let resp: SqlResultsDownload | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSqlResultsDownloadSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
