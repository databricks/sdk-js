// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Enum representing the source type of a tag assignment */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TagAssignmentSourceType = {
  /** Includes (but not limited to) tags manually assigned by users */
  TAG_ASSIGNMENT_SOURCE_TYPE_UNSPECIFIED:
    'TAG_ASSIGNMENT_SOURCE_TYPE_UNSPECIFIED',
  /** Automatically assigned by Data Classification */
  TAG_ASSIGNMENT_SOURCE_TYPE_SYSTEM_DATA_CLASSIFICATION:
    'TAG_ASSIGNMENT_SOURCE_TYPE_SYSTEM_DATA_CLASSIFICATION',
} as const;
export type TagAssignmentSourceType =
  | (typeof TagAssignmentSourceType)[keyof typeof TagAssignmentSourceType]
  | (string & {});

/** Represents a tag assignment to an entity */
export interface CreateEntityTagAssignment {
  /** The fully qualified name of the entity to which the tag is assigned */
  entityName: string;
  /** The key of the tag */
  tagKey: string;
  /** The value of the tag */
  tagValue?: string | undefined;
  /** The type of the entity to which the tag is assigned. */
  entityType: string;
}

/** Request to create a new entity tag assignment */
export interface CreateEntityTagAssignmentRequest {
  tagAssignment: CreateEntityTagAssignment;
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
}

/** Request to get an entity tag assignment */
export interface GetEntityTagAssignmentRequest {
  /** The fully qualified name of the entity to which the tag is assigned */
  entityName?: string | undefined;
  /** Required. The key of the tag */
  tagKey?: string | undefined;
  /** The type of the entity to which the tag is assigned. */
  entityType?: string | undefined;
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
}

export interface ListEntityTagAssignmentsResponse {
  /** The list of tag assignments */
  tagAssignments?: EntityTagAssignment[] | undefined;
  /** Optional. Pagination token for retrieving the next page of results */
  nextPageToken?: string | undefined;
}

/** Represents a tag assignment to an entity */
export interface UpdateEntityTagAssignment {
  /** The fully qualified name of the entity to which the tag is assigned */
  entityName?: string | undefined;
  /** The key of the tag */
  tagKey?: string | undefined;
  /** The value of the tag */
  tagValue?: string | undefined;
  /** The type of the entity to which the tag is assigned. */
  entityType?: string | undefined;
}

/** Request to update an entity tag assignment */
export interface UpdateEntityTagAssignmentRequest {
  tagAssignment?: UpdateEntityTagAssignment | undefined;
  updateMask?: FieldMask<UpdateEntityTagAssignment> | undefined;
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
      source_type: z.string().optional(),
    })
    .transform(d => ({
      entityName: d.entity_name,
      tagKey: d.tag_key,
      tagValue: d.tag_value,
      entityType: d.entity_type,
      updateTime: d.update_time,
      updatedBy: d.updated_by,
      sourceType: d.source_type,
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

export const marshalCreateEntityTagAssignmentSchema: z.ZodType = z
  .object({
    entityName: z.string(),
    tagKey: z.string(),
    tagValue: z.string().optional(),
    entityType: z.string(),
  })
  .transform(d => ({
    entity_name: d.entityName,
    tag_key: d.tagKey,
    tag_value: d.tagValue,
    entity_type: d.entityType,
  }));

export const marshalUpdateEntityTagAssignmentSchema: z.ZodType = z
  .object({
    entityName: z.string().optional(),
    tagKey: z.string().optional(),
    tagValue: z.string().optional(),
    entityType: z.string().optional(),
  })
  .transform(d => ({
    entity_name: d.entityName,
    tag_key: d.tagKey,
    tag_value: d.tagValue,
    entity_type: d.entityType,
  }));

const updateEntityTagAssignmentFieldMaskSchema: FieldMaskSchema = {
  entityName: {wire: 'entity_name'},
  entityType: {wire: 'entity_type'},
  tagKey: {wire: 'tag_key'},
  tagValue: {wire: 'tag_value'},
};

export function updateEntityTagAssignmentFieldMask(
  ...paths: string[]
): FieldMask<UpdateEntityTagAssignment> {
  return FieldMask.build<UpdateEntityTagAssignment>(
    paths,
    updateEntityTagAssignmentFieldMaskSchema
  );
}
