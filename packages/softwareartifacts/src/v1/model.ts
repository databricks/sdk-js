// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Image acceleration status for a software artifact version. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ImageAccelerationDetail_Status = {
  /** Image acceleration has not been recorded for this version. */
  UNSPECIFIED: 'UNSPECIFIED',
  /** Image acceleration completed successfully for this version. */
  SUCCESS: 'SUCCESS',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type ImageAccelerationDetail_Status =
  | (typeof ImageAccelerationDetail_Status)[keyof typeof ImageAccelerationDetail_Status]
  | (string & {});

/** Request to get a software artifact. */
export interface GetSoftwareArtifactRequest {
  /**
   * Resource name of the artifact, of the form
   * `software-artifacts/{catalog}.{schema}.{artifact}`.
   */
  name?: string | undefined;
}

/** Request to get a software artifact version. */
export interface GetSoftwareArtifactVersionRequest {
  /**
   * Resource name of the version, of the form
   * `software-artifacts/{catalog}.{schema}.{artifact}/versions/{version}`.
   */
  name?: string | undefined;
}

/** Image acceleration information for a software artifact version. */
export interface ImageAccelerationDetail {
  /** Image acceleration status for the version. */
  status?: ImageAccelerationDetail_Status | undefined;
}

/** Request to list the versions of a software artifact. */
export interface ListSoftwareArtifactVersionsRequest {
  /**
   * Resource name of the parent artifact, of the form
   * `software-artifacts/{catalog}.{schema}.{artifact}`.
   */
  parent?: string | undefined;
  /** Opaque continuation token from a previous response's next_page_token. Omit for the first page. */
  pageToken?: string | undefined;
  /**
   * Maximum number of versions to return. If omitted or set to 0, the page size defaults to 50.
   * The maximum value is 50; values above 50 or below 0 are rejected.
   */
  pageSize?: number | undefined;
}

/** Response containing a page of software artifact versions. */
export interface ListSoftwareArtifactVersionsResponse {
  /** The versions of the requested software artifact. */
  softwareArtifactVersions?: SoftwareArtifactVersion[] | undefined;
  /** Opaque token to pass as the next request's page_token. Empty when there are no more pages. */
  nextPageToken?: string | undefined;
}

/** Request to list the software artifacts under a schema. */
export interface ListSoftwareArtifactsRequest {
  /** Resource name of the parent schema, of the form `schemas/{catalog}.{schema}`. */
  parent?: string | undefined;
  /** Opaque continuation token from a previous response's next_page_token. Omit for the first page. */
  pageToken?: string | undefined;
  /**
   * Maximum number of software artifacts to return. If omitted or set to 0, the page size defaults
   * to 50. The maximum value is 50; values above 50 or below 0 are rejected.
   */
  pageSize?: number | undefined;
}

/** Response containing a page of software artifacts. */
export interface ListSoftwareArtifactsResponse {
  /** The software artifacts under the requested schema. */
  softwareArtifacts?: SoftwareArtifact[] | undefined;
  /** Opaque token to pass as the next request's page_token. Empty when there are no more pages. */
  nextPageToken?: string | undefined;
}

/** Request to resolve a software artifact version from its tag alias. */
export interface ResolveSoftwareArtifactVersionRequest {
  /** Resource name of the software artifact containing the alias. */
  parent?: string | undefined;
  /** Image tag alias selecting the version. */
  alias?: string | undefined;
}

/** Response containing the resolved software artifact version. */
export interface ResolveSoftwareArtifactVersionResponse {
  /** The software artifact version selected by the alias. */
  softwareArtifactVersion?: SoftwareArtifactVersion | undefined;
}

/** A software artifact in a Unity Catalog schema. */
export interface SoftwareArtifact {
  /**
   * Resource name of the artifact, of the form
   * `software-artifacts/{catalog}.{schema}.{artifact}`.
   */
  name?: string | undefined;
  /** Principal name (a user, service principal, or group) that owns this artifact. */
  owner?: string | undefined;
  /** Time at which this software artifact was created. */
  createTime?: Temporal.Instant | undefined;
  /** Principal name of the software artifact creator. */
  createdBy?: string | undefined;
  /** Time at which this software artifact was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** Principal name that last updated this software artifact. */
  updatedBy?: string | undefined;
}

/** An immutable version of a software artifact, identified by its content digest. */
export interface SoftwareArtifactVersion {
  /** Content digest of the version, for example `sha256:...`. */
  digest?: string | undefined;
  /**
   * Resource name of the version, of the form
   * `software-artifacts/{catalog}.{schema}.{artifact}/versions/{version}`.
   */
  name?: string | undefined;
  /**
   * Tags (aliases) that currently point at this version, for example `latest` or `v1.2.3`.
   * Bounded at 10 per version; a version pointed at by more tags returns an arbitrary 10 of them.
   */
  tags?: string[] | undefined;
  /** Image acceleration information for this version. */
  imageAccelerationDetails?: ImageAccelerationDetail | undefined;
  /** Time at which this software artifact version was created. */
  createTime?: Temporal.Instant | undefined;
  /** Principal name of the software artifact version creator. */
  createdBy?: string | undefined;
  /** Time at which this software artifact version was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** Principal name that last updated this software artifact version. */
  updatedBy?: string | undefined;
}

/** Request to update a software artifact. The name is immutable; only the owner may be changed. */
export interface UpdateSoftwareArtifactRequest {
  /**
   * The software artifact to update. Its name identifies the existing artifact; only owner may be
   * changed.
   */
  softwareArtifact?: SoftwareArtifact | undefined;
  /**
   * Fields to update, relative to `software_artifact`. Accepts `owner` or `*`; owner is the only
   * mutable field, so both select the same update. Output-only values in the resource are ignored.
   */
  updateMask?: FieldMask<SoftwareArtifact> | undefined;
}

export const unmarshalImageAccelerationDetailSchema: z.ZodType<ImageAccelerationDetail> =
  z
    .object({
      status: z.string().optional(),
    })
    .transform(d => ({
      status: d.status,
    }));

export const unmarshalListSoftwareArtifactVersionsResponseSchema: z.ZodType<ListSoftwareArtifactVersionsResponse> =
  z
    .object({
      software_artifact_versions: z
        .array(z.lazy(() => unmarshalSoftwareArtifactVersionSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      softwareArtifactVersions: d.software_artifact_versions,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListSoftwareArtifactsResponseSchema: z.ZodType<ListSoftwareArtifactsResponse> =
  z
    .object({
      software_artifacts: z
        .array(z.lazy(() => unmarshalSoftwareArtifactSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      softwareArtifacts: d.software_artifacts,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalResolveSoftwareArtifactVersionResponseSchema: z.ZodType<ResolveSoftwareArtifactVersionResponse> =
  z
    .object({
      software_artifact_version: z
        .lazy(() => unmarshalSoftwareArtifactVersionSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      softwareArtifactVersion: d.software_artifact_version,
    }));

export const unmarshalSoftwareArtifactSchema: z.ZodType<SoftwareArtifact> = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    created_by: z.string().optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    updated_by: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    createTime: d.create_time,
    createdBy: d.created_by,
    updateTime: d.update_time,
    updatedBy: d.updated_by,
  }));

export const unmarshalSoftwareArtifactVersionSchema: z.ZodType<SoftwareArtifactVersion> =
  z
    .object({
      digest: z.string().optional(),
      name: z.string().optional(),
      tags: z.array(z.string()).optional(),
      image_acceleration_details: z
        .lazy(() => unmarshalImageAccelerationDetailSchema)
        .nullish()
        .transform(v => v ?? undefined),
      create_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      created_by: z.string().optional(),
      update_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
      updated_by: z.string().optional(),
    })
    .transform(d => ({
      digest: d.digest,
      name: d.name,
      tags: d.tags,
      imageAccelerationDetails: d.image_acceleration_details,
      createTime: d.create_time,
      createdBy: d.created_by,
      updateTime: d.update_time,
      updatedBy: d.updated_by,
    }));

export const marshalResolveSoftwareArtifactVersionRequestSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
    alias: z.string().optional(),
  })
  .transform(d => ({
    parent: d.parent,
    alias: d.alias,
  }));

export const marshalSoftwareArtifactSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    createdBy: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    updatedBy: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    create_time: d.createTime,
    created_by: d.createdBy,
    update_time: d.updateTime,
    updated_by: d.updatedBy,
  }));

const softwareArtifactFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  createdBy: {wire: 'created_by'},
  name: {wire: 'name'},
  owner: {wire: 'owner'},
  updateTime: {wire: 'update_time'},
  updatedBy: {wire: 'updated_by'},
};

export function softwareArtifactFieldMask(
  ...paths: string[]
): FieldMask<SoftwareArtifact> {
  return FieldMask.build<SoftwareArtifact>(
    paths,
    softwareArtifactFieldMaskSchema
  );
}
