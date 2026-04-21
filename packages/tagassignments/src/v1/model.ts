// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface CreateTagAssignmentRequest {
  tagAssignment?: TagAssignment | undefined;
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

export interface UpdateTagAssignmentRequest {
  tagAssignment?: TagAssignment | undefined;
  updateMask?: string | undefined;
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

export const marshalListTagAssignmentsResponseSchema: z.ZodType = z
  .object({
    tagAssignments: z
      .array(z.lazy(() => marshalTagAssignmentSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    tag_assignments: d.tagAssignments,
    next_page_token: d.nextPageToken,
  }));

export const marshalTagAssignmentSchema: z.ZodType = z
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
