// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask, type FieldPaths} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Auto-tagging mode. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum AutoTaggingConfig_AutoTaggingMode {
  AUTO_TAGGING_MODE_UNSPECIFIED = 'AUTO_TAGGING_MODE_UNSPECIFIED',
  AUTO_TAGGING_DISABLED = 'AUTO_TAGGING_DISABLED',
  AUTO_TAGGING_ENABLED = 'AUTO_TAGGING_ENABLED',
}

/**
 * Auto-tagging configuration for a classification tag.
 * When enabled, detected columns are automatically tagged with Unity Catalog
 * tags.
 */
export interface AutoTaggingConfig {
  /** The Classification Tag (e.g., "class.name", "class.location") */
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
  /**
   * Schemas to include in the scan. Empty list is not supported as it results in a no-op
   * scan. If `included_schemas` is not set, all schemas are scanned.
   */
  includedSchemas?: CatalogConfig_SchemaNames | undefined;
  /**
   * List of auto-tagging configurations for this catalog.
   * Empty list means no auto-tagging is enabled.
   */
  autoTagConfigs?: AutoTaggingConfig[] | undefined;
  /**
   * The effective list of auto-tagging configurations for this catalog. Computed from
   * auto_tag_configs on this catalog and those inherited from the metastore.
   */
  effectiveAutoTagConfigs?: AutoTaggingConfig[] | undefined;
}

/** Wrapper message for a list of schema names. */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export interface CatalogConfig_SchemaNames {
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
  updateMask?: FieldMask<FieldPaths<CatalogConfig>> | undefined;
}

export const unmarshalAutoTaggingConfigSchema: z.ZodType<AutoTaggingConfig> = z
  .object({
    classification_tag: z.string().optional(),
    auto_tagging_mode: z.enum(AutoTaggingConfig_AutoTaggingMode).optional(),
  })
  .transform(d => ({
    classificationTag: d.classification_tag,
    autoTaggingMode: d.auto_tagging_mode,
  }));

export const unmarshalCatalogConfigSchema: z.ZodType<CatalogConfig> = z
  .object({
    name: z.string().optional(),
    included_schemas: z.lazy(() => unmarshalCatalogConfig_SchemaNamesSchema).optional(),
    auto_tag_configs: z.array(z.lazy(() => unmarshalAutoTaggingConfigSchema)).optional(),
    effective_auto_tag_configs: z.array(z.lazy(() => unmarshalAutoTaggingConfigSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    includedSchemas: d.included_schemas,
    autoTagConfigs: d.auto_tag_configs,
    effectiveAutoTagConfigs: d.effective_auto_tag_configs,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const unmarshalCatalogConfig_SchemaNamesSchema: z.ZodType<CatalogConfig_SchemaNames> = z
  .object({
    names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    names: d.names,
  }));

export const unmarshalCreateCatalogConfigRequestSchema: z.ZodType<CreateCatalogConfigRequest> = z
  .object({
    parent: z.string().optional(),
    catalog_config: z.lazy(() => unmarshalCatalogConfigSchema).optional(),
  })
  .transform(d => ({
    parent: d.parent,
    catalogConfig: d.catalog_config,
  }));

export const unmarshalDeleteCatalogConfigRequestSchema: z.ZodType<DeleteCatalogConfigRequest> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalGetCatalogConfigRequestSchema: z.ZodType<GetCatalogConfigRequest> = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const unmarshalUpdateCatalogConfigRequestSchema: z.ZodType<UpdateCatalogConfigRequest> = z
  .object({
    catalog_config: z.lazy(() => unmarshalCatalogConfigSchema).optional(),
    update_mask: z.string().transform(s => FieldMask.of(...(s === '' ? [] : s.split(','))) as FieldMask<FieldPaths<CatalogConfig>>).optional(),
  })
  .transform(d => ({
    catalogConfig: d.catalog_config,
    updateMask: d.update_mask,
  }));

export const marshalAutoTaggingConfigSchema: z.ZodType = z
  .object({
    classificationTag: z.string().optional(),
    autoTaggingMode: z.enum(AutoTaggingConfig_AutoTaggingMode).optional(),
  })
  .transform(d => ({
    classification_tag: d.classificationTag,
    auto_tagging_mode: d.autoTaggingMode,
  }));

export const marshalCatalogConfigSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
    includedSchemas: z.lazy(() => marshalCatalogConfig_SchemaNamesSchema).optional(),
    autoTagConfigs: z.array(z.lazy(() => marshalAutoTaggingConfigSchema)).optional(),
    effectiveAutoTagConfigs: z.array(z.lazy(() => marshalAutoTaggingConfigSchema)).optional(),
  })
  .transform(d => ({
    name: d.name,
    included_schemas: d.includedSchemas,
    auto_tag_configs: d.autoTagConfigs,
    effective_auto_tag_configs: d.effectiveAutoTagConfigs,
  }));

// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.
export const marshalCatalogConfig_SchemaNamesSchema: z.ZodType = z
  .object({
    names: z.array(z.string()).optional(),
  })
  .transform(d => ({
    names: d.names,
  }));

export const marshalCreateCatalogConfigRequestSchema: z.ZodType = z
  .object({
    parent: z.string().optional(),
    catalogConfig: z.lazy(() => marshalCatalogConfigSchema).optional(),
  })
  .transform(d => ({
    parent: d.parent,
    catalog_config: d.catalogConfig,
  }));

export const marshalDeleteCatalogConfigRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalGetCatalogConfigRequestSchema: z.ZodType = z
  .object({
    name: z.string().optional(),
  })
  .transform(d => ({
    name: d.name,
  }));

export const marshalUpdateCatalogConfigRequestSchema: z.ZodType = z
  .object({
    catalogConfig: z.lazy(() => marshalCatalogConfigSchema).optional(),
    updateMask: z.any().transform((d: FieldMask<FieldPaths<CatalogConfig>>) => d.paths.join(',')).optional(),
  })
  .transform(d => ({
    catalog_config: d.catalogConfig,
    update_mask: d.updateMask,
  }));
