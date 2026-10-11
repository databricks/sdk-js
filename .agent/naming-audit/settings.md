# Naming Audit: settings

**Path:** `/home/parth.bansal/sdk-js/packages/settings/`
**Versions audited:** v2
**Inferred domain:** A "unified" generic settings/user-preference key/value API (referred to as `settingsv2` in the wire/JSDoc) that exposes a single `Setting` polymorphic value type with multiple typed payload variants. Operates at three scopes — account-level settings, account-level user preferences, and workspace-level settings — via a single set of generic `get*`/`patch*`/`list*Metadata` endpoints.
**Total weird names flagged:** 19

---

## Summary table

| # | Severity | Category | Identifier | File:line |
|---|----------|----------|------------|-----------|
| 1 | Critical | Vague package name | `settings` (package) | package level |
| 2 | High | Vague/generic type | `Setting` | `model.ts:353` |
| 3 | High | Vague/generic type | `SettingsMetadata` | `model.ts:482` |
| 4 | High | Suffix tautology + Go-style | `*Message` suffix (`BooleanMessage`, `IntegerMessage`, `StringMessage`, `ClusterAutoRestartMessage`, `PersonalComputeMessage`, `RestrictWorkspaceAdminsMessage`) | `model.ts:140, 223, 500, 144, 340, 344` |
| 5 | High | Cryptic abbreviation (undefined) | `Aibi` (AI/BI) in `AibiDashboardEmbedding*` | `model.ts:34, 126, 132` |
| 6 | High | Verb-tense (action-name as type) | `RestrictWorkspaceAdminsMessage` (verb-noun as state type) | `model.ts:344` |
| 7 | High | Verb-tense | `ClusterAutoRestartMessage` (verb-phrase as state type) | `model.ts:144` |
| 8 | High | Proto-architectural leak (nested-type underscore syntax) | `AibiDashboardEmbeddingAccessPolicy_AccessPolicyType`, `ClusterAutoRestartMessage_MaintenanceWindow`, `ClusterAutoRestartMessage_MaintenanceWindow_DayOfWeek`, `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayFrequency`, `ClusterAutoRestartMessage_MaintenanceWindow_WeekDayBasedSchedule`, `ClusterAutoRestartMessage_MaintenanceWindow_WindowStartTime`, `ClusterAutoRestartMessage_EnablementDetails`, `PersonalComputeMessage_PersonalComputeMessageEnum`, `RestrictWorkspaceAdminsMessage_Status` | `model.ts:41, 171, 57, 73, 178, 189, 161, 102, 122` |
| 9 | High | Proto-architectural leak (`Api` mid-position) | `AllowedAppsUserApiScopesMessage` (`Api` is the wire/proto term — TS surface should drop it) | `model.ts:136, 553, 1006` |
| 10 | Medium | Redundant `Public` qualifier | `GetPublicAccountSettingRequest`, `PatchPublicAccountSettingRequest`, `GetPublicWorkspaceSettingRequest`, `PatchPublicWorkspaceSettingRequest`, `GetPublicAccountUserPreferenceRequest`, `PatchPublicAccountUserPreferenceRequest`, and corresponding methods | `model.ts:204, 318, 218, 334, 209, 325`; `client.ts:80, 355, 136, 420, 110, 388` |
| 11 | Medium | Redundant `Public` qualifier | method names `getPublicAccountSetting`, `patchPublicAccountSetting`, `getPublicWorkspaceSetting`, `patchPublicWorkspaceSetting`, `getPublicAccountUserPreference`, `patchPublicAccountUserPreference` | `client.ts:80, 355, 136, 420, 110, 388` |
| 12 | Medium | HTTP-verb leak | `patch` for mutation where the SDK convention is `update`/`set` | `client.ts:355, 388, 420` |
| 13 | Medium | Inconsistent action verb | `patchPublicAccountUserPreference` for setting a preference (vs noun "set" or "put") | `client.ts:388` |
| 14 | Medium | Long type name | `ListAccountUserPreferencesMetadataResponse` (42 chars) | `model.ts:277` |
| 15 | Medium | Long type name | `ListAccountUserPreferencesMetadataRequest` (41 chars) | `model.ts:256` |
| 16 | Medium | Long type name | `PatchPublicAccountUserPreferenceRequest` (39 chars) | `model.ts:325` |
| 17 | Medium | Proto-architectural leak (request type `Public` infix maps 1:1 to a proto `PublicSettingsService`) | `GetPublicAccountSettingRequest`, `GetPublicAccountUserPreferenceRequest`, `GetPublicWorkspaceSettingRequest`, `PatchPublicAccountSettingRequest`, `PatchPublicAccountUserPreferenceRequest`, `PatchPublicWorkspaceSettingRequest` (reiterates #10 as a proto-leak category) | `model.ts:204, 209, 218, 318, 325, 334` |
| 18 | Low | Misleading singular | `IntegerMessage.value` is `number` (TS has no integer/float distinction; "Integer" misleads) | `model.ts:224` |
| 19 | Low | HTTP-verb leak | `patch` (HTTP idiom) vs `update`/`set` (SDK idiom) | `client.ts:355, 388, 420` |

---

## Critical findings

### 1. `settings` — vague package name

- **File:line:** package level
- **Category:** Vague/generic — extreme risk
- **Suggestion:** `settingsv2` (or `unified-settings`, or `settingskv`). A user-facing package name of literally `"settings"` collides with most "settings" concepts in any application.
- **Rationale:** The wire path is `/api/2.1/settings/{name}` and `/api/2.1/accounts/{accountId}/settings/{name}`. The Go SDK uses `settingsv2`. The TS package elides the `v2` suffix from the package name (it only appears in the subpath import `@databricks/sdk-settings/v2`), which gives the impression of a generic catch-all when in fact this is the new key/value flavor of the settings surface.

---

## High severity

### 2. `Setting` — extreme generic risk

- **File:line:** `model.ts:353-480`
- **Category:** Vague/generic, reserved-word risk
- **Suggestion:** `UnifiedSetting`, `SettingValue`, or `KeyedSetting`. The Setting concept here is "a name plus a polymorphic value plus a polymorphic effective value" — none of those properties match the bare word "Setting" without context.
- **Rationale:** `Setting` is one of the most overloaded single words in software (UI settings, settings menu, settings file, configuration setting, etc.). Inside a "settings" package, the type `Setting` reads like "the thing this package is about" — but the package has other top-level types (`UserPreference`, `SettingsMetadata`, and the wrapper messages). The bare name encourages a `import {Setting}` that competes with React UI `Setting` types, Node `process.config` settings, etc.

### 3. `SettingsMetadata` — plural type, singular use

- **File:line:** `model.ts:482-498`
- **Category:** Vague + singular/plural mismatch
- **Suggestion:** `SettingMetadata` (singular). The type describes metadata about *one* setting; lists are `SettingMetadata[]`. The current `SettingsMetadata` reads as "all metadata about all settings" which is what the *array* of these things represents — not the element.
- **Rationale:** The field `settingsMetadata?: SettingsMetadata[]` (`model.ts:248, 279, 306`) doubles the plural — "settings metadatas" — and an item from the array `settingsMetadata[0]` then has the type `SettingsMetadata` even though it's one row. Standard practice is singular type, plural field/array (e.g. `User`, `users: User[]`).

### 4. `*Message` suffix — Go/proto-style

- **File:line:** `model.ts:140, 223, 500, 144, 340, 344`
- **Category:** Suffix tautology / Go-style
- **Identifiers:** `BooleanMessage`, `IntegerMessage`, `StringMessage`, `ClusterAutoRestartMessage`, `PersonalComputeMessage`, `RestrictWorkspaceAdminsMessage` (and `AllowedAppsUserApiScopesMessage`, `CollaborationPlatformConnectivityMessage`, `OperationalEmailCustomRecipientMessage`).
- **Suggestion:** Drop `Message`. Rename `ClusterAutoRestartMessage → ClusterAutoRestart`, `RestrictWorkspaceAdminsMessage → RestrictWorkspaceAdmins`, etc. The "Message" suffix is the protobuf convention for "everything is a Message"; in TS where "everything is an interface", the suffix is noise.
- **Rationale:** No other TS-idiomatic SDK uses `*Message` as a suffix. The interfaces are not messages in any TS-visible sense (they don't extend a `Message` base, they have no serialization methods — the marshal/unmarshal functions are external).

### 5. `Aibi` — undefined cryptic abbreviation (AI/BI)

- **File:line:** `model.ts:34, 126, 132`
- **Category:** Cryptic abbreviation
- **Suggestion:** Spell out as `AiBi` for the AI/BI Genie embedding feature, and add a top-of-file `@module` doc explaining: "AI/BI = Databricks's AI- and BI-powered dashboards product."
- **Rationale:** "Aibi" is not a recognised English word and is not defined anywhere in this file. A reader has to know the Databricks product naming.

### 6–7. Verb-tense action-as-noun naming

- **File:line:** `model.ts:344 (RestrictWorkspaceAdminsMessage), 144 (ClusterAutoRestartMessage)`
- **Category:** Verb-tense inconsistency
- **Suggestion:** Types describing *state* should be nouns: `WorkspaceAdminRestriction`, `ClusterAutoRestart` (or `ClusterAutoRestartConfig`).
- **Rationale:** Standard naming: imperative verbs for actions/methods; nouns for state types.

### 8. Proto-nested underscore type naming — proto-architectural leak

- **File:line:** `model.ts:41, 171, 57, 73, 178, 189, 161, 102, 122` (and the corresponding marshal/unmarshal schema declarations)
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

### 9. `AllowedAppsUserApiScopesMessage` — `Api` mid-position proto leak

- **File:line:** `model.ts:136, 553 (unmarshal), 1006 (marshal)`
- **Category:** Proto-architectural leak (`Api` mid-position) + `*Message` suffix (covered in #4)
- **Why:** `Api` appears mid-name in a domain type that models *what user-OAuth scopes apps may be granted*. The "Api" half describes the **wire/proto** medium ("user-API scopes") rather than the domain concept (OAuth scopes).
- **Suggestion:** `AllowedAppsUserScopes` (drop `Api`, drop `Message`). The discriminator value `allowedAppsUserApiScopes` and wire key `allowed_apps_user_api_scopes` would remain wire-side; the TS surface should not carry the proto-medium descriptor.
- **Rationale:** The combined `Api` + `Message` pair carries two architectural-leak tokens in a single identifier (60 chars including `Schema` in the marshal/unmarshal forms). `Api` mid-position falls squarely in the prompt's flag list.

---

## Medium severity

### 10. `*Public*` qualifier — redundant

- **File:line:** `model.ts:204, 318, 218, 334, 209, 325`
- **Category:** Redundant qualifier
- **Suggestion:** Drop `Public` from request type names (and method names — #11). `GetAccountSettingRequest`/`getAccountSetting` is shorter and equally specific.
- **Rationale:** If everything is "public" (vs internal), the qualifier carries no information. The Go SDK upstream uses the same word probably because the proto service is named `PublicSettingsService` to disambiguate from internal admin services — but the JS SDK only ships the public surface, so the qualifier is redundant.

### 11. Method names: `getPublic*`, `patchPublic*` — redundant `Public`

- **File:line:** `client.ts:80, 355, 136, 420, 110, 388`
- **Category:** Redundant qualifier + verbose
- **Suggestion:** `getAccountSetting`, `patchAccountSetting`, etc.

### 12. `patch*` — HTTP-verb leak where the SDK convention is `update`/`set`

- **File:line:** `client.ts:355, 388, 420` (use `patch`)
- **Category:** HTTP-verb leak / inconsistent action verb
- **Suggestion:** Pick an SDK-domain verb. `update` (for the setting mutations) or `set`/`put` (for the user-preference replacement) reads more like an SDK operation than the raw HTTP method `patch`.
- **Rationale:** The method name echoes the HTTP verb (`PATCH`) rather than the domain action. Mutation methods elsewhere in the SDK favor `update`/`set`; `patch` leaks the transport idiom onto the public surface and breaks muscle memory for users scanning for an `update*` method.

### 13. `patchPublicAccountUserPreference` (single user-pref item) — overly verbose action

- **File:line:** `client.ts:388`
- **Category:** Inconsistent + verbose
- **Suggestion:** `setAccountUserPreference` or `putAccountUserPreference`.
- **Rationale:** For setting a single preference, `set*` is the conventional SDK verb. `patch*` implies partial-update; this endpoint replaces the whole preference.

### 14–16. Long type names

- **File:line:** `model.ts:277, 256, 325`
- **Category:** Overly verbose
- **Identifiers:**
  - `ListAccountUserPreferencesMetadataResponse` (42 chars)
  - `ListAccountUserPreferencesMetadataRequest` (41 chars)
  - `PatchPublicAccountUserPreferenceRequest` (39 chars)
- **Suggestion:** After applying the suggested simplifications (drop `Public`), names shorten naturally: `ListUserPreferencesMetadataResponse`, etc.

### 17. `*Public*` qualifier as proto-architectural leak (reframe of #10)

- **File:line:** `model.ts:204, 209, 218, 318, 325, 334`; `client.ts:80, 110, 136, 355, 388, 420`
- **Category:** Proto-architectural leak (`Public` mid-position)
- **Why:** `Public` in `GetPublic*Request`, `PatchPublic*Request`, and method names `getPublic*`/`patchPublic*` is a direct echo of the proto service-name `PublicSettingsService` — i.e., the *server-side* internal-vs-public service split. The TS SDK only ships the public surface, so the qualifier signals nothing the user can act on.
- **Suggestion:** Drop `Public` from every request type and every method name. `GetAccountSettingRequest`/`getAccountSetting`, `PatchAccountSettingRequest`/`patchAccountSetting`, etc.
- **Rationale:** This duplicates #10 and #11 but reframes them as a *proto-architectural leak* per the scan brief. The two earlier findings catalogued the names; this one names the cause.

---

## Low severity

### 18. `IntegerMessage` misleading in JS

- **File:line:** `model.ts:223-225`
- **Category:** Misleading
- **Suggestion:** The "Integer" half of the name is misleading — JS has no distinct integer type, and the `value` field is typed `number` (i.e. IEEE-754 double). A neutral name like `NumberMessage` would be honest about the runtime type.
- **Rationale:** A reader seeing `IntegerMessage` may assume validation, bigint, or some integer-preserving codec. None is present.

### 19. `patch*` vs `update*`/`set*`

- See #12.
