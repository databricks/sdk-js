// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** Returns the details of a policy family at a specific version */
export interface GetPolicyFamily {
  /** The family ID about which to retrieve information. */
  policyFamilyId?: string | undefined;
  /** The version number for the family to fetch. Defaults to the latest version. */
  version?: number | undefined;
}

/** Returns the list of policy families available to use at their latest version */
export interface ListPolicyFamilies {
  /** Maximum number of policy families to return. */
  maxResults?: number | undefined;
  /** A token that can be used to get the next page of results. */
  pageToken?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListPolicyFamilies_Response {
  /** List of policy families. */
  policyFamilies?: PolicyFamily[] | undefined;
  /** A token that can be used to get the next page of results. If not present, there are no more results to show. */
  nextPageToken?: string | undefined;
}

export interface PolicyFamily {
  /** Unique identifier for the policy family. */
  policyFamilyId?: string | undefined;
  /** Name of the policy family. */
  name?: string | undefined;
  /** Human-readable description of the purpose of the policy family. */
  description?: string | undefined;
  /** Policy definition document expressed in [Databricks Cluster Policy Definition Language](https://docs.databricks.com/administration-guide/clusters/policy-definition.html). */
  definition?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListPolicyFamilies_ResponseSchema: z.ZodType<ListPolicyFamilies_Response> =
  z
    .object({
      policy_families: z
        .array(z.lazy(() => unmarshalPolicyFamilySchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      policyFamilies: d.policy_families,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalPolicyFamilySchema: z.ZodType<PolicyFamily> = z
  .object({
    policy_family_id: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    definition: z.string().optional(),
  })
  .transform(d => ({
    policyFamilyId: d.policy_family_id,
    name: d.name,
    description: d.description,
    definition: d.definition,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListPolicyFamilies_ResponseSchema: z.ZodType = z
  .object({
    policyFamilies: z.array(z.lazy(() => marshalPolicyFamilySchema)).optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    policy_families: d.policyFamilies,
    next_page_token: d.nextPageToken,
  }));

export const marshalPolicyFamilySchema: z.ZodType = z
  .object({
    policyFamilyId: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    definition: z.string().optional(),
  })
  .transform(d => ({
    policy_family_id: d.policyFamilyId,
    name: d.name,
    description: d.description,
    definition: d.definition,
  }));
