// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

export interface GetAssignableRolesForResourceRequest {
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /**
   * The resource name for which assignable roles will be listed.
   *
   * Examples | Summary
   * :--- | :---
   * `resource=accounts/<ACCOUNT_ID>` | A resource name for the account.
   * `resource=accounts/<ACCOUNT_ID>/groups/<GROUP_ID>` | A resource name for the group.
   * `resource=accounts/<ACCOUNT_ID>/servicePrincipals/<SP_ID>` | A resource name for the service principal.
   * `resource=accounts/<ACCOUNT_ID>/tagPolicies/<TAG_POLICY_ID>` | A resource name for the tag policy.
   */
  resource?: string | undefined;
}

export interface GetAssignableRolesForResourceResponse {
  roles?: Role[] | undefined;
}

export interface GetRuleSetRequest {
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /**
   * The ruleset name associated with the request.
   *
   * Examples | Summary
   * :--- | :---
   * `name=accounts/<ACCOUNT_ID>/ruleSets/default` | A name for a rule set on the account.
   * `name=accounts/<ACCOUNT_ID>/groups/<GROUP_ID>/ruleSets/default` | A name for a rule set on the group.
   * `name=accounts/<ACCOUNT_ID>/servicePrincipals/<SERVICE_PRINCIPAL_APPLICATION_ID>/ruleSets/default` | A name for a rule set on the service principal.
   * `name=accounts/<ACCOUNT_ID>/tagPolicies/<TAG_POLICY_ID>/ruleSets/default` | A name for a rule set on the tag policy.
   */
  name?: string | undefined;
  /**
   * Etag used for versioning. The response is at least as fresh as the eTag provided. Etag is used for optimistic
   * concurrency control as a way to help prevent simultaneous updates of a rule set from overwriting each other. It is
   * strongly suggested that systems make use of the etag in the read -> modify -> write pattern to perform rule set
   * updates in order to avoid race conditions that is get an etag from a GET rule set request, and pass it with the
   * PUT update request to identify the rule set version you are updating.
   *
   * Examples | Summary
   * :--- | :---
   * `etag=` | An empty etag can only be used in GET to indicate no freshness requirements.
   * `etag=RENUAAABhSweA4NvVmmUYdiU717H3Tgy0UJdor3gE4a+mq/oj9NjAf8ZsQ==` | An etag encoded a specific version of the rule set to get or to be updated.
   */
  etag?: string | undefined;
}

export interface GrantRule {
  /**
   * Principals this grant rule applies to.
   * A principal can be a user (for end users), a service principal (for applications and
   * compute workloads), or an account group. Each principal has its own identifier format:
   * * users/<USERNAME>
   * * groups/<GROUP_NAME>
   * * servicePrincipals/<SERVICE_PRINCIPAL_APPLICATION_ID>
   */
  principals?: string[] | undefined;
  /** Role that is assigned to the list of principals. */
  role?: string | undefined;
}

export interface Role {
  /** Role to assign to a principal or a list of principals on a resource. */
  name?: string | undefined;
}

export interface RuleSet {
  /** Name of the rule set. */
  name?: string | undefined;
  /**
   * Identifies the version of the rule set returned.
   * Etag used for versioning. The response is at least as fresh as the eTag provided.
   * Etag is used for optimistic concurrency control as a way to help prevent simultaneous
   * updates of a rule set from overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> modify -> write pattern to perform rule set updates in
   * order to avoid race conditions that is get an etag from a GET rule set request, and pass it
   * with the PUT update request to identify the rule set version you are updating.
   */
  etag?: string | undefined;
  grantRules?: GrantRule[] | undefined;
}

export interface RuleSetUpdateRequest {
  /** Name of the rule set. */
  name?: string | undefined;
  /**
   * Identifies the version of the rule set returned.
   * Etag used for versioning. The response is at least as fresh as the eTag provided.
   * Etag is used for optimistic concurrency control as a way to help prevent simultaneous
   * updates of a rule set from overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> modify -> write pattern to perform rule set updates in
   * order to avoid race conditions that is get an etag from a GET rule set request, and pass it
   * with the PUT update request to identify the rule set version you are updating.
   */
  etag?: string | undefined;
  grantRules?: GrantRule[] | undefined;
}

export interface UpdateRuleSetRequest {
  /** <Databricks> account ID. */
  accountId?: string | undefined;
  /** Name of the rule set. */
  name?: string | undefined;
  ruleSet?: RuleSetUpdateRequest | undefined;
}

export const unmarshalGetAssignableRolesForResourceRequestSchema: z.ZodType<GetAssignableRolesForResourceRequest> =
  z
    .object({
      account_id: z.string().optional(),
      resource: z.string().optional(),
    })
    .transform(d => ({
      accountId: d.account_id,
      resource: d.resource,
    }));

export const unmarshalGetAssignableRolesForResourceResponseSchema: z.ZodType<GetAssignableRolesForResourceResponse> =
  z
    .object({
      roles: z.array(z.lazy(() => unmarshalRoleSchema)).optional(),
    })
    .transform(d => ({
      roles: d.roles,
    }));

export const unmarshalGetRuleSetRequestSchema: z.ZodType<GetRuleSetRequest> = z
  .object({
    account_id: z.string().optional(),
    name: z.string().optional(),
    etag: z.string().optional(),
  })
  .transform(d => ({
    accountId: d.account_id,
    name: d.name,
    etag: d.etag,
  }));

export const unmarshalGrantRuleSchema: z.ZodType<GrantRule> = z
  .object({
    principals: z.array(z.string()).optional(),
    role: z.string().optional(),
  })
  .transform(d => ({
    principals: d.principals,
    role: d.role,
  }));

export const unmarshalRoleSchema: z.ZodType<Role> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalRuleSetSchema: z.ZodType<RuleSet> = z
  .object({
    name: z.string().optional(),
    etag: z.string().optional(),
    grant_rules: z.array(z.lazy(() => unmarshalGrantRuleSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    etag: d.etag,
    grantRules: d.grant_rules,
  }));

export const unmarshalRuleSetUpdateRequestSchema: z.ZodType<RuleSetUpdateRequest> =
  z
    .object({
      name: z.string().optional(),
      etag: z.string().optional(),
      grant_rules: z.array(z.lazy(() => unmarshalGrantRuleSchema)).optional(),
    })
    .transform(d => ({
      name: d.name,
      etag: d.etag,
      grantRules: d.grant_rules,
    }));

export const unmarshalUpdateRuleSetRequestSchema: z.ZodType<UpdateRuleSetRequest> =
  z
    .object({
      account_id: z.string().optional(),
      name: z.string().optional(),
      rule_set: z.lazy(() => unmarshalRuleSetUpdateRequestSchema).optional(),
    })
    .transform(d => ({
      accountId: d.account_id,
      name: d.name,
      ruleSet: d.rule_set,
    }));

export const marshalGetAssignableRolesForResourceRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    resource: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    resource: d.resource,
  }));

export const marshalGetAssignableRolesForResourceResponseSchema: z.ZodType = z
  .object({
    roles: z.array(z.lazy(() => marshalRoleSchema)).optional(),
  })
  .transform(d => ({
    roles: d.roles,
  }));

export const marshalGetRuleSetRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    name: z.string().optional(),
    etag: z.string().optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    name: d.name,
    etag: d.etag,
  }));

export const marshalGrantRuleSchema: z.ZodType = z
  .object({
    principals: z.array(z.string()).optional(),
    role: z.string().optional(),
  })
  .transform(d => ({
    principals: d.principals,
    role: d.role,
  }));

export const marshalRoleSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalRuleSetSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    etag: z.string().optional(),
    grantRules: z.array(z.lazy(() => marshalGrantRuleSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    etag: d.etag,
    grant_rules: d.grantRules,
  }));

export const marshalRuleSetUpdateRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    etag: z.string().optional(),
    grantRules: z.array(z.lazy(() => marshalGrantRuleSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    etag: d.etag,
    grant_rules: d.grantRules,
  }));

export const marshalUpdateRuleSetRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    name: z.string().optional(),
    ruleSet: z.lazy(() => marshalRuleSetUpdateRequestSchema).optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    name: d.name,
    rule_set: d.ruleSet,
  }));
