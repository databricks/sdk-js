// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {z} from 'zod';

/** Policy that determines how to resolve conflicts when multiple upstream sources have different tag values. */
export interface ConflictResolutionPolicy {
  /** Uses a specified default value to override when conflicts happen. */
  defaultValueOverride?: DefaultValueOverridePolicy | undefined;
}

export interface CreateTagPolicyRequest {
  tagPolicy?: TagPolicy | undefined;
}

/** Policy that specifies a default value to use when resolving tag conflicts during propagation. */
export interface DefaultValueOverridePolicy {
  /** The tag value to apply when conflicts are detected. This value must be one of the allowed values defined in the tag policy. */
  defaultValue?: string | undefined;
}

export interface DeleteTagPolicyRequest {
  tagKey?: string | undefined;
}

export interface GetTagPolicyRequest {
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

/** Configuration that controls how tags are automatically propagated through data lineage. */
export interface PropagationConfig {
  /** Determines whether this tag should automatically propagate through lineage. */
  enabled?: boolean | undefined;
  /** Policy that determines how to resolve conflicts when multiple upstream sources have different tag values. */
  conflictResolution?: ConflictResolutionPolicy | undefined;
}

export interface TagPolicy {
  tagKey?: string | undefined;
  id?: string | undefined;
  description?: string | undefined;
  values?: Value[] | undefined;
  /** Timestamp when the tag policy was created */
  createTime?: Temporal.Instant | undefined;
  /** Timestamp when the tag policy was last updated */
  updateTime?: Temporal.Instant | undefined;
  /** Configuration that controls how tags are automatically propagated through data lineage. */
  propagationConfig?: PropagationConfig | undefined;
  /** The account ID that owns this tag policy. */
  accountId?: string | undefined;
}

export interface UpdateTagPolicyRequest {
  tagPolicy?: TagPolicy | undefined;
  updateMask?: string | undefined;
}

export interface Value {
  name?: string | undefined;
}

export const unmarshalConflictResolutionPolicySchema: z.ZodType<ConflictResolutionPolicy> =
  z
    .object({
      default_value_override: z
        .lazy(() => unmarshalDefaultValueOverridePolicySchema)
        .optional(),
    })
    .transform(d => ({
      defaultValueOverride: d.default_value_override,
    }));

export const unmarshalCreateTagPolicyRequestSchema: z.ZodType<CreateTagPolicyRequest> =
  z
    .object({
      tag_policy: z.lazy(() => unmarshalTagPolicySchema).optional(),
    })
    .transform(d => ({
      tagPolicy: d.tag_policy,
    }));

export const unmarshalDefaultValueOverridePolicySchema: z.ZodType<DefaultValueOverridePolicy> =
  z
    .object({
      default_value: z.string().optional(),
    })
    .transform(d => ({
      defaultValue: d.default_value,
    }));

export const unmarshalDeleteTagPolicyRequestSchema: z.ZodType<DeleteTagPolicyRequest> =
  z
    .object({
      tag_key: z.string().optional(),
    })
    .transform(d => ({
      tagKey: d.tag_key,
    }));

export const unmarshalGetTagPolicyRequestSchema: z.ZodType<GetTagPolicyRequest> =
  z
    .object({
      tag_key: z.string().optional(),
    })
    .transform(d => ({
      tagKey: d.tag_key,
    }));

export const unmarshalListTagPoliciesRequestSchema: z.ZodType<ListTagPoliciesRequest> =
  z
    .object({
      page_size: z.number().optional(),
      page_token: z.string().optional(),
    })
    .transform(d => ({
      pageSize: d.page_size,
      pageToken: d.page_token,
    }));

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

export const unmarshalPropagationConfigSchema: z.ZodType<PropagationConfig> = z
  .object({
    enabled: z.boolean().optional(),
    conflict_resolution: z
      .lazy(() => unmarshalConflictResolutionPolicySchema)
      .optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
    conflictResolution: d.conflict_resolution,
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
    propagation_config: z
      .lazy(() => unmarshalPropagationConfigSchema)
      .optional(),
    account_id: z.string().optional(),
  })
  .transform(d => ({
    tagKey: d.tag_key,
    id: d.id,
    description: d.description,
    values: d.values,
    createTime: d.create_time,
    updateTime: d.update_time,
    propagationConfig: d.propagation_config,
    accountId: d.account_id,
  }));

export const unmarshalUpdateTagPolicyRequestSchema: z.ZodType<UpdateTagPolicyRequest> =
  z
    .object({
      tag_policy: z.lazy(() => unmarshalTagPolicySchema).optional(),
      update_mask: z.string().optional(),
    })
    .transform(d => ({
      tagPolicy: d.tag_policy,
      updateMask: d.update_mask,
    }));

export const unmarshalValueSchema: z.ZodType<Value> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalConflictResolutionPolicySchema: z.ZodType = z
  .object({
    defaultValueOverride: z
      .lazy(() => marshalDefaultValueOverridePolicySchema)
      .optional(),
  })
  .transform(d => ({
    default_value_override: d.defaultValueOverride,
  }));

export const marshalCreateTagPolicyRequestSchema: z.ZodType = z
  .object({
    tagPolicy: z.lazy(() => marshalTagPolicySchema).optional(),
  })
  .transform(d => ({
    tag_policy: d.tagPolicy,
  }));

export const marshalDefaultValueOverridePolicySchema: z.ZodType = z
  .object({
    defaultValue: z.string().optional(),
  })
  .transform(d => ({
    default_value: d.defaultValue,
  }));

export const marshalDeleteTagPolicyRequestSchema: z.ZodType = z
  .object({
    tagKey: z.string().optional(),
  })
  .transform(d => ({
    tag_key: d.tagKey,
  }));

export const marshalGetTagPolicyRequestSchema: z.ZodType = z
  .object({
    tagKey: z.string().optional(),
  })
  .transform(d => ({
    tag_key: d.tagKey,
  }));

export const marshalListTagPoliciesRequestSchema: z.ZodType = z
  .object({
    pageSize: z.number().optional(),
    pageToken: z.string().optional(),
  })
  .transform(d => ({
    page_size: d.pageSize,
    page_token: d.pageToken,
  }));

export const marshalListTagPoliciesResponseSchema: z.ZodType = z
  .object({
    tagPolicies: z.array(z.lazy(() => marshalTagPolicySchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    tag_policies: d.tagPolicies,
    next_page_token: d.nextPageToken,
  }));

export const marshalPropagationConfigSchema: z.ZodType = z
  .object({
    enabled: z.boolean().optional(),
    conflictResolution: z
      .lazy(() => marshalConflictResolutionPolicySchema)
      .optional(),
  })
  .transform(d => ({
    enabled: d.enabled,
    conflict_resolution: d.conflictResolution,
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
    propagationConfig: z.lazy(() => marshalPropagationConfigSchema).optional(),
    accountId: z.string().optional(),
  })
  .transform(d => ({
    tag_key: d.tagKey,
    id: d.id,
    description: d.description,
    values: d.values,
    create_time: d.createTime,
    update_time: d.updateTime,
    propagation_config: d.propagationConfig,
    account_id: d.accountId,
  }));

export const marshalUpdateTagPolicyRequestSchema: z.ZodType = z
  .object({
    tagPolicy: z.lazy(() => marshalTagPolicySchema).optional(),
    updateMask: z.string().optional(),
  })
  .transform(d => ({
    tag_policy: d.tagPolicy,
    update_mask: d.updateMask,
  }));

export const marshalValueSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));
