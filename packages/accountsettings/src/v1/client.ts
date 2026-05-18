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
  AccountIpAccessEnable,
  CspEnablementAccountSetting,
  DeleteAccountIpAccessEnableRequest,
  DeleteAccountIpAccessEnableResponse,
  DeleteDisableLegacyFeaturesRequest,
  DeleteDisableLegacyFeaturesResponse,
  DeletePersonalComputeSettingRequest,
  DeletePersonalComputeSettingResponse,
  DisableLegacyFeatures,
  EsmEnablementAccountSetting,
  GetAccountIpAccessEnableRequest,
  GetCspEnablementAccountSettingRequest,
  GetDisableLegacyFeaturesRequest,
  GetEsmEnablementAccountSettingRequest,
  GetLlmProxyPartnerPoweredAccountRequest,
  GetLlmProxyPartnerPoweredEnforceRequest,
  GetPersonalComputeSettingRequest,
  LlmProxyPartnerPoweredAccount,
  LlmProxyPartnerPoweredEnforce,
  PersonalComputeSetting,
  UpdateAccountIpAccessEnableRequest,
  UpdateCspEnablementAccountSettingRequest,
  UpdateDisableLegacyFeaturesRequest,
  UpdateEsmEnablementAccountSettingRequest,
  UpdateLlmProxyPartnerPoweredAccountRequest,
  UpdateLlmProxyPartnerPoweredEnforceRequest,
  UpdatePersonalComputeSettingRequest,
} from './model';
import {
  marshalUpdateAccountIpAccessEnableRequestSchema,
  marshalUpdateCspEnablementAccountSettingRequestSchema,
  marshalUpdateDisableLegacyFeaturesRequestSchema,
  marshalUpdateEsmEnablementAccountSettingRequestSchema,
  marshalUpdateLlmProxyPartnerPoweredAccountRequestSchema,
  marshalUpdateLlmProxyPartnerPoweredEnforceRequestSchema,
  marshalUpdatePersonalComputeSettingRequestSchema,
  unmarshalAccountIpAccessEnableSchema,
  unmarshalCspEnablementAccountSettingSchema,
  unmarshalDeleteAccountIpAccessEnableResponseSchema,
  unmarshalDeleteDisableLegacyFeaturesResponseSchema,
  unmarshalDeletePersonalComputeSettingResponseSchema,
  unmarshalDisableLegacyFeaturesSchema,
  unmarshalEsmEnablementAccountSettingSchema,
  unmarshalLlmProxyPartnerPoweredAccountSchema,
  unmarshalLlmProxyPartnerPoweredEnforceSchema,
  unmarshalPersonalComputeSettingSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: pkgJson.name.replace(/^@[^/]+\//, ''),
  value: pkgJson.version,
};

export class Client {
  private readonly host: string;
  // Fallback for endpoints whose path contains {account_id}. If the request
  // already carries an accountId, that value wins.
  private readonly accountId: string | undefined;
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
    this.accountId = options.accountId;
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

  /** Reverts the value of the account IP access toggle setting to default (ON) */
  async deleteAccountIpAccessEnable(
    req: DeleteAccountIpAccessEnableRequest,
    options?: CallOptions
  ): Promise<DeleteAccountIpAccessEnableResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/acct_ip_acl_enable/names/default`;
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
    let resp: DeleteAccountIpAccessEnableResponse | undefined;
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
        unmarshalDeleteAccountIpAccessEnableResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Deletes the disable legacy features setting. */
  async deleteDisableLegacyFeatures(
    req: DeleteDisableLegacyFeaturesRequest,
    options?: CallOptions
  ): Promise<DeleteDisableLegacyFeaturesResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/disable_legacy_features/names/default`;
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
    let resp: DeleteDisableLegacyFeaturesResponse | undefined;
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
        unmarshalDeleteDisableLegacyFeaturesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Reverts back the Personal Compute setting value to default (ON) */
  async deletePersonalComputeSetting(
    req: DeletePersonalComputeSettingRequest,
    options?: CallOptions
  ): Promise<DeletePersonalComputeSettingResponse> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/dcp_acct_enable/names/default`;
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
    let resp: DeletePersonalComputeSettingResponse | undefined;
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
        unmarshalDeletePersonalComputeSettingResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the value of the account IP access toggle setting. */
  async getAccountIpAccessEnable(
    req: GetAccountIpAccessEnableRequest,
    options?: CallOptions
  ): Promise<AccountIpAccessEnable> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/acct_ip_acl_enable/names/default`;
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
    let resp: AccountIpAccessEnable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountIpAccessEnableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the compliance security profile setting for new workspaces. */
  async getCspEnablementAccountSetting(
    req: GetCspEnablementAccountSettingRequest,
    options?: CallOptions
  ): Promise<CspEnablementAccountSetting> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/shield_csp_enablement_ac/names/default`;
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
    let resp: CspEnablementAccountSetting | undefined;
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
        unmarshalCspEnablementAccountSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the value of the disable legacy features setting. */
  async getDisableLegacyFeatures(
    req: GetDisableLegacyFeaturesRequest,
    options?: CallOptions
  ): Promise<DisableLegacyFeatures> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/disable_legacy_features/names/default`;
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
    let resp: DisableLegacyFeatures | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDisableLegacyFeaturesSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the enhanced security monitoring setting for new workspaces. */
  async getEsmEnablementAccountSetting(
    req: GetEsmEnablementAccountSettingRequest,
    options?: CallOptions
  ): Promise<EsmEnablementAccountSetting> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/shield_esm_enablement_ac/names/default`;
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
    let resp: EsmEnablementAccountSetting | undefined;
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
        unmarshalEsmEnablementAccountSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the enable partner powered AI features account setting. */
  async getLlmProxyPartnerPoweredAccount(
    req: GetLlmProxyPartnerPoweredAccountRequest,
    options?: CallOptions
  ): Promise<LlmProxyPartnerPoweredAccount> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/llm_proxy_partner_powered/names/default`;
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
    let resp: LlmProxyPartnerPoweredAccount | undefined;
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
        unmarshalLlmProxyPartnerPoweredAccountSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the enforcement status of partner powered AI features account setting. */
  async getLlmProxyPartnerPoweredEnforce(
    req: GetLlmProxyPartnerPoweredEnforceRequest,
    options?: CallOptions
  ): Promise<LlmProxyPartnerPoweredEnforce> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/llm_proxy_partner_powered_enforce/names/default`;
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
    let resp: LlmProxyPartnerPoweredEnforce | undefined;
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
        unmarshalLlmProxyPartnerPoweredEnforceSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Gets the value of the Personal Compute setting. */
  async getPersonalComputeSetting(
    req: GetPersonalComputeSettingRequest,
    options?: CallOptions
  ): Promise<PersonalComputeSetting> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/dcp_acct_enable/names/default`;
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
    let resp: PersonalComputeSetting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPersonalComputeSettingSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the value of the account IP access toggle setting. */
  async updateAccountIpAccessEnable(
    req: UpdateAccountIpAccessEnableRequest,
    options?: CallOptions
  ): Promise<AccountIpAccessEnable> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/acct_ip_acl_enable/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateAccountIpAccessEnableRequestSchema
    );
    let resp: AccountIpAccessEnable | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalAccountIpAccessEnableSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the value of the compliance security profile setting for new workspaces. */
  async updateCspEnablementAccountSetting(
    req: UpdateCspEnablementAccountSettingRequest,
    options?: CallOptions
  ): Promise<CspEnablementAccountSetting> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/shield_csp_enablement_ac/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateCspEnablementAccountSettingRequestSchema
    );
    let resp: CspEnablementAccountSetting | undefined;
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
        unmarshalCspEnablementAccountSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the value of the disable legacy features setting. */
  async updateDisableLegacyFeatures(
    req: UpdateDisableLegacyFeaturesRequest,
    options?: CallOptions
  ): Promise<DisableLegacyFeatures> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/disable_legacy_features/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateDisableLegacyFeaturesRequestSchema
    );
    let resp: DisableLegacyFeatures | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalDisableLegacyFeaturesSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the value of the enhanced security monitoring setting for new workspaces. */
  async updateEsmEnablementAccountSetting(
    req: UpdateEsmEnablementAccountSettingRequest,
    options?: CallOptions
  ): Promise<EsmEnablementAccountSetting> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/shield_esm_enablement_ac/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateEsmEnablementAccountSettingRequestSchema
    );
    let resp: EsmEnablementAccountSetting | undefined;
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
        unmarshalEsmEnablementAccountSettingSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the enable partner powered AI features account setting. */
  async updateLlmProxyPartnerPoweredAccount(
    req: UpdateLlmProxyPartnerPoweredAccountRequest,
    options?: CallOptions
  ): Promise<LlmProxyPartnerPoweredAccount> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/llm_proxy_partner_powered/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateLlmProxyPartnerPoweredAccountRequestSchema
    );
    let resp: LlmProxyPartnerPoweredAccount | undefined;
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
        unmarshalLlmProxyPartnerPoweredAccountSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the enable enforcement status of partner powered AI features account setting. */
  async updateLlmProxyPartnerPoweredEnforce(
    req: UpdateLlmProxyPartnerPoweredEnforceRequest,
    options?: CallOptions
  ): Promise<LlmProxyPartnerPoweredEnforce> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/llm_proxy_partner_powered_enforce/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdateLlmProxyPartnerPoweredEnforceRequestSchema
    );
    let resp: LlmProxyPartnerPoweredEnforce | undefined;
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
        unmarshalLlmProxyPartnerPoweredEnforceSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Updates the value of the Personal Compute setting. */
  async updatePersonalComputeSetting(
    req: UpdatePersonalComputeSettingRequest,
    options?: CallOptions
  ): Promise<PersonalComputeSetting> {
    const url = `${this.host}/api/2.0/accounts/${req.accountId ?? this.accountId ?? ''}/settings/types/dcp_acct_enable/names/default`;
    const body = marshalRequest(
      req,
      marshalUpdatePersonalComputeSettingRequestSchema
    );
    let resp: PersonalComputeSetting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalPersonalComputeSettingSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
