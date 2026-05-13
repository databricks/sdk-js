// Code generated from API definition by Databricks SDK Generator. DO NOT EDIT.

import {FieldMask} from '@databricks/sdk-core/wkt';
import type {FieldMaskSchema} from '@databricks/sdk-core/wkt';
import {z} from 'zod';

/** Compliance standard for SHIELD customers. See README.md for how instructions of how to add new standards. */
export enum ComplianceStandard {
  /** Sentinel value, should not be used in prod */
  COMPLIANCE_STANDARD_UNSPECIFIED = 'COMPLIANCE_STANDARD_UNSPECIFIED',
  /**
   * For customers who buy Enhanced Security Compliance (ESC) product
   * but don't belong to any standards.
   */
  NONE = 'NONE',
  /** Industry standards below */
  HIPAA = 'HIPAA',
  PCI_DSS = 'PCI_DSS',
  FEDRAMP_MODERATE = 'FEDRAMP_MODERATE',
  IRAP_PROTECTED = 'IRAP_PROTECTED',
  /** Only available in AWS GovCloud */
  FEDRAMP_HIGH = 'FEDRAMP_HIGH',
  FEDRAMP_IL5 = 'FEDRAMP_IL5',
  /** International Traffic in Arms Regulations (ITAR); Export Administration Regulations (EAR) */
  ITAR_EAR = 'ITAR_EAR',
  /** UK Cyber Essential Plus */
  CYBER_ESSENTIAL_PLUS = 'CYBER_ESSENTIAL_PLUS',
  /**
   * The Government of Canada (GC) Protected B
   * https://www.tpsgc-pwgsc.gc.ca/esc-src/protection-safeguarding/niveaux-levels-eng.html
   */
  CANADA_PROTECTED_B = 'CANADA_PROTECTED_B',
  /**
   * Japan Information system Security Management and Assessment Program
   * https://www.ismap.go.jp/csm?id=kb_article_view&sysparm_article=KB0010301&sys_kb_id=9b6741cec305821032713201150131c2&spa=1
   */
  ISMAP = 'ISMAP',
  /**
   * HITRUST
   * https://hitrustalliance.net/
   */
  HITRUST = 'HITRUST',
  /** Korea Financial Security Institute */
  K_FSI = 'K_FSI',
  /** Cloud Computing Compliance Criteria Catalogue for Germany */
  GERMANY_C5 = 'GERMANY_C5',
  /** Trusted Information Security Assessment Exchange, a compliance standard for automotive industry for Germany */
  GERMANY_TISAX = 'GERMANY_TISAX',
}

/**
 * ON: Grants all users in all workspaces access to the Personal Compute default policy, allowing all users to create single-machine compute resources.
 * DELEGATE: Moves access control for the Personal Compute default policy to individual workspaces and requires a workspace’s users or groups to be added to the ACLs of that workspace’s Personal Compute default policy before they will be able to create compute resources through that policy.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested enum name.
export enum DcpAccountEnableMessage_Value {
  ON = 'ON',
  DELEGATE = 'DELEGATE',
}

export interface AccountIpAccessEnable {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {$case: 'acctIpAclEnable'; acctIpAclEnable: BooleanMessage}
    | undefined;
}

export interface BooleanMessage {
  value?: boolean | undefined;
}

/** Account level policy for CSP */
export interface CspEnablementAccount {
  /** Enforced = it cannot be overriden at workspace level. */
  isEnforced?: boolean | undefined;
  /**
   * Set by customers when they request Compliance Security Profile (CSP)
   * Invariants are enforced in Settings policy.
   */
  complianceStandards?: ComplianceStandard[] | undefined;
}

export interface CspEnablementAccountSetting {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {
        $case: 'cspEnablementAccount';
        cspEnablementAccount: CspEnablementAccount;
      }
    | undefined;
}

export interface DcpAccountEnableMessage {
  value?: DcpAccountEnableMessage_Value | undefined;
}

export interface DeleteAccountIpAccessEnableRequest {
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteAccountIpAccessEnableResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeleteDisableLegacyFeaturesRequest {
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeleteDisableLegacyFeaturesResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DeletePersonalComputeSettingRequest {
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

/** The etag is returned. */
export interface DeletePersonalComputeSettingResponse {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface DisableLegacyFeatures {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {$case: 'disableLegacyFeatures'; disableLegacyFeatures: BooleanMessage}
    | undefined;
}

/** Account level policy for ESM */
export interface EsmEnablementAccount {
  isEnforced?: boolean | undefined;
}

export interface EsmEnablementAccountSetting {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {
        $case: 'esmEnablementAccount';
        esmEnablementAccount: EsmEnablementAccount;
      }
    | undefined;
}

export interface GetAccountIpAccessEnableRequest {
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetCspEnablementAccountSettingRequest {
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetDisableLegacyFeaturesRequest {
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetEsmEnablementAccountSettingRequest {
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetLlmProxyPartnerPoweredAccountRequest {
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetLlmProxyPartnerPoweredEnforceRequest {
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface GetPersonalComputeSettingRequest {
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /**
   * etag used for versioning. The response is at least as fresh as the eTag
   * provided. This is used for optimistic concurrency control as a way to
   * help prevent simultaneous writes of a setting overwriting each other. It
   * is strongly suggested that systems make use of the etag in the read ->
   * delete pattern to perform setting deletions in order to avoid race
   * conditions. That is, get an etag from a GET request, and pass it with the
   * DELETE request to identify the rule set version you are deleting.
   */
  etag?: string | undefined;
}

export interface LlmProxyPartnerPoweredAccount {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?: {$case: 'booleanVal'; booleanVal: BooleanMessage} | undefined;
}

export interface LlmProxyPartnerPoweredEnforce {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?: {$case: 'booleanVal'; booleanVal: BooleanMessage} | undefined;
}

export interface PersonalComputeSetting {
  /**
   * etag used for versioning. The response is at least as fresh as the eTag provided.
   * This is used for optimistic concurrency control as a way to help prevent simultaneous
   * writes of a setting overwriting each other. It is strongly suggested that systems
   * make use of the etag in the read -> update pattern to perform setting updates in
   * order to avoid race conditions. That is, get an etag from a GET request, and pass it
   * with the PATCH request to identify the setting version you are updating.
   */
  etag?: string | undefined;
  /**
   * Name of the corresponding setting. This field is populated in the response, but it will not be respected
   * even if it's set in the request body. The setting name in the path parameter will be
   * respected instead. Setting name is required to be 'default' if the setting only has one instance per workspace.
   */
  settingName?: string | undefined;
  value?:
    | {$case: 'personalCompute'; personalCompute: DcpAccountEnableMessage}
    | undefined;
}

/** Details required to update a setting. */
export interface UpdateAccountIpAccessEnableRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: AccountIpAccessEnable | undefined;
  fieldMask?: FieldMask<AccountIpAccessEnable> | undefined;
}

/** Details required to update a setting. */
export interface UpdateCspEnablementAccountSettingRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: CspEnablementAccountSetting | undefined;
  fieldMask?: FieldMask<CspEnablementAccountSetting> | undefined;
}

/** Details required to update a setting. */
export interface UpdateDisableLegacyFeaturesRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: DisableLegacyFeatures | undefined;
  fieldMask?: FieldMask<DisableLegacyFeatures> | undefined;
}

/** Details required to update a setting. */
export interface UpdateEsmEnablementAccountSettingRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: EsmEnablementAccountSetting | undefined;
  fieldMask?: FieldMask<EsmEnablementAccountSetting> | undefined;
}

/** Details required to update a setting. */
export interface UpdateLlmProxyPartnerPoweredAccountRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: LlmProxyPartnerPoweredAccount | undefined;
  fieldMask?: FieldMask<LlmProxyPartnerPoweredAccount> | undefined;
}

/** Details required to update a setting. */
export interface UpdateLlmProxyPartnerPoweredEnforceRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: LlmProxyPartnerPoweredEnforce | undefined;
  fieldMask?: FieldMask<LlmProxyPartnerPoweredEnforce> | undefined;
}

/** Details required to update a setting. */
export interface UpdatePersonalComputeSettingRequest {
  /** <Databricks> account ID of the account being managed. */
  accountId?: string | undefined;
  settingTypeName?: string | undefined;
  settingName?: string | undefined;
  /** This should always be set to true for Settings API. Added for AIP compliance. */
  allowMissing?: boolean | undefined;
  setting?: PersonalComputeSetting | undefined;
  fieldMask?: FieldMask<PersonalComputeSetting> | undefined;
}

export const unmarshalAccountIpAccessEnableSchema: z.ZodType<AccountIpAccessEnable> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      acct_ip_acl_enable: z
        .lazy(() => unmarshalBooleanMessageSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.acct_ip_acl_enable !== undefined
          ? {
              $case: 'acctIpAclEnable' as const,
              acctIpAclEnable: d.acct_ip_acl_enable,
            }
          : undefined,
    }));

export const unmarshalBooleanMessageSchema: z.ZodType<BooleanMessage> = z
  .object({
    value: z.boolean().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const unmarshalCspEnablementAccountSchema: z.ZodType<CspEnablementAccount> =
  z
    .object({
      is_enforced: z.boolean().optional(),
      compliance_standards: z.array(z.enum(ComplianceStandard)).optional(),
    })
    .transform(d => ({
      isEnforced: d.is_enforced,
      complianceStandards: d.compliance_standards,
    }));

export const unmarshalCspEnablementAccountSettingSchema: z.ZodType<CspEnablementAccountSetting> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      csp_enablement_account: z
        .lazy(() => unmarshalCspEnablementAccountSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.csp_enablement_account !== undefined
          ? {
              $case: 'cspEnablementAccount' as const,
              cspEnablementAccount: d.csp_enablement_account,
            }
          : undefined,
    }));

export const unmarshalDcpAccountEnableMessageSchema: z.ZodType<DcpAccountEnableMessage> =
  z
    .object({
      value: z.enum(DcpAccountEnableMessage_Value).optional(),
    })
    .transform(d => ({
      value: d.value,
    }));

export const unmarshalDeleteAccountIpAccessEnableResponseSchema: z.ZodType<DeleteAccountIpAccessEnableResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeleteDisableLegacyFeaturesResponseSchema: z.ZodType<DeleteDisableLegacyFeaturesResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDeletePersonalComputeSettingResponseSchema: z.ZodType<DeletePersonalComputeSettingResponse> =
  z
    .object({
      etag: z.string().optional(),
    })
    .transform(d => ({
      etag: d.etag,
    }));

export const unmarshalDisableLegacyFeaturesSchema: z.ZodType<DisableLegacyFeatures> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      disable_legacy_features: z
        .lazy(() => unmarshalBooleanMessageSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.disable_legacy_features !== undefined
          ? {
              $case: 'disableLegacyFeatures' as const,
              disableLegacyFeatures: d.disable_legacy_features,
            }
          : undefined,
    }));

export const unmarshalEsmEnablementAccountSchema: z.ZodType<EsmEnablementAccount> =
  z
    .object({
      is_enforced: z.boolean().optional(),
    })
    .transform(d => ({
      isEnforced: d.is_enforced,
    }));

export const unmarshalEsmEnablementAccountSettingSchema: z.ZodType<EsmEnablementAccountSetting> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      esm_enablement_account: z
        .lazy(() => unmarshalEsmEnablementAccountSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.esm_enablement_account !== undefined
          ? {
              $case: 'esmEnablementAccount' as const,
              esmEnablementAccount: d.esm_enablement_account,
            }
          : undefined,
    }));

export const unmarshalLlmProxyPartnerPoweredAccountSchema: z.ZodType<LlmProxyPartnerPoweredAccount> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      boolean_val: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.boolean_val !== undefined
          ? {$case: 'booleanVal' as const, booleanVal: d.boolean_val}
          : undefined,
    }));

export const unmarshalLlmProxyPartnerPoweredEnforceSchema: z.ZodType<LlmProxyPartnerPoweredEnforce> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      boolean_val: z.lazy(() => unmarshalBooleanMessageSchema).optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.boolean_val !== undefined
          ? {$case: 'booleanVal' as const, booleanVal: d.boolean_val}
          : undefined,
    }));

export const unmarshalPersonalComputeSettingSchema: z.ZodType<PersonalComputeSetting> =
  z
    .object({
      etag: z.string().optional(),
      setting_name: z.string().optional(),
      personal_compute: z
        .lazy(() => unmarshalDcpAccountEnableMessageSchema)
        .optional(),
    })
    .transform(d => ({
      etag: d.etag,
      settingName: d.setting_name,
      value:
        d.personal_compute !== undefined
          ? {
              $case: 'personalCompute' as const,
              personalCompute: d.personal_compute,
            }
          : undefined,
    }));

export const marshalAccountIpAccessEnableSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('acctIpAclEnable'),
          acctIpAclEnable: z.lazy(() => marshalBooleanMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'acctIpAclEnable' && {
      acct_ip_acl_enable: d.value.acctIpAclEnable,
    }),
  }));

export const marshalBooleanMessageSchema: z.ZodType = z
  .object({
    value: z.boolean().optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalCspEnablementAccountSchema: z.ZodType = z
  .object({
    isEnforced: z.boolean().optional(),
    complianceStandards: z.array(z.enum(ComplianceStandard)).optional(),
  })
  .transform(d => ({
    is_enforced: d.isEnforced,
    compliance_standards: d.complianceStandards,
  }));

export const marshalCspEnablementAccountSettingSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('cspEnablementAccount'),
          cspEnablementAccount: z.lazy(() => marshalCspEnablementAccountSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'cspEnablementAccount' && {
      csp_enablement_account: d.value.cspEnablementAccount,
    }),
  }));

export const marshalDcpAccountEnableMessageSchema: z.ZodType = z
  .object({
    value: z.enum(DcpAccountEnableMessage_Value).optional(),
  })
  .transform(d => ({
    value: d.value,
  }));

export const marshalDisableLegacyFeaturesSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('disableLegacyFeatures'),
          disableLegacyFeatures: z.lazy(() => marshalBooleanMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'disableLegacyFeatures' && {
      disable_legacy_features: d.value.disableLegacyFeatures,
    }),
  }));

export const marshalEsmEnablementAccountSchema: z.ZodType = z
  .object({
    isEnforced: z.boolean().optional(),
  })
  .transform(d => ({
    is_enforced: d.isEnforced,
  }));

export const marshalEsmEnablementAccountSettingSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('esmEnablementAccount'),
          esmEnablementAccount: z.lazy(() => marshalEsmEnablementAccountSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'esmEnablementAccount' && {
      esm_enablement_account: d.value.esmEnablementAccount,
    }),
  }));

export const marshalLlmProxyPartnerPoweredAccountSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('booleanVal'),
          booleanVal: z.lazy(() => marshalBooleanMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'booleanVal' && {boolean_val: d.value.booleanVal}),
  }));

export const marshalLlmProxyPartnerPoweredEnforceSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('booleanVal'),
          booleanVal: z.lazy(() => marshalBooleanMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'booleanVal' && {boolean_val: d.value.booleanVal}),
  }));

export const marshalPersonalComputeSettingSchema: z.ZodType = z
  .object({
    etag: z.string().optional(),
    settingName: z.string().optional(),
    value: z
      .discriminatedUnion('$case', [
        z.object({
          $case: z.literal('personalCompute'),
          personalCompute: z.lazy(() => marshalDcpAccountEnableMessageSchema),
        }),
      ])
      .optional(),
  })
  .transform(d => ({
    etag: d.etag,
    setting_name: d.settingName,
    ...(d.value?.$case === 'personalCompute' && {
      personal_compute: d.value.personalCompute,
    }),
  }));

export const marshalUpdateAccountIpAccessEnableRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    settingTypeName: z.string().optional(),
    settingName: z.string().optional(),
    allowMissing: z.boolean().optional(),
    setting: z.lazy(() => marshalAccountIpAccessEnableSchema).optional(),
    fieldMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    setting_type_name: d.settingTypeName,
    setting_name: d.settingName,
    allow_missing: d.allowMissing,
    setting: d.setting,
    field_mask: d.fieldMask,
  }));

export const marshalUpdateCspEnablementAccountSettingRequestSchema: z.ZodType =
  z
    .object({
      accountId: z.string().optional(),
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalCspEnablementAccountSettingSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      account_id: d.accountId,
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateDisableLegacyFeaturesRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    settingTypeName: z.string().optional(),
    settingName: z.string().optional(),
    allowMissing: z.boolean().optional(),
    setting: z.lazy(() => marshalDisableLegacyFeaturesSchema).optional(),
    fieldMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    setting_type_name: d.settingTypeName,
    setting_name: d.settingName,
    allow_missing: d.allowMissing,
    setting: d.setting,
    field_mask: d.fieldMask,
  }));

export const marshalUpdateEsmEnablementAccountSettingRequestSchema: z.ZodType =
  z
    .object({
      accountId: z.string().optional(),
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalEsmEnablementAccountSettingSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      account_id: d.accountId,
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateLlmProxyPartnerPoweredAccountRequestSchema: z.ZodType =
  z
    .object({
      accountId: z.string().optional(),
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalLlmProxyPartnerPoweredAccountSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      account_id: d.accountId,
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdateLlmProxyPartnerPoweredEnforceRequestSchema: z.ZodType =
  z
    .object({
      accountId: z.string().optional(),
      settingTypeName: z.string().optional(),
      settingName: z.string().optional(),
      allowMissing: z.boolean().optional(),
      setting: z
        .lazy(() => marshalLlmProxyPartnerPoweredEnforceSchema)
        .optional(),
      fieldMask: z
        .any()
        .transform((m: FieldMask) => m.toString())
        .optional(),
    })
    .transform(d => ({
      account_id: d.accountId,
      setting_type_name: d.settingTypeName,
      setting_name: d.settingName,
      allow_missing: d.allowMissing,
      setting: d.setting,
      field_mask: d.fieldMask,
    }));

export const marshalUpdatePersonalComputeSettingRequestSchema: z.ZodType = z
  .object({
    accountId: z.string().optional(),
    settingTypeName: z.string().optional(),
    settingName: z.string().optional(),
    allowMissing: z.boolean().optional(),
    setting: z.lazy(() => marshalPersonalComputeSettingSchema).optional(),
    fieldMask: z
      .any()
      .transform((m: FieldMask) => m.toString())
      .optional(),
  })
  .transform(d => ({
    account_id: d.accountId,
    setting_type_name: d.settingTypeName,
    setting_name: d.settingName,
    allow_missing: d.allowMissing,
    setting: d.setting,
    field_mask: d.fieldMask,
  }));

const accountIpAccessEnableFieldMaskSchema: FieldMaskSchema = {
  acctIpAclEnable: {
    wire: 'acct_ip_acl_enable',
    children: () => booleanMessageFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function accountIpAccessEnableFieldMask(
  ...paths: string[]
): FieldMask<AccountIpAccessEnable> {
  return FieldMask.build<AccountIpAccessEnable>(
    paths,
    accountIpAccessEnableFieldMaskSchema
  );
}

const booleanMessageFieldMaskSchema: FieldMaskSchema = {
  value: {wire: 'value'},
};

const cspEnablementAccountFieldMaskSchema: FieldMaskSchema = {
  complianceStandards: {wire: 'compliance_standards'},
  isEnforced: {wire: 'is_enforced'},
};

const cspEnablementAccountSettingFieldMaskSchema: FieldMaskSchema = {
  cspEnablementAccount: {
    wire: 'csp_enablement_account',
    children: () => cspEnablementAccountFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function cspEnablementAccountSettingFieldMask(
  ...paths: string[]
): FieldMask<CspEnablementAccountSetting> {
  return FieldMask.build<CspEnablementAccountSetting>(
    paths,
    cspEnablementAccountSettingFieldMaskSchema
  );
}

const dcpAccountEnableMessageFieldMaskSchema: FieldMaskSchema = {
  value: {wire: 'value'},
};

const disableLegacyFeaturesFieldMaskSchema: FieldMaskSchema = {
  disableLegacyFeatures: {
    wire: 'disable_legacy_features',
    children: () => booleanMessageFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function disableLegacyFeaturesFieldMask(
  ...paths: string[]
): FieldMask<DisableLegacyFeatures> {
  return FieldMask.build<DisableLegacyFeatures>(
    paths,
    disableLegacyFeaturesFieldMaskSchema
  );
}

const esmEnablementAccountFieldMaskSchema: FieldMaskSchema = {
  isEnforced: {wire: 'is_enforced'},
};

const esmEnablementAccountSettingFieldMaskSchema: FieldMaskSchema = {
  esmEnablementAccount: {
    wire: 'esm_enablement_account',
    children: () => esmEnablementAccountFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function esmEnablementAccountSettingFieldMask(
  ...paths: string[]
): FieldMask<EsmEnablementAccountSetting> {
  return FieldMask.build<EsmEnablementAccountSetting>(
    paths,
    esmEnablementAccountSettingFieldMaskSchema
  );
}

const llmProxyPartnerPoweredAccountFieldMaskSchema: FieldMaskSchema = {
  booleanVal: {
    wire: 'boolean_val',
    children: () => booleanMessageFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function llmProxyPartnerPoweredAccountFieldMask(
  ...paths: string[]
): FieldMask<LlmProxyPartnerPoweredAccount> {
  return FieldMask.build<LlmProxyPartnerPoweredAccount>(
    paths,
    llmProxyPartnerPoweredAccountFieldMaskSchema
  );
}

const llmProxyPartnerPoweredEnforceFieldMaskSchema: FieldMaskSchema = {
  booleanVal: {
    wire: 'boolean_val',
    children: () => booleanMessageFieldMaskSchema,
  },
  etag: {wire: 'etag'},
  settingName: {wire: 'setting_name'},
};

export function llmProxyPartnerPoweredEnforceFieldMask(
  ...paths: string[]
): FieldMask<LlmProxyPartnerPoweredEnforce> {
  return FieldMask.build<LlmProxyPartnerPoweredEnforce>(
    paths,
    llmProxyPartnerPoweredEnforceFieldMaskSchema
  );
}

const personalComputeSettingFieldMaskSchema: FieldMaskSchema = {
  etag: {wire: 'etag'},
  personalCompute: {
    wire: 'personal_compute',
    children: () => dcpAccountEnableMessageFieldMaskSchema,
  },
  settingName: {wire: 'setting_name'},
};

export function personalComputeSettingFieldMask(
  ...paths: string[]
): FieldMask<PersonalComputeSetting> {
  return FieldMask.build<PersonalComputeSetting>(
    paths,
    personalComputeSettingFieldMaskSchema
  );
}
