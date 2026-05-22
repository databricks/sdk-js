# Naming Audit: settings

**Path:** `/home/parth.bansal/sdk-js/packages/settings/`
**Versions audited:** v2
**Inferred domain:** A "unified" generic settings/user-preference key/value API (referred to as `settingsv2` in the wire/JSDoc) that exposes a single `Setting` polymorphic value type with seven typed payload variants. Operates at three scopes — account-level settings, account-level user preferences, and workspace-level settings — replacing the per-feature `get*`/`update*`/`delete*` endpoints that live in `accountsettings` (v1) and `workspacesettings` (v1).
**Total weird names flagged:** 84

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
| 9 | High | Cryptic abbreviation (undefined) | `Gov` in `disableGovTagCreation` | `model.ts:302` |
| 10 | High | Generic field name | `value` (on `BooleanMessage`, `IntegerMessage`, `StringMessage`, `PersonalComputeMessage`) | `model.ts:103, 176, 293, 444` |
| 11 | High | Generic field name | `name` (across `Setting`, `SettingsMetadata`, `UserPreference`, `GetPublicAccountSettingRequest`, ...) | `model.ts:158, 167, 172, 273, 282, 288, 307, 426, 454` |
| 12 | High | Generic field name | `type?: string` on `SettingsMetadata` | `model.ts:430` |
| 13 | High | Generic field name | `setting?: Setting` on update requests | `model.ts:274, 283, 289` |
| 14 | High | Generic field name | `setting?: UserPreference` (note: type is UserPreference, field name is `setting`) | `model.ts:283` |
| 15 | High | Generic discriminator value | `booleanVal`, `stringVal`, `integerVal` | `model.ts:315, 320, 325, 372, 377, 382, 463-464` |
| 16 | High | Generic discriminator value | `effectiveBooleanVal`, `effectiveStringVal`, `effectiveIntegerVal` | `model.ts:372, 377, 382, 472, 473` |
| 17 | High | Underspecified ID | `accountId` (no format documented on most uses) | `model.ts:157, 162, 181, 209, 272, 279` |
| 18 | High | Underspecified ID | `userId` | `model.ts:165, 211, 281, 456` |
| 19 | High | Misleading type name | `UserPreference` field named `setting` (on PatchPublicAccountUserPreferenceRequest) | `model.ts:283` |
| 20 | High | Misleading | `effectiveValue` vs `value` distinction undocumented at top-level | `model.ts:311, 313, 369, 370` |
| 21 | High | Verb-tense (action-name as type) | `RestrictWorkspaceAdminsMessage` (verb-noun as state type) | `model.ts:296` |
| 22 | High | Verb-tense | `ClusterAutoRestartMessage` (verb-phrase as state type) | `model.ts:106` |
| 23 | High | Verb-tense | `disableGovTagCreation` (imperative verb as state field) | `model.ts:302` |
| 24 | Medium | Plural type singular field | `AibiDashboardEmbeddingApprovedDomains` (plural type, singular `approvedDomains` field) | `model.ts:94-96` |
| 25 | Medium | Redundant `Public` qualifier | `GetPublicAccountSettingRequest`, `PatchPublicAccountSettingRequest`, `GetPublicWorkspaceSettingRequest`, `PatchPublicWorkspaceSettingRequest`, `GetPublicAccountUserPreferenceRequest`, `PatchPublicAccountUserPreferenceRequest`, and corresponding methods | `model.ts:156, 161, 170, 270, 277, 286`; `client.ts:83, 112, 137, 346, 378, 409` |
| 26 | Medium | Redundant `Public` qualifier | method names `getPublicAccountSetting`, `patchPublicAccountSetting`, `getPublicWorkspaceSetting`, `patchPublicWorkspaceSetting`, `getPublicAccountUserPreference`, `patchPublicAccountUserPreference` | `client.ts:83, 112, 137, 346, 378, 409` |
| 27 | Medium | Inconsistent action verbs | `patch` for mutation (vs `update` in `accountsettings`/`workspacesettings` for the same operation) | `client.ts:346, 378, 409` |
| 28 | Medium | Inconsistent action verbs | `patchPublicAccountUserPreference` for setting a preference (vs noun "set" or "put") | `client.ts:378` |
| 29 | Medium | Long type name | `ListAccountUserPreferencesMetadataResponse` (42 chars) | `model.ts:229` |
| 30 | Medium | Long type name | `ListAccountUserPreferencesMetadataRequest` (41 chars) | `model.ts:208` |
| 31 | Medium | Long type name | `PatchPublicAccountUserPreferenceRequest` (39 chars) | `model.ts:277` |
| 32 | Medium | Singular/plural mismatch | `listAccountSettingsMetadata` returns `settingsMetadata?: SettingsMetadata[]` — pluralisation collides with the singular type | `model.ts:198, 200`; `client.ts:166` |
| 33 | Medium | Singular/plural mismatch | `listAccountUserPreferencesMetadata` returns `settingsMetadata?: SettingsMetadata[]` (not `userPreferencesMetadata`) | `model.ts:229-231`; `client.ts:226` |
| 34 | Medium | Singular/plural mismatch | `listWorkspaceSettingsMetadata` field reuses `settingsMetadata` | `model.ts:256-258` |
| 35 | Medium | Verb-tense inconsistency | `PreviewPhase` vs `GA_SOON` (mixed adverb/timeline forms) | `model.ts:11-27` |
| 36 | Medium | Acronym casing | `Aibi` should be `AIBI` or `AiBi` per TS rules | `model.ts:30` |
| 37 | Medium | Acronym casing | `Gov` (short for "Government") undocumented short | `model.ts:302` |
| 38 | Medium | Field contradicting type domain | `automaticClusterUpdateWorkspace` discriminator on `Setting` (a workspace-only feature on a unified type) | `model.ts:330` |
| 39 | Medium | Field contradicting type domain | `restrictWorkspaceAdmins` discriminator on `Setting` used by both workspace and account endpoints | `model.ts:345` |
| 40 | Medium | Generic field name | `canToggle?: boolean` on `ClusterAutoRestartMessage` (toggle what?) | `model.ts:108` |
| 41 | Medium | Generic field name | `hours?: number`, `minutes?: number` on `WindowStartTime` (no timezone documented) | `model.ts:152-153` |
| 42 | Medium | Overly verbose discriminator | `effectiveAutomaticClusterUpdateWorkspace` | `model.ts:387` |
| 43 | Medium | Overly verbose discriminator | `effectiveAibiDashboardEmbeddingApprovedDomains` | `model.ts:392` |
| 44 | Medium | Overly verbose discriminator | `effectiveAibiDashboardEmbeddingAccessPolicy` | `model.ts:397` |
| 45 | Medium | Overly verbose discriminator | `effectiveRestrictWorkspaceAdmins` | `model.ts:402` |
| 46 | Medium | Overly verbose discriminator | `effectivePersonalCompute` | `model.ts:407` |
| 47 | Medium | Generic name | `displayName` on `SettingsMetadata` (vs `name`) | `model.ts:439` |
| 48 | Medium | Cryptic abbreviation | `docsLink` (vs `documentationUrl`) | `model.ts:432` |
| 49 | Medium | Misleading field | `name` on `SettingsMetadata` (means "key", not "human-readable name" — which is `displayName`) | `model.ts:426` |
| 50 | Medium | Acronym casing | `Url` vs `URL` (Google TS style allows either, package uses neither — it uses `Link` and `url`) | `model.ts:432`; `utils.ts:70, 98, 103` |
| 51 | Medium | Field name verb-as-noun | `restartEvenIfNoUpdatesAvailable?: boolean` (whole sentence as field name) | `model.ts:111` |
| 52 | Low | Long enum value | `RESTRICT_TOKENS_AND_JOB_RUN_AS` | `model.ts:85` |
| 53 | Low | Long enum value | `FIRST_AND_THIRD_OF_MONTH` | `model.ts:56` |
| 54 | Low | Long enum value | `SECOND_AND_FOURTH_OF_MONTH` | `model.ts:57` |
| 55 | Low | Cryptic abbreviation | `OBO` (in `RESTRICT_TOKENS_AND_JOB_RUN_AS` doc) | `model.ts:78` |
| 56 | Low | Cryptic abbreviation | `WS` (in same doc) | `model.ts:78` |
| 57 | Low | Cryptic abbreviation | `SP`/`SPs` ("service principal") in same doc | `model.ts:78, 83` |
| 58 | Low | Cryptic abbreviation | `OBO` undocumented | `model.ts:78` |
| 59 | Low | Reserved-word adjacency | `value` (used as discriminated union field) | `model.ts:103, 176, 293, 313, 444, 462` |
| 60 | Low | Reserved-word adjacency | `type` (used as plain field on `SettingsMetadata`) | `model.ts:430` |
| 61 | Low | Reserved-word adjacency | `name` (used everywhere, common JS builtin name) | `model.ts:158, 167, 172, 273, 282, 288, 307, 426, 454` |
| 62 | Low | Acronym casing | `Id` vs `ID` (TS chooses `Id`, package consistent) | `model.ts:157, 165, ...` |
| 63 | Low | Acronym casing | `Ws` (in JSDoc, not identifier) | `model.ts:78, 83` |
| 64 | Low | Misleading | "Setting" doc on `UserPreference.setting` field (it's actually a UserPreference, not a Setting) | `model.ts:283` |
| 65 | Low | Wire-vs-TS abbreviation | `disable_gov_tag_creation` wire key | `model.ts:670, 1059` |
| 66 | Low | Wire-vs-TS abbreviation | `restrict_tokens_and_job_run_as` enum value | `model.ts:85` |
| 67 | Low | Misleading singular | `IntegerMessage.value` is `number` (TS has no integer/float distinction; "Integer" misleads) | `model.ts:176` |
| 68 | Low | Singular-list mismatch | the `Setting.value` field name collides with `BooleanMessage.value` etc. (nested `value.value`) | `model.ts:313, 103` |
| 69 | Low | Long discriminator string | `aibiDashboardEmbeddingApprovedDomains` (string literal used at runtime by consumers) | `model.ts:335-337` |
| 70 | Low | Long discriminator string | `effectiveAibiDashboardEmbeddingApprovedDomains` (45 chars) | `model.ts:392` |
| 71 | Low | Vague | `enabled?: boolean` (enabled what? on `ClusterAutoRestartMessage`) | `model.ts:107` |
| 72 | Low | Vague | `frequency?` on `WeekDayBasedSchedule` (frequency-of-what?) | `model.ts:141` |
| 73 | Low | Vague | `status?` on `RestrictWorkspaceAdminsMessage` (status-of-what?) | `model.ts:297` |
| 74 | Low | Inconsistent verb | "patch" (HTTP idiom) vs "update" (SDK idiom in sibling packages) | `client.ts:346, 378, 409` |
| 75 | Low | Misleading | doc on `userId` on `GetPublicAccountUserPreferenceRequest` says "user whose setting is being retrieved" (says "setting" not "preference") | `model.ts:164-165` |
| 76 | Low | Cryptic field | `unavailableForNonEnterpriseTier` (double negative — "unavailable" + "non-") | `model.ts:125` |
| 77 | Low | Cryptic field | `unavailableForDisabledEntitlement` (same double negative) | `model.ts:127` |
| 78 | Low | Misleading verb | `forcedForComplianceMode` (passive verb as boolean state name; should be `forceEnabledInComplianceMode` or `complianceModeForcesEnabled`) | `model.ts:129` |
| 79 | Low | Acronym casing | `Dbfs` doc — appears in workspacesettings as `Dbfs` (cross-package) | `workspacesettings/model.ts`; `settings` doesn't have it but consumers will collide |
| 80 | Low | Generic name | `host` (on `Client` private field) | `client.ts:54` |
| 81 | Low | Misleading | `PreviewPhase` enum lists `BETA` as separate from `PUBLIC_PREVIEW` even though common usage merges them | `model.ts:21-25` |
| 82 | High | Proto-architectural leak (nested-type underscore syntax) | `AibiDashboardEmbeddingAccessPolicy_AccessPolicyType`, `ClusterAutoRestartMessage_MaintenanceWindow`, `ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek`, `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency`, `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule`, `ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime`, `ClusterAutoRestartMessage_EnablementDetails`, `PersonalComputeMessage_PersonalComputeMessageEnum`, `RestrictWorkspaceAdminsMessage_Status` | `model.ts:30, 38, 50, 66, 73, 123, 133, 140, 151` |
| 83 | High | Proto-architectural leak (`Api` mid-position) | `AllowedAppsUserApiScopesMessage` (`Api` is the wire/proto term — TS surface should drop it) | `model.ts:98, 497, 928` |
| 84 | Medium | Proto-architectural leak (request type `Public` infix maps 1:1 to a proto `PublicSettingsService`) | `GetPublicAccountSettingRequest`, `GetPublicAccountUserPreferenceRequest`, `GetPublicWorkspaceSettingRequest`, `PatchPublicAccountSettingRequest`, `PatchPublicAccountUserPreferenceRequest`, `PatchPublicWorkspaceSettingRequest` (reiterates #25 as a proto-leak category) | `model.ts:156, 161, 170, 270, 277, 286` |

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

### 9. `Gov` in `disableGovTagCreation` — undocumented abbreviation

- **File:line:** `model.ts:302`
- **Category:** Cryptic abbreviation
- **Suggestion:** `disableGovernanceTagCreation`. The full word adds five characters and removes ambiguity (`Gov` could be government, governance, governor, ...).
- **Rationale:** The doc says "workspace admins cannot create governance tags" — so "Gov" abbreviates "Governance". The wire key is `disable_gov_tag_creation` (`model.ts:670`), but the TS surface can be more verbose.

### 10. `value` field everywhere — generic field name

- **File:line:** `model.ts:103, 176, 293, 444` on the message wrappers; `model.ts:313, 462` on the discriminated unions; nested deep inside (`Setting.value.booleanVal.value`).
- **Category:** Generic field name + reserved-word adjacency
- **Suggestion:** For the discriminated unions (`Setting.value`), `payload` would be slightly clearer.
- **Rationale:** `setting.value.booleanVal.value` is four levels of `.value`/`.someVal` indirection to access one boolean. The naming makes auto-complete useless. `value` is a member of many JS built-ins (Map entries, Symbol.iterator results, DOM events, IndexedDB cursors), so it has soft reserved-word risk.

### 11. `name` everywhere — generic field name

- **File:line:** `model.ts:158, 167, 172, 273, 282, 288, 307, 426, 454`
- **Category:** Generic field name
- **Suggestion:** `settingKey` or `settingName` would convey purpose. The current `name` is so generic the JSDoc has to repeat "Name of the setting" everywhere.
- **Rationale:** The field is in fact the *key* — the unique identifier used in the URL path (`/settings/${req.name ?? ''}`) — not a human display name. The actual display name is `displayName` on `SettingsMetadata`. Naming the key "name" and the human name "displayName" inverts intuition (typically "name" is the display name and "id"/"key" is the identifier).

### 12. `type?: string` on `SettingsMetadata` — generic + misleading

- **File:line:** `model.ts:430`
- **Category:** Generic field name, reserved-word adjacency, misleading
- **Suggestion:** `valueTypeMessage` or `sampleTypeMessage`. The JSDoc says "Sample message depicting the type of the setting. To set this setting, the value sent must match this type."
- **Rationale:** A field called `type` returning a *sample message* (not a type-id or schema URI) is misleading. Combined with the JS-builtin overlap (`typeof obj.type === 'string'`), the field name invites confusion.

### 13–14. `setting?: Setting` and `setting?: UserPreference` — generic field name + misleading

- **File:line:** `model.ts:274, 283, 289`
- **Category:** Generic field name + misleading
- **Suggestion:** Rename to match the typed payload: `setting?: Setting` is okay; `setting?: UserPreference` is wrong — should be `userPreference?: UserPreference`.
- **Rationale:** On `PatchPublicAccountUserPreferenceRequest`, the field is named `setting` but typed `UserPreference`. The whole package's distinction between "setting" and "user preference" depends on these being separate concepts — so calling the user-preference field "setting" undoes that distinction at the request level.

### 15–16. `booleanVal`, `stringVal`, `integerVal`, `effective*Val` — generic discriminator values

- **File:line:** `model.ts:315, 320, 325, 372, 377, 382, 463-464, 472-473`
- **Category:** Generic field name
- **Suggestion:** Drop the `*Val` suffix (it duplicates the parent field `value`) and name by domain: instead of `value: {$case: 'booleanVal', booleanVal: BooleanMessage}`, prefer `value: {kind: 'boolean', boolean: boolean}`.
- **Rationale:** A user writing `setting.value?.$case === 'booleanVal'` then accessing `setting.value.booleanVal.value` does three discriminations to read a single bool. The "Val" abbreviation is the only naming variation between the discriminator tag ("booleanVal") and the type name ("BooleanMessage"); the abbreviation contributes nothing.

### 17–18. `accountId`, `userId` — underspecified IDs

- **File:line:** `model.ts:157, 162, 165, 181, 209, 211, 272, 279, 281, 456`
- **Category:** Underspecified ID
- **Suggestion:** Document the ID format (UUID, opaque-string, numeric, ...) in JSDoc consistently. Currently only some occurrences have a doc ("<Databricks> account ID of the account being managed"), and the format isn't specified anywhere.
- **Rationale:** Users have no way to know whether the SDK accepts `"acct-12345"`, `"abc...uuid"`, or an integer-as-string. The Go SDK's pattern of relying on type-level documentation isn't carried over.

### 19. `setting` field on `PatchPublicAccountUserPreferenceRequest` (covered in #14)

### 20. `effectiveValue` vs `value` — undocumented distinction

- **File:line:** `model.ts:311-363 (value) vs 369-421 (effectiveValue)`
- **Category:** Misleading
- **Suggestion:** Add a JSDoc explaining the relationship at the `Setting` type level. Currently the distinction is only documented as "The user-set value that goes into storage" (311) vs "The final effective value from server as per the policy evaluation" (369) — a reader has to read both blocks to understand they're a get/set asymmetry.
- **Rationale:** This is a non-obvious feature where the user sets `value` but the server might return a different `effectiveValue` after applying policy. Worth a top-level doc, not just per-block.

### 21–23. Verb-tense action-as-noun naming

- **File:line:** `model.ts:296 (RestrictWorkspaceAdminsMessage), 106 (ClusterAutoRestartMessage), 302 (disableGovTagCreation field)`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Types describing *state* should be nouns: `WorkspaceAdminRestriction`, `ClusterAutoRestart` (or `ClusterAutoRestartConfig`), `governanceTagCreationDisabled: boolean`.
- **Rationale:** Standard naming: imperative verbs for actions/methods; nouns for state types. `disableGovTagCreation` is a verb-phrase as a field name suggesting "do the action of disabling", which is misleading for a boolean state.

### 82. Proto-nested underscore type naming — proto-architectural leak

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

### 83. `AllowedAppsUserApiScopesMessage` — `Api` mid-position proto leak

- **File:line:** `model.ts:98, 497 (unmarshal), 928 (marshal)`
- **Category:** Proto-architectural leak (`Api` mid-position) + `*Message` suffix (covered in #7)
- **Why:** `Api` appears mid-name in a domain type that models *what user-OAuth scopes apps may be granted*. The "Api" half describes the **wire/proto** medium ("user-API scopes") rather than the domain concept (OAuth scopes).
- **Suggestion:** `AllowedAppsUserScopes` (drop `Api`, drop `Message`). The discriminator value `allowedAppsUserApiScopes` and wire key `allowed_apps_user_api_scopes` would remain wire-side; the TS surface should not carry the proto-medium descriptor.
- **Rationale:** The combined `Api` + `Message` pair carries two architectural-leak tokens in a single identifier (60 chars including `Schema` in the marshal/unmarshal forms). `Api` mid-position falls squarely in the prompt's flag list.

---

## Medium severity

### 24. `AibiDashboardEmbeddingApprovedDomains` — plural type, singular use

- **File:line:** `model.ts:94-96`
- **Category:** Singular/plural mismatch
- **Suggestion:** Either keep plural type with plural field (current state — `approvedDomains: string[]`) or move to singular type representing one approved domain and let consumers hold `ApprovedDomain[]`. Current naming is internally consistent but the *type* is plural which is unusual.

### 25. `*Public*` qualifier — redundant

- **File:line:** `model.ts:156, 161, 170, 270, 277, 286`
- **Category:** Redundant qualifier
- **Suggestion:** Drop `Public` from request type names (and method names — #26). `GetAccountSettingRequest`/`getAccountSetting` is shorter and equally specific.
- **Rationale:** If everything is "public" (vs internal), the qualifier carries no information. The Go SDK upstream uses the same word probably because the proto service is named `PublicSettingsService` to disambiguate from internal admin services — but the JS SDK only ships the public surface, so the qualifier is redundant.

### 26. Method names: `getPublic*`, `patchPublic*` — redundant `Public`

- **File:line:** `client.ts:83, 112, 137, 346, 378, 409`
- **Category:** Redundant qualifier + verbose
- **Suggestion:** `getAccountSetting`, `patchAccountSetting`, etc.

### 27. `patch*` vs `update*` — inconsistent action verb across SDK

- **File:line:** `client.ts:346, 378, 409` (use `patch`)
- **Category:** Inconsistent action verbs
- **Suggestion:** Pick one verb. `update` is the verb in `accountsettings/v1/client.ts` and `workspacesettings/v1/client.ts` for the equivalent operation; `patch` is used here. Cross-package consistency matters.
- **Rationale:** Same operation (PATCH HTTP verb against a settings endpoint) named `update*` in the v1 packages and `patch*` in this v2 package. Users will look for `update*` first based on muscle memory.

### 28. `patchPublicAccountUserPreference` (single user-pref item) — overly verbose action

- **File:line:** `client.ts:378`
- **Category:** Inconsistent + verbose
- **Suggestion:** `setAccountUserPreference` or `putAccountUserPreference`.
- **Rationale:** For setting a single preference, `set*` is the conventional SDK verb. `patch*` implies partial-update; this endpoint replaces the whole preference.

### 29–31. Long type names

- **File:line:** `model.ts:229, 208, 277`
- **Category:** Overly verbose
- **Identifiers:**
  - `ListAccountUserPreferencesMetadataResponse` (42 chars)
  - `ListAccountUserPreferencesMetadataRequest` (41 chars)
  - `PatchPublicAccountUserPreferenceRequest` (39 chars)
- **Suggestion:** After applying the suggested simplifications (drop `Public`, drop `Message`), names shorten naturally: `ListUserPreferencesMetadataResponse`, etc.

### 32–34. `settingsMetadata` field name vs sibling list semantics

- **File:line:** `model.ts:198, 200, 229-231, 256-258`
- **Category:** Singular/plural mismatch + field naming
- **Suggestion:** On `ListAccountUserPreferencesMetadataResponse`, the field should be `userPreferencesMetadata`, not `settingsMetadata`. Currently the response field for "list of user preferences" is typed as `SettingsMetadata[]` and named `settingsMetadata` — which is technically the same metadata type but linguistically misleading.
- **Rationale:** A consumer reading `resp.settingsMetadata` on a `ListAccountUserPreferencesMetadataResponse` will be confused why "settings" appears on a "user preferences" response.

### 35. `PreviewPhase` enum — mixed temporal/qualitative members

- **File:line:** `model.ts:11-27`
- **Category:** Verb-tense / categorisation inconsistency
- **Members:** `PRIVATE_PREVIEW`, `PUBLIC_PREVIEW`, `BETA`, `GA_SOON`, `GA`
- **Suggestion:** Standardise. The current set has `*_PREVIEW` (qualifier-style) alongside `BETA` (single word), `GA_SOON` (temporal hedge), and `GA` (acronym). `PUBLIC_PREVIEW` vs `BETA` are essentially the same launch phase in many product lifecycles — picking one would tighten the model.
- **Rationale:** Tension visible even in the JSDoc: "The feature is in public preview, available to all customers. Also used for gated public preview (available to customers who request access) since the distinction is internal." So `PUBLIC_PREVIEW` already covers two cases. Adding `BETA` on top is a third overlapping concept.

### 36–37. Acronym casing: `Aibi` vs `AIBI`; `Gov` vs `Governance`

- **File:line:** `model.ts:30, 88, 94, 302`
- **Category:** Acronym casing
- **Suggestion:** Google TS style says 2-3 letter acronyms can be TitleCase (`Aibi` ok) but longer acronyms or non-acronyms (like `Gov` for `Governance`) should be spelt out.

### 38–39. `automaticClusterUpdateWorkspace`, `restrictWorkspaceAdmins` discriminator names mixing scope

- **File:line:** `model.ts:330 (auto-cluster on a unified Setting), 345 (restrict-admins on Setting)`
- **Category:** Field contradicting type domain
- **Suggestion:** Either drop the `Workspace` suffix from `automaticClusterUpdateWorkspace` (the parent `Setting` type is scope-agnostic) or always include the scope (then `personalCompute` should be `personalComputeAccount`).
- **Rationale:** Some payload discriminators mention scope (`automaticClusterUpdateWorkspace`), others don't (`personalCompute`, `restrictWorkspaceAdmins`). A reader can't predict the rule.

### 40. `canToggle?: boolean` on `ClusterAutoRestartMessage`

- **File:line:** `model.ts:108`
- **Category:** Generic field
- **Suggestion:** `userCanToggle: boolean` or `togglePermitted: boolean`. "Toggle what?" is unclear from the field alone (presumably toggle the `enabled` field, but that's implicit).

### 41. `hours`, `minutes` with no timezone

- **File:line:** `model.ts:152-153`
- **Category:** Generic field name, missing constraint
- **Suggestion:** Add doc specifying the time-zone interpretation, or rename `utcHours`/`utcMinutes` if UTC, or add a `timezone?: string` field.
- **Rationale:** A "maintenance window start time" without timezone is ambiguous (workspace TZ? customer TZ? UTC?).

### 42–46. Overly verbose `effective*` discriminator names

- **File:line:** `model.ts:387, 392, 397, 402, 407`
- **Category:** Overly verbose
- **Suggestion:** Either drop the `effective` prefix on the discriminator value (the parent field is `effectiveValue`, so the prefix is redundant) or split into two top-level discriminated unions (`Setting.value: {$case: 'automaticClusterUpdateWorkspace', ...}` and `Setting.effectiveValue: {$case: 'automaticClusterUpdateWorkspace', ...}`).
- **Rationale:** `effectiveAibiDashboardEmbeddingApprovedDomains` (45 chars) is the longest discriminator in the package and stutters `effective`/`Effective` with its parent field name.

### 47–49. `name` (key) vs `displayName` (human name) — inverted intuition

- **File:line:** `model.ts:426, 439`
- **Category:** Generic name + misleading
- **Suggestion:** Rename `name` → `key`, then `displayName` → `name` (or `label`).
- **Rationale:** Across most data-modelling traditions, `name` is the human-readable name and `key`/`id` is the identifier. This package inverts the convention.

### 50. `Url` vs `URL` vs `Link`

- **File:line:** `model.ts:432 (docsLink)`; `utils.ts:70, 98, 103 (url)`
- **Category:** Acronym casing inconsistency
- **Suggestion:** `docsUrl` for parity with `request.url` already used elsewhere. "Link" is HTML-flavoured; "URL" is the data.

### 51. `restartEvenIfNoUpdatesAvailable` — whole sentence as field name

- **File:line:** `model.ts:111`
- **Category:** Field name verb-as-noun, overly verbose
- **Suggestion:** `forceRestart: boolean` (the semantics — restart even when not needed for updates). Or `restartOnSchedule: boolean`.
- **Rationale:** 31-character field name encoding a clause is awkward; a one-word semantic name reads better.

### 84. `*Public*` qualifier as proto-architectural leak (reframe of #25)

- **File:line:** `model.ts:156, 161, 170, 270, 277, 286`; `client.ts:83, 112, 137, 346, 378, 409`
- **Category:** Proto-architectural leak (`Public` mid-position)
- **Why:** `Public` in `GetPublic*Request`, `PatchPublic*Request`, and method names `getPublic*`/`patchPublic*` is a direct echo of the proto service-name `PublicSettingsService` — i.e., the *server-side* internal-vs-public service split. The TS SDK only ships the public surface, so the qualifier signals nothing the user can act on.
- **Suggestion:** Drop `Public` from every request type and every method name. `GetAccountSettingRequest`/`getAccountSetting`, `PatchAccountSettingRequest`/`patchAccountSetting`, etc.
- **Rationale:** This duplicates #25 and #26 but reframes them as a *proto-architectural leak* per the scan brief. `Public`/`Internal` are explicitly on the flag list. The two earlier findings catalogued the names; this one names the cause.

---

## Low severity

### 52–54. Long enum values

- **File:line:** `model.ts:85, 56, 57`
- **Category:** Long enum value
- **Identifiers:** `RESTRICT_TOKENS_AND_JOB_RUN_AS` (28c), `FIRST_AND_THIRD_OF_MONTH` (24c), `SECOND_AND_FOURTH_OF_MONTH` (26c)
- **Suggestion:** For `RESTRICT_TOKENS_AND_JOB_RUN_AS`, the wire string is fixed (`'RESTRICT_TOKENS_AND_JOB_RUN_AS'`), so the TS-side rename would only affect the enum-key access.

### 55–58. Undocumented abbreviations in JSDoc

- **File:line:** `model.ts:78, 83`
- **Category:** Cryptic abbreviation
- **Tokens:** "WS" (workspace), "OBO" (on-behalf-of token), "SPs" (service principals)
- **Suggestion:** Spell out in the JSDoc.
- **Rationale:** Users reading the IDE tooltip will see "WS admins to create OBO tokens for all SPs" without expansions.

### 59–61. Reserved-word adjacency: `value`, `type`, `name`

- **File:line:** `model.ts` passim
- **Category:** Reserved-word risk
- **Suggestion:** See #10–12.

### 62–63. Acronym casing notes

- **File:line:** `model.ts:157, 78`
- **Category:** Acronym casing
- **Notes:** `Id` (consistent), `Ws` (only in JSDoc, not identifiers — safe).

### 64. `setting?: UserPreference` doc mismatch

- Already covered in #14; flagged again here for the JSDoc inconsistency (`model.ts:283` field is "setting" but type is "UserPreference").

### 65. `disable_gov_tag_creation` wire key

- **File:line:** `model.ts:670, 1059`
- **Category:** Cryptic abbreviation (server-controlled)
- **Suggestion:** N/A — wire format is fixed. Note for documentation.

### 66. `restrict_tokens_and_job_run_as` enum string value

- **File:line:** `model.ts:85`
- **Category:** Wire value
- **Suggestion:** N/A — wire-fixed.

### 67. `IntegerMessage` misleading in JS

- **File:line:** `model.ts:175-177`
- **Category:** Misleading
- **Suggestion:** The "Integer" half of the name is misleading — JS has no distinct integer type, and the `value` field is typed `number` (i.e. IEEE-754 double). A neutral name like `NumberMessage` would be honest about the runtime type.
- **Rationale:** A reader seeing `IntegerMessage` may assume validation, bigint, or some integer-preserving codec. None is present.

### 68. Nested `.value.value`

- **File:line:** `model.ts:313, 103`
- **Category:** Singular naming collision
- **Suggestion:** See #10.

### 69–70. Long discriminator strings

- **File:line:** `model.ts:335-337, 392`
- **Category:** Long string identifier
- **Suggestion:** See #15, #42–46.

### 71–73. Vague field names

- **File:line:** `model.ts:107 (enabled), 141 (frequency), 297 (status)`
- **Category:** Vague
- **Suggestion:** Add domain context: `clusterRestartEnabled`, `restartFrequency`, `workspaceAdminRestrictionStatus`.
- **Rationale:** Inside their parent types the meaning is somewhat clear but auto-complete shows only the field name, which is generic.

### 74. `patch*` vs `update*`

- See #27.

### 75. JSDoc on `userId` says "user whose setting is being retrieved" instead of "preference"

- **File:line:** `model.ts:164-165`
- **Category:** Misleading
- **Suggestion:** Use the same vocabulary as the type — "preference" for user-preference endpoints.

### 76–78. Double-negative / passive booleans on `EnablementDetails`

- **File:line:** `model.ts:125, 127, 129`
- **Category:** Misleading / cognitive load
- **Identifiers:** `unavailableForNonEnterpriseTier`, `unavailableForDisabledEntitlement`, `forcedForComplianceMode`
- **Suggestion:** Phrase positively where possible: `availableForEnterpriseTier?: boolean`, `availableForEntitlement?: boolean`, `forceEnabledByComplianceMode?: boolean`. Double-negatives ("unavailable for non-enterprise") slow comprehension.
- **Rationale:** "Unavailable for non-enterprise tier" requires the reader to parse two negatives ("un-" and "non-") to conclude "this is only available for enterprise". Worth one extra second of think-time on every field access.

### 79. Cross-package `Dbfs` casing

- **File:line:** `workspacesettings/v1/model.ts` (consumer-collision risk noted; not present in this package directly)
- **Category:** Cross-package acronym casing
- **Suggestion:** Note for the cross-package audit, not actionable here.

### 80. `host` — generic class field

- **File:line:** `client.ts:54`
- **Category:** Generic
- **Suggestion:** `baseUrl` (consistent with `fetch` API conventions). "Host" can mean DNS host, host machine, etc.

### 81. `BETA` member adjacent to `PUBLIC_PREVIEW`

- See #35.

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

6. **Field-vs-discriminator name divergence on `value`.** A consumer constructing a `Setting` writes:
   ```
   { name: 'restrict_workspace_admins',
     value: { $case: 'restrictWorkspaceAdmins',
              restrictWorkspaceAdmins: { status: '...' } } }
   ```
   — three repetitions of the variant name. This is the proto3 `oneof` wire model leaking. A TS-native model would be:
   ```
   { name: 'restrict_workspace_admins',
     restrictWorkspaceAdmins: { status: '...' } }
   ```
   — same expressivity, half the typing.

7. **`name` field's role swings.** On `Setting`/`UserPreference`/`SettingsMetadata` it is the *key* of the setting (used in URL paths). On most other Databricks resources `name` is the human-readable label. The inverted convention is a small but real footgun.

8. **`patchPublic*` is six syllables and four word-roots for a single PATCH call.** `patch` + `Public` + (`Account` | `Workspace`) + (`Setting` | `UserPreference`) + `Request` accumulates fast. After dropping `Public` and `Request`, names like `patchAccountSetting` would be drastically more usable.

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
| `src/v2/client.ts` | 433 (full) | 100% — `Client` constructor and 9 client methods audited (paginated page-returning and iterator-returning variants both reviewed). Private fields (`host`, `accountId`, `httpClient`, `logger`, `userAgent`) audited. |
| `src/v2/utils.ts` | 150 (full) | 100% — `HttpCallOptions`, `executeCall`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`, `marshalRequest`, `flattenQueryParams`, `readAll` audited. Shared utility code; no naming issues unique to this package (the same scaffolding appears in every package). |

---

## Fixed

_None._
