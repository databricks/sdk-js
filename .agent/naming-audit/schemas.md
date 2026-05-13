# Naming Audit: `schemas` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/schemas/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog (UC) — schemas (the level beneath catalogs, parents of tables/views/functions).

---

## Summary

The `schemas` package exposes the standard five UC schema operations
(`createSchema`, `deleteSchema`, `getSchema`, `listSchemas`,
`updateSchema`) plus a paginated iterator. The package is small (one
enum, one nested-flag type, the schema info type, five request types,
two response types, six map-entry wrapper types). Because it is a 1:1
port of the Go SDK, most issues are inherited from upstream proto
definitions: the most pervasive problems are (1) proto-style
underscore-suffixed identifiers in the public TS surface
(`DeleteSchema_Response`, `ListSchemas_Response`, six `*_OptionsEntry`/
`*_PropertiesEntry` wrappers), (2) `fullNameArg` as a cryptic path
parameter that coexists with `fullName` on the same type, (3)
`CreateSchema`/`UpdateSchema` carrying read-only server-populated
fields, and (4) the `CatalogType` enum living on a schema-only type
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
`predictiveOptimization`. Same name appears in marshal/unmarshal
transforms (lines 243, 248, 361, 366).

#### 1.2 `*_OptionsEntry.value` / `*_PropertiesEntry.value` (model.ts:59-66, 167-175, 225-232)
Six proto-generated map-entry wrappers exporting `{ key?: string;
value?: string }`. The field names `key` and `value` are maximally
generic. The wrapper types themselves are dead in the v1 surface
(`SchemaInfo.options`/`.properties` are typed as
`Record<string,string>`, not arrays of these wrappers). See also §11.1.

#### 1.3 `EffectivePredictiveOptimizationFlag.inheritedFromType` and `.inheritedFromName` (model.ts:83, 85)
`inheritedFromType` is `string`, not an enum — the name suggests a
typed handle but the value is human-readable text. Same problem for
`inheritedFromName`: "the name of the object" — of *what* object?
Without context (`catalog`, `schema`, `metastore`?) the field is
opaque. See also §6.1.

#### 1.4 `name` on `CreateSchema`, `SchemaInfo`, `UpdateSchema` (model.ts:17, 126, 184)
`name` alone is generic in the context of UC where there's also
`fullName`, `catalogName`, `newName`, and `metastoreId`. The doc
qualifies it as "Name of schema, relative to parent catalog", but the
identifier itself doesn't say that. Compare to `catalogName` on the
same shape which is unambiguous. See also §10.2 and §12.2.

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
`SchemaInfo.catalogType`. See §12.4 for the duplication.

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

### 4. Underscores in TypeScript identifiers

The package's most widespread cosmetic issue. Six exported types and
several schema exports use proto-style `Parent_Child` names with
`@typescript-eslint/naming-convention` suppression comments — i.e. the
lint rule already disagrees with these names.

#### 4.1 `CreateSchema_OptionsEntry` (model.ts:58)
Proto map-entry. Should be `CreateSchemaOptionsEntry`, but the wrapper
itself should not exist (see §11.1).

#### 4.2 `CreateSchema_PropertiesEntry` (model.ts:64)
Same as 4.1.

#### 4.3 `DeleteSchema_Response` (model.ts:77)
Proto-style underscore identifier. Should be `DeleteSchemaResponse`.

#### 4.4 `ListSchemas_Response` (model.ts:113)
Should be `ListSchemasResponse`. (Standard top-level response type;
underscore is a Go/proto artefact.)

#### 4.5 `SchemaInfo_OptionsEntry` (model.ts:167)
Same as 4.1.

#### 4.6 `SchemaInfo_PropertiesEntry` (model.ts:173)
Same as 4.1.

#### 4.7 `UpdateSchema_OptionsEntry` (model.ts:225)
Same as 4.1.

#### 4.8 `UpdateSchema_PropertiesEntry` (model.ts:231)
Same as 4.1.

#### 4.9 `unmarshalDeleteSchema_ResponseSchema` (model.ts:237)
The underscore propagates into the schema export name. Should be
`unmarshalDeleteSchemaResponseSchema`.

#### 4.10 `unmarshalListSchemas_ResponseSchema` (model.ts:254)
Same as 4.9. Should be `unmarshalListSchemasResponseSchema`.

---

### 5. Cryptic abbreviations

#### 5.1 `fullNameArg` (model.ts:71, 90, 180)
Path-parameter field on `DeleteSchema`, `GetSchema`, and
`UpdateSchema`. The `Arg` suffix is Go-generator jargon distinguishing
path arguments from request-body fields with the same key. TypeScript
callers have no need for this distinction — the field *is* the schema
identifier and should just be `fullName` (or `name`). Even worse:
`UpdateSchema` has *both* `fullNameArg` (path) and `fullName` (body)
on the same type, with no obvious difference in semantics. See §16.1.

#### 5.2 `pkgJson` (client.ts:19)
Variable name `pkgJson` for `package.json` import. Mostly internal —
minor — but worth noting for consistency.

#### 5.3 `req`, `resp`, `opts` (client.ts and utils.ts throughout)
Internal abbreviations. Conventional, but worth flagging for the
broader audit.

---

### 6. Misleading names

#### 6.1 `EffectivePredictiveOptimizationFlag.value` is a tri-state encoded as `string` (model.ts:81)
Field is typed `string | undefined` but the doc comment ("Whether
predictive optimization should be enabled…") implies a small discrete
set of values (enable / disable / inherit). Either expose an enum or
rename the field to make it clear it's a setting key. See also §1.1.

#### 6.2 `SchemaInfo.fullName` corresponds with `name` + `catalogName` (model.ts:139)
The doc is honest: "Full name of schema, in form of
__catalog_name__.__schema_name__". But the field name `fullName`
suggests it might carry additional information not available from
`name`+`catalogName`. It doesn't. See also §12.2.

#### 6.3 `SchemaInfo.options` vs `SchemaInfo.properties` (model.ts:161-164)
Both are `Record<string, string>` with identical doc comments ("A map
of key-value properties attached to the securable."). There is no way
for a caller to know which to use for what. The doc duplication recurs
verbatim in `CreateSchema` (model.ts:51-54) and `UpdateSchema`
(model.ts:218-221). Either is underspecified or one of them is
misnamed. See §12.1.

#### 6.4 `marshalRequest` parses the input before marshalling (utils.ts:119)
The function is named `marshalRequest` but its body is
`JSON.stringify(schema.parse(data))` — the schema's `.parse` step is
*validation*, not parsing. Not a schemas-specific issue, but the name
hides validation behaviour. (Inherited from sibling packages.)

#### 6.5 `parseResponse` does parsing + validation (utils.ts:113)
Similar to 6.4: the name `parseResponse` understates that it also
validates with `schema.parse`. Defensible.

---

### 7. Overly verbose

#### 7.1 `EffectivePredictiveOptimizationFlag` type name (model.ts:79)
39 characters. Compounded by `effectivePredictiveOptimizationFlag` as
a field name on three different request/response shapes (model.ts:44,
153, 211). Consider `EffectivePredictiveOptimization` (drop the
`Flag` suffix — the type already wraps the flag) or
`EffectivePOSetting` if shortening is acceptable. See also §8.4.

#### 7.2 `enablePredictiveOptimization: string` (model.ts:27, 136, 194)
Long field name for what is effectively a flag value. Acceptable, but
pairs with §7.1 to make every schema shape verbose.

#### 7.3 `unmarshalEffectivePredictiveOptimizationFlagSchema` /
`marshalEffectivePredictiveOptimizationFlagSchema` (model.ts:240, 359)
Schema exports of ~50 characters. Hard to read.

#### 7.4 `MANAGED_ONLINE_CATALOG` enum value (model.ts:12) — 22 characters; redundant `_CATALOG` per §2.1.

---

### 8. Redundant suffixes

#### 8.1 `SchemaInfo` type name (model.ts:124)
"Info" is a non-suffix — it carries no semantic content. In the Go SDK
this distinguishes the entity type from a resource handle; in TS the
convention is to drop it (`Schema`). Compare with `Catalog`, `Table`,
etc. in other packages.

#### 8.2 `Flag` suffix on `EffectivePredictiveOptimizationFlag` (model.ts:79)
The whole type *is* the flag; the suffix is redundant. See §7.1.

#### 8.3 `Arg` suffix on `fullNameArg` — see §5.1 and §16.1.

#### 8.4 `…Schema` suffix on every zod schema export (`unmarshalSchemaInfoSchema`, `marshalCreateSchemaSchema`, etc.)
Defensible (signals it's a zod schema), but the schema-ness is already
conveyed by the `marshal…`/`unmarshal…` prefix. Note the unfortunate
double-`Schema` in `unmarshalSchemaInfoSchema` and
`marshalCreateSchemaSchema` — once for "Schema" (the resource) and once
for "Schema" (the zod artefact). See also §20.4.

#### 8.5 `unmarshal…Schema` / `marshal…Schema` double-`Schema` collision
The single most jarring identifier in the package is
`marshalCreateSchemaSchema` (model.ts:312) — both halves of the
compound carry the word "Schema". Unique to this package because the
domain entity is itself called "schema".

---

### 9. Singular / plural mismatches

#### 9.1 `Client.listSchemasIter` returns `AsyncGenerator<SchemaInfo>` (client.ts:213)
Method name `listSchemasIter` implies "list of schemas iterator"; the
generator actually yields single `SchemaInfo` items one at a time.
Consistent with neighbouring packages. Worth a sanity check —
`iterSchemas` (verb-first) reads more naturally for an iterator and
avoids the singular/plural conflict.

#### 9.2 No other plural mismatches noticed.

---

### 10. Reserved-word collisions

#### 10.1 `options` field on `CreateSchema`, `UpdateSchema`, `SchemaInfo` (model.ts:54, 163, 221)
`options` collides with the SDK's own `CallOptions` parameter name
used throughout the client (`createSchema(req, options)`, client.ts:74,
etc.). Not a compile error but creates cognitive load — inside
`createSchema(req, options)` the reader sees both `req.options`
(schema metadata) and `options` (call options). The cleanest fix is to
rename the client parameter to `callOptions`. See also §12.1 for the
duplicate-with-`properties` concern.

#### 10.2 `name` field is generic and shadows `Function.prototype.name`
Used on `CreateSchema`, `UpdateSchema`, `SchemaInfo` (model.ts:17, 184,
126). Not a reserved word, but commonly shadows the standard
`Function.prototype.name` and routinely confuses callers who spread
request objects. See also §1.4.

#### 10.3 `value` field on `EffectivePredictiveOptimizationFlag.value` (model.ts:81)
Generic field name, frequently shadows local variables. See §1.1.

#### 10.4 `properties` is not reserved but conflicts with `Object` semantics
`SchemaInfo.properties` (model.ts:161) is fine but worth noting that
`properties` is a heavily-overloaded term in JS (object properties,
descriptor properties, etc.). Combined with the duplicate-with-`options`
problem in §12.1, the name is doubly overloaded.

---

### 11. Empty / trivial wrapper types

_None._

---

### 12. Duplicate concepts

#### 12.1 `properties` vs `options` (model.ts:51-54, 161-164, 218-221)
Both `Record<string, string>` on every schema shape, with identical
doc comments ("A map of key-value properties attached to the
securable."). Either the documentation needs to differentiate them or
one is redundant. See also §6.4.

#### 12.2 `name` vs `fullName` on `SchemaInfo` (model.ts:126, 139)
`name` is the schema name "relative to parent catalog"; `fullName` is
"in form of __catalog_name__.__schema_name__". These two fields are
deterministically derivable from each other (given `catalogName`).
Mirror issue in `CreateSchema` (model.ts:17, 31) and `UpdateSchema`
(model.ts:184, 197). See also §6.2.

#### 12.3 `fullName` vs `fullNameArg` on `UpdateSchema` (model.ts:180, 197)
The `UpdateSchema` request has **both** `fullNameArg` (the existing
schema identifier, path param) and `fullName` (the same field name on
the body) — plus `newName` for renaming. Three fields all touching
the schema's identity. See §16.1.

#### 12.4 `CatalogType` is re-implemented across packages
The exact `CatalogType` enum (with all six variants) is defined here
(model.ts:6-13) and also in `catalogs` (and likely in several other UC
packages). A consumer touching both packages gets two unrelated TS
types named `CatalogType`. Cross-package duplication — flagged in
this audit for the broader review.

#### 12.5 `EffectivePredictiveOptimizationFlag` may be duplicated
This type is identical to the one in `catalogs` (and probably in any
UC securable package). Cross-package duplication.

#### 12.6 `CreateSchema`, `UpdateSchema`, and `SchemaInfo` share ~21 fields verbatim
All three types are 95% identical with identical doc strings. This is
a generator artefact, but any rename of `storageRoot` must happen in
three places. Recommend basing `CreateSchema`/`UpdateSchema` on
`Partial<SchemaInfo>` or a shared `SchemaProperties` mixin.

#### 12.7 Overlap with `systemschemas` package
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

### 13. Verb-tense inconsistency

#### 13.1 Client methods: `createSchema`, `deleteSchema`, `getSchema`, `listSchemas`, `updateSchema`, `listSchemasIter`. Imperative present, consistent.

#### 13.2 `unmarshal…` / `marshal…` schema-export prefixes are consistent. No issues.

#### 13.3 `executeCall`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`, `marshalRequest`, `readAll`, `flattenQueryParams` (utils.ts) — all imperative present, consistent.

No verb-tense inconsistencies found across the package.

---

### 14. Go / Java-style names

#### 14.1 `…_Response` suffix on response types (`DeleteSchema_Response`, `ListSchemas_Response`)
Proto / gRPC convention `Method_Response`. In TS this should be
`DeleteSchemaResponse` / `ListSchemasResponse`. See §4.3-4.4.

#### 14.2 `…_OptionsEntry` / `…_PropertiesEntry` map-entry wrappers (six occurrences)
Proto map-entry idiom doesn't exist in TS. See §4.1-4.8.

#### 14.3 `…Info` suffix (`SchemaInfo`, `EffectivePredictiveOptimizationFlag`)
Java/Go style. TS convention is to drop it. See §8.1.

#### 14.4 `Client` class name (client.ts:44)
Bare `Client` (rather than `SchemasClient`) is a Go-idiom: package
qualifies the type. JS consumers commonly import as
`import {Client} from '@databricks/sdk-schemas/v1'` and have to alias.
Package-wide convention; flagged for the broader review.

#### 14.5 `fullNameArg` — Go-generator naming. See §5.1.

#### 14.6 `unmarshal…` / `marshal…` (Go's `encoding/json` verbs)
Direct Go ports. TS ecosystem typically uses `parse` / `serialize` or
`decode` / `encode`. Defensible because they're internal to the
generated layer.

#### 14.7 `package_segment` / `PACKAGE_SEGMENT` (client.ts:39)
Constant naming is fine; flagged for completeness.

---

### 15. Generic field names losing meaning

#### 15.1 `value` on `EffectivePredictiveOptimizationFlag` — see §1.1.

#### 15.2 `key`, `value` on map-entry wrappers — see §1.2.

#### 15.3 `name` on three different schema shapes — see §1.4.

#### 15.4 `properties`, `options` (model.ts:51, 53, 161, 163, 218, 220) — see §6.3, §12.1.

#### 15.5 `comment` (model.ts:23, 132, 190)
"User-provided free-form text description." `comment` is too informal
for a documented free-text description on a metadata API.
`description` would be more honest about its purpose.

---

### 16. Field contradicting type domain

#### 16.1 `UpdateSchema` has `fullNameArg`, `fullName`, `name`, and `newName` (model.ts:180, 184, 197, 182)
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

#### 16.2 `CreateSchema` contains read-only output fields (model.ts:32-50)
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`fullName`, `catalogType`, `effectivePredictiveOptimizationFlag`,
`schemaId`, `browseOnly`. These are server-populated; a creator
setting them is at best ignored. The type's domain is "create
request", but its shape contradicts that. Same mirror issue in
`UpdateSchema` (model.ts:199-217).

#### 16.3 `DeleteSchema.fullNameArg` — see §5.1.

#### 16.4 `GetSchema.fullNameArg` (model.ts:90)
Same as 16.3.

---

### 17. Inconsistent action verbs

Method verbs in `Client`: `createSchema`, `deleteSchema`, `getSchema`,
`listSchemas`, `updateSchema`, `listSchemasIter`. Verbs are consistent
— standard CRUD plus a `…Iter` paginator. No `fetch…` / `retrieve…` /
`read…` outliers. No issues found.

---

### 18. Long enum values

#### 18.1 `CatalogType.MANAGED_ONLINE_CATALOG` (model.ts:12)
22-character enum value. Should be `MANAGED_ONLINE` after dropping the
redundant `_CATALOG` suffix (§2.1).

#### 18.2 `CatalogType.DELTASHARING_CATALOG` (model.ts:8)
20-character value; redundant suffix + run-together words. See §3.1.

#### 18.3 Other `CatalogType` variants
`MANAGED_CATALOG` (15), `SYSTEM_CATALOG` (14), `INTERNAL_CATALOG`
(16), `FOREIGN_CATALOG` (15). All have redundant `_CATALOG` suffix.
See §2.1.

---

### 19. Underspecified IDs

#### 19.1 `metastoreId` (model.ts:29, 138, 196)
Documented as "unique identifier of parent metastore". Format opaque
(UUID? slug?). Acceptable but unspecified.

#### 19.2 `schemaId` (model.ts:48, 157, 215)
"The unique identifier of the schema." No format hint (UUID?). The
field exists alongside `fullName` (which is also a unique identifier
in a different sense). Two simultaneous IDs without disambiguation.

#### 19.3 `createdAt` / `updatedAt` (model.ts:33, 37, 142, 146, 200, 204)
Type is `number` (epoch milliseconds, per the doc). The unit is not
encoded in the field name. `createdAtMs` / `updatedAtMs` would be
more honest. (Compare to `lastFailoverTimeMs` in `catalogs`, which
gets this right — see catalogs.md §19.7.)

#### 19.4 `createdBy` / `updatedBy` (model.ts:35, 39, 144, 148, 202, 206)
Type is `string` — "Username of schema creator" / "Username of user
who last modified schema". Underspecified: is this a username, an
email, a principal ID? `createdByUsername` would be clearer.

#### 19.5 `inheritedFromType` / `inheritedFromName` on `EffectivePredictiveOptimizationFlag` (model.ts:83, 85)
Both `string`. `inheritedFromType` could be one of the UC securable
types, but the field is not enum-typed. `inheritedFromName` is opaque
text. See also §1.3, §1.5.

---

### 20. Type-suffix tautology

#### 20.1 `CatalogType` enum with field `catalogType: CatalogType`
(model.ts:6, 41, 150, 208) — field name tautological with type name.
Defensible (field carries the dynamic value) but worth flagging.

#### 20.2 `SchemaInfo` doesn't carry a `schemaType` field — no tautology there, which is a relief.

#### 20.3 `EffectivePredictiveOptimizationFlag` with field `effectivePredictiveOptimizationFlag: EffectivePredictiveOptimizationFlag`
(model.ts:44, 153, 211) — field repeats type name verbatim, 35
characters each. Severe tautology, but defensible because the field
is the only instance of that type in each parent. Could be shortened
to `predictiveOptimization: EffectivePredictiveOptimization` (drop
"Flag" per §8.3 and "effective" per §7.1).

#### 20.4 Schema-export tautology
`unmarshalSchemaInfoSchema: z.ZodType<SchemaInfo>` (model.ts:265),
`marshalCreateSchemaSchema` (model.ts:312) — the `Schema` suffix
duplicates `z.ZodType<…>`. Worse, the *resource* is also called
"Schema", so identifiers like `marshalCreateSchemaSchema` mean
"marshal-schema for the CreateSchema schema". Maximal `Schema`-pile-up
in the SDK. See also §8.5, §8.6.

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

### C. `marshalUpdateSchemaSchema` serialises `fullNameArg`/`newName` into the body (model.ts:398-399)
`fullNameArg` is a path parameter, but the marshal transform produces
JSON fields `full_name_arg` and `new_name` in the body. Either the
server tolerates extra fields or this is a bug. The naming choice
(`Arg`) lets the bug hide.

### D. Marshal/unmarshal exports lack consistent generic types (model.ts)
`marshalCreateSchemaSchema: z.ZodType` (no generic) versus
`unmarshalSchemaInfoSchema: z.ZodType<SchemaInfo>` (with generic). The
marshal side is implicitly untyped. Not a naming issue per se, but
worth surfacing.

### E. `Client` constructor throws bare `Error` for missing `host` (client.ts:55)
"Host is required." — bare `Error`. Not a naming issue, flagged in
passing for the broader review.

### F. `index.ts` re-exports proto-style names verbatim (lines 9, 10, 11, 12, 14, 15, 16, 19, 20, 21)
Every underscore-bearing identifier surfaces in the package's public
API. A consumer of `@databricks/sdk-schemas/v1` sees
`CreateSchema_OptionsEntry`, `CreateSchema_PropertiesEntry`,
`DeleteSchema_Response`, `ListSchemas_Response`,
`SchemaInfo_OptionsEntry`, `SchemaInfo_PropertiesEntry`,
`UpdateSchema_OptionsEntry`, `UpdateSchema_PropertiesEntry` as
first-class exports. This is the highest-leverage place to clean
naming.

### G. The package name is plural; the entity types are singular
The package is `schemas` (plural); the model types are `Schema` (well,
`SchemaInfo` — singular). The five client methods mix:
`createSchema`/`deleteSchema`/`getSchema`/`updateSchema` (singular —
they act on one) and `listSchemas`/`listSchemasIter` (plural — they
return many). This is the same pattern as `catalogs`, `tables`, etc.
— consistent across the SDK.

### H. `SchemaInfo`'s "Next ID: 45" comment (model.ts:123)
The doc comment is a leftover proto field-number management note. It
has no consumer-facing meaning. Should be stripped on the way to TS.

### I. Doc comment for `effectivePredictiveOptimizationFlag` is missing (model.ts:44-46, 153-155, 211-213)
The field has no JSDoc, even though the type has a doc. Three
occurrences. Consistency: every other field has a doc comment.

### J. `enablePredictiveOptimization` is typed `string` not `boolean` (model.ts:27, 136, 194)
The field name says "enable" — suggesting boolean — but the type is
`string`. The actual value is presumably `'ENABLE' | 'DISABLE' |
'INHERIT'` or similar. The name lies about the type. See also §6.1
for the related `EffectivePredictiveOptimizationFlag.value`.

### K. Overlap with `systemschemas` package — see §12.7
A consumer reading "schemas" reasonably expects to find all schema
operations here. They will not find `disableSystemSchema`,
`enableSystemSchema`, or `listSystemSchemas` — those live in
`@databricks/sdk-systemschemas`. Package boundaries follow the
upstream API surface, but the seam is non-obvious to discover.

---

## File / line index for fast lookup

| Identifier                                                  | Location              | Finding              |
| ----------------------------------------------------------- | --------------------- | -------------------- |
| `CatalogType`                                               | model.ts:6            | 2.1, 12.4, 18.x, 20.1|
| `CatalogType.MANAGED_CATALOG`                               | model.ts:7            | 2.1, 18.3            |
| `CatalogType.DELTASHARING_CATALOG`                          | model.ts:8            | 2.1, 3.1, 18.2       |
| `CatalogType.SYSTEM_CATALOG`                                | model.ts:9            | 2.1, 18.3            |
| `CatalogType.INTERNAL_CATALOG`                              | model.ts:10           | 2.1, 18.3            |
| `CatalogType.FOREIGN_CATALOG`                               | model.ts:11           | 2.1, 18.3            |
| `CatalogType.MANAGED_ONLINE_CATALOG`                        | model.ts:12           | 2.1, 18.1            |
| `CreateSchema`                                              | model.ts:15           | 12.6, 16.2           |
| `CreateSchema.name`                                         | model.ts:17           | 1.4, 10.2            |
| `CreateSchema.catalogType`                                  | model.ts:41           | 20.1                 |
| `CreateSchema.effectivePredictiveOptimizationFlag`          | model.ts:44           | 7.1, 7.3, 20.3, I    |
| `CreateSchema.properties` / `.options`                      | model.ts:52, 54       | 6.3, 10.1, 12.1, 15.4|
| `CreateSchema_OptionsEntry`                                 | model.ts:58           | 1.2, 4.1, 14.2       |
| `CreateSchema_PropertiesEntry`                              | model.ts:64           | 1.2, 4.2, 14.2       |
| `DeleteSchema`                                              | model.ts:69           | 16.3                 |
| `DeleteSchema.fullNameArg`                                  | model.ts:71           | 5.1, 14.5, 16.3, B   |
| `DeleteSchema_Response`                                     | model.ts:77           | 4.3, 14.1            |
| `EffectivePredictiveOptimizationFlag`                       | model.ts:79           | 7.1, 7.3, 8.2, 14.3, 20.3 |
| `EffectivePredictiveOptimizationFlag.value`                 | model.ts:81           | 1.1, 6.1, 10.3, 15.1 |
| `EffectivePredictiveOptimizationFlag.inheritedFromType`     | model.ts:83           | 1.3, 19.5            |
| `EffectivePredictiveOptimizationFlag.inheritedFromName`     | model.ts:85           | 1.3, 19.5            |
| `GetSchema.fullNameArg`                                     | model.ts:90           | 5.1, 14.5, 16.4, B   |
| `ListSchemas`                                               | model.ts:95           | —                    |
| `ListSchemas.maxResults`                                    | model.ts:105          | —                    |
| `ListSchemas.pageToken`                                     | model.ts:107          | —                    |
| `ListSchemas.includeBrowse`                                 | model.ts:109          | —                    |
| `ListSchemas_Response`                                      | model.ts:113          | 4.4, 14.1            |
| `SchemaInfo`                                                | model.ts:124          | 8.1, 12.6, 14.3, H   |
| `SchemaInfo.name`                                           | model.ts:126          | 1.4, 10.2            |
| `SchemaInfo.fullName`                                       | model.ts:139          | 6.2, 12.2            |
| `SchemaInfo.createdAt` / `.updatedAt`                       | model.ts:142, 146     | 19.3                 |
| `SchemaInfo.createdBy` / `.updatedBy`                       | model.ts:144, 148     | 19.4                 |
| `SchemaInfo.catalogType`                                    | model.ts:150          | 20.1                 |
| `SchemaInfo.effectivePredictiveOptimizationFlag`            | model.ts:153          | 7.1, 20.3, I         |
| `SchemaInfo.schemaId`                                       | model.ts:157          | 19.2                 |
| `SchemaInfo.properties` / `.options`                        | model.ts:161, 163     | 6.3, 10.1, 12.1, 15.4|
| `SchemaInfo_OptionsEntry`                                   | model.ts:167          | 1.2, 4.5, 14.2       |
| `SchemaInfo_PropertiesEntry`                                | model.ts:173          | 1.2, 4.6, 14.2       |
| `UpdateSchema`                                              | model.ts:178          | 12.3, 12.6, 16.1, 16.2 |
| `UpdateSchema.fullNameArg`                                  | model.ts:180          | 5.1, 12.3, 14.5, 16.1, B |
| `UpdateSchema.newName`                                      | model.ts:182          | 16.1                 |
| `UpdateSchema.name`                                         | model.ts:184          | 1.4, 10.2, 16.1      |
| `UpdateSchema.fullName`                                     | model.ts:197          | 12.2, 12.3, 16.1     |
| `UpdateSchema.effectivePredictiveOptimizationFlag`          | model.ts:211          | 7.1, 20.3, I         |
| `UpdateSchema_OptionsEntry`                                 | model.ts:225          | 1.2, 4.7, 14.2       |
| `UpdateSchema_PropertiesEntry`                              | model.ts:231          | 1.2, 4.8, 14.2       |
| `unmarshalDeleteSchema_ResponseSchema`                      | model.ts:237          | 4.9                  |
| `unmarshalEffectivePredictiveOptimizationFlagSchema`        | model.ts:240          | 7.3, 8.4             |
| `unmarshalListSchemas_ResponseSchema`                       | model.ts:254          | 4.10                 |
| `unmarshalSchemaInfoSchema`                                 | model.ts:265          | 8.4, 8.5, 20.4       |
| `marshalCreateSchemaSchema`                                 | model.ts:312          | 8.4, 8.5, 20.4       |
| `marshalEffectivePredictiveOptimizationFlagSchema`          | model.ts:359          | 7.3, 8.4             |
| `marshalUpdateSchemaSchema`                                 | model.ts:371          | 8.4, 8.5, 20.4, C    |
| `enablePredictiveOptimization` (string-typed bool)          | model.ts:27, 136, 194 | J                    |
| `comment` field                                             | model.ts:23, 132, 190 | 15.5                 |
| `Client` (bare name)                                        | client.ts:44          | 14.4                 |
| `Client.listSchemasIter`                                    | client.ts:213         | 9.1                  |
| `${req.fullNameArg ?? ''}` URL substitution                 | client.ts:106, 137, 239 | B                  |
| `flattenQueryParams` (unused export)                        | utils.ts:123          | A                    |
| `marshal…` / `unmarshal…` verbs                             | model.ts (many)       | 14.6                 |
| `…Schema` suffix on schema exports                          | model.ts (many)       | 8.4, 8.5, 20.4       |
| `index.ts` re-exports                                       | index.ts:7-23         | F                    |
| Cross-package overlap with `systemschemas`                  | (package boundary)    | 12.7, K              |

---

## Recommended priority order

1. **Fix `fullNameArg` / `fullName` / `name` / `newName` on `UpdateSchema`** — four name-like fields on the same request, the worst user-facing trap in the package. (§16.1, §5.1, §12.3)
2. **Strip the redundant `_CATALOG` suffix from every `CatalogType` variant.** (§2.1, §18.x)
3. **Drop proto-style `Parent_Child` identifiers** (`DeleteSchema_Response`, `ListSchemas_Response`, six `*_OptionsEntry`/`*_PropertiesEntry`). (§4)
4. **Distinguish or merge `options` and `properties`.** (§12.1, §6.3)
5. **Type `enablePredictiveOptimization` and `EffectivePredictiveOptimizationFlag.value` honestly** — either enum or boolean, not `string`. (§6.1, J)
6. **Strip read-only fields from `CreateSchema`/`UpdateSchema`.** (§16.2)
7. **Either document or remove the unused `flattenQueryParams` export.** (Cross-cutting A)
8. **Encode timestamp units in field names** (`createdAtMs`, `updatedAtMs`). (§19.3)
9. **Disambiguate `schemaId` vs `fullName` as identifiers** — document which is canonical. (§19.2, §12.2)
10. **Drop the `Next ID: 45` proto leftover from `SchemaInfo` JSDoc.** (H)
11. **Decide cross-package strategy with `systemschemas`** — at minimum document the seam. (§12.7, K)
