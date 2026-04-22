// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export interface CreateServicePrincipalSecret {
  /** The account ID. */
  accountId?: string | undefined;
  /** The service principal ID. */
  servicePrincipal?: string | undefined;
  /** The lifetime of the secret in seconds. If this parameter is not provided, the secret will have a default lifetime of 730 days (63072000s). */
  lifetime?: Temporal.Duration | undefined;
}

export interface CreateServicePrincipalSecretResponse {
  /** ID of the secret */
  id?: string | undefined;
  /** Secret Value */
  secret?: string | undefined;
  /** Secret Hash */
  secretHash?: string | undefined;
  /** UTC time when the secret was created */
  createTime?: string | undefined;
  /** UTC time when the secret was updated */
  updateTime?: string | undefined;
  /** Status of the secret */
  status?: string | undefined;
  /** UTC time when the secret will expire. If the field is not present, the secret does not expire. */
  expireTime?: Temporal.Instant | undefined;
}

export interface DeleteServicePrincipalSecret {
  /** The account ID. */
  accountId?: string | undefined;
  /** The service principal ID. */
  servicePrincipal?: string | undefined;
  /** The secret ID. */
  secretId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteServicePrincipalSecret_Response {}

export interface ListServicePrincipalSecrets {
  /** The account ID. */
  accountId?: string | undefined;
  /** The service principal ID. */
  servicePrincipal?: string | undefined;
  /**
   * An opaque page token which was the `next_page_token` in the response of the previous request to list the secrets for this service principal. Provide this token to retrieve the next page of secret entries.
   * When providing a `page_token`, all other parameters provided to the request must match the previous request.
   * To list all of the secrets for a service principal, it is necessary to continue requesting pages of entries until the response contains no `next_page_token`. Note that the number of entries returned must not be used to determine when the listing is complete.
   */
  pageToken?: string | undefined;
  pageSize?: number | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListServicePrincipalSecrets_Response {
  /** List of the secrets */
  secrets?: ServicePrincipalSecret[] | undefined;
  /** A token, which can be sent as `page_token` to retrieve the next page. */
  nextPageToken?: string | undefined;
}

export interface ServicePrincipalSecret {
  /** ID of the secret */
  id?: string | undefined;
  /** Secret Value */
  secret?: string | undefined;
  /** Secret Hash */
  secretHash?: string | undefined;
  /** UTC time when the secret was created */
  createTime?: string | undefined;
  /** UTC time when the secret was updated */
  updateTime?: string | undefined;
  /** Status of the secret */
  status?: string | undefined;
  /** UTC time when the secret will expire. If the field is not present, the secret does not expire. */
  expireTime?: Temporal.Instant | undefined;
}

export const unmarshalCreateServicePrincipalSecretSchema: z.ZodType<CreateServicePrincipalSecret> =
  z
    .object({
      account_id: z.string().optional(),
      service_principal: z.string().optional(),
      lifetime: z
        .string()
        .transform(s => Temporal.Duration.from('PT' + s.toUpperCase()))
        .optional(),
    })
    .transform(d => ({
      accountId: d.account_id,
      servicePrincipal: d.service_principal,
      lifetime: d.lifetime,
    }));

export const unmarshalCreateServicePrincipalSecretResponseSchema: z.ZodType<CreateServicePrincipalSecretResponse> =
  z
    .object({
      id: z.string().optional(),
      secret: z.string().optional(),
      secret_hash: z.string().optional(),
      create_time: z.string().optional(),
      update_time: z.string().optional(),
      status: z.string().optional(),
      expire_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      id: d.id,
      secret: d.secret,
      secretHash: d.secret_hash,
      createTime: d.create_time,
      updateTime: d.update_time,
      status: d.status,
      expireTime: d.expire_time,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteServicePrincipalSecret_ResponseSchema: z.ZodType<DeleteServicePrincipalSecret_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListServicePrincipalSecrets_ResponseSchema: z.ZodType<ListServicePrincipalSecrets_Response> =
  z
    .object({
      secrets: z
        .array(z.lazy(() => unmarshalServicePrincipalSecretSchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      secrets: d.secrets,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalServicePrincipalSecretSchema: z.ZodType<ServicePrincipalSecret> =
  z
    .object({
      id: z.string().optional(),
      secret: z.string().optional(),
      secret_hash: z.string().optional(),
      create_time: z.string().optional(),
      update_time: z.string().optional(),
      status: z.string().optional(),
      expire_time: z
        .string()
        .transform(s => Temporal.Instant.from(s))
        .optional(),
    })
    .transform(d => ({
      id: d.id,
      secret: d.secret,
      secretHash: d.secret_hash,
      createTime: d.create_time,
      updateTime: d.update_time,
      status: d.status,
      expireTime: d.expire_time,
    }));

export const marshalCreateServicePrincipalSecretSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    servicePrincipal: z.string().optional(),
    lifetime: z
      .any()
      .transform((d: Temporal.Duration) => d.toString().slice(2).toLowerCase())
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    service_principal: d.servicePrincipal,
    lifetime: d.lifetime,
  }));

export const marshalCreateServicePrincipalSecretResponseSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    secret: z.string().optional(),
    secretHash: z.string().optional(),
    createTime: z.string().optional(),
    updateTime: z.string().optional(),
    status: z.string().optional(),
    expireTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    id: d.id,
    secret: d.secret,
    secret_hash: d.secretHash,
    create_time: d.createTime,
    update_time: d.updateTime,
    status: d.status,
    expire_time: d.expireTime,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalDeleteServicePrincipalSecret_ResponseSchema: z.ZodType =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalListServicePrincipalSecrets_ResponseSchema: z.ZodType = z
  .object({
    secrets: z
      .array(z.lazy(() => marshalServicePrincipalSecretSchema))
      .optional(),
    nextPageToken: z.string().optional(),
  })
  .transform(d => ({
    secrets: d.secrets,
    next_page_token: d.nextPageToken,
  }));

export const marshalServicePrincipalSecretSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    secret: z.string().optional(),
    secretHash: z.string().optional(),
    createTime: z.string().optional(),
    updateTime: z.string().optional(),
    status: z.string().optional(),
    expireTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    id: d.id,
    secret: d.secret,
    secret_hash: d.secretHash,
    create_time: d.createTime,
    update_time: d.updateTime,
    status: d.status,
    expire_time: d.expireTime,
  }));

const createServicePrincipalSecretFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  lifetime: {wire: 'lifetime'},
  servicePrincipal: {wire: 'service_principal'},
};

export function createServicePrincipalSecretFieldMask(
  ...paths: string[]
): FieldMask<CreateServicePrincipalSecret> {
  return FieldMask.build<CreateServicePrincipalSecret>(
    paths,
    createServicePrincipalSecretFieldMaskSchema
  );
}

const createServicePrincipalSecretResponseFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  expireTime: {wire: 'expire_time'},
  id: {wire: 'id'},
  secret: {wire: 'secret'},
  secretHash: {wire: 'secret_hash'},
  status: {wire: 'status'},
  updateTime: {wire: 'update_time'},
};

export function createServicePrincipalSecretResponseFieldMask(
  ...paths: string[]
): FieldMask<CreateServicePrincipalSecretResponse> {
  return FieldMask.build<CreateServicePrincipalSecretResponse>(
    paths,
    createServicePrincipalSecretResponseFieldMaskSchema
  );
}

const deleteServicePrincipalSecretFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  secretId: {wire: 'secret_id'},
  servicePrincipal: {wire: 'service_principal'},
};

export function deleteServicePrincipalSecretFieldMask(
  ...paths: string[]
): FieldMask<DeleteServicePrincipalSecret> {
  return FieldMask.build<DeleteServicePrincipalSecret>(
    paths,
    deleteServicePrincipalSecretFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const deleteServicePrincipalSecret_ResponseFieldMaskSchema: FieldMaskSchema =
  {};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function deleteServicePrincipalSecret_ResponseFieldMask(
  ...paths: string[]
): FieldMask<DeleteServicePrincipalSecret_Response> {
  return FieldMask.build<DeleteServicePrincipalSecret_Response>(
    paths,
    deleteServicePrincipalSecret_ResponseFieldMaskSchema
  );
}

const listServicePrincipalSecretsFieldMaskSchema: FieldMaskSchema = {
  accountId: {wire: 'account_id'},
  pageSize: {wire: 'page_size'},
  pageToken: {wire: 'page_token'},
  servicePrincipal: {wire: 'service_principal'},
};

export function listServicePrincipalSecretsFieldMask(
  ...paths: string[]
): FieldMask<ListServicePrincipalSecrets> {
  return FieldMask.build<ListServicePrincipalSecrets>(
    paths,
    listServicePrincipalSecretsFieldMaskSchema
  );
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const listServicePrincipalSecrets_ResponseFieldMaskSchema: FieldMaskSchema = {
  nextPageToken: {wire: 'next_page_token'},
  secrets: {wire: 'secrets'},
};

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export function listServicePrincipalSecrets_ResponseFieldMask(
  ...paths: string[]
): FieldMask<ListServicePrincipalSecrets_Response> {
  return FieldMask.build<ListServicePrincipalSecrets_Response>(
    paths,
    listServicePrincipalSecrets_ResponseFieldMaskSchema
  );
}

const servicePrincipalSecretFieldMaskSchema: FieldMaskSchema = {
  createTime: {wire: 'create_time'},
  expireTime: {wire: 'expire_time'},
  id: {wire: 'id'},
  secret: {wire: 'secret'},
  secretHash: {wire: 'secret_hash'},
  status: {wire: 'status'},
  updateTime: {wire: 'update_time'},
};

export function servicePrincipalSecretFieldMask(
  ...paths: string[]
): FieldMask<ServicePrincipalSecret> {
  return FieldMask.build<ServicePrincipalSecret>(
    paths,
    servicePrincipalSecretFieldMaskSchema
  );
}
