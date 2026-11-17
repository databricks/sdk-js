// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
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
  /** The type of entity to which the tag is assigned. Allowed values are apps, dashboards, geniespaces, notebooks */
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

/**
 * A tag assignment attaches a tag, which is a key with an optional value, to a workspace object such
 * as a dashboard, notebook, Genie space or app. An object can have at most one assignment for each tag
 * key. If the key belongs to a governed tag, the caller needs the ASSIGN permission on that governed
 * tag, and the value must be one of its allowed values. See
 * https://docs.databricks.com/aws/en/admin/governed-tags/.
 */
export interface TagAssignment {
  /** The type of entity to which the tag is assigned. Allowed values are apps, dashboards, geniespaces, notebooks */
  entityType?: string | undefined;
  /** The identifier of the entity to which the tag is assigned. For apps, the entity_id is the app name */
  entityId?: string | undefined;
  /** The key of the tag. The characters , . : / - = and leading/trailing spaces are not allowed */
  tagKey?: string | undefined;
  /** The value of the tag. If the value is omitted, the tag is assigned with its key only. */
  tagValue?: string | undefined;
}

export interface UpdateTagAssignmentRequest {
  tagAssignment?: TagAssignment | undefined;
  /**
   * The comma-separated list of fields to update. Only `tag_value` can be updated, because the entity
   * type, entity ID and tag key identify the tag assignment.
   */
  updateMask?: FieldMask<TagAssignment> | undefined;
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
