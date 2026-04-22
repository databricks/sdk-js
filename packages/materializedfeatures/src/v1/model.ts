// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
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

export const unmarshalFeatureLineageSchema: z.ZodType<FeatureLineage> = z
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
export const unmarshalFeatureLineage_FeatureSpecSchema: z.ZodType<FeatureLineage_FeatureSpec> =
  z
    .object({
      name: z.string().optional(),
    })
    .transform(d => ({
      name: d.name,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalFeatureLineage_ModelSchema: z.ZodType<FeatureLineage_Model> =
  z
    .object({
      name: z.string().optional(),
      version: z.number().optional(),
    })
    .transform(d => ({
      name: d.name,
      version: d.version,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalFeatureLineage_OnlineFeatureSchema: z.ZodType<FeatureLineage_OnlineFeature> =
  z
    .object({
      feature_name: z.string().optional(),
      table_name: z.string().optional(),
    })
    .transform(d => ({
      featureName: d.feature_name,
      tableName: d.table_name,
    }));

export const unmarshalFeatureTagSchema: z.ZodType<FeatureTag> = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalListFeatureTagsResponseSchema: z.ZodType<ListFeatureTagsResponse> =
  z
    .object({
      feature_tags: z.array(z.lazy(() => unmarshalFeatureTagSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      featureTags: d.feature_tags,
      nextPageToken: d.next_page_token,
    }));

export const marshalFeatureLineageSchema: z.ZodType = z
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
export const marshalFeatureLineage_FeatureSpecSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalFeatureLineage_ModelSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    version: z.number().optional(),
  })
  .transform(d => ({
    name: d.name,
    version: d.version,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalFeatureLineage_OnlineFeatureSchema: z.ZodType = z
  .object({
    featureName: z.string().optional(),
    tableName: z.string().optional(),
  })
  .transform(d => ({
    feature_name: d.featureName,
    table_name: d.tableName,
  }));

export const marshalFeatureTagSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z.string().optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalListFeatureTagsResponseSchema: z.ZodType = z
  .object({
    featureTags: z.array(z.lazy(() => marshalFeatureTagSchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    feature_tags: d.featureTags,
    next_page_token: d.nextPageToken,
  }));

const createFeatureTagRequestFieldMaskSchema: FieldMaskSchema = {
  featureName: {wire: 'feature_name'},
  featureTag: {wire: 'feature_tag', children: () => featureTagFieldMaskSchema},
  tableName: {wire: 'table_name'},
};

export function createFeatureTagRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateFeatureTagRequest> {
  return FieldMask.build<CreateFeatureTagRequest>(
    paths,
    createFeatureTagRequestFieldMaskSchema
  );
}

const deleteFeatureTagRequestFieldMaskSchema: FieldMaskSchema = {
  featureName: {wire: 'feature_name'},
  key: {wire: 'key'},
  tableName: {wire: 'table_name'},
};

export function deleteFeatureTagRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteFeatureTagRequest> {
  return FieldMask.build<DeleteFeatureTagRequest>(
    paths,
    deleteFeatureTagRequestFieldMaskSchema
  );
}

const featureLineageFieldMaskSchema: FieldMaskSchema = {
  featureSpecs: {wire: 'feature_specs'},
  models: {wire: 'models'},
  onlineFeatures: {wire: 'online_features'},
};

export function featureLineageFieldMask(
  ...paths: string[]
): FieldMask<FeatureLineage> {
  return FieldMask.build<FeatureLineage>(paths, featureLineageFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const featureLineage_FeatureSpecFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function featureLineage_FeatureSpecFieldMask(
  ...paths: string[]
): FieldMask<FeatureLineage_FeatureSpec> {
  return FieldMask.build<FeatureLineage_FeatureSpec>(
    paths,
    featureLineage_FeatureSpecFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const featureLineage_ModelFieldMaskSchema: FieldMaskSchema = {
  name: {wire: 'name'},
  version: {wire: 'version'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function featureLineage_ModelFieldMask(
  ...paths: string[]
): FieldMask<FeatureLineage_Model> {
  return FieldMask.build<FeatureLineage_Model>(
    paths,
    featureLineage_ModelFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const featureLineage_OnlineFeatureFieldMaskSchema: FieldMaskSchema = {
  featureName: {wire: 'feature_name'},
  tableName: {wire: 'table_name'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function featureLineage_OnlineFeatureFieldMask(
  ...paths: string[]
): FieldMask<FeatureLineage_OnlineFeature> {
  return FieldMask.build<FeatureLineage_OnlineFeature>(
    paths,
    featureLineage_OnlineFeatureFieldMaskSchema
  );
}

const featureTagFieldMaskSchema: FieldMaskSchema = {
  key: {wire: 'key'},
  value: {wire: 'value'},
};

export function featureTagFieldMask(...paths: string[]): FieldMask<FeatureTag> {
  return FieldMask.build<FeatureTag>(paths, featureTagFieldMaskSchema);
}

const getFeatureLineageRequestFieldMaskSchema: FieldMaskSchema = {
  featureName: {wire: 'feature_name'},
  tableName: {wire: 'table_name'},
};

export function getFeatureLineageRequestFieldMask(
  ...paths: string[]
): FieldMask<GetFeatureLineageRequest> {
  return FieldMask.build<GetFeatureLineageRequest>(
    paths,
    getFeatureLineageRequestFieldMaskSchema
  );
}

const getFeatureTagRequestFieldMaskSchema: FieldMaskSchema = {
  featureName: {wire: 'feature_name'},
  key: {wire: 'key'},
  tableName: {wire: 'table_name'},
};

export function getFeatureTagRequestFieldMask(
  ...paths: string[]
): FieldMask<GetFeatureTagRequest> {
  return FieldMask.build<GetFeatureTagRequest>(
    paths,
    getFeatureTagRequestFieldMaskSchema
  );
}

const listFeatureTagsRequestFieldMaskSchema: FieldMaskSchema = {
  featureName: {wire: 'feature_name'},
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
  tableName: {wire: 'table_name'},
};

export function listFeatureTagsRequestFieldMask(
  ...paths: string[]
): FieldMask<ListFeatureTagsRequest> {
  return FieldMask.build<ListFeatureTagsRequest>(
    paths,
    listFeatureTagsRequestFieldMaskSchema
  );
}

const listFeatureTagsResponseFieldMaskSchema: FieldMaskSchema = {
  featureTags: {wire: 'feature_tags'},
  nextPageToken: {wire: 'next_page_token'},
};

export function listFeatureTagsResponseFieldMask(
  ...paths: string[]
): FieldMask<ListFeatureTagsResponse> {
  return FieldMask.build<ListFeatureTagsResponse>(
    paths,
    listFeatureTagsResponseFieldMaskSchema
  );
}

const updateFeatureTagRequestFieldMaskSchema: FieldMaskSchema = {
  featureName: {wire: 'feature_name'},
  featureTag: {wire: 'feature_tag', children: () => featureTagFieldMaskSchema},
  tableName: {wire: 'table_name'},
  updateMask: {wire: 'update_mask'},
};

export function updateFeatureTagRequestFieldMask(
  ...paths: string[]
): FieldMask<UpdateFeatureTagRequest> {
  return FieldMask.build<UpdateFeatureTagRequest>(
    paths,
    updateFeatureTagRequestFieldMaskSchema
  );
}
