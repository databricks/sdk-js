// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export interface CreateTagAssignmentRequest {
  tagAssignment: TagAssignment;
}

export interface DeleteTagAssignmentRequest {
  /** The type of entity to which the tag is assigned. Allowed values are apps, dashboards, geniespaces, notebooks */
  entityType: string;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId: string;
  /** The key of the tag. The characters , . : / - = and leading/trailing spaces are not allowed */
  tagKey: string;
}

export interface GetTagAssignmentRequest {
  /** The type of entity to which the tag is assigned.  Allowed values are apps, dashboards, geniespaces, notebooks */
  entityType: string;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId: string;
  /** The key of the tag. The characters , . : / - = and leading/trailing spaces are not allowed */
  tagKey: string;
}

export interface ListTagAssignmentsRequest {
  /** The type of entity to which the tag is assigned. Allowed values are apps, dashboards, geniespaces, notebooks */
  entityType: string;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId: string;
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
  entityType: string;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId: string;
  /** The key of the tag. The characters , . : / - = and leading/trailing spaces are not allowed */
  tagKey: string;
  /** The value of the tag */
  tagValue?: string | undefined;
}

export interface UpdateTagAssignmentRequest {
  tagAssignment: TagAssignment;
  updateMask: FieldMask<TagAssignment>;
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
    entity_type: z.string(),
    entity_id: z.string(),
    tag_key: z.string(),
    tag_value: z.string().optional(),
  })
  .transform(d => ({
    entityType: d.entity_type,
    entityId: d.entity_id,
    tagKey: d.tag_key,
    tagValue: d.tag_value,
  }));

export const marshalTagAssignmentSchema: z.ZodType = z
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

const tagAssignmentFieldMaskSchema: FieldMaskSchema = {
  entityId: {wire: 'entity_id'},
  entityType: {wire: 'entity_type'},
  tagKey: {wire: 'tag_key'},
  tagValue: {wire: 'tag_value'},
};

export function tagAssignmentFieldMask(
  ...paths: string[]
): FieldMask<TagAssignment> {
  return FieldMask.build<TagAssignment>(paths, tagAssignmentFieldMaskSchema);
}
