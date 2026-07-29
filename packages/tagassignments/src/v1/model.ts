// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export interface CreateTagAssignment {
  /** The type of entity to which the tag is assigned. Allowed values are apps, dashboards, geniespaces, notebooks */
  entityType: string;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId: string;
  /** The key of the tag. The characters , . : / - = and leading/trailing spaces are not allowed */
  tagKey: string;
  /** The value of the tag */
  tagValue?: string | undefined;
}

export interface CreateTagAssignmentRequest {
  tagAssignment: CreateTagAssignment;
}

export interface DeleteTagAssignmentRequest {
  /** The type of entity to which the tag is assigned. Allowed values are apps, dashboards, geniespaces, notebooks */
  entityType?: string | undefined;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId?: string | undefined;
  /** The key of the tag. The characters , . : / - = and leading/trailing spaces are not allowed */
  tagKey?: string | undefined;
}

export interface GetTagAssignmentRequest {
  /** The type of entity to which the tag is assigned.  Allowed values are apps, dashboards, geniespaces, notebooks */
  entityType?: string | undefined;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId?: string | undefined;
  /** The key of the tag. The characters , . : / - = and leading/trailing spaces are not allowed */
  tagKey?: string | undefined;
}

export interface ListTagAssignmentsRequest {
  /** The type of entity to which the tag is assigned. Allowed values are apps, dashboards, geniespaces, notebooks */
  entityType?: string | undefined;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId?: string | undefined;
  /** Optional. Maximum number of tag assignments to return in a single page */
  pageSize?: number | undefined;
  /** Pagination token to go to the next page of tag assignments. Requests first page if absent. */
  pageToken?: string | undefined;
}

export interface ListTagAssignmentsResponse {
  tagAssignments?: TagAssignment[] | undefined;
  /** Pagination token to request the next page of tag assignments */
  nextPageToken?: string | undefined;
}

export interface TagAssignment {
  /** The type of entity to which the tag is assigned. Allowed values are apps, dashboards, geniespaces, notebooks */
  entityType?: string | undefined;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId?: string | undefined;
  /** The key of the tag. The characters , . : / - = and leading/trailing spaces are not allowed */
  tagKey?: string | undefined;
  /** The value of the tag */
  tagValue?: string | undefined;
}

export interface UpdateTagAssignment {
  /** The type of entity to which the tag is assigned. Allowed values are apps, dashboards, geniespaces, notebooks */
  entityType?: string | undefined;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId?: string | undefined;
  /** The key of the tag. The characters , . : / - = and leading/trailing spaces are not allowed */
  tagKey?: string | undefined;
  /** The value of the tag */
  tagValue?: string | undefined;
}

export interface UpdateTagAssignmentRequest {
  tagAssignment?: UpdateTagAssignment | undefined;
  updateMask?: FieldMask<UpdateTagAssignment> | undefined;
}

export const unmarshalListTagAssignmentsResponseSchema: z.ZodType<ListTagAssignmentsResponse> =
  z
    .object({
      tag_assignments: z
        .array(z.lazy(() => unmarshalTagAssignmentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      tagAssignments: d.tag_assignments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalTagAssignmentSchema: z.ZodType<TagAssignment> = z
  .object({
    entity_type: z.string().optional(),
    entity_id: z.string().optional(),
    tag_key: z.string().optional(),
    tag_value: z.string().optional(),
  })
  .transform(d => ({
    entityType: d.entity_type,
    entityId: d.entity_id,
    tagKey: d.tag_key,
    tagValue: d.tag_value,
  }));

export const marshalCreateTagAssignmentSchema: z.ZodType = z
  .object({
    entityType: z.string(),
    entityId: z.string(),
    tagKey: z.string(),
    tagValue: z.string().optional(),
  })
  .transform(d => ({
    entity_type: d.entityType,
    entity_id: d.entityId,
    tag_key: d.tagKey,
    tag_value: d.tagValue,
  }));

export const marshalUpdateTagAssignmentSchema: z.ZodType = z
  .object({
    entityType: z.string().optional(),
    entityId: z.string().optional(),
    tagKey: z.string().optional(),
    tagValue: z.string().optional(),
  })
  .transform(d => ({
    entity_type: d.entityType,
    entity_id: d.entityId,
    tag_key: d.tagKey,
    tag_value: d.tagValue,
  }));

const updateTagAssignmentFieldMaskSchema: FieldMaskSchema = {
  entityId: {wire: 'entity_id'},
  entityType: {wire: 'entity_type'},
  tagKey: {wire: 'tag_key'},
  tagValue: {wire: 'tag_value'},
};

export function updateTagAssignmentFieldMask(
  ...paths: string[]
): FieldMask<UpdateTagAssignment> {
  return FieldMask.build<UpdateTagAssignment>(
    paths,
    updateTagAssignmentFieldMaskSchema
  );
}
