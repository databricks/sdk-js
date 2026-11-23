// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DestinationType = {
  DESTINATION_TYPE_UNSPECIFIED: 'DESTINATION_TYPE_UNSPECIFIED',
  EMAIL: 'EMAIL',
  SLACK: 'SLACK',
  GENERIC_WEBHOOK: 'GENERIC_WEBHOOK',
  MICROSOFT_TEAMS: 'MICROSOFT_TEAMS',
  URL: 'URL',
} as const;
export type DestinationType =
  | (typeof DestinationType)[keyof typeof DestinationType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const PrincipalType = {
  PRINCIPAL_TYPE_UNSPECIFIED: 'PRINCIPAL_TYPE_UNSPECIFIED',
  USER_PRINCIPAL: 'USER_PRINCIPAL',
  GROUP_PRINCIPAL: 'GROUP_PRINCIPAL',
  SERVICE_PRINCIPAL: 'SERVICE_PRINCIPAL',
} as const;
export type PrincipalType =
  | (typeof PrincipalType)[keyof typeof PrincipalType]
  | (string & {});

/** The type of Unity Catalog securable. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SecurableType = {
  CATALOG: 'CATALOG',
  SCHEMA: 'SCHEMA',
  TABLE: 'TABLE',
  STORAGE_CREDENTIAL: 'STORAGE_CREDENTIAL',
  EXTERNAL_LOCATION: 'EXTERNAL_LOCATION',
  FUNCTION: 'FUNCTION',
  SHARE: 'SHARE',
  PROVIDER: 'PROVIDER',
  RECIPIENT: 'RECIPIENT',
  CLEAN_ROOM: 'CLEAN_ROOM',
  METASTORE: 'METASTORE',
  PIPELINE: 'PIPELINE',
  VOLUME: 'VOLUME',
  CONNECTION: 'CONNECTION',
  CREDENTIAL: 'CREDENTIAL',
  EXTERNAL_METADATA: 'EXTERNAL_METADATA',
  /** TODO: [UC-2980] Staging tables aren't full-fleged securables yet. */
  STAGING_TABLE: 'STAGING_TABLE',
  MODEL: 'MODEL',
  MODEL_SERVICE: 'MODEL_SERVICE',
  MCP_SERVICE: 'MCP_SERVICE',
  MODEL_PROVIDER_SERVICE: 'MODEL_PROVIDER_SERVICE',
  AGENT_SERVICE: 'AGENT_SERVICE',
  SKILL: 'SKILL',
  /** A Feature Store feature in Unity Catalog. Three-level namespace catalog.schema.feature. */
  FEATURE: 'FEATURE',
} as const;
export type SecurableType =
  | (typeof SecurableType)[keyof typeof SecurableType]
  | (string & {});

// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const SpecialDestination = {
  SPECIAL_DESTINATION_UNSPECIFIED: 'SPECIAL_DESTINATION_UNSPECIFIED',
  SPECIAL_DESTINATION_CATALOG_OWNER: 'SPECIAL_DESTINATION_CATALOG_OWNER',
  SPECIAL_DESTINATION_EXTERNAL_LOCATION_OWNER:
    'SPECIAL_DESTINATION_EXTERNAL_LOCATION_OWNER',
  SPECIAL_DESTINATION_CONNECTION_OWNER: 'SPECIAL_DESTINATION_CONNECTION_OWNER',
  SPECIAL_DESTINATION_CREDENTIAL_OWNER: 'SPECIAL_DESTINATION_CREDENTIAL_OWNER',
  SPECIAL_DESTINATION_METASTORE_OWNER: 'SPECIAL_DESTINATION_METASTORE_OWNER',
  SPECIAL_DESTINATION_SCHEMA_OWNER: 'SPECIAL_DESTINATION_SCHEMA_OWNER',
  SPECIAL_DESTINATION_TABLE_OWNER: 'SPECIAL_DESTINATION_TABLE_OWNER',
  SPECIAL_DESTINATION_VOLUME_OWNER: 'SPECIAL_DESTINATION_VOLUME_OWNER',
  SPECIAL_DESTINATION_FUNCTION_OWNER: 'SPECIAL_DESTINATION_FUNCTION_OWNER',
  SPECIAL_DESTINATION_REGISTERED_MODEL_OWNER:
    'SPECIAL_DESTINATION_REGISTERED_MODEL_OWNER',
} as const;
export type SpecialDestination =
  | (typeof SpecialDestination)[keyof typeof SpecialDestination]
  | (string & {});

/**
 * The notification destinations that receive access requests for a Unity Catalog securable. A securable
 * without destinations of its own uses its owner's email when default owner email destinations are on;
 * otherwise it inherits the destinations of its nearest parent that has any.
 */
export interface AccessRequestDestinations {
  /** The access request destinations for the securable. */
  destinations?: NotificationDestination[] | undefined;
  /** The securable for which the access request destinations are being modified or read. */
  securable?: Securable | undefined;
  /**
   * Indicates whether any destinations are hidden from the caller due to a lack of permissions.
   * This value is true if the caller does not have permission to see all destinations.
   */
  areAnyDestinationsHidden?: boolean | undefined;
  /**
   * The source securable from which the destinations are inherited. Either the same value as securable (if destination
   * is set directly on the securable) or the nearest parent securable with destinations set.
   */
  destinationSourceSecurable?: Securable | undefined;
  /** The type of the securable, repeated from **securable** as a plain string. */
  securableType?: string | undefined;
  /** The full name of the securable, repeated from **securable**. */
  fullName?: string | undefined;
  /**
   * The access request URLs shared by every workspace in the metastore. Only set when the securable is a metastore.
   * These URLs are used when neither the requested securable nor its parents have an explicit destination or a
   * default owner email destination, and they take precedence over metastore destinations.
   *
   * A **dynamic_url** and default owner email destinations cannot both be on: saving one turns the other off.
   * Saving a **dynamic_url** while they are on requires a metastore admin.
   *
   * Setting this field removes the metastore destinations in this workspace. The first save also removes the
   * metastore URL destinations of other workspaces. Once set, the configuration can be cleared but not removed.
   */
  urlConfiguration?: UrlConfiguration | undefined;
}

export interface BatchCreateAccessRequestsRequest {
  /**
   * A list of individual access requests, where each request corresponds to
   * a set of permissions being requested on a list of securables for a specified principal.
   *
   * At most 30 requests per API call.
   */
  requests?: CreateAccessRequest[] | undefined;
}

/** The access request destinations resolved for each principal and securable in the batch. */
export interface BatchCreateAccessRequestsResponse {
  /** The access request destinations for each securable object the principal requested. */
  responses?: CreateAccessRequestResponse[] | undefined;
}

export interface CreateAccessRequest {
  /**
   * Optional. The principal this request is for.
   * Empty `behalf_of` defaults to the requester's identity.
   *
   * Principals must be unique across the API call.
   */
  behalfOf?: Principal | undefined;
  /**
   * Optional. Comment associated with the request.
   *
   * At most 200 characters, can only contain lowercase/uppercase
   * letters (a-z, A-Z), numbers (0-9), punctuation, and spaces.
   */
  comment?: string | undefined;
  /**
   * List of securables and their corresponding requested UC privileges.
   *
   * At most 30 securables can be requested for a principal per batched call.
   * Each securable can only be requested once per principal.
   */
  securablePermissions?: SecurablePermissions[] | undefined;
}

export interface CreateAccessRequestResponse {
  /** The principal the request was made on behalf of. */
  behalfOf?: Principal | undefined;
  /** The access request destinations for all the securables the principal requested. */
  requestDestinations?: AccessRequestDestinations[] | undefined;
}

export interface GetAccessRequestDestinationsRequest {
  /**
   * The type of the securable. Matching is case-insensitive, and hyphens may replace underscores in
   * multi-word types.
   */
  securableType?: string | undefined;
  /**
   * The full name of the securable: the names of its parents followed by its own name, separated by dots, for
   * example `main.sales.orders` for a table.
   */
  fullName?: string | undefined;
}

export interface NotificationDestination {
  /**
   * The identifier for the destination. This is the email address for EMAIL destinations, the URL for URL destinations,
   * or the unique <Databricks> notification destination ID for all other external destinations.
   */
  destinationId?: string | undefined;
  /** The type of the destination. */
  destinationType?: DestinationType | undefined;
  /**
   * This field is used to denote whether the destination is the email of the owner of the securable object.
   * The special destination cannot be assigned to a securable and only represents the default destination of the securable.
   * The securable types that support default special destinations are: "catalog", "external_location", "connection", "credential", and "metastore".
   * The **destination_type** of a **special_destination** is always EMAIL.
   */
  specialDestination?: SpecialDestination | undefined;
}

export interface Principal {
  /** <Databricks> user, group or service principal ID. */
  id?: string | undefined;
  /** The type of principal that **id** identifies: a user, a group, or a service principal. */
  principalType?: PrincipalType | undefined;
}

/**
 * Generic definition of a securable, which is uniquely defined in a metastore
 * by its type and full name.
 */
export interface Securable {
  /**
   * Required. The type of securable (catalog/schema/table).
   * Optional if resource_name is present.
   */
  type?: SecurableType | undefined;
  /**
   * Required. The full name of the catalog/schema/table.
   * Optional if resource_name is present.
   */
  fullName?: string | undefined;
  /**
   * Optional. The name of the Share object that contains the securable when the securable is
   * getting shared in D2D Delta Sharing.
   */
  providerShare?: string | undefined;
}

export interface SecurablePermissions {
  /** The securable on which the permissions are requested. */
  securable?: Securable | undefined;
  /** List of requested Unity Catalog permissions. */
  permissions?: string[] | undefined;
}

export interface UpdateAccessRequestDestinationsRequest {
  /**
   * The access request destinations to assign to the securable.
   * For each destination, a **destination_id** and **destination_type** must be defined.
   */
  accessRequestDestinations?: AccessRequestDestinations | undefined;
  /**
   * The paths of the field mask are not evaluated, because an update always replaces the full list of
   * destinations.
   */
  updateMask?: FieldMask<AccessRequestDestinations> | undefined;
}

/** Access request URLs shared by every workspace in a metastore. */
export interface UrlConfiguration {
  /**
   * The URL for access requests on the metastore and on securables outside catalogs, such as external locations,
   * connections, and credentials. Also used for catalogs and the securables inside them when **dynamic_url** is
   * not set or cannot produce a valid URL.
   * Must start with `http://` or `https://`, contain only printable ASCII characters without spaces or backslashes,
   * and be at most 2,048 characters.
   */
  redirectUrl?: string | undefined;
  /**
   * The URL template for access requests on catalogs and the securables inside them, such as schemas, tables,
   * volumes, functions, and registered models. Placeholders are replaced with percent-encoded values from the
   * requested securable: `{catalog}` with the catalog name (`main`), `{catalog.schema}` with the catalog and
   * schema names (`main.sales`), `{catalog.schema.object}` with the full name (`main.sales.orders`),
   * `{securable_type}` with the securable type (`TABLE`), and `{securable_id}` with the securable ID.
   * Name placeholders leave out levels the securable does not have, so `{catalog.schema.object}` is `main.sales`
   * for a schema. When the deepest name placeholder stops above the requested securable, such as
   * `{catalog.schema}` for a table, `{securable_type}` and `{securable_id}` describe that parent.
   * If the filled-in URL is longer than 4,096 characters, the **redirect_url** is used instead.
   *
   * Must start with `http://` or `https://`, contain only printable ASCII characters without spaces or backslashes,
   * and be at most 2,048 characters. Braces are only allowed around a placeholder.
   */
  dynamicUrl?: string | undefined;
  /** The version of the placeholder syntax used in **dynamic_url**. The only supported version is `1`. */
  syntaxVersion?: number | undefined;
}

export const unmarshalAccessRequestDestinationsSchema: z.ZodType<AccessRequestDestinations> =
  z
    .object({
      destinations: z
        .array(z.lazy(() => unmarshalNotificationDestinationSchema))
        .optional(),
      securable: z
        .lazy(() => unmarshalSecurableSchema)
        .nullish()
        .transform(v => v ?? undefined),
      are_any_destinations_hidden: z.boolean().optional(),
      destination_source_securable: z
        .lazy(() => unmarshalSecurableSchema)
        .nullish()
        .transform(v => v ?? undefined),
      securable_type: z.string().optional(),
      full_name: z.string().optional(),
      url_configuration: z
        .lazy(() => unmarshalUrlConfigurationSchema)
        .nullish()
        .transform(v => v ?? undefined),
    })
    .transform(d => ({
      destinations: d.destinations,
      securable: d.securable,
      areAnyDestinationsHidden: d.are_any_destinations_hidden,
      destinationSourceSecurable: d.destination_source_securable,
      securableType: d.securable_type,
      fullName: d.full_name,
      urlConfiguration: d.url_configuration,
    }));

export const unmarshalBatchCreateAccessRequestsResponseSchema: z.ZodType<BatchCreateAccessRequestsResponse> =
  z
    .object({
      responses: z
        .array(z.lazy(() => unmarshalCreateAccessRequestResponseSchema))
        .optional(),
    })
    .transform(d => ({
      responses: d.responses,
    }));

export const unmarshalCreateAccessRequestResponseSchema: z.ZodType<CreateAccessRequestResponse> =
  z
    .object({
      behalf_of: z
        .lazy(() => unmarshalPrincipalSchema)
        .nullish()
        .transform(v => v ?? undefined),
      request_destinations: z
        .array(z.lazy(() => unmarshalAccessRequestDestinationsSchema))
        .optional(),
    })
    .transform(d => ({
      behalfOf: d.behalf_of,
      requestDestinations: d.request_destinations,
    }));

export const unmarshalNotificationDestinationSchema: z.ZodType<NotificationDestination> =
  z
    .object({
      destination_id: z.string().optional(),
      destination_type: z.string().optional(),
      special_destination: z.string().optional(),
    })
    .transform(d => ({
      destinationId: d.destination_id,
      destinationType: d.destination_type,
      specialDestination: d.special_destination,
    }));

export const unmarshalPrincipalSchema: z.ZodType<Principal> = z
  .object({
    id: z.string().optional(),
    principal_type: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    principalType: d.principal_type,
  }));

export const unmarshalSecurableSchema: z.ZodType<Securable> = z
  .object({
    type: z.string().optional(),
    full_name: z.string().optional(),
    provider_share: z.string().optional(),
  })
  .transform(d => ({
    type: d.type,
    fullName: d.full_name,
    providerShare: d.provider_share,
  }));

export const unmarshalUrlConfigurationSchema: z.ZodType<UrlConfiguration> = z
  .object({
    redirect_url: z.string().optional(),
    dynamic_url: z.string().optional(),
    syntax_version: z.number().optional(),
  })
  .transform(d => ({
    redirectUrl: d.redirect_url,
    dynamicUrl: d.dynamic_url,
    syntaxVersion: d.syntax_version,
  }));

export const marshalAccessRequestDestinationsSchema: z.ZodType = z
  .object({
    destinations: z
      .array(z.lazy(() => marshalNotificationDestinationSchema))
      .optional(),
    securable: z.lazy(() => marshalSecurableSchema).optional(),
    areAnyDestinationsHidden: z.boolean().optional(),
    destinationSourceSecurable: z.lazy(() => marshalSecurableSchema).optional(),
    securableType: z.string().optional(),
    fullName: z.string().optional(),
    urlConfiguration: z.lazy(() => marshalUrlConfigurationSchema).optional(),
  })
  .transform(d => ({
    destinations: d.destinations,
    securable: d.securable,
    are_any_destinations_hidden: d.areAnyDestinationsHidden,
    destination_source_securable: d.destinationSourceSecurable,
    securable_type: d.securableType,
    full_name: d.fullName,
    url_configuration: d.urlConfiguration,
  }));

export const marshalBatchCreateAccessRequestsRequestSchema: z.ZodType = z
  .object({
    requests: z
      .array(z.lazy(() => marshalCreateAccessRequestSchema))
      .optional(),
  })
  .transform(d => ({
    requests: d.requests,
  }));

export const marshalCreateAccessRequestSchema: z.ZodType = z
  .object({
    behalfOf: z.lazy(() => marshalPrincipalSchema).optional(),
    comment: z.string().optional(),
    securablePermissions: z
      .array(z.lazy(() => marshalSecurablePermissionsSchema))
      .optional(),
  })
  .transform(d => ({
    behalf_of: d.behalfOf,
    comment: d.comment,
    securable_permissions: d.securablePermissions,
  }));

export const marshalNotificationDestinationSchema: z.ZodType = z
  .object({
    destinationId: z.string().optional(),
    destinationType: z.string().optional(),
    specialDestination: z.string().optional(),
  })
  .transform(d => ({
    destination_id: d.destinationId,
    destination_type: d.destinationType,
    special_destination: d.specialDestination,
  }));

export const marshalPrincipalSchema: z.ZodType = z
  .object({
    id: z.string().optional(),
    principalType: z.string().optional(),
  })
  .transform(d => ({
    id: d.id,
    principal_type: d.principalType,
  }));

export const marshalSecurableSchema: z.ZodType = z
  .object({
    type: z.string().optional(),
    fullName: z.string().optional(),
    providerShare: z.string().optional(),
  })
  .transform(d => ({
    type: d.type,
    full_name: d.fullName,
    provider_share: d.providerShare,
  }));

export const marshalSecurablePermissionsSchema: z.ZodType = z
  .object({
    securable: z.lazy(() => marshalSecurableSchema).optional(),
    permissions: z.array(z.string()).optional(),
  })
  .transform(d => ({
    securable: d.securable,
    permissions: d.permissions,
  }));

export const marshalUrlConfigurationSchema: z.ZodType = z
  .object({
    redirectUrl: z.string().optional(),
    dynamicUrl: z.string().optional(),
    syntaxVersion: z.number().optional(),
  })
  .transform(d => ({
    redirect_url: d.redirectUrl,
    dynamic_url: d.dynamicUrl,
    syntax_version: d.syntaxVersion,
  }));

const accessRequestDestinationsFieldMaskSchema: FieldMaskSchema = {
  areAnyDestinationsHidden: {wire: 'are_any_destinations_hidden'},
  destinationSourceSecurable: {
    wire: 'destination_source_securable',
    children: () => securableFieldMaskSchema,
  },
  destinations: {wire: 'destinations'},
  fullName: {wire: 'full_name'},
  securable: {wire: 'securable', children: () => securableFieldMaskSchema},
  securableType: {wire: 'securable_type'},
  urlConfiguration: {
    wire: 'url_configuration',
    children: () => urlConfigurationFieldMaskSchema,
  },
};

export function accessRequestDestinationsFieldMask(
  ...paths: string[]
): FieldMask<AccessRequestDestinations> {
  return FieldMask.build<AccessRequestDestinations>(
    paths,
    accessRequestDestinationsFieldMaskSchema
  );
}

const securableFieldMaskSchema: FieldMaskSchema = {
  fullName: {wire: 'full_name'},
  providerShare: {wire: 'provider_share'},
  type: {wire: 'type'},
};

const urlConfigurationFieldMaskSchema: FieldMaskSchema = {
  dynamicUrl: {wire: 'dynamic_url'},
  redirectUrl: {wire: 'redirect_url'},
  syntaxVersion: {wire: 'syntax_version'},
};
