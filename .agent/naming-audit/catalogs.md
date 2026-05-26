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
The most pervasive problems are (1) the cryptic `nameArg` path-parameter
field, and (2) massive `Create*Request`/`Update*Request` shapes that include
read-only output fields (`createdAt`, `createdBy`, `provisioningInfo`,
`securableType`, `fullName`, etc.) that have no business in a write request.

---

## Findings

### 1. Vague / generic names

#### 1.1 `inheritedFromType` / `inheritedFromName` (model.ts:203, 205)
`Type` here is a free-form `string`, not the `SecurableType` enum that
governs the rest of the package. The name `inheritedFromType` suggests an
enum/typed handle but is in fact human-readable text. Misleading — see
also §5.

---

### 2. Acronym casing inconsistencies (UC, CMK, AKV)

#### 2.1 `azureCmkAccessConnectorId`, `azureCmkManagedIdentityId` (model.ts:55, 56)
CMK ("Customer Managed Key") is consistently cased `Cmk` here. The same
concept is spelled out elsewhere as `customerManagedKeyId`
(EncryptionSettings.customerManagedKeyId — model.ts:214). Pick one:
either use the acronym everywhere (`azureCmkAccessConnectorId`,
`cmkId`) or expand it everywhere
(`azureCustomerManagedKeyAccessConnectorId`, `customerManagedKeyId`).

#### 2.2 `azureKeyVaultKeyId` vs comment "AKV URL" (model.ts:216)
Field is `azureKeyVaultKeyId` but the doc comment says "the AKV URL in
Azure". The field name and doc must agree on whether the value is a URL
or an ID — they currently contradict each other. See also §5.2.

#### 2.3 `DELTASHARING_CATALOG` enum variant (model.ts:13)
"Delta Sharing" is two words. Variant runs them together as
`DELTASHARING_CATALOG`. Should be `DELTA_SHARING_CATALOG` to match the
multi-word casing applied elsewhere in the same enum
(`MANAGED_ONLINE_CATALOG`).

---

### 3. Cryptic abbreviations

#### 3.1 `nameArg` (model.ts:191, 223, 269)
Used as the catalog name path-parameter on `DeleteCatalogRequest`,
`GetCatalogRequest`, and `UpdateCatalogRequest`. The `Arg` suffix is jargon
from the Go generator distinguishing path arguments from request-body
fields with the same key. TypeScript callers have no need for this
distinction — the field is the catalog name and should be named `name`
(or `catalogName` if a sibling `name` field is required for body
symmetry). Today, `UpdateCatalogRequest` has *both* `nameArg` (path) and
`name` (body) — virtually guaranteeing user confusion. See also §8.1.

#### 3.2 `Cmk` prefix — see §2.1.

#### 3.3 `Akv` (in `azureKeyVaultKeyId` doc comment, model.ts:216) — see §2.2.

#### 3.4 `pkgJson` (client.ts:19)
Variable name `pkgJson` for `package.json`. Mostly internal — minor — but
worth noting for consistency.

---

### 4. Misleading names

#### 4.1 `EffectivePredictiveOptimizationFlag.value` "string" carries enum-like semantics
The field is typed `string | undefined` but the comment ("Whether predictive
optimization should be enabled…") implies a tri-state (enabled / disabled /
inherit). Either the type should be an enum (`PredictiveOptimizationFlag`)
or the field should be named explicitly (`enabled: string`).

#### 4.2 `azureKeyVaultKeyId` is described as a URL (model.ts:215-216)
Field is named `…Id` but doc says "the AKV URL in Azure". Either rename to
`azureKeyVaultKeyUri` or fix the doc to match. Today the name lies about
what the field holds.

#### 4.3 `CatalogInfo.fullName` "Corresponds with the name field" (model.ts:101-102)
The doc explicitly states that `fullName` equals `name` for catalogs.
The field exists only to satisfy the parent `Securable` contract. This is
arguably acceptable (UC is column-uniform across securables) but the name
misleads — it promises richer information than `name` provides.

#### 4.4 `CatalogInfo.options` vs `CatalogInfo.properties` (model.ts:106-109)
Both are `Record<string, string>` with identical doc comments ("A map of
key-value properties attached to the securable."). There is no way for a
caller to know what distinguishes them. The doc duplication is verbatim
in `CreateCatalogRequest` (171-174) and `UpdateCatalogRequest` (318-321).
Either is underspecified or one of them is misnamed.

---

### 5. Overly verbose

#### 5.1 `EffectivePredictiveOptimizationFlag` (model.ts:199)
Identifier is 39 characters. Compounded by the field name
`effectivePredictiveOptimizationFlag` (model.ts:95, 160, 307) used on
three different request/response types. `EffectivePOFlag` or
`EffectivePredictiveOptFlag` is overkill the other way; consider
`EffectivePredictiveOptimization` (no `Flag` since the type already wraps
the flag).

#### 5.2 `enablePredictiveOptimization: string` (model.ts:69, 134, 281)
Long field name for a single flag value. Acceptable, but tracked because
it pairs with §5.1 to make every `CatalogInfo`-style object verbose.

---

### 6. Redundant suffixes

#### 6.1 `…Info` types (`CatalogInfo`, `ProvisioningInfo`)
"Info" is a non-suffix — it carries no semantic content. In the Go SDK
this distinguishes the entity type from the resource handle; in JS/TS the
convention is to drop it (`Catalog`, `Provisioning`).

#### 6.2 `Flag` suffix on `EffectivePredictiveOptimizationFlag`
The whole type *is* the flag; the suffix is redundant. See §5.1.

#### 6.3 `…Arg` suffix on `nameArg` — see §3.1 and §8.1.

---

### 7. Reserved-word collisions

#### 7.1 `options` field on `CatalogInfo`, `CreateCatalogRequest`, `UpdateCatalogRequest` (model.ts:109, 174, 321)
`options` collides with the SDK's own `CallOptions` parameter name used
throughout the client (e.g. `createCatalog(req, options)`). The collision
is not a compile error but creates cognitive load — inside
`updateCatalog(req, options)` the reader sees both `req.options` (catalog
metadata) and `options` (call options). Rename one. The least invasive
fix is renaming the second client parameter to `callOptions`. See also
§8.1 for the duplicate-with-`properties` concern.

#### 7.2 `name` keyword-ish field
`name` is used as a non-path-param body field on `Create*Request` /
`Update*Request` / `CatalogInfo`, and also as a path arg via `nameArg`.
This isn't a reserved word but it routinely shadows
`Function.prototype.name` and is a common source of confusion when
callers spread request objects. See also §3.1.

---

### 8. Duplicate concepts

#### 8.1 `properties` and `options` (model.ts:106-109, 171-174, 318-321)
Both `Record<string, string>` on every catalog shape, with identical doc
comments ("A map of key-value properties attached to the securable.").
There is no way for a caller to know which to use for what. Either the
docs need to differentiate them or one is redundant. See also §4.4.

#### 8.2 `name` vs `fullName` on `CatalogInfo`
`fullName` is documented as "the full name of the catalog. Corresponds
with the name field" (model.ts:101-102). The same data lives in `name`
for catalogs because catalogs are top-level. The duplicate field exists
to satisfy a polymorphic Securable shape — but for the catalog-specific
type, it's redundant. See also §4.3.

#### 8.3 `name` vs `nameArg` on `UpdateCatalogRequest`
The `UpdateCatalogRequest` has *both* `nameArg` (the existing catalog
identifier, used in the URL path) and `name` (the new desired name,
used in the body). It also has `newName` for the same concept. See
§9.1 below — three name-like fields on one request shape.

#### 8.4 `securableType` on `CatalogInfo` (model.ts:103) duplicates the type identity
`CatalogInfo` represents a catalog; its `securableType` field will
always be `SecurableType.CATALOG`. The field exists for polymorphism
across UC types but is meaningless when the surrounding type already
identifies the securable. Not a renaming issue — but worth flagging
as a duplicated concept.

#### 8.5 `CreateCatalogRequest`, `UpdateCatalogRequest`, and `CatalogInfo` share ~25 fields verbatim
The three types are 95% identical and have largely identical doc strings.
This is a generator artifact, but it bleeds into naming: any rename of
`storageRoot` must happen in three places. Recommend basing
`CreateCatalogRequest`/`UpdateCatalogRequest` on `Partial<CatalogInfo>`
or a shared `CatalogProperties` mixin.

---

### 9. Field contradicting type domain

#### 9.1 `UpdateCatalogRequest` has `nameArg`, `name`, and `newName` (model.ts:269, 271, 273)
Three name-bearing fields on a single update request:
- `nameArg` — existing catalog (path param).
- `newName` — new desired name (body).
- `name` — also "name of catalog" per the inherited doc (model.ts:272).

A caller staring at this struct cannot intuit which to set. This is the
single most user-hostile naming pattern in the package — and it sits on
the most-used method.

#### 9.2 `CreateCatalogRequest` contains read-only output fields
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`provisioningInfo`, `fullName`, `securableType`,
`effectivePredictiveOptimizationFlag`, `browseOnly` (model.ts:147-168).
These are server-populated; a creator setting them is at best ignored.
The type's domain is "create request", but its shape contradicts that.
Mirror issue in `UpdateCatalogRequest`.

#### 9.3 `DeleteCatalogRequest.nameArg` — see §3.1.

---

### 10. Underspecified IDs

#### 10.1 `customerManagedKeyId` (model.ts:214)
Doc: "the CMK uuid in AWS and GCP, null otherwise." So the field is a
UUID on AWS/GCP but `azureCmkAccessConnectorId` is an Azure resource ID
elsewhere — same conceptual ID, two formats, no unifying name.

#### 10.2 `azureKeyVaultKeyId` (model.ts:216)
Doc says "the AKV URL in Azure" — so it's actually a URL, not an ID. See
§4.2.

---

### 11. Type-suffix tautology

#### 11.1 `SecurableType` enum with field `securableType: SecurableType`
(model.ts:21, 103, 168, 315) — field name tautological with type name.
Defensible (field carries the dynamic value) but worth flagging.

#### 11.2 `CatalogType` enum with field `catalogType: CatalogType`
(model.ts:11, 70, 135, 282) — same pattern.

#### 11.3 `CatalogIsolationMode` enum with field `isolationMode: CatalogIsolationMode`
(model.ts:5, 94, 159, 306) — field-name shortened, type-name keeps the
prefix. Reasonable.

#### 11.4 `…Info` types with `…info` fields
- `provisioningInfo: ProvisioningInfo`
- `effectivePredictiveOptimizationFlag: EffectivePredictiveOptimizationFlag`
- `managedEncryptionSettings: EncryptionSettings` (oddly *not* tautological)

The first two are tautological. Acceptable convention; flagged for
completeness.

---

### 12. Bare `Client` class name (client.ts:44)
`Client` (rather than `CatalogsClient`) is a Go-idiom: package qualifies
the type. JS consumers commonly import as
`import {Client} from '@databricks/sdk-catalogs/v1'` and have to alias.
This is a package-wide convention, but worth flagging in this audit
for consistency with the broader review.

---

### 13. Proto-architectural leaks

#### 13.1 `ProvisioningInfo_State` — model.ts:43
- **Why:** Underscore-separated identifier signals a nested protobuf enum
  (`message ProvisioningInfo { enum State { ... } }`). The transport
  encoding has bled into the public type name and the `eslint-disable`
  comment on the same line explicitly acknowledges it.
- **Category:** Proto suffix/infix.
- **Suggested:** `ProvisioningState`.
- **Rationale:** TS callers have no nesting; the parent prefix plus
  `State` produces a flat, idiomatic identifier without leaking the
  proto-nested origin.

#### 13.2 `CatalogInfo_OptionsEntry` — model.ts:113
- **Why:** Auto-generated proto map-entry message exposed as a public
  type. `_OptionsEntry` is the canonical protobuf shape for
  `map<string, string> options` and has no semantic meaning at the
  TypeScript SDK boundary.
- **Category:** Proto suffix/infix.
- **Suggested:** Remove from the public surface (the `options` field is
  already typed as `Record<string, string>`); if a named shape is
  required, use `CatalogOption` or inline `{key, value}`.
- **Rationale:** Map-entry types are a proto serialization artifact, not
  a domain concept.

#### 13.3 `CatalogInfo_PropertiesEntry` — model.ts:119
- **Why:** Same as 13.2 — proto map-entry leak for the `properties`
  field.
- **Category:** Proto suffix/infix.
- **Suggested:** Remove from the public surface, or rename to
  `CatalogProperty`.
- **Rationale:** Identical reasoning to 13.2.

#### 13.4 `CreateCatalogRequest_OptionsEntry` — model.ts:178
- **Why:** Proto map-entry type duplicated per parent message.
- **Category:** Proto suffix/infix.
- **Suggested:** Remove from the public surface; the inline
  `Record<string, string>` already covers the use case.
- **Rationale:** The fact that the same `_OptionsEntry` shape recurs on
  `CatalogInfo`, `CreateCatalogRequest`, and `UpdateCatalogRequest` is a
  smoking gun for proto codegen, not an SDK design.

#### 13.5 `CreateCatalogRequest_PropertiesEntry` — model.ts:184
- **Why:** Same as 13.4 — proto map-entry leak.
- **Category:** Proto suffix/infix.
- **Suggested:** Remove from the public surface.
- **Rationale:** See 13.4.

#### 13.6 `DeleteCatalogRequest_Response` — model.ts:197
- **Why:** Empty interface whose name literally encodes the proto
  request/response coupling (`<MessageName>_Response`). It exists only
  because protobuf RPC defines a paired response message; the TS SDK
  could return `void` or a plain `{}`/`Record<string, never>`.
- **Category:** Proto suffix/infix; also `Foo_PublicRequest`-style
  paired-name leak.
- **Suggested:** Drop the type and return `void` from `deleteCatalog`,
  or rename to `DeleteCatalogResponse` (no underscore).
- **Rationale:** The underscore-paired name is the protobuf service
  convention; nothing in the JS SDK contract demands it.

#### 13.7 `ListCatalogsRequest_Response` — model.ts:251
- **Why:** Same proto-paired naming as 13.6. The response carries
  `catalogs` and `nextPageToken` and deserves a name describing its
  domain, not its request-pair lineage.
- **Category:** Proto suffix/infix.
- **Suggested:** `ListCatalogsResponse` (drop the underscore) or
  `CatalogPage`.
- **Rationale:** The `Request_Response` underscored pairing is a proto
  artifact and is exported on the public surface (`index.ts:27`).

#### 13.8 `UpdateCatalogRequest_OptionsEntry` — model.ts:325
- **Why:** Proto map-entry leak (third copy of the same shape).
- **Category:** Proto suffix/infix.
- **Suggested:** Remove from the public surface.
- **Rationale:** See 13.4.

#### 13.9 `UpdateCatalogRequest_PropertiesEntry` — model.ts:331
- **Why:** Proto map-entry leak.
- **Category:** Proto suffix/infix.
- **Suggested:** Remove from the public surface.
- **Rationale:** See 13.4.

#### 13.10 `unmarshalDeleteCatalogRequest_ResponseSchema` — model.ts:409
- **Why:** Schema identifier inherits the underscore-paired proto name
  from 13.6, propagating the leak into the marshal/unmarshal surface.
- **Category:** Proto suffix/infix.
- **Suggested:** Rename in lockstep with 13.6 to
  `unmarshalDeleteCatalogResponseSchema`.
- **Rationale:** The schema's identity is derived from the type it
  decodes; fixing 13.6 dictates this rename.

#### 13.11 `unmarshalListCatalogsRequest_ResponseSchema` — model.ts:441
- **Why:** Same as 13.10 — schema name inherits the proto-paired
  underscore.
- **Category:** Proto suffix/infix.
- **Suggested:** Rename in lockstep with 13.7 to
  `unmarshalListCatalogsResponseSchema`.
- **Rationale:** See 13.10.

---

## Additional / cross-cutting observations

### A. `flattenQueryParams` is defined but unused (utils.ts:123)
Each `listCatalogs` / `getCatalog` / `deleteCatalog` handler builds query
strings inline with `URLSearchParams.append` (client.ts:101-105,
138-141, 179-191). The exported helper `flattenQueryParams` is never
referenced by `client.ts`. Either it's intentionally exported for
consumer use (then it should be documented and reside in `utils` proper)
or it's dead code.

### B. `nameArg` URL substitution silently allows empty string (client.ts:100, 137, 241)
`${req.nameArg ?? ''}` — if `nameArg` is undefined, the URL silently
becomes `/api/2.1/unity-catalog/catalogs/` and the request will fail on
the server. The naming (`nameArg`) and the substitution behaviour
together hide what should be a required parameter. Worth surfacing via
a non-optional type or a typed assertion.

### C. `Client` constructor throws bare `Error` for missing `host` (client.ts:55)
"Host is required." — bare `Error`. Not a naming issue, flagged in
passing for the broader review.

---

## File / line index for fast lookup

| Identifier                                              | Location           | Finding |
| ------------------------------------------------------- | ------------------ | ------- |
| `CatalogIsolationMode`                                  | model.ts:5         | 11.3    |
| `CatalogType`                                           | model.ts:11        | 11.2    |
| `CatalogType.DELTASHARING_CATALOG`                     | model.ts:13        | 2.3     |
| `SecurableType`                                         | model.ts:21        | 11.1    |
| `SecurableType.STAGING_TABLE` (with TODO comment)       | model.ts:39        | —       |
| `AzureEncryptionSettings`                               | model.ts:53        | 2.1     |
| `CatalogInfo`                                           | model.ts:59        | 6.1     |
| `CatalogInfo.options` / `.properties`                   | model.ts:109, 107  | 4.4, 7.1, 8.1 |
| `CatalogInfo.fullName`                                  | model.ts:102       | 4.3, 8.2 |
| `CatalogInfo.securableType`                             | model.ts:103       | 8.4, 11.1 |
| `CreateCatalogRequest`                                  | model.ts:124       | 8.5, 9.2 |
| `DeleteCatalogRequest.nameArg`                          | model.ts:191       | 3.1, 9.3 |
| `EffectivePredictiveOptimizationFlag`                   | model.ts:199       | 5.1, 6.2 |
| `EffectivePredictiveOptimizationFlag.value`             | model.ts:201       | 4.1     |
| `EffectivePredictiveOptimizationFlag.inheritedFromType` | model.ts:203       | 1.1     |
| `EncryptionSettings.customerManagedKeyId`               | model.ts:214       | 2.1, 10.1 |
| `EncryptionSettings.azureKeyVaultKeyId`                 | model.ts:216       | 2.2, 4.2, 10.2 |
| `GetCatalogRequest.nameArg`                             | model.ts:223       | 3.1     |
| `ListCatalogsRequest.maxResults`                        | model.ts:240       | —       |
| `ListCatalogsRequest.pageToken`                         | model.ts:242       | —       |
| `ListCatalogsRequest.includeUnbound`                    | model.ts:247       | —       |
| `ProvisioningInfo`                                      | model.ts:262       | 6.1     |
| `UpdateCatalogRequest.nameArg/newName/name`             | model.ts:269-273   | 3.1, 8.3, 9.1 |
| `ProvisioningInfo_State` (proto-nested enum)            | model.ts:43        | 13.1    |
| `CatalogInfo_OptionsEntry`                              | model.ts:113       | 13.2    |
| `CatalogInfo_PropertiesEntry`                           | model.ts:119       | 13.3    |
| `CreateCatalogRequest_OptionsEntry`                     | model.ts:178       | 13.4    |
| `CreateCatalogRequest_PropertiesEntry`                  | model.ts:184       | 13.5    |
| `DeleteCatalogRequest_Response`                         | model.ts:197       | 13.6    |
| `ListCatalogsRequest_Response`                          | model.ts:251       | 13.7    |
| `UpdateCatalogRequest_OptionsEntry`                     | model.ts:325       | 13.8    |
| `UpdateCatalogRequest_PropertiesEntry`                  | model.ts:331       | 13.9    |
| `unmarshalDeleteCatalogRequest_ResponseSchema`          | model.ts:409       | 13.10   |
| `unmarshalListCatalogsRequest_ResponseSchema`           | model.ts:441       | 13.11   |
| `Client` (bare name)                                    | client.ts:44       | 12      |
| `${req.nameArg ?? ''}` URL substitution                 | client.ts:100,137,241 | B    |
| `flattenQueryParams` (unused export)                    | utils.ts:123       | A       |

---

## Recommended priority order

1. **Fix `nameArg` / `name` / `newName` triple on `UpdateCatalogRequest`** — biggest user-facing trap. (§9.1, §3.1)
2. **Distinguish or merge `options` and `properties`.** (§8.1)
3. **Disambiguate `azureKeyVaultKeyId` (URL vs ID).** (§2.2, §4.2)
4. **Strip read-only fields from `CreateCatalogRequest`/`UpdateCatalogRequest`.** (§9.2)
5. **Decide CMK casing and apply uniformly.** (§2.1, §10.1)
6. **Either document or remove the unused `flattenQueryParams` export.** (Cross-cutting A)

---
