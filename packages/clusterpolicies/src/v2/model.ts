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

/**
 * Represents a cluster policy revision.
 *
 * Only the 100 most recent revisions are stored for each cluster policy.
 */
export interface ClusterPolicyRevision {
  /** ID of the cluster policy revision. */
  revisionId?: string | undefined;
  /** Time when the cluster policy revision was created. */
  createTime?: Temporal.Instant | undefined;
  /** Settings used to create/edit the policy. */
  settings?: PolicyOwnAttributes | undefined;
  /** Name of the user who edited this policy. */
  editUser?: string | undefined;
  /** Whether this is the current revision. */
  isCurrent?: boolean | undefined;
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

/** Request to get a cluster policy revision by ID. */
export interface GetClusterPolicyRevisionRequest {
  /**
   * The fully qualified resource name of the cluster policy revision.
   * Format: cluster-policies/{policy_id}/revisions/{revision_id}.
   */
  name?: string | undefined;
}

export interface GetPolicyRequest {
  /** Canonical unique identifier for the Cluster Policy. */
  policyId?: string | undefined;
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

/** Request to list cluster policy revisions. */
export interface ListClusterPolicyRevisionsRequest {
  /**
   * The fully qualified resource name of the parent cluster.
   * Format: cluster-policies/{policy_id}.
   */
  parent?: string | undefined;
  /** Maximum number of cluster policy revisions to return per page. */
  pageSize?: number | undefined;
  /** Pagination token from a previous list cluster policy revisions request. */
  pageToken?: string | undefined;
}

/** Response when listing cluster policy revisions. */
export interface ListClusterPolicyRevisionsResponse {
  /** Cluster policy revisions in the current page. */
  clusterPolicyRevisions?: ClusterPolicyRevision[] | undefined;
  /** Token for fetching the next page. Empty when there are no more results. */
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

export interface PolicyOwnAttributes {
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

/** Request to roll back cluster policy. */
export interface RollbackClusterPolicyRequest {
  /**
   * The fully qualified resource name of the cluster policy revision.
   * Format: cluster-policies/{policy_id}/revisions/{revision_id}.
   */
  name?: string | undefined;
}

export const unmarshalClusterPolicyRevisionSchema: z.ZodType<ClusterPolicyRevision> =
  z
    .object({
      revision_id: z.string().optional(),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      settings: z.lazy(() => unmarshalPolicyOwnAttributesSchema).optional(),
      edit_user: z.string().optional(),
      is_current: z.boolean().optional(),
    })
    .transform(d => ({
      revisionId: d.revision_id,
      createTime: d.create_time,
      settings: d.settings,
      editUser: d.edit_user,
      isCurrent: d.is_current,
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

export const unmarshalListClusterPolicyRevisionsResponseSchema: z.ZodType<ListClusterPolicyRevisionsResponse> =
  z
    .object({
      cluster_policy_revisions: z
        .array(z.lazy(() => unmarshalClusterPolicyRevisionSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      clusterPolicyRevisions: d.cluster_policy_revisions,
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
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    is_default: z.boolean().optional(),
    name: z.string().optional(),
    definition: z.string().optional(),
    description: z.string().optional(),
    policy_family_id: z.string().optional(),
    policy_family_definition_overrides: z.string().optional(),
    max_clusters_per_user: z
      .union([z.number(), z.bigint()])
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

export const unmarshalPolicyOwnAttributesSchema: z.ZodType<PolicyOwnAttributes> =
  z
    .object({
      name: z.string().optional(),
      definition: z.string().optional(),
      description: z.string().optional(),
      policy_family_id: z.string().optional(),
      policy_family_definition_overrides: z.string().optional(),
      max_clusters_per_user: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
      libraries: z.array(z.lazy(() => unmarshalLibrarySchema)).optional(),
    })
    .transform(d => ({
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

export const marshalRollbackClusterPolicyRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));
