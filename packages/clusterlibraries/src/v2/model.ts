// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The status of a library on a specific cluster. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const LibraryInstallStatus = {
  /** No action has yet been taken to install the library. This state should be very short lived. */
  PENDING: 'PENDING',
  /**
   * Metadata necessary to install the library is being retrieved from the provided repository.
   *
   * For jar and egg libraries, this step is a no-op.
   */
  RESOLVING: 'RESOLVING',
  /**
   * The library is actively being installed, either by adding resources to Spark or executing
   * system commands inside the Spark nodes.
   */
  INSTALLING: 'INSTALLING',
  /** The library has been successfully installed and can now be used. */
  INSTALLED: 'INSTALLED',
  /** Some step in installation failed. More information can be found in the `messages` field. */
  FAILED: 'FAILED',
  /**
   * The library has been marked for removal. Currently, libraries can only be removed when clusters
   * are restarted, so libraries that enter this state will remain until the cluster is restarted.
   */
  UNINSTALL_ON_RESTART: 'UNINSTALL_ON_RESTART',
  /**
   * Indicates that Library Manager decided to skip installation for this library.
   * For example, shared libraries on DBR 7+ are skipped.
   */
  SKIPPED: 'SKIPPED',
  /** Library installation is restored and can be used. */
  RESTORED: 'RESTORED',
} as const;
export type LibraryInstallStatus =
  | (typeof LibraryInstallStatus)[keyof typeof LibraryInstallStatus]
  | (string & {});

export interface ClusterLibraryStatuses {
  /** Unique identifier for the cluster. */
  clusterId?: string | undefined;
  /** Status of all libraries on the cluster. */
  libraryStatuses?: LibraryFullStatus[] | undefined;
}

export interface ClusterStatusRequest {
  /** Unique identifier of the cluster whose status should be retrieved. */
  clusterId?: string | undefined;
}

export interface InstallLibrariesRequest {
  /** Unique identifier for the cluster on which to install these libraries. */
  clusterId?: string | undefined;
  /** The libraries to install. */
  libraries?: Library[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InstallLibrariesResponse {}

/** A library to install on a cluster. Exactly one of the library-type fields must be set. */
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
        /**
         * Deprecated: Installing Python egg files is not supported in Databricks Runtime 14.0 and above.
         * Use a wheel (`whl`) or a PyPI package (`pypi`) instead. The value is the URI of the egg file
         * to install.
         */
        egg: string;
      }
    | {
        $case: 'pypi';
        /**
         * Specification of a PyPI library to be installed. For example:
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
        /** Specification of a CRAN library to be installed. */
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
         * For example: `{ "requirements": "/Workspace/path/to/requirements.txt" }` or `{ "requirements" : "/Volumes/path/to/requirements.txt" }`.
         * Installing a requirements file requires Databricks Runtime 15.0 or above.
         */
        requirements: string;
      }
    | undefined;
}

/** The status of the library on a specific cluster. */
export interface LibraryFullStatus {
  /** The library whose status is reported. */
  library?: Library | undefined;
  /**
   * Status of installing the library on the cluster. The status starts at PENDING and ends at
   * INSTALLED, FAILED or SKIPPED. Intermediate states are not always reported. A library stays
   * UNINSTALL_ON_RESTART after an uninstall request until the cluster restarts. While the cluster
   * is not running, libraries are reported as PENDING, and libraries marked for uninstall are
   * omitted.
   */
  status?: LibraryInstallStatus | undefined;
  /** All the info and warning messages that have occurred so far for this library. */
  messages?: string[] | undefined;
  /** Whether the library was set to be installed on all clusters via the libraries UI. */
  isLibraryForAllClusters?: boolean | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListAllClusterLibraryStatusesRequest {}

export interface ListAllClusterLibraryStatusesResponse {
  /** A list of cluster statuses. */
  statuses?: ClusterLibraryStatuses[] | undefined;
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
   * List of dependencies to exclude. For example: `["slf4j:slf4j", "*:hadoop-client"]`.
   *
   * Maven dependency exclusions:
   * https://maven.apache.org/guides/introduction/introduction-to-optional-and-excludes-dependencies.html.
   */
  exclusions?: string[] | undefined;
}

export interface PythonPyPiLibrary {
  /**
   * The name of the PyPI package to install. An optional exact version specification is also
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

export interface UninstallLibrariesRequest {
  /** Unique identifier for the cluster on which to uninstall these libraries. */
  clusterId?: string | undefined;
  /** The libraries to uninstall. */
  libraries?: Library[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface UninstallLibrariesResponse {}

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

export const unmarshalInstallLibrariesResponseSchema: z.ZodType<InstallLibrariesResponse> =
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
  .refine(
    d =>
      [d.jar, d.egg, d.pypi, d.maven, d.cran, d.whl, d.requirements].filter(
        v => v !== undefined
      ).length <= 1,
    {message: 'Library.Lib: multiple oneof members set'}
  )
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
    library: z
      .lazy(() => unmarshalLibrarySchema)
      .nullish()
      .transform(v => v ?? undefined),
    status: z.string().optional(),
    messages: z.array(z.string()).optional(),
    is_library_for_all_clusters: z.boolean().optional(),
  })
  .transform(d => ({
    library: d.library,
    status: d.status,
    messages: d.messages,
    isLibraryForAllClusters: d.is_library_for_all_clusters,
  }));

export const unmarshalListAllClusterLibraryStatusesResponseSchema: z.ZodType<ListAllClusterLibraryStatusesResponse> =
  z
    .object({
      statuses: z
        .array(z.lazy(() => unmarshalClusterLibraryStatusesSchema))
        .optional(),
    })
    .transform(d => ({
      statuses: d.statuses,
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

export const unmarshalUninstallLibrariesResponseSchema: z.ZodType<UninstallLibrariesResponse> =
  z.object({});

export const marshalClusterLibraryStatusesSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    libraryStatuses: z
      .array(z.lazy(() => marshalLibraryFullStatusSchema))
      .optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
    library_statuses: d.libraryStatuses,
  }));

export const marshalClusterStatusRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
  }));

export const marshalInstallLibrariesRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    libraries: z.array(z.lazy(() => marshalLibrarySchema)).optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
    libraries: d.libraries,
  }));

export const marshalInstallLibrariesResponseSchema: z.ZodType = z.object({});

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

export const marshalLibraryFullStatusSchema: z.ZodType = z
  .object({
    library: z.lazy(() => marshalLibrarySchema).optional(),
    status: z.string().optional(),
    messages: z.array(z.string()).optional(),
    isLibraryForAllClusters: z.boolean().optional(),
  })
  .transform(d => ({
    library: d.library,
    status: d.status,
    messages: d.messages,
    is_library_for_all_clusters: d.isLibraryForAllClusters,
  }));

export const marshalListAllClusterLibraryStatusesRequestSchema: z.ZodType =
  z.object({});

export const marshalListAllClusterLibraryStatusesResponseSchema: z.ZodType = z
  .object({
    statuses: z
      .array(z.lazy(() => marshalClusterLibraryStatusesSchema))
      .optional(),
  })
  .transform(d => ({
    statuses: d.statuses,
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

export const marshalUninstallLibrariesRequestSchema: z.ZodType = z
  .object({
    clusterId: z.string().optional(),
    libraries: z.array(z.lazy(() => marshalLibrarySchema)).optional(),
  })
  .transform(d => ({
    cluster_id: d.clusterId,
    libraries: d.libraries,
  }));

export const marshalUninstallLibrariesResponseSchema: z.ZodType = z.object({});
