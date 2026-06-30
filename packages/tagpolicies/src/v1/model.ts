// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export interface CreateTagPolicyRequest {
  /** Required. This field must be set in requests. */
  tagPolicy?: TagPolicy | undefined;
}

export interface DeleteTagPolicyRequest {
  /** Required. This field must be set in requests. */
  tagKey?: string | undefined;
}

export interface GetTagPolicyRequest {
  /** Required. This field must be set in requests. */
  tagKey?: string | undefined;
}

export interface ListTagPoliciesRequest {
  /**
   * The maximum number of results to return in this request. Fewer results may be returned than requested. If
   * unspecified or set to 0, this defaults to 1000. The maximum value is 1000; values above 1000 will be coerced down
   * to 1000.
   */
  pageSize?: number | undefined;
  /** An optional page token received from a previous list tag policies call. */
  pageToken?: string | undefined;
}

export interface ListTagPoliciesResponse {
  tagPolicies?: TagPolicy[] | undefined;
  nextPageToken?: string | undefined;
}

export interface TagPolicy {
  /** Required. This field must be set in requests. Immutable. Set this field when the resource is created; it cannot be changed afterward. */
  tagKey?: string | undefined;
  /** Output only. The server sets this field in responses; any value sent in a request is ignored. */
  id?: string | undefined;
  description?: string | undefined;
  values?: Value[] | undefined;
  /**
   * Timestamp when the tag policy was created
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  createTime?: Temporal.Instant | undefined;
  /**
   * Timestamp when the tag policy was last updated
   *
   * Output only. The server sets this field in responses; any value sent in a request is ignored.
   */
  updateTime?: Temporal.Instant | undefined;
}

export interface UpdateTagPolicyRequest {
  /** Required. This field must be set in requests. */
  tagPolicy?: TagPolicy | undefined;
  /** Required. This field must be set in requests. */
  updateMask?: FieldMask<TagPolicy> | undefined;
}

export interface Value {
  /** Required. This field must be set in requests. */
  name?: string | undefined;
}

export const unmarshalListTagPoliciesResponseSchema: z.ZodType<ListTagPoliciesResponse> =
  z
    .object({
      tag_policies: z.array(z.lazy(() => unmarshalTagPolicySchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      tagPolicies: d.tag_policies,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalTagPolicySchema: z.ZodType<TagPolicy> = z
  .object({
    tag_key: z.string().optional(),
    id: z.string().optional(),
    description: z.string().optional(),
    values: z.array(z.lazy(() => unmarshalValueSchema)).optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    tagKey: d.tag_key,
    id: d.id,
    description: d.description,
    values: d.values,
    createTime: d.create_time,
    updateTime: d.update_time,
  }));

export const unmarshalValueSchema: z.ZodType<Value> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalTagPolicySchema: z.ZodType = z
  .object({
    tagKey: z.string().optional(),
    id: z.string().optional(),
    description: z.string().optional(),
    values: z.array(z.lazy(() => marshalValueSchema)).optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    tag_key: d.tagKey,
    id: d.id,
    description: d.description,
    values: d.values,
    create_time: d.createTime,
    update_time: d.updateTime,
  }));

export const marshalValueSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

const tagPolicyFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  description: {wire: 'description'},
  id: {wire: 'id'},
  tagKey: {wire: 'tag_key'},
  updateTime: {wire: 'update_time'},
  values: {wire: 'values'},
};

export function tagPolicyFieldMask(...paths: string[]): FieldMask<TagPolicy> {
  return FieldMask.build<TagPolicy>(paths, tagPolicyFieldMaskSchema);
}
