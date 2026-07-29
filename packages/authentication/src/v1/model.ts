// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

export interface CreateAccountFederationPolicyRequest {
  /** The account id for the federation policy. */
  accountId?: string | undefined;
  /** The service principal id for the federation policy. */
  servicePrincipalId?: bigint | undefined;
  /**
   * The identifier for the federation policy. The identifier must contain only lowercase
   * alphanumeric characters, numbers, hyphens, and slashes. If unspecified, the id will be
   * assigned by <Databricks>.
   */
  policyId?: string | undefined;
  policy: CreateFederationPolicy;
}

export interface CreateFederationPolicy {
  /** Description of the federation policy. */
  description?: string | undefined;
  policy?:
    | {$case: 'oidcPolicy'; oidcPolicy: CreateOidcFederationPolicy}
    | undefined;
}

/** Specifies the policy to use for validating OIDC claims in your federated tokens. */
export interface CreateOidcFederationPolicy {
  /** The required token issuer, as specified in the 'iss' claim of federated tokens. */
  issuer?: string | undefined;
  /**
   * The required token subject, as specified in the subject claim of federated tokens.
   * Must be specified for service principal federation policies. Must not be specified
   * for account federation policies.
   */
  subject?: string | undefined;
  /**
   * The allowed token audiences, as specified in the 'aud' claim of federated tokens.
   * The audience identifier is intended to represent the recipient of the token.
   * Can be any non-empty string value. As long as the audience in the token matches
   * at least one audience in the policy, the token is considered a match. If audiences
   * is unspecified, defaults to your <Databricks> account id.
   */
  audiences?: string[] | undefined;
  /**
   * The claim that contains the subject of the token. If unspecified, the default value
   * is 'sub'.
   */
  subjectClaim?: string | undefined;
  /**
   * URL of the public keys used to validate the signature of federated tokens, in
   * JWKS format. Most use cases should not need to specify this field. If jwks_uri
   * and jwks_json are both unspecified (recommended), <Databricks> automatically
   * fetches the public keys from your issuer’s well known endpoint. Databricks
   * strongly recommends relying on your issuer’s well known endpoint for discovering
   * public keys.
   */
  jwksUri?: string | undefined;
  /**
   * The public keys used to validate the signature of federated tokens, in JWKS format.
   * Most use cases should not need to specify this field. If jwks_uri and jwks_json
   * are both unspecified (recommended), <Databricks> automatically fetches the public
   * keys from your issuer’s well known endpoint. Databricks strongly recommends
   * relying on your issuer’s well known endpoint for discovering public keys.
   */
  jwksJson?: string | undefined;
}

export interface CreateServicePrincipalFederationPolicyRequest {
  /** The account id for the federation policy. */
  accountId?: string | undefined;
  /** The service principal id for the federation policy. */
  servicePrincipalId?: bigint | undefined;
  /**
   * The identifier for the federation policy. The identifier must contain only lowercase
   * alphanumeric characters, numbers, hyphens, and slashes. If unspecified, the id will be
   * assigned by <Databricks>.
   */
  policyId?: string | undefined;
  policy: CreateFederationPolicy;
}

export interface CreateServicePrincipalSecretRequest {
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

export interface DeleteAccountFederationPolicyRequest {
  /** The account id for the federation policy. */
  accountId?: string | undefined;
  /** The service principal id for the federation policy. */
  servicePrincipalId?: bigint | undefined;
  /** The identifier for the federation policy. */
  policyId?: string | undefined;
}

export interface DeleteServicePrincipalFederationPolicyRequest {
  /** The account id for the federation policy. */
  accountId?: string | undefined;
  /** The service principal id for the federation policy. */
  servicePrincipalId?: bigint | undefined;
  /** The identifier for the federation policy. */
  policyId?: string | undefined;
}

export interface DeleteServicePrincipalSecretRequest {
  /** The account ID. */
  accountId?: string | undefined;
  /** The service principal ID. */
  servicePrincipal?: string | undefined;
  /** The secret ID. */
  secretId?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteServicePrincipalSecretResponse {}

export interface FederationPolicy {
  /**
   * Resource name for the federation policy. Example values include
   * `accounts/<account-id>/federationPolicies/my-federation-policy` for Account Federation Policies, and
   * `accounts/<account-id>/servicePrincipals/<service-principal-id>/federationPolicies/my-federation-policy`
   * for Service Principal Federation Policies. Typically an output parameter, which does not need to be
   * specified in create or update requests. If specified in a request, must match the value in the
   * request URL.
   */
  name?: string | undefined;
  /** Description of the federation policy. */
  description?: string | undefined;
  policy?: {$case: 'oidcPolicy'; oidcPolicy: OidcFederationPolicy} | undefined;
  /** Creation time of the federation policy. */
  createTime?: Temporal.Instant | undefined;
  /** Last update time of the federation policy. */
  updateTime?: Temporal.Instant | undefined;
  /** Unique, immutable id of the federation policy. */
  uid?: string | undefined;
  /** The service principal ID that this federation policy applies to. Output only. Only set for service principal federation policies. */
  servicePrincipalId?: bigint | undefined;
  /** The ID of the federation policy. Output only. */
  policyId?: string | undefined;
}

export interface GetAccountFederationPolicyRequest {
  /** The account id for the federation policy. */
  accountId?: string | undefined;
  /** The service principal id for the federation policy. */
  servicePrincipalId?: bigint | undefined;
  /** The identifier for the federation policy. */
  policyId?: string | undefined;
}

export interface GetServicePrincipalFederationPolicyRequest {
  /** The account id for the federation policy. */
  accountId?: string | undefined;
  /** The service principal id for the federation policy. */
  servicePrincipalId?: bigint | undefined;
  /** The identifier for the federation policy. */
  policyId?: string | undefined;
}

export interface ListAccountFederationPoliciesRequest {
  /** The account id for the federation policy. */
  accountId?: string | undefined;
  /** The service principal id for the federation policy. */
  servicePrincipalId?: bigint | undefined;
  pageSize?: number | undefined;
  pageToken?: string | undefined;
}

export interface ListFederationPoliciesResponse {
  policies?: FederationPolicy[] | undefined;
  nextPageToken?: string | undefined;
}

export interface ListServicePrincipalFederationPoliciesRequest {
  /** The account id for the federation policy. */
  accountId?: string | undefined;
  /** The service principal id for the federation policy. */
  servicePrincipalId?: bigint | undefined;
  pageSize?: number | undefined;
  pageToken?: string | undefined;
}

export interface ListServicePrincipalSecretsRequest {
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

export interface ListServicePrincipalSecretsResponse {
  /** List of the secrets */
  secrets?: ServicePrincipalSecret[] | undefined;
  /** A token, which can be sent as `page_token` to retrieve the next page. */
  nextPageToken?: string | undefined;
}

/** Specifies the policy to use for validating OIDC claims in your federated tokens. */
export interface OidcFederationPolicy {
  /** The required token issuer, as specified in the 'iss' claim of federated tokens. */
  issuer?: string | undefined;
  /**
   * The required token subject, as specified in the subject claim of federated tokens.
   * Must be specified for service principal federation policies. Must not be specified
   * for account federation policies.
   */
  subject?: string | undefined;
  /**
   * The allowed token audiences, as specified in the 'aud' claim of federated tokens.
   * The audience identifier is intended to represent the recipient of the token.
   * Can be any non-empty string value. As long as the audience in the token matches
   * at least one audience in the policy, the token is considered a match. If audiences
   * is unspecified, defaults to your <Databricks> account id.
   */
  audiences?: string[] | undefined;
  /**
   * The claim that contains the subject of the token. If unspecified, the default value
   * is 'sub'.
   */
  subjectClaim?: string | undefined;
  /**
   * URL of the public keys used to validate the signature of federated tokens, in
   * JWKS format. Most use cases should not need to specify this field. If jwks_uri
   * and jwks_json are both unspecified (recommended), <Databricks> automatically
   * fetches the public keys from your issuer’s well known endpoint. Databricks
   * strongly recommends relying on your issuer’s well known endpoint for discovering
   * public keys.
   */
  jwksUri?: string | undefined;
  /**
   * The public keys used to validate the signature of federated tokens, in JWKS format.
   * Most use cases should not need to specify this field. If jwks_uri and jwks_json
   * are both unspecified (recommended), <Databricks> automatically fetches the public
   * keys from your issuer’s well known endpoint. Databricks strongly recommends
   * relying on your issuer’s well known endpoint for discovering public keys.
   */
  jwksJson?: string | undefined;
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

export interface UpdateAccountFederationPolicyRequest {
  /** The account id for the federation policy. */
  accountId?: string | undefined;
  /** The service principal id for the federation policy. */
  servicePrincipalId?: bigint | undefined;
  /** The identifier for the federation policy. */
  policyId?: string | undefined;
  policy?: UpdateFederationPolicy | undefined;
  /**
   * The field mask specifies which fields of the policy to update. To specify multiple fields
   * in the field mask, use comma as the separator (no space). The special value '*' indicates
   * that all fields should be updated (full replacement). If unspecified, all fields that are
   * set in the policy provided in the update request will overwrite the corresponding fields
   * in the existing policy. Example value: 'description,oidc_policy.audiences'.
   */
  updateMask?: FieldMask<UpdateFederationPolicy> | undefined;
}

export interface UpdateFederationPolicy {
  /** Description of the federation policy. */
  description?: string | undefined;
  policy?:
    | {$case: 'oidcPolicy'; oidcPolicy: UpdateOidcFederationPolicy}
    | undefined;
}

/** Specifies the policy to use for validating OIDC claims in your federated tokens. */
export interface UpdateOidcFederationPolicy {
  /** The required token issuer, as specified in the 'iss' claim of federated tokens. */
  issuer?: string | undefined;
  /**
   * The required token subject, as specified in the subject claim of federated tokens.
   * Must be specified for service principal federation policies. Must not be specified
   * for account federation policies.
   */
  subject?: string | undefined;
  /**
   * The allowed token audiences, as specified in the 'aud' claim of federated tokens.
   * The audience identifier is intended to represent the recipient of the token.
   * Can be any non-empty string value. As long as the audience in the token matches
   * at least one audience in the policy, the token is considered a match. If audiences
   * is unspecified, defaults to your <Databricks> account id.
   */
  audiences?: string[] | undefined;
  /**
   * The claim that contains the subject of the token. If unspecified, the default value
   * is 'sub'.
   */
  subjectClaim?: string | undefined;
  /**
   * URL of the public keys used to validate the signature of federated tokens, in
   * JWKS format. Most use cases should not need to specify this field. If jwks_uri
   * and jwks_json are both unspecified (recommended), <Databricks> automatically
   * fetches the public keys from your issuer’s well known endpoint. Databricks
   * strongly recommends relying on your issuer’s well known endpoint for discovering
   * public keys.
   */
  jwksUri?: string | undefined;
  /**
   * The public keys used to validate the signature of federated tokens, in JWKS format.
   * Most use cases should not need to specify this field. If jwks_uri and jwks_json
   * are both unspecified (recommended), <Databricks> automatically fetches the public
   * keys from your issuer’s well known endpoint. Databricks strongly recommends
   * relying on your issuer’s well known endpoint for discovering public keys.
   */
  jwksJson?: string | undefined;
}

export interface UpdateServicePrincipalFederationPolicyRequest {
  /** The account id for the federation policy. */
  accountId?: string | undefined;
  /** The service principal id for the federation policy. */
  servicePrincipalId?: bigint | undefined;
  /** The identifier for the federation policy. */
  policyId?: string | undefined;
  policy?: UpdateFederationPolicy | undefined;
  /**
   * The field mask specifies which fields of the policy to update. To specify multiple fields
   * in the field mask, use comma as the separator (no space). The special value '*' indicates
   * that all fields should be updated (full replacement). If unspecified, all fields that are
   * set in the policy provided in the update request will overwrite the corresponding fields
   * in the existing policy. Example value: 'description,oidc_policy.audiences'.
   */
  updateMask?: FieldMask<UpdateFederationPolicy> | undefined;
}

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

export const unmarshalDeleteServicePrincipalSecretResponseSchema: z.ZodType<DeleteServicePrincipalSecretResponse> =
  z.object({});

export const unmarshalFederationPolicySchema: z.ZodType<FederationPolicy> = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    oidc_policy: z.lazy(() => unmarshalOidcFederationPolicySchema).optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    uid: z.string().optional(),
    service_principal_id: z
      .union([z.number(), z.bigint()])
      .transform(v => BigInt(v))
      .optional(),
    policy_id: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    description: d.description,
    policy:
      d.oidc_policy !== undefined
        ? {$case: 'oidcPolicy' as const, oidcPolicy: d.oidc_policy}
        : undefined,
    createTime: d.create_time,
    updateTime: d.update_time,
    uid: d.uid,
    servicePrincipalId: d.service_principal_id,
    policyId: d.policy_id,
  }));

export const unmarshalListFederationPoliciesResponseSchema: z.ZodType<ListFederationPoliciesResponse> =
  z
    .object({
      policies: z
        .array(z.lazy(() => unmarshalFederationPolicySchema))
        .optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      policies: d.policies,
      nextPageToken: d.next_page_token,
    }));

export const unmarshalListServicePrincipalSecretsResponseSchema: z.ZodType<ListServicePrincipalSecretsResponse> =
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

export const unmarshalOidcFederationPolicySchema: z.ZodType<OidcFederationPolicy> =
  z
    .object({
      issuer: z.string().optional(),
      subject: z.string().optional(),
      audiences: z.array(z.string()).optional(),
      subject_claim: z.string().optional(),
      jwks_uri: z.string().optional(),
      jwks_json: z.string().optional(),
    })
    .transform(d => ({
      issuer: d.issuer,
      subject: d.subject,
      audiences: d.audiences,
      subjectClaim: d.subject_claim,
      jwksUri: d.jwks_uri,
      jwksJson: d.jwks_json,
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

export const marshalCreateFederationPolicySchema: z.ZodType = z
  .object({
    description: z.string().optional(),
    policy: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('oidcPolicy'),
          oidcPolicy: z.lazy(() => marshalCreateOidcFederationPolicySchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    description: d.description,
    ...(d.policy?.$case === 'oidcPolicy' && {oidc_policy: d.policy.oidcPolicy}),
  }));

export const marshalCreateOidcFederationPolicySchema: z.ZodType = z
  .object({
    issuer: z.string().optional(),
    subject: z.string().optional(),
    audiences: z.array(z.string()).optional(),
    subjectClaim: z.string().optional(),
    jwksUri: z.string().optional(),
    jwksJson: z.string().optional(),
  })
  .transform(d => ({
    issuer: d.issuer,
    subject: d.subject,
    audiences: d.audiences,
    subject_claim: d.subjectClaim,
    jwks_uri: d.jwksUri,
    jwks_json: d.jwksJson,
  }));

export const marshalCreateServicePrincipalSecretRequestSchema: z.ZodType = z
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

export const marshalUpdateFederationPolicySchema: z.ZodType = z
  .object({
    description: z.string().optional(),
    policy: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('oidcPolicy'),
          oidcPolicy: z.lazy(() => marshalUpdateOidcFederationPolicySchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    description: d.description,
    ...(d.policy?.$case === 'oidcPolicy' && {oidc_policy: d.policy.oidcPolicy}),
  }));

export const marshalUpdateOidcFederationPolicySchema: z.ZodType = z
  .object({
    issuer: z.string().optional(),
    subject: z.string().optional(),
    audiences: z.array(z.string()).optional(),
    subjectClaim: z.string().optional(),
    jwksUri: z.string().optional(),
    jwksJson: z.string().optional(),
  })
  .transform(d => ({
    issuer: d.issuer,
    subject: d.subject,
    audiences: d.audiences,
    subject_claim: d.subjectClaim,
    jwks_uri: d.jwksUri,
    jwks_json: d.jwksJson,
  }));

const updateFederationPolicyFieldMaskSchema: FieldMaskSchema = {
  description: {wire: 'description'},
  oidcPolicy: {
    wire: 'oidc_policy',
    children: () => updateOidcFederationPolicyFieldMaskSchema,
  },
};

export function updateFederationPolicyFieldMask(
  ...paths: string[]
): FieldMask<UpdateFederationPolicy> {
  return FieldMask.build<UpdateFederationPolicy>(
    paths,
    updateFederationPolicyFieldMaskSchema
  );
}

const updateOidcFederationPolicyFieldMaskSchema: FieldMaskSchema = {
  audiences: {wire: 'audiences'},
  issuer: {wire: 'issuer'},
  jwksJson: {wire: 'jwks_json'},
  jwksUri: {wire: 'jwks_uri'},
  subject: {wire: 'subject'},
  subjectClaim: {wire: 'subject_claim'},
};
