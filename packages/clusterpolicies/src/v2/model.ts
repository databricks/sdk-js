// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ListOrder = {
  DESC: 'DESC',
  ASC: 'ASC',
} as const;
export type ListOrder =
  | (typeof ListOrder)[keyof typeof ListOrder]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PolicySortColumn = {
  /** Sort result list by policy creation time. */
  POLICY_CREATION_TIME: 'POLICY_CREATION_TIME',
  /** Sort result list by policy name. */
  POLICY_NAME: 'POLICY_NAME',
} as const;
export type PolicySortColumn =
  | (typeof PolicySortColumn)[keyof typeof PolicySortColumn]
  | (string & {});

/** T-shirt size for per-workload Spark executor limits. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const TshirtSize = {
  /** Default value; no per-workload rate limit specified. */
  T_SHIRT_SIZE_UNSPECIFIED: 'T_SHIRT_SIZE_UNSPECIFIED',
  /** Small per-workload Spark executor limit. */
  T_SHIRT_SIZE_SMALL: 'T_SHIRT_SIZE_SMALL',
  /** Medium per-workload Spark executor limit. */
  T_SHIRT_SIZE_MEDIUM: 'T_SHIRT_SIZE_MEDIUM',
  /** Large per-workload Spark executor limit. */
  T_SHIRT_SIZE_LARGE: 'T_SHIRT_SIZE_LARGE',
  /** Extra-large per-workload Spark executor limit. */
  T_SHIRT_SIZE_X_LARGE: 'T_SHIRT_SIZE_X_LARGE',
  /** Double extra-large per-workload Spark executor limit. */
  T_SHIRT_SIZE_2X_LARGE: 'T_SHIRT_SIZE_2X_LARGE',
  /** Triple extra-large per-workload Spark executor limit. */
  T_SHIRT_SIZE_3X_LARGE: 'T_SHIRT_SIZE_3X_LARGE',
  /** Quadruple extra-large per-workload Spark executor limit. */
  T_SHIRT_SIZE_4X_LARGE: 'T_SHIRT_SIZE_4X_LARGE',
} as const;
export type TshirtSize =
  | (typeof TshirtSize)[keyof typeof TshirtSize]
  | (string & {});

/**
 * Compute products allowed by a policy and their product-specific constraints. At least one
 * product must be set.
 */
export interface AllowedComputeProducts {
  /** Constraints for serverless automated compute. Absence disallows automated compute. */
  automated?: AutomatedConstraints | undefined;
  /** Constraints for Lakebase instances. Absence disallows Lakebase. */
  lakebase?: LakebaseConstraints | undefined;
}

/** Constraints applied to serverless automated workloads by a compute policy. */
export interface AutomatedConstraints {
  /** Maximum per-workload Spark executor allocation. Absence imposes no limit. */
  perWorkloadMax?: RateLimitConfig | undefined;
}

/**
 * A compute policy resource. A workspace-scoped policy that allows one or more compute products,
 * each with product-specific constraints.
 */
export interface ComputePolicy {
  /** The unique identifier of the compute policy (UUID). Server-assigned on create. */
  computePolicyId?: string | undefined;
  /** The display name of the compute policy. */
  displayName?: string | undefined;
  /**
   * The compute products allowed by this policy and their constraints. At least one product must
   * be set.
   */
  allowedComputeProducts?: AllowedComputeProducts | undefined;
  /**
   * User-defined key/value tags on the compute policy, provided at creation and validated.
   * unified-tagging is the system of record for tag assignments.
   */
  tags?: Record<string, string> | undefined;
  /**
   * Whether this is the workspace default policy for its single allowed compute product. Default
   * policies are system-provisioned and cannot be deleted or renamed.
   */
  isDefault?: boolean | undefined;
  /** The creation timestamp. */
  createTime?: Temporal.Instant | undefined;
  /** Whether the calling user has use permission on this compute policy. */
  canUse?: boolean | undefined;
  /**
   * Whether the calling user has manage permission on this compute policy. Manage includes use, so
   * can_use is also true whenever this is true.
   */
  canManage?: boolean | undefined;
}

export interface CreatePolicyRequest {
  /**
   * Cluster Policy name requested by the user. This has to be unique. Length must be between 1 and 100
   * characters.
   */
  name?: string | undefined;
  /** Policy definition document expressed in [Databricks Cluster Policy Definition Language](https://docs.databricks.com/administration-guide/clusters/policy-definition.html). */
  definition?: string | undefined;
  /** Additional human-readable description of the cluster policy. */
  description?: string | undefined;
  /**
   * ID of the policy family. The cluster policy's policy definition inherits the policy
   * family's policy definition.
   *
   * Cannot be used with `definition`. Use `policy_family_definition_overrides` instead to
   * customize the policy definition.
   */
  policyFamilyId?: string | undefined;
  /**
   * Policy definition JSON document expressed in [Databricks Policy Definition Language](https://docs.databricks.com/administration-guide/clusters/policy-definition.html).
   * The JSON document must be passed as a string and cannot be embedded in the requests.
   *
   * You can use this to customize the policy definition inherited from the policy family.
   * Policy rules specified here are merged into the inherited policy definition.
   */
  policyFamilyDefinitionOverrides?: string | undefined;
  /** Max number of clusters per user that can be active using this policy. If not present, there is no max limit. */
  maxClustersPerUser?: bigint | undefined;
  /** A list of libraries to be installed on the next cluster restart that uses this policy. The maximum number of libraries is 500. */
  libraries?: Library[] | undefined;
}

export interface CreatePolicyResponse {
  /** Canonical unique identifier for the cluster policy. */
  policyId?: string | undefined;
}

export interface DeletePolicyRequest {
  /** The ID of the policy to delete. */
  policyId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeletePolicyResponse {}

export interface EditPolicyRequest {
  /** The ID of the policy to update. */
  policyId?: string | undefined;
  /**
   * Cluster Policy name requested by the user. This has to be unique. Length must be between 1 and 100
   * characters.
   */
  name?: string | undefined;
  /** Policy definition document expressed in [Databricks Cluster Policy Definition Language](https://docs.databricks.com/administration-guide/clusters/policy-definition.html). */
  definition?: string | undefined;
  /** Additional human-readable description of the cluster policy. */
  description?: string | undefined;
  /**
   * ID of the policy family. The cluster policy's policy definition inherits the policy
   * family's policy definition.
   *
   * Cannot be used with `definition`. Use `policy_family_definition_overrides` instead to
   * customize the policy definition.
   */
  policyFamilyId?: string | undefined;
  /**
   * Policy definition JSON document expressed in [Databricks Policy Definition Language](https://docs.databricks.com/administration-guide/clusters/policy-definition.html).
   * The JSON document must be passed as a string and cannot be embedded in the requests.
   *
   * You can use this to customize the policy definition inherited from the policy family.
   * Policy rules specified here are merged into the inherited policy definition.
   */
  policyFamilyDefinitionOverrides?: string | undefined;
  /** Max number of clusters per user that can be active using this policy. If not present, there is no max limit. */
  maxClustersPerUser?: bigint | undefined;
  /** A list of libraries to be installed on the next cluster restart that uses this policy. The maximum number of libraries is 500. */
  libraries?: Library[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EditPolicyResponse {}

export interface GetPolicyRequest {
  /** Canonical unique identifier for the Cluster Policy. */
  policyId?: string | undefined;
}

/** Constraints applied to Lakebase instances by a compute policy. */
export interface LakebaseConstraints {
  /** Maximum capacity units permitted per instance. Absence imposes no limit. */
  maxCapacityUnitsPerInstance?: bigint | undefined;
  /** Maximum idle time in minutes before scale-to-zero. Absence imposes no requirement. */
  maxIdleMinutesBeforeScaleToZero?: bigint | undefined;
}

export interface Library {
  lib?:
    | {
        $case: 'jar';
        /**
         * URI of the JAR library to install. Supported URIs include Workspace paths, Unity Catalog Volumes paths, and S3 URIs.
         * For example: `{ "jar": "/Workspace/path/to/library.jar" }`, `{ "jar" : "/Volumes/path/to/library.jar" }` or
         * `{ "jar": "s3://my-bucket/library.jar" }`.
         * If S3 is used, please make sure the cluster has read access on the library. You may need to
         * launch the cluster with an IAM role to access the S3 URI.
         */
        jar: string;
      }
    | {
        $case: 'egg';
        /** Deprecated. URI of the egg library to install. Installing Python egg files is deprecated and is not supported in Databricks Runtime 14.0 and above. */
        egg: string;
      }
    | {
        $case: 'pypi';
        /**
         * Specification of a PyPi library to be installed. For example:
         * `{ "package": "simplejson" }`
         */
        pypi: PythonPyPiLibrary;
      }
    | {
        $case: 'maven';
        /**
         * Specification of a maven library to be installed. For example:
         * `{ "coordinates": "org.jsoup:jsoup:1.7.2" }`
         */
        maven: MavenLibrary;
      }
    | {
        $case: 'cran';
        /** Specification of a CRAN library to be installed as part of the library */
        cran: RCranLibrary;
      }
    | {
        $case: 'whl';
        /**
         * URI of the wheel library to install. Supported URIs include Workspace paths, Unity Catalog Volumes paths, and S3 URIs.
         * For example: `{ "whl": "/Workspace/path/to/library.whl" }`, `{ "whl" : "/Volumes/path/to/library.whl" }` or
         * `{ "whl": "s3://my-bucket/library.whl" }`.
         * If S3 is used, please make sure the cluster has read access on the library. You may need to
         * launch the cluster with an IAM role to access the S3 URI.
         */
        whl: string;
      }
    | {
        $case: 'requirements';
        /**
         * URI of the requirements.txt file to install. Only Workspace paths and Unity Catalog Volumes paths are supported.
         * For example: `{ "requirements": "/Workspace/path/to/requirements.txt" }` or `{ "requirements" : "/Volumes/path/to/requirements.txt" }`
         */
        requirements: string;
      }
    | undefined;
}

/** Request to list compute policies in a workspace. */
export interface ListComputePoliciesRequest {
  /**
   * Maximum number of policies to return per response. Unset or zero defaults to 100. The server
   * caps requests above 150.
   */
  pageSize?: number | undefined;
  /** Token for cursor-based pagination. */
  pageToken?: string | undefined;
}

/** Response for listing compute policies. */
export interface ListComputePoliciesResponse {
  /** The list of compute policies. */
  computePolicies?: ComputePolicy[] | undefined;
  /** Token for the next page of results. Empty if no more results. */
  nextPageToken?: string | undefined;
}

export interface ListPoliciesRequest {
  /**
   * The order in which the policies get listed.
   * * `DESC` - Sort result list in descending order.
   * * `ASC` - Sort result list in ascending order.
   */
  sortOrder?: ListOrder | undefined;
  /**
   * The cluster policy attribute to sort by.
   * * `POLICY_CREATION_TIME` - Sort result list by policy creation time.
   * * `POLICY_NAME` - Sort result list by policy name.
   */
  sortColumn?: PolicySortColumn | undefined;
}

export interface ListPoliciesResponse {
  /** List of policies. */
  policies?: Policy[] | undefined;
}

/** Request to list serverless computes in a workspace. */
export interface ListServerlessComputesRequest {
  /**
   * Maximum number of computes to return per response. Unset or zero defaults
   * to 100. The server caps requests above 150 to bound per-request RBAC fan-out.
   */
  pageSize?: number | undefined;
  /** Token for cursor-based pagination. */
  pageToken?: string | undefined;
}

/** Response for listing serverless computes. */
export interface ListServerlessComputesResponse {
  /** The list of serverless computes. */
  serverlessComputes?: ServerlessCompute[] | undefined;
  /** Token for the next page of results. Empty if no more results. */
  nextPageToken?: string | undefined;
}

export interface MavenLibrary {
  /** Gradle-style maven coordinates. For example: "org.jsoup:jsoup:1.7.2". */
  coordinates?: string | undefined;
  /**
   * Maven repo to install the Maven package from. If omitted, both Maven Central Repository
   * and Spark Packages are searched.
   */
  repo?: string | undefined;
  /**
   * List of dependences to exclude. For example: `["slf4j:slf4j", "*:hadoop-client"]`.
   *
   * Maven dependency exclusions:
   * https://maven.apache.org/guides/introduction/introduction-to-optional-and-excludes-dependencies.html.
   */
  exclusions?: string[] | undefined;
}

/** Describes a Cluster Policy entity. */
export interface Policy {
  /** Canonical unique identifier for the Cluster Policy. */
  policyId?: string | undefined;
  /**
   * Creator user name.
   * The field won't be included in the response if the user has already been deleted.
   */
  creatorUserName?: string | undefined;
  /** Creation time. The timestamp (in millisecond) when this Cluster Policy was created. */
  createdAtTimestamp?: bigint | undefined;
  /**
   * If true, policy is a default policy created and managed by <Databricks>.
   * Default policies cannot be deleted, and their policy families cannot be changed.
   */
  isDefault?: boolean | undefined;
  /**
   * Cluster Policy name requested by the user. This has to be unique. Length must be between 1 and 100
   * characters.
   */
  name?: string | undefined;
  /** Policy definition document expressed in [Databricks Cluster Policy Definition Language](https://docs.databricks.com/administration-guide/clusters/policy-definition.html). */
  definition?: string | undefined;
  /** Additional human-readable description of the cluster policy. */
  description?: string | undefined;
  /**
   * ID of the policy family. The cluster policy's policy definition inherits the policy
   * family's policy definition.
   *
   * Cannot be used with `definition`. Use `policy_family_definition_overrides` instead to
   * customize the policy definition.
   */
  policyFamilyId?: string | undefined;
  /**
   * Policy definition JSON document expressed in [Databricks Policy Definition Language](https://docs.databricks.com/administration-guide/clusters/policy-definition.html).
   * The JSON document must be passed as a string and cannot be embedded in the requests.
   *
   * You can use this to customize the policy definition inherited from the policy family.
   * Policy rules specified here are merged into the inherited policy definition.
   */
  policyFamilyDefinitionOverrides?: string | undefined;
  /** Max number of clusters per user that can be active using this policy. If not present, there is no max limit. */
  maxClustersPerUser?: bigint | undefined;
  /** A list of libraries to be installed on the next cluster restart that uses this policy. The maximum number of libraries is 500. */
  libraries?: Library[] | undefined;
}

export interface PythonPyPiLibrary {
  /**
   * The name of the pypi package to install. An optional exact version specification is also
   * supported. Examples: "simplejson" and "simplejson==3.8.0".
   */
  package?: string | undefined;
  /**
   * The repository where the package can be found. If not specified, the default pip index is
   * used.
   */
  repo?: string | undefined;
}

export interface RCranLibrary {
  /** The name of the CRAN package to install. */
  package?: string | undefined;
  /** The repository where the package can be found. If not specified, the default CRAN repo is used. */
  repo?: string | undefined;
}

/** Rate-limit configuration for serverless compute workloads. */
export interface RateLimitConfig {
  tShirtSize?: TshirtSize | undefined;
  /**
   * Proto enum name of t_shirt_size (e.g. T_SHIRT_SIZE_SMALL). Output-only; derived
   * on read so a minting client that does not know a new enum value can still put
   * the name on the cost-control token.
   */
  tShirtSizeName?: string | undefined;
}

/** A serverless compute resource. */
export interface ServerlessCompute {
  /** The unique identifier of the serverless compute (UUID). */
  serverlessComputeId?: string | undefined;
  /** The display name of the serverless compute. */
  name?: string | undefined;
  /**
   * Whether this is the workspace default compute for its compute_type.
   * Default computes are system-provisioned and cannot be deleted or renamed.
   */
  isDefault?: boolean | undefined;
  /** The creation timestamp. */
  createTime?: Temporal.Instant | undefined;
  /** Whether the calling user has UseServerlessComputePermission on this compute. */
  canUse?: boolean | undefined;
  /** Whether the calling user has ManageServerlessComputePermission on this compute. */
  canManage?: boolean | undefined;
}

export const unmarshalAllowedComputeProductsSchema: z.ZodType<AllowedComputeProducts> =
  z
    .object({
      automated: z
        .lazy(() => unmarshalAutomatedConstraintsSchema)
        .nullish()
        .transform(v => v ?? undefined),
      lakebase: z
        .lazy(() => unmarshalLakebaseConstraintsSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      automated: d.automated,
      lakebase: d.lakebase,
    }));

export const unmarshalAutomatedConstraintsSchema: z.ZodType<AutomatedConstraints> =
  z
    .object({
      per_workload_max: z
        .lazy(() => unmarshalRateLimitConfigSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      perWorkloadMax: d.per_workload_max,
    }));

export const unmarshalComputePolicySchema: z.ZodType<ComputePolicy> = z
  .object({
    compute_policy_id: z.string().optional(),
    display_name: z.string().optional(),
    allowed_compute_products: z
      .lazy(() => unmarshalAllowedComputeProductsSchema)
      .nullish()
      .transform(v => v ?? undefined),
    tags: z.record(z.string(), z.string()).optional(),
    is_default: z.boolean().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    can_use: z.boolean().optional(),
    can_manage: z.boolean().optional(),
  })
  .transform(d => ({
    computePolicyId: d.compute_policy_id,
    displayName: d.display_name,
    allowedComputeProducts: d.allowed_compute_products,
    tags: d.tags,
    isDefault: d.is_default,
    createTime: d.create_time,
    canUse: d.can_use,
    canManage: d.can_manage,
  }));

export const unmarshalCreatePolicyResponseSchema: z.ZodType<CreatePolicyResponse> =
  z
    .object({
      policy_id: z.string().optional(),
    })
    .transform(d => ({
      policyId: d.policy_id,
    }));

export const unmarshalDeletePolicyResponseSchema: z.ZodType<DeletePolicyResponse> =
  z.object({});

export const unmarshalEditPolicyResponseSchema: z.ZodType<EditPolicyResponse> =
  z.object({});

export const unmarshalLakebaseConstraintsSchema: z.ZodType<LakebaseConstraints> =
  z
    .object({
      max_capacity_units_per_instance: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
      max_idle_minutes_before_scale_to_zero: z
        .union([z.number(), z.bigint(), z.string()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      maxCapacityUnitsPerInstance: d.max_capacity_units_per_instance,
      maxIdleMinutesBeforeScaleToZero: d.max_idle_minutes_before_scale_to_zero,
    }));

export const unmarshalLibrarySchema: z.ZodType<Library> = z
  .object({
    jar: z.string().optional(),
    egg: z.string().optional(),
    pypi: z.lazy(() => unmarshalPythonPyPiLibrarySchema).optional(),
    maven: z.lazy(() => unmarshalMavenLibrarySchema).optional(),
    cran: z.lazy(() => unmarshalRCranLibrarySchema).optional(),
    whl: z.string().optional(),
    requirements: z.string().optional(),
  })
  .transform(d => ({
    lib:
      d.jar !== undefined
        ? {$case: 'jar' as const, jar: d.jar}
        : d.egg !== undefined
          ? {$case: 'egg' as const, egg: d.egg}
          : d.pypi !== undefined
            ? {$case: 'pypi' as const, pypi: d.pypi}
            : d.maven !== undefined
              ? {$case: 'maven' as const, maven: d.maven}
              : d.cran !== undefined
                ? {$case: 'cran' as const, cran: d.cran}
                : d.whl !== undefined
                  ? {$case: 'whl' as const, whl: d.whl}
                  : d.requirements !== undefined
                    ? {
                        $case: 'requirements' as const,
                        requirements: d.requirements,
                      }
                    : undefined,
  }));

export const unmarshalListComputePoliciesResponseSchema: z.ZodType<ListComputePoliciesResponse> =
  z
    .object({
      compute_policies: z
        .array(z.lazy(() => unmarshalComputePolicySchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      computePolicies: d.compute_policies,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListPoliciesResponseSchema: z.ZodType<ListPoliciesResponse> =
  z
    .object({
      policies: z.array(z.lazy(() => unmarshalPolicySchema)).optional(),
    })
    .transform(d => ({
      policies: d.policies,
    }));

export const unmarshalListServerlessComputesResponseSchema: z.ZodType<ListServerlessComputesResponse> =
  z
    .object({
      serverless_computes: z
        .array(z.lazy(() => unmarshalServerlessComputeSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      serverlessComputes: d.serverless_computes,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMavenLibrarySchema: z.ZodType<MavenLibrary> = z
  .object({
    coordinates: z.string().optional(),
    repo: z.string().optional(),
    exclusions: z.array(z.string()).optional(),
  })
  .transform(d => ({
    coordinates: d.coordinates,
    repo: d.repo,
    exclusions: d.exclusions,
  }));

export const unmarshalPolicySchema: z.ZodType<Policy> = z
  .object({
    policy_id: z.string().optional(),
    creator_user_name: z.string().optional(),
    created_at_timestamp: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    is_default: z.boolean().optional(),
    name: z.string().optional(),
    definition: z.string().optional(),
    description: z.string().optional(),
    policy_family_id: z.string().optional(),
    policy_family_definition_overrides: z.string().optional(),
    max_clusters_per_user: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
    libraries: z.array(z.lazy(() => unmarshalLibrarySchema)).optional(),
  })
  .transform(d => ({
    policyId: d.policy_id,
    creatorUserName: d.creator_user_name,
    createdAtTimestamp: d.created_at_timestamp,
    isDefault: d.is_default,
    name: d.name,
    definition: d.definition,
    description: d.description,
    policyFamilyId: d.policy_family_id,
    policyFamilyDefinitionOverrides: d.policy_family_definition_overrides,
    maxClustersPerUser: d.max_clusters_per_user,
    libraries: d.libraries,
  }));

export const unmarshalPythonPyPiLibrarySchema: z.ZodType<PythonPyPiLibrary> = z
  .object({
    package: z.string().optional(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const unmarshalRCranLibrarySchema: z.ZodType<RCranLibrary> = z
  .object({
    package: z.string().optional(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const unmarshalRateLimitConfigSchema: z.ZodType<RateLimitConfig> = z
  .object({
    t_shirt_size: z.string().optional(),
    t_shirt_size_name: z.string().optional(),
  })
  .transform(d => ({
    tShirtSize: d.t_shirt_size,
    tShirtSizeName: d.t_shirt_size_name,
  }));

export const unmarshalServerlessComputeSchema: z.ZodType<ServerlessCompute> = z
  .object({
    serverless_compute_id: z.string().optional(),
    name: z.string().optional(),
    is_default: z.boolean().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    can_use: z.boolean().optional(),
    can_manage: z.boolean().optional(),
  })
  .transform(d => ({
    serverlessComputeId: d.serverless_compute_id,
    name: d.name,
    isDefault: d.is_default,
    createTime: d.create_time,
    canUse: d.can_use,
    canManage: d.can_manage,
  }));

export const marshalCreatePolicyRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    definition: z.string().optional(),
    description: z.string().optional(),
    policyFamilyId: z.string().optional(),
    policyFamilyDefinitionOverrides: z.string().optional(),
    maxClustersPerUser: z.bigint().optional(),
    libraries: z.array(z.lazy(() => marshalLibrarySchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    definition: d.definition,
    description: d.description,
    policy_family_id: d.policyFamilyId,
    policy_family_definition_overrides: d.policyFamilyDefinitionOverrides,
    max_clusters_per_user: d.maxClustersPerUser,
    libraries: d.libraries,
  }));

export const marshalDeletePolicyRequestSchema: z.ZodType = z
  .object({
    policyId: z.string().optional(),
  })
  .transform(d => ({
    policy_id: d.policyId,
  }));

export const marshalEditPolicyRequestSchema: z.ZodType = z
  .object({
    policyId: z.string().optional(),
    name: z.string().optional(),
    definition: z.string().optional(),
    description: z.string().optional(),
    policyFamilyId: z.string().optional(),
    policyFamilyDefinitionOverrides: z.string().optional(),
    maxClustersPerUser: z.bigint().optional(),
    libraries: z.array(z.lazy(() => marshalLibrarySchema)).optional(),
  })
  .transform(d => ({
    policy_id: d.policyId,
    name: d.name,
    definition: d.definition,
    description: d.description,
    policy_family_id: d.policyFamilyId,
    policy_family_definition_overrides: d.policyFamilyDefinitionOverrides,
    max_clusters_per_user: d.maxClustersPerUser,
    libraries: d.libraries,
  }));

export const marshalLibrarySchema: z.ZodType = z
  .object({
    lib: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('jar'), jar: z.string()}),
        z.object({$case: z.literal('egg'), egg: z.string()}),
        z.object({
          $case: z.literal('pypi'),
          pypi: z.lazy(() => marshalPythonPyPiLibrarySchema),
        }),
        z.object({
          $case: z.literal('maven'),
          maven: z.lazy(() => marshalMavenLibrarySchema),
        }),
        z.object({
          $case: z.literal('cran'),
          cran: z.lazy(() => marshalRCranLibrarySchema),
        }),
        z.object({$case: z.literal('whl'), whl: z.string()}),
        z.object({$case: z.literal('requirements'), requirements: z.string()}),
      ])
      .optional(),
  })
  .transform(d => ({
    ...(d.lib?.$case === 'jar' && {jar: d.lib.jar}),
    ...(d.lib?.$case === 'egg' && {egg: d.lib.egg}),
    ...(d.lib?.$case === 'pypi' && {pypi: d.lib.pypi}),
    ...(d.lib?.$case === 'maven' && {maven: d.lib.maven}),
    ...(d.lib?.$case === 'cran' && {cran: d.lib.cran}),
    ...(d.lib?.$case === 'whl' && {whl: d.lib.whl}),
    ...(d.lib?.$case === 'requirements' && {requirements: d.lib.requirements}),
  }));

export const marshalMavenLibrarySchema: z.ZodType = z
  .object({
    coordinates: z.string().optional(),
    repo: z.string().optional(),
    exclusions: z.array(z.string()).optional(),
  })
  .transform(d => ({
    coordinates: d.coordinates,
    repo: d.repo,
    exclusions: d.exclusions,
  }));

export const marshalPythonPyPiLibrarySchema: z.ZodType = z
  .object({
    package: z.string().optional(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));

export const marshalRCranLibrarySchema: z.ZodType = z
  .object({
    package: z.string().optional(),
    repo: z.string().optional(),
  })
  .transform(d => ({
    package: d.package,
    repo: d.repo,
  }));
