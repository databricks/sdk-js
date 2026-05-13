# Naming Audit: `catalogs` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/catalogs/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog (UC) — top-level securable container.

---

## Summary

The `catalogs` package surfaces five UC catalog operations
(`createCatalog`, `deleteCatalog`, `getCatalog`, `listCatalogs`,
`updateCatalog`) plus a paginated iterator. The model layer mostly mirrors
the Go SDK 1:1, so most issues are inherited from the upstream definitions.
The most pervasive problems are (1) proto-style underscore-suffixed
identifiers leaking into TypeScript (`ConversionInfo_State`,
`DeleteCatalog_Response`, `ListCatalogs_Response`, `*_OptionsEntry`,
`*_PropertiesEntry`), (2) the cryptic `nameArg` path-parameter field, and
(3) massive `Create*`/`Update*` request shapes that include read-only
output fields (`createdAt`, `createdBy`, `provisioningInfo`,
`conversionInfo`, `drReplicationInfo`, `securableType`, `fullName`, etc.)
that have no business in a write request.

---

## Findings

### 1. Vague / generic names

#### 1.1 `EffectivePredictiveOptimizationFlag.value` (model.ts:242)
Field name `value` on a type whose entire purpose is exposing a flag value
is doubly redundant — the field is the only payload-bearing scalar on the
type and conveys no semantics. The doc comment reveals it actually holds
the enable/disable string ("Whether predictive optimization should be
enabled..."). Better: `enabled`, `predictiveOptimizationEnabled`, or
mirror the upstream `flagValue` if present. Same issue surfaces in the
marshal/unmarshal schemas (lines 489, 494, 636, 641).

#### 1.2 `*_OptionsEntry.value` / `*_PropertiesEntry.value` (model.ts:133, 139, 208, 214, 372, 378)
Single-character-like generic names (`key`, `value`) on the exported
map-entry types. These names carry no semantics on their own and only
make sense in the context of the parent map.

#### 1.3 `DrReplicationInfo.replicatedEntities` (model.ts:231)
A `Uint8Array` named `replicatedEntities` is meaningless — the doc
comment points at an internal Google Doc. The name promises a list of
entities; the type is a byte blob. Consumers cannot guess what to do
with it. Either rename to something signaling the opacity
(`replicatedEntitiesProto`, `replicatedEntitiesPayload`) or expose a
parsed shape.

#### 1.4 `ConversionInfo.state` and `ProvisioningInfo.state` (model.ts:145, 305)
Generic field name `state` on both types. Whose state? The name only
acquires meaning from its surrounding type — if the field is ever
inlined or destructured, the meaning is lost.

#### 1.5 `inheritedFromType` / `inheritedFromName` (model.ts:244, 246)
`Type` here is a free-form `string`, not the `SecurableType` enum that
governs the rest of the package. The name `inheritedFromType` suggests an
enum/typed handle but is in fact human-readable text. Misleading — see
also §6.1.

---

### 2. Redundant enum prefixes

#### 2.1 `DrReplicationStatus` (model.ts:21-25)
All three variants are prefixed with `DR_REPLICATION_STATUS_`:
- `DR_REPLICATION_STATUS_UNSPECIFIED`
- `DR_REPLICATION_STATUS_PRIMARY`
- `DR_REPLICATION_STATUS_SECONDARY`

In TypeScript this becomes `DrReplicationStatus.DR_REPLICATION_STATUS_PRIMARY`
— the enum name repeats four times. Should be `UNSPECIFIED`, `PRIMARY`,
`SECONDARY`. This is a verbatim port of proto `enum` style and is the
single most jarring naming violation in the package.

#### 2.2 `ConversionInfo_State.STATE_UNSPECIFIED` (model.ts:51)
Same pattern — `ConversionInfo_State.STATE_UNSPECIFIED` repeats `STATE`.
Drop the `STATE_` prefix on the variant so it reads `UNSPECIFIED`.

#### 2.3 `ProvisioningInfo_State.STATE_UNSPECIFIED` (model.ts:58)
Same as 2.2.

#### 2.4 `CatalogType.*_CATALOG` (model.ts:13-18)
Every variant ends in `_CATALOG`: `MANAGED_CATALOG`,
`DELTASHARING_CATALOG`, `SYSTEM_CATALOG`, `INTERNAL_CATALOG`,
`FOREIGN_CATALOG`, `MANAGED_ONLINE_CATALOG`. Read aloud:
`CatalogType.MANAGED_CATALOG`. The `_CATALOG` suffix is fully redundant —
`MANAGED`, `DELTA_SHARING`, `SYSTEM`, `INTERNAL`, `FOREIGN`,
`MANAGED_ONLINE` carries the same meaning. (`DELTASHARING` also runs the
two words together — see §3.4.)

---

### 3. Acronym casing inconsistencies (UC, DR, CMK, AKV)

#### 3.1 `DrReplicationStatus`, `DrReplicationInfo`, `drReplicationInfo` (model.ts:21, 228, 121)
"DR" (Disaster Recovery) is a two-letter initialism. Google TS style guide
treats two-letter acronyms as words (`Db`, `Io`, `Ui`), so `Dr…` is
defensible — but the package's own doc comments spell it "Disaster
Recovery", and to a reader `Dr` reads first as "Doctor". Recommend
spelling it out: `DisasterRecoveryReplicationStatus` /
`DisasterRecoveryReplicationInfo` for the public identifiers, or at minimum
keep `DR` uppercase as an inline initialism (`DRReplicationStatus`) so it
stops looking like a name prefix.

#### 3.2 `azureCmkAccessConnectorId`, `azureCmkManagedIdentityId` (model.ts:69, 70)
CMK ("Customer Managed Key") is consistently cased `Cmk` here. The same
concept is spelled out elsewhere as `customerManagedKeyId`
(EncryptionSettings.customerManagedKeyId — model.ts:255). Pick one:
either use the acronym everywhere (`azureCmkAccessConnectorId`,
`cmkId`) or expand it everywhere
(`azureCustomerManagedKeyAccessConnectorId`, `customerManagedKeyId`).

#### 3.3 `azureKeyVaultKeyId` vs comment "AKV URL" (model.ts:257)
Field is `azureKeyVaultKeyId` but the doc comment says "the AKV URL in
Azure". The field name and doc must agree on whether the value is a URL
or an ID — they currently contradict each other. See also §6.2.

#### 3.4 `DELTASHARING_CATALOG` enum variant (model.ts:14)
"Delta Sharing" is two words. Variant runs them together as
`DELTASHARING_CATALOG`. Should be `DELTA_SHARING_CATALOG` (or simply
`DELTA_SHARING` after stripping the `_CATALOG` suffix per §2.4).

#### 3.5 "UC Native" in doc comments (model.ts:118, 193, 357 etc.)
Doc comments use "UC Native" capitalisation, but the package never refers
to Unity Catalog as `UC` in identifiers — only in comments. This is a
minor inconsistency: when the codebase uses `unity-catalog` in URLs and
"Unity Catalog" in prose but the comment shifts to "UC Native", the
reader has to remember the abbreviation. Spell out "Unity-Catalog-native"
or pick one form.

---

### 4. Underscores in TypeScript identifiers

This is the package's most widespread cosmetic issue. Proto-style
underscore separators appear in exported TS identifiers, and each one has
been silenced with `@typescript-eslint/naming-convention -- Proto-style…`
disable comments — the lint rule disagrees and we are deliberately
working around it.

#### 4.1 `ConversionInfo_State` (model.ts:50)
Proto nested-enum convention `Parent_Child`. TypeScript convention is
`ConversionInfoState` (or, better, top-level `ConversionState` because
there is no real nesting in TS — see §13.1).

#### 4.2 `ProvisioningInfo_State` (model.ts:57)
Same as 4.1. Should be `ProvisioningState`.

#### 4.3 `CatalogInfo_OptionsEntry`, `CatalogInfo_PropertiesEntry` (model.ts:131, 137)
Proto map-entry types — see §1.2.

#### 4.4 `CreateCatalog_OptionsEntry`, `CreateCatalog_PropertiesEntry` (model.ts:206, 212)
Same as 4.3.

#### 4.5 `UpdateCatalog_OptionsEntry`, `UpdateCatalog_PropertiesEntry` (model.ts:370, 376)
Same as 4.3.

#### 4.6 `DeleteCatalog_Response` (model.ts:225)
Should be `DeleteCatalogResponse`.

#### 4.7 `ListCatalogs_Response` (model.ts:292)
Should be `ListCatalogsResponse`.

#### 4.8 `unmarshalDeleteCatalog_ResponseSchema`, `unmarshalListCatalogs_ResponseSchema` (model.ts:468, 515)
The underscores propagate into the schema exports. Should be
`unmarshalDeleteCatalogResponseSchema`, `unmarshalListCatalogsResponseSchema`.

---

### 5. Cryptic abbreviations

#### 5.1 `nameArg` (model.ts:219, 264, 310)
Used as the catalog name path-parameter on `DeleteCatalog`, `GetCatalog`,
and `UpdateCatalog`. The `Arg` suffix is jargon from the Go generator
distinguishing path arguments from request-body fields with the same key.
TypeScript callers have no need for this distinction — the field is the
catalog name and should be named `name` (or `catalogName` if a sibling
`name` field is required for body symmetry). Today, `UpdateCatalog` has
*both* `nameArg` (path) and `name` (body) — virtually guaranteeing user
confusion. See also §15.1.

#### 5.2 `Dr` prefix throughout (`DrReplicationStatus`, `DrReplicationInfo`, `drReplicationInfo`, `lastFailoverTimeMs` doc) — see §3.1.

#### 5.3 `Cmk` prefix — see §3.2.

#### 5.4 `Akv` (in `azureKeyVaultKeyId` doc comment, model.ts:257) — see §3.3.

#### 5.5 `pkgJson` (client.ts:19)
Variable name `pkgJson` for `package.json`. Mostly internal — minor — but
worth noting for consistency.

---

### 6. Misleading names

#### 6.1 `EffectivePredictiveOptimizationFlag.value` "string" carries enum-like semantics
The field is typed `string | undefined` but the comment ("Whether predictive
optimization should be enabled…") implies a tri-state (enabled / disabled /
inherit). Either the type should be an enum (`PredictiveOptimizationFlag`)
or the field should be named explicitly (`enabled: string`). See also §1.1.

#### 6.2 `azureKeyVaultKeyId` is described as a URL (model.ts:257-258)
Field is named `…Id` but doc says "the AKV URL in Azure". Either rename to
`azureKeyVaultKeyUri` or fix the doc to match. Today the name lies about
what the field holds.

#### 6.3 `replicatedEntities: Uint8Array` (model.ts:231)
A name with cardinal plural ("entities") implies an iterable collection;
the type is a single byte buffer. See also §1.3.

#### 6.4 `CatalogInfo.fullName` "Corresponds with the name field" (model.ts:116)
The doc explicitly states that `fullName` equals `name` for catalogs.
The field exists only to satisfy the parent `Securable` contract. This is
arguably acceptable (UC is column-uniform across securables) but the name
misleads — it promises richer information than `name` provides.

#### 6.5 `CatalogInfo.options` vs `CatalogInfo.properties` (model.ts:124-127)
Both are `Record<string, string>` with identical doc comments ("A map of
key-value properties attached to the securable."). There is no way for a
caller to know what distinguishes them. The doc duplication is verbatim
in CreateCatalog (199-202) and UpdateCatalog (363-366). Either is
underspecified or one of them is misnamed.

#### 6.6 `EncryptionSettings.azureEncryptionSettings: AzureEncryptionSettings` (model.ts:259)
A field on `EncryptionSettings` named `azureEncryptionSettings` whose type
is also `AzureEncryptionSettings` reads like a copy-paste error. Drop the
prefix: `azure: AzureEncryptionSettings` is clearer.

#### 6.7 `executeHttpCall` accepts an `HttpCallOptions` containing an `HttpRequest` (utils.ts:65) — internal, but the function name and its options bag both repeat "HttpCall".

---

### 7. Overly verbose

#### 7.1 `EffectivePredictiveOptimizationFlag` (model.ts:240)
Identifier is 39 characters. Compounded by the field name
`effectivePredictiveOptimizationFlag` (model.ts:109, 184, 348) used on
three different request/response types. `EffectivePOFlag` or
`EffectivePredictiveOptFlag` is overkill the other way; consider
`EffectivePredictiveOptimization` (no `Flag` since the type already wraps
the flag).

#### 7.2 `enablePredictiveOptimization: string` (model.ts:83, 158, 322)
Long field name for a single flag value. Acceptable, but tracked because
it pairs with §7.1 to make every `CatalogInfo`-style object verbose.

#### 7.3 `managedEncryptionSettings` (model.ts:123, 198, 362)
Three-word field name on a securable that already implies "managed".
Consider `encryption` or `encryptionSettings`.

#### 7.4 `unmarshalEffectivePredictiveOptimizationFlagSchema` /
`marshalEffectivePredictiveOptimizationFlagSchema` (model.ts:486, 634)
Schema exports are 51+ characters. Hard to read, especially in a
generated transform chain.

#### 7.5 `MANAGED_ONLINE_CATALOG` enum value (model.ts:18) — see §17.1.

---

### 8. Redundant suffixes

#### 8.1 `…Info` types (`CatalogInfo`, `ConversionInfo`, `ProvisioningInfo`, `DrReplicationInfo`)
"Info" is a non-suffix — it carries no semantic content. In the Go SDK
this distinguishes the entity type from the resource handle; in JS/TS the
convention is to drop it (`Catalog`, `Conversion`, `Provisioning`,
`DrReplication`).

#### 8.2 `…Settings` repeated (`AzureEncryptionSettings`, `EncryptionSettings`, `azureEncryptionSettings`) — see §6.6.

#### 8.3 `Flag` suffix on `EffectivePredictiveOptimizationFlag`
The whole type *is* the flag; the suffix is redundant. See §7.1.

#### 8.4 `…Arg` suffix on `nameArg` — see §5.1 and §15.1.

#### 8.5 `…Schema` suffix on every zod schema export (`unmarshalCatalogInfoSchema`, `marshalCreateCatalogSchema`, etc.)
Defensible (signals it's a zod schema), but verbose when paired with
`unmarshal…`/`marshal…` prefixes. Consider `unmarshalCatalogInfo` /
`marshalCreateCatalog` (the schema-ness is conveyed by the prefix).

---

### 9. Singular / plural mismatches

#### 9.1 `Client.listCatalogsIter` returns `AsyncGenerator<CatalogInfo>` (client.ts:210)
Method name implies plural results; the generator yields singular items
one at a time. Consistent with neighbouring packages, but worth a sanity
check — `iterCatalogs` (verb-first) reads more naturally for an iterator.

#### 9.2 `DrReplicationInfo.replicatedEntities` is a single `Uint8Array` — see §1.3, §6.3.

---

### 10. Reserved-word collisions

#### 10.1 `options` field on `CatalogInfo`, `CreateCatalog`, `UpdateCatalog` (model.ts:127, 202, 366)
`options` collides with the SDK's own `CallOptions` parameter name used
throughout the client (e.g. `createCatalog(req, options)`). The collision
is not a compile error but creates cognitive load — inside
`updateCatalog(req, options)` the reader sees both `req.options` (catalog
metadata) and `options` (call options). Rename one. The least invasive
fix is renaming the second client parameter to `callOptions`. See also
§11.1 for the duplicate-with-`properties` concern.

#### 10.2 `name` keyword-ish field
`name` is used as a non-path-param body field on `Create*` / `Update*` /
`CatalogInfo`, and also as a path arg via `nameArg`. This isn't a
reserved word but it routinely shadows `Function.prototype.name` and is
a common source of confusion when callers spread request objects. See
also §5.1.

#### 10.3 `value` field on `EffectivePredictiveOptimizationFlag` (model.ts:242) — generic, frequently shadows local variables. See §1.1.

---

### 11. Duplicate concepts

#### 11.1 `properties` and `options` (model.ts:124-127, 199-202, 363-366)
Both `Record<string, string>` on every catalog shape, with identical doc
comments ("A map of key-value properties attached to the securable.").
There is no way for a caller to know which to use for what. Either the
docs need to differentiate them or one is redundant. See also §6.5.

#### 11.2 `name` vs `fullName` on `CatalogInfo`
`fullName` is documented as "the full name of the catalog. Corresponds
with the name field" (model.ts:115-116). The same data lives in `name`
for catalogs because catalogs are top-level. The duplicate field exists
to satisfy a polymorphic Securable shape — but for the catalog-specific
type, it's redundant. See also §6.4.

#### 11.3 `name` vs `nameArg` on `UpdateCatalog`
The `UpdateCatalog` request has *both* `nameArg` (the existing catalog
identifier, used in the URL path) and `name` (the new desired name,
used in the body). It also has `newName` for the same concept. See
§15.1 below — three name-like fields on one request shape.

#### 11.4 `securableType` on `CatalogInfo` (model.ts:117) duplicates the type identity
`CatalogInfo` represents a catalog; its `securableType` field will
always be `SecurableType.CATALOG`. The field exists for polymorphism
across UC types but is meaningless when the surrounding type already
identifies the securable. Not a renaming issue — but worth flagging
as a duplicated concept.

#### 11.5 `CreateCatalog`, `UpdateCatalog`, and `CatalogInfo` share ~25 fields verbatim
The three types are 95% identical and have largely identical doc strings.
This is a generator artifact, but it bleeds into naming: any rename of
`storageRoot` must happen in three places. Recommend basing
`CreateCatalog`/`UpdateCatalog` on `Partial<CatalogInfo>` or a shared
`CatalogProperties` mixin.

---

### 12. Verb-tense inconsistency

#### 12.1 Client methods are well-aligned: `createCatalog`, `deleteCatalog`, `getCatalog`, `listCatalogs`, `updateCatalog`, `listCatalogsIter`. No tense issues.

#### 12.2 `unmarshal…` / `marshal…` schema-export prefixes are consistent. No issues.

#### 12.3 `executeCall`, `executeHttpCall` (utils.ts:26, 65) — both imperative present, consistent.

#### 12.4 `buildHttpRequest`, `parseResponse`, `marshalRequest` (utils.ts:96, 113, 119) — imperative present, consistent.

#### 12.5 `flattenQueryParams` (utils.ts:123) — imperative, consistent.

No verb-tense inconsistencies found across the package.

---

### 13. Go / Java-style names

#### 13.1 `ConversionInfo_State`, `ProvisioningInfo_State` (model.ts:50, 57)
Proto nested-enum naming `Parent_Child`. In TS this should be a
top-level type with a meaningful prefix: `ConversionState`,
`ProvisioningState`. See §4.1-4.2.

#### 13.2 `Client` class name (client.ts:44)
Bare `Client` (rather than `CatalogsClient`) is a Go-idiom: package
qualifies the type. JS consumers commonly import as
`import {Client} from '@databricks/sdk-catalogs/v1'` and have to alias.
This is a package-wide convention, but worth flagging in this audit
for consistency with the broader review.

#### 13.3 `nameArg` (model.ts:219, 264, 310) — Go generator naming. See §5.1.

#### 13.4 `…_Response` suffix is a proto / Go-RPC idiom. See §4.6, §4.7.

#### 13.5 `…Info` suffix — Java/Go style. See §8.1.

#### 13.6 `unmarshal…` / `marshal…` (Go's `encoding/json` verbs)
These are direct Go ports. The TS ecosystem typically uses `parse` /
`serialize` or `decode` / `encode`. Defensible because they're internal
to the generated layer, but identifies as Go-style naming.

---

### 14. Generic field names losing meaning

#### 14.1 `value` on `EffectivePredictiveOptimizationFlag` — see §1.1.

#### 14.2 `key`, `value` on map-entry wrappers (`*_OptionsEntry`, `*_PropertiesEntry`) — see §1.2.

#### 14.3 `state` on `ConversionInfo`, `ProvisioningInfo` (model.ts:145, 305)
Whose state? Bound to its container — but if the container is ever
inlined, the field stands alone. See §1.4.

#### 14.4 `status` on `DrReplicationInfo` (model.ts:229)
Generic in isolation; works in context. Less severe than `state`.

#### 14.5 `properties`, `options` (model.ts:125, 127, etc.) — see §6.5, §11.1.

---

### 15. Field contradicting type domain

#### 15.1 `UpdateCatalog` has `nameArg`, `name`, and `newName` (model.ts:310, 312, 314)
Three name-bearing fields on a single update request:
- `nameArg` — existing catalog (path param).
- `newName` — new desired name (body).
- `name` — also "name of catalog" per the inherited doc (model.ts:313).

A caller staring at this struct cannot intuit which to set. This is the
single most user-hostile naming pattern in the package — and it sits on
the most-used method.

#### 15.2 `CreateCatalog` contains read-only output fields
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`provisioningInfo`, `conversionInfo`, `drReplicationInfo`, `fullName`,
`securableType`, `effectivePredictiveOptimizationFlag`, `browseOnly`
(model.ts:170-189). These are server-populated; a creator setting them
is at best ignored. The type's domain is "create request", but its
shape contradicts that. Mirror issue in `UpdateCatalog`.

#### 15.3 `DeleteCatalog.nameArg` — see §5.1.

#### 15.4 `EncryptionSettings.azureEncryptionSettings`
The outer type's domain is "all encryption settings"; the field is named
as if scoped to Azure. The contradiction (parent claims breadth, child
name claims specificity) is resolved by reading the type definition
but is initially confusing. See §6.6.

---

### 16. Inconsistent action verbs

Method verbs in `Client`: `createCatalog`, `deleteCatalog`, `getCatalog`,
`listCatalogs`, `updateCatalog`, `listCatalogsIter`. Verbs are
consistent: standard CRUD plus a `…Iter` paginator. No `fetch…` /
`retrieve…` / `read…` outliers. No issues found.

---

### 17. Long enum values

#### 17.1 `CatalogType.MANAGED_ONLINE_CATALOG` (model.ts:18)
22-character enum value. Should be `MANAGED_ONLINE` after dropping the
redundant `_CATALOG` suffix (§2.4).

#### 17.2 `DrReplicationStatus.DR_REPLICATION_STATUS_SECONDARY` (model.ts:24)
33-character enum value, of which the first 22 are redundant. See §2.1.

#### 17.3 `ConversionInfo_State.STATE_UNSPECIFIED` (model.ts:51)
17 characters; redundant `STATE_` prefix. See §2.2.

#### 17.4 `ProvisioningInfo_State.STATE_UNSPECIFIED` (model.ts:58) — same.

---

### 18. Underspecified IDs

#### 18.1 `metastoreId` (model.ts:96, 171, 335)
Documented as "unique identifier of parent metastore". Format opaque
(UUID? slug?). Acceptable but unspecified.

#### 18.2 `azureTenantId` (model.ts:68)
GUID, implied by Azure context. Doc-less — not specified anywhere.

#### 18.3 `azureCmkAccessConnectorId`, `azureCmkManagedIdentityId` (model.ts:69, 70)
Doc-less. Format is an Azure resource ID
(`/subscriptions/…/providers/…`), not signalled by the name or
documentation.

#### 18.4 `customerManagedKeyId` (model.ts:255)
Doc: "the CMK uuid in AWS and GCP, null otherwise." So the field is a
UUID on AWS/GCP but `azureCmkAccessConnectorId` is an Azure resource ID
elsewhere — same conceptual ID, two formats, no unifying name.

#### 18.5 `azureKeyVaultKeyId` (model.ts:257)
Doc says "the AKV URL in Azure" — so it's actually a URL, not an ID. See
§6.2.

#### 18.6 `created_at` / `updated_at` (model.ts:98, 102)
Type is `number` (epoch milliseconds). Conventional, but the field name
doesn't convey unit. Pairs `createdAtMs` or `createdAtEpochMs` would be
more honest.

#### 18.7 `lastFailoverTimeMs` (model.ts:237)
Counter-example: this field correctly includes the `Ms` unit suffix.
Demonstrates that the codebase *can* express units in names — the other
timestamps simply don't.

---

### 19. Type-suffix tautology

#### 19.1 `SecurableType` enum with field `securableType: SecurableType`
(model.ts:28, 117, 192, 356) — field name tautological with type name.
Defensible (field carries the dynamic value) but worth flagging.

#### 19.2 `CatalogType` enum with field `catalogType: CatalogType`
(model.ts:12, 84, 159, 323) — same pattern.

#### 19.3 `CatalogIsolationMode` enum with field `isolationMode: CatalogIsolationMode`
(model.ts:5, 108, 183, 347) — field-name shortened, type-name keeps the
prefix. Reasonable.

#### 19.4 `DrReplicationStatus` enum with field `status: DrReplicationStatus`
(model.ts:21, 229) — generic field name (`status`) on a typed value.
Either expand the field (`drReplicationStatus`) or shorten the type
(`ReplicationStatus`).

#### 19.5 `…Info` types with `…info` fields
- `provisioningInfo: ProvisioningInfo`
- `conversionInfo: ConversionInfo`
- `drReplicationInfo: DrReplicationInfo`
- `effectivePredictiveOptimizationFlag: EffectivePredictiveOptimizationFlag`
- `managedEncryptionSettings: EncryptionSettings` (oddly *not* tautological)

The first four are tautological. Acceptable convention; flagged for
completeness.

#### 19.6 Schema-export tautology
`unmarshalCatalogInfoSchema: z.ZodType<CatalogInfo>` (model.ts:394) — the
`Schema` suffix duplicates `z.ZodType<…>`. See §8.5.

---

## Additional / cross-cutting observations

### A. `flattenQueryParams` is defined but unused (utils.ts:123)
Each `listCatalogs` / `getCatalog` / `deleteCatalog` handler builds query
strings inline with `URLSearchParams.append` (client.ts:101-105,
135-139, 175-189). The exported helper `flattenQueryParams` is never
referenced by `client.ts`. Either it's intentionally exported for
consumer use (then it should be documented and reside in `utils` proper)
or it's dead code.

### B. `nameArg` URL substitution silently allows empty string (client.ts:100, 134, 235)
`${req.nameArg ?? ''}` — if `nameArg` is undefined, the URL silently
becomes `/api/2.1/unity-catalog/catalogs/` and the request will fail on
the server. The naming (`nameArg`) and the substitution behaviour
together hide what should be a required parameter. Worth surfacing via
a non-optional type or a typed assertion.

### C. `marshalUpdateCatalogSchema` serialises `nameArg`/`newName` into the body (model.ts:703-705)
`nameArg` is a path parameter — but the marshal schema produces a JSON
field `name_arg`. Either the server tolerates the extra field or this
is a bug. The naming choice (`Arg`) lets the bug hide.

### D. Marshal/unmarshal exports lack proper TS types (model.ts:534, 546, etc.)
`marshalAzureEncryptionSettingsSchema: z.ZodType` (no generic) versus
`unmarshalAzureEncryptionSettingsSchema: z.ZodType<AzureEncryptionSettings>`
(with generic). The marshal side is implicitly untyped. Not a naming
issue per se, but inconsistent with the unmarshal naming/typing.

### E. `Client` constructor throws bare `Error` for missing `host` (client.ts:55)
"Host is required." — bare `Error`. Not a naming issue, flagged in
passing for the broader review.

### F. `index.ts` re-exports proto-style names verbatim (lines 10, 11, 17, 18, 21, 22, 24, 30, 33, 34)
Every underscore-bearing identifier surfaces in the package's public
API. A consumer of `@databricks/sdk-catalogs/v1` sees
`ConversionInfo_State`, `DeleteCatalog_Response`,
`CatalogInfo_OptionsEntry`, etc. as first-class exports. This is the
single highest-leverage place to clean naming.

---

## File / line index for fast lookup

| Identifier                                              | Location           | Finding |
| ------------------------------------------------------- | ------------------ | ------- |
| `CatalogIsolationMode`                                  | model.ts:5         | 19.3    |
| `CatalogType`                                           | model.ts:12        | 2.4, 17.1, 19.2 |
| `CatalogType.DELTASHARING_CATALOG`                      | model.ts:14        | 3.4     |
| `CatalogType.MANAGED_ONLINE_CATALOG`                    | model.ts:18        | 17.1    |
| `DrReplicationStatus`                                   | model.ts:21        | 2.1, 3.1, 17.2 |
| `SecurableType`                                         | model.ts:28        | 19.1    |
| `SecurableType.STAGING_TABLE` (with TODO comment)       | model.ts:46        | —       |
| `ConversionInfo_State`                                  | model.ts:50        | 2.2, 4.1, 13.1, 17.3 |
| `ProvisioningInfo_State`                                | model.ts:57        | 2.3, 4.2, 13.1, 17.4 |
| `AzureEncryptionSettings`                               | model.ts:67        | 3.2, 18.2 |
| `CatalogInfo`                                           | model.ts:73        | 8.1     |
| `CatalogInfo.options` / `.properties`                   | model.ts:127, 125  | 6.5, 10.1, 11.1, 14.5 |
| `CatalogInfo.fullName`                                  | model.ts:116       | 6.4, 11.2 |
| `CatalogInfo.securableType`                             | model.ts:117       | 11.4, 19.1 |
| `CatalogInfo_OptionsEntry`                              | model.ts:131       | 1.2, 4.3 |
| `CatalogInfo_PropertiesEntry`                           | model.ts:137       | 1.2, 4.3 |
| `ConversionInfo`                                        | model.ts:143       | 1.4, 8.1 |
| `CreateCatalog`                                         | model.ts:148       | 11.5, 15.2 |
| `CreateCatalog_OptionsEntry/PropertiesEntry`            | model.ts:206, 212  | 4.4     |
| `DeleteCatalog.nameArg`                                 | model.ts:219       | 5.1, 13.3, 15.3 |
| `DeleteCatalog_Response`                                | model.ts:225       | 4.6     |
| `DrReplicationInfo`                                     | model.ts:228       | 3.1, 8.1 |
| `DrReplicationInfo.replicatedEntities`                  | model.ts:231       | 1.3, 6.3, 9.2 |
| `DrReplicationInfo.lastFailoverTimeMs`                  | model.ts:237       | 18.7 (positive) |
| `EffectivePredictiveOptimizationFlag`                   | model.ts:240       | 7.1, 7.4, 8.3 |
| `EffectivePredictiveOptimizationFlag.value`             | model.ts:242       | 1.1, 6.1, 10.3, 14.1 |
| `EffectivePredictiveOptimizationFlag.inheritedFromType` | model.ts:244       | 1.5     |
| `EncryptionSettings`                                    | model.ts:253       | 8.2     |
| `EncryptionSettings.customerManagedKeyId`               | model.ts:255       | 3.2, 18.4 |
| `EncryptionSettings.azureKeyVaultKeyId`                 | model.ts:257       | 3.3, 6.2, 18.5 |
| `EncryptionSettings.azureEncryptionSettings`            | model.ts:259       | 6.6, 15.4 |
| `GetCatalog.nameArg`                                    | model.ts:264       | 5.1, 13.3 |
| `ListCatalogs.maxResults`                               | model.ts:281       | —       |
| `ListCatalogs.pageToken`                                | model.ts:283       | —       |
| `ListCatalogs.includeUnbound`                           | model.ts:288       | —       |
| `ListCatalogs_Response`                                 | model.ts:292       | 4.7     |
| `ProvisioningInfo`                                      | model.ts:303       | 1.4, 8.1 |
| `UpdateCatalog.nameArg/newName/name`                    | model.ts:310-314   | 5.1, 11.3, 15.1 |
| `UpdateCatalog_OptionsEntry/PropertiesEntry`            | model.ts:370, 376  | 4.5     |
| `unmarshalDeleteCatalog_ResponseSchema`                 | model.ts:468       | 4.8     |
| `unmarshalListCatalogs_ResponseSchema`                  | model.ts:515       | 4.8     |
| `Client` (bare name)                                    | client.ts:44       | 13.2    |
| `Client.listCatalogsIter`                               | client.ts:210      | 9.1     |
| `${req.nameArg ?? ''}` URL substitution                 | client.ts:100,134,235 | B    |
| `flattenQueryParams` (unused export)                    | utils.ts:123       | A       |
| `marshal…` / `unmarshal…` verbs                         | model.ts (many)    | 13.6    |
| `…Schema` suffix                                        | model.ts (many)    | 8.5, 19.6 |
| `index.ts` re-exports                                   | index.ts:5-35      | F       |

---

## Recommended priority order

1. **Fix `nameArg` / `name` / `newName` triple on `UpdateCatalog`** — biggest user-facing trap. (§15.1, §5.1)
2. **Strip `STATE_` / `DR_REPLICATION_STATUS_` / `_CATALOG` redundant prefixes from enum values.** (§2.1, §2.2, §2.3, §2.4)
3. **Drop proto-style `Parent_Child` identifiers** (`ConversionInfo_State`, `DeleteCatalog_Response`, `ListCatalogs_Response`, `*_OptionsEntry`, `*_PropertiesEntry`). (§4)
4. **Distinguish or merge `options` and `properties`.** (§11.1)
5. **Disambiguate `azureKeyVaultKeyId` (URL vs ID).** (§3.3, §6.2)
6. **Strip read-only fields from `CreateCatalog`/`UpdateCatalog`.** (§15.2)
7. **Decide CMK casing and apply uniformly.** (§3.2, §18.4)
8. **Rename `replicatedEntities` to reflect that it's a byte blob.** (§1.3)
9. **Either document or remove the unused `flattenQueryParams` export.** (Cross-cutting A)
