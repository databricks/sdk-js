// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Auto-tagging mode. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Enum-style const object.
export const AutoTaggingConfig_AutoTaggingMode = {
  AUTO_TAGGING_MODE_UNSPECIFIED: 'AUTO_TAGGING_MODE_UNSPECIFIED',
  AUTO_TAGGING_DISABLED: 'AUTO_TAGGING_DISABLED',
  AUTO_TAGGING_ENABLED: 'AUTO_TAGGING_ENABLED',
} as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export type AutoTaggingConfig_AutoTaggingMode =
  | (typeof AutoTaggingConfig_AutoTaggingMode)[keyof typeof AutoTaggingConfig_AutoTaggingMode]
  | (string & {});

/**
 * Auto-tagging configuration for a classification tag.
 * When enabled, detected columns are automatically tagged with Unity Catalog
 * tags.
 */
export interface AutoTaggingConfig {
  /**
   * The Classification Tag. For built-in classes this is a system tag (e.g., "class.name",
   * "class.location"); for custom classes it is a user-defined governance tag key.
   */
  classificationTag?: string | undefined;
  /** Whether auto-tagging is enabled or disabled for this classification tag. */
  autoTaggingMode?: AutoTaggingConfig_AutoTaggingMode | undefined;
}

/**
 * Data Classification configuration for a Unity Catalog catalog. This message follows the "At Most One Resource" pattern: at most one CatalogConfig exists per catalog.
 * - Full CRUD operations are supported: Create enables Data Classification, Delete disables it
 * - It has no unique identifier of its own and uses its parent catalog's identifier (catalog_name)
 */
export interface CatalogConfig {
  /** Resource name in the format: catalogs/{catalog_name}/config. */
  name?: string | undefined;
  selectedSchemas?:
    | {
        $case: 'includedSchemas';
        /**
         * Schemas to include in the scan, each named relative to the parent catalog.
         * If specified, only listed schemas will be scanned.
         * Mutually exclusive with `excluded_schemas`: only one may be set per request.
         * If neither `included_schemas` nor `excluded_schemas` is set, all schemas are scanned.
         */
        includedSchemas: CatalogConfig_SchemaNames;
      }
    | {
        $case: 'excludedSchemas';
        /**
         * Schemas to exclude from the scan, each named relative to the parent catalog.
         * If specified, all schemas except the specified ones will be scanned.
         * Mutually exclusive with `included_schemas`: only one may be set per request.
         * If neither `included_schemas` nor `excluded_schemas` is set, all schemas are scanned.
         */
        excludedSchemas: CatalogConfig_SchemaNames;
      }
    | undefined;
  /**
   * List of auto-tagging configurations for this catalog.
   * Empty list means no auto-tagging is enabled.
   */
  autoTagConfigs?: AutoTaggingConfig[] | undefined;
}

/** Wrapper message for a list of schema names. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CatalogConfig_SchemaNames {
  /** Schema names, each relative to the parent catalog. Must not be empty. */
  names?: string[] | undefined;
}

/**
 * Create Data Classification configuration for a catalog.
 * Creating a config enables Data Classification for the catalog.
 */
export interface CreateCatalogConfigRequest {
  /** Parent resource in the format: catalogs/{catalog_name} */
  parent?: string | undefined;
  /** The configuration to create. */
  catalogConfig?: CatalogConfig | undefined;
}

/**
 * Delete Data Classification configuration for a catalog.
 * Deleting the config disables Data Classification for the catalog.
 */
export interface DeleteCatalogConfigRequest {
  /** Resource name in the format: catalogs/{catalog_name}/config */
  name?: string | undefined;
}

/** Get Data Classification configuration for a catalog. */
export interface GetCatalogConfigRequest {
  /** Resource name in the format: catalogs/{catalog_name}/config */
  name?: string | undefined;
}

/**
 * Request to update the Data Classification configuration for a catalog.
 *
 * Uses field mask to support partial updates of the configuration.
 * Only the fields specified in the update_mask will be modified.
 */
export interface UpdateCatalogConfigRequest {
  /**
   * The configuration to apply to the catalog.
   * The name field in catalog_config identifies which resource to update.
   */
  catalogConfig?: CatalogConfig | undefined;
  /** Field mask specifying which fields to update. */
  updateMask?: FieldMask<CatalogConfig> | undefined;
}

export const unmarshalAutoTaggingConfigSchema: z.ZodType<AutoTaggingConfig> = z
  .object({
    classification_tag: z.string().optional(),
    auto_tagging_mode: z.string().optional(),
  })
  .transform(d => ({
    classificationTag: d.classification_tag,
    autoTaggingMode: d.auto_tagging_mode,
  }));

export const unmarshalCatalogConfigSchema: z.ZodType<CatalogConfig> = z
  .object({
    name: z.string().optional(),
    included_schemas: z
      .lazy(() => unmarshalCatalogConfig_SchemaNamesSchema)
      .optional(),
    excluded_schemas: z
      .lazy(() => unmarshalCatalogConfig_SchemaNamesSchema)
      .optional(),
    auto_tag_configs: z
      .array(z.lazy(() => unmarshalAutoTaggingConfigSchema))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    selectedSchemas:
      d.included_schemas !== undefined
        ? {
            $case: 'includedSchemas' as const,
            includedSchemas: d.included_schemas,
          }
        : d.excluded_schemas !== undefined
          ? {
              $case: 'excludedSchemas' as const,
              excludedSchemas: d.excluded_schemas,
            }
          : undefined,
    autoTagConfigs: d.auto_tag_configs,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCatalogConfig_SchemaNamesSchema: z.ZodType<CatalogConfig_SchemaNames> =
  z
    .object({
      names: z.array(z.string()).optional(),
    })
    .transform(d => ({
      names: d.names,
    }));

export const marshalAutoTaggingConfigSchema: z.ZodType = z
  .object({
    classificationTag: z.string().optional(),
    autoTaggingMode: z.string().optional(),
  })
  .transform(d => ({
    classification_tag: d.classificationTag,
    auto_tagging_mode: d.autoTaggingMode,
  }));

export const marshalCatalogConfigSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    selectedSchemas: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('includedSchemas'),
          includedSchemas: z.lazy(() => marshalCatalogConfig_SchemaNamesSchema),
        }),
        z.object({
          $case: z.literal('excludedSchemas'),
          excludedSchemas: z.lazy(() => marshalCatalogConfig_SchemaNamesSchema),
        }),
      ])
      .optional(),
    autoTagConfigs: z
      .array(z.lazy(() => marshalAutoTaggingConfigSchema))
      .optional(),
  })
  .transform(d => ({
    name: d.name,
    ...(d.selectedSchemas?.$case === 'includedSchemas' && {
      included_schemas: d.selectedSchemas.includedSchemas,
    }),
    ...(d.selectedSchemas?.$case === 'excludedSchemas' && {
      excluded_schemas: d.selectedSchemas.excludedSchemas,
    }),
    auto_tag_configs: d.autoTagConfigs,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCatalogConfig_SchemaNamesSchema: z.ZodType = z
  .object({
    names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    names: d.names,
  }));

const catalogConfigFieldMaskSchema: FieldMaskSchema = {
  autoTagConfigs: {wire: 'auto_tag_configs'},
  excludedSchemas: {
    wire: 'excluded_schemas',
    children: () => catalogConfig_SchemaNamesFieldMaskSchema,
  },
  includedSchemas: {
    wire: 'included_schemas',
    children: () => catalogConfig_SchemaNamesFieldMaskSchema,
  },
  name: {wire: 'name'},
};

export function catalogConfigFieldMask(
  ...paths: string[]
): FieldMask<CatalogConfig> {
  return FieldMask.build<CatalogConfig>(paths, catalogConfigFieldMaskSchema);
}

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
const catalogConfig_SchemaNamesFieldMaskSchema: FieldMaskSchema = {
  names: {wire: 'names'},
};
