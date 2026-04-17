// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import type {Call, Options} from '@databricks/sdk-databricks/api';
import {execute} from '@databricks/sdk-databricks/api';
import type {Logger} from '@databricks/sdk-databricks/logger';
import {NoOpLogger} from '@databricks/sdk-databricks/logger';
import type {ClientOptions} from '@databricks/sdk-databricks/options';
import type {HttpClient} from '@databricks/sdk-databricks/transport';
import {newHttpClient} from '@databricks/sdk-databricks/transport';
import {buildHttpRequest, executeHttpCall, marshalRequest, parseResponse} from './utils';
import type {
  CreateVolume,
  DeleteVolume,
  DeleteVolume_Response,
  GetVolume,
  ListVolumes,
  ListVolumes_Response,
  UpdateVolume,
  VolumeInfo,
} from './model';
import {
  marshalCreateVolumeSchema,
  marshalUpdateVolumeSchema,
  unmarshalDeleteVolume_ResponseSchema,
  unmarshalListVolumes_ResponseSchema,
  unmarshalVolumeInfoSchema,
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
   * Creates a new volume.
   * 
   * The user could create either an external volume or a managed volume. An external volume
   * will be created in the specified external location, while a managed volume
   * will be located in the default location which is specified by the parent schema,
   * or the parent catalog, or the Metastore.
   * 
   * For the volume creation to succeed, the user must satisfy following conditions:
   * - The caller must be a metastore admin, or be the owner of the parent catalog and schema,
   * or have the **USE_CATALOG** privilege on the parent catalog
   * and the **USE_SCHEMA** privilege on the parent schema.
   * - The caller must have **CREATE VOLUME** privilege on the parent schema.
   * 
   * For an external volume, following conditions also need to satisfy
   * - The caller must have **CREATE EXTERNAL VOLUME** privilege on the external location.
   * - There are no other tables, nor volumes existing in the specified storage location.
   * - The specified storage location is not under the location of other tables, nor volumes,
   * or catalogs or schemas.
   */
  async createVolume(signal: AbortSignal | undefined, req: CreateVolume, options?: Options): Promise<VolumeInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/volumes`;
    const body = marshalRequest(req, marshalCreateVolumeSchema);
    let resp: VolumeInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalVolumeInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Deletes a volume from the specified parent catalog and schema.
   * 
   * The caller must be a metastore admin or an owner of the volume.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   */
  async deleteVolume(signal: AbortSignal | undefined, req: DeleteVolume, options?: Options): Promise<DeleteVolume_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/volumes/${req.fullNameArg ?? ''}`;
    let resp: DeleteVolume_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalDeleteVolume_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets a volume from the metastore for a specific catalog and schema.
   * 
   * The caller must be a metastore admin or an owner of (or have the **READ VOLUME**
   * privilege on) the volume.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   */
  async getVolume(signal: AbortSignal | undefined, req: GetVolume, options?: Options): Promise<VolumeInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/volumes/${req.fullNameArg ?? ''}`;
    const params = new URLSearchParams();
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: VolumeInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalVolumeInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Gets an array of volumes for the current metastore
   * under the parent catalog and schema.
   * 
   * The returned volumes are filtered based on the privileges of the calling user.
   * For example, the metastore admin is able to list all the volumes.
   * A regular user needs to be the owner or have the **READ VOLUME** privilege
   * on the volume to receive the volumes in the response.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   * 
   * There is no guarantee of a specific ordering of the elements in the array.
   * 
   * PAGINATION BEHAVIOR: The API is by default paginated, a page may contain zero results while still providing a next_page_token.
   * Clients must continue reading pages until next_page_token is absent, which is the only indication that the end of results has been reached.
   */
  async listVolumes(signal: AbortSignal | undefined, req: ListVolumes, options?: Options): Promise<ListVolumes_Response> {
    const url = `${this.host}/api/2.1/unity-catalog/volumes`;
    const params = new URLSearchParams();
    if (req.catalogName !== undefined) {
      params.append('catalog_name', req.catalogName);
    }
    if (req.schemaName !== undefined) {
      params.append('schema_name', req.schemaName);
    }
    if (req.includeBrowse !== undefined) {
      params.append('include_browse', String(req.includeBrowse));
    }
    if (req.maxResults !== undefined) {
      params.append('max_results', String(req.maxResults));
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListVolumes_Response | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalListVolumes_ResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }


  async *listVolumesIter(signal: AbortSignal | undefined, req: ListVolumes, options?: Options): AsyncGenerator<VolumeInfo> {
    const pageReq: ListVolumes = {...req};
    for (;;) {
      const resp = await this.listVolumes(signal, pageReq, options);
      for (const item of resp.volumes ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }


  /**
   * Updates the specified volume under the specified parent catalog and schema.
   * 
   * The caller must be a metastore admin or an owner of the volume.
   * For the latter case, the caller must also be the owner or have the **USE_CATALOG**
   * privilege on the parent catalog and the **USE_SCHEMA** privilege on the parent schema.
   * 
   * Currently only the name, the owner or the comment of the volume could be updated.
   */
  async updateVolume(signal: AbortSignal | undefined, req: UpdateVolume, options?: Options): Promise<VolumeInfo> {
    const url = `${this.host}/api/2.1/unity-catalog/volumes/${req.fullNameArg ?? ''}`;
    const body = marshalRequest(req, marshalUpdateVolumeSchema);
    let resp: VolumeInfo | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('PATCH', url, callSignal, body);
      const respBody = await executeHttpCall({request: httpReq, httpClient: this.httpClient, logger: this.logger});
      resp = parseResponse(respBody, unmarshalVolumeInfoSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
