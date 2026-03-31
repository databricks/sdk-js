// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The artifact type */
export enum ArtifactType {
  ARTIFACT_TYPE_UNSPECIFIED = 'ARTIFACT_TYPE_UNSPECIFIED',
  INIT_SCRIPT = 'INIT_SCRIPT',
  LIBRARY_JAR = 'LIBRARY_JAR',
  LIBRARY_MAVEN = 'LIBRARY_MAVEN',
}

/** The artifact pattern matching type */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum ArtifactMatcher_MatchType {
  /** In the future, we will add EXACT_MATCH, WILDCARDS, and more types */
  MATCH_TYPE_UNSPECIFIED = 'MATCH_TYPE_UNSPECIFIED',
  PREFIX_MATCH = 'PREFIX_MATCH',
}

export interface ArtifactAllowlistInfo {
  /** A list of allowed artifact match patterns. */
  artifactMatchers?: ArtifactMatcher[] | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Username of the user who set the artifact allowlist. */
  createdBy?: string | undefined;
  /** Time at which this artifact allowlist was set, in epoch milliseconds. */
  createdAt?: number | undefined;
}

export interface ArtifactMatcher {
  /** The artifact path or maven coordinate */
  artifact?: string | undefined;
  /** The pattern matching type of the artifact */
  matchType?: ArtifactMatcher_MatchType | undefined;
}

export interface GetArtifactAllowlist {
  /** The artifact type of the allowlist. */
  artifactType?: ArtifactType | undefined;
}

export interface SetArtifactAllowlist {
  /** The artifact type of the allowlist. */
  artifactType?: ArtifactType | undefined;
  /** A list of allowed artifact match patterns. */
  artifactMatchers?: ArtifactMatcher[] | undefined;
  /** Unique identifier of parent metastore. */
  metastoreId?: string | undefined;
  /** Username of the user who set the artifact allowlist. */
  createdBy?: string | undefined;
  /** Time at which this artifact allowlist was set, in epoch milliseconds. */
  createdAt?: number | undefined;
}

export const unmarshalArtifactAllowlistInfoSchema: z.ZodType<ArtifactAllowlistInfo> =
  z
    .object({
      artifact_matchers: z
        .array(z.lazy(() => unmarshalArtifactMatcherSchema))
        .optional(),
      metastore_id: z.string().optional(),
      created_by: z.string().optional(),
      created_at: z.number().optional(),
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
    match_type: z.enum(ArtifactMatcher_MatchType).optional(),
  })
  .transform(d => ({
    artifact: d.artifact,
    matchType: d.match_type,
  }));

export const unmarshalGetArtifactAllowlistSchema: z.ZodType<GetArtifactAllowlist> =
  z
    .object({
      artifact_type: z.enum(ArtifactType).optional(),
    })
    .transform(d => ({
      artifactType: d.artifact_type,
    }));

export const unmarshalSetArtifactAllowlistSchema: z.ZodType<SetArtifactAllowlist> =
  z
    .object({
      artifact_type: z.enum(ArtifactType).optional(),
      artifact_matchers: z
        .array(z.lazy(() => unmarshalArtifactMatcherSchema))
        .optional(),
      metastore_id: z.string().optional(),
      created_by: z.string().optional(),
      created_at: z.number().optional(),
    })
    .transform(d => ({
      artifactType: d.artifact_type,
      artifactMatchers: d.artifact_matchers,
      metastoreId: d.metastore_id,
      createdBy: d.created_by,
      createdAt: d.created_at,
    }));

export const marshalArtifactAllowlistInfoSchema = z
  .object({
    artifactMatchers: z
      .array(z.lazy(() => marshalArtifactMatcherSchema))
      .optional(),
    metastoreId: z.string().optional(),
    createdBy: z.string().optional(),
    createdAt: z.number().optional(),
  })
  .transform(d => ({
    artifact_matchers: d.artifactMatchers,
    metastore_id: d.metastoreId,
    created_by: d.createdBy,
    created_at: d.createdAt,
  }));

export const marshalArtifactMatcherSchema = z
  .object({
    artifact: z.string().optional(),
    matchType: z.enum(ArtifactMatcher_MatchType).optional(),
  })
  .transform(d => ({
    artifact: d.artifact,
    match_type: d.matchType,
  }));

export const marshalGetArtifactAllowlistSchema = z
  .object({
    artifactType: z.enum(ArtifactType).optional(),
  })
  .transform(d => ({
    artifact_type: d.artifactType,
  }));

export const marshalSetArtifactAllowlistSchema = z
  .object({
    artifactType: z.enum(ArtifactType).optional(),
    artifactMatchers: z
      .array(z.lazy(() => marshalArtifactMatcherSchema))
      .optional(),
    metastoreId: z.string().optional(),
    createdBy: z.string().optional(),
    createdAt: z.number().optional(),
  })
  .transform(d => ({
    artifact_type: d.artifactType,
    artifact_matchers: d.artifactMatchers,
    metastore_id: d.metastoreId,
    created_by: d.createdBy,
    created_at: d.createdAt,
  }));
