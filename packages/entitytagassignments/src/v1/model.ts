// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Enum representing the source type of a tag assignment */
export enum TagAssignmentSourceType {
  /** Includes (but not limited to) tags manually assigned by users */
  TAG_ASSIGNMENT_SOURCE_TYPE_UNSPECIFIED = 'TAG_ASSIGNMENT_SOURCE_TYPE_UNSPECIFIED',
  /** Automatically assigned by Data Classification */
  TAG_ASSIGNMENT_SOURCE_TYPE_SYSTEM_DATA_CLASSIFICATION = 'TAG_ASSIGNMENT_SOURCE_TYPE_SYSTEM_DATA_CLASSIFICATION',
}

/** Request to create a new entity tag assignment */
export interface CreateEntityTagAssignmentRequest {
  tagAssignment?: EntityTagAssignment | undefined;
}

/** Request to delete an entity tag assignment */
export interface DeleteEntityTagAssignmentRequest {
  /** The fully qualified name of the entity to which the tag is assigned */
  entityName?: string | undefined;
  /** Required. The key of the tag to delete */
  tagKey?: string | undefined;
  /** The type of the entity to which the tag is assigned. */
  entityType?: string | undefined;
}

/** Represents a tag assignment to an entity */
export interface EntityTagAssignment {
  /** The fully qualified name of the entity to which the tag is assigned */
  entityName?: string | undefined;
  /** The key of the tag */
  tagKey?: string | undefined;
  /** The value of the tag */
  tagValue?: string | undefined;
  /** The type of the entity to which the tag is assigned. */
  entityType?: string | undefined;
  /** The timestamp when the tag assignment was last updated */
  updateTime?: Temporal.Instant | undefined;
  /** The user or principal who updated the tag assignment */
  updatedBy?: string | undefined;
  /** The source type of the tag assignment, e.g., user-assigned or system-assigned */
  sourceType?: TagAssignmentSourceType | undefined;
  /** Boolean which indicates whether this tag is inherited. */
  inherited?: boolean | undefined;
}

/** Request to get an entity tag assignment */
export interface GetEntityTagAssignmentRequest {
  /** The fully qualified name of the entity to which the tag is assigned */
  entityName?: string | undefined;
  /** Required. The key of the tag */
  tagKey?: string | undefined;
  /** The type of the entity to which the tag is assigned. */
  entityType?: string | undefined;
  /** Boolean which indicates whether this tag is inherited. */
  includeInherited?: boolean | undefined;
}

/** Request to list entity tag assignments */
export interface ListEntityTagAssignmentsRequest {
  /** The fully qualified name of the entity to which the tag is assigned */
  entityName?: string | undefined;
  /** Optional. Maximum number of tag assignments to return in a single page */
  maxResults?: number | undefined;
  /** Optional. Pagination token to retrieve the next page of results */
  pageToken?: string | undefined;
  /** The type of the entity to which the tag is assigned. */
  entityType?: string | undefined;
  /** Boolean which indicates whether this tag is inherited. */
  includeInherited?: boolean | undefined;
}

export interface ListEntityTagAssignmentsResponse {
  /** The list of tag assignments */
  tagAssignments?: EntityTagAssignment[] | undefined;
  /** Optional. Pagination token for retrieving the next page of results */
  nextPageToken?: string | undefined;
}

/** Request to update an entity tag assignment */
export interface UpdateEntityTagAssignmentRequest {
  tagAssignment?: EntityTagAssignment | undefined;
  updateMask?: string | undefined;
}

export const unmarshalEntityTagAssignmentSchema: z.ZodType<EntityTagAssignment> =
  z
    .object({
      entity_name: z.string().optional(),
      tag_key: z.string().optional(),
      tag_value: z.string().optional(),
      entity_type: z.string().optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      updated_by: z.string().optional(),
      source_type: z.enum(TagAssignmentSourceType).optional(),
      inherited: z.boolean().optional(),
    })
    .transform(d => ({
      entityName: d.entity_name,
      tagKey: d.tag_key,
      tagValue: d.tag_value,
      entityType: d.entity_type,
      updateTime: d.update_time,
      updatedBy: d.updated_by,
      sourceType: d.source_type,
      inherited: d.inherited,
    }));

export const unmarshalListEntityTagAssignmentsResponseSchema: z.ZodType<ListEntityTagAssignmentsResponse> =
  z
    .object({
      tag_assignments: z
        .array(z.lazy(() => unmarshalEntityTagAssignmentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      tagAssignments: d.tag_assignments,
      nextPageToken: d.next_page_token,
    }));

export const marshalEntityTagAssignmentSchema: z.ZodType = z
  .object({
    entityName: z.string().optional(),
    tagKey: z.string().optional(),
    tagValue: z.string().optional(),
    entityType: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.string().optional(),
    sourceType: z.enum(TagAssignmentSourceType).optional(),
    inherited: z.boolean().optional(),
  })
  .transform(d => ({
    entity_name: d.entityName,
    tag_key: d.tagKey,
    tag_value: d.tagValue,
    entity_type: d.entityType,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
    source_type: d.sourceType,
    inherited: d.inherited,
  }));

export const marshalListEntityTagAssignmentsResponseSchema: z.ZodType = z
  .object({
    tagAssignments: z
      .array(z.lazy(() => marshalEntityTagAssignmentSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    tag_assignments: d.tagAssignments,
    next_page_token: d.nextPageToken,
  }));

const createEntityTagAssignmentRequestFieldMaskSchema: FieldMaskSchema = {
  tagAssignment: {
    wire: 'tag_assignment',
    children: () => entityTagAssignmentFieldMaskSchema,
  },
};

export function createEntityTagAssignmentRequestFieldMask(
  ...paths: string[]
): FieldMask<CreateEntityTagAssignmentRequest> {
  return FieldMask.build<CreateEntityTagAssignmentRequest>(
    paths,
    createEntityTagAssignmentRequestFieldMaskSchema
  );
}

const deleteEntityTagAssignmentRequestFieldMaskSchema: FieldMaskSchema = {
  entityName: {wire: 'entity_name'},
  entityType: {wire: 'entity_type'},
  tagKey: {wire: 'tag_key'},
};

export function deleteEntityTagAssignmentRequestFieldMask(
  ...paths: string[]
): FieldMask<DeleteEntityTagAssignmentRequest> {
  return FieldMask.build<DeleteEntityTagAssignmentRequest>(
    paths,
    deleteEntityTagAssignmentRequestFieldMaskSchema
  );
}

const entityTagAssignmentFieldMaskSchema: FieldMaskSchema = {
  entityName: {wire: 'entity_name'},
  entityType: {wire: 'entity_type'},
  inherited: {wire: 'inherited'},
  sourceType: {wire: 'source_type'},
  tagKey: {wire: 'tag_key'},
  tagValue: {wire: 'tag_value'},
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by'},
};

export function entityTagAssignmentFieldMask(
  ...paths: string[]
): FieldMask<EntityTagAssignment> {
  return FieldMask.build<EntityTagAssignment>(
    paths,
    entityTagAssignmentFieldMaskSchema
  );
}

const getEntityTagAssignmentRequestFieldMaskSchema: FieldMaskSchema = {
  entityName: {wire: 'entity_name'},
  entityType: {wire: 'entity_type'},
  includeInherited: {wire: 'include_inherited'},
  tagKey: {wire: 'tag_key'},
};

export function getEntityTagAssignmentRequestFieldMask(
  ...paths: string[]
): FieldMask<GetEntityTagAssignmentRequest> {
  return FieldMask.build<GetEntityTagAssignmentRequest>(
    paths,
    getEntityTagAssignmentRequestFieldMaskSchema
  );
}

const listEntityTagAssignmentsRequestFieldMaskSchema: FieldMaskSchema = {
  entityName: {wire: 'entity_name'},
  entityType: {wire: 'entity_type'},
  includeInherited: {wire: 'include_inherited'},
  maxResults: {wire: 'max_results'},
  pageToken: {wire: 'page_token'},
};

export function listEntityTagAssignmentsRequestFieldMask(
  ...paths: string[]
): FieldMask<ListEntityTagAssignmentsRequest> {
  return FieldMask.build<ListEntityTagAssignmentsRequest>(
    paths,
    listEntityTagAssignmentsRequestFieldMaskSchema
  );
}

const listEntityTagAssignmentsResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  tagAssignments: {wire: 'tag_assignments'},
};

export function listEntityTagAssignmentsResponseFieldMask(
  ...paths: string[]
): FieldMask<ListEntityTagAssignmentsResponse> {
  return FieldMask.build<ListEntityTagAssignmentsResponse>(
    paths,
    listEntityTagAssignmentsResponseFieldMaskSchema
  );
}

const updateEntityTagAssignmentRequestFieldMaskSchema: FieldMaskSchema = {
  tagAssignment: {
    wire: 'tag_assignment',
    children: () => entityTagAssignmentFieldMaskSchema,
  },
  updateMask: {wire: 'update_mask'},
};

export function updateEntityTagAssignmentRequestFieldMask(
  ...paths: string[]
): FieldMask<UpdateEntityTagAssignmentRequest> {
  return FieldMask.build<UpdateEntityTagAssignmentRequest>(
    paths,
    updateEntityTagAssignmentRequestFieldMaskSchema
  );
}
