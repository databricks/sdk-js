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

  /** Batch create materialized features. */
  async batchCreateMaterializedFeatures(
    signal: AbortSignal | undefined,
    req: BatchCreateMaterializedFeaturesRequest,
    options?: Options
  ): Promise<BatchCreateMaterializedFeaturesResponse> {
    const url = `${this.host}/api/2.0/feature-engineering/materialized-features:batchCreate`;
    const body = marshalRequest(
      req,
      marshalBatchCreateMaterializedFeaturesRequestSchema
    );
    let resp: BatchCreateMaterializedFeaturesResponse | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a Feature. */
  async createFeature(
    signal: AbortSignal | undefined,
    req: CreateFeatureRequest,
    options?: Options
  ): Promise<Feature> {
    const url = `${this.host}/api/2.0/feature-engineering/features`;
    const body = marshalRequest(req.feature, marshalFeatureSchema);
    let resp: Feature | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: CreateKafkaConfigRequest,
    options?: Options
  ): Promise<KafkaConfig> {
    const url = `${this.host}/api/2.0/feature-engineering/features/kafka-configs`;
    const body = marshalRequest(req.kafkaConfig, marshalKafkaConfigSchema);
    let resp: KafkaConfig | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalKafkaConfigSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Create a materialized feature. */
  async createMaterializedFeature(
    signal: AbortSignal | undefined,
    req: CreateMaterializedFeatureRequest,
    options?: Options
  ): Promise<MaterializedFeature> {
    const url = `${this.host}/api/2.0/feature-engineering/materialized-features`;
    const body = marshalRequest(
      req.materializedFeature,
      marshalMaterializedFeatureSchema
    );
    let resp: MaterializedFeature | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('POST', url, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMaterializedFeatureSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Delete a Feature. */
  async deleteFeature(
    signal: AbortSignal | undefined,
    req: DeleteFeatureRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/feature-engineering/features/${req.fullName ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /**
   * Delete a Kafka config.
   * During PrPr, Kafka configs can be read and used when creating features under the entire metastore.
   * Only the creator of the Kafka config can delete it.
   */
  async deleteKafkaConfig(
    signal: AbortSignal | undefined,
    req: DeleteKafkaConfigRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/feature-engineering/features/kafka-configs/${req.name ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Delete a materialized feature. */
  async deleteMaterializedFeature(
    signal: AbortSignal | undefined,
    req: DeleteMaterializedFeatureRequest,
    options?: Options
  ): Promise<void> {
    const url = `${this.host}/api/2.0/feature-engineering/materialized-features/${req.materializedFeatureId ?? ''}`;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('DELETE', url, callSignal);
      await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
    };
    await execute(signal, call, options);
  }

  /** Get a Feature. */
  async getFeature(
    signal: AbortSignal | undefined,
    req: GetFeatureRequest,
    options?: Options
  ): Promise<Feature> {
    const url = `${this.host}/api/2.0/feature-engineering/features/${req.fullName ?? ''}`;
    let resp: Feature | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: GetKafkaConfigRequest,
    options?: Options
  ): Promise<KafkaConfig> {
    const url = `${this.host}/api/2.0/feature-engineering/features/kafka-configs/${req.name ?? ''}`;
    let resp: KafkaConfig | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalKafkaConfigSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Get a materialized feature. */
  async getMaterializedFeature(
    signal: AbortSignal | undefined,
    req: GetMaterializedFeatureRequest,
    options?: Options
  ): Promise<MaterializedFeature> {
    const url = `${this.host}/api/2.0/feature-engineering/materialized-features/${req.materializedFeatureId ?? ''}`;
    let resp: MaterializedFeature | undefined;
    const call: Call = async (callSignal?: AbortSignal): Promise<void> => {
      const httpReq = buildHttpRequest('GET', url, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMaterializedFeatureSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** List Features. */
  async listFeatures(
    signal: AbortSignal | undefined,
    req: ListFeaturesRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListFeaturesResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listFeaturesIter(
    signal: AbortSignal | undefined,
    req: ListFeaturesRequest,
    options?: Options
  ): AsyncGenerator<Feature> {
    const pageReq: ListFeaturesRequest = {...req};
    for (;;) {
      const resp = await this.listFeatures(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListKafkaConfigsRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalListKafkaConfigsResponseSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listKafkaConfigsIter(
    signal: AbortSignal | undefined,
    req: ListKafkaConfigsRequest,
    options?: Options
  ): AsyncGenerator<KafkaConfig> {
    const pageReq: ListKafkaConfigsRequest = {...req};
    for (;;) {
      const resp = await this.listKafkaConfigs(signal, pageReq, options);
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
    signal: AbortSignal | undefined,
    req: ListMaterializedFeaturesRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('GET', fullUrl, callSignal);
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
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  async *listMaterializedFeaturesIter(
    signal: AbortSignal | undefined,
    req: ListMaterializedFeaturesRequest,
    options?: Options
  ): AsyncGenerator<MaterializedFeature> {
    const pageReq: ListMaterializedFeaturesRequest = {...req};
    for (;;) {
      const resp = await this.listMaterializedFeatures(
        signal,
        pageReq,
        options
      );
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
    signal: AbortSignal | undefined,
    req: UpdateFeatureRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalFeatureSchema);
    };
    await execute(signal, call, options);
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
    signal: AbortSignal | undefined,
    req: UpdateKafkaConfigRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalKafkaConfigSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }

  /** Update a materialized feature (pause/resume). */
  async updateMaterializedFeature(
    signal: AbortSignal | undefined,
    req: UpdateMaterializedFeatureRequest,
    options?: Options
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
      const httpReq = buildHttpRequest('PATCH', fullUrl, callSignal, body);
      const respBody = await executeHttpCall({
        request: httpReq,
        httpClient: this.httpClient,
        logger: this.logger,
      });
      resp = parseResponse(respBody, unmarshalMaterializedFeatureSchema);
    };
    await execute(signal, call, options);
    if (resp === undefined) {
      throw new Error('API call completed without a result.');
    }
    return resp;
  }
}
