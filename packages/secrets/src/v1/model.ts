// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The ACL permission levels for Secret ACLs applied to secret scopes. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AclPermission = {
  /** Allowed to perform read operations (get, list) on secrets in this scope. */
  READ: 'READ',
  /** Allowed to read and write secrets to this secret scope. */
  WRITE: 'WRITE',
  /** Allowed to read/write ACLs, and read/write secrets to this secret scope. */
  MANAGE: 'MANAGE',
} as const;
export type AclPermission =
  | (typeof AclPermission)[keyof typeof AclPermission]
  | (string & {});

/** The types of secret scope backends in the Secret Manager. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const ScopeBackendType = {
  /**
   * A secret scope in which secrets are stored in Databricks-managed storage
   * and encrypted with a cloud-based specific encryption key.
   */
  DATABRICKS: 'DATABRICKS',
  /**
   * A customer Azure KeyVault backed secret scope. Reading secrets from this scope will directly
   * read secrets from the customer vault. Only scope and secret ACL metadata are stored in Databricks.
   */
  AZURE_KEYVAULT: 'AZURE_KEYVAULT',
} as const;
export type ScopeBackendType =
  | (typeof ScopeBackendType)[keyof typeof ScopeBackendType]
  | (string & {});

/**
 * An item representing an ACL rule applied to the given principal (user or group)
 * on the associated scope point.
 */
export interface AclItem {
  /**
   * The user name or group name of an existing Databricks principal that the
   * permission applies to.
   */
  principal?: string | undefined;
  /** The permission level applied to the principal. */
  permission?: AclPermission | undefined;
}

/** The metadata of the Azure KeyVault for a secret scope of type `AZURE_KEYVAULT` */
export interface AzureKeyVaultSecretScopeMetadata {
  /** The Azure resource ID of the key vault to associate with the scope. */
  resourceId?: string | undefined;
  /** The DNS name of the key vault, for example ``https://my-key-vault.vault.azure.net/``. */
  dnsName?: string | undefined;
}

export interface CreateScopeRequest {
  /** Scope name requested by the user. Scope names are unique. */
  scope?: string | undefined;
  /** The principal that is initially granted ``MANAGE`` permission to the created scope. */
  initialManagePrincipal?: string | undefined;
  /** The backend type of the new scope. Defaults to ``DATABRICKS``. */
  scopeBackendType?: ScopeBackendType | undefined;
  /** The metadata for the secret scope if the type is ``AZURE_KEYVAULT`` */
  backendAzureKeyvault?: AzureKeyVaultSecretScopeMetadata | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateScopeResponse {}

export interface DeleteAclRequest {
  /** The name of the scope to remove permissions from. */
  scope?: string | undefined;
  /** The principal to remove an existing ACL from. */
  principal?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteAclResponse {}

export interface DeleteScopeRequest {
  /** Name of the scope to delete. */
  scope?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteScopeResponse {}

export interface DeleteSecretRequest {
  /** The name of the scope that contains the secret to delete. */
  scope?: string | undefined;
  /** Name of the secret to delete. */
  key?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface DeleteSecretResponse {}

export interface GetAclRequest {
  /** The name of the scope to fetch ACL information from. */
  scope?: string | undefined;
  /** The principal to fetch ACL information for. */
  principal?: string | undefined;
}

export interface GetSecretRequest {
  /** The name of the scope that contains the secret. */
  scope?: string | undefined;
  /** Name of the secret to fetch value information. */
  key?: string | undefined;
}

export interface GetSecretResponse {
  /** A unique name to identify the secret. */
  key?: string | undefined;
  /**
   * The secret value, base64-encoded. A secret written with ``string_value`` is returned
   * as the base64 encoding of its UTF-8 bytes.
   */
  value?: Uint8Array | undefined;
}

export interface ListAclsRequest {
  /** The name of the scope to fetch ACL information from. */
  scope?: string | undefined;
}

export interface ListAclsResponse {
  /** The associated ACLs rule applied to principals in the given scope. */
  items?: AclItem[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListScopesRequest {}

export interface ListScopesResponse {
  /** The available secret scopes. */
  scopes?: SecretScope[] | undefined;
}

export interface ListSecretsRequest {
  /** The name of the scope to list secrets within. */
  scope?: string | undefined;
}

export interface ListSecretsResponse {
  /** Metadata information of all secrets contained within the given scope. */
  secrets?: SecretMetadata[] | undefined;
}

export interface PutAclRequest {
  /** The name of the scope to apply permissions to. */
  scope?: string | undefined;
  /**
   * The user name or group name of an existing Databricks principal that the
   * permission applies to.
   */
  principal?: string | undefined;
  /** The permission level applied to the principal. */
  permission?: AclPermission | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PutAclResponse {}

export interface PutSecretRequest {
  /** The name of the scope to store the secret in. */
  scope?: string | undefined;
  /** A unique name to identify the secret. */
  key?: string | undefined;
  value?:
    | {
        $case: 'stringValue';
        /** The secret value as text. The server stores it as the UTF-8 encoding of the string. */
        stringValue: string;
      }
    | {
        $case: 'bytesValue';
        /** The secret value as raw bytes. The bytes must be base64-encoded in the JSON request body. */
        bytesValue: Uint8Array;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PutSecretResponse {}

/**
 * The metadata about a secret. Returned when listing secrets. Does not contain the
 * actual secret value.
 */
export interface SecretMetadata {
  /** A unique name to identify the secret. */
  key?: string | undefined;
  /** The time the secret was last written, in milliseconds since the Unix epoch. */
  lastUpdatedTimestamp?: bigint | undefined;
}

/**
 * An organizational resource for storing secrets. A secret scope is either Databricks-backed
 * or Azure Key Vault-backed, and ACLs can be applied to control permissions for all secrets
 * within a scope.
 */
export interface SecretScope {
  /** A unique name to identify the secret scope. */
  name?: string | undefined;
  /** The type of secret scope backend. */
  backendType?: ScopeBackendType | undefined;
  /** The metadata for the secret scope if the type is ``AZURE_KEYVAULT``. */
  keyvaultMetadata?: AzureKeyVaultSecretScopeMetadata | undefined;
}

export const unmarshalAclItemSchema: z.ZodType<AclItem> = z
  .object({
    principal: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    principal: d.principal,
    permission: d.permission,
  }));

export const unmarshalAzureKeyVaultSecretScopeMetadataSchema: z.ZodType<AzureKeyVaultSecretScopeMetadata> =
  z
    .object({
      resource_id: z.string().optional(),
      dns_name: z.string().optional(),
    })
    .transform(d => ({
      resourceId: d.resource_id,
      dnsName: d.dns_name,
    }));

export const unmarshalCreateScopeResponseSchema: z.ZodType<CreateScopeResponse> =
  z.object({});

export const unmarshalDeleteAclResponseSchema: z.ZodType<DeleteAclResponse> =
  z.object({});

export const unmarshalDeleteScopeResponseSchema: z.ZodType<DeleteScopeResponse> =
  z.object({});

export const unmarshalDeleteSecretResponseSchema: z.ZodType<DeleteSecretResponse> =
  z.object({});

export const unmarshalGetSecretResponseSchema: z.ZodType<GetSecretResponse> = z
  .object({
    key: z.string().optional(),
    value: z
      .string()
      .transform(s => Uint8Array.from(atob(s), c => c.charCodeAt(0)))
      .optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const unmarshalListAclsResponseSchema: z.ZodType<ListAclsResponse> = z
  .object({
    items: z.array(z.lazy(() => unmarshalAclItemSchema)).optional(),
  })
  .transform(d => ({
    items: d.items,
  }));

export const unmarshalListScopesResponseSchema: z.ZodType<ListScopesResponse> =
  z
    .object({
      scopes: z.array(z.lazy(() => unmarshalSecretScopeSchema)).optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
    }));

export const unmarshalListSecretsResponseSchema: z.ZodType<ListSecretsResponse> =
  z
    .object({
      secrets: z.array(z.lazy(() => unmarshalSecretMetadataSchema)).optional(),
    })
    .transform(d => ({
      secrets: d.secrets,
    }));

export const unmarshalPutAclResponseSchema: z.ZodType<PutAclResponse> =
  z.object({});

export const unmarshalPutSecretResponseSchema: z.ZodType<PutSecretResponse> =
  z.object({});

export const unmarshalSecretMetadataSchema: z.ZodType<SecretMetadata> = z
  .object({
    key: z.string().optional(),
    last_updated_timestamp: z
      .union([z.number(), z.bigint(), z.string()])
      .transform(v => BigInt(v))
      .optional(),
  })
  .transform(d => ({
    key: d.key,
    lastUpdatedTimestamp: d.last_updated_timestamp,
  }));

export const unmarshalSecretScopeSchema: z.ZodType<SecretScope> = z
  .object({
    name: z.string().optional(),
    backend_type: z.string().optional(),
    keyvault_metadata: z
      .lazy(() => unmarshalAzureKeyVaultSecretScopeMetadataSchema)
      .nullish()
      .transform(v => v ?? undefined),
  })
  .transform(d => ({
    name: d.name,
    backendType: d.backend_type,
    keyvaultMetadata: d.keyvault_metadata,
  }));

export const marshalAclItemSchema: z.ZodType = z
  .object({
    principal: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    principal: d.principal,
    permission: d.permission,
  }));

export const marshalAzureKeyVaultSecretScopeMetadataSchema: z.ZodType = z
  .object({
    resourceId: z.string().optional(),
    dnsName: z.string().optional(),
  })
  .transform(d => ({
    resource_id: d.resourceId,
    dns_name: d.dnsName,
  }));

export const marshalCreateScopeRequestSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    initialManagePrincipal: z.string().optional(),
    scopeBackendType: z.string().optional(),
    backendAzureKeyvault: z
      .lazy(() => marshalAzureKeyVaultSecretScopeMetadataSchema)
      .optional(),
  })
  .transform(d => ({
    scope: d.scope,
    initial_manage_principal: d.initialManagePrincipal,
    scope_backend_type: d.scopeBackendType,
    backend_azure_keyvault: d.backendAzureKeyvault,
  }));

export const marshalCreateScopeResponseSchema: z.ZodType = z.object({});

export const marshalDeleteAclRequestSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    principal: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
    principal: d.principal,
  }));

export const marshalDeleteAclResponseSchema: z.ZodType = z.object({});

export const marshalDeleteScopeRequestSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
  }));

export const marshalDeleteScopeResponseSchema: z.ZodType = z.object({});

export const marshalDeleteSecretRequestSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    key: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
    key: d.key,
  }));

export const marshalDeleteSecretResponseSchema: z.ZodType = z.object({});

export const marshalGetAclRequestSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    principal: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
    principal: d.principal,
  }));

export const marshalGetSecretRequestSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    key: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
    key: d.key,
  }));

export const marshalGetSecretResponseSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    value: z
      .any()
      .transform((d: Uint8Array) =>
        btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
      )
      .optional(),
  })
  .transform(d => ({
    key: d.key,
    value: d.value,
  }));

export const marshalListAclsRequestSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
  }));

export const marshalListAclsResponseSchema: z.ZodType = z
  .object({
    items: z.array(z.lazy(() => marshalAclItemSchema)).optional(),
  })
  .transform(d => ({
    items: d.items,
  }));

export const marshalListScopesRequestSchema: z.ZodType = z.object({});

export const marshalListScopesResponseSchema: z.ZodType = z
  .object({
    scopes: z.array(z.lazy(() => marshalSecretScopeSchema)).optional(),
  })
  .transform(d => ({
    scopes: d.scopes,
  }));

export const marshalListSecretsRequestSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
  }));

export const marshalListSecretsResponseSchema: z.ZodType = z
  .object({
    secrets: z.array(z.lazy(() => marshalSecretMetadataSchema)).optional(),
  })
  .transform(d => ({
    secrets: d.secrets,
  }));

export const marshalPutAclRequestSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    principal: z.string().optional(),
    permission: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
    principal: d.principal,
    permission: d.permission,
  }));

export const marshalPutAclResponseSchema: z.ZodType = z.object({});

export const marshalPutSecretRequestSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    key: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({$case: z.literal('stringValue'), stringValue: z.string()}),
        z.object({
          $case: z.literal('bytesValue'),
          bytesValue: z
            .any()
            .transform((d: Uint8Array) =>
              btoa(Array.from(d, b => String.fromCharCode(b)).join(''))
            ),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    scope: d.scope,
    key: d.key,
    ...(d.value?.$case === 'stringValue' && {
      string_value: d.value.stringValue,
    }),
    ...(d.value?.$case === 'bytesValue' && {bytes_value: d.value.bytesValue}),
  }));

export const marshalPutSecretResponseSchema: z.ZodType = z.object({});

export const marshalSecretMetadataSchema: z.ZodType = z
  .object({
    key: z.string().optional(),
    lastUpdatedTimestamp: z.bigint().optional(),
  })
  .transform(d => ({
    key: d.key,
    last_updated_timestamp: d.lastUpdatedTimestamp,
  }));

export const marshalSecretScopeSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    backendType: z.string().optional(),
    keyvaultMetadata: z
      .lazy(() => marshalAzureKeyVaultSecretScopeMetadataSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    backend_type: d.backendType,
    keyvault_metadata: d.keyvaultMetadata,
  }));
