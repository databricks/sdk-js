# Naming Audit: workspacesettings

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `/home/parth.bansal/sdk-js/packages/workspacesettings/`
**Versions audited:** v1
**Inferred domain:** Workspace-scoped Databricks settings: AI/BI dashboard embedding policy, automatic cluster update, compliance security profile (CSP), dashboard email subscriptions, default namespace, default warehouse ID, legacy access/DBFS disablement, notebook/file export, notebook table clipboard, results download (notebook and SQL), enhanced security monitoring (ESM), LLM proxy partner-powered AI, and restrict-workspace-admins.
**Total weird names flagged:** 45

## Summary table

| # | Severity | Category | Identifier | File:line |
|---|----------|----------|------------|-----------|
| 1 | Critical | Duplicate concept across packages | `workspacesettings` vs `settings` vs `accountsettings` vs `workspaceconf` | package boundary |
| 2 | Critical | Duplicate type | `BooleanMessage`, `StringMessage` (also in `accountsettings`, `settings/v2`) | `model.ts:181, 1029` |
| 3 | Critical | Duplicate type | `ComplianceStandard` (also in `accountsettings`) | `model.ts:8` |
| 4 | Critical | Duplicate concept | `RestrictWorkspaceAdminsSetting`, `AibiDashboardEmbeddingAccessPolicySetting` etc. mirror types in `settings/v2` | `model.ts:986, 99` and `settings/v2` |
| 5 | High | Cryptic abbreviation | `Aibi` (`AI/BI`) family of types/methods | `model.ts:52-155, 99-155`; `client.ts:335,377,752,792,1257,1292` |
| 6 | High | Cryptic abbreviation | `Csp` (Compliance Security Profile) | `model.ts:239-268`; `client.ts:876, 1369`; URL `shield_csp_enablement_ws_db` |
| 7 | High | Cryptic abbreviation | `Esm` (Enhanced Security Monitoring) | `model.ts:697-728`; `client.ts:1104,1560`; URL `shield_esm_enablement_ws_db` |
| 8 | High | Cryptic abbreviation | `Llm` (LLM Proxy Partner-Powered Workspace) | `model.ts:538-565, 934-951, 1137-1144`; `client.ts:624,1140,1588` |
| 9 | High | Cryptic abbreviation | `Dbfs` casing (`disableLegacyDbfs`) | `model.ts:509-536, 646-665, 850-863, 1117-1124`; `client.ts:584,1063,1522` |
| 10 | High | Misleading | `settingName` documented as "will not be respected" on requests | `model.ts:120, 148, 172, 261, 285, 312, 331, 640, 661, 673, 683, 693, 721, 949, 1001, 1025` |
| 11 | High | Misleading | `settingTypeName` query param ignored on Delete/Get (path param wins) | `client.ts:341-346, 383-388, 425-430, 470-475, ...` |
| 12 | High | Underspecified ID | `DefaultWarehouseId` type contains no warehouse-ID field — just an envelope | `model.ts:316-333` |
| 13 | High | Inconsistent action verbs | `patch*` vs `update*` for the same semantic (PATCH HTTP verb) | `client.ts:192 vs 1257, 1292, 1328, ...` |
| 14 | High | Inconsistent action verbs | `delete*` methods actually "revert" / "reset to default" | `client.ts:335, 377, 419, 464, 504, 544, 584, 624, 669, 709` |
| 15 | High | Triple-stutter against package name | `*Setting` suffix on every type in `workspacesettings` package | `model.ts:105, 246, 706, 986, 1010` and passim |
| 16 | Medium | Verb-tense / verb-in-noun position | `DisableLegacyAccess` (action phrase used as type/state) | `model.ts:625-644` |
| 17 | Medium | Verb-tense / verb-in-noun position | `DisableLegacyDbfs` | `model.ts:646-665` |
| 18 | Medium | Verb-tense / verb-in-noun position | `EnableExportNotebook` | `model.ts:667-675` |
| 19 | Medium | Verb-tense / verb-in-noun position | `EnableNotebookTableClipboard` | `model.ts:677-685` |
| 20 | Medium | Verb-tense / verb-in-noun position | `EnableResultsDownloading` (also: `-ing` mismatch) | `model.ts:687-695` |
| 21 | Medium | Verb-tense / -ing gerund | `EnableResultsDownloading` vs `SqlResultsDownload` (gerund vs noun, same domain) | `model.ts:687, 1010` |
| 22 | Medium | Misleading / parallel naming | `EnableResultsDownloading` (workspace settings) vs `SqlResultsDownload` (separately) — overlapping concepts | `model.ts:687 vs 1010`; client `patchEnableResultsDownloading` vs `updateSqlResultsDownload` |
| 23 | Medium | Misleading | `LlmProxyPartnerPoweredWorkspace` — "Workspace" suffix on type | `model.ts:934-951` |
| 24 | Medium | Misleading | `automaticClusterUpdateWorkspace` discriminator name | `model.ts:175, 1245` |
| 25 | Medium | Misleading | `complianceSecurityProfileWorkspace`, `enhancedSecurityMonitoringWorkspace` discriminators | `model.ts:264, 724` |
| 26 | Medium | Misleading | `restartEvenIfNoUpdatesAvailable` — double negative | `model.ts:190` |
| 27 | Medium | Misleading | `canToggle` — boolean field on enablement message | `model.ts:187` |
| 28 | Medium | Misleading | `forcedForComplianceMode` — verb-past-participle as flag | `model.ts:208` |
| 29 | Medium | Misleading | `unavailableForNonEnterpriseTier`, `unavailableForDisabledEntitlement` — negative phrasing | `model.ts:204, 206` |
| 30 | Medium | Acronym casing | `Dbfs` (should be `DBFS`); `Aibi` (should be `AiBi` or `AIBI`); `Llm` (should be `LLM`); `Csp`/`Esm`/`Sql` | `model.ts` passim |
| 31 | Medium | Acronym casing | `Id` vs `ID` (`DefaultWarehouseId`, `defaultWarehouseId`) | `model.ts:316, 1097` |
| 32 | Medium | Acronym casing | `Url` (`httpReq.url`) vs `URL` casing — minor reference | `utils.ts:70, 98, 103` |
| 33 | Medium | Verb-tense inconsistency | `Enable*` (imperative) vs `Disable*` (imperative) vs `EnableResultsDownloading` (gerund) | `model.ts:667, 677, 687, 625, 646` |
| 34 | Medium | Verb-tense inconsistency | `EnableExportNotebook` vs `EnableNotebookTableClipboard` (verb noun order swap) | `model.ts:667, 677` |
| 35 | Medium | Reserved-word collision | `delete*` method names match JS reserved word adjacency | `client.ts:335, 377, 419, ...` |
| 36 | Medium | Verb-tense / past-participle as field | `disableGovTagCreation` on `RestrictWorkspaceAdminsMessage` (action-as-field) | `model.ts:983` |
| 37 | Low | Cryptic wire-key abbreviation | `aibi_dash_embed_ws_acc_policy`, `aibi_dash_embed_ws_apprvd_domains` | `client.ts:339, 381, 756, 796, 1261, 1296` |
| 38 | Low | Cryptic wire-key abbreviation | `default_namespace_ws`, `shield_csp_enablement_ws_db`, `shield_esm_enablement_ws_db` | `client.ts:468, 876, 956, 1104, 1369, 1439, 1560` |
| 39 | Low | Acronym casing | `eTag` (doc) vs `etag` (field) | `model.ts:107-114, 248-254, 1012-1018` |
| 40 | Low | Singular/plural | `complianceStandards` (array) but inside `ComplianceSecurityProfile` (singular envelope) — consistent but flag for review | `model.ts:243` |
| 41 | Low | Singular/plural | `approvedDomains` (array) on `AibiDashboardEmbeddingApprovedDomains` (plural type / plural field — okay, but mismatched against sibling singular types like `AibiDashboardEmbeddingAccessPolicy`) | `model.ts:130` |
| 42 | Low | Verbose | Setting wire-key length: `automatic_cluster_update`, `dashboard_email_subscriptions`, `restrict_workspace_admins` | `client.ts:836, 423, 673` |
| 43 | High | Proto-architectural-leak (`Message` suffix) | `BooleanMessage`, `StringMessage`, `ClusterAutoRestartMessage`, `RestrictWorkspaceAdminsMessage` | `model.ts:181, 1029, 185, 977` |
| 44 | High | Proto-architectural-leak (`Message_` nested infix) | `ClusterAutoRestartMessage_EnablementDetails`, `ClusterAutoRestartMessage_MaintenanceWindow`, `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule`, `ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime`, `ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek`, `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency`, `RestrictWorkspaceAdminsMessage_Status` | `model.ts:60, 72, 84, 202, 212, 219, 230` |
| 45 | Medium | Proto-architectural-leak (generic `Details` suffix) | `ClusterAutoRestartMessage_EnablementDetails` and field `enablementDetails` | `model.ts:189, 202` |

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
  No documentation surfaces this taxonomy; the consumer has to guess. The four packages share types verbatim and the `settings/v2` package already exposes a generic `Setting`/`SettingsMetadata` shape that *can* represent any of these. The split is purely a wire-routing artefact.

### 2. `BooleanMessage`, `StringMessage` — duplicated in three sibling packages
- **File:line:** `model.ts:181-183, 1029-1032`
- **Category:** Duplicate type
- **Suggestion:** Hoist into `@databricks/sdk-core/wkt` (or similar shared location) alongside `FieldMask`. These are `google.protobuf.BoolValue` and `google.protobuf.StringValue` analogues and belong with `FieldMask`, which the package already imports from `wkt`.
- **Rationale:** Three packages (`workspacesettings`, `accountsettings`, `settings/v2`) all define identical types — same one boolean/string field, same wrapping. Consumers cannot pass a `BooleanMessage` from one package to a sibling method that takes a `BooleanMessage`. The duplication is wire-bookkeeping leaking through the API surface.

### 3. `ComplianceStandard` enum — duplicated in `accountsettings`
- **File:line:** `model.ts:8-49` (here) and identical in `accountsettings/src/v1/model.ts`
- **Category:** Duplicate type
- **Suggestion:** Hoist into a shared `compliance` module. The enum has 15 values, all canonical regulatory standards (HIPAA, PCI_DSS, FEDRAMP_*, etc.) that do not differ by setting scope.
- **Rationale:** HIPAA at the account level *is* HIPAA at the workspace level. Two enums with identical members means type-incompatible values for the same regulatory concept.

### 4. Whole types mirrored in `settings/v2`
- **File:line:** `model.ts:99, 133, 239, 246, 686, 706, 977, 986` vs `settings/v2/model.ts`
- **Category:** Duplicate concept
- **Suggestion:** Pick one canonical home. `settings/v2` is clearly the generic surface (it exposes `Setting`, `SettingsMetadata`, `PatchPublicWorkspaceSettingRequest`). The specific-typed methods in `workspacesettings` are a sister API for the same backend data. Either fold the specific methods into `settings/v2` (preferred) or document which one is canonical.
- **Rationale:** `AibiDashboardEmbeddingAccessPolicy`, `AibiDashboardEmbeddingApprovedDomains`, `ClusterAutoRestartMessage`, `RestrictWorkspaceAdminsMessage`, `BooleanMessage`, `StringMessage` all live in both packages with identical fields. The consumer cannot pass instances across the package boundary, despite naming/structure being byte-identical.

---

## High severity

### 5. `Aibi*` family — cryptic acronym not expanded in identifier
- **File:line:** `model.ts:52-155`; client.ts six methods
- **Category:** Cryptic abbreviation, acronym casing
- **Suggestion:** Either spell as `AiBiDashboardEmbedding*` (matching Databricks marketing) or `AIBIDashboardEmbedding*` (strict acronym casing). The current `Aibi` parses as one token, hiding the AI + BI = analytics-product structure.
- **Rationale:** "AI/BI dashboards" is the user-facing product name (confirmed in the JSDoc on `client.ts:749`). The wire path even uses `aibi_dash_embed_ws_acc_policy` — itself heavily abbreviated. A new reader cannot guess that `Aibi` means "AI + BI." TS style guide prefers acronym capitalization for known acronyms (`URL`, `HTTP`, `AI`, `BI`).

### 6. `Csp*` family — undocumented acronym
- **File:line:** `model.ts:239-268`; URL slug `shield_csp_enablement_ws_db`
- **Category:** Cryptic abbreviation
- **Suggestion:** `ComplianceSecurityProfile*` everywhere (it's already spelled out in the JSDoc on line 238). The class methods are already named `ComplianceSecurityProfile`; only the wire slug is `csp`, which is fine on the wire but should not be exposed.
- **Rationale:** Identical issue to `accountsettings`. CSP overloads catastrophically with web "Content Security Policy." Outside this codebase, that is the dominant meaning. The TS-side type name is `ComplianceSecurityProfile` (good!) but the wire and the `_workspace` suffix in `complianceSecurityProfileWorkspace` discriminator is still cryptic-adjacent.

### 7. `Esm*` family — undocumented acronym
- **File:line:** `model.ts:697-728`; URL slug `shield_esm_enablement_ws_db`; `client.ts:1104, 1560`
- **Category:** Cryptic abbreviation
- **Suggestion:** `EnhancedSecurityMonitoring*` everywhere on TS side. Wire `esm` is fine.
- **Rationale:** Same as CSP. The full name `EnhancedSecurityMonitoring` is used at the type level (good!), but discriminator names like `enhancedSecurityMonitoringWorkspace` add a confusing "Workspace" tail (see #25).

### 8. `Llm*` family — acronym casing + verb stacking
- **File:line:** `model.ts:538-565, 934-951, 1137-1144`; `client.ts:624, 1140, 1588`
- **Category:** Cryptic abbreviation + Acronym casing
- **Suggestion:** Spell out: `ModelProxyPartnerPoweredWorkspace` or `LargeLanguageModelProxyPartnerPoweredWorkspace` (admittedly long). Better: drop "Workspace" since the package name already scopes it → `LlmProxyPartnerPowered`. Better still: collapse to `PartnerPoweredAi` (the doc on `client.ts:1139` explicitly calls it "partner powered AI features").
- **Rationale:** `LlmProxyPartnerPoweredWorkspace` is 31 characters parsing as five concepts: LLM-Proxy-Partner-Powered-Workspace. Without context, a reader cannot tell whether "PartnerPowered" modifies "Llm" or modifies "Workspace." `Llm` (one word) violates TS acronym casing.

### 9. `Dbfs` casing
- **File:line:** `model.ts:509-536, 646-665, 850-863, 1117-1124`
- **Category:** Acronym casing
- **Suggestion:** `DBFS` (it's an acronym — Databricks File System). Apply consistently: `DisableLegacyDBFS`, `disableLegacyDBFS`, `GetDisableLegacyDBFSRequest`.
- **Rationale:** TS style for known acronyms is uppercase. The wire is `disable_legacy_dbfs` (lowercase) which is fine, but the TS surface should be `DBFS`. The codebase is internally consistent in using `Dbfs` everywhere, so this is a global rename.

### 10. `settingName` documented as not respected on requests
- **File:line:** `model.ts:120, 148, 172, 261, 285, 312, 331, 640, 661, 673, 683, 693, 721, 949, 1001, 1025`
- **Category:** Misleading
- **Suggestion:** Mark `settingName` `readonly` on the response-only path; remove it from request bodies; or split request/response types so it is only present where meaningful. At minimum, the docstring should not say "this field is populated in the response, but it will not be respected even if it's set in the request body."
- **Rationale:** A 16-times-repeated 240-character JSDoc admits that the field is server-ignored on PATCH/UPDATE. The field is forced to `"default"` server-side. Exposing it in the public API surface only invites users to set it, expect it to take effect, and then debug why it didn't.

### 11. `settingTypeName` query parameter ignored
- **File:line:** `client.ts:341-346, 383-388, 425-430, 470-475, 510-515, 550-555, 590-595, 630-635, 675-680, 715-720, 758-763, 798-803, 838-843, 878-883, 918-923, 958-963, 995-1000, 1032-1037, 1069-1074, 1106-1111, 1146-1151, 1186-1191, 1226-1231`
- **Category:** Misleading
- **Suggestion:** Drop from the request type — the path parameter (`/api/2.0/settings/types/aibi_dash_embed_ws_acc_policy/names/default`) makes the query parameter redundant. The client serializes the path slug for the user; there is no reason to also expose the slug as a `settingTypeName` query param.
- **Rationale:** Every Get/Delete/Update sets the URL path to a hard-coded slug (e.g. `aibi_dash_embed_ws_acc_policy`) and then *also* lets the user populate `settingTypeName` and `settingName` as query params. If a user sets `settingTypeName: 'foo'`, the path still wins; the field is window dressing.

### 12. `DefaultWarehouseId` envelope holds no warehouse-ID field directly
- **File:line:** `model.ts:316-333`
- **Category:** Underspecified ID, misleading
- **Suggestion:** `interface DefaultWarehouse { id?: string; etag?: string; }` — a flat, non-envelope, no-wrapper type. Or hide the envelope completely and let the client method return `string | undefined`.
- **Rationale:** A reader sees `DefaultWarehouseId` and expects a `string` (or numeric ID). What they get is a four-layer struct: `defaultWarehouseId.value.stringVal.value` is the actual ID. Plus the type lacks any documentation about whether the warehouse ID is numeric (e.g. `1234`) or string-shaped (e.g. `0abc...d`). The Databricks warehouse-ID convention is opaque alphanumeric; this should be documented.

### 13. `patch*` vs `update*` methods for the same PATCH HTTP verb
- **File:line:** `client.ts:192 (patchEnableExportNotebook), 249 (patchEnableNotebookTableClipboard), 306 (patchEnableResultsDownloading)` vs `client.ts:1257 (updateAibi...), 1292, 1328, 1365, 1397, 1435, 1464, 1493, 1522, 1556, 1588, 1625, 1657 (update*)`
- **Category:** Inconsistent action verbs
- **Suggestion:** Standardize on `update*`. The three `patch*` methods are anomalies — every other PATCH method in the package is named `update*` and every API in the SDK reading from CRUD elsewhere uses `update*`.
- **Rationale:** Three of 26 methods (`patchEnableExportNotebook`, `patchEnableNotebookTableClipboard`, `patchEnableResultsDownloading`) use the verb `patch` instead of `update`, even though all 14 PATCH-method-using siblings use `update`. The HTTP verb is the same (`PATCH`). The naming inconsistency causes consumer discovery problems.

### 14. `delete*` methods that actually "revert" to default
- **File:line:** `client.ts:335 (deleteAibi...AccessPolicySetting), 377, 419, 464, 504, 544, 584, 624, 669, 709`
- **Category:** Inconsistent action verbs / misleading
- **Suggestion:** `resetToDefault*` or `reset*`. The doc literally reads "Reverts the SQL Results Download setting to its default value" (line 708), "Reverts the Dashboard Email Subscriptions setting to its default value" (line 418), "Reverts the enable partner powered AI features workspace setting to its default value" (line 623), etc. — the semantic is reset, not delete.
- **Rationale:** A `delete` method that doesn't delete is the worst kind of misleading verb. The HTTP verb is `DELETE` but that is the *server's* idiom for "remove the override and fall back to default." The SDK can wrap with `reset*` and hide the wire detail.

### 15. `*Setting` triple-stutter against the `workspacesettings` package name
- **File:line:** `model.ts:105 (AibiDashboardEmbeddingAccessPolicySetting), 246 (ComplianceSecurityProfileSetting), 706 (EnhancedSecurityMonitoringSetting), 986 (RestrictWorkspaceAdminsSetting), 1010 (SqlResultsDownload — exception)` and ~14 more
- **Category:** Triple-stutter against package name
- **Suggestion:** Drop the `Setting` suffix. The package is already `workspacesettings`, so `workspacesettings.AibiDashboardEmbeddingAccessPolicySetting` reads as "the access-policy setting setting setting." Use `workspacesettings.AibiDashboardEmbeddingAccessPolicy` etc.
- **Rationale:** Every primary type in the package carries a `Setting` suffix despite the package name being `workspacesettings`. The qualified path triple-states "settings." Sibling `SqlResultsDownload` (without `Setting` suffix) shows the cleaner alternative.

### 43. `Message` suffix on top-level types — proto-architectural-leak
- **File:line:** `model.ts:181 (BooleanMessage), 185 (ClusterAutoRestartMessage), 977 (RestrictWorkspaceAdminsMessage), 1029 (StringMessage)`
- **Why:** Public TS type names should describe the domain object, not the wire-encoding container. `Message` is `proto`'s name for "any encoded record" and carries no semantic value to a TS consumer; it announces that the type was code-generated from a `.proto` definition.
- **Category:** Proto-architectural-leak (suffix)
- **Suggested:** Drop the `Message` suffix everywhere. `BooleanMessage` → `BooleanValue` (or hoist to a shared wkt `BoolValue`); `StringMessage` → `StringValue`; `ClusterAutoRestartMessage` → `ClusterAutoRestart`; `RestrictWorkspaceAdminsMessage` → `RestrictWorkspaceAdmins`.
- **Rationale:** A TS reader has no concept of `proto.Message`. Naming a wrapper around a single boolean `BooleanMessage` exposes the wire transport. Sibling types in the same package (`EnhancedSecurityMonitoring`, `ComplianceSecurityProfile`, `DashboardEmailSubscriptions`, `SqlResultsDownload`, `LlmProxyPartnerPoweredWorkspace`) all drop the `Message` suffix successfully — the four flagged types are outliers carrying through their proto identity.

### 44. `*Message_*` nested-type underscore infix — proto nested-message naming convention
- **File:line:** `model.ts:60 (ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek), 72 (...WeekDayFrequency), 84 (RestrictWorkspaceAdminsMessage_Status), 202 (ClusterAutoRestartMessage_EnablementDetails), 212 (ClusterAutoRestartMessage_MaintenanceWindow), 219 (...WeekDayBasedSchedule), 230 (...WindowStartTime)`
- **Why:** The `Parent_Nested` and `Parent_Nested_DeepNested` pattern is `protoc`'s mechanical encoding of nested `message`/`enum` blocks (since TS has no nested-type syntax in this codebase). The repeated `Message_` infix doubles down on the proto leak from #43.
- **Category:** Proto-architectural-leak (`Proto`-style nested-type marker)
- **Suggested:** Lift nested types to top-level with clean names. `ClusterAutoRestartMessage_EnablementDetails` → `ClusterAutoRestartEnablement`; `ClusterAutoRestartMessage_MaintenanceWindow` → `ClusterAutoRestartMaintenanceWindow`; `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule` → `WeekDayBasedMaintenanceSchedule`; `..._WindowStartTime` → `MaintenanceWindowStartTime`; `..._DayOfWeek` → `DayOfWeek`; `..._WeekDayFrequency` → `WeekDayFrequency`; `RestrictWorkspaceAdminsMessage_Status` → `WorkspaceAdminRestrictionStatus`.
- **Rationale:** Every occurrence of these identifiers is paired with an `eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` directive (lines 51, 59, 71, 83, 201, 211, 218, 229, 1281, 1295, 1310, 1333, 1811, 1825, 1840, 1863, 2552, 2564, 2574, 2586), confirming the codebase itself recognizes this as a proto-style leak that violates the TS naming convention. The double-`Message_` chain (e.g. `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule`) is 62 characters of nested-encoding artifact.

---

## Medium severity

### 16. `DisableLegacyAccess` — verb-phrase as type name
- **File:line:** `model.ts:625-644`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `LegacyAccessDisablement` or `LegacyAccessToggle`. Types describing settings should be nouns.
- **Rationale:** `DisableLegacyAccess` reads as an imperative ("perform the action of disabling legacy access") rather than a state ("the legacy-access-disabled toggle setting"). The discriminator name `disableLegacyAccess` inside `.value.disableLegacyAccess: BooleanMessage` doubles the verb.

### 17. `DisableLegacyDbfs` — verb-phrase as type name
- **File:line:** `model.ts:646-665`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `LegacyDBFSDisablement` or `LegacyDBFSToggle`.
- **Rationale:** Same as #16.

### 18. `EnableExportNotebook` — verb-phrase as type name
- **File:line:** `model.ts:667-675`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `NotebookExportToggle` or `NotebookExportEnabled`.
- **Rationale:** Same as #16 plus the ordering is awkward: "enable export notebook" parses as "enable a notebook for exporting" but the doc on `client.ts:166` ("Gets the Notebook and File exporting setting") shows the meaning is the toggle on the export-feature itself.

### 19. `EnableNotebookTableClipboard` — verb-phrase as type name
- **File:line:** `model.ts:677-685`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `NotebookTableClipboardToggle`.
- **Rationale:** Same as #16.

### 20. `EnableResultsDownloading` — verb + gerund mash
- **File:line:** `model.ts:687-695`
- **Category:** Verb-tense / verb-in-noun position + gerund mismatch
- **Suggestion:** `NotebookResultsDownloadToggle` (matches the doc on `client.ts:280` "Notebook results download setting").
- **Rationale:** `EnableResultsDownloading` mixes imperative `Enable` with gerund `Downloading`. The sibling type `SqlResultsDownload` (no `-ing`, no `Enable`) does the same thing for SQL. The inconsistency is severe — same domain, two different naming conventions.

### 21. `EnableResultsDownloading` vs `SqlResultsDownload` — inconsistent naming within the same package
- **File:line:** `model.ts:687, 1010`
- **Category:** Verb-tense / -ing gerund inconsistency
- **Suggestion:** Pick one form. Either both as `*Toggle` or both as `Enable*Downloading`.
- **Rationale:** Both control downloading of query results. The notebook variant is `EnableResultsDownloading` (gerund). The SQL variant is `SqlResultsDownload` (noun). The pair was authored at different times by different teams and the inconsistency leaked into the API.

### 22. `EnableResultsDownloading` (workspace settings) vs `SqlResultsDownload` — semantic overlap
- **File:line:** `model.ts:687, 1010`
- **Category:** Misleading / parallel naming
- **Suggestion:** Unify under one type with a discriminator: `ResultsDownloadToggle { context: 'notebook' | 'sql', enabled: boolean }`.
- **Rationale:** The doc on `client.ts:280` calls one "Notebook results download" and the doc on `client.ts:1219` calls the other "SQL Results Download." They have the same shape and similar semantics — but the methods, types, and wire slugs are all separate. This is duplicated wiring at the API surface.

### 23. `LlmProxyPartnerPoweredWorkspace` — redundant "Workspace" suffix
- **File:line:** `model.ts:934-951`
- **Category:** Misleading
- **Suggestion:** Drop `Workspace`. The package name is `workspacesettings`, so every type is workspace-scoped. The suffix exists only to mirror `LlmProxyPartnerPoweredAccount` in `accountsettings` — which is symmetrical but ill-justified (both should drop their scope suffix).
- **Rationale:** Compare to siblings: `DefaultNamespaceSetting`, `RestrictWorkspaceAdminsSetting`, `SqlResultsDownload`, `EnableExportNotebook` — none of them carry the "Workspace" suffix despite being workspace-scoped. `LlmProxyPartnerPoweredWorkspace` is the outlier.

### 24. `automaticClusterUpdateWorkspace` — discriminator/case name with redundant "Workspace"
- **File:line:** `model.ts:175, 1245`
- **Category:** Misleading
- **Suggestion:** `clusterAutoRestart` (matches the actual data type, `ClusterAutoRestartMessage`).
- **Rationale:** Inside `AutomaticClusterUpdateSetting.value.automaticClusterUpdateWorkspace: ClusterAutoRestartMessage` — the discriminator name uses one phrase ("automatic cluster update workspace") while the type uses another ("cluster auto restart"). The reader must mentally bridge "automatic cluster update" with "cluster auto restart."

### 25. `complianceSecurityProfileWorkspace`, `enhancedSecurityMonitoringWorkspace` — discriminators with redundant "Workspace"
- **File:line:** `model.ts:264, 724`
- **Category:** Misleading
- **Suggestion:** Drop "Workspace" suffix: `complianceSecurityProfile`, `enhancedSecurityMonitoring`.
- **Rationale:** Same as #23.

### 26. `restartEvenIfNoUpdatesAvailable` — double negative
- **File:line:** `model.ts:190`
- **Category:** Misleading
- **Suggestion:** `restartUnconditionally` (or invert: `skipIfNoUpdates` with opposite default).
- **Rationale:** "Restart even if no updates available" is a triple-conditional that takes effort to parse. The semantics are "restart regardless of update availability." Boolean fields should read as clean predicates.

### 27. `canToggle` — vague boolean
- **File:line:** `model.ts:187`
- **Category:** Misleading
- **Suggestion:** `isToggleable` or `canBeDisabledByCustomer`.
- **Rationale:** `canToggle` on its own does not specify *what* can be toggled or by *whom*. From context (`ClusterAutoRestartMessage`), this likely means "can the customer toggle the auto-restart setting." The name does not convey that.

### 28. `forcedForComplianceMode` — past-participle as flag
- **File:line:** `model.ts:208`
- **Category:** Misleading
- **Suggestion:** `isForcedByComplianceMode` or `forcedDueToComplianceMode`.
- **Rationale:** `forcedFor` reads ambiguously — "for the purpose of" or "due to"? The doc on line 207 ("The feature is force enabled if compliance mode is active") confirms the meaning is "due to."

### 29. `unavailableForNonEnterpriseTier`, `unavailableForDisabledEntitlement` — double negative
- **File:line:** `model.ts:204, 206`
- **Category:** Misleading
- **Suggestion:** Invert: `requiresEnterpriseTier`, `requiresEntitlement` — read more naturally.
- **Rationale:** "Unavailable for non-enterprise" requires reasoning over two negatives. "Requires enterprise" is a positive predicate.

### 30. Acronym casing across `Dbfs`, `Aibi`, `Llm`, `Csp`, `Esm`, `Sql`
- **File:line:** Throughout model.ts and client.ts
- **Category:** Acronym casing
- **Suggestion:** Apply TS-conventional casing — `DBFS`, `AIBI` (or `AiBi`), `LLM`, `CSP`, `ESM`, `SQL` — or, where they are domain acronyms, document expansion. The codebase is internally consistent in using `Pascal-token-case` for all of them, but this contradicts the TS style guide and the JSDoc which uses correct casing (`AI/BI`, `LLM`, `SQL`, etc. in prose).
- **Rationale:** JSDoc has it right; identifiers don't.

### 31. `Id` vs `ID` casing
- **File:line:** `model.ts:316, 1097` (`DefaultWarehouseId`, `UpdateDefaultWarehouseIdRequest`, `defaultWarehouseId` method)
- **Category:** Acronym casing
- **Suggestion:** `DefaultWarehouseID`, `UpdateDefaultWarehouseIDRequest` — or, if `Id` is house style, document it explicitly. Pick one and apply globally.
- **Rationale:** Established TS code is split — some major SDKs use `Id` (consistent with `Pascal-token-case`), others use `ID` (matches HTTP/spec convention). The Go SDK uses `Id`. The Databricks JS SDK should pick one and apply it everywhere; today, "Id" is used here but "ESM/CSP/LLM" suggests acronym capitalization is house style.

### 32. `Url` casing
- **File:line:** `utils.ts:70, 98, 103`
- **Category:** Acronym casing
- **Suggestion:** Match the upstream `HttpRequest.url` field; if upstream uses `url`, leave it. Note inconsistency for the audit reviewer.
- **Rationale:** Minor — flagged because the rule applies.

### 33. Mixed `Enable*` / `Disable*` / `Enable*ing` patterns
- **File:line:** `model.ts:667 (EnableExportNotebook), 677 (EnableNotebookTableClipboard), 687 (EnableResultsDownloading), 625 (DisableLegacyAccess), 646 (DisableLegacyDbfs)`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Pick one verb-tense for "toggle" types: either all imperative (`EnableX` / `DisableX`) or all noun (`XToggle` / `XEnablement`). See severity #16–20.
- **Rationale:** Five types here use three different inflection patterns.

### 34. `EnableExportNotebook` vs `EnableNotebookTableClipboard` — word-order swap
- **File:line:** `model.ts:667, 677`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Pick word-order convention: noun-verb-noun (`EnableNotebookExport`, `EnableNotebookTableClipboard`) or verb-noun-noun (`EnableExportNotebook`, `EnableClipboardTable`).
- **Rationale:** "Enable Export Notebook" puts the noun ("Notebook") last; "Enable Notebook Table Clipboard" puts it first. The cognitive cost of two siblings in the same package using opposite orders is non-trivial.

### 35. `delete*` method names — reserved-word adjacency
- **File:line:** `client.ts:335, 377, 419, 464, 504, 544, 584, 624, 669, 709`
- **Category:** Reserved-word collision (soft)
- **Suggestion:** `reset*` (which also fixes #14).
- **Rationale:** `delete` is a JS reserved word (`delete obj.prop`). Using it as a method prefix is technically fine but creates parsing-cost ambiguity in mental models, especially when the operation doesn't *actually* delete.

### 36. `disableGovTagCreation` — verb-as-field
- **File:line:** `model.ts:983`
- **Category:** Verb-tense inconsistency, cryptic abbreviation
- **Suggestion:** `governanceTagCreationDisabled` or `restrictsGovernanceTagCreation`. `Gov` is also cryptic abbreviation.
- **Rationale:** The field is a boolean predicate that, when `true`, disables tag creation. A noun-phrase reads more naturally. `Gov` short for "governance" is non-standard — "Gov" usually means "government" — and is documented only by the comment on lines 980-982.

### 45. `EnablementDetails` / `enablementDetails` — generic `Details` suffix
- **File:line:** `model.ts:189 (field), 202 (type ClusterAutoRestartMessage_EnablementDetails)`
- **Why:** `Details` is one of the generic carry-all suffixes that proto-generated types use when the underlying message is "a bag of fields about X." The TS surface inherits this from the proto schema; the type name conveys nothing about *what* the details are (tier eligibility + entitlement + compliance-forcing flags).
- **Category:** Proto-architectural-leak (generic `Details` suffix)
- **Suggested:** `ClusterAutoRestartEligibility` or `AutoRestartAvailability`. The struct holds three booleans about *why* the feature is available/forced — "eligibility" or "availability" is the domain concept, not "details."
- **Rationale:** The JSDoc on lines 193-200 spells out the purpose: "contains an information about the enablement status judging (e.g. whether the enterprise tier is enabled)" — a customer-facing eligibility/availability concept. `Details` is the proto-side mechanical name. Pairs with #44 (nested-type artifact).

---

## Low severity

### 37. Cryptic wire-key abbreviations in URL slugs
- **File:line:** `client.ts:339 (aibi_dash_embed_ws_acc_policy), 381 (aibi_dash_embed_ws_apprvd_domains), 756, 796, 1261, 1296`
- **Category:** Cryptic abbreviation
- **Suggestion:** Wire keys are server-controlled; the SDK can't unilaterally rename. Worth flagging for the broader Databricks-platform team — these URL paths are exposed in logs and SDK telemetry. `apprvd` for `approved` saves 1 character.
- **Rationale:** Wire keys aren't strictly in scope for naming audits, but they bleed into log lines and error messages. `dash_embed` for "dashboard embedding" is also non-obvious.

### 38. Cryptic wire-key abbreviations — `_ws` and `_ws_db` suffix
- **File:line:** `client.ts:468 (default_namespace_ws), 876 (shield_csp_enablement_ws_db), 956 (default_namespace_ws), 1104 (shield_esm_enablement_ws_db), 1369 (shield_csp_enablement_ws_db), 1439 (default_namespace_ws), 1560 (shield_esm_enablement_ws_db)`
- **Category:** Cryptic abbreviation
- **Suggestion:** Wire-team concern. `ws` is workspace, `db` is database (?), `ac` is account (in `accountsettings`). These two-letter suffixes are dense.
- **Rationale:** `shield_csp_enablement_ws_db` mixes three abbreviated tokens (`shield` is fine, `csp` and `ws_db` are cryptic).

### 39. `eTag` (doc) vs `etag` (field)
- **File:line:** `model.ts:107-114, 248-254, 1012-1018` (every `etag` doc block)
- **Category:** Acronym casing
- **Suggestion:** Standardize either `etag` or `eTag`. RFC 7232 spells it "ETag" in HTTP headers; Databricks docs spell it `eTag` in prose and `etag` as the JSON field.
- **Rationale:** Internal-doc inconsistency. The JSDoc on every type says "etag used for versioning. The response is at least as fresh as the eTag provided." — the same paragraph uses two casings.

### 40. `complianceStandards` array on singular `ComplianceSecurityProfile` envelope
- **File:line:** `model.ts:243`
- **Category:** Singular/plural mismatch (mild — correct in context)
- **Suggestion:** No change. Flagged only because the audit checklist asks for it. The field is correctly plural because it holds an array; the parent type is correctly singular because there is one profile.
- **Rationale:** Consistent. No action needed.

### 41. `approvedDomains` array — naming consistency with `AibiDashboardEmbeddingAccessPolicy`
- **File:line:** `model.ts:130`
- **Category:** Singular/plural
- **Suggestion:** None needed for this field. Flagging the parent type name — `AibiDashboardEmbeddingApprovedDomains` is plural (because it holds a list) while sibling `AibiDashboardEmbeddingAccessPolicy` is singular. The asymmetry is fine but inconsistent stylistically.
- **Rationale:** Minor; preserved for completeness.

### 42. Wire-key length in shorter slugs
- **File:line:** `client.ts:836 (automatic_cluster_update), 423 (dashboard_email_subscriptions), 673 (restrict_workspace_admins)`
- **Category:** Verbose / could be shorter
- **Suggestion:** Wire-team concern.
- **Rationale:** These three slugs are 24+ characters but spell every word out (unlike `aibi_dash_embed_ws_acc_policy` which abbreviates aggressively). The inconsistency in wire-side abbreviation conventions is itself a flag.

---

## Cross-cutting themes

1. **Four overlapping settings packages.** `workspacesettings` + `settings` + `accountsettings` + `workspaceconf` is a confusing taxonomy with literal type duplication. Almost every type in `workspacesettings` has a doppelganger in `settings/v2`. (Severity #1, #2, #3, #4.)

2. **`*Setting` triple-stutter.** Every primary type carries a `Setting` suffix despite the package name being `workspacesettings`. (Severity #15.)

3. **Acronym-casing inconsistency.** `Dbfs`, `Aibi`, `Llm`, `Csp`, `Esm`, `Sql`, `Id`, `Url` are all cased as `Pascal-token-case` (treating the acronym as one token). The JSDoc uses correct casing (`AI/BI`, `LLM`, `SQL`, `DBFS`). Pick one and apply globally. (Severities #5, #6, #7, #8, #9, #30, #31, #32.)

4. **Verb tense as type name.** `EnableExportNotebook`, `DisableLegacyAccess`, `EnableResultsDownloading` — types should be nouns, not imperative verbs or gerunds. (Severities #16-20, #33-34.)

5. **`delete` and `patch` HTTP verbs leaking into method names with wrong/inconsistent semantics.** `delete*` actually means "reset to default"; `patch*` (three methods) means the same as `update*` (14 methods). (Severities #13, #14, #35.)

6. **Fields documented as ignored on requests.** `settingName` ignored, `settingTypeName` ignored. The TS surface offers writable fields that the API discards server-side. (Severities #10, #11.)

7. **Cryptic wire-key abbreviations.** `aibi_dash_embed_ws_acc_policy`, `shield_csp_enablement_ws_db`, `_ws`, `_ws_db` suffixes etc. These leak into logs and error messages even though the SDK hides them behind method names. (Severities #37, #38.)

8. **Proto-architectural-leak through `Message` suffix and `Parent_Nested` infix.** Top-level types `BooleanMessage`, `StringMessage`, `ClusterAutoRestartMessage`, `RestrictWorkspaceAdminsMessage` and the seven `*_Message_*` nested types expose the proto-generated naming convention directly to consumers. The codebase already acknowledges the leak via `eslint-disable -- Proto-style nested message name.` annotations on every such identifier. Generic `Details` suffix on `EnablementDetails` is the same pattern. (Severities #43, #44, #45.)

---

## Fixed

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
