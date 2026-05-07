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
  BatchCreateMaterializedFeaturesRequest,
  BatchCreateMaterializedFeaturesResponse,
  CreateFeatureRequest,
  CreateKafkaConfigRequest,
  CreateMaterializedFeatureRequest,
  DeleteFeatureRequest,
  DeleteKafkaConfigRequest,
  DeleteMaterializedFeatureRequest,
  Feature,
  GetFeatureRequest,
  GetKafkaConfigRequest,
  GetMaterializedFeatureRequest,
  KafkaConfig,
  ListFeaturesRequest,
  ListFeaturesResponse,
  ListKafkaConfigsRequest,
  ListKafkaConfigsResponse,
  ListMaterializedFeaturesRequest,
  ListMaterializedFeaturesResponse,
  MaterializedFeature,
  UpdateFeatureRequest,
  UpdateKafkaConfigRequest,
  UpdateMaterializedFeatureRequest,
} from './model';
import {
  marshalBatchCreateMaterializedFeaturesRequestSchema,
  marshalFeatureSchema,
  marshalKafkaConfigSchema,
  marshalMaterializedFeatureSchema,
  unmarshalBatchCreateMaterializedFeaturesResponseSchema,
  unmarshalFeatureSchema,
  unmarshalKafkaConfigSchema,
  unmarshalListFeaturesResponseSchema,
  unmarshalListKafkaConfigsResponseSchema,
  unmarshalListMaterializedFeaturesResponseSchema,
  unmarshalMaterializedFeatureSchema,
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

  /** Batch create materialized features. */
  async batchCreateMaterializedFeatures(
    req: BatchCreateMaterializedFeaturesRequest,
    options?: CallOptions
  ): Promise<BatchCreateMaterializedFeaturesResponse> {
    const url = `${this.host}/api/2.0/feature-engineering/materialized-features:batchCreate`;
    const body = marshalRequest(
      req,
      marshalBatchCreateMaterializedFeaturesRequestSchema
    );
    let resp: BatchCreateMaterializedFeaturesResponse | undefined;
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
        unmarshalBatchCreateMaterializedFeaturesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a Feature. */
  async createFeature(
    req: CreateFeatureRequest,
    options?: CallOptions
  ): Promise<Feature> {
    const url = `${this.host}/api/2.0/feature-engineering/features`;
    const body = marshalRequest(req.feature, marshalFeatureSchema);
    let resp: Feature | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Create a Kafka config.
   * During PrPr, Kafka configs can be read and used when creating features under the entire metastore.
   * Only the creator of the Kafka config can delete it.
   */
  async createKafkaConfig(
    req: CreateKafkaConfigRequest,
    options?: CallOptions
  ): Promise<KafkaConfig> {
    const url = `${this.host}/api/2.0/feature-engineering/features/kafka-configs`;
    const body = marshalRequest(req.kafkaConfig, marshalKafkaConfigSchema);
    let resp: KafkaConfig | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalKafkaConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a materialized feature. */
  async createMaterializedFeature(
    req: CreateMaterializedFeatureRequest,
    options?: CallOptions
  ): Promise<MaterializedFeature> {
    const url = `${this.host}/api/2.0/feature-engineering/materialized-features`;
    const body = marshalRequest(
      req.materializedFeature,
      marshalMaterializedFeatureSchema
    );
    let resp: MaterializedFeature | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('POST', url, headers, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMaterializedFeatureSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a Feature. */
  async deleteFeature(
    req: DeleteFeatureRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/feature-engineering/features/${req.fullName ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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

  /**
   * Delete a Kafka config.
   * During PrPr, Kafka configs can be read and used when creating features under the entire metastore.
   * Only the creator of the Kafka config can delete it.
   */
  async deleteKafkaConfig(
    req: DeleteKafkaConfigRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/feature-engineering/features/kafka-configs/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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

  /** Delete a materialized feature. */
  async deleteMaterializedFeature(
    req: DeleteMaterializedFeatureRequest,
    options?: CallOptions
  ): Promise<void> {
    const url = `${this.host}/api/2.0/feature-engineering/materialized-features/${req.materializedFeatureId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
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

  /** Get a Feature. */
  async getFeature(
    req: GetFeatureRequest,
    options?: CallOptions
  ): Promise<Feature> {
    const url = `${this.host}/api/2.0/feature-engineering/features/${req.fullName ?? ''}`;
    let resp: Feature | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Get a Kafka config.
   * During PrPr, Kafka configs can be read and used when creating features under the entire metastore.
   * Only the creator of the Kafka config can delete it.
   */
  async getKafkaConfig(
    req: GetKafkaConfigRequest,
    options?: CallOptions
  ): Promise<KafkaConfig> {
    const url = `${this.host}/api/2.0/feature-engineering/features/kafka-configs/${req.name ?? ''}`;
    let resp: KafkaConfig | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalKafkaConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a materialized feature. */
  async getMaterializedFeature(
    req: GetMaterializedFeatureRequest,
    options?: CallOptions
  ): Promise<MaterializedFeature> {
    const url = `${this.host}/api/2.0/feature-engineering/materialized-features/${req.materializedFeatureId ?? ''}`;
    let resp: MaterializedFeature | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', url, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMaterializedFeatureSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List Features. */
  async listFeatures(
    req: ListFeaturesRequest,
    options?: CallOptions
  ): Promise<ListFeaturesResponse> {
    const url = `${this.host}/api/2.0/feature-engineering/features`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListFeaturesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListFeaturesResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listFeaturesIter(
    req: ListFeaturesRequest,
    options?: CallOptions
  ): AsyncGenerator<Feature> {
    const pageReq: ListFeaturesRequest = {...req};
    for (;;) {
      const resp = await this.listFeatures(pageReq, options);
      for (const item of resp.features ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /**
   * List Kafka configs.
   * During PrPr, Kafka configs can be read and used when creating features under the entire metastore.
   * Only the creator of the Kafka config can delete it.
   */
  async listKafkaConfigs(
    req: ListKafkaConfigsRequest,
    options?: CallOptions
  ): Promise<ListKafkaConfigsResponse> {
    const url = `${this.host}/api/2.0/feature-engineering/features/kafka-configs`;
    const params = new URLSearchParams();
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListKafkaConfigsResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers();
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest('GET', fullUrl, headers, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListKafkaConfigsResponseSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listKafkaConfigsIter(
    req: ListKafkaConfigsRequest,
    options?: CallOptions
  ): AsyncGenerator<KafkaConfig> {
    const pageReq: ListKafkaConfigsRequest = {...req};
    for (;;) {
      const resp = await this.listKafkaConfigs(pageReq, options);
      for (const item of resp.kafkaConfigs ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** List materialized features. */
  async listMaterializedFeatures(
    req: ListMaterializedFeaturesRequest,
    options?: CallOptions
  ): Promise<ListMaterializedFeaturesResponse> {
    const url = `${this.host}/api/2.0/feature-engineering/materialized-features`;
    const params = new URLSearchParams();
    if (req.featureName !== undefined) {
      params.append('feature_name', req.featureName);
    }
    if (req.pageToken !== undefined) {
      params.append('page_token', req.pageToken);
    }
    if (req.pageSize !== undefined) {
      params.append('page_size', String(req.pageSize));
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    let resp: ListMaterializedFeaturesResponse | undefined;
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
        unmarshalListMaterializedFeaturesResponseSchema
      );
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listMaterializedFeaturesIter(
    req: ListMaterializedFeaturesRequest,
    options?: CallOptions
  ): AsyncGenerator<MaterializedFeature> {
    const pageReq: ListMaterializedFeaturesRequest = {...req};
    for (;;) {
      const resp = await this.listMaterializedFeatures(pageReq, options);
      for (const item of resp.materializedFeatures ?? []) {
        yield item;
      }
      if (resp.nextPageToken === undefined || resp.nextPageToken === '') {
        return;
      }
      pageReq.pageToken = resp.nextPageToken;
    }
  }

  /** Update a Feature. */
  async updateFeature(
    req: UpdateFeatureRequest,
    options?: CallOptions
  ): Promise<Feature> {
    const url = `${this.host}/api/2.0/feature-engineering/features/${req.feature?.fullName ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.feature, marshalFeatureSchema);
    let resp: Feature | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /**
   * Update a Kafka config.
   * During PrPr, Kafka configs can be read and used when creating features under the entire metastore.
   * Only the creator of the Kafka config can delete it.
   */
  async updateKafkaConfig(
    req: UpdateKafkaConfigRequest,
    options?: CallOptions
  ): Promise<KafkaConfig> {
    const url = `${this.host}/api/2.0/feature-engineering/features/kafka-configs/${req.kafkaConfig?.name ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(req.kafkaConfig, marshalKafkaConfigSchema);
    let resp: KafkaConfig | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalKafkaConfigSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a materialized feature (pause/resume). */
  async updateMaterializedFeature(
    req: UpdateMaterializedFeatureRequest,
    options?: CallOptions
  ): Promise<MaterializedFeature> {
    const url = `${this.host}/api/2.0/feature-engineering/materialized-features/${req.materializedFeature?.materializedFeatureId ?? ''}`;
    const params = new URLSearchParams();
    if (req.updateMask !== undefined) {
      params.append('update_mask', req.updateMask.toString());
    }
    const query = params.toString();
    const fullUrl = query !== '' ? `${url}?${query}` : url;
    const body = marshalRequest(
      req.materializedFeature,
      marshalMaterializedFeatureSchema
    );
    let resp: MaterializedFeature | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const headers = new Headers({'Content-Type': 'application/json'});
      headers.set('User-Agent', this.userAgent);
      const httpReq = buildHttpRequest(
        'PATCH',
        fullUrl,
        headers,
        callSignal,
        body
      );
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMaterializedFeatureSchema);
    };
    await executeCall(call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
