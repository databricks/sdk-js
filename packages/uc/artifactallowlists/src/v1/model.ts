// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The artifact type */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ArtifactType = {
  ARTIFACT_TYPE_UNSPECIFIED: 'ARTIFACT_TYPE_UNSPECIFIED',
  INIT_SCRIPT: 'INIT_SCRIPT',
  LIBRARY_JAR: 'LIBRARY_JAR',
  LIBRARY_MAVEN: 'LIBRARY_MAVEN',
} as const;
export type ArtifactType =
  | (typeof ArtifactType)[keyof typeof ArtifactType]
  | (string & {});

/** The artifact pattern matching type */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ArtifactMatcher_MatchType = {
  /** In the future, we will add EXACT_MATCH, WILDCARDS, and more types */
  MATCH_TYPE_UNSPECIFIED: 'MATCH_TYPE_UNSPECIFIED',
  PREFIX_MATCH: 'PREFIX_MATCH',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ArtifactMatcher_MatchType =
  | (typeof ArtifactMatcher_MatchType)[keyof typeof ArtifactMatcher_MatchType]
  | (string & {});

export interface ArtifactAllowlistInfo {
  /** A list of allowed artifact match patterns. */
  artifactMatchers?: ArtifactMatcher[] | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Username of the user who set the artifact allowlist. */
  createdBy?: string | undefined;
  /** Time at which this artifact allowlist was set, in epoch milliseconds. */
  createdAt?: bigint | undefined;
}

export interface ArtifactMatcher {
  /** The artifact path or maven coordinate */
  artifact?: string | undefined;
  /** The pattern matching type of the artifact */
  matchType?: ArtifactMatcher_MatchType | undefined;
}

export interface GetArtifactAllowlistRequest {
  /** The artifact type of the allowlist. */
  artifactType?: ArtifactType | undefined;
}

export interface SetArtifactAllowlistRequest {
  /** The artifact type of the allowlist. */
  artifactType?: ArtifactType | undefined;
  /** A list of allowed artifact match patterns. */
  artifactMatchers?: ArtifactMatcher[] | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Username of the user who set the artifact allowlist. */
  createdBy?: string | undefined;
  /** Time at which this artifact allowlist was set, in epoch milliseconds. */
  createdAt?: bigint | undefined;
}

export const unmarshalArtifactAllowlistInfoSchema: z.ZodType<ArtifactAllowlistInfo> =
  z
    .object({
      artifact_matchers: z
        .array(z.lazy(() => unmarshalArtifactMatcherSchema))
        .optional(),
      metastore_id: z.string().optional(),
      created_by: z.string().optional(),
      created_at: z
        .union([z.number(), z.bigint()])
        .transform(v => BigInt(v))
        .optional(),
    })
    .transform(d => ({
      artifactMatchers: d.artifact_matchers,
      metastoreId: d.metastore_id,
      createdBy: d.created_by,
      createdAt: d.created_at,
    }));

export const unmarshalArtifactMatcherSchema: z.ZodType<ArtifactMatcher> = z
  .object({
    artifact: z.string().optional(),
    match_type: z.string().optional(),
  })
  .transform(d => ({
    artifact: d.artifact,
    matchType: d.match_type,
  }));

export const marshalArtifactMatcherSchema: z.ZodType = z
  .object({
    artifact: z.string().optional(),
    matchType: z.string().optional(),
  })
  .transform(d => ({
    artifact: d.artifact,
    match_type: d.matchType,
  }));

export const marshalSetArtifactAllowlistRequestSchema: z.ZodType = z
  .object({
    artifactType: z.string().optional(),
    artifactMatchers: z
      .array(z.lazy(() => marshalArtifactMatcherSchema))
      .optional(),
    metastoreId: z.string().optional(),
    createdBy: z.string().optional(),
    createdAt: z.bigint().optional(),
  })
  .transform(d => ({
    artifact_type: d.artifactType,
    artifact_matchers: d.artifactMatchers,
    metastore_id: d.metastoreId,
    created_by: d.createdBy,
    created_at: d.createdAt,
  }));
