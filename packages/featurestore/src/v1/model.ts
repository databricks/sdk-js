// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';


// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum OnlineStore_State {
  /** Default value, not used */
  STATE_UNSPECIFIED = 'STATE_UNSPECIFIED',
  /** The online store is being brought online. */
  STARTING = 'STARTING',
  /** The online store is active and ready to use. */
  AVAILABLE = 'AVAILABLE',
  /** The online store is being deleted. */
  DELETING = 'DELETING',
  /** The online store is stopped. */
  STOPPED = 'STOPPED',
  /** The online store is being updated. */
  UPDATING = 'UPDATING',
  /** The online store is failing over. */
  FAILING_OVER = 'FAILING_OVER',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum PublishSpec_PublishMode {
  PUBLISH_MODE_UNSPECIFIED = 'PUBLISH_MODE_UNSPECIFIED',
  /**
   * Pipeline runs continuously after syncing the initial data.
   * Requires the source table to have Change Data Feed (CDF) enabled.
   */
  CONTINUOUS = 'CONTINUOUS',
  /**
   * Pipeline stops after syncing the initial data and can be triggered later (manually, through a cron job or through data triggers).
   * Requires the source table to have Change Data Feed (CDF) enabled.
   */
  TRIGGERED = 'TRIGGERED',
  /**
   * Pipeline stops after syncing the initial data and can be triggered later (manually, through a cron job or through data triggers).
   * Successive updates always perform a full copy of the source table data (no incremental updates).
   * Does not require the source table to have Change Data Feed (CDF) enabled.
   */
  SNAPSHOT = 'SNAPSHOT',
}

export interface CreateOnlineStoreRequest {
  /** Online store to create. */
  onlineStore?: OnlineStore | undefined;
}

export interface DeleteOnlineStoreRequest {
  /** Name of the online store to delete. */
  name?: string | undefined;
}

export interface DeleteOnlineTableRequest {
  /** The full three-part (catalog, schema, table) name of the online table. */
  onlineTableName?: string | undefined;
}

export interface GetOnlineStoreRequest {
  /** Name of the online store to get. */
  name?: string | undefined;
}

export interface ListOnlineStoresRequest {
  /** Pagination token to go to the next page based on a previous query. */
  pageToken?: string | undefined;
  /** The maximum number of results to return. Defaults to 100 if not specified. */
  pageSize?: number | undefined;
}

export interface ListOnlineStoresResponse {
  /** List of online stores. */
  onlineStores?: OnlineStore[] | undefined;
  /** Pagination token to request the next page of results for this query. */
  nextPageToken?: string | undefined;
}

/** An OnlineStore is a logical database instance that stores and serves features online. */
export interface OnlineStore {
  /** The name of the online store. This is the unique identifier for the online store. */
  name?: string | undefined;
  /** The email of the creator of the online store. */
  creator?: string | undefined;
  /** The timestamp when the online store was created. */
  creationTime?: Temporal.Instant | undefined;
  /** The current state of the online store. */
  state?: OnlineStore_State | undefined;
  /** The capacity of the online store. Valid values are "CU_1", "CU_2", "CU_4", "CU_8". */
  capacity?: string | undefined;
  /** The number of read replicas for the online store. Defaults to 0. */
  readReplicaCount?: number | undefined;
  /** The usage policy applied to the online store to track billing. */
  usagePolicyId?: string | undefined;
}

export interface PublishSpec {
  /** The name of the target online store. */
  onlineStore?: string | undefined;
  /** The full three-part (catalog, schema, table) name of the online table. */
  onlineTableName?: string | undefined;
  /** The publish mode of the pipeline that syncs the online table with the source table. */
  publishMode?: PublishSpec_PublishMode | undefined;
}

export interface PublishTableRequest {
  /** The full three-part (catalog, schema, table) name of the source table. */
  sourceTableName?: string | undefined;
  /** The specification for publishing the online table from the source table. */
  publishSpec?: PublishSpec | undefined;
}

export interface PublishTableResponse {
  /** The full three-part (catalog, schema, table) name of the online table. */
  onlineTableName?: string | undefined;
  /** The ID of the pipeline that syncs the online table with the source table. */
  pipelineId?: string | undefined;
}

export interface UpdateOnlineStoreRequest {
  /** Online store to update. */
  onlineStore?: OnlineStore | undefined;
  /** The list of fields to update. */
  updateMask?: FieldMask<OnlineStore> | undefined;
}

export const unmarshalListOnlineStoresResponseSchema: z.ZodType<ListOnlineStoresResponse> = z
  .object({
    online_stores: z.array(z.lazy(() => unmarshalOnlineStoreSchema)).optional(),
    next_page_token: z.string().optional(),
  })
  .transform(d => ({
    onlineStores: d.online_stores,
    nextPageToken: d.next_page_token,
  }));

export const unmarshalOnlineStoreSchema: z.ZodType<OnlineStore> = z
  .object({
    name: z.string().optional(),
    creator: z.string().optional(),
    creation_time: z.string().transform(s => Temporal.Instant.from(s)).optional(),
    state: z.enum(OnlineStore_State).optional(),
    capacity: z.string().optional(),
    read_replica_count: z.number().optional(),
    usage_policy_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    creator: d.creator,
    creationTime: d.creation_time,
    state: d.state,
    capacity: d.capacity,
    readReplicaCount: d.read_replica_count,
    usagePolicyId: d.usage_policy_id,
  }));

export const unmarshalPublishTableResponseSchema: z.ZodType<PublishTableResponse> = z
  .object({
    online_table_name: z.string().optional(),
    pipeline_id: z.string().optional(),
  })
  .transform(d => ({
    onlineTableName: d.online_table_name,
    pipelineId: d.pipeline_id,
  }));

export const marshalOnlineStoreSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    creator: z.string().optional(),
    creationTime: z.any().transform((d: Temporal.Instant) => d.toString()).optional(),
    state: z.enum(OnlineStore_State).optional(),
    capacity: z.string().optional(),
    readReplicaCount: z.number().optional(),
    usagePolicyId: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    creator: d.creator,
    creation_time: d.creationTime,
    state: d.state,
    capacity: d.capacity,
    read_replica_count: d.readReplicaCount,
    usage_policy_id: d.usagePolicyId,
  }));

export const marshalPublishSpecSchema: z.ZodType = z
  .object({
    onlineStore: z.string().optional(),
    onlineTableName: z.string().optional(),
    publishMode: z.enum(PublishSpec_PublishMode).optional(),
  })
  .transform(d => ({
    online_store: d.onlineStore,
    online_table_name: d.onlineTableName,
    publish_mode: d.publishMode,
  }));

export const marshalPublishTableRequestSchema: z.ZodType = z
  .object({
    sourceTableName: z.string().optional(),
    publishSpec: z.lazy(() => marshalPublishSpecSchema).optional(),
  })
  .transform(d => ({
    source_table_name: d.sourceTableName,
    publish_spec: d.publishSpec,
  }));

const onlineStoreFieldMaskSchema: FieldMaskSchema = {
  capacity: {wire: 'capacity'},
  creationTime: {wire: 'creation_time'},
  creator: {wire: 'creator'},
  name: {wire: 'name'},
  readReplicaCount: {wire: 'read_replica_count'},
  state: {wire: 'state'},
  usagePolicyId: {wire: 'usage_policy_id'},
};

export function onlineStoreFieldMask(...paths: string[]): FieldMask<OnlineStore> {
  return FieldMask.build<OnlineStore>(paths, onlineStoreFieldMaskSchema);
}
