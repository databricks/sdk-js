// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/**
 * A secret stored in Unity Catalog. Secrets are three-level namespace objects
 * (catalog.schema.secret) that securely store sensitive credential data such as
 * passwords, tokens, and keys.
 */
export interface CreateSecret {
  /** The name of the secret, relative to its parent schema. */
  name: string;
  /**
   * The owner of the secret. Defaults to the creating principal on creation. Can be updated to
   * transfer ownership of the secret to another principal.
   */
  owner?: string | undefined;
  /** User-provided free-form text description of the secret. */
  comment?: string | undefined;
  /** The name of the catalog where the schema and the secret reside. */
  catalogName: string;
  /** The name of the schema where the secret resides. */
  schemaName: string;
  /**
   * The secret value to store. This field is input-only and is not returned in responses — use
   * the **effective_value** field (via GetSecret with **include_value** set to true) to read the
   * secret value. The maximum size is 60 KiB (pre-encryption). Accepted content includes
   * passwords, tokens, keys, and other sensitive credential data.
   */
  value: string;
  /**
   * User-provided expiration time of the secret. This field indicates when the secret should no
   * longer be used and may be displayed as a warning in the UI. It is purely informational and
   * does not trigger any automatic actions or affect the secret's lifecycle.
   */
  expireTime?: Temporal.Instant | undefined;
}

/** Request message for CreateSecret. */
export interface CreateSecretRequest {
  /**
   * The secret object to create. The **name**, **catalog_name**, **schema_name**, and **value**
   * fields are required.
   */
  secret?: CreateSecret | undefined;
}

/** Request message for DeleteSecret. */
export interface DeleteSecretRequest {
  /**
   * The three-level (fully qualified) name of the secret
   * (for example, **catalog_name.schema_name.secret_name**).
   */
  fullName?: string | undefined;
}

/** Request message for GetSecret. */
export interface GetSecretRequest {
  /**
   * The three-level (fully qualified) name of the secret
   * (for example, **catalog_name.schema_name.secret_name**).
   */
  fullName?: string | undefined;
  /**
   * Whether to include secrets in the response for which you only have the **BROWSE** privilege,
   * which limits access to metadata.
   */
  includeBrowse?: boolean | undefined;
}

/** Request message for ListSecrets. */
export interface ListSecretsRequest {
  /**
   * The name of the catalog under which to list secrets. Both **catalog_name** and
   * **schema_name** must be specified together.
   */
  catalogName?: string | undefined;
  /**
   * The name of the schema under which to list secrets. Both **catalog_name** and
   * **schema_name** must be specified together.
   */
  schemaName?: string | undefined;
  /**
   * Whether to include secrets in the response for which you only have the **BROWSE** privilege,
   * which limits access to metadata.
   */
  includeBrowse?: boolean | undefined;
  /**
   * Opaque pagination token to go to the next page based on previous query. The maximum page length
   * is determined by a server configured value.
   */
  pageToken?: string | undefined;
  /**
   * Maximum number of secrets to return.
   *
   * - If not specified, at most 10000 secrets are returned.
   * - If set to a value greater than 0, the page length is the minimum of this value and 10000.
   * - If set to 0, the page length is set to 10000.
   * - If set to a value less than 0, an invalid parameter error is returned.
   */
  pageSize?: number | undefined;
}

/** Response message for ListSecrets. */
export interface ListSecretsResponse {
  /** An array of secret objects. */
  secrets?: Secret[] | undefined;
  /**
   * Opaque token to retrieve the next page of results. Absent if there are no more pages.
   * **page_token** should be set to this value for the next request.
   */
  nextPageToken?: string | undefined;
}

/**
 * A secret stored in Unity Catalog. Secrets are three-level namespace objects
 * (catalog.schema.secret) that securely store sensitive credential data such as
 * passwords, tokens, and keys.
 */
export interface Secret {
  /** The name of the secret, relative to its parent schema. */
  name?: string | undefined;
  /**
   * The effective owner of the secret, which may differ from the directly-set **owner** due to
   * inheritance.
   */
  effectiveOwner?: string | undefined;
  /** Unique identifier of the metastore hosting the secret. */
  metastoreId?: string | undefined;
  /** The time at which this secret was created. */
  createTime?: Temporal.Instant | undefined;
  /** The principal that created the secret. */
  createdBy?: string | undefined;
  /** The time at which this secret was last updated. */
  updateTime?: Temporal.Instant | undefined;
  /** The principal that last updated the secret. */
  updatedBy?: string | undefined;
  /** User-provided free-form text description of the secret. */
  comment?: string | undefined;
  /** The three-level (fully qualified) name of the secret, in the form of **catalog_name.schema_name.secret_name**. */
  fullName?: string | undefined;
  /** The name of the catalog where the schema and the secret reside. */
  catalogName?: string | undefined;
  /** The name of the schema where the secret resides. */
  schemaName?: string | undefined;
  /**
   * The secret value. Only populated in responses when you have the **READ_SECRET**
   * privilege and **include_value** is set to true in the request. The maximum size is 60 KiB.
   */
  effectiveValue?: string | undefined;
  /**
   * Indicates whether the principal is limited to retrieving metadata for the associated object
   * through the **BROWSE** privilege when **include_browse** is enabled in the request.
   */
  browseOnly?: boolean | undefined;
  /**
   * User-provided expiration time of the secret. This field indicates when the secret should no
   * longer be used and may be displayed as a warning in the UI. It is purely informational and
   * does not trigger any automatic actions or affect the secret's lifecycle.
   */
  expireTime?: Temporal.Instant | undefined;
  externalSecretId?: string | undefined;
}

/**
 * A secret stored in Unity Catalog. Secrets are three-level namespace objects
 * (catalog.schema.secret) that securely store sensitive credential data such as
 * passwords, tokens, and keys.
 */
export interface UpdateSecret {
  /** The name of the secret, relative to its parent schema. */
  name?: string | undefined;
  /**
   * The owner of the secret. Defaults to the creating principal on creation. Can be updated to
   * transfer ownership of the secret to another principal.
   */
  owner?: string | undefined;
  /** User-provided free-form text description of the secret. */
  comment?: string | undefined;
  /** The name of the catalog where the schema and the secret reside. */
  catalogName?: string | undefined;
  /** The name of the schema where the secret resides. */
  schemaName?: string | undefined;
  /**
   * The secret value to store. This field is input-only and is not returned in responses — use
   * the **effective_value** field (via GetSecret with **include_value** set to true) to read the
   * secret value. The maximum size is 60 KiB (pre-encryption). Accepted content includes
   * passwords, tokens, keys, and other sensitive credential data.
   */
  value?: string | undefined;
  /**
   * User-provided expiration time of the secret. This field indicates when the secret should no
   * longer be used and may be displayed as a warning in the UI. It is purely informational and
   * does not trigger any automatic actions or affect the secret's lifecycle.
   */
  expireTime?: Temporal.Instant | undefined;
}

/** Request message for UpdateSecret. */
export interface UpdateSecretRequest {
  /**
   * The three-level (fully qualified) name of the secret
   * (for example, **catalog_name.schema_name.secret_name**).
   */
  fullName?: string | undefined;
  /**
   * The secret object containing the fields to update. Only fields specified in **update_mask**
   * will be updated.
   */
  secret?: UpdateSecret | undefined;
  /**
   * The field mask specifying which fields of the secret to update. Supported fields: **value**,
   * **comment**, **owner**, **expire_time**.
   */
  updateMask?: FieldMask<UpdateSecret> | undefined;
}

export const unmarshalListSecretsResponseSchema: z.ZodType<ListSecretsResponse> =
  z
    .object({
      secrets: z.array(z.lazy(() => unmarshalSecretSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      secrets: d.secrets,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalSecretSchema: z.ZodType<Secret> = z
  .object({
    name: z.string().optional(),
    effective_owner: z.string().optional(),
    metastore_id: z.string().optional(),
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
    comment: z.string().optional(),
    full_name: z.string().optional(),
    catalog_name: z.string().optional(),
    schema_name: z.string().optional(),
    effective_value: z.string().optional(),
    browse_only: z.boolean().optional(),
    expire_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    external_secret_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    effectiveOwner: d.effective_owner,
    metastoreId: d.metastore_id,
    createTime: d.create_time,
    createdBy: d.created_by,
    updateTime: d.update_time,
    updatedBy: d.updated_by,
    comment: d.comment,
    fullName: d.full_name,
    catalogName: d.catalog_name,
    schemaName: d.schema_name,
    effectiveValue: d.effective_value,
    browseOnly: d.browse_only,
    expireTime: d.expire_time,
    externalSecretId: d.external_secret_id,
  }));

export const marshalCreateSecretSchema: z.ZodType = z
  .object({
    name: z.string(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    catalogName: z.string(),
    schemaName: z.string(),
    value: z.string(),
    expireTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    comment: d.comment,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    value: d.value,
    expire_time: d.expireTime,
  }));

export const marshalUpdateSecretSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    owner: z.string().optional(),
    comment: z.string().optional(),
    catalogName: z.string().optional(),
    schemaName: z.string().optional(),
    value: z.string().optional(),
    expireTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    owner: d.owner,
    comment: d.comment,
    catalog_name: d.catalogName,
    schema_name: d.schemaName,
    value: d.value,
    expire_time: d.expireTime,
  }));

const updateSecretFieldMaskSchema: FieldMaskSchema = {
  catalogName: {wire: 'catalog_name'},
  comment: {wire: 'comment'},
  expireTime: {wire: 'expire_time'},
  name: {wire: 'name'},
  owner: {wire: 'owner'},
  schemaName: {wire: 'schema_name'},
  value: {wire: 'value'},
};

export function updateSecretFieldMask(
  ...paths: string[]
): FieldMask<UpdateSecret> {
  return FieldMask.build<UpdateSecret>(paths, updateSecretFieldMaskSchema);
}
