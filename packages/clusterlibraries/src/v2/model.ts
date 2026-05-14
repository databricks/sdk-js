// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** If changed, also update estore/namespaces/defaultbaseenvironments/latest.proto */
export enum BaseEnvironmentType {
  BASE_ENVIRONMENT_TYPE_UNSPECIFIED = 'BASE_ENVIRONMENT_TYPE_UNSPECIFIED',
  CPU = 'CPU',
  GPU = 'GPU',
}

/** The status of a library on a specific cluster. */
export enum LibraryInstallStatus {
  /** No action has yet been taken to install the library. This state should be very short lived. */
  PENDING = 'PENDING',
  /**
   * Metadata necessary to install the library is being retrieved from the provided repository.
   *
   * For jar and egg libraries, this step is a no-op.
   */
  RESOLVING = 'RESOLVING',
  /**
   * The library is actively being installed, either by adding resources to Spark or executing
   * system commands inside the Spark nodes.
   */
  INSTALLING = 'INSTALLING',
  /** The library has been successfully installed and can now be used. */
  INSTALLED = 'INSTALLED',
  /** Some step in installation failed. More information can be found in the `messages` field. */
  FAILED = 'FAILED',
  /**
   * The library has been marked for removal. Currently, libraries can only be removed when clusters
   * are restarted, so libraries that enter this state will remain until the cluster is restarted.
   */
  UNINSTALL_ON_RESTART = 'UNINSTALL_ON_RESTART',
  /**
   * Indicates that Library Manager decided to skip installation for this library.
   * For example, shared libraries on DBR 7+ are skipped.
   */
  SKIPPED = 'SKIPPED',
  /** Library installation is restored and can be used. */
  RESTORED = 'RESTORED',
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum DefaultBaseEnvironmentCache_Status {
  STATUS_UNSPECIFIED = 'STATUS_UNSPECIFIED',
  PENDING = 'PENDING',
  CREATED = 'CREATED',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
  INVALID = 'INVALID',
  REFRESHING = 'REFRESHING',
}

export interface ClusterLibraryStatuses {
  /** Unique identifier for the cluster. */
  clusterId?: string | undefined;
  /** Status of all libraries on the cluster. */
  libraryStatuses?: LibraryFullStatus[] | undefined;
}

export interface ClusterStatus {
  /** Unique identifier of the cluster whose status should be retrieved. */
  clusterId?: string | undefined;
}

export interface CreateDefaultBaseEnvironmentRequest {
  defaultBaseEnvironment?: DefaultBaseEnvironment | undefined;
  /**
   * A unique identifier for this request. A random UUID is recommended.
   * This request is only idempotent if a `request_id` is provided.
   */
  requestId?: string | undefined;
  workspaceBaseEnvironmentId?: string | undefined;
}

export interface DefaultBaseEnvironment {
  id?: string | undefined;
  name?: string | undefined;
  creatorUserId?: number | undefined;
  createdTimestamp?: number | undefined;
  lastUpdatedUserId?: number | undefined;
  lastUpdatedTimestamp?: number | undefined;
  /**
   * Note: we made `environment` non-internal because we need to expose its `client` field. All other fields should be
   * treated as internal.
   */
  environment?: Environment | undefined;
  filepath?: string | undefined;
  status?: DefaultBaseEnvironmentCache_Status | undefined;
  message?: string | undefined;
  baseEnvironmentCache?: DefaultBaseEnvironmentCache[] | undefined;
  principalIds?: number[] | undefined;
  isDefault?: boolean | undefined;
  baseEnvironmentType?: BaseEnvironmentType | undefined;
}

export interface DefaultBaseEnvironmentCache {
  materializedEnvironment?: MaterializedEnvironment | undefined;
  indefiniteMaterializedEnvironment?: MaterializedEnvironment | undefined;
  status?: DefaultBaseEnvironmentCache_Status | undefined;
  message?: string | undefined;
}

export interface DeleteDefaultBaseEnvironmentRequest {
  id?: string | undefined;
}

/**
 * The environment entity used to preserve serverless environment side panel, jobs' environment for non-notebook task, and SDP's environment for classic and serverless pipelines.
 * In this minimal environment spec, only pip and java dependencies are supported.
 */
export interface Environment {
  /** Use `environment_version` instead. */
  client?: string | undefined;
  /**
   * List of pip dependencies, as supported by the version of pip in this environment.
   * Each dependency is a valid pip requirements file line per https://pip.pypa.io/en/stable/reference/requirements-file-format/.
   * Allowed dependencies include a requirement specifier, an archive URL, a local project path (such as WSFS or UC Volumes in <Databricks>), or a VCS project URL.
   */
  dependencies?: string[] | undefined;
  /**
   * The base environment this environment is built on top of. A base environment defines the environment version and a
   * list of dependencies for serverless compute. The value can be a file path to a custom `env.yaml` file
   * (e.g., `/Workspace/path/to/env.yaml`). Support for a Databricks-provided base environment ID
   * (e.g., `workspace-base-environments/databricks_ai_v4`) and workspace base environment ID
   * (e.g., `workspace-base-environments/dbe_b849b66e-b31a-4cb5-b161-1f2b10877fb7`) is in Beta.
   * Either `environment_version` or `base_environment` can be provided.  For more information, see
   */
  baseEnvironment?: string | undefined;
  /**
   * Either `environment_version` or `base_environment` needs to be provided. Environment version used by the environment.
   * Each version comes with a specific Python version and a set of Python packages.
   * The version is a string, consisting of an integer.
   */
  environmentVersion?: string | undefined;
  /** List of java dependencies. Each dependency is a string representing a java library path. For example: `/Volumes/path/to/test.jar`. */
  javaDependencies?: string[] | undefined;
}

export interface GetDefaultBaseEnvironmentRequest {
  id?: string | undefined;
  /** Deprecated: use ctx.requestId instead */
  traceId?: string | undefined;
}

export interface InstallLibraries {
  /** Unique identifier for the cluster on which to install these libraries. */
  clusterId?: string | undefined;
  /** The libraries to install. */
  libraries?: Library[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface InstallLibraries_Response {}

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

/** The status of the library on a specific cluster. */
export interface LibraryFullStatus {
  /** Unique identifier for the library. */
  library?: Library | undefined;
  /** Status of installing the library on the cluster. */
  status?: LibraryInstallStatus | undefined;
  /** All the info and warning messages that have occurred so far for this library. */
  messages?: string[] | undefined;
  /** Whether the library was set to be installed on all clusters via the libraries UI. */
  isLibraryForAllClusters?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListAllClusterLibraryStatuses {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListAllClusterLibraryStatuses_Response {
  /** A list of cluster statuses. */
  statuses?: ClusterLibraryStatuses[] | undefined;
}

export interface ListDefaultBaseEnvironmentsRequest {
  pageSize?: number | undefined;
  pageToken?: string | undefined;
}

export interface ListDefaultBaseEnvironmentsResponse {
  defaultBaseEnvironments?: DefaultBaseEnvironment[] | undefined;
  nextPageToken?: string | undefined;
}

/**
 * Materialized Environment information enables environment sharing and reuse via Environment Caching during
 * library installations. Currently this feature is only supported for Python libraries.
 *
 * - If the env cache entry in LMv2 DB doesn't exist or invalid, library installations and environment materialization
 * will occur. A new Materialized Environment metadata will be sent from DP upon successful library installations and
 * env materialization, and is persisted into database by LMv2.
 * - If the env cache entry in LMv2 DB is valid, the Materialized Environment will be sent to DP by LMv2, and DP will
 * restore the cached environment from a store instead of reinstalling libraries from scratch.
 *
 * If changed, also update estore/namespaces/defaultbaseenvironments/latest.proto with new version
 */
export interface MaterializedEnvironment {
  /** The timestamp (in epoch milliseconds) when the materialized env is updated. */
  lastUpdatedTimestamp?: number | undefined;
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

export interface RefreshDefaultBaseEnvironmentsRequest {
  ids?: string[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RefreshDefaultBaseEnvironmentsResponse {}

export interface UninstallLibraries {
  /** Unique identifier for the cluster on which to uninstall these libraries. */
  clusterId?: string | undefined;
  /** The libraries to uninstall. */
  libraries?: Library[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface UninstallLibraries_Response {}

export interface UpdateDefaultBaseEnvironmentRequest {
  id?: string | undefined;
  defaultBaseEnvironment?: DefaultBaseEnvironment | undefined;
}

export interface UpdateDefaultDefaultBaseEnvironmentRequest {
  id?: string | undefined;
  baseEnvironmentType?: BaseEnvironmentType | undefined;
}

export const unmarshalClusterLibraryStatusesSchema: z.ZodType<ClusterLibraryStatuses> =
  z
    .object({
      cluster_id: z.string().optional(),
      library_statuses: z
        .array(z.lazy(() => unmarshalLibraryFullStatusSchema))
        .optional(),
    })
    .transform(d => ({
      clusterId: d.cluster_id,
      libraryStatuses: d.library_statuses,
    }));

export const unmarshalDefaultBaseEnvironmentSchema: z.ZodType<DefaultBaseEnvironment> =
  z
    .object({
      id: z.string().optional(),
      name: z.string().optional(),
      creator_user_id: z.number().optional(),
      created_timestamp: z.number().optional(),
      last_updated_user_id: z.number().optional(),
      last_updated_timestamp: z.number().optional(),
      environment: z.lazy(() => unmarshalEnvironmentSchema).optional(),
      filepath: z.string().optional(),
      status: z.enum(DefaultBaseEnvironmentCache_Status).optional(),
      message: z.string().optional(),
      base_environment_cache: z
        .array(z.lazy(() => unmarshalDefaultBaseEnvironmentCacheSchema))
        .optional(),
      principal_ids: z.array(z.number()).optional(),
      is_default: z.boolean().optional(),
      base_environment_type: z.enum(BaseEnvironmentType).optional(),
    })
    .transform(d => ({
      id: d.id,
      name: d.name,
      creatorUserId: d.creator_user_id,
      createdTimestamp: d.created_timestamp,
      lastUpdatedUserId: d.last_updated_user_id,
      lastUpdatedTimestamp: d.last_updated_timestamp,
      environment: d.environment,
      filepath: d.filepath,
      status: d.status,
      message: d.message,
      baseEnvironmentCache: d.base_environment_cache,
      principalIds: d.principal_ids,
      isDefault: d.is_default,
      baseEnvironmentType: d.base_environment_type,
    }));

export const unmarshalDefaultBaseEnvironmentCacheSchema: z.ZodType<DefaultBaseEnvironmentCache> =
  z
    .object({
      materialized_environment: z
        .lazy(() => unmarshalMaterializedEnvironmentSchema)
        .optional(),
      indefinite_materialized_environment: z
        .lazy(() => unmarshalMaterializedEnvironmentSchema)
        .optional(),
      status: z.enum(DefaultBaseEnvironmentCache_Status).optional(),
      message: z.string().optional(),
    })
    .transform(d => ({
      materializedEnvironment: d.materialized_environment,
      indefiniteMaterializedEnvironment: d.indefinite_materialized_environment,
      status: d.status,
      message: d.message,
    }));

export const unmarshalEnvironmentSchema: z.ZodType<Environment> = z
  .object({
    client: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    base_environment: z.string().optional(),
    environment_version: z.string().optional(),
    java_dependencies: z.array(z.string()).optional(),
  })
  .transform(d => ({
    client: d.client,
    dependencies: d.dependencies,
    baseEnvironment: d.base_environment,
    environmentVersion: d.environment_version,
    javaDependencies: d.java_dependencies,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalInstallLibraries_ResponseSchema: z.ZodType<InstallLibraries_Response> =
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

export const unmarshalLibraryFullStatusSchema: z.ZodType<LibraryFullStatus> = z
  .object({
    library: z.lazy(() => unmarshalLibrarySchema).optional(),
    status: z.enum(LibraryInstallStatus).optional(),
    messages: z.array(z.string()).optional(),
    is_library_for_all_clusters: z.boolean().optional(),
  })
  .transform(d => ({
    library: d.library,
    status: d.status,
    messages: d.messages,
    isLibraryForAllClusters: d.is_library_for_all_clusters,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListAllClusterLibraryStatuses_ResponseSchema: z.ZodType<ListAllClusterLibraryStatuses_Response> =
  z
    .object({
      statuses: z
        .array(z.lazy(() => unmarshalClusterLibraryStatusesSchema))
        .optional(),
    })
    .transform(d => ({
      statuses: d.statuses,
    }));

export const unmarshalListDefaultBaseEnvironmentsResponseSchema: z.ZodType<ListDefaultBaseEnvironmentsResponse> =
  z
    .object({
      default_base_environments: z
        .array(z.lazy(() => unmarshalDefaultBaseEnvironmentSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      defaultBaseEnvironments: d.default_base_environments,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalMaterializedEnvironmentSchema: z.ZodType<MaterializedEnvironment> =
  z
    .object({
      last_updated_timestamp: z.number().optional(),
    })
    .transform(d => ({
      lastUpdatedTimestamp: d.last_updated_timestamp,
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

export const unmarshalRefreshDefaultBaseEnvironmentsResponseSchema: z.ZodType<RefreshDefaultBaseEnvironmentsResponse> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalUninstallLibraries_ResponseSchema: z.ZodType<UninstallLibraries_Response> =
  z.object({});

export const marshalCreateDefaultBaseEnvironmentRequestSchema: z.ZodType = z
  .object({
    defaultBaseEnvironment: z
      .lazy(() => marshalDefaultBaseEnvironmentSchema)
      .optional(),
    requestId: z.string().optional(),
    workspaceBaseEnvironmentId: z.string().optional(),
  })
  .transform(d => ({
    default_base_environment: d.defaultBaseEnvironment,
    request_id: d.requestId,
    workspace_base_environment_id: d.workspaceBaseEnvironmentId,
  }));

export const marshalDefaultBaseEnvironmentSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    creatorUserId: z.number().optional(),
    createdTimestamp: z.number().optional(),
    lastUpdatedUserId: z.number().optional(),
    lastUpdatedTimestamp: z.number().optional(),
    environment: z.lazy(() => marshalEnvironmentSchema).optional(),
    filepath: z.string().optional(),
    status: z.enum(DefaultBaseEnvironmentCache_Status).optional(),
    message: z.string().optional(),
    baseEnvironmentCache: z
      .array(z.lazy(() => marshalDefaultBaseEnvironmentCacheSchema))
      .optional(),
    principalIds: z.array(z.number()).optional(),
    isDefault: z.boolean().optional(),
    baseEnvironmentType: z.enum(BaseEnvironmentType).optional(),
  })
  .transform(d => ({
    id: d.id,
    name: d.name,
    creator_user_id: d.creatorUserId,
    created_timestamp: d.createdTimestamp,
    last_updated_user_id: d.lastUpdatedUserId,
    last_updated_timestamp: d.lastUpdatedTimestamp,
    environment: d.environment,
    filepath: d.filepath,
    status: d.status,
    message: d.message,
    base_environment_cache: d.baseEnvironmentCache,
    principal_ids: d.principalIds,
    is_default: d.isDefault,
    base_environment_type: d.baseEnvironmentType,
  }));

export const marshalDefaultBaseEnvironmentCacheSchema: z.ZodType = z
  .object({
    materializedEnvironment: z
      .lazy(() => marshalMaterializedEnvironmentSchema)
      .optional(),
    indefiniteMaterializedEnvironment: z
      .lazy(() => marshalMaterializedEnvironmentSchema)
      .optional(),
    status: z.enum(DefaultBaseEnvironmentCache_Status).optional(),
    message: z.string().optional(),
  })
  .transform(d => ({
    materialized_environment: d.materializedEnvironment,
    indefinite_materialized_environment: d.indefiniteMaterializedEnvironment,
    status: d.status,
    message: d.message,
  }));

export const marshalEnvironmentSchema: z.ZodType = z
  .object({
    client: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    baseEnvironment: z.string().optional(),
    environmentVersion: z.string().optional(),
    javaDependencies: z.array(z.string()).optional(),
  })
  .transform(d => ({
    client: d.client,
    dependencies: d.dependencies,
    base_environment: d.baseEnvironment,
    environment_version: d.environmentVersion,
    java_dependencies: d.javaDependencies,
  }));

export const marshalInstallLibrariesSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    libraries: z.array(z.lazy(() => marshalLibrarySchema)).optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
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

export const marshalMaterializedEnvironmentSchema: z.ZodType = z
  .object({
    lastUpdatedTimestamp: z.number().optional(),
  })
  .transform(d => ({
    last_updated_timestamp: d.lastUpdatedTimestamp,
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

export const marshalRefreshDefaultBaseEnvironmentsRequestSchema: z.ZodType = z
  .object({
    ids: z.array(z.string()).optional(),
  })
  .transform(d => ({
    ids: d.ids,
  }));

export const marshalUninstallLibrariesSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    libraries: z.array(z.lazy(() => marshalLibrarySchema)).optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
    libraries: d.libraries,
  }));

export const marshalUpdateDefaultBaseEnvironmentRequestSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    defaultBaseEnvironment: z
      .lazy(() => marshalDefaultBaseEnvironmentSchema)
      .optional(),
  })
  .transform(d => ({
    id: d.id,
    default_base_environment: d.defaultBaseEnvironment,
  }));

export const marshalUpdateDefaultDefaultBaseEnvironmentRequestSchema: z.ZodType =
  z
    .object({
      id: z.string().optional(),
      baseEnvironmentType: z.enum(BaseEnvironmentType).optional(),
    })
    .transform(d => ({
      id: d.id,
      base_environment_type: d.baseEnvironmentType,
    }));
