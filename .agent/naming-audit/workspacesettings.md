# Naming Audit: workspacesettings

**Path:** `/home/parth.bansal/sdk-js/packages/workspacesettings/`
**Versions audited:** v1
**Inferred domain:** Workspace-scoped Databricks settings: AI/BI dashboard embedding policy, automatic cluster update, compliance security profile (CSP), dashboard email subscriptions, default namespace, default warehouse ID, legacy access/DBFS disablement, notebook/file export, notebook table clipboard, results download (notebook and SQL), enhanced security monitoring (ESM), LLM proxy partner-powered AI, and restrict-workspace-admins.
**Total weird names flagged:** 45

## Summary table

| # | Severity | Category | Identifier | File:line |
|---|----------|----------|------------|-----------|
| 1 | Critical | Duplicate concept across packages | `workspacesettings` vs `settings` vs `accountsettings` vs `workspaceconf` | package boundary |
| 2 | Critical | Duplicate type | `BooleanMessage`, `StringMessage` (also in `accountsettings`, `settings/v2`) | `model.ts:186, 1034` |
| 3 | Critical | Duplicate type | `ComplianceStandard` (also in `accountsettings`) | `model.ts:8` |
| 4 | Critical | Duplicate concept | `RestrictWorkspaceAdminsSetting`, `AibiDashboardEmbeddingAccessPolicySetting` etc. mirror types in `settings/v2` | `model.ts:991, 104` and `settings/v2` |
| 5 | High | Cryptic abbreviation | `Aibi` (`AI/BI`) family of types/methods | `model.ts:57-160, 104-160`; `client.ts:335,377,752,792,1257,1292` |
| 6 | High | Cryptic abbreviation | `Csp` (Compliance Security Profile) | `model.ts:244-273`; `client.ts:872, 1365`; URL `shield_csp_enablement_ws_db` |
| 7 | High | Cryptic abbreviation | `Esm` (Enhanced Security Monitoring) | `model.ts:706-733`; `client.ts:1100,1556`; URL `shield_esm_enablement_ws_db` |
| 8 | High | Cryptic abbreviation | `Llm` (LLM Proxy Partner-Powered Workspace) | `model.ts:543-571, 939-956, 1142-1149`; `client.ts:624,1140,1588` |
| 9 | High | Cryptic abbreviation | `Dbfs` casing (`disableLegacyDbfs`) | `model.ts:514-541, 651-670, 855-868, 1122-1129`; `client.ts:584,1063,1521` |
| 10 | High | Generic / cryptic enum sentinel | `STATUS_UNSPECIFIED`, `ACCESS_POLICY_TYPE_UNSPECIFIED`, `DAY_OF_WEEK_UNSPECIFIED`, `WEEK_DAY_FREQUENCY_UNSPECIFIED`, `COMPLIANCE_STANDARD_UNSPECIFIED` | `model.ts:10, 58, 66, 78, 91` |
| 11 | High | Misleading | `settingName` documented as "will not be respected" on requests | `model.ts:122, 150, 175, 264, 287, 313, 331, 642, 663, 676, 686, 696, 723, 950, 1004, 1027` |
| 12 | High | Misleading | `settingTypeName` query param ignored on Delete/Get (path param wins) | `client.ts:340-345, 382-387, 425-430, 469-474, ...` |
| 13 | High | Underspecified ID | `DefaultWarehouseId` type contains no warehouse-ID field — just an envelope | `model.ts:321-338` |
| 14 | High | Inconsistent action verbs | `patch*` vs `update*` for the same semantic (PATCH HTTP verb) | `client.ts:192 vs 1257, 1292, 1328, ...` |
| 15 | High | Inconsistent action verbs | `delete*` methods actually "revert" / "reset to default" | `client.ts:335, 377, 419, 464, 504, 544, 584, 624, 669, 709` |
| 16 | High | Triple-stutter against package name | `*Setting` suffix on every type in `workspacesettings` package | `model.ts:104, 244, 706, 991, 1015` and passim |
| 17 | Medium | Verb-tense / verb-in-noun position | `DisableLegacyAccess` (action phrase used as type/state) | `model.ts:630-649` |
| 18 | Medium | Verb-tense / verb-in-noun position | `DisableLegacyDbfs` | `model.ts:651-670` |
| 19 | Medium | Verb-tense / verb-in-noun position | `EnableExportNotebook` | `model.ts:672-680` |
| 20 | Medium | Verb-tense / verb-in-noun position | `EnableNotebookTableClipboard` | `model.ts:682-690` |
| 21 | Medium | Verb-tense / verb-in-noun position | `EnableResultsDownloading` (also: `-ing` mismatch) | `model.ts:692-700` |
| 22 | Medium | Verb-tense / -ing gerund | `EnableResultsDownloading` vs `SqlResultsDownload` (gerund vs noun, same domain) | `model.ts:692, 1015` |
| 23 | Medium | Misleading / parallel naming | `EnableResultsDownloading` (workspace settings) vs `SqlResultsDownload` (separately) — overlapping concepts | `model.ts:692 vs 1015`; client `patchEnableResultsDownloading` vs `updateSqlResultsDownload` |
| 24 | Medium | Misleading | `LlmProxyPartnerPoweredWorkspace` — "Workspace" suffix on type | `model.ts:939-956` |
| 25 | Medium | Misleading | `automaticClusterUpdateWorkspace` discriminator name | `model.ts:181, 1248` |
| 26 | Medium | Misleading | `complianceSecurityProfileWorkspace`, `enhancedSecurityMonitoringWorkspace` discriminators | `model.ts:269, 729` |
| 27 | Medium | Misleading | `restartEvenIfNoUpdatesAvailable` — double negative | `model.ts:195` |
| 28 | Medium | Misleading | `canToggle` — boolean field on enablement message | `model.ts:192` |
| 29 | Medium | Misleading | `forcedForComplianceMode` — verb-past-participle as flag | `model.ts:213` |
| 30 | Medium | Misleading | `unavailableForNonEnterpriseTier`, `unavailableForDisabledEntitlement` — negative phrasing | `model.ts:209, 211` |
| 31 | Medium | Acronym casing | `Dbfs` (should be `DBFS`); `Aibi` (should be `AiBi` or `AIBI`); `Llm` (should be `LLM`); `Csp`/`Esm`/`Sql` | `model.ts` passim |
| 32 | Medium | Acronym casing | `Id` vs `ID` (`DefaultWarehouseId`, `defaultWarehouseId`) | `model.ts:321, 1102` |
| 33 | Medium | Acronym casing | `Url` (`httpReq.url`) vs `URL` casing — minor reference | `utils.ts:71, 102` |
| 34 | Medium | Verb-tense inconsistency | `Enable*` (imperative) vs `Disable*` (imperative) vs `EnableResultsDownloading` (gerund) | `model.ts:672, 682, 692, 630, 651` |
| 35 | Medium | Verb-tense inconsistency | `EnableExportNotebook` vs `EnableNotebookTableClipboard` (verb noun order swap) | `model.ts:672, 682` |
| 36 | Medium | Reserved-word collision | `delete*` method names match JS reserved word adjacency | `client.ts:335, 377, 419, ...` |
| 37 | Medium | Long enum value | `RESTRICT_TOKENS_AND_JOB_RUN_AS`, `SECOND_AND_FOURTH_OF_MONTH`, `FIRST_AND_THIRD_OF_MONTH`, `CYBER_ESSENTIAL_PLUS`, `CANADA_PROTECTED_B`, `FEDRAMP_MODERATE`, etc. | `model.ts:19-53, 83, 84, 101` |
| 38 | Medium | Long enum value | `ALLOW_APPROVED_DOMAINS`, `DENY_ALL_DOMAINS`, `ALLOW_ALL_DOMAINS` | `model.ts:59-61` |
| 39 | Medium | Verb-tense / past-participle as field | `disableGovTagCreation` on `RestrictWorkspaceAdminsMessage` (action-as-field) | `model.ts:988` |
| 40 | Low | Cryptic wire-key abbreviation | `aibi_dash_embed_ws_acc_policy`, `aibi_dash_embed_ws_apprvd_domains` | `client.ts:339, 381, 756, 796, 1261, 1296` |
| 41 | Low | Cryptic wire-key abbreviation | `default_namespace_ws`, `shield_csp_enablement_ws_db`, `shield_esm_enablement_ws_db` | `client.ts:468, 876, 1104, 956, 1369, 1560` |
| 42 | Low | Acronym casing | `eTag` (doc) vs `etag` (field) | `model.ts:112-117, 252-259, 1024` |
| 43 | Low | Singular/plural | `complianceStandards` (array) but inside `ComplianceSecurityProfile` (singular envelope) — consistent but flag for review | `model.ts:248` |
| 44 | Low | Singular/plural | `approvedDomains` (array) on `AibiDashboardEmbeddingApprovedDomains` (plural type / plural field — okay, but mismatched against sibling singular types like `AibiDashboardEmbeddingAccessPolicy`) | `model.ts:135` |
| 45 | Low | Verbose | Setting wire-key length: `automatic_cluster_update`, `dashboard_email_subscriptions`, `restrict_workspace_admins` | `client.ts:836, 423, 673` |

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
- **File:line:** `model.ts:186-188, 1034-1037`
- **Category:** Duplicate type
- **Suggestion:** Hoist into `@databricks/sdk-core/wkt` (or similar shared location) alongside `FieldMask`. These are `google.protobuf.BoolValue` and `google.protobuf.StringValue` analogues and belong with `FieldMask`, which the package already imports from `wkt`.
- **Rationale:** Three packages (`workspacesettings`, `accountsettings`, `settings/v2`) all define identical types — same one boolean/string field, same wrapping. Consumers cannot pass a `BooleanMessage` from one package to a sibling method that takes a `BooleanMessage`. The duplication is wire-bookkeeping leaking through the API surface.

### 3. `ComplianceStandard` enum — duplicated in `accountsettings`
- **File:line:** `model.ts:8-54` (here) and identical in `accountsettings/src/v1/model.ts`
- **Category:** Duplicate type
- **Suggestion:** Hoist into a shared `compliance` module. The enum has 15 values, all canonical regulatory standards (HIPAA, PCI_DSS, FEDRAMP_*, etc.) that do not differ by setting scope.
- **Rationale:** HIPAA at the account level *is* HIPAA at the workspace level. Two enums with identical members means type-incompatible values for the same regulatory concept.

### 4. Whole types mirrored in `settings/v2`
- **File:line:** `model.ts:104, 138, 244, 251, 691, 711, 982, 991` vs `settings/v2/model.ts`
- **Category:** Duplicate concept
- **Suggestion:** Pick one canonical home. `settings/v2` is clearly the generic surface (it exposes `Setting`, `SettingsMetadata`, `PatchPublicWorkspaceSettingRequest`). The specific-typed methods in `workspacesettings` are a sister API for the same backend data. Either fold the specific methods into `settings/v2` (preferred) or document which one is canonical.
- **Rationale:** `AibiDashboardEmbeddingAccessPolicy`, `AibiDashboardEmbeddingApprovedDomains`, `ClusterAutoRestartMessage`, `RestrictWorkspaceAdminsMessage`, `BooleanMessage`, `StringMessage` all live in both packages with identical fields. The consumer cannot pass instances across the package boundary, despite naming/structure being byte-identical.

---

## High severity

### 5. `Aibi*` family — cryptic acronym not expanded in identifier
- **File:line:** `model.ts:57-160`; client.ts six methods
- **Category:** Cryptic abbreviation, acronym casing
- **Suggestion:** Either spell as `AiBiDashboardEmbedding*` (matching Databricks marketing) or `AIBIDashboardEmbedding*` (strict acronym casing). The current `Aibi` parses as one token, hiding the AI + BI = analytics-product structure.
- **Rationale:** "AI/BI dashboards" is the user-facing product name (confirmed in the JSDoc on `client.ts:749`). The wire path even uses `aibi_dash_embed_ws_acc_policy` — itself heavily abbreviated. A new reader cannot guess that `Aibi` means "AI + BI." TS style guide prefers acronym capitalization for known acronyms (`URL`, `HTTP`, `AI`, `BI`).

### 6. `Csp*` family — undocumented acronym
- **File:line:** `model.ts:244-273`; URL slug `shield_csp_enablement_ws_db`
- **Category:** Cryptic abbreviation
- **Suggestion:** `ComplianceSecurityProfile*` everywhere (it's already spelled out in the JSDoc on line 243). The class methods are already named `ComplianceSecurityProfile`; only the wire slug is `csp`, which is fine on the wire but should not be exposed.
- **Rationale:** Identical issue to `accountsettings`. CSP overloads catastrophically with web "Content Security Policy." Outside this codebase, that is the dominant meaning. The TS-side type name is `ComplianceSecurityProfile` (good!) but the wire and the `_workspace` suffix in `complianceSecurityProfileWorkspace` discriminator is still cryptic-adjacent.

### 7. `Esm*` family — undocumented acronym
- **File:line:** `model.ts:706-733`; URL slug `shield_esm_enablement_ws_db`; `client.ts:1100, 1556`
- **Category:** Cryptic abbreviation
- **Suggestion:** `EnhancedSecurityMonitoring*` everywhere on TS side. Wire `esm` is fine.
- **Rationale:** Same as CSP. The full name `EnhancedSecurityMonitoring` is used at the type level (good!), but discriminator names like `enhancedSecurityMonitoringWorkspace` add a confusing "Workspace" tail (see #26).

### 8. `Llm*` family — acronym casing + verb stacking
- **File:line:** `model.ts:543-571, 939-956, 1142-1149`; `client.ts:624, 1140, 1588`
- **Category:** Cryptic abbreviation + Acronym casing
- **Suggestion:** Spell out: `ModelProxyPartnerPoweredWorkspace` or `LargeLanguageModelProxyPartnerPoweredWorkspace` (admittedly long). Better: drop "Workspace" since the package name already scopes it → `LlmProxyPartnerPowered`. Better still: collapse to `PartnerPoweredAi` (the doc on `client.ts:1139` explicitly calls it "partner powered AI features").
- **Rationale:** `LlmProxyPartnerPoweredWorkspace` is 31 characters parsing as five concepts: LLM-Proxy-Partner-Powered-Workspace. Without context, a reader cannot tell whether "PartnerPowered" modifies "Llm" or modifies "Workspace." `Llm` (one word) violates TS acronym casing.

### 9. `Dbfs` casing
- **File:line:** `model.ts:514-541, 651-670, 855-868, 1122-1129`
- **Category:** Acronym casing
- **Suggestion:** `DBFS` (it's an acronym — Databricks File System). Apply consistently: `DisableLegacyDBFS`, `disableLegacyDBFS`, `GetDisableLegacyDBFSRequest`.
- **Rationale:** TS style for known acronyms is uppercase. The wire is `disable_legacy_dbfs` (lowercase) which is fine, but the TS surface should be `DBFS`. The codebase is internally consistent in using `Dbfs` everywhere, so this is a global rename.

### 10. Sentinel enum values: `*_UNSPECIFIED`
- **File:line:** `model.ts:10, 58, 66, 78, 91`
- **Category:** Sentinel enum value
- **Suggestion:** Either omit the sentinel entirely (TS-idiomatic; use `undefined`) or rename to `UNSPECIFIED`. The current `COMPLIANCE_STANDARD_UNSPECIFIED`, `ACCESS_POLICY_TYPE_UNSPECIFIED`, `DAY_OF_WEEK_UNSPECIFIED`, `WEEK_DAY_FREQUENCY_UNSPECIFIED`, `STATUS_UNSPECIFIED` are sentinel values flagged by their docstrings as "should not be used in prod."
- **Rationale:** The doc comment on line 9 explicitly says "Sentinel value, should not be used in prod" — yet the type forces the consumer to consider it. Idiomatic TS represents "unspecified" with `T | undefined`.

### 11. `settingName` documented as not respected on requests
- **File:line:** `model.ts:122, 150, 175, 264, 287, 313, 331, 642, 663, 676, 686, 696, 723, 950, 1004, 1027`
- **Category:** Misleading
- **Suggestion:** Mark `settingName` `readonly` on the response-only path; remove it from request bodies; or split request/response types so it is only present where meaningful. At minimum, the docstring should not say "this field is populated in the response, but it will not be respected even if it's set in the request body."
- **Rationale:** A 17-times-repeated 240-character JSDoc admits that the field is server-ignored on PATCH/UPDATE. The field is forced to `"default"` server-side. Exposing it in the public API surface only invites users to set it, expect it to take effect, and then debug why it didn't.

### 12. `settingTypeName` query parameter ignored
- **File:line:** `client.ts:340-345, 382-387, 425-430, 469-474, 510-515, 550-555, 590-595, 630-635, 675-680, 715-720, 758-763, 798-803, 838-843, 878-883, 918-923, 958-963, 994-999, 1032-1037, 1068-1073, 1106-1111, 1146-1151, 1186-1191, 1226-1231`
- **Category:** Misleading
- **Suggestion:** Drop from the request type — the path parameter (`/api/2.0/settings/types/aibi_dash_embed_ws_acc_policy/names/default`) makes the query parameter redundant. The client serializes the path slug for the user; there is no reason to also expose the slug as a `settingTypeName` query param.
- **Rationale:** Every Get/Delete/Update sets the URL path to a hard-coded slug (e.g. `aibi_dash_embed_ws_acc_policy`) and then *also* lets the user populate `settingTypeName` and `settingName` as query params. If a user sets `settingTypeName: 'foo'`, the path still wins; the field is window dressing.

### 13. `DefaultWarehouseId` envelope holds no warehouse-ID field directly
- **File:line:** `model.ts:321-338`
- **Category:** Underspecified ID, misleading
- **Suggestion:** `interface DefaultWarehouse { id?: string; etag?: string; }` — a flat, non-envelope, no-wrapper type. Or hide the envelope completely and let the client method return `string | undefined`.
- **Rationale:** A reader sees `DefaultWarehouseId` and expects a `string` (or numeric ID). What they get is a four-layer struct: `defaultWarehouseId.value.stringVal.value` is the actual ID. Plus the type lacks any documentation about whether the warehouse ID is numeric (e.g. `1234`) or string-shaped (e.g. `0abc...d`). The Databricks warehouse-ID convention is opaque alphanumeric; this should be documented.

### 14. `patch*` vs `update*` methods for the same PATCH HTTP verb
- **File:line:** `client.ts:192 (patchEnableExportNotebook), 249 (patchEnableNotebookTableClipboard), 306 (patchEnableResultsDownloading)` vs `client.ts:1257 (updateAibi...), 1292, 1328, 1365, 1397, 1435, 1464, 1493, 1522, 1556, 1588, 1625, 1657 (update*)`
- **Category:** Inconsistent action verbs
- **Suggestion:** Standardize on `update*`. The three `patch*` methods are anomalies — every other PATCH method in the package is named `update*` and every API in the SDK reading from CRUD elsewhere uses `update*`.
- **Rationale:** Three of 26 methods (`patchEnableExportNotebook`, `patchEnableNotebookTableClipboard`, `patchEnableResultsDownloading`) use the verb `patch` instead of `update`, even though all 14 PATCH-method-using siblings use `update`. The HTTP verb is the same (`PATCH`). The naming inconsistency causes consumer discovery problems.

### 15. `delete*` methods that actually "revert" to default
- **File:line:** `client.ts:335 (deleteAibi...AccessPolicySetting), 377, 419, 464, 504, 544, 584, 624, 669, 709`
- **Category:** Inconsistent action verbs / misleading
- **Suggestion:** `resetToDefault*` or `reset*`. The doc literally reads "Reverts the SQL Results Download setting to its default value" (line 708), "Reverts the Dashboard Email Subscriptions setting to its default value" (line 418), "Reverts the enable partner powered AI features workspace setting to its default value" (line 623), etc. — the semantic is reset, not delete.
- **Rationale:** A `delete` method that doesn't delete is the worst kind of misleading verb. The HTTP verb is `DELETE` but that is the *server's* idiom for "remove the override and fall back to default." The SDK can wrap with `reset*` and hide the wire detail.

### 16. `*Setting` triple-stutter against the `workspacesettings` package name
- **File:line:** `model.ts:104 (AibiDashboardEmbeddingAccessPolicySetting), 244 (ComplianceSecurityProfileSetting), 706 (EnhancedSecurityMonitoringSetting), 991 (RestrictWorkspaceAdminsSetting), 1015 (SqlResultsDownload — exception)` and ~14 more
- **Category:** Triple-stutter against package name
- **Suggestion:** Drop the `Setting` suffix. The package is already `workspacesettings`, so `workspacesettings.AibiDashboardEmbeddingAccessPolicySetting` reads as "the access-policy setting setting setting." Use `workspacesettings.AibiDashboardEmbeddingAccessPolicy` etc.
- **Rationale:** Every primary type in the package carries a `Setting` suffix despite the package name being `workspacesettings`. The qualified path triple-states "settings." Sibling `SqlResultsDownload` (without `Setting` suffix) shows the cleaner alternative.

---

## Medium severity

### 17. `DisableLegacyAccess` — verb-phrase as type name
- **File:line:** `model.ts:630-649`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `LegacyAccessDisablement` or `LegacyAccessToggle`. Types describing settings should be nouns.
- **Rationale:** `DisableLegacyAccess` reads as an imperative ("perform the action of disabling legacy access") rather than a state ("the legacy-access-disabled toggle setting"). The discriminator name `disableLegacyAccess` inside `.value.disableLegacyAccess: BooleanMessage` doubles the verb.

### 18. `DisableLegacyDbfs` — verb-phrase as type name
- **File:line:** `model.ts:651-670`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `LegacyDBFSDisablement` or `LegacyDBFSToggle`.
- **Rationale:** Same as #17.

### 19. `EnableExportNotebook` — verb-phrase as type name
- **File:line:** `model.ts:672-680`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `NotebookExportToggle` or `NotebookExportEnabled`.
- **Rationale:** Same as #17 plus the ordering is awkward: "enable export notebook" parses as "enable a notebook for exporting" but the doc on `client.ts:166` ("Gets the Notebook and File exporting setting") shows the meaning is the toggle on the export-feature itself.

### 20. `EnableNotebookTableClipboard` — verb-phrase as type name
- **File:line:** `model.ts:682-690`
- **Category:** Verb-tense / verb-in-noun position
- **Suggestion:** `NotebookTableClipboardToggle`.
- **Rationale:** Same as #17.

### 21. `EnableResultsDownloading` — verb + gerund mash
- **File:line:** `model.ts:692-700`
- **Category:** Verb-tense / verb-in-noun position + gerund mismatch
- **Suggestion:** `NotebookResultsDownloadToggle` (matches the doc on `client.ts:280` "Notebook results download setting").
- **Rationale:** `EnableResultsDownloading` mixes imperative `Enable` with gerund `Downloading`. The sibling type `SqlResultsDownload` (no `-ing`, no `Enable`) does the same thing for SQL. The inconsistency is severe — same domain, two different naming conventions.

### 22. `EnableResultsDownloading` vs `SqlResultsDownload` — inconsistent naming within the same package
- **File:line:** `model.ts:692, 1015`
- **Category:** Verb-tense / -ing gerund inconsistency
- **Suggestion:** Pick one form. Either both as `*Toggle` or both as `Enable*Downloading`.
- **Rationale:** Both control downloading of query results. The notebook variant is `EnableResultsDownloading` (gerund). The SQL variant is `SqlResultsDownload` (noun). The pair was authored at different times by different teams and the inconsistency leaked into the API.

### 23. `EnableResultsDownloading` (workspace settings) vs `SqlResultsDownload` — semantic overlap
- **File:line:** `model.ts:692, 1015`
- **Category:** Misleading / parallel naming
- **Suggestion:** Unify under one type with a discriminator: `ResultsDownloadToggle { context: 'notebook' | 'sql', enabled: boolean }`.
- **Rationale:** The doc on `client.ts:280` calls one "Notebook results download" and the doc on `client.ts:1219` calls the other "SQL Results Download." They have the same shape and similar semantics — but the methods, types, and wire slugs are all separate. This is duplicated wiring at the API surface.

### 24. `LlmProxyPartnerPoweredWorkspace` — redundant "Workspace" suffix
- **File:line:** `model.ts:939-956`
- **Category:** Misleading
- **Suggestion:** Drop `Workspace`. The package name is `workspacesettings`, so every type is workspace-scoped. The suffix exists only to mirror `LlmProxyPartnerPoweredAccount` in `accountsettings` — which is symmetrical but ill-justified (both should drop their scope suffix).
- **Rationale:** Compare to siblings: `DefaultNamespaceSetting`, `RestrictWorkspaceAdminsSetting`, `SqlResultsDownload`, `EnableExportNotebook` — none of them carry the "Workspace" suffix despite being workspace-scoped. `LlmProxyPartnerPoweredWorkspace` is the outlier.

### 25. `automaticClusterUpdateWorkspace` — discriminator/case name with redundant "Workspace"
- **File:line:** `model.ts:181, 1248`
- **Category:** Misleading
- **Suggestion:** `clusterAutoRestart` (matches the actual data type, `ClusterAutoRestartMessage`).
- **Rationale:** Inside `AutomaticClusterUpdateSetting.value.automaticClusterUpdateWorkspace: ClusterAutoRestartMessage` — the discriminator name uses one phrase ("automatic cluster update workspace") while the type uses another ("cluster auto restart"). The reader must mentally bridge "automatic cluster update" with "cluster auto restart."

### 26. `complianceSecurityProfileWorkspace`, `enhancedSecurityMonitoringWorkspace` — discriminators with redundant "Workspace"
- **File:line:** `model.ts:269, 729`
- **Category:** Misleading
- **Suggestion:** Drop "Workspace" suffix: `complianceSecurityProfile`, `enhancedSecurityMonitoring`.
- **Rationale:** Same as #24.

### 27. `restartEvenIfNoUpdatesAvailable` — double negative
- **File:line:** `model.ts:195`
- **Category:** Misleading
- **Suggestion:** `restartUnconditionally` (or invert: `skipIfNoUpdates` with opposite default).
- **Rationale:** "Restart even if no updates available" is a triple-conditional that takes effort to parse. The semantics are "restart regardless of update availability." Boolean fields should read as clean predicates.

### 28. `canToggle` — vague boolean
- **File:line:** `model.ts:192`
- **Category:** Misleading
- **Suggestion:** `isToggleable` or `canBeDisabledByCustomer`.
- **Rationale:** `canToggle` on its own does not specify *what* can be toggled or by *whom*. From context (`ClusterAutoRestartMessage`), this likely means "can the customer toggle the auto-restart setting." The name does not convey that.

### 29. `forcedForComplianceMode` — past-participle as flag
- **File:line:** `model.ts:213`
- **Category:** Misleading
- **Suggestion:** `isForcedByComplianceMode` or `forcedDueToComplianceMode`.
- **Rationale:** `forcedFor` reads ambiguously — "for the purpose of" or "due to"? The doc on line 212 ("The feature is force enabled if compliance mode is active") confirms the meaning is "due to."

### 30. `unavailableForNonEnterpriseTier`, `unavailableForDisabledEntitlement` — double negative
- **File:line:** `model.ts:209, 211`
- **Category:** Misleading
- **Suggestion:** Invert: `requiresEnterpriseTier`, `requiresEntitlement` — read more naturally.
- **Rationale:** "Unavailable for non-enterprise" requires reasoning over two negatives. "Requires enterprise" is a positive predicate.

### 31. Acronym casing across `Dbfs`, `Aibi`, `Llm`, `Csp`, `Esm`, `Sql`
- **File:line:** Throughout model.ts and client.ts
- **Category:** Acronym casing
- **Suggestion:** Apply TS-conventional casing — `DBFS`, `AIBI` (or `AiBi`), `LLM`, `CSP`, `ESM`, `SQL` — or, where they are domain acronyms, document expansion. The codebase is internally consistent in using `Pascal-token-case` for all of them, but this contradicts the TS style guide and the JSDoc which uses correct casing (`AI/BI`, `LLM`, `SQL`, etc. in prose).
- **Rationale:** JSDoc has it right; identifiers don't.

### 32. `Id` vs `ID` casing
- **File:line:** `model.ts:321, 1102` (`DefaultWarehouseId`, `UpdateDefaultWarehouseIdRequest`, `defaultWarehouseId` method)
- **Category:** Acronym casing
- **Suggestion:** `DefaultWarehouseID`, `UpdateDefaultWarehouseIDRequest` — or, if `Id` is house style, document it explicitly. Pick one and apply globally.
- **Rationale:** Established TS code is split — some major SDKs use `Id` (consistent with `Pascal-token-case`), others use `ID` (matches HTTP/spec convention). The Go SDK uses `Id`. The Databricks JS SDK should pick one and apply it everywhere; today, "Id" is used here but "ESM/CSP/LLM" suggests acronym capitalization is house style.

### 33. `Url` casing
- **File:line:** `utils.ts:71, 102`
- **Category:** Acronym casing
- **Suggestion:** Match the upstream `HttpRequest.url` field; if upstream uses `url`, leave it. Note inconsistency for the audit reviewer.
- **Rationale:** Minor — flagged because the rule applies.

### 34. Mixed `Enable*` / `Disable*` / `Enable*ing` patterns
- **File:line:** `model.ts:672 (EnableExportNotebook), 682 (EnableNotebookTableClipboard), 692 (EnableResultsDownloading), 630 (DisableLegacyAccess), 651 (DisableLegacyDbfs)`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Pick one verb-tense for "toggle" types: either all imperative (`EnableX` / `DisableX`) or all noun (`XToggle` / `XEnablement`). See severity #17–21.
- **Rationale:** Five types here use three different inflection patterns.

### 35. `EnableExportNotebook` vs `EnableNotebookTableClipboard` — word-order swap
- **File:line:** `model.ts:672, 682`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Pick word-order convention: noun-verb-noun (`EnableNotebookExport`, `EnableNotebookTableClipboard`) or verb-noun-noun (`EnableExportNotebook`, `EnableClipboardTable`).
- **Rationale:** "Enable Export Notebook" puts the noun ("Notebook") last; "Enable Notebook Table Clipboard" puts it first. The cognitive cost of two siblings in the same package using opposite orders is non-trivial.

### 36. `delete*` method names — reserved-word adjacency
- **File:line:** `client.ts:335, 377, 419, 464, 504, 544, 584, 624, 669, 709`
- **Category:** Reserved-word collision (soft)
- **Suggestion:** `reset*` (which also fixes #15).
- **Rationale:** `delete` is a JS reserved word (`delete obj.prop`). Using it as a method prefix is technically fine but creates parsing-cost ambiguity in mental models, especially when the operation doesn't *actually* delete.

### 37. Long enum values
- **File:line:** `model.ts:19-53, 83, 84, 101`
- **Category:** Long enum value
- **Suggestion:** Most are unavoidable (regulatory standard names like `FEDRAMP_MODERATE` are canonical). For `RESTRICT_TOKENS_AND_JOB_RUN_AS` consider `RESTRICT_TOKEN_AND_JOB_RUN_AS` (singular `TOKEN`); for `SECOND_AND_FOURTH_OF_MONTH` consider abbreviation (this is a maintenance-window pattern).
- **Rationale:** Length is unavoidable for proper nouns but `RESTRICT_TOKENS_AND_JOB_RUN_AS` mixes plural noun + singular verb-phrase awkwardly.

### 38. Enum values for domain-allow lists
- **File:line:** `model.ts:59-61` (`ALLOW_ALL_DOMAINS`, `ALLOW_APPROVED_DOMAINS`, `DENY_ALL_DOMAINS`)
- **Category:** Long enum value
- **Suggestion:** `ALLOW_ALL`, `ALLOW_APPROVED`, `DENY_ALL` — drop `_DOMAINS` since the enum is already named and the domain context is established.
- **Rationale:** Redundant tail. Compare with `STATUS_UNSPECIFIED`, `ALLOW_ALL`, `RESTRICT_TOKENS_AND_JOB_RUN_AS` — none carry a redundant noun.

### 39. `disableGovTagCreation` — verb-as-field
- **File:line:** `model.ts:988`
- **Category:** Verb-tense inconsistency, cryptic abbreviation
- **Suggestion:** `governanceTagCreationDisabled` or `restrictsGovernanceTagCreation`. `Gov` is also cryptic abbreviation.
- **Rationale:** The field is a boolean predicate that, when `true`, disables tag creation. A noun-phrase reads more naturally. `Gov` short for "governance" is non-standard — "Gov" usually means "government" — and is documented only by the comment on lines 985-987.

---

## Low severity

### 40. Cryptic wire-key abbreviations in URL slugs
- **File:line:** `client.ts:339 (aibi_dash_embed_ws_acc_policy), 381 (aibi_dash_embed_ws_apprvd_domains), 756, 796, 1261, 1296`
- **Category:** Cryptic abbreviation
- **Suggestion:** Wire keys are server-controlled; the SDK can't unilaterally rename. Worth flagging for the broader Databricks-platform team — these URL paths are exposed in logs and SDK telemetry. `apprvd` for `approved` saves 1 character.
- **Rationale:** Wire keys aren't strictly in scope for naming audits, but they bleed into log lines and error messages. `dash_embed` for "dashboard embedding" is also non-obvious.

### 41. Cryptic wire-key abbreviations — `_ws` and `_ws_db` suffix
- **File:line:** `client.ts:468 (default_namespace_ws), 876 (shield_csp_enablement_ws_db), 1104 (shield_esm_enablement_ws_db)`
- **Category:** Cryptic abbreviation
- **Suggestion:** Wire-team concern. `ws` is workspace, `db` is database (?), `ac` is account (in `accountsettings`). These two-letter suffixes are dense.
- **Rationale:** `shield_csp_enablement_ws_db` mixes three abbreviated tokens (`shield` is fine, `csp` and `ws_db` are cryptic).

### 42. `eTag` (doc) vs `etag` (field)
- **File:line:** `model.ts:112-117, 252-259, 1024` (every `etag` doc block)
- **Category:** Acronym casing
- **Suggestion:** Standardize either `etag` or `eTag`. RFC 7232 spells it "ETag" in HTTP headers; Databricks docs spell it `eTag` in prose and `etag` as the JSON field.
- **Rationale:** Internal-doc inconsistency. The JSDoc on every type says "etag used for versioning. The response is at least as fresh as the eTag provided." — the same paragraph uses two casings.

### 43. `complianceStandards` array on singular `ComplianceSecurityProfile` envelope
- **File:line:** `model.ts:248`
- **Category:** Singular/plural mismatch (mild — correct in context)
- **Suggestion:** No change. Flagged only because the audit checklist asks for it. The field is correctly plural because it holds an array; the parent type is correctly singular because there is one profile.
- **Rationale:** Consistent. No action needed.

### 44. `approvedDomains` array — naming consistency with `AibiDashboardEmbeddingAccessPolicy`
- **File:line:** `model.ts:135`
- **Category:** Singular/plural
- **Suggestion:** None needed for this field. Flagging the parent type name — `AibiDashboardEmbeddingApprovedDomains` is plural (because it holds a list) while sibling `AibiDashboardEmbeddingAccessPolicy` is singular. The asymmetry is fine but inconsistent stylistically.
- **Rationale:** Minor; preserved for completeness.

### 45. Wire-key length in shorter slugs
- **File:line:** `client.ts:836 (automatic_cluster_update), 423 (dashboard_email_subscriptions), 673 (restrict_workspace_admins)`
- **Category:** Verbose / could be shorter
- **Suggestion:** Wire-team concern.
- **Rationale:** These three slugs are 24+ characters but spell every word out (unlike `aibi_dash_embed_ws_acc_policy` which abbreviates aggressively). The inconsistency in wire-side abbreviation conventions is itself a flag.

---

## Cross-cutting themes

1. **Four overlapping settings packages.** `workspacesettings` + `settings` + `accountsettings` + `workspaceconf` is a confusing taxonomy with literal type duplication. Almost every type in `workspacesettings` has a doppelganger in `settings/v2`. (Severity #1, #2, #3, #4.)

2. **Sentinel `*_UNSPECIFIED` values.** Sentinel enum members flagged by their own docstrings as "should not be used in prod." (Severity #10.)

3. **`*Setting` triple-stutter.** Every primary type carries a `Setting` suffix despite the package name being `workspacesettings`. (Severity #16.)

4. **Acronym-casing inconsistency.** `Dbfs`, `Aibi`, `Llm`, `Csp`, `Esm`, `Sql`, `Id`, `Url` are all cased as `Pascal-token-case` (treating the acronym as one token). The JSDoc uses correct casing (`AI/BI`, `LLM`, `SQL`, `DBFS`). Pick one and apply globally. (Severities #5, #6, #7, #8, #9, #31, #32, #33.)

5. **Verb tense as type name.** `EnableExportNotebook`, `DisableLegacyAccess`, `EnableResultsDownloading` — types should be nouns, not imperative verbs or gerunds. (Severities #17-21, #34-35.)

6. **`delete` and `patch` HTTP verbs leaking into method names with wrong/inconsistent semantics.** `delete*` actually means "reset to default"; `patch*` (three methods) means the same as `update*` (14 methods). (Severities #14, #15, #36.)

7. **Fields documented as ignored on requests.** `settingName` ignored, `settingTypeName` ignored. The TS surface offers writable fields that the API discards server-side. (Severities #11, #12.)

8. **Cryptic wire-key abbreviations.** `aibi_dash_embed_ws_acc_policy`, `shield_csp_enablement_ws_db`, `_ws`, `_ws_db` suffixes etc. These leak into logs and error messages even though the SDK hides them behind method names. (Severities #40, #41.)
