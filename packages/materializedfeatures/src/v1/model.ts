// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.
import {z} from 'zod';

/** Request message for CreateFeatureTag. */
export interface CreateFeatureTagRequest {
  tableName?: string | undefined;
  featureName?: string | undefined;
  featureTag?: FeatureTag | undefined;
}

/** Request message for DeleteFeatureTag. */
export interface DeleteFeatureTagRequest {
  /** The name of the feature table. */
  tableName?: string | undefined;
  /** The name of the feature within the feature table. */
  featureName?: string | undefined;
  /** The key of the tag to delete. */
  key?: string | undefined;
}

export interface FeatureLineage {
  /** List of Unity Catalog models that were trained on this feature. */
  models?: FeatureLineage_Model[] | undefined;
  /** List of feature specs that contain this feature. */
  featureSpecs?: FeatureLineage_FeatureSpec[] | undefined;
  /** List of online features that use this feature as source. */
  onlineFeatures?: FeatureLineage_OnlineFeature[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface FeatureLineage_FeatureSpec {
  /** The full name of the feature spec in Unity Catalog. */
  name?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface FeatureLineage_Model {
  /** The full name of the model in Unity Catalog. */
  name?: string | undefined;
  /** The version of the model. */
  version?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface FeatureLineage_OnlineFeature {
  /** The name of the online feature (column name). */
  featureName?: string | undefined;
  /** The full name of the online table in Unity Catalog. */
  tableName?: string | undefined;
}

/** Represents a tag on a feature in a feature table. */
export interface FeatureTag {
  key?: string | undefined;
  value?: string | undefined;
}

export interface GetFeatureLineageRequest {
  /** The name of the feature. */
  featureName?: string | undefined;
  /** The full name of the feature table in Unity Catalog. */
  tableName?: string | undefined;
}

/** Request message for GetFeatureTag. */
export interface GetFeatureTagRequest {
  tableName?: string | undefined;
  featureName?: string | undefined;
  key?: string | undefined;
}

/** Request message for ListFeatureTags. */
export interface ListFeatureTagsRequest {
  tableName?: string | undefined;
  featureName?: string | undefined;
  /** Pagination token to go to the next page based on a previous query. */
  pageToken?: string | undefined;
  /** The maximum number of results to return. */
  pageSize?: number | undefined;
}

/** Response message for ListFeatureTag. */
export interface ListFeatureTagsResponse {
  featureTags?: FeatureTag[] | undefined;
  /** Pagination token to request the next page of results for this query. */
  nextPageToken?: string | undefined;
}

/** Request message for UpdateFeatureTag. */
export interface UpdateFeatureTagRequest {
  tableName?: string | undefined;
  featureName?: string | undefined;
  featureTag?: FeatureTag | undefined;
  /** The list of fields to update. */
  updateMask?: string | undefined;
}

export const unmarshalCreateFeatureTagRequestSchema = z
  .object({
    table_name: z.string().optional(),
    feature_name: z.string().optional(),
    feature_tag: z.lazy(() => unmarshalFeatureTagSchema).optional(),
  })
  .transform(d => ({
    tableName: d.table_name,
    featureName: d.feature_name,
    featureTag: d.feature_tag,
  }));

export const unmarshalDeleteFeatureTagRequestSchema = z
  .object({
    table_name: z.string().optional(),
    feature_name: z.string().optional(),
    key: z.string().optional(),
  })
  .transform(d => ({
    tableName: d.table_name,
    featureName: d.feature_name,
    key: d.key,
  }));

export const unmarshalFeatureLineageSchema = z
  .object({
    models: z
      .array(z.lazy(() => unmarshalFeatureLineage_ModelSchema))
      .optional(),
    feature_specs: z
      .array(z.lazy(() => unmarshalFeatureLineage_FeatureSpecSchema))
      .optional(),
    online_features: z
      .array(z.lazy(() => unmarshalFeatureLineage_OnlineFeatureSchema))
      .optional(),
  })
  .transform(d => ({
    models: d.models,
    featureSpecs: d.feature_specs,
    onlineFeatures: d.online_features,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalFeatureLineage_FeatureSpecSchema = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalFeatureLineage_ModelSchema = z
  .object({
    name: z.string().optional(),
    version: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalFeatureLineage_OnlineFeatureSchema = z
  .object({
    feature_name: z.string().optional(),
    table_name: z.string().optional(),
  })
  .transform(d => ({
    featureName: d.feature_name,
    tableName: d.table_name,
  }));

export const unmarshalFeatureTagSchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalGetFeatureLineageRequestSchema = z
  .object({
    feature_name: z.string().optional(),
    table_name: z.string().optional(),
  })
  .transform(d => ({
    featureName: d.feature_name,
    tableName: d.table_name,
  }));

export const unmarshalGetFeatureTagRequestSchema = z
  .object({
    table_name: z.string().optional(),
    feature_name: z.string().optional(),
    key: z.string().optional(),
  })
  .transform(d => ({
    tableName: d.table_name,
    featureName: d.feature_name,
    key: d.key,
  }));

export const unmarshalListFeatureTagsRequestSchema = z
  .object({
    table_name: z.string().optional(),
    feature_name: z.string().optional(),
    page_token: z.string().optional(),
    page_size: z.number().optional(),
  })
  .transform(d => ({
    tableName: d.table_name,
    featureName: d.feature_name,
    pageToken: d.page_token,
    pageSize: d.page_size,
  }));

export const unmarshalListFeatureTagsResponseSchema = z
  .object({
    feature_tags: z.array(z.lazy(() => unmarshalFeatureTagSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    featureTags: d.feature_tags,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalUpdateFeatureTagRequestSchema = z
  .object({
    table_name: z.string().optional(),
    feature_name: z.string().optional(),
    feature_tag: z.lazy(() => unmarshalFeatureTagSchema).optional(),
    update_mask: z.string().optional(),
  })
  .transform(d => ({
    tableName: d.table_name,
    featureName: d.feature_name,
    featureTag: d.feature_tag,
    updateMask: d.update_mask,
  }));

export const marshalCreateFeatureTagRequestSchema = z
  .object({
    tableName: z.string().optional(),
    featureName: z.string().optional(),
    featureTag: z.lazy(() => marshalFeatureTagSchema).optional(),
  })
  .transform(d => ({
    table_name: d.tableName,
    feature_name: d.featureName,
    feature_tag: d.featureTag,
  }));

export const marshalDeleteFeatureTagRequestSchema = z
  .object({
    tableName: z.string().optional(),
    featureName: z.string().optional(),
    key: z.string().optional(),
  })
  .transform(d => ({
    table_name: d.tableName,
    feature_name: d.featureName,
    key: d.key,
  }));

export const marshalFeatureLineageSchema = z
  .object({
    models: z.array(z.lazy(() => marshalFeatureLineage_ModelSchema)).optional(),
    featureSpecs: z
      .array(z.lazy(() => marshalFeatureLineage_FeatureSpecSchema))
      .optional(),
    onlineFeatures: z
      .array(z.lazy(() => marshalFeatureLineage_OnlineFeatureSchema))
      .optional(),
  })
  .transform(d => ({
    models: d.models,
    feature_specs: d.featureSpecs,
    online_features: d.onlineFeatures,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalFeatureLineage_FeatureSpecSchema = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalFeatureLineage_ModelSchema = z
  .object({
    name: z.string().optional(),
    version: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalFeatureLineage_OnlineFeatureSchema = z
  .object({
    featureName: z.string().optional(),
    tableName: z.string().optional(),
  })
  .transform(d => ({
    feature_name: d.featureName,
    table_name: d.tableName,
  }));

export const marshalFeatureTagSchema = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalGetFeatureLineageRequestSchema = z
  .object({
    featureName: z.string().optional(),
    tableName: z.string().optional(),
  })
  .transform(d => ({
    feature_name: d.featureName,
    table_name: d.tableName,
  }));

export const marshalGetFeatureTagRequestSchema = z
  .object({
    tableName: z.string().optional(),
    featureName: z.string().optional(),
    key: z.string().optional(),
  })
  .transform(d => ({
    table_name: d.tableName,
    feature_name: d.featureName,
    key: d.key,
  }));

export const marshalListFeatureTagsRequestSchema = z
  .object({
    tableName: z.string().optional(),
    featureName: z.string().optional(),
    pageToken: z.string().optional(),
    pageSize: z.number().optional(),
  })
  .transform(d => ({
    table_name: d.tableName,
    feature_name: d.featureName,
    page_token: d.pageToken,
    page_size: d.pageSize,
  }));

export const marshalListFeatureTagsResponseSchema = z
  .object({
    featureTags: z.array(z.lazy(() => marshalFeatureTagSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    feature_tags: d.featureTags,
    next_page_token: d.nextPageToken,
  }));

export const marshalUpdateFeatureTagRequestSchema = z
  .object({
    tableName: z.string().optional(),
    featureName: z.string().optional(),
    featureTag: z.lazy(() => marshalFeatureTagSchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    table_name: d.tableName,
    feature_name: d.featureName,
    feature_tag: d.featureTag,
    update_mask: d.updateMask,
  }));
