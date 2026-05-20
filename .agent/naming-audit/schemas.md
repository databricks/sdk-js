# Naming Audit: `schemas` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/schemas/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog (UC) — schemas (the level beneath catalogs, parents of tables/views/functions).

---

## Summary

The `schemas` package exposes the standard five UC schema operations
(`createSchema`, `deleteSchema`, `getSchema`, `listSchemas`,
`updateSchema`). The package is small (one
enum, one nested-flag type, the schema info type, five request types,
two response types). Because it is a 1:1
port of the Go SDK, most issues are inherited from upstream proto
definitions: the most pervasive problems are (1) `fullNameArg` as a
cryptic path parameter that coexists with `fullName` on the same type,
(2) `CreateSchema`/`UpdateSchema` carrying read-only server-populated
fields, and (3) the `CatalogType` enum living on a schema-only type
even though every variant duplicates the `_CATALOG` suffix that the
enum name already provides. There is also significant duplicate-concept
overlap with the sibling `systemschemas` package (separate types
`SchemaInfo` vs `SystemSchemaInfo`, separate clients, separate methods)
that the audit calls out at the package boundary.

---

## Findings

### 1. Vague / generic names

#### 1.1 `EffectivePredictiveOptimizationFlag.value` (model.ts:81)
The flag wrapper exposes a single payload field named `value` — the
doc comment says "Whether predictive optimization should be enabled for
this object and objects under it". The name conveys nothing about
*what kind of value*; the type is `string` but the semantic is a
tri-state (enable / disable / inherit). A reader has to read the doc
to discover what is in it. Better: `enabled`, `setting`, or
`predictiveOptimization`.

#### 1.2 `EffectivePredictiveOptimizationFlag.inheritedFromType` and `.inheritedFromName` (model.ts:83, 85)
`inheritedFromType` is `string`, not an enum — the name suggests a
typed handle but the value is human-readable text. Same problem for
`inheritedFromName`: "the name of the object" — of *what* object?
Without context (`catalog`, `schema`, `metastore`?) the field is
opaque. See also §6.1.

#### 1.3 `name` on `CreateSchema`, `SchemaInfo`, `UpdateSchema` (model.ts:17, 126, 184)
`name` alone is generic in the context of UC where there's also
`fullName`, `catalogName`, `newName`, and `metastoreId`. The doc
qualifies it as "Name of schema, relative to parent catalog", but the
identifier itself doesn't say that. Compare to `catalogName` on the
same shape which is unambiguous. See also §8.2 and §10.2.

---

### 2. Redundant enum prefixes

#### 2.1 `CatalogType.*_CATALOG` (model.ts:6-13)
All six variants end in `_CATALOG`:

- `MANAGED_CATALOG`
- `DELTASHARING_CATALOG`
- `SYSTEM_CATALOG`
- `INTERNAL_CATALOG`
- `FOREIGN_CATALOG`
- `MANAGED_ONLINE_CATALOG`

Read aloud: `CatalogType.MANAGED_CATALOG`. The `_CATALOG` suffix is
redundant — `MANAGED`, `DELTA_SHARING`, `SYSTEM`, `INTERNAL`,
`FOREIGN`, `MANAGED_ONLINE` carries the same meaning. (`DELTASHARING`
also runs two words together — see §3.1.) The enum is duplicated
verbatim from the `catalogs` package — even though *this* package is
about schemas, it imports the catalog-type enum and exposes it as
`SchemaInfo.catalogType`. See §10.4 for the duplication.

---

### 3. Acronym casing inconsistencies

#### 3.1 `DELTASHARING_CATALOG` enum variant (model.ts:8)
"Delta Sharing" is two words; the variant runs them together as
`DELTASHARING_CATALOG`. Should be `DELTA_SHARING_CATALOG` — or just
`DELTA_SHARING` after stripping the `_CATALOG` suffix (§2.1).

#### 3.2 "UC" / "Unity Catalog" inconsistency in URLs and doc text
The endpoint path is `/api/2.1/unity-catalog/schemas` (client.ts:77,
106, etc.) and the package docs spell out "Unity Catalog" / "the
Metastore" (client.ts:71). No identifier in the package uses `UC` —
only doc comments. Minor inconsistency, but flagged for cross-package
review.

---

### 4. Cryptic abbreviations

#### 4.1 `fullNameArg` (model.ts:71, 90, 180)
Path-parameter field on `DeleteSchema`, `GetSchema`, and
`UpdateSchema`. The `Arg` suffix is Go-generator jargon distinguishing
path arguments from request-body fields with the same key. TypeScript
callers have no need for this distinction — the field *is* the schema
identifier and should just be `fullName` (or `name`). Even worse:
`UpdateSchema` has *both* `fullNameArg` (path) and `fullName` (body)
on the same type, with no obvious difference in semantics. See §14.1.

#### 4.2 `pkgJson` (client.ts:19)
Variable name `pkgJson` for `package.json` import. Mostly internal —
minor — but worth noting for consistency.

#### 4.3 `req`, `resp`, `opts` (client.ts and utils.ts throughout)
Internal abbreviations. Conventional, but worth flagging for the
broader audit.

---

### 5. Misleading names

#### 5.1 `EffectivePredictiveOptimizationFlag.value` is a tri-state encoded as `string` (model.ts:81)
Field is typed `string | undefined` but the doc comment ("Whether
predictive optimization should be enabled…") implies a small discrete
set of values (enable / disable / inherit). Either expose an enum or
rename the field to make it clear it's a setting key. See also §1.1.

#### 5.2 `SchemaInfo.fullName` corresponds with `name` + `catalogName` (model.ts:139)
The doc is honest: "Full name of schema, in form of
__catalog_name__.__schema_name__". But the field name `fullName`
suggests it might carry additional information not available from
`name`+`catalogName`. It doesn't. See also §10.2.

#### 5.3 `SchemaInfo.options` vs `SchemaInfo.properties` (model.ts:161-164)
Both are `Record<string, string>` with identical doc comments ("A map
of key-value properties attached to the securable."). There is no way
for a caller to know which to use for what. The doc duplication recurs
verbatim in `CreateSchema` (model.ts:51-54) and `UpdateSchema`
(model.ts:218-221). Either is underspecified or one of them is
misnamed. See §10.1.

---

### 6. Overly verbose

#### 6.1 `EffectivePredictiveOptimizationFlag` type name (model.ts:79)
39 characters. Compounded by `effectivePredictiveOptimizationFlag` as
a field name on three different request/response shapes (model.ts:44,
153, 211). Consider `EffectivePredictiveOptimization` (drop the
`Flag` suffix — the type already wraps the flag) or
`EffectivePOSetting` if shortening is acceptable. See also §7.2.

#### 6.2 `enablePredictiveOptimization: string` (model.ts:27, 136, 194)
Long field name for what is effectively a flag value. Acceptable, but
pairs with §6.1 to make every schema shape verbose.

#### 6.3 `MANAGED_ONLINE_CATALOG` enum value (model.ts:12) — 22 characters; redundant `_CATALOG` per §2.1.

---

### 7. Redundant suffixes

#### 7.1 `SchemaInfo` type name (model.ts:124)
"Info" is a non-suffix — it carries no semantic content. In the Go SDK
this distinguishes the entity type from a resource handle; in TS the
convention is to drop it (`Schema`). Compare with `Catalog`, `Table`,
etc. in other packages. Note: dropping `Info` produces `Schema`, which
collides with the zod artifact `Schema` (a runtime validator type in
common use across the JS ecosystem) — the rename must consider that
collision before landing.

#### 7.2 `Flag` suffix on `EffectivePredictiveOptimizationFlag` (model.ts:79)
The whole type *is* the flag; the suffix is redundant. See §6.1.

#### 7.3 `Arg` suffix on `fullNameArg` — see §4.1 and §14.1.

---

### 8. Singular / plural mismatches

_None._

---

### 9. Reserved-word collisions

#### 9.1 `options` field on `CreateSchema`, `UpdateSchema`, `SchemaInfo` (model.ts:54, 163, 221)
`options` collides with the SDK's own `CallOptions` parameter name
used throughout the client (`createSchema(req, options)`, client.ts:74,
etc.). Not a compile error but creates cognitive load — inside
`createSchema(req, options)` the reader sees both `req.options`
(schema metadata) and `options` (call options). The cleanest fix is to
rename the client parameter to `callOptions`. See also §10.1 for the
duplicate-with-`properties` concern.

#### 9.2 `name` field is generic and shadows `Function.prototype.name`
Used on `CreateSchema`, `UpdateSchema`, `SchemaInfo` (model.ts:17, 184,
126). Not a reserved word, but commonly shadows the standard
`Function.prototype.name` and routinely confuses callers who spread
request objects. See also §1.3.

#### 9.3 `value` field on `EffectivePredictiveOptimizationFlag.value` (model.ts:81)
Generic field name, frequently shadows local variables. See §1.1.

#### 9.4 `properties` is not reserved but conflicts with `Object` semantics
`SchemaInfo.properties` (model.ts:161) is fine but worth noting that
`properties` is a heavily-overloaded term in JS (object properties,
descriptor properties, etc.). Combined with the duplicate-with-`options`
problem in §10.1, the name is doubly overloaded.

---

### 10. Duplicate concepts

#### 10.1 `properties` vs `options` (model.ts:51-54, 161-164, 218-221)
Both `Record<string, string>` on every schema shape, with identical
doc comments ("A map of key-value properties attached to the
securable."). Either the documentation needs to differentiate them or
one is redundant. See also §5.3.

#### 10.2 `name` vs `fullName` on `SchemaInfo` (model.ts:126, 139)
`name` is the schema name "relative to parent catalog"; `fullName` is
"in form of __catalog_name__.__schema_name__". These two fields are
deterministically derivable from each other (given `catalogName`).
Mirror issue in `CreateSchema` (model.ts:17, 31) and `UpdateSchema`
(model.ts:184, 197). See also §5.2.

#### 10.3 `fullName` vs `fullNameArg` on `UpdateSchema` (model.ts:180, 197)
The `UpdateSchema` request has **both** `fullNameArg` (the existing
schema identifier, path param) and `fullName` (the same field name on
the body) — plus `newName` for renaming. Three fields all touching
the schema's identity. See §14.1.

#### 10.4 `CatalogType` is re-implemented across packages
The exact `CatalogType` enum (with all six variants) is defined here
(model.ts:6-13) and also in `catalogs` (and likely in several other UC
packages). A consumer touching both packages gets two unrelated TS
types named `CatalogType`. Cross-package duplication — flagged in
this audit for the broader review.

#### 10.5 `EffectivePredictiveOptimizationFlag` may be duplicated
This type is identical to the one in `catalogs` (and probably in any
UC securable package). Cross-package duplication.

#### 10.6 `CreateSchema`, `UpdateSchema`, and `SchemaInfo` share ~21 fields verbatim
All three types are 95% identical with identical doc strings. This is
a generator artefact, but any rename of `storageRoot` must happen in
three places. Recommend basing `CreateSchema`/`UpdateSchema` on
`Partial<SchemaInfo>` or a shared `SchemaProperties` mixin.

#### 10.7 Overlap with `systemschemas` package
The sibling `systemschemas` package operates on a completely different
shape (`SystemSchemaInfo` has only `schema` and `state` — no overlap
with `SchemaInfo`). Same noun, different types, different clients,
different methods. A consumer might reasonably expect one client to
handle both kinds of schemas; instead they must import two packages.
At minimum, the type names should be sufficiently distinguishable —
`SchemaInfo` vs `SystemSchemaInfo` is fine, but the *package* names
(`@databricks/sdk-schemas` vs `@databricks/sdk-systemschemas`) are
trap-shaped: a consumer who imports the first expecting "all schemas"
will be surprised to find that system schemas live elsewhere.

---

### 11. Verb-tense inconsistency

#### 11.1 Client methods: `createSchema`, `deleteSchema`, `getSchema`, `listSchemas`, `updateSchema`, `listSchemasIter`. Imperative present, consistent.

#### 11.2 `executeCall`, `executeHttpCall`, `buildHttpRequest`, `readAll`, `flattenQueryParams` (utils.ts) — all imperative present, consistent.

No verb-tense inconsistencies found across the package.

---

### 12. Go / Java-style names

#### 12.1 `…Info` suffix (`SchemaInfo`, `EffectivePredictiveOptimizationFlag`)
Java/Go style. TS convention is to drop it. See §7.1.

#### 12.2 `Client` class name (client.ts:44)
Bare `Client` (rather than `SchemasClient`) is a Go-idiom: package
qualifies the type. JS consumers commonly import as
`import {Client} from '@databricks/sdk-schemas/v1'` and have to alias.
Package-wide convention; flagged for the broader review.

#### 12.3 `fullNameArg` — Go-generator naming. See §4.1.

#### 12.4 `package_segment` / `PACKAGE_SEGMENT` (client.ts:39)
Constant naming is fine; flagged for completeness.

---

### 13. Generic field names losing meaning

#### 13.1 `value` on `EffectivePredictiveOptimizationFlag` — see §1.1.

#### 13.2 `name` on three different schema shapes — see §1.3.

#### 13.3 `properties`, `options` (model.ts:51, 53, 161, 163, 218, 220) — see §5.3, §10.1.

#### 13.4 `comment` (model.ts:23, 132, 190)
"User-provided free-form text description." `comment` is too informal
for a documented free-text description on a metadata API.
`description` would be more honest about its purpose.

---

### 14. Field contradicting type domain

#### 14.1 `UpdateSchema` has `fullNameArg`, `fullName`, `name`, and `newName` (model.ts:180, 184, 197, 182)
Four name-bearing fields on a single update request:

- `fullNameArg` — existing schema identifier (path param).
- `name` — "Name of schema, relative to parent catalog" (body).
- `fullName` — "Full name of schema, in form of catalog.schema" (body).
- `newName` — "New name for the schema" (body).

A caller staring at this struct cannot reasonably intuit which to set
to rename the schema. (The answer is `newName`, with `fullNameArg`
identifying the existing schema; the others are vestigial in the
update context.) This is the single most user-hostile naming pattern
in the package — and it sits on the most-used mutation method.

#### 14.2 `CreateSchema` contains read-only output fields (model.ts:32-50)
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`fullName`, `catalogType`, `effectivePredictiveOptimizationFlag`,
`schemaId`, `browseOnly`. These are server-populated; a creator
setting them is at best ignored. The type's domain is "create
request", but its shape contradicts that. Same mirror issue in
`UpdateSchema` (model.ts:199-217).

#### 14.3 `DeleteSchema.fullNameArg` — see §4.1.

#### 14.4 `GetSchema.fullNameArg` (model.ts:90)
Same as 14.3.

---

### 15. Inconsistent action verbs

Method verbs in `Client`: `createSchema`, `deleteSchema`, `getSchema`,
`listSchemas`, `updateSchema`. Verbs are consistent — standard CRUD.
No `fetch…` / `retrieve…` / `read…` outliers. No issues found.

---

### 16. Long enum values

#### 16.1 `CatalogType.MANAGED_ONLINE_CATALOG` (model.ts:12)
22-character enum value. Should be `MANAGED_ONLINE` after dropping the
redundant `_CATALOG` suffix (§2.1).

#### 16.2 `CatalogType.DELTASHARING_CATALOG` (model.ts:8)
20-character value; redundant suffix + run-together words. See §3.1.

#### 16.3 Other `CatalogType` variants
`MANAGED_CATALOG` (15), `SYSTEM_CATALOG` (14), `INTERNAL_CATALOG`
(16), `FOREIGN_CATALOG` (15). All have redundant `_CATALOG` suffix.
See §2.1.

---

### 17. Underspecified IDs

#### 17.1 `metastoreId` (model.ts:29, 138, 196)
Documented as "unique identifier of parent metastore". Format opaque
(UUID? slug?). Acceptable but unspecified.

#### 17.2 `schemaId` (model.ts:48, 157, 215)
"The unique identifier of the schema." No format hint (UUID?). The
field exists alongside `fullName` (which is also a unique identifier
in a different sense). Two simultaneous IDs without disambiguation.

#### 17.3 `createdAt` / `updatedAt` (model.ts:33, 37, 142, 146, 200, 204)
Type is `number` (epoch milliseconds, per the doc). The unit is not
encoded in the field name. `createdAtMs` / `updatedAtMs` would be
more honest. (Compare to `lastFailoverTimeMs` in `catalogs`, which
gets this right — see catalogs.md §19.7.)

#### 17.4 `createdBy` / `updatedBy` (model.ts:35, 39, 144, 148, 202, 206)
Type is `string` — "Username of schema creator" / "Username of user
who last modified schema". Underspecified: is this a username, an
email, a principal ID? `createdByUsername` would be clearer.

#### 17.5 `inheritedFromType` / `inheritedFromName` on `EffectivePredictiveOptimizationFlag` (model.ts:83, 85)
Both `string`. `inheritedFromType` could be one of the UC securable
types, but the field is not enum-typed. `inheritedFromName` is opaque
text. See also §1.2.

---

### 18. Type-suffix tautology

#### 18.1 `CatalogType` enum with field `catalogType: CatalogType`
(model.ts:6, 41, 150, 208) — field name tautological with type name.
Defensible (field carries the dynamic value) but worth flagging.

#### 18.2 `SchemaInfo` doesn't carry a `schemaType` field — no tautology there, which is a relief.

#### 18.3 `EffectivePredictiveOptimizationFlag` with field `effectivePredictiveOptimizationFlag: EffectivePredictiveOptimizationFlag`
(model.ts:44, 153, 211) — field repeats type name verbatim, 35
characters each. Severe tautology, but defensible because the field
is the only instance of that type in each parent. Could be shortened
to `predictiveOptimization: EffectivePredictiveOptimization` (drop
"Flag" per §7.2 and "effective" per §6.1).

---

## Additional / cross-cutting observations

### A. `flattenQueryParams` is defined but unused (utils.ts:123)
Each `listSchemas` / `getSchema` / `deleteSchema` handler builds query
strings inline with `URLSearchParams.append` (client.ts:107-110,
138-141, 179-191). The exported helper `flattenQueryParams` is never
referenced by `client.ts`. Either it's intentionally exported for
consumer use (then it should be documented and reside in `utils`
proper) or it's dead code. Same pattern as `catalogs` package.

### B. `fullNameArg` URL substitution silently allows empty string (client.ts:106, 137, 239)
`${req.fullNameArg ?? ''}` — if `fullNameArg` is undefined, the URL
silently becomes `/api/2.1/unity-catalog/schemas/` and the request
will fail on the server. The naming (`fullNameArg`) and the
substitution behaviour together hide what should be a required
parameter. The type marks it `string | undefined` even though it is
operationally required.

### C. `Client` constructor throws bare `Error` for missing `host` (client.ts:55)
"Host is required." — bare `Error`. Not a naming issue, flagged in
passing for the broader review.

### D. The package name is plural; the entity types are singular
The package is `schemas` (plural); the model types are `Schema` (well,
`SchemaInfo` — singular). The five client methods mix:
`createSchema`/`deleteSchema`/`getSchema`/`updateSchema` (singular —
they act on one) and `listSchemas` (plural — returns many). This is
the same pattern as `catalogs`, `tables`, etc. — consistent across
the SDK.

### E. `SchemaInfo`'s "Next ID: 45" comment (model.ts:123)
The doc comment is a leftover proto field-number management note. It
has no consumer-facing meaning. Should be stripped on the way to TS.

### F. Doc comment for `effectivePredictiveOptimizationFlag` is missing (model.ts:44-46, 153-155, 211-213)
The field has no JSDoc, even though the type has a doc. Three
occurrences. Consistency: every other field has a doc comment.

### G. `enablePredictiveOptimization` is typed `string` not `boolean` (model.ts:27, 136, 194)
The field name says "enable" — suggesting boolean — but the type is
`string`. The actual value is presumably `'ENABLE' | 'DISABLE' |
'INHERIT'` or similar. The name lies about the type. See also §5.1
for the related `EffectivePredictiveOptimizationFlag.value`.

### H. Overlap with `systemschemas` package — see §10.7
A consumer reading "schemas" reasonably expects to find all schema
operations here. They will not find `disableSystemSchema`,
`enableSystemSchema`, or `listSystemSchemas` — those live in
`@databricks/sdk-systemschemas`. Package boundaries follow the
upstream API surface, but the seam is non-obvious to discover.

---

## File / line index for fast lookup

| Identifier                                                  | Location              | Finding              |
| ----------------------------------------------------------- | --------------------- | -------------------- |
| `CatalogType`                                               | model.ts:6            | 2.1, 10.4, 16.x, 18.1|
| `CatalogType.MANAGED_CATALOG`                               | model.ts:7            | 2.1, 16.3            |
| `CatalogType.DELTASHARING_CATALOG`                          | model.ts:8            | 2.1, 3.1, 16.2       |
| `CatalogType.SYSTEM_CATALOG`                                | model.ts:9            | 2.1, 16.3            |
| `CatalogType.INTERNAL_CATALOG`                              | model.ts:10           | 2.1, 16.3            |
| `CatalogType.FOREIGN_CATALOG`                               | model.ts:11           | 2.1, 16.3            |
| `CatalogType.MANAGED_ONLINE_CATALOG`                        | model.ts:12           | 2.1, 16.1            |
| `CreateSchema`                                              | model.ts:15           | 10.6, 14.2           |
| `CreateSchema.name`                                         | model.ts:17           | 1.3, 9.2             |
| `CreateSchema.catalogType`                                  | model.ts:41           | 18.1                 |
| `CreateSchema.effectivePredictiveOptimizationFlag`          | model.ts:44           | 6.1, 18.3, F         |
| `CreateSchema.properties` / `.options`                      | model.ts:52, 54       | 5.3, 9.1, 10.1, 13.3 |
| `DeleteSchema`                                              | model.ts:69           | 14.3                 |
| `DeleteSchema.fullNameArg`                                  | model.ts:71           | 4.1, 12.3, 14.3, B   |
| `EffectivePredictiveOptimizationFlag`                       | model.ts:79           | 6.1, 7.2, 12.1, 18.3 |
| `EffectivePredictiveOptimizationFlag.value`                 | model.ts:81           | 1.1, 5.1, 9.3, 13.1  |
| `EffectivePredictiveOptimizationFlag.inheritedFromType`     | model.ts:83           | 1.2, 17.5            |
| `EffectivePredictiveOptimizationFlag.inheritedFromName`     | model.ts:85           | 1.2, 17.5            |
| `GetSchema.fullNameArg`                                     | model.ts:90           | 4.1, 12.3, 14.4, B   |
| `ListSchemas`                                               | model.ts:95           | —                    |
| `ListSchemas.maxResults`                                    | model.ts:105          | —                    |
| `ListSchemas.pageToken`                                     | model.ts:107          | —                    |
| `ListSchemas.includeBrowse`                                 | model.ts:109          | —                    |
| `SchemaInfo`                                                | model.ts:124          | 7.1, 10.6, 12.1, E   |
| `SchemaInfo.name`                                           | model.ts:126          | 1.3, 9.2             |
| `SchemaInfo.fullName`                                       | model.ts:139          | 5.2, 10.2            |
| `SchemaInfo.createdAt` / `.updatedAt`                       | model.ts:142, 146     | 17.3                 |
| `SchemaInfo.createdBy` / `.updatedBy`                       | model.ts:144, 148     | 17.4                 |
| `SchemaInfo.catalogType`                                    | model.ts:150          | 18.1                 |
| `SchemaInfo.effectivePredictiveOptimizationFlag`            | model.ts:153          | 6.1, 18.3, F         |
| `SchemaInfo.schemaId`                                       | model.ts:157          | 17.2                 |
| `SchemaInfo.properties` / `.options`                        | model.ts:161, 163     | 5.3, 9.1, 10.1, 13.3 |
| `UpdateSchema`                                              | model.ts:178          | 10.3, 10.6, 14.1, 14.2 |
| `UpdateSchema.fullNameArg`                                  | model.ts:180          | 4.1, 10.3, 12.3, 14.1, B |
| `UpdateSchema.newName`                                      | model.ts:182          | 14.1                 |
| `UpdateSchema.name`                                         | model.ts:184          | 1.3, 9.2, 14.1       |
| `UpdateSchema.fullName`                                     | model.ts:197          | 10.2, 10.3, 14.1     |
| `UpdateSchema.effectivePredictiveOptimizationFlag`          | model.ts:211          | 6.1, 18.3, F         |
| `enablePredictiveOptimization` (string-typed bool)          | model.ts:27, 136, 194 | G                    |
| `comment` field                                             | model.ts:23, 132, 190 | 13.4                 |
| `Client` (bare name)                                        | client.ts:44          | 12.2                 |
| `${req.fullNameArg ?? ''}` URL substitution                 | client.ts:106, 137, 239 | B                  |
| `flattenQueryParams` (unused export)                        | utils.ts:123          | A                    |
| Cross-package overlap with `systemschemas`                  | (package boundary)    | 10.7, H              |

---

## Recommended priority order

1. **Fix `fullNameArg` / `fullName` / `name` / `newName` on `UpdateSchema`** — four name-like fields on the same request, the worst user-facing trap in the package. (§14.1, §4.1, §10.3)
2. **Strip the redundant `_CATALOG` suffix from every `CatalogType` variant.** (§2.1, §16.x)
3. **Distinguish or merge `options` and `properties`.** (§10.1, §5.3)
4. **Type `enablePredictiveOptimization` and `EffectivePredictiveOptimizationFlag.value` honestly** — either enum or boolean, not `string`. (§5.1, G)
5. **Strip read-only fields from `CreateSchema`/`UpdateSchema`.** (§14.2)
6. **Either document or remove the unused `flattenQueryParams` export.** (Cross-cutting A)
7. **Encode timestamp units in field names** (`createdAtMs`, `updatedAtMs`). (§17.3)
8. **Disambiguate `schemaId` vs `fullName` as identifiers** — document which is canonical. (§17.2, §10.2)
9. **Resolve the `Schema` vs zod `Schema` collision before renaming `SchemaInfo` to `Schema`.** (§7.1)
10. **Strip the `Next ID: 45` leftover from `SchemaInfo` JSDoc.** (E)
11. **Decide cross-package strategy with `systemschemas`** — at minimum document the seam. (§10.7, H)
