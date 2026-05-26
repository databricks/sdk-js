# Naming Audit: settings

**Path:** `/home/parth.bansal/sdk-js/packages/settings/`
**Versions audited:** v2
**Inferred domain:** A "unified" generic settings/user-preference key/value API (referred to as `settingsv2` in the wire/JSDoc) that exposes a single `Setting` polymorphic value type with seven typed payload variants. Operates at three scopes — account-level settings, account-level user preferences, and workspace-level settings — replacing the per-feature `get*`/`update*`/`delete*` endpoints that live in `accountsettings` (v1) and `workspacesettings` (v1).
**Total weird names flagged:** 34

---

## CRITICAL: Cross-package collision

Within the JS SDK there are now **four** packages with overlapping responsibilities:

| Package | Versions | Style | Surface |
|---------|----------|-------|---------|
| `settings` (this) | v2 | Generic key/value | `Setting` with polymorphic `value`/`effectiveValue` |
| `accountsettings` | v1 | Per-feature endpoints | `CspEnablementAccountSetting`, `PersonalComputeSetting`, etc. |
| `workspacesettings` | v1 | Per-feature endpoints | `DefaultNamespaceSetting`, `AutomaticClusterUpdateSetting`, etc. |
| `workspaceconf` | v1 | Free-form key/value | `WorkspaceConf {key,value}` (single string-string map) |

The same data type — `RestrictWorkspaceAdminsMessage`, `ClusterAutoRestartMessage`, `AibiDashboardEmbeddingAccessPolicy`, `PersonalComputeMessage`, `BooleanMessage`, `StringMessage`, `IntegerMessage` — appears verbatim in both `settings/v2/model.ts` and `workspacesettings/v1/model.ts` (and is referenced from `accountsettings/v1`). Same TS identifier, defined twice, in two packages, with two `unmarshal*Schema`s. Consumers using both packages will get two distinct types named the same thing.

> Flag the entire package layout for re-design (or, at minimum, hoist shared message types into a single `@databricks/sdk-settings-shared` package). The "settings vs workspacesettings vs accountsettings vs workspaceconf" naming gives the reader no way to predict which one to import.

---

## Summary table

| # | Severity | Category | Identifier | File:line |
|---|----------|----------|------------|-----------|
| 1 | Critical | Vague package name | `settings` (package) | package level |
| 2 | Critical | Duplicate concept (4-package overlap) | `settings` vs `accountsettings` vs `workspacesettings` vs `workspaceconf` | package level |
| 3 | Critical | Duplicated TS identifier across packages | `RestrictWorkspaceAdminsMessage`, `ClusterAutoRestartMessage`, `AibiDashboardEmbeddingAccessPolicy`, `BooleanMessage`, `StringMessage`, `IntegerMessage`, `PersonalComputeMessage` | `model.ts:88-100,102,288,294,98,171,414,284` (and the workspacesettings dup) |
| 4 | High | Vague/generic type | `Setting` | `model.ts:305` |
| 5 | High | Vague/generic type | `SettingsMetadata` | `model.ts:424` |
| 6 | High | Vague/generic type | `UserPreference` | `model.ts:452` |
| 7 | High | Suffix tautology + Go-style | `*Message` suffix (`BooleanMessage`, `IntegerMessage`, `StringMessage`, `ClusterAutoRestartMessage`, `PersonalComputeMessage`, `RestrictWorkspaceAdminsMessage`) | `model.ts:102, 106, 175, 292, 296, 442` |
| 8 | High | Cryptic abbreviation (undefined) | `Aibi` (AI/BI) in `AibiDashboardEmbedding*` | `model.ts:30, 88, 94` |
| 9 | High | Verb-tense (action-name as type) | `RestrictWorkspaceAdminsMessage` (verb-noun as state type) | `model.ts:296` |
| 10 | High | Verb-tense | `ClusterAutoRestartMessage` (verb-phrase as state type) | `model.ts:106` |
| 11 | High | Proto-architectural leak (nested-type underscore syntax) | `AibiDashboardEmbeddingAccessPolicy_AccessPolicyType`, `ClusterAutoRestartMessage_MaintenanceWindow`, `ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek`, `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency`, `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule`, `ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime`, `ClusterAutoRestartMessage_EnablementDetails`, `PersonalComputeMessage_PersonalComputeMessageEnum`, `RestrictWorkspaceAdminsMessage_Status` | `model.ts:30, 38, 50, 66, 73, 123, 133, 140, 151` |
| 12 | High | Proto-architectural leak (`Api` mid-position) | `AllowedAppsUserApiScopesMessage` (`Api` is the wire/proto term — TS surface should drop it) | `model.ts:98, 497, 928` |
| 13 | Medium | Plural type singular field | `AibiDashboardEmbeddingApprovedDomains` (plural type, singular `approvedDomains` field) | `model.ts:94-96` |
| 14 | Medium | Redundant `Public` qualifier | `GetPublicAccountSettingRequest`, `PatchPublicAccountSettingRequest`, `GetPublicWorkspaceSettingRequest`, `PatchPublicWorkspaceSettingRequest`, `GetPublicAccountUserPreferenceRequest`, `PatchPublicAccountUserPreferenceRequest`, and corresponding methods | `model.ts:156, 161, 170, 270, 277, 286`; `client.ts:83, 112, 137, 346, 378, 409` |
| 15 | Medium | Redundant `Public` qualifier | method names `getPublicAccountSetting`, `patchPublicAccountSetting`, `getPublicWorkspaceSetting`, `patchPublicWorkspaceSetting`, `getPublicAccountUserPreference`, `patchPublicAccountUserPreference` | `client.ts:83, 112, 137, 346, 378, 409` |
| 16 | Medium | Inconsistent action verbs | `patch` for mutation (vs `update` in `accountsettings`/`workspacesettings` for the same operation) | `client.ts:346, 378, 409` |
| 17 | Medium | Inconsistent action verbs | `patchPublicAccountUserPreference` for setting a preference (vs noun "set" or "put") | `client.ts:378` |
| 18 | Medium | Long type name | `ListAccountUserPreferencesMetadataResponse` (42 chars) | `model.ts:229` |
| 19 | Medium | Long type name | `ListAccountUserPreferencesMetadataRequest` (41 chars) | `model.ts:208` |
| 20 | Medium | Long type name | `PatchPublicAccountUserPreferenceRequest` (39 chars) | `model.ts:277` |
| 21 | Medium | Verb-tense inconsistency | `PreviewPhase` vs `GA_SOON` (mixed adverb/timeline forms) | `model.ts:11-27` |
| 22 | Medium | Acronym casing | `Aibi` should be `AIBI` or `AiBi` per TS rules | `model.ts:30` |
| 23 | Medium | Acronym casing | `Gov` (short for "Government") undocumented short | `model.ts:302` |
| 24 | Medium | Proto-architectural leak (request type `Public` infix maps 1:1 to a proto `PublicSettingsService`) | `GetPublicAccountSettingRequest`, `GetPublicAccountUserPreferenceRequest`, `GetPublicWorkspaceSettingRequest`, `PatchPublicAccountSettingRequest`, `PatchPublicAccountUserPreferenceRequest`, `PatchPublicWorkspaceSettingRequest` (reiterates #14 as a proto-leak category) | `model.ts:156, 161, 170, 270, 277, 286` |
| 25 | Low | Long enum value | `RESTRICT_TOKENS_AND_JOB_RUN_AS` | `model.ts:85` |
| 26 | Low | Long enum value | `FIRST_AND_THIRD_OF_MONTH` | `model.ts:56` |
| 27 | Low | Long enum value | `SECOND_AND_FOURTH_OF_MONTH` | `model.ts:57` |
| 28 | Low | Acronym casing | `Id` vs `ID` (TS chooses `Id`, package consistent) | `model.ts:157, 165, ...` |
| 29 | Low | Acronym casing | `Ws` (in JSDoc, not identifier) | `model.ts:78, 83` |
| 30 | Low | Wire-vs-TS abbreviation | `restrict_tokens_and_job_run_as` enum value | `model.ts:85` |
| 31 | Low | Misleading singular | `IntegerMessage.value` is `number` (TS has no integer/float distinction; "Integer" misleads) | `model.ts:176` |
| 32 | Low | Inconsistent verb | "patch" (HTTP idiom) vs "update" (SDK idiom in sibling packages) | `client.ts:346, 378, 409` |
| 33 | Low | Acronym casing | `Dbfs` doc — appears in workspacesettings as `Dbfs` (cross-package) | `workspacesettings/model.ts`; `settings` doesn't have it but consumers will collide |
| 34 | Low | Misleading | `PreviewPhase` enum lists `BETA` as separate from `PUBLIC_PREVIEW` even though common usage merges them | `model.ts:21-25` |

---

## Critical findings

### 1. `settings` — vague package name

- **File:line:** package level
- **Category:** Vague/generic — extreme risk
- **Suggestion:** `settingsv2` (or `unified-settings`, or `settingskv`). A user-facing package name of literally `"settings"` collides with most "settings" concepts in any application.
- **Rationale:** The wire path is `/api/2.1/settings/{name}` and `/api/2.1/accounts/{accountId}/settings/{name}`. The Go SDK uses `settingsv2`. The TS package elides the `v2` suffix from the package name (it only appears in the subpath import `@databricks/sdk-settings/v2`), which gives the impression of a generic catch-all when in fact this is the new key/value flavor that supersedes `accountsettings`/`workspacesettings` per-feature endpoints.

### 2. Four-package overlap: `settings` vs `accountsettings` vs `workspacesettings` vs `workspaceconf`

- **File:line:** repo-wide
- **Category:** Duplicate concept
- **Suggestion:** Either (a) merge into one `@databricks/sdk-settings` package with sub-paths `/v1` (legacy per-feature) and `/v2` (unified KV), or (b) rename to make the distinction explicit: `legacy-account-settings`, `legacy-workspace-settings`, `unified-settings`, `legacy-workspace-conf`. Today, a user wanting to read/write the `automatic_cluster_update_workspace` setting must guess which package: `workspacesettings/v1` (specific endpoint), `settings/v2` (generic endpoint), or `workspaceconf/v1` (free-form). The packages give no signal of preference.
- **Rationale:** A naming audit cannot fix the underlying API design but must surface it. The collision is the dominant naming issue in this package.

### 3. Duplicated TS identifiers across packages: `*Message` family

- **File:line:** `model.ts` (this) vs `workspacesettings/v1/model.ts`
- **Category:** Duplicate concept — same TS identifier defined twice
- **Identifiers:** `RestrictWorkspaceAdminsMessage`, `ClusterAutoRestartMessage`, `AibiDashboardEmbeddingAccessPolicy`, `AibiDashboardEmbeddingApprovedDomains`, `BooleanMessage`, `StringMessage`, `IntegerMessage`, `PersonalComputeMessage`.
- **Suggestion:** Hoist these into a shared `@databricks/sdk-settings-shared` package (or just `@databricks/sdk-common` if the messages stabilize). A consumer who imports `{ClusterAutoRestartMessage}` from both `settings` and `workspacesettings` gets two structurally-identical-but-nominally-distinct types and any function expecting one rejects the other.
- **Rationale:** Verified by grepping both packages — the type declarations are byte-for-byte the same. The Go SDK upstream uses the same proto definition for both, so the duplication is faithful to the source, but in TypeScript it manifests as a real collision.

---

## High severity

### 4. `Setting` — extreme generic risk

- **File:line:** `model.ts:305-422`
- **Category:** Vague/generic, reserved-word risk
- **Suggestion:** `UnifiedSetting`, `SettingValue`, or `KeyedSetting`. The Setting concept here is "a name plus a polymorphic value plus a polymorphic effective value" — none of those properties match the bare word "Setting" without context.
- **Rationale:** `Setting` is one of the most overloaded single words in software (UI settings, settings menu, settings file, configuration setting, etc.). Inside a "settings" package, the type `Setting` reads like "the thing this package is about" — but the package has three other top-level types (`UserPreference`, `SettingsMetadata`, and the wrapper messages). The bare name encourages a `import {Setting}` that competes with React UI `Setting` types, Node `process.config` settings, etc.

### 5. `SettingsMetadata` — plural type, singular use

- **File:line:** `model.ts:424-440`
- **Category:** Vague + singular/plural mismatch
- **Suggestion:** `SettingMetadata` (singular). The type describes metadata about *one* setting; lists are `SettingMetadata[]`. The current `SettingsMetadata` reads as "all metadata about all settings" which is what the *array* of these things represents — not the element.
- **Rationale:** The field `settingsMetadata?: SettingsMetadata[]` (`model.ts:200`) doubles the plural — "settings metadatas" — and an item from the array `settingsMetadata[0]` then has the type `SettingsMetadata` even though it's one row. Standard practice is singular type, plural field/array (e.g. `User`, `users: User[]`).

### 6. `UserPreference` — vague + collides with `Setting`

- **File:line:** `model.ts:452-475`
- **Category:** Vague/generic
- **Suggestion:** Either fold into `Setting` (since the structure differs only in which `$case` payloads are allowed) or rename to `UserSetting` for parallelism with the package theme. The doc comment at `model.ts:447-451` already says "user-specific setting scoped to an individual user" — the word "preference" then competes with "setting" for the same concept.
- **Rationale:** Three top-level structural types — `Setting`, `UserPreference`, `SettingsMetadata` — that all model "name + value(s)" with slightly different shapes. A user reading just type names cannot predict which to use.

### 7. `*Message` suffix — Go/proto-style

- **File:line:** `model.ts:102, 106, 175, 292, 296, 442`
- **Category:** Suffix tautology / Go-style
- **Identifiers:** `BooleanMessage`, `ClusterAutoRestartMessage`, `IntegerMessage`, `PersonalComputeMessage`, `RestrictWorkspaceAdminsMessage`, `StringMessage`, and the workspacesettings duplicates.
- **Suggestion:** Drop `Message`. Rename `ClusterAutoRestartMessage → ClusterAutoRestart`, `RestrictWorkspaceAdminsMessage → RestrictWorkspaceAdmins`, etc. The "Message" suffix is the protobuf convention for "everything is a Message"; in TS where "everything is an interface", the suffix is noise.
- **Rationale:** No other TS-idiomatic SDK uses `*Message` as a suffix. The classes are not messages in any TS-visible sense (they don't extend a `Message` base, they have no serialization methods — the marshal/unmarshal functions are external).

### 8. `Aibi` — undefined cryptic abbreviation (AI/BI)

- **File:line:** `model.ts:30, 88, 94, 335-337, 392` and method-name appearances in `client.ts`
- **Category:** Cryptic abbreviation, acronym casing
- **Suggestion:** `AIBI` (acronym casing) or spell out `AiBi` for the AI/BI Genie embedding feature. Add a top-of-file `@module` doc explaining: "AI/BI = Databricks's AI- and BI-powered dashboards product."
- **Rationale:** "Aibi" is not a recognised English word and is not defined anywhere in this file. A reader has to know the Databricks product naming.

### 9–10. Verb-tense action-as-noun naming

- **File:line:** `model.ts:296 (RestrictWorkspaceAdminsMessage), 106 (ClusterAutoRestartMessage)`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Types describing *state* should be nouns: `WorkspaceAdminRestriction`, `ClusterAutoRestart` (or `ClusterAutoRestartConfig`).
- **Rationale:** Standard naming: imperative verbs for actions/methods; nouns for state types.

### 11. Proto-nested underscore type naming — proto-architectural leak

- **File:line:** `model.ts:30, 38, 50, 66, 73, 123, 133, 140, 151` (and the corresponding marshal/unmarshal schema declarations)
- **Category:** Proto-architectural leak (nested-message naming)
- **Why:** Every nested type carries an `eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested ... name.` comment — an explicit admission that the TS surface is wearing proto-generated shape. Examples:
  - `AibiDashboardEmbeddingAccessPolicy_AccessPolicyType`
  - `ClusterAutoRestartMessage_MaintenanceWindow`
  - `ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek`
  - `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency`
  - `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule`
  - `ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime`
  - `ClusterAutoRestartMessage_EnablementDetails`
  - `PersonalComputeMessage_PersonalComputeMessageEnum`
  - `RestrictWorkspaceAdminsMessage_Status`
- **Suggestion:** Promote nested message/enum types to top-level TS interfaces with descriptive names: `AccessPolicyType`, `MaintenanceWindow`, `DayOfWeek`, `WeekDayFrequency`, `MaintenanceSchedule`, `WindowStartTime`, `EnablementDetails`, `PersonalComputeMode`, `WorkspaceAdminRestrictionStatus`. Where two top-level names would collide across packages, prefix with the owning concept (e.g., `MaintenanceWindowDayOfWeek`) but never use `_`.
- **Rationale:** Underscore-separated multi-word TS identifiers are non-idiomatic (Google TS style mandates `PascalCase` for types; Microsoft TS handbook agrees). The `*Foo_Bar_Baz` chain is purely a transliteration of proto's nested-message scoping — TS has module namespaces (`Foo.Bar.Baz`) and lexical scoping for that, neither of which is used here. The eslint-disable comments are the smoking gun.

### 12. `AllowedAppsUserApiScopesMessage` — `Api` mid-position proto leak

- **File:line:** `model.ts:98, 497 (unmarshal), 928 (marshal)`
- **Category:** Proto-architectural leak (`Api` mid-position) + `*Message` suffix (covered in #7)
- **Why:** `Api` appears mid-name in a domain type that models *what user-OAuth scopes apps may be granted*. The "Api" half describes the **wire/proto** medium ("user-API scopes") rather than the domain concept (OAuth scopes).
- **Suggestion:** `AllowedAppsUserScopes` (drop `Api`, drop `Message`). The discriminator value `allowedAppsUserApiScopes` and wire key `allowed_apps_user_api_scopes` would remain wire-side; the TS surface should not carry the proto-medium descriptor.
- **Rationale:** The combined `Api` + `Message` pair carries two architectural-leak tokens in a single identifier (60 chars including `Schema` in the marshal/unmarshal forms). `Api` mid-position falls squarely in the prompt's flag list.

---

## Medium severity

### 13. `AibiDashboardEmbeddingApprovedDomains` — plural type, singular use

- **File:line:** `model.ts:94-96`
- **Category:** Singular/plural mismatch
- **Suggestion:** Either keep plural type with plural field (current state — `approvedDomains: string[]`) or move to singular type representing one approved domain and let consumers hold `ApprovedDomain[]`. Current naming is internally consistent but the *type* is plural which is unusual.

### 14. `*Public*` qualifier — redundant

- **File:line:** `model.ts:156, 161, 170, 270, 277, 286`
- **Category:** Redundant qualifier
- **Suggestion:** Drop `Public` from request type names (and method names — #15). `GetAccountSettingRequest`/`getAccountSetting` is shorter and equally specific.
- **Rationale:** If everything is "public" (vs internal), the qualifier carries no information. The Go SDK upstream uses the same word probably because the proto service is named `PublicSettingsService` to disambiguate from internal admin services — but the JS SDK only ships the public surface, so the qualifier is redundant.

### 15. Method names: `getPublic*`, `patchPublic*` — redundant `Public`

- **File:line:** `client.ts:83, 112, 137, 346, 378, 409`
- **Category:** Redundant qualifier + verbose
- **Suggestion:** `getAccountSetting`, `patchAccountSetting`, etc.

### 16. `patch*` vs `update*` — inconsistent action verb across SDK

- **File:line:** `client.ts:346, 378, 409` (use `patch`)
- **Category:** Inconsistent action verbs
- **Suggestion:** Pick one verb. `update` is the verb in `accountsettings/v1/client.ts` and `workspacesettings/v1/client.ts` for the equivalent operation; `patch` is used here. Cross-package consistency matters.
- **Rationale:** Same operation (PATCH HTTP verb against a settings endpoint) named `update*` in the v1 packages and `patch*` in this v2 package. Users will look for `update*` first based on muscle memory.

### 17. `patchPublicAccountUserPreference` (single user-pref item) — overly verbose action

- **File:line:** `client.ts:378`
- **Category:** Inconsistent + verbose
- **Suggestion:** `setAccountUserPreference` or `putAccountUserPreference`.
- **Rationale:** For setting a single preference, `set*` is the conventional SDK verb. `patch*` implies partial-update; this endpoint replaces the whole preference.

### 18–20. Long type names

- **File:line:** `model.ts:229, 208, 277`
- **Category:** Overly verbose
- **Identifiers:**
  - `ListAccountUserPreferencesMetadataResponse` (42 chars)
  - `ListAccountUserPreferencesMetadataRequest` (41 chars)
  - `PatchPublicAccountUserPreferenceRequest` (39 chars)
- **Suggestion:** After applying the suggested simplifications (drop `Public`, drop `Message`), names shorten naturally: `ListUserPreferencesMetadataResponse`, etc.

### 21. `PreviewPhase` enum — mixed temporal/qualitative members

- **File:line:** `model.ts:11-27`
- **Category:** Verb-tense / categorisation inconsistency
- **Members:** `PRIVATE_PREVIEW`, `PUBLIC_PREVIEW`, `BETA`, `GA_SOON`, `GA`
- **Suggestion:** Standardise. The current set has `*_PREVIEW` (qualifier-style) alongside `BETA` (single word), `GA_SOON` (temporal hedge), and `GA` (acronym). `PUBLIC_PREVIEW` vs `BETA` are essentially the same launch phase in many product lifecycles — picking one would tighten the model.
- **Rationale:** Tension visible even in the JSDoc: "The feature is in public preview, available to all customers. Also used for gated public preview (available to customers who request access) since the distinction is internal." So `PUBLIC_PREVIEW` already covers two cases. Adding `BETA` on top is a third overlapping concept.

### 22–23. Acronym casing: `Aibi` vs `AIBI`; `Gov` vs `Governance`

- **File:line:** `model.ts:30, 88, 94, 302`
- **Category:** Acronym casing
- **Suggestion:** Google TS style says 2-3 letter acronyms can be TitleCase (`Aibi` ok) but longer acronyms or non-acronyms (like `Gov` for `Governance`) should be spelt out.

### 24. `*Public*` qualifier as proto-architectural leak (reframe of #14)

- **File:line:** `model.ts:156, 161, 170, 270, 277, 286`; `client.ts:83, 112, 137, 346, 378, 409`
- **Category:** Proto-architectural leak (`Public` mid-position)
- **Why:** `Public` in `GetPublic*Request`, `PatchPublic*Request`, and method names `getPublic*`/`patchPublic*` is a direct echo of the proto service-name `PublicSettingsService` — i.e., the *server-side* internal-vs-public service split. The TS SDK only ships the public surface, so the qualifier signals nothing the user can act on.
- **Suggestion:** Drop `Public` from every request type and every method name. `GetAccountSettingRequest`/`getAccountSetting`, `PatchAccountSettingRequest`/`patchAccountSetting`, etc.
- **Rationale:** This duplicates #14 and #15 but reframes them as a *proto-architectural leak* per the scan brief. `Public`/`Internal` are explicitly on the flag list. The two earlier findings catalogued the names; this one names the cause.

---

## Low severity

### 25–27. Long enum values

- **File:line:** `model.ts:85, 56, 57`
- **Category:** Long enum value
- **Identifiers:** `RESTRICT_TOKENS_AND_JOB_RUN_AS` (28c), `FIRST_AND_THIRD_OF_MONTH` (24c), `SECOND_AND_FOURTH_OF_MONTH` (26c)
- **Suggestion:** For `RESTRICT_TOKENS_AND_JOB_RUN_AS`, the wire string is fixed (`'RESTRICT_TOKENS_AND_JOB_RUN_AS'`), so the TS-side rename would only affect the enum-key access.

### 28–29. Acronym casing notes

- **File:line:** `model.ts:157, 78`
- **Category:** Acronym casing
- **Notes:** `Id` (consistent), `Ws` (only in JSDoc, not identifiers — safe).

### 30. `restrict_tokens_and_job_run_as` enum string value

- **File:line:** `model.ts:85`
- **Category:** Wire value
- **Suggestion:** N/A — wire-fixed.

### 31. `IntegerMessage` misleading in JS

- **File:line:** `model.ts:175-177`
- **Category:** Misleading
- **Suggestion:** The "Integer" half of the name is misleading — JS has no distinct integer type, and the `value` field is typed `number` (i.e. IEEE-754 double). A neutral name like `NumberMessage` would be honest about the runtime type.
- **Rationale:** A reader seeing `IntegerMessage` may assume validation, bigint, or some integer-preserving codec. None is present.

### 32. `patch*` vs `update*`

- See #16.

### 33. Cross-package `Dbfs` casing

- **File:line:** `workspacesettings/v1/model.ts` (consumer-collision risk noted; not present in this package directly)
- **Category:** Cross-package acronym casing
- **Suggestion:** Note for the cross-package audit, not actionable here.

### 34. `BETA` member adjacent to `PUBLIC_PREVIEW`

- See #21.

---

## Observations

1. **`settings` v2 is the latest in a sprawl of overlapping packages.** The same user functionality (e.g. configure cluster auto-restart, restrict workspace admins) is reachable via at least three packages with three different shapes:
   - `workspacesettings/v1`: per-feature endpoints, typed payloads (`AutomaticClusterUpdateSetting.automaticClusterUpdateWorkspace: ClusterAutoRestartMessage`).
   - `settings/v2`: unified `Setting` with polymorphic `value` field (`Setting.value.$case === 'automaticClusterUpdateWorkspace'`).
   - `workspaceconf/v1`: untyped `{key: string, value: string}` map.
   The package naming gives the user zero guidance on which to use. A user-facing index / migration guide is critical.

2. **`Setting`, `SettingsMetadata`, `UserPreference` are all underspecific.** The package theme is "settings v2", but the central types use the bare word "Setting" without qualification. This is the single biggest naming risk in the package — a user importing `Setting` from `@databricks/sdk-settings/v2` will clash with any application-level `Setting` type in seconds.

3. **Cross-package duplication of `*Message` types is a real type-system hazard.** `RestrictWorkspaceAdminsMessage` declared in both `settings/v2/model.ts` and `workspacesettings/v1/model.ts` is the most concrete example. A function in user code typed as `(m: RestrictWorkspaceAdminsMessage) => void` will accept one import but not the other — and the TS error message will say "Type 'RestrictWorkspaceAdminsMessage' is not assignable to type 'RestrictWorkspaceAdminsMessage'" with no further hint. Hoisting these to a shared module is the highest-ROI fix.

4. **`patch` vs `update` cross-package inconsistency.** The v1 SDKs use `update*`; the v2 SDK uses `patch*`. Same wire verb (PATCH HTTP). The verb mismatch will trip muscle-memory across the surface.

5. **`Aibi`, `Gov`, `Dbfs`, `Csp`, `Esm`, `Dcp`, `Llm`, `Sql` etc.** form an acronym soup across all four packages. None of them are defined in any one place. A glossary at the repo level (or per package) would be high-ROI and zero-risk.

6. **`patchPublic*` is six syllables and four word-roots for a single PATCH call.** `patch` + `Public` + (`Account` | `Workspace`) + (`Setting` | `UserPreference`) + `Request` accumulates fast. After dropping `Public` and `Request`, names like `patchAccountSetting` would be drastically more usable.

---

## Domain glossary

| Acronym / token | Expansion | Mentioned in code? |
|-----------------|-----------|--------------------|
| **Aibi / AIBI** | AI/BI (Databricks's AI- and BI-powered Genie dashboards) | No (only as part of type names) |
| **Gov** | Governance (in `disableGovTagCreation`) | Inferred from field doc |
| **OBO** | On-behalf-of (in `RESTRICT_TOKENS_AND_JOB_RUN_AS` doc) | Yes (one-time, undefined) |
| **WS** | Workspace (in same doc) | Inferred |
| **SP / SPs** | Service Principal(s) (in same doc) | Inferred |
| **GA / GA_SOON** | Generally Available | Implicit via doc |
| **DCP / Dcp** | Default Personal Compute policy (only in `accountsettings`, not here) | N/A |
| **CSP** | Compliance Security Profile (cross-package) | N/A here |
| **ESM** | Enhanced Security Monitoring (cross-package) | N/A here |
| **DBFS** | Databricks File System (cross-package) | N/A here |
| **LLM** | Large Language Model (cross-package) | N/A here |
| **Id** | Identifier | Implicit |
| **etag** | Entity tag (HTTP cache validator, RFC 7232) | Not in this package |

---

## File coverage

| File | Lines read | Coverage |
|------|-----------|----------|
| `src/v2/index.ts` | 44 (full) | 100% — exports inventory only, no naming surprises beyond the type names already audited from `model.ts`. |
| `src/v2/model.ts` | 1300 (full) | 100% — 6 enums, 23 interfaces (incl. all nested message types), 15 unmarshal-zod schemas, 15 marshal-zod schemas audited. |
| `src/v2/client.ts` | 433 (full) | 100% — `Client` constructor and 9 client methods audited (paginated page-returning and iterator-returning variants both reviewed). |

---
