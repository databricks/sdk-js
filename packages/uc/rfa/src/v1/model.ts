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
} as const;
export type SpecialDestination =
  | (typeof SpecialDestination)[keyof typeof SpecialDestination]
  | (string & {});

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
  /** The type of the securable. Redundant with the type in the securable object, but necessary for Terraform integration */
  securableType?: string | undefined;
  /** The full name of the securable. Redundant with the name in the securable object, but necessary for Terraform integration */
  fullName?: string | undefined;
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
  /** The type of the securable. */
  securableType?: string | undefined;
  /** The full name of the securable. */
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
  /** The securable for which the access request destinations are being requested. */
  securable?: Securable | undefined;
  /** List of requested Unity Catalog permissions. */
  permissions?: string[] | undefined;
}

export interface UpdateAccessRequestDestinations {
  /** The access request destinations for the securable. */
  destinations?: UpdateNotificationDestination[] | undefined;
  /** The securable for which the access request destinations are being modified or read. */
  securable?: UpdateSecurable | undefined;
}

export interface UpdateAccessRequestDestinationsRequest {
  /**
   * The access request destinations to assign to the securable.
   * For each destination, a **destination_id** and **destination_type** must be defined.
   */
  accessRequestDestinations?: UpdateAccessRequestDestinations | undefined;
  updateMask?: FieldMask<UpdateAccessRequestDestinations> | undefined;
}

export interface UpdateNotificationDestination {
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

/**
 * Generic definition of a securable, which is uniquely defined in a metastore
 * by its type and full name.
 */
export interface UpdateSecurable {
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

export const unmarshalAccessRequestDestinationsSchema: z.ZodType<AccessRequestDestinations> =
  z
    .object({
      destinations: z
        .array(z.lazy(() => unmarshalNotificationDestinationSchema))
        .optional(),
      securable: z.lazy(() => unmarshalSecurableSchema).optional(),
      are_any_destinations_hidden: z.boolean().optional(),
      destination_source_securable: z
        .lazy(() => unmarshalSecurableSchema)
        .optional(),
      securable_type: z.string().optional(),
      full_name: z.string().optional(),
    })
    .transform(d => ({
      destinations: d.destinations,
      securable: d.securable,
      areAnyDestinationsHidden: d.are_any_destinations_hidden,
      destinationSourceSecurable: d.destination_source_securable,
      securableType: d.securable_type,
      fullName: d.full_name,
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
      behalf_of: z.lazy(() => unmarshalPrincipalSchema).optional(),
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

export const marshalUpdateAccessRequestDestinationsSchema: z.ZodType = z
  .object({
    destinations: z
      .array(z.lazy(() => marshalUpdateNotificationDestinationSchema))
      .optional(),
    securable: z.lazy(() => marshalUpdateSecurableSchema).optional(),
  })
  .transform(d => ({
    destinations: d.destinations,
    securable: d.securable,
  }));

export const marshalUpdateNotificationDestinationSchema: z.ZodType = z
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

export const marshalUpdateSecurableSchema: z.ZodType = z
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

const updateAccessRequestDestinationsFieldMaskSchema: FieldMaskSchema = {
  destinations: {wire: 'destinations'},
  securable: {
    wire: 'securable',
    children: () => updateSecurableFieldMaskSchema,
  },
};

export function updateAccessRequestDestinationsFieldMask(
  ...paths: string[]
): FieldMask<UpdateAccessRequestDestinations> {
  return FieldMask.build<UpdateAccessRequestDestinations>(
    paths,
    updateAccessRequestDestinationsFieldMaskSchema
  );
}

const updateSecurableFieldMaskSchema: FieldMaskSchema = {
  fullName: {wire: 'full_name'},
  providerShare: {wire: 'provider_share'},
  type: {wire: 'type'},
};
