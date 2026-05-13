# Naming Audit: workspacesettings

**Path:** `/home/parth.bansal/sdk-js/packages/workspacesettings/`
**Versions audited:** v1
**Inferred domain:** Workspace-scoped Databricks settings: AI/BI dashboard embedding policy, automatic cluster update, compliance security profile (CSP), dashboard email subscriptions, default namespace, default warehouse ID, legacy access/DBFS disablement, notebook/file export, notebook table clipboard, results download (notebook and SQL), enhanced security monitoring (ESM), LLM proxy partner-powered AI, and restrict-workspace-admins.
**Total weird names flagged:** 56

## Summary table

| # | Severity | Category | Identifier | File:line |
|---|----------|----------|------------|-----------|
| 1 | Critical | Duplicate concept across packages | `workspacesettings` vs `settings` vs `accountsettings` vs `workspaceconf` | package boundary |
| 2 | Critical | Duplicate type | `BooleanMessage`, `StringMessage` (also in `accountsettings`, `settings/v2`) | `model.ts:186, 1034` |
| 3 | Critical | Duplicate type | `ComplianceStandard` (also in `accountsettings`) | `model.ts:8` |
| 4 | Critical | Duplicate type | `AibiDashboardEmbeddingAccessPolicy_AccessPolicyType`, `ClusterAutoRestartMessage_*`, `RestrictWorkspaceAdminsMessage_Status` (also in `settings/v2`) | `model.ts:57, 65, 77, 89` |
| 5 | Critical | Duplicate concept | `RestrictWorkspaceAdminsSetting`, `AibiDashboardEmbeddingAccessPolicySetting` etc. mirror types in `settings/v2` | `model.ts:991, 104` and `settings/v2` |
| 6 | High | Cryptic abbreviation | `Aibi` (`AI/BI`) family of types/methods | `model.ts:57-160, 104-160`; `client.ts:335,377,752,792,1257,1292` |
| 7 | High | Cryptic abbreviation | `Csp` (Compliance Security Profile) | `model.ts:244-273`; `client.ts:872, 1365`; URL `shield_csp_enablement_ws_db` |
| 8 | High | Cryptic abbreviation | `Esm` (Enhanced Security Monitoring) | `model.ts:706-733`; `client.ts:1100,1556`; URL `shield_esm_enablement_ws_db` |
| 9 | High | Cryptic abbreviation | `Llm` (LLM Proxy Partner-Powered Workspace) | `model.ts:543-571, 939-956, 1142-1149`; `client.ts:624,1140,1588` |
| 10 | High | Cryptic abbreviation | `Dbfs` casing (`disableLegacyDbfs`) | `model.ts:514-541, 651-670, 855-868, 1122-1129`; `client.ts:584,1063,1521` |
| 11 | High | Underscore in TS identifier | Eight `*_*_*` proto-style nested names (e.g. `ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek`) | `model.ts:57, 65, 77, 89, 207, 217, 224, 235` |
| 12 | High | Generic / cryptic enum sentinel | `STATUS_UNSPECIFIED`, `ACCESS_POLICY_TYPE_UNSPECIFIED`, `DAY_OF_WEEK_UNSPECIFIED`, `WEEK_DAY_FREQUENCY_UNSPECIFIED`, `COMPLIANCE_STANDARD_UNSPECIFIED` | `model.ts:10, 58, 66, 78, 91` |
| 13 | High | Redundant enum prefix | All five enums prefix the type name into every value | `model.ts:8-102` |
| 14 | High | Domain-redundant suffix | `*Setting` suffix duplicates package name `workspacesettings` | passim — most types |
| 15 | High | Misleading | `settingName` documented as "will not be respected" on requests | `model.ts:122, 150, 175, 264, 287, 313, 331, 642, 663, 676, 686, 696, 723, 950, 1004, 1027` |
| 16 | High | Misleading | `settingTypeName` query param ignored on Delete/Get (path param wins) | `client.ts:340-345, 382-387, 425-430, 469-474, ...` |
| 17 | High | Underspecified ID | `DefaultWarehouseId` type contains no warehouse-ID field — just an envelope | `model.ts:321-338` |
| 18 | High | Type-suffix tautology | `DefaultNamespaceSetting`, `RestrictWorkspaceAdminsSetting`, etc. | `model.ts:302, 991` and 11 more |
| 19 | High | Method-name redundancy | `getDefaultNamespaceSetting`, `getRestrictWorkspaceAdminsSetting`, etc. | `client.ts:952, 1180, 1100, 872, 832, 752, 792` and more |
| 20 | High | Inconsistent action verbs | `patch*` vs `update*` for the same semantic (PATCH HTTP verb) | `client.ts:192 vs 1257, 1292, 1328, ...` |
| 21 | High | Inconsistent action verbs | `delete*` methods actually "revert" / "reset to default" | `client.ts:335, 377, 419, 464, 504, 544, 584, 624, 669, 709` |
| 22 | Medium | Verb-tense / verb-in-noun position | `DisableLegacyAccess` (action phrase used as type/state) | `model.ts:630-649` |
| 23 | Medium | Verb-tense / verb-in-noun position | `DisableLegacyDbfs` | `model.ts:651-670` |
| 24 | Medium | Verb-tense / verb-in-noun position | `EnableExportNotebook` | `model.ts:672-680` |
| 25 | Medium | Verb-tense / verb-in-noun position | `EnableNotebookTableClipboard` | `model.ts:682-690` |
| 26 | Medium | Verb-tense / verb-in-noun position | `EnableResultsDownloading` (also: `-ing` mismatch) | `model.ts:692-700` |
| 27 | Medium | Verb-tense / -ing gerund | `EnableResultsDownloading` vs `SqlResultsDownload` (gerund vs noun, same domain) | `model.ts:692, 1015` |
| 28 | Medium | Misleading / parallel naming | `EnableResultsDownloading` (workspace settings) vs `SqlResultsDownload` (separately) — overlapping concepts | `model.ts:692 vs 1015`; client `patchEnableResultsDownloading` vs `updateSqlResultsDownload` |
| 29 | Medium | Misleading | `LlmProxyPartnerPoweredWorkspace` — "Workspace" suffix on type | `model.ts:939-956` |
| 30 | Medium | Misleading | `automaticClusterUpdateWorkspace` discriminator name | `model.ts:181, 1248` |
| 31 | Medium | Misleading | `complianceSecurityProfileWorkspace`, `enhancedSecurityMonitoringWorkspace` discriminators | `model.ts:269, 729` |
| 32 | Medium | Misleading | `restartEvenIfNoUpdatesAvailable` — double negative | `model.ts:195` |
| 33 | Medium | Misleading | `canToggle` — boolean field on enablement message | `model.ts:192` |
| 34 | Medium | Misleading | `forcedForComplianceMode` — verb-past-participle as flag | `model.ts:213` |
| 35 | Medium | Misleading | `unavailableForNonEnterpriseTier`, `unavailableForDisabledEntitlement` — negative phrasing | `model.ts:209, 211` |
| 36 | Medium | Acronym casing | `Dbfs` (should be `DBFS`); `Aibi` (should be `AiBi` or `AIBI`); `Llm` (should be `LLM`); `Csp`/`Esm`/`Sql` | `model.ts` passim |
| 37 | Medium | Acronym casing | `Id` vs `ID` (`DefaultWarehouseId`, `defaultWarehouseId`) | `model.ts:321, 1102` |
| 38 | Medium | Acronym casing | `Url` (`httpReq.url`) vs `URL` casing — minor reference | `utils.ts:71, 102` |
| 39 | Medium | Verb-tense inconsistency | `Enable*` (imperative) vs `Disable*` (imperative) vs `EnableResultsDownloading` (gerund) | `model.ts:672, 682, 692, 630, 651` |
| 40 | Medium | Verb-tense inconsistency | `EnableExportNotebook` vs `EnableNotebookTableClipboard` (verb noun order swap) | `model.ts:672, 682` |
| 41 | Medium | Type-suffix tautology | `AibiDashboardEmbeddingAccessPolicySetting` (94-character type name) | `model.ts:110` |
| 42 | Medium | Type-suffix tautology | `AibiDashboardEmbeddingApprovedDomainsSetting` | `model.ts:138` |
| 43 | Medium | Verbose / type-suffix tautology | `DeleteAibiDashboardEmbeddingApprovedDomainsSettingResponse` (58 chars) | `model.ts:385` |
| 44 | Medium | Overly verbose | `UpdateAibiDashboardEmbeddingApprovedDomainsSettingRequest` (54 chars) | `model.ts:1050` |
| 45 | Medium | Reserved-word collision | `delete*` method names match JS reserved word adjacency | `client.ts:335, 377, 419, ...` |
| 46 | Medium | Long enum value | `RESTRICT_TOKENS_AND_JOB_RUN_AS`, `SECOND_AND_FOURTH_OF_MONTH`, `FIRST_AND_THIRD_OF_MONTH`, `CYBER_ESSENTIAL_PLUS`, `CANADA_PROTECTED_B`, `FEDRAMP_MODERATE`, etc. | `model.ts:19-53, 83, 84, 101` |
| 47 | Medium | Long enum value | `ALLOW_APPROVED_DOMAINS`, `DENY_ALL_DOMAINS`, `ALLOW_ALL_DOMAINS` | `model.ts:59-61` |
| 48 | Medium | Verb-tense / past-participle as field | `disableGovTagCreation` on `RestrictWorkspaceAdminsMessage` (action-as-field) | `model.ts:988` |
| 49 | Low | Cryptic wire-key abbreviation | `aibi_dash_embed_ws_acc_policy`, `aibi_dash_embed_ws_apprvd_domains` | `client.ts:339, 381, 756, 796, 1261, 1296` |
| 50 | Low | Cryptic wire-key abbreviation | `default_namespace_ws`, `shield_csp_enablement_ws_db`, `shield_esm_enablement_ws_db` | `client.ts:468, 876, 1104, 956, 1369, 1560` |
| 51 | Low | Acronym casing | `eTag` (doc) vs `etag` (field) | `model.ts:112-117, 252-259, 1024` |
| 52 | Low | Singular/plural | `complianceStandards` (array) but inside `ComplianceSecurityProfile` (singular envelope) — consistent but flag for review | `model.ts:248` |
| 53 | Low | Singular/plural | `approvedDomains` (array) on `AibiDashboardEmbeddingApprovedDomains` (plural type / plural field — okay, but mismatched against sibling singular types like `AibiDashboardEmbeddingAccessPolicy`) | `model.ts:135` |
| 54 | Low | Verbose | Setting wire-key length: `automatic_cluster_update`, `dashboard_email_subscriptions`, `restrict_workspace_admins` | `client.ts:836, 423, 673` |
| 55 | Low | Verb-tense inconsistency | `Patch*` request types vs `Update*` request types for same HTTP verb | `model.ts:959, 967, 975 vs 1040, 1050, 1062, ...` |
| 56 | Low | Duplicate type | `Delete*Response` (10 types) duplicated across sibling settings packages | `model.ts:356-628` |

---

## Critical severity

### 1. Four overlapping settings packages: `workspacesettings`, `settings`, `accountsettings`, `workspaceconf`
- **Category:** Duplicate concept across packages
- **Suggestion:** Consolidate. The user-facing settings model on Databricks is one thing scoped two ways (account vs workspace). The TS SDK should expose `settings` with sub-namespaces `workspace.*` and `account.*`, and a single discoverable client per scope. The fourth (`workspaceconf`) is a tiny legacy key/value API that should either fold into `workspacesettings` or be marked clearly legacy.
- **Rationale:** A consumer trying to "set a workspace property" today has to know that:
  - Default-namespace, AI/BI embedding, automatic-cluster-update, CSP, ESM, LLM-proxy, dashboard-email-subs, default-warehouse, disable-legacy-access, disable-legacy-DBFS, enable-export-notebook, enable-notebook-table-clipboard, enable-results-downloading, restrict-workspace-admins, sql-results-download → `workspacesettings`.
  - Generic public-setting CRUD (the umbrella API) → `settings/v2`.
  - Account-IP-access, CSP/ESM at account scope, disable-legacy-features, LLM-proxy at account scope, personal compute → `accountsettings`.
  - Arbitrary workspace conf KV → `workspaceconf`.
  No documentation surfaces this taxonomy; the consumer has to guess. The four packages share types verbatim (`BooleanMessage`, `ComplianceStandard`, `RestrictWorkspaceAdminsMessage_Status`, `AibiDashboardEmbeddingAccessPolicy_AccessPolicyType`, `ClusterAutoRestartMessage_*`) and the `settings/v2` package already exposes a generic `Setting`/`SettingsMetadata` shape that *can* represent any of these. The split is purely a wire-routing artefact.

### 2. `BooleanMessage`, `StringMessage` — duplicated in three sibling packages
- **File:line:** `model.ts:186-188, 1034-1037`
- **Category:** Duplicate type
- **Suggestion:** Hoist into `@databricks/sdk-core/wkt` (or similar shared location) alongside `FieldMask`. These are `google.protobuf.BoolValue` and `google.protobuf.StringValue` analogues and belong with `FieldMask`, which the package already imports from `wkt`.
- **Rationale:** Three packages (`workspacesettings`, `accountsettings`, `settings/v2`) all define identical types — same one boolean/string field, same wrapping. Consumers cannot pass a `BooleanMessage` from one package to a sibling method that takes a `BooleanMessage`. The duplication is wire-bookkeeping leaking through the API surface.

### 3. `ComplianceStandard` enum — duplicated in `accountsettings`
- **File:line:** `model.ts:8-54` (here) and identical in `accountsettings/src/v1/model.ts`
- **Category:** Duplicate type
- **Suggestion:** Hoist into a shared `compliance` module. The enum has 15 values, all canonical regulatory standards (HIPAA, PCI_DSS, FEDRAMP_*, etc.) that do not differ by setting scope.
- **Rationale:** HIPAA at the account level *is* HIPAA at the workspace level. Two enums with identical members means type-incompatible values for the same regulatory concept.

### 4. Proto-style nested enums duplicated in `settings/v2`
- **File:line:** `model.ts:57, 65, 77, 89` (here) vs same names in `settings/v2`
- **Category:** Duplicate type
- **Suggestion:** Same as #3 — share. `AibiDashboardEmbeddingAccessPolicy_AccessPolicyType`, `ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek`, `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency`, and `RestrictWorkspaceAdminsMessage_Status` all appear identically in `settings/v2/model.ts`.
- **Rationale:** Same justification as #3: enums whose semantics are identical across packages should be defined once. Today, `workspacesettings.AibiDashboardEmbeddingAccessPolicy_AccessPolicyType.ALLOW_ALL_DOMAINS` is not assignable to `settings.AibiDashboardEmbeddingAccessPolicy_AccessPolicyType.ALLOW_ALL_DOMAINS`.

### 5. Whole types mirrored in `settings/v2`
- **File:line:** `model.ts:104, 138, 244, 251, 691, 711, 982, 991` vs `settings/v2/model.ts`
- **Category:** Duplicate concept
- **Suggestion:** Pick one canonical home. `settings/v2` is clearly the generic surface (it exposes `Setting`, `SettingsMetadata`, `PatchPublicWorkspaceSettingRequest`). The specific-typed methods in `workspacesettings` are a sister API for the same backend data. Either fold the specific methods into `settings/v2` (preferred) or document which one is canonical.
- **Rationale:** `AibiDashboardEmbeddingAccessPolicy`, `AibiDashboardEmbeddingApprovedDomains`, `ClusterAutoRestartMessage`, `RestrictWorkspaceAdminsMessage`, `BooleanMessage`, `StringMessage` all live in both packages with identical fields. The consumer cannot pass instances across the package boundary, despite naming/structure being byte-identical.

---

## High severity

### 6. `Aibi*` family — cryptic acronym not expanded in identifier
- **File:line:** `model.ts:57-160`; client.ts six methods
- **Category:** Cryptic abbreviation, acronym casing
- **Suggestion:** Either spell as `AiBiDashboardEmbedding*` (matching Databricks marketing) or `AIBIDashboardEmbedding*` (strict acronym casing). The current `Aibi` parses as one token, hiding the AI + BI = analytics-product structure.
- **Rationale:** "AI/BI dashboards" is the user-facing product name (confirmed in the JSDoc on `client.ts:749`). The wire path even uses `aibi_dash_embed_ws_acc_policy` — itself heavily abbreviated. A new reader cannot guess that `Aibi` means "AI + BI." TS style guide prefers acronym capitalization for known acronyms (`URL`, `HTTP`, `AI`, `BI`).

### 7. `Csp*` family — undocumented acronym
- **File:line:** `model.ts:244-273`; URL slug `shield_csp_enablement_ws_db`
- **Category:** Cryptic abbreviation
- **Suggestion:** `ComplianceSecurityProfile*` everywhere (it's already spelled out in the JSDoc on line 243). The class methods are already named `ComplianceSecurityProfile`; only the wire slug is `csp`, which is fine on the wire but should not be exposed.
- **Rationale:** Identical issue to `accountsettings`. CSP overloads catastrophically with web "Content Security Policy." Outside this codebase, that is the dominant meaning. The TS-side type name is `ComplianceSecurityProfile` (good!) but the wire and the `_workspace` suffix in `complianceSecurityProfileWorkspace` discriminator is still cryptic-adjacent.

### 8. `Esm*` family — undocumented acronym
- **File:line:** `model.ts:706-733`; URL slug `shield_esm_enablement_ws_db`; `client.ts:1100, 1556`
- **Category:** Cryptic abbreviation
- **Suggestion:** `EnhancedSecurityMonitoring*` everywhere on TS side. Wire `esm` is fine.
- **Rationale:** Same as CSP. The full name `EnhancedSecurityMonitoring` is used at the type level (good!), but discriminator names like `enhancedSecurityMonitoringWorkspace` add a confusing "Workspace" tail (see #31).

### 9. `Llm*` family — acronym casing + verb stacking
- **File:line:** `model.ts:543-571, 939-956, 1142-1149`; `client.ts:624, 1140, 1588`
- **Category:** Cryptic abbreviation + Acronym casing
- **Suggestion:** Spell out: `ModelProxyPartnerPoweredWorkspace` or `LargeLanguageModelProxyPartnerPoweredWorkspace` (admittedly long). Better: drop "Workspace" since the package name already scopes it → `LlmProxyPartnerPowered`. Better still: collapse to `PartnerPoweredAi` (the doc on `client.ts:1139` explicitly calls it "partner powered AI features").
- **Rationale:** `LlmProxyPartnerPoweredWorkspace` is 31 characters parsing as five concepts: LLM-Proxy-Partner-Powered-Workspace. Without context, a reader cannot tell whether "PartnerPowered" modifies "Llm" or modifies "Workspace." `Llm` (one word) violates TS acronym casing.

### 10. `Dbfs` casing
- **File:line:** `model.ts:514-541, 651-670, 855-868, 1122-1129`
- **Category:** Acronym casing
- **Suggestion:** `DBFS` (it's an acronym — Databricks File System). Apply consistently: `DisableLegacyDBFS`, `disableLegacyDBFS`, `GetDisableLegacyDBFSRequest`.
- **Rationale:** TS style for known acronyms is uppercase. The wire is `disable_legacy_dbfs` (lowercase) which is fine, but the TS surface should be `DBFS`. The codebase is internally consistent in using `Dbfs` everywhere, so this is a global rename.

### 11. Eight proto-style nested-name types with underscores
- **File:line:** `model.ts:57, 65, 77, 89, 207, 217, 224, 235`
- **Category:** Underscore in TS identifier, Go/Java-style names
- **Suggestion:** Hoist nested types to top-level with concatenated names: `MaintenanceWindow`, `MaintenanceWindowWeekDayFrequency`, `MaintenanceWindowDayOfWeek`, `MaintenanceWindowWeekDayBasedSchedule`, `MaintenanceWindowWindowStartTime`, `ClusterAutoRestartEnablementDetails`, etc. — or scope them as a TS `namespace ClusterAutoRestartMessage { ... }`.
- **Rationale:** TS identifiers conventionally use PascalCase without underscores. Each of these eight identifiers has an `// eslint-disable-next-line @typescript-eslint/naming-convention` comment, which is the codebase admitting the violation. The deepest nesting (`ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime`) is 54 characters — and contains "Window" twice. This is generator-level technical debt visible to the consumer.

### 12. Sentinel enum values: `*_UNSPECIFIED`
- **File:line:** `model.ts:10, 58, 66, 78, 91`
- **Category:** Redundant enum prefix, long enum value
- **Suggestion:** Either omit the sentinel entirely (TS-idiomatic; use `undefined`) or rename to `UNSPECIFIED`. The current `COMPLIANCE_STANDARD_UNSPECIFIED`, `ACCESS_POLICY_TYPE_UNSPECIFIED`, `DAY_OF_WEEK_UNSPECIFIED`, `WEEK_DAY_FREQUENCY_UNSPECIFIED`, `STATUS_UNSPECIFIED` triple-stutter the enum name.
- **Rationale:** TS enum members are accessed via `EnumName.MEMBER`, so `ComplianceStandard.COMPLIANCE_STANDARD_UNSPECIFIED` reads as `ComplianceStandard.ComplianceStandard.Unspecified`. The doc comment on line 9 explicitly says "Sentinel value, should not be used in prod" — yet the type forces the consumer to consider it. Idiomatic TS represents "unspecified" with `T | undefined`.

### 13. All enum values prefixed with the enum-name token
- **File:line:** `model.ts:8-102`
- **Category:** Redundant enum prefix
- **Suggestion:** Strip prefixes. `ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek.MONDAY` is fine; `ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek.DAY_OF_WEEK_UNSPECIFIED` only adds noise — the `DAY_OF_WEEK_` is the enum-name token bleeding into the member.
- **Rationale:** Symmetrical with #12 — the noise is the proto3 convention of prefixing every member name with the enum name (to avoid C++ enum-scope collisions). TS scopes enums; the prefix is redundant.

### 14. `*Setting` suffix vs package name `workspacesettings`
- **File:line:** All `*Setting`-suffixed types
- **Category:** Domain-redundant suffix
- **Suggestion:** Drop `Setting` from the type names. Consumers reach them via `workspacesettings.X`, so `workspacesettings.AibiDashboardEmbeddingAccessPolicySetting` quadruple-stutters the domain. The inner type `AibiDashboardEmbeddingAccessPolicy` already exists *without* the suffix; the outer wrapper is purely the protobuf envelope.
- **Rationale:** Compare `workspacesettings.AibiDashboardEmbeddingAccessPolicySetting` (the envelope) vs `workspacesettings.AibiDashboardEmbeddingAccessPolicy` (the data). A consumer cannot tell them apart by name; the only difference is the `Setting` suffix means "I have an etag." If the envelope is unavoidable, name it `Envelope`/`Versioned` or hide it behind an SDK helper.

### 15. `settingName` documented as not respected on requests
- **File:line:** `model.ts:122, 150, 175, 264, 287, 313, 331, 642, 663, 676, 686, 696, 723, 950, 1004, 1027`
- **Category:** Misleading
- **Suggestion:** Mark `settingName` `readonly` on the response-only path; remove it from request bodies; or split request/response types so it is only present where meaningful. At minimum, the docstring should not say "this field is populated in the response, but it will not be respected even if it's set in the request body."
- **Rationale:** A 17-times-repeated 240-character JSDoc admits that the field is server-ignored on PATCH/UPDATE. The field is forced to `"default"` server-side. Exposing it in the public API surface only invites users to set it, expect it to take effect, and then debug why it didn't.

### 16. `settingTypeName` query parameter ignored
- **File:line:** `client.ts:340-345, 382-387, 425-430, 469-474, 510-515, 550-555, 590-595, 630-635, 675-680, 715-720, 758-763, 798-803, 838-843, 878-883, 918-923, 958-963, 994-999, 1032-1037, 1068-1073, 1106-1111, 1146-1151, 1186-1191, 1226-1231`
- **Category:** Misleading
- **Suggestion:** Drop from the request type — the path parameter (`/api/2.0/settings/types/aibi_dash_embed_ws_acc_policy/names/default`) makes the query parameter redundant. The client serializes the path slug for the user; there is no reason to also expose the slug as a `settingTypeName` query param.
- **Rationale:** Every Get/Delete/Update sets the URL path to a hard-coded slug (e.g. `aibi_dash_embed_ws_acc_policy`) and then *also* lets the user populate `settingTypeName` and `settingName` as query params. If a user sets `settingTypeName: 'foo'`, the path still wins; the field is window dressing.

### 17. `DefaultWarehouseId` envelope holds no warehouse-ID field directly
- **File:line:** `model.ts:321-338`
- **Category:** Underspecified ID, type-suffix tautology, misleading
- **Suggestion:** `interface DefaultWarehouse { id?: string; etag?: string; }` — a flat, non-envelope, no-wrapper type. Or hide the envelope completely and let the client method return `string | undefined`.
- **Rationale:** A reader sees `DefaultWarehouseId` and expects a `string` (or numeric ID). What they get is a four-layer struct: `defaultWarehouseId.value.stringVal.value` is the actual ID. Plus the type lacks any documentation about whether the warehouse ID is numeric (e.g. `1234`) or string-shaped (e.g. `0abc...d`). The Databricks warehouse-ID convention is opaque alphanumeric; this should be documented.

### 18. `*Setting` type-suffix tautology in many types
- **File:line:** `model.ts:104, 110, 138, 162, 244, 251, 275, 302, 321, 630, 651, 672, 682, 692, 706, 711, 939, 982, 991, 1015`
- **Category:** Type-suffix tautology
- **Suggestion:** Drop `Setting` from the names that have an inner non-`Setting` sibling. E.g. `AibiDashboardEmbeddingAccessPolicySetting` ↔ `AibiDashboardEmbeddingAccessPolicy` should collapse to a single type, since the suffix only adds `etag` + `settingName` (both of which are envelope concerns).
- **Rationale:** Same as #14. The combination of package-name (`workspacesettings`) + type-suffix (`Setting`) + the existence of a sibling type without the suffix is *triple* redundancy at the API surface.

### 19. Method-name redundancy in client class
- **File:line:** `client.ts:752, 792, 832, 872, 912, 952, 989, 1026, 1063, 1100, 1140, 1180, 1220, 1257, 1292, 1328, 1365, 1397, 1435, 1464, 1493, 1522, 1556, 1588, 1625, 1657`
- **Category:** Method-name redundancy
- **Suggestion:** Drop `Setting` suffix from method names: `getAibiDashboardEmbeddingAccessPolicySetting` → `getAibiDashboardEmbeddingAccessPolicy` (or, with #6, `getAiBiDashboardEmbeddingAccessPolicy`). Method already lives on `workspacesettings.Client`; the suffix is again the third stutter.
- **Rationale:** Compare `client.updateRestrictWorkspaceAdminsSetting(req)` vs `client.updateRestrictWorkspaceAdmins(req)` — the latter is unambiguous in context.

### 20. `patch*` vs `update*` methods for the same PATCH HTTP verb
- **File:line:** `client.ts:192 (patchEnableExportNotebook), 249 (patchEnableNotebookTableClipboard), 306 (patchEnableResultsDownloading)` vs `client.ts:1257 (updateAibi...), 1292, 1328, 1365, 1397, 1435, 1464, 1493, 1522, 1556, 1588, 1625, 1657 (update*)`
- **Category:** Inconsistent action verbs
- **Suggestion:** Standardize on `update*`. The three `patch*` methods are anomalies — every other PATCH method in the package is named `update*` and every API in the SDK reading from CRUD elsewhere uses `update*`.
- **Rationale:** Three of 26 methods (`patchEnableExportNotebook`, `patchEnableNotebookTableClipboard`, `patchEnableResultsDownloading`) use the verb `patch` instead of `update`, even though all 14 PATCH-method-using siblings use `update`. The HTTP verb is the same (`PATCH`). The naming inconsistency causes consumer discovery problems.

### 21. `delete*` methods that actually "revert" to default
- **File:line:** `client.ts:335 (deleteAibi...AccessPolicySetting), 377, 419, 464, 504, 544, 584, 624, 669, 709`
- **Category:** Inconsistent action verbs / misleading
- **Suggestion:** `resetToDefault*` or `reset*`. The doc literally reads "Reverts the SQL Results Download setting to its default value" (line 708), "Reverts the Dashboard Email Subscriptions setting to its default value" (line 418), "Reverts the enable partner powered AI features workspace setting to its default value" (line 623), etc. — the semantic is reset, not delete.
- **Rationale:** A `delete` method that doesn't delete is the worst kind of misleading verb. The HTTP verb is `DELETE` but that is the *server's* idiom for "remove the override and fall back to default." The SDK can wrap with `reset*` and hide the wire detail.

---

## Medium severity

### 22. `DisableLegacyAccess` — verb-phrase as type name
- **File:line:** `model.ts:630-649`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `LegacyAccessDisablement` or `LegacyAccessToggle`. Types describing settings should be nouns.
- **Rationale:** `DisableLegacyAccess` reads as an imperative ("perform the action of disabling legacy access") rather than a state ("the legacy-access-disabled toggle setting"). The discriminator name `disableLegacyAccess` inside `.value.disableLegacyAccess: BooleanMessage` doubles the verb.

### 23. `DisableLegacyDbfs` — verb-phrase as type name
- **File:line:** `model.ts:651-670`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `LegacyDBFSDisablement` or `LegacyDBFSToggle`.
- **Rationale:** Same as #22.

### 24. `EnableExportNotebook` — verb-phrase as type name
- **File:line:** `model.ts:672-680`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `NotebookExportToggle` or `NotebookExportEnabled`.
- **Rationale:** Same as #22 plus the ordering is awkward: "enable export notebook" parses as "enable a notebook for exporting" but the doc on `client.ts:166` ("Gets the Notebook and File exporting setting") shows the meaning is the toggle on the export-feature itself.

### 25. `EnableNotebookTableClipboard` — verb-phrase as type name
- **File:line:** `model.ts:682-690`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `NotebookTableClipboardToggle`.
- **Rationale:** Same as #22.

### 26. `EnableResultsDownloading` — verb + gerund mash
- **File:line:** `model.ts:692-700`
- **Category:** Verb-tense / verb-in-noun position + gerund mismatch
- **Suggestion:** `NotebookResultsDownloadToggle` (matches the doc on `client.ts:280` "Notebook results download setting").
- **Rationale:** `EnableResultsDownloading` mixes imperative `Enable` with gerund `Downloading`. The sibling type `SqlResultsDownload` (no `-ing`, no `Enable`) does the same thing for SQL. The inconsistency is severe — same domain, two different naming conventions.

### 27. `EnableResultsDownloading` vs `SqlResultsDownload` — inconsistent naming within the same package
- **File:line:** `model.ts:692, 1015`
- **Category:** Verb-tense / -ing gerund inconsistency
- **Suggestion:** Pick one form. Either both as `*Toggle` or both as `Enable*Downloading`.
- **Rationale:** Both control downloading of query results. The notebook variant is `EnableResultsDownloading` (gerund). The SQL variant is `SqlResultsDownload` (noun). The pair was authored at different times by different teams and the inconsistency leaked into the API.

### 28. `EnableResultsDownloading` (workspace settings) vs `SqlResultsDownload` — semantic overlap
- **File:line:** `model.ts:692, 1015`
- **Category:** Misleading / parallel naming
- **Suggestion:** Unify under one type with a discriminator: `ResultsDownloadToggle { context: 'notebook' | 'sql', enabled: boolean }`.
- **Rationale:** The doc on `client.ts:280` calls one "Notebook results download" and the doc on `client.ts:1219` calls the other "SQL Results Download." They have the same shape and similar semantics — but the methods, types, and wire slugs are all separate. This is duplicated wiring at the API surface.

### 29. `LlmProxyPartnerPoweredWorkspace` — redundant "Workspace" suffix
- **File:line:** `model.ts:939-956`
- **Category:** Misleading
- **Suggestion:** Drop `Workspace`. The package name is `workspacesettings`, so every type is workspace-scoped. The suffix exists only to mirror `LlmProxyPartnerPoweredAccount` in `accountsettings` — which is symmetrical but ill-justified (both should drop their scope suffix).
- **Rationale:** Compare to siblings: `DefaultNamespaceSetting`, `RestrictWorkspaceAdminsSetting`, `SqlResultsDownload`, `EnableExportNotebook` — none of them carry the "Workspace" suffix despite being workspace-scoped. `LlmProxyPartnerPoweredWorkspace` is the outlier.

### 30. `automaticClusterUpdateWorkspace` — discriminator/case name with redundant "Workspace"
- **File:line:** `model.ts:181, 1248`
- **Category:** Misleading
- **Suggestion:** `clusterAutoRestart` (matches the actual data type, `ClusterAutoRestartMessage`).
- **Rationale:** Inside `AutomaticClusterUpdateSetting.value.automaticClusterUpdateWorkspace: ClusterAutoRestartMessage` — the discriminator name uses one phrase ("automatic cluster update workspace") while the type uses another ("ClusterAutoRestartMessage"). The reader must mentally bridge "automatic cluster update" with "cluster auto restart."

### 31. `complianceSecurityProfileWorkspace`, `enhancedSecurityMonitoringWorkspace` — discriminators with redundant "Workspace"
- **File:line:** `model.ts:269, 729`
- **Category:** Misleading
- **Suggestion:** Drop "Workspace" suffix: `complianceSecurityProfile`, `enhancedSecurityMonitoring`.
- **Rationale:** Same as #29.

### 32. `restartEvenIfNoUpdatesAvailable` — double negative
- **File:line:** `model.ts:195`
- **Category:** Misleading
- **Suggestion:** `restartUnconditionally` (or invert: `skipIfNoUpdates` with opposite default).
- **Rationale:** "Restart even if no updates available" is a triple-conditional that takes effort to parse. The semantics are "restart regardless of update availability." Boolean fields should read as clean predicates.

### 33. `canToggle` — vague boolean
- **File:line:** `model.ts:192`
- **Category:** Misleading
- **Suggestion:** `isToggleable` or `canBeDisabledByCustomer`.
- **Rationale:** `canToggle` on its own does not specify *what* can be toggled or by *whom*. From context (`ClusterAutoRestartMessage`), this likely means "can the customer toggle the auto-restart setting." The name does not convey that.

### 34. `forcedForComplianceMode` — past-participle as flag
- **File:line:** `model.ts:213`
- **Category:** Misleading
- **Suggestion:** `isForcedByComplianceMode` or `forcedDueToComplianceMode`.
- **Rationale:** `forcedFor` reads ambiguously — "for the purpose of" or "due to"? The doc on line 212 ("The feature is force enabled if compliance mode is active") confirms the meaning is "due to."

### 35. `unavailableForNonEnterpriseTier`, `unavailableForDisabledEntitlement` — double negative
- **File:line:** `model.ts:209, 211`
- **Category:** Misleading
- **Suggestion:** Invert: `requiresEnterpriseTier`, `requiresEntitlement` — read more naturally.
- **Rationale:** "Unavailable for non-enterprise" requires reasoning over two negatives. "Requires enterprise" is a positive predicate.

### 36. Acronym casing across `Dbfs`, `Aibi`, `Llm`, `Csp`, `Esm`, `Sql`
- **File:line:** Throughout model.ts and client.ts
- **Category:** Acronym casing
- **Suggestion:** Apply TS-conventional casing — `DBFS`, `AIBI` (or `AiBi`), `LLM`, `CSP`, `ESM`, `SQL` — or, where they are domain acronyms, document expansion. The codebase is internally consistent in using `Pascal-token-case` for all of them, but this contradicts the TS style guide and the JSDoc which uses correct casing (`AI/BI`, `LLM`, `SQL`, etc. in prose).
- **Rationale:** JSDoc has it right; identifiers don't.

### 37. `Id` vs `ID` casing
- **File:line:** `model.ts:321, 1102` (`DefaultWarehouseId`, `UpdateDefaultWarehouseIdRequest`, `defaultWarehouseId` method)
- **Category:** Acronym casing
- **Suggestion:** `DefaultWarehouseID`, `UpdateDefaultWarehouseIDRequest` — or, if `Id` is house style, document it explicitly. Pick one and apply globally.
- **Rationale:** Established TS code is split — some major SDKs use `Id` (consistent with `Pascal-token-case`), others use `ID` (matches HTTP/spec convention). The Go SDK uses `Id`. The Databricks JS SDK should pick one and apply it everywhere; today, "Id" is used here but "ESM/CSP/LLM" suggests acronym capitalization is house style.

### 38. `Url` casing
- **File:line:** `utils.ts:71, 102`
- **Category:** Acronym casing
- **Suggestion:** Match the upstream `HttpRequest.url` field; if upstream uses `url`, leave it. Note inconsistency for the audit reviewer.
- **Rationale:** Minor — flagged because the rule applies.

### 39. Mixed `Enable*` / `Disable*` / `Enable*ing` patterns
- **File:line:** `model.ts:672 (EnableExportNotebook), 682 (EnableNotebookTableClipboard), 692 (EnableResultsDownloading), 630 (DisableLegacyAccess), 651 (DisableLegacyDbfs)`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Pick one verb-tense for "toggle" types: either all imperative (`EnableX` / `DisableX`) or all noun (`XToggle` / `XEnablement`). See severity #22–26.
- **Rationale:** Five types here use three different inflection patterns.

### 40. `EnableExportNotebook` vs `EnableNotebookTableClipboard` — word-order swap
- **File:line:** `model.ts:672, 682`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Pick word-order convention: noun-verb-noun (`EnableNotebookExport`, `EnableNotebookTableClipboard`) or verb-noun-noun (`EnableExportNotebook`, `EnableClipboardTable`).
- **Rationale:** "Enable Export Notebook" puts the noun ("Notebook") last; "Enable Notebook Table Clipboard" puts it first. The cognitive cost of two siblings in the same package using opposite orders is non-trivial.

### 41. `AibiDashboardEmbeddingAccessPolicySetting` — 41-character type-suffix tautology
- **File:line:** `model.ts:110`
- **Category:** Type-suffix tautology, overly verbose
- **Suggestion:** `EmbeddingAccessPolicy` (drop `Aibi` → covered by package context; drop `Dashboard` → covered by the embedding scope; drop `Setting` → covered by `*Setting` cleanup).
- **Rationale:** Five tokens, each redundant against context. The TS surface area is paying for proto-name verbosity.

### 42. `AibiDashboardEmbeddingApprovedDomainsSetting` — 44-character type-suffix tautology
- **File:line:** `model.ts:138`
- **Category:** Type-suffix tautology, overly verbose
- **Suggestion:** `EmbeddingApprovedDomains`.
- **Rationale:** Same as #41.

### 43. `DeleteAibiDashboardEmbeddingApprovedDomainsSettingResponse` — 58-character verbose name
- **File:line:** `model.ts:385`
- **Category:** Overly verbose, type-suffix tautology
- **Suggestion:** `ResetEmbeddingApprovedDomainsResult` (still long).
- **Rationale:** 58 characters is a noise tax on every consumer.

### 44. `UpdateAibiDashboardEmbeddingApprovedDomainsSettingRequest` — 56-character verbose name
- **File:line:** `model.ts:1050`
- **Category:** Overly verbose, type-suffix tautology
- **Suggestion:** `UpdateEmbeddingApprovedDomainsRequest` (or after #5, no separate request — use a generic shape from `settings/v2`).
- **Rationale:** Same as #43.

### 45. `delete*` method names — reserved-word adjacency
- **File:line:** `client.ts:335, 377, 419, 464, 504, 544, 584, 624, 669, 709`
- **Category:** Reserved-word collision (soft)
- **Suggestion:** `reset*` (which also fixes #21).
- **Rationale:** `delete` is a JS reserved word (`delete obj.prop`). Using it as a method prefix is technically fine but creates parsing-cost ambiguity in mental models, especially when the operation doesn't *actually* delete.

### 46. Long enum values
- **File:line:** `model.ts:19-53, 83, 84, 101`
- **Category:** Long enum value
- **Suggestion:** Most are unavoidable (regulatory standard names like `FEDRAMP_MODERATE` are canonical). For `RESTRICT_TOKENS_AND_JOB_RUN_AS` consider `RESTRICT_TOKEN_AND_JOB_RUN_AS` (singular `TOKEN`); for `SECOND_AND_FOURTH_OF_MONTH` consider abbreviation (this is a maintenance-window pattern).
- **Rationale:** Length is unavoidable for proper nouns but `RESTRICT_TOKENS_AND_JOB_RUN_AS` mixes plural noun + singular verb-phrase awkwardly.

### 47. Enum values for domain-allow lists
- **File:line:** `model.ts:59-61` (`ALLOW_ALL_DOMAINS`, `ALLOW_APPROVED_DOMAINS`, `DENY_ALL_DOMAINS`)
- **Category:** Long enum value
- **Suggestion:** `ALLOW_ALL`, `ALLOW_APPROVED`, `DENY_ALL` — drop `_DOMAINS` since the enum is already named `AibiDashboardEmbeddingAccessPolicy_AccessPolicyType` and the domain context is established.
- **Rationale:** Redundant tail. Compare with `STATUS_UNSPECIFIED`, `ALLOW_ALL`, `RESTRICT_TOKENS_AND_JOB_RUN_AS` in `RestrictWorkspaceAdminsMessage_Status` — none carry a redundant noun.

### 48. `disableGovTagCreation` — verb-as-field
- **File:line:** `model.ts:988`
- **Category:** Verb-tense inconsistency, cryptic abbreviation
- **Suggestion:** `governanceTagCreationDisabled` or `restrictsGovernanceTagCreation`. `Gov` is also cryptic abbreviation.
- **Rationale:** The field is a boolean predicate that, when `true`, disables tag creation. A noun-phrase reads more naturally. `Gov` short for "governance" is non-standard — "Gov" usually means "government" — and is documented only by the comment on lines 985-987.

---

## Low severity

### 49. Cryptic wire-key abbreviations in URL slugs
- **File:line:** `client.ts:339 (aibi_dash_embed_ws_acc_policy), 381 (aibi_dash_embed_ws_apprvd_domains), 756, 796, 1261, 1296`
- **Category:** Cryptic abbreviation
- **Suggestion:** Wire keys are server-controlled; the SDK can't unilaterally rename. Worth flagging for the broader Databricks-platform team — these URL paths are exposed in logs and SDK telemetry. `apprvd` for `approved` saves 1 character.
- **Rationale:** Wire keys aren't strictly in scope for naming audits, but they bleed into log lines and error messages. `dash_embed` for "dashboard embedding" is also non-obvious.

### 50. Cryptic wire-key abbreviations — `_ws` and `_ws_db` suffix
- **File:line:** `client.ts:468 (default_namespace_ws), 876 (shield_csp_enablement_ws_db), 1104 (shield_esm_enablement_ws_db)`
- **Category:** Cryptic abbreviation
- **Suggestion:** Wire-team concern. `ws` is workspace, `db` is database (?), `ac` is account (in `accountsettings`). These two-letter suffixes are dense.
- **Rationale:** `shield_csp_enablement_ws_db` mixes three abbreviated tokens (`shield` is fine, `csp` and `ws_db` are cryptic).

### 51. `eTag` (doc) vs `etag` (field)
- **File:line:** `model.ts:112-117, 252-259, 1024` (every `etag` doc block)
- **Category:** Acronym casing
- **Suggestion:** Standardize either `etag` or `eTag`. RFC 7232 spells it "ETag" in HTTP headers; Databricks docs spell it `eTag` in prose and `etag` as the JSON field.
- **Rationale:** Internal-doc inconsistency. The JSDoc on every type says "etag used for versioning. The response is at least as fresh as the eTag provided." — the same paragraph uses two casings.

### 52. `complianceStandards` array on singular `ComplianceSecurityProfile` envelope
- **File:line:** `model.ts:248`
- **Category:** Singular/plural mismatch (mild — correct in context)
- **Suggestion:** No change. Flagged only because the audit checklist asks for it. The field is correctly plural because it holds an array; the parent type is correctly singular because there is one profile.
- **Rationale:** Consistent. No action needed.

### 53. `approvedDomains` array — naming consistency with `AibiDashboardEmbeddingAccessPolicy`
- **File:line:** `model.ts:135`
- **Category:** Singular/plural
- **Suggestion:** None needed for this field. Flagging the parent type name — `AibiDashboardEmbeddingApprovedDomains` is plural (because it holds a list) while sibling `AibiDashboardEmbeddingAccessPolicy` is singular. The asymmetry is fine but inconsistent stylistically.
- **Rationale:** Minor; preserved for completeness.

### 54. Wire-key length in shorter slugs
- **File:line:** `client.ts:836 (automatic_cluster_update), 423 (dashboard_email_subscriptions), 673 (restrict_workspace_admins)`
- **Category:** Verbose / could be shorter
- **Suggestion:** Wire-team concern.
- **Rationale:** These three slugs are 24+ characters but spell every word out (unlike `aibi_dash_embed_ws_acc_policy` which abbreviates aggressively). The inconsistency in wire-side abbreviation conventions is itself a flag.

### 55. `Patch*Request` types vs `Update*Request` types for same PATCH HTTP verb
- **File:line:** `model.ts:959 (PatchEnableExportNotebookRequest), 967 (PatchEnableNotebookTableClipboardRequest), 975 (PatchEnableResultsDownloadingRequest)` vs `model.ts:1040, 1050, 1062, 1072, 1082, 1092, 1102, 1112, 1122, 1132, 1142, 1152, 1162 (Update*Request)`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Match #20 — standardize on `Update*Request`.
- **Rationale:** 3 of 17 request types use `Patch*`, the other 14 use `Update*`.

### 56. `Delete*Response` types duplicated across sibling settings packages
- **File:line:** `model.ts:356, 385, 414, 443, 472, 501, 530, 559, 588, 617`
- **Category:** Duplicate type
- **Suggestion:** Hoist to a shared module alongside `BooleanMessage`/`StringMessage` (see #2), or use a single canonical `EtagResponse` type across all settings packages.
- **Rationale:** Ten types with identical one-field shape repeat across `workspacesettings`, `accountsettings`, and `settings/v2`. Each is a distinct TS type to satisfy proto naming, so a `Delete*Response` from one package is not assignable to a sibling's.

---

## Cross-cutting themes

1. **Four overlapping settings packages.** `workspacesettings` + `settings` + `accountsettings` + `workspaceconf` is a confusing taxonomy with literal type duplication. Almost every type in `workspacesettings` has a doppelganger in `settings/v2`. (Severity #1, #2, #3, #4, #5.)

2. **`*Setting` triple stutter.** Package is `workspacesettings`, types are `*Setting`, methods are `get*Setting()`. Three layers of "setting" in every consumer call. (Severities #14, #18, #19.)

3. **Proto-style nested-name underscores.** Eight identifiers use proto-IDL underscore nesting (`Foo_Bar_Baz`), each with an eslint-disable comment. (Severity #11.)

4. **Sentinel `*_UNSPECIFIED` and redundant enum-name prefixes.** Proto3 convention bleeds into TS enums. (Severities #12, #13.)

5. **Acronym-casing inconsistency.** `Dbfs`, `Aibi`, `Llm`, `Csp`, `Esm`, `Sql`, `Id`, `Url` are all cased as `Pascal-token-case` (treating the acronym as one token). The JSDoc uses correct casing (`AI/BI`, `LLM`, `SQL`, `DBFS`). Pick one and apply globally. (Severities #6, #7, #8, #9, #10, #36, #37, #38.)

6. **Verb tense as type name.** `EnableExportNotebook`, `DisableLegacyAccess`, `EnableResultsDownloading` — types should be nouns, not imperative verbs or gerunds. (Severities #22-26, #39-40.)

7. **`delete` and `patch` HTTP verbs leaking into method names with wrong/inconsistent semantics.** `delete*` actually means "reset to default"; `patch*` (three methods) means the same as `update*` (14 methods). (Severities #20, #21, #45.)

8. **Fields documented as ignored on requests.** `settingName` ignored, `settingTypeName` ignored. The TS surface offers writable fields that the API discards server-side. (Severities #15, #16.)

9. **Cryptic wire-key abbreviations.** `aibi_dash_embed_ws_acc_policy`, `shield_csp_enablement_ws_db`, `_ws`, `_ws_db` suffixes etc. These leak into logs and error messages even though the SDK hides them behind method names. (Severities #49, #50.)
