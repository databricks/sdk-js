// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {z} from 'zod';

/** The ACL permission levels for Secret ACLs applied to secret scopes. */
export enum AclPermission {
  /** Allowed to perform read operations (get, list) on secrets in this scope. */
  READ = 'READ',
  /** Allowed to read and write secrets to this secret scope. */
  WRITE = 'WRITE',
  /** Allowed to read/write ACLs, and read/write secrets to this secret scope. */
  MANAGE = 'MANAGE',
}

/**
 * The types of secret scope backends in the Secret Manager. Azure KeyVault backed secret scopes
 * will be supported in a later release.
 */
export enum ScopeBackendType {
  /**
   * A secret scope in which secrets are stored in Databrick managed storage
   * and encrypted with a cloud-based specific encryption key.
   */
  DATABRICKS = 'DATABRICKS',
  /**
   * A customer Azure KeyVault backed secret scope. Reading secrets from this scope will directly
   * read secrets from the customer vault. Only scope and secret ACL metadata are stored in Databricks.
   */
  AZURE_KEYVAULT = 'AZURE_KEYVAULT',
}

/**
 * An item representing an ACL rule applied to the given principal (user or group)
 * on the associated scope point.
 */
export interface AclItem {
  /** The principal in which the permission is applied. */
  principal?: string | undefined;
  /** The permission level applied to the principal. */
  permission?: AclPermission | undefined;
}

/** The metadata of the Azure KeyVault for a secret scope of type `AZURE_KEYVAULT` */
export interface AzureKeyVaultSecretScopeMetadata {
  /** The resource id of the azure KeyVault that user wants to associate the scope with. */
  resourceId?: string | undefined;
  /** The DNS of the KeyVault */
  dnsName?: string | undefined;
}

export interface CreateScope {
  /** Scope name requested by the user. Scope names are unique. */
  scope?: string | undefined;
  /** The principal that is initially granted ``MANAGE`` permission to the created scope. */
  initialManagePrincipal?: string | undefined;
  /** The backend type the scope will be created with. If not specified, will default to ``DATABRICKS`` */
  scopeBackendType?: ScopeBackendType | undefined;
  /** The metadata for the secret scope if the type is ``AZURE_KEYVAULT`` */
  backendAzureKeyvault?: AzureKeyVaultSecretScopeMetadata | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface CreateScope_Response {}

export interface DeleteAcl {
  /** The name of the scope to remove permissions from. */
  scope?: string | undefined;
  /** The principal to remove an existing ACL from. */
  principal?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteAcl_Response {}

export interface DeleteScope {
  /** Name of the scope to delete. */
  scope?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteScope_Response {}

export interface DeleteSecret {
  /** The name of the scope that contains the secret to delete. */
  scope?: string | undefined;
  /** Name of the secret to delete. */
  key?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface DeleteSecret_Response {}

export interface GetAcl {
  /** The name of the scope to fetch ACL information from. */
  scope?: string | undefined;
  /** The principal to fetch ACL information for. */
  principal?: string | undefined;
}

export interface GetSecret {
  /** The name of the scope that contains the secret. */
  scope?: string | undefined;
  /** Name of the secret to fetch value information. */
  key?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface GetSecret_Response {
  /** A unique name to identify the secret. */
  key?: string | undefined;
  /** The value of the secret in its byte representation. */
  value?: Uint8Array | undefined;
}

export interface ListAcls {
  /** The name of the scope to fetch ACL information from. */
  scope?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListAcls_Response {
  /** The associated ACLs rule applied to principals in the given scope. */
  items?: AclItem[] | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListScopes {}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListScopes_Response {
  /** The available secret scopes. */
  scopes?: SecretScope[] | undefined;
}

export interface ListSecrets {
  /** The name of the scope to list secrets within. */
  scope?: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface ListSecrets_Response {
  /** Metadata information of all secrets contained within the given scope. */
  secrets?: SecretMetadata[] | undefined;
}

export interface PutAcl {
  /** The name of the scope to apply permissions to. */
  scope?: string | undefined;
  /** The principal in which the permission is applied. */
  principal?: string | undefined;
  /** The permission level applied to the principal. */
  permission?: AclPermission | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface PutAcl_Response {}

export interface PutSecret {
  /** The name of the scope to which the secret will be associated with. */
  scope?: string | undefined;
  /** A unique name to identify the secret. */
  key?: string | undefined;
  value?:
    | {
        $case: 'stringValue';
        /** If specified, note that the value will be stored in UTF-8 (MB4) form. */
        stringValue: string;
      }
    | {
        $case: 'bytesValue';
        /** If specified, value will be stored as bytes. */
        bytesValue: Uint8Array;
      }
    | undefined;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type -- Proto-style nested message name.
export interface PutSecret_Response {}

/**
 * The metadata about a secret. Returned when listing secrets. Does not contain the
 * actual secret value.
 */
export interface SecretMetadata {
  /** A unique name to identify the secret. */
  key?: string | undefined;
  /** The last updated timestamp (in milliseconds) for the secret. */
  lastUpdatedTimestamp?: number | undefined;
}

/**
 * An organizational resource for storing secrets. Secret scopes can be
 * different types (Databricks-managed, Azure KeyVault backed, etc), and ACLs
 * can be applied to control permissions for all secrets within a scope.
 */
export interface SecretScope {
  /** A unique name to identify the secret scope. */
  name?: string | undefined;
  /** The type of secret scope backend. */
  backendType?: ScopeBackendType | undefined;
  /** The metadata for the secret scope if the type is ``AZURE_KEYVAULT`` */
  keyvaultMetadata?: AzureKeyVaultSecretScopeMetadata | undefined;
}

export const unmarshalAclItemSchema: z.ZodType<AclItem> = z
  .object({
    principal: z.string().optional(),
    permission: z.enum(AclPermission).optional(),
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCreateScope_ResponseSchema: z.ZodType<CreateScope_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteAcl_ResponseSchema: z.ZodType<DeleteAcl_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteScope_ResponseSchema: z.ZodType<DeleteScope_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalDeleteSecret_ResponseSchema: z.ZodType<DeleteSecret_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalGetSecret_ResponseSchema: z.ZodType<GetSecret_Response> =
  z
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

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListAcls_ResponseSchema: z.ZodType<ListAcls_Response> = z
  .object({
    items: z.array(z.lazy(() => unmarshalAclItemSchema)).optional(),
  })
  .transform(d => ({
    items: d.items,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListScopes_ResponseSchema: z.ZodType<ListScopes_Response> =
  z
    .object({
      scopes: z.array(z.lazy(() => unmarshalSecretScopeSchema)).optional(),
    })
    .transform(d => ({
      scopes: d.scopes,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalListSecrets_ResponseSchema: z.ZodType<ListSecrets_Response> =
  z
    .object({
      secrets: z.array(z.lazy(() => unmarshalSecretMetadataSchema)).optional(),
    })
    .transform(d => ({
      secrets: d.secrets,
    }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPutAcl_ResponseSchema: z.ZodType<PutAcl_Response> =
  z.object({});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalPutSecret_ResponseSchema: z.ZodType<PutSecret_Response> =
  z.object({});

export const unmarshalSecretMetadataSchema: z.ZodType<SecretMetadata> = z
  .object({
    key: z.string().optional(),
    last_updated_timestamp: z.number().optional(),
  })
  .transform(d => ({
    key: d.key,
    lastUpdatedTimestamp: d.last_updated_timestamp,
  }));

export const unmarshalSecretScopeSchema: z.ZodType<SecretScope> = z
  .object({
    name: z.string().optional(),
    backend_type: z.enum(ScopeBackendType).optional(),
    keyvault_metadata: z
      .lazy(() => unmarshalAzureKeyVaultSecretScopeMetadataSchema)
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    backendType: d.backend_type,
    keyvaultMetadata: d.keyvault_metadata,
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

export const marshalCreateScopeSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    initialManagePrincipal: z.string().optional(),
    scopeBackendType: z.enum(ScopeBackendType).optional(),
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

export const marshalDeleteAclSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    principal: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
    principal: d.principal,
  }));

export const marshalDeleteScopeSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
  }));

export const marshalDeleteSecretSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    key: z.string().optional(),
  })
  .transform(d => ({
    scope: d.scope,
    key: d.key,
  }));

export const marshalPutAclSchema: z.ZodType = z
  .object({
    scope: z.string().optional(),
    principal: z.string().optional(),
    permission: z.enum(AclPermission).optional(),
  })
  .transform(d => ({
    scope: d.scope,
    principal: d.principal,
    permission: d.permission,
  }));

export const marshalPutSecretSchema: z.ZodType = z
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
