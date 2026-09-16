// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {Temporal} from '@js-temporal/polyfill';
import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Available icon names for a domain. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const DomainIcon_Name = {
  NAME_UNSPECIFIED: 'NAME_UNSPECIFIED',
  ADDRESS_BOOK: 'ADDRESS_BOOK',
  ALARM: 'ALARM',
  ARROWS_IN: 'ARROWS_IN',
  ATOM: 'ATOM',
  BALLOON: 'BALLOON',
  BANK: 'BANK',
  BARRICADE: 'BARRICADE',
  BASKET: 'BASKET',
  BRIDGE: 'BRIDGE',
  CACTUS: 'CACTUS',
  CALL_BELL: 'CALL_BELL',
  CARROT: 'CARROT',
  CHART_PIE_SLICE: 'CHART_PIE_SLICE',
  CITY: 'CITY',
  CLOUD: 'CLOUD',
  COINS: 'COINS',
  COMPASS_ROSE: 'COMPASS_ROSE',
  CRANE_TOWER: 'CRANE_TOWER',
  CROWN: 'CROWN',
  CUBE_TRANSPARENT: 'CUBE_TRANSPARENT',
  FADERS: 'FADERS',
  FLAG_BANNER_FOLD: 'FLAG_BANNER_FOLD',
  FLAG_CHECKERED: 'FLAG_CHECKERED',
  GAVEL: 'GAVEL',
  HAMBURGER: 'HAMBURGER',
  HEAD_CIRCUIT: 'HEAD_CIRCUIT',
  HOURGLASS_HIGH: 'HOURGLASS_HIGH',
  INTERSECT_THREE: 'INTERSECT_THREE',
  MICROSCOPE: 'MICROSCOPE',
  MOON_STARS: 'MOON_STARS',
  PACKAGE: 'PACKAGE',
  PARACHUTE: 'PARACHUTE',
  PEPPER: 'PEPPER',
  PIGGY_BANK: 'PIGGY_BANK',
  PILL: 'PILL',
  PLANET: 'PLANET',
  PLANT: 'PLANT',
  PLUGS_CONNECTED: 'PLUGS_CONNECTED',
  POPCORN: 'POPCORN',
  PRESENTATION_CHART: 'PRESENTATION_CHART',
  PUZZLE_PIECE: 'PUZZLE_PIECE',
  RAINBOW: 'RAINBOW',
  RANKING: 'RANKING',
  RECEIPT: 'RECEIPT',
  ROCKET: 'ROCKET',
  RULER: 'RULER',
  SAILBOAT: 'SAILBOAT',
  SCALES: 'SCALES',
  SCAN_SMILEY: 'SCAN_SMILEY',
  SCROLL: 'SCROLL',
  SHIELD_CHECKERED: 'SHIELD_CHECKERED',
  SNEAKER: 'SNEAKER',
  SNOWFLAKE: 'SNOWFLAKE',
  SOLAR_ROOF: 'SOLAR_ROOF',
  SPEEDOMETER: 'SPEEDOMETER',
  STAMP: 'STAMP',
  STEPS: 'STEPS',
  STRATEGY: 'STRATEGY',
  SWORD: 'SWORD',
  TELEVISION_SIMPLE: 'TELEVISION_SIMPLE',
  TENT: 'TENT',
  TICKET: 'TICKET',
  TRACTOR: 'TRACTOR',
  TRAFFIC_CONE: 'TRAFFIC_CONE',
  TRAIN: 'TRAIN',
  TREE_EVERGREEN: 'TREE_EVERGREEN',
  TREE_STRUCTURE: 'TREE_STRUCTURE',
  TROLLEY_SUITCASE: 'TROLLEY_SUITCASE',
  TROPHY: 'TROPHY',
  TRUCK_TRAILER: 'TRUCK_TRAILER',
  USERS_THREE: 'USERS_THREE',
  VECTOR_THREE: 'VECTOR_THREE',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type DomainIcon_Name =
  | (typeof DomainIcon_Name)[keyof typeof DomainIcon_Name]
  | (string & {});

export interface CreateDomainRequest {
  domain?: Domain | undefined;
  /**
   * Client-supplied resource ID for the new domain. If omitted, the server
   * generates one.
   */
  domainId?: string | undefined;
}

export interface DeleteDomainRequest {
  /**
   * Full resource name of the domain to delete.
   * Format: `domains/{domain_id}`
   */
  name?: string | undefined;
  /**
   * When false (default), DeleteDomain is rejected with FAILED_PRECONDITION if
   * the domain still has Glossary pages. When true, those pages are deleted
   * first and then the domain is removed.
   */
  force?: boolean | undefined;
}

export interface Domain {
  /**
   * Unique identifier for the domain. If omitted at Create, the server
   * generates one.
   */
  domainId?: string | undefined;
  /** Governed tag key associated with this domain. */
  tagKey?: string | undefined;
  /**
   * Whether to mark the domain as a draft. If omitted on Create, the server
   * applies a default; the resolved value is returned in `effective_draft`.
   */
  draft?: boolean | undefined;
  /** Resolved draft state of the domain. */
  effectiveDraft?: boolean | undefined;
  /** Icon to display for the domain. */
  icon?: DomainIcon | undefined;
  /** Short description (max 280 chars) */
  subtitle?: string | undefined;
  /** Full description (max 4096 chars) */
  description?: string | undefined;
  /** Timestamp when the domain was created. */
  createTime?: Temporal.Instant | undefined;
  /** Principal IDs of the technical owners (users, groups, or service principals). */
  technicalOwnerIds?: bigint[] | undefined;
  /** Principal IDs of the business owners (users, groups, or service principals). */
  businessOwnerIds?: bigint[] | undefined;
  /**
   * Domain ID of the parent. If absent, this is a top-level domain.
   * If present, this domain is a subdomain of the specified parent.
   */
  parentDomainId?: string | undefined;
  /**
   * Full resource name of the domain. The primary identifier for this resource.
   * Format: `domains/{domain_id}`
   * Identifies the domain on get, update, and delete. Not an input on
   * create — to choose the id, set `CreateDomainRequest.domain_id`.
   */
  name?: string | undefined;
  /** Timestamp when the domain was last updated. */
  updateTime?: Temporal.Instant | undefined;
}

/** Icon configuration for a domain. */
export interface DomainIcon {
  name?: DomainIcon_Name | undefined;
  /** Hex color code with # prefix (e.g., "#FF5733"). */
  color?: string | undefined;
}

export interface GetDomainRequest {
  /**
   * Full resource name of the domain to retrieve.
   * Format: `domains/{domain_id}`
   */
  name?: string | undefined;
}

export interface ListDomainsRequest {
  pageSize?: number | undefined;
  pageToken?: string | undefined;
  /**
   * Filter by parent domain.
   * - Absent: return all domains regardless of hierarchy.
   * - Present: return only direct children of the specified domain.
   */
  parentDomainId?: string | undefined;
}

export interface ListDomainsResponse {
  domains?: Domain[] | undefined;
  nextPageToken?: string | undefined;
}

export interface UpdateDomainRequest {
  domain?: Domain | undefined;
  updateMask?: FieldMask<Domain> | undefined;
}

export const unmarshalDomainSchema: z.ZodType<Domain> = z
  .object({
    domain_id: z.string().optional(),
    tag_key: z.string().optional(),
    draft: z.boolean().optional(),
    effective_draft: z.boolean().optional(),
    icon: z.lazy(() => unmarshalDomainIconSchema).optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    create_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
    technical_owner_ids: z
      .array(
        z.union([z.number(), z.bigint(), z.string()]).transform(v => BigInt(v))
      )
      .optional(),
    business_owner_ids: z
      .array(
        z.union([z.number(), z.bigint(), z.string()]).transform(v => BigInt(v))
      )
      .optional(),
    parent_domain_id: z.string().optional(),
    name: z.string().optional(),
    update_time: z
      .string()
      .transform(s => Temporal.Instant.from(s))
      .optional(),
  })
  .transform(d => ({
    domainId: d.domain_id,
    tagKey: d.tag_key,
    draft: d.draft,
    effectiveDraft: d.effective_draft,
    icon: d.icon,
    subtitle: d.subtitle,
    description: d.description,
    createTime: d.create_time,
    technicalOwnerIds: d.technical_owner_ids,
    businessOwnerIds: d.business_owner_ids,
    parentDomainId: d.parent_domain_id,
    name: d.name,
    updateTime: d.update_time,
  }));

export const unmarshalDomainIconSchema: z.ZodType<DomainIcon> = z
  .object({
    name: z.string().optional(),
    color: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    color: d.color,
  }));

export const unmarshalListDomainsResponseSchema: z.ZodType<ListDomainsResponse> =
  z
    .object({
      domains: z.array(z.lazy(() => unmarshalDomainSchema)).optional(),
      next_page_token: z.string().optional(),
    })
    .transform(d => ({
      domains: d.domains,
      nextPageToken: d.next_page_token,
    }));

export const marshalDomainSchema: z.ZodType = z
  .object({
    domainId: z.string().optional(),
    tagKey: z.string().optional(),
    draft: z.boolean().optional(),
    effectiveDraft: z.boolean().optional(),
    icon: z.lazy(() => marshalDomainIconSchema).optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    createTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
    technicalOwnerIds: z.array(z.bigint()).optional(),
    businessOwnerIds: z.array(z.bigint()).optional(),
    parentDomainId: z.string().optional(),
    name: z.string().optional(),
    updateTime: z
      .any()
      .transform((d: Temporal.Instant) => d.toString())
      .optional(),
  })
  .transform(d => ({
    domain_id: d.domainId,
    tag_key: d.tagKey,
    draft: d.draft,
    effective_draft: d.effectiveDraft,
    icon: d.icon,
    subtitle: d.subtitle,
    description: d.description,
    create_time: d.createTime,
    technical_owner_ids: d.technicalOwnerIds,
    business_owner_ids: d.businessOwnerIds,
    parent_domain_id: d.parentDomainId,
    name: d.name,
    update_time: d.updateTime,
  }));

export const marshalDomainIconSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    color: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
    color: d.color,
  }));

const domainFieldMaskSchema: FieldMaskSchema = {
  businessOwnerIds: {wire: 'business_owner_ids'},
  createTime: {wire: 'create_time'},
  description: {wire: 'description'},
  domainId: {wire: 'domain_id'},
  draft: {wire: 'draft'},
  effectiveDraft: {wire: 'effective_draft'},
  icon: {wire: 'icon', children: () => domainIconFieldMaskSchema},
  name: {wire: 'name'},
  parentDomainId: {wire: 'parent_domain_id'},
  subtitle: {wire: 'subtitle'},
  tagKey: {wire: 'tag_key'},
  technicalOwnerIds: {wire: 'technical_owner_ids'},
  updateTime: {wire: 'update_time'},
};

export function domainFieldMask(...paths: string[]): FieldMask<Domain> {
  return FieldMask.build<Domain>(paths, domainFieldMaskSchema);
}

const domainIconFieldMaskSchema: FieldMaskSchema = {
  color: {wire: 'color'},
  name: {wire: 'name'},
};
