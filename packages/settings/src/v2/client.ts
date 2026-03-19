// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {
  buildHttpRequest,
  executeHttpCall,
  marshalRequest,
  parseResponse,
} from './utils';
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

  /** Get a setting value at account level. See :method:settingsv2/listaccountsettingsmetadata for list of setting available via public APIs at account level. */
  async getPublicAccountSetting(
    signal: AbortSignal | undefined,
    req: GetPublicAccountSettingRequest,
    options?: Options
  ): Promise<Setting> {
    const url = `${this.host}/api/2.1/accounts//settings/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: Setting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSettingSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Get a user preference for a specific user.
   * User preferences are personal settings that allow individual customization without affecting other users.
   * See :method:settingsv2/listaccountuserpreferencesmetadata for list of user preferences available via public APIs.
   */
  async getPublicAccountUserPreference(
    signal: AbortSignal | undefined,
    req: GetPublicAccountUserPreferenceRequest,
    options?: Options
  ): Promise<UserPreference> {
    const url = `${this.host}/api/2.1/accounts//users/${req.userId ?? ''}/settings/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: UserPreference | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserPreferenceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a setting value at workspace level. See :method:settingsv2/listworkspacesettingsmetadata for list of setting available via public APIs. */
  async getPublicWorkspaceSetting(
    signal: AbortSignal | undefined,
    req: GetPublicWorkspaceSettingRequest,
    options?: Options
  ): Promise<Setting> {
    const url = `${this.host}/api/2.1/settings/${req.name ?? ''}`;
    let resp: Setting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSettingSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * List valid setting keys and metadata. These settings are available to be referenced via
   * GET :method:settingsv2/getpublicaccountsetting and
   * PATCH :method:settingsv2/patchpublicaccountsetting APIs
   */
  async listAccountSettingsMetadata(
    signal: AbortSignal | undefined,
    req: ListAccountSettingsMetadataRequest,
    options?: Options
  ): Promise<ListAccountSettingsMetadataResponse> {
    const url = `${this.host}/api/2.1/accounts/{account_id}/settings-metadata`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAccountSettingsMetadataResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listAccountSettingsMetadataIter(
    signal: AbortSignal | undefined,
    req: ListAccountSettingsMetadataRequest,
    options?: Options
  ): AsyncGenerator<SettingsMetadata> {
    const pageReq: ListAccountSettingsMetadataRequest = {...req};
    for (;;) {
      const resp = await this.listAccountSettingsMetadata(
        signal,
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
   * List valid user preferences and their metadata for a specific user.
   * User preferences are personal settings that allow individual customization without affecting other users.
   * These settings are available to be referenced via
   * GET :method:settingsv2/getpublicaccountuserpreference and
   * PATCH :method:settingsv2/patchpublicaccountuserpreference APIs
   */
  async listAccountUserPreferencesMetadata(
    signal: AbortSignal | undefined,
    req: ListAccountUserPreferencesMetadataRequest,
    options?: Options
  ): Promise<ListAccountUserPreferencesMetadataResponse> {
    const url = `${this.host}/api/2.1/accounts//users/${req.userId ?? ''}/settings-metadata`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListAccountUserPreferencesMetadataResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listAccountUserPreferencesMetadataIter(
    signal: AbortSignal | undefined,
    req: ListAccountUserPreferencesMetadataRequest,
    options?: Options
  ): AsyncGenerator<SettingsMetadata> {
    const pageReq: ListAccountUserPreferencesMetadataRequest = {...req};
    for (;;) {
      const resp = await this.listAccountUserPreferencesMetadata(
        signal,
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
    signal: AbortSignal | undefined,
    req: ListWorkspaceSettingsMetadataRequest,
    options?: Options
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
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listWorkspaceSettingsMetadataIter(
    signal: AbortSignal | undefined,
    req: ListWorkspaceSettingsMetadataRequest,
    options?: Options
  ): AsyncGenerator<SettingsMetadata> {
    const pageReq: ListWorkspaceSettingsMetadataRequest = {...req};
    for (;;) {
      const resp = await this.listWorkspaceSettingsMetadata(
        signal,
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
   * Patch a setting value at account level. See :method:settingsv2/listaccountsettingsmetadata for list of setting available via public APIs at account level.
   * To determine the correct field to include in a patch request, refer to the type field of the setting returned in the :method:settingsv2/listaccountsettingsmetadata response.
   *
   * Note: Page refresh is required for changes to take effect in UI.
   */
  async patchPublicAccountSetting(
    signal: AbortSignal | undefined,
    req: PatchPublicAccountSettingRequest,
    options?: Options
  ): Promise<Setting> {
    const url = `${this.host}/api/2.1/accounts//settings/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.setting, marshalSettingSchema);
    let resp: Setting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSettingSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: PatchPublicAccountUserPreferenceRequest,
    options?: Options
  ): Promise<UserPreference> {
    const url = `${this.host}/api/2.1/accounts//users/${req.userId ?? ''}/settings/${req.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.accountId !== undefined) {
      params.append('account_id', req.accountId);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.setting, marshalUserPreferenceSchema);
    let resp: UserPreference | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalUserPreferenceSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
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
    signal: AbortSignal | undefined,
    req: PatchPublicWorkspaceSettingRequest,
    options?: Options
  ): Promise<Setting> {
    const url = `${this.host}/api/2.1/settings/${req.name ?? ''}`;
    const body = marshalRequest(req.setting, marshalSettingSchema);
    let resp: Setting | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalSettingSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
