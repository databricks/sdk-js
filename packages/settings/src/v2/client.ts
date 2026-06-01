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
  GetPublicAccountSettingRequest,
  GetPublicAccountUserPreferenceRequest,
  GetPublicWorkspaceSettingRequest,
  ListAccountSettingsMetadataRequest,
  ListAccountSettingsMetadataResponse,
  ListAccountUserPreferencesMetadataRequest,
  ListAccountUserPreferencesMetadataResponse,
  ListWorkspaceSettingsMetadataRequest,
  ListWorkspaceSettingsMetadataResponse,
  PatchPublicAccountSettingRequest,
  PatchPublicAccountUserPreferenceRequest,
  PatchPublicWorkspaceSettingRequest,
  Setting,
  SettingsMetadata,
  UserPreference,
} from './model';
import {
  marshalSettingSchema,
  marshalUserPreferenceSchema,
  unmarshalListAccountSettingsMetadataResponseSchema,
  unmarshalListAccountUserPreferencesMetadataResponseSchema,
  unmarshalListWorkspaceSettingsMetadataResponseSchema,
  unmarshalSettingSchema,
  unmarshalUserPreferenceSchema,
} from './model';

// Package identity segment for this client to be used in the User-Agent header.
const PACKAGE_SEGMENT = {
  key: 'sdk-js-' + pkgJson.name.replace(/^@[^/]+\/sdk-/, ''),
  value: pkgJson.version,
};

export class SettingsClient {
  private readonly host: string;
  // Fallback for endpoints whose path contains {account_id}. If the request
  // already carries an accountId, that value wins.
  private readonly accountId: string | undefined;
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
    this.accountId = options.accountId;
    this.workspaceId = options.workspaceId;
    this.logger = options.logger ?? new NoOpLogger();
    const info = createDefault()
      .with(PACKAGE_SEGMENT)
      .with({key: 'sdk-js-auth', value: AUTH_VERSION})
      .with({key: 'auth', value: options.credentials?.name() ?? 'default'});
    this.userAgent = info.toString();
    this.httpClient = newHttpClient(options);
  }

  /** Get a setting value at account level. See :method:settingsv2/listaccountsettingsmetadata for list of setting available via public APIs at account level. */
  async getPublicAccountSetting(
    req: GetPublicAccountSettingRequest,
    options?: CallOptions
  ): Promise<Setting> {
    const url = `${this.host}/api/2.1/accounts/${req.accountId ?? this.accountId ?? ''}/settings/${req.name ?? ''}`;
    let resp: Setting | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSettingSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Get a user preference for a specific user.
   * User preferences are personal settings that allow individual customization without affecting other users.
   * See :method:settingsv2/listaccountuserpreferencesmetadata for list of user preferences available via public APIs.
   */
  async getPublicAccountUserPreference(
    req: GetPublicAccountUserPreferenceRequest,
    options?: CallOptions
  ): Promise<UserPreference> {
    const url = `${this.host}/api/2.1/accounts/${req.accountId ?? this.accountId ?? ''}/users/${req.userId ?? ''}/settings/${req.name ?? ''}`;
    let resp: UserPreference | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserPreferenceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /** Get a setting value at workspace level. See :method:settingsv2/listworkspacesettingsmetadata for list of setting available via public APIs. */
  async getPublicWorkspaceSetting(
    req: GetPublicWorkspaceSettingRequest,
    options?: CallOptions
  ): Promise<Setting> {
    const url = `${this.host}/api/2.1/settings/${req.name ?? ''}`;
    let resp: Setting | undefined;
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
      resp = parseResponse(respBody, unmarshalSettingSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * List valid setting keys and metadata. These settings are available to be referenced via
   * GET :method:settingsv2/getpublicaccountsetting and
   * PATCH :method:settingsv2/patchpublicaccountsetting APIs
   */
  async listAccountSettingsMetadata(
    req: ListAccountSettingsMetadataRequest,
    options?: CallOptions
  ): Promise<ListAccountSettingsMetadataResponse> {
    const url = `${this.host}/api/2.1/accounts/${req.accountId ?? this.accountId ?? ''}/settings-metadata`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAccountSettingsMetadataResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListAccountSettingsMetadataResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listAccountSettingsMetadataIter(
    req: ListAccountSettingsMetadataRequest,
    options?: CallOptions
  ): AsyncGenerator<SettingsMetadata> {
    const pageReq: ListAccountSettingsMetadataRequest = {...req};
    for (;;) {
      const resp = await this.listAccountSettingsMetadata(pageReq, options);
      for (const item of resp.settingsMetadata ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * List valid user preferences and their metadata for a specific user.
   * User preferences are personal settings that allow individual customization without affecting other users.
   * These settings are available to be referenced via
   * GET :method:settingsv2/getpublicaccountuserpreference and
   * PATCH :method:settingsv2/patchpublicaccountuserpreference APIs
   */
  async listAccountUserPreferencesMetadata(
    req: ListAccountUserPreferencesMetadataRequest,
    options?: CallOptions
  ): Promise<ListAccountUserPreferencesMetadataResponse> {
    const url = `${this.host}/api/2.1/accounts/${req.accountId ?? this.accountId ?? ''}/users/${req.userId ?? ''}/settings-metadata`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAccountUserPreferencesMetadataResponse | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
        unmarshalListAccountUserPreferencesMetadataResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listAccountUserPreferencesMetadataIter(
    req: ListAccountUserPreferencesMetadataRequest,
    options?: CallOptions
  ): AsyncGenerator<SettingsMetadata> {
    const pageReq: ListAccountUserPreferencesMetadataRequest = {...req};
    for (;;) {
      const resp = await this.listAccountUserPreferencesMetadata(
        pageReq,
        options
      );
      for (const item of resp.settingsMetadata ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * List valid setting keys and metadata. These settings are available to be referenced via
   * GET :method:settingsv2/getpublicworkspacesetting and
   * PATCH :method:settingsv2/patchpublicworkspacesetting APIs
   */
  async listWorkspaceSettingsMetadata(
    req: ListWorkspaceSettingsMetadataRequest,
    options?: CallOptions
  ): Promise<ListWorkspaceSettingsMetadataResponse> {
    const url = `${this.host}/api/2.1/settings-metadata`;
    const params = new URLSearchParams();
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListWorkspaceSettingsMetadataResponse | undefined;
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
        unmarshalListWorkspaceSettingsMetadataResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  async *listWorkspaceSettingsMetadataIter(
    req: ListWorkspaceSettingsMetadataRequest,
    options?: CallOptions
  ): AsyncGenerator<SettingsMetadata> {
    const pageReq: ListWorkspaceSettingsMetadataRequest = {...req};
    for (;;) {
      const resp = await this.listWorkspaceSettingsMetadata(pageReq, options);
      for (const item of resp.settingsMetadata ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * Patch a setting value at account level. See :method:settingsv2/listaccountsettingsmetadata for list of setting available via public APIs at account level.
   * To determine the correct field to include in a patch request, refer to the type field of the setting returned in the :method:settingsv2/listaccountsettingsmetadata response.
   *
   * Note: Page refresh is required for changes to take effect in UI.
   */
  async patchPublicAccountSetting(
    req: PatchPublicAccountSettingRequest,
    options?: CallOptions
  ): Promise<Setting> {
    const url = `${this.host}/api/2.1/accounts/${req.accountId ?? this.accountId ?? ''}/settings/${req.name ?? ''}`;
    const body = marshalRequest(req.setting, marshalSettingSchema);
    let resp: Setting | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSettingSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Update a user preference for a specific user.
   * User preferences are personal settings that allow individual customization without affecting other users.
   * See :method:settingsv2/listaccountuserpreferencesmetadata for list of user preferences available via public APIs.
   *
   * Note: Page refresh is required for changes to take effect in UI.
   */
  async patchPublicAccountUserPreference(
    req: PatchPublicAccountUserPreferenceRequest,
    options?: CallOptions
  ): Promise<UserPreference> {
    const url = `${this.host}/api/2.1/accounts/${req.accountId ?? this.accountId ?? ''}/users/${req.userId ?? ''}/settings/${req.name ?? ''}`;
    const body = marshalRequest(req.setting, marshalUserPreferenceSchema);
    let resp: UserPreference | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('PATCH', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserPreferenceSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }

  /**
   * Patch a setting value at workspace level. See :method:settingsv2/listworkspacesettingsmetadata for list of setting available via public APIs at workspace level.
   * To determine the correct field to include in a patch request, refer to the type field of the setting returned in the :method:settingsv2/listworkspacesettingsmetadata response.
   *
   * Note: Page refresh is required for changes to take effect in UI.
   */
  async patchPublicWorkspaceSetting(
    req: PatchPublicWorkspaceSettingRequest,
    options?: CallOptions
  ): Promise<Setting> {
    const url = `${this.host}/api/2.1/settings/${req.name ?? ''}`;
    const body = marshalRequest(req.setting, marshalSettingSchema);
    let resp: Setting | undefined;
    const call = async (callSignal?: AbortSignal): Promise<void> => {
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
      resp = parseResponse(respBody, unmarshalSettingSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('operation completed without a result.');
    }
    return resp;
  }
}
