# Naming Audit: `functions` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/functions/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog Functions (SQL / Python UDFs and UDTFs).

---

## Summary

The `functions` package surfaces five UC function operations
(`createFunction`, `deleteFunction`, `getFunction`, `listFunctions`,
`updateFunction`) plus a paginated iterator. The model layer mirrors
the Go SDK 1:1, so most issues are inherited from the upstream
definitions. The most pervasive problems are: (1) the package-level
name itself — `functions` and the field/type `function` collide with
JavaScript's `function` reserved word; (2) proto-style nested
identifiers (`FunctionInfo_RoutineBody`, `FunctionInfo_SqlDataAccess`,
`FunctionInfo_SecurityType`, `FunctionInfo_ParameterStyle`,
`DeleteFunction_Response`, `ListFunctions_Response`); (3) the cryptic
`fullNameArg` path-parameter field; and (4) widespread
`type*` and `parameter*` field prefixes that re-encode the parent
type's domain.

---

## Findings

### 1. Vague / generic names

#### 1.1 `DeleteFunction.force` (model.ts:157)
Field name `force` is generic. Doc says "Force deletion even if the
function is notempty." (typo preserved). A function that "isn't
empty" — what does "empty" mean for a function? Probably a copy-paste
from the schema/catalog delete operations. The field name `force`
carries no information about *what* it overrides; consider
`forceDelete` or, better, surface the underlying constraint in the
name.

#### 1.2 `FunctionParameterInfo.position` (model.ts:277)
Generic name on a field whose meaning is implementation-specific
(zero-indexed ordinal position). `parameterIndex` or
`ordinalPosition` would be unambiguous. Compare to `Position` types
in editors / DOM — `position` here is overloaded.

#### 1.3 `FunctionParameterInfo.comment` (model.ts:285)
"User-provided free-form text description" — this is a description,
not a comment. `description` is what the field actually contains.
Same pattern repeats on `CreateFunction.comment`, `FunctionInfo.comment`,
`UpdateFunction.comment` (model.ts:119, 238, 383).

---

### 2. Redundant enum prefixes

#### 2.1 `FunctionParameterType` values `PARAM` / `COLUMN` (model.ts:39-42)
The enum is named `FunctionParameterType` and the variants are
`PARAM` and `COLUMN`. `PARAM` is fine; `COLUMN` is jarring as a
"parameter type" because the surrounding type names already declare
"parameter". The semantics (a parameter that is actually a table
column reference) get lost. Consider
`FunctionParameterType.COLUMN_REF` or rename the parent.

#### 2.2 `FunctionInfo_ParameterStyle.S` (model.ts:44-47)
Single-variant enum with the variant `S`. The doc on the type-using
field says `**S** is the value for SQL.` So `S` is *the* SQL
parameter style. The single-letter variant is cryptic; even if it
preserves wire compatibility, the TypeScript surface should expose
`SQL` (and let the marshal layer translate to `S` on the wire).
See also §5.1.

#### 2.3 `FunctionInfo_RoutineBody` values `SQL` / `EXTERNAL` (model.ts:49-59)
Variants are short and meaningful. `EXTERNAL` is the longer arm and
the description on `EXTERNAL` is multi-bullet. Variants OK; the
nested enum type-name is the issue — see §4.1.

#### 2.4 `FunctionInfo_SecurityType.DEFINER` (model.ts:61-64)
Single-variant enum with `DEFINER`. The single-valued switch is
surfaced as a full enum type; the variant itself is meaningful (SQL
`SECURITY DEFINER` clause) but the TS-side ergonomics suffer from
the long nested enum name.

#### 2.5 `FunctionInfo_SqlDataAccess` values `CONTAINS_SQL` / `READS_SQL_DATA` / `NO_SQL` (model.ts:66-71)
The enum name contains `SqlDataAccess` and every variant begins or
ends with `SQL`. Two of three variants repeat the `SQL` token from
the parent: `CONTAINS_SQL`, `READS_SQL_DATA`, `NO_SQL`. The repetition
is mild compared to the catalogs `DR_REPLICATION_STATUS_*` case, but
the type already says "SQL" — variants `CONTAINS`, `READS_DATA`,
`NONE` would be just as clear.

#### 2.6 `ColumnTypeName` variants suffixed `_TYPE` (model.ts:31, 32)
`USER_DEFINED_TYPE`, `TABLE_TYPE`, `TABLEREF_TYPE`. The enum is
`ColumnTypeName` — `_TYPE` is redundant on each variant. Should be
`USER_DEFINED`, `TABLE`, `TABLEREF`. Note: see also §3.5 for
`TABLEREF`.

---

### 3. Acronym casing inconsistencies (SQL, UDF, UDTF, JSON)

#### 3.1 `FunctionInfo_SqlDataAccess` (model.ts:67) vs field `sqlDataAccess` (model.ts:101, 220, 365)
`SqlDataAccess` (PascalCase for the type) uses `Sql` as a word;
`sqlDataAccess` (camelCase field) uses `sql` lowercase. Both are
internally consistent for camelCase/PascalCase rules, but the
Databricks codebase elsewhere uses uppercase `SQL` (e.g. `sqlPath`
field, comments saying "SQL"). Google TS style guide treats SQL as a
three-letter acronym → `Sql`/`sql` is valid. Flagged for awareness.

#### 3.2 `sqlPath` field (model.ts:115, 234, 379)
Consistent with §3.1: `sqlPath` rather than `sQLPath`. OK by Google
TS rules.

#### 3.3 `typeJson` field (model.ts:267)
Field name `typeJson`. JSON is treated as `Json` per Google TS rules.
Consistent.

#### 3.4 `typeText` field (model.ts:265)
Field name `typeText`. Doc says "Full data type spec, SQL/catalogString
text." OK as a name but ambiguous: is it SQL-formatted, JSON-formatted,
or arbitrary?

#### 3.5 `TABLEREF_TYPE` enum variant (model.ts:32)
"TABLEREF" runs two words together — "Table Ref" / "Table Reference".
Should be `TABLE_REF` (or `TABLE_REFERENCE`, spelled out). The
codebase already uses underscores between words elsewhere
(`USER_DEFINED_TYPE`). See also §2.6.

#### 3.6 `TIMESTAMP_NTZ` enum variant (model.ts:25)
`NTZ` is "No TimeZone". Three-letter acronym, kept uppercase here
which is consistent with `SQL` elsewhere. OK, but the meaning is
opaque to anyone unfamiliar with the Spark/Delta type system. The
ColumnTypeName enum has no JSDoc comments to explain `NTZ`,
`TABLEREF_TYPE`, `USER_DEFINED_TYPE`, `VARIANT`, etc.

#### 3.7 "UDF" / "UDTF" never appear in identifiers
The package is *Unity Catalog Functions* — it covers both UDFs and
UDTFs (table-valued functions). Neither acronym appears in any
identifier or doc comment. The distinction is encoded in the
`routineBody` + `returnParams` combination, which is non-obvious.
Not a renaming issue per se, but a discoverability problem worth
flagging.

---

### 4. Underscores in TypeScript identifiers

This is the package's most widespread cosmetic issue. Proto-style
underscore separators appear in exported TS identifiers, each
silenced by a `@typescript-eslint/naming-convention -- Proto-style …`
disable comment.

#### 4.1 `FunctionInfo_ParameterStyle` (model.ts:45)
Should be `FunctionParameterStyle` (or `ParameterStyle`, top-level).

#### 4.2 `FunctionInfo_RoutineBody` (model.ts:50)
Should be `RoutineBody` or `FunctionRoutineBody`.

#### 4.3 `FunctionInfo_SecurityType` (model.ts:62)
Should be `FunctionSecurityType` (or `SecurityType`). Note: the
catalogs and other packages also have `SecurityType`-flavoured enums;
disambiguation may need `FunctionSecurityType`.

#### 4.4 `FunctionInfo_SqlDataAccess` (model.ts:67)
Should be `FunctionSqlDataAccess` or `SqlDataAccess` (top-level).

#### 4.5 `DeleteFunction_Response` (model.ts:161)
Should be `DeleteFunctionResponse`. The underscore separator is the
naming issue here; the wrapper itself exists for forward
compatibility.

#### 4.6 `ListFunctions_Response` (model.ts:319)
Should be `ListFunctionsResponse`.

#### 4.7 `unmarshalDeleteFunction_ResponseSchema` /
`unmarshalListFunctions_ResponseSchema` (model.ts:431, 592)
Underscore leaks into schema exports. Should be
`unmarshalDeleteFunctionResponseSchema`,
`unmarshalListFunctionsResponseSchema`.

---

### 5. Cryptic abbreviations

#### 5.1 `FunctionInfo_ParameterStyle.S` (model.ts:46)
A bare letter `S` whose only documented purpose is "the value for
SQL". Cryptic — preserve wire compatibility in the marshal layer and
expose `SQL` as the TS variant. See also §2.2.

#### 5.2 `fullNameArg` (model.ts:155, 294, 343)
Used as the function name path-parameter on `DeleteFunction`,
`GetFunction`, and `UpdateFunction`. The `Arg` suffix is jargon from
the Go generator distinguishing path arguments from request-body
fields with the same key. TypeScript callers have no need for this
distinction — the field is the function's fully-qualified name. See
also §13.1 and §11.3.

#### 5.3 `pkgJson` (client.ts:19)
Internal variable name for `package.json`. Mild — flagged for
consistency with other audits.

#### 5.4 `respBody` (client.ts:89, 126, 164, 217, 267) — internal-only; mild.

#### 5.5 `typeText` / `typeJson` (model.ts:265, 267)
The `type*` prefix is fine within `FunctionParameterInfo`, but the
field names (`typeText`, `typeJson`, `typeName`, `typePrecision`,
`typeScale`, `typeIntervalType`) form a non-obvious "type-spec"
sub-record that arguably should be nested under a `type` object.
See also §12.4.

---

### 6. Misleading names

#### 6.1 `routineDependencies` doc comment lowercases "function" (model.ts:122, 241, 386)
JSDoc reads "function dependencies." (lowercase, mid-sentence). The
field name is `routineDependencies` and the doc says "function". The
package toggles between "routine" and "function" terminology
indiscriminately — see §6.3.

#### 6.2 `DeleteFunction.force` doc has typo "notempty" (model.ts:156)
"Force deletion even if the function is notempty." Should be "not
empty". Doc bug, not a naming bug, but signals the field hasn't been
read recently. See also §1.1.

#### 6.3 "Function" vs "Routine" terminology mixed everywhere
Every type and method speaks of `function*`. But every body-related
field speaks of `routine*`: `routineBody`, `routineDefinition`,
`routineDependencies`. The enum is `FunctionInfo_RoutineBody`. A
function's *body* is a *routine*. This split is a Go-port artifact
of the SQL standard's vocabulary (`CREATE PROCEDURE … LANGUAGE
SQL ROUTINE_BODY …`) — but for a TS consumer the inconsistency is
jarring. `body`, `definition`, `dependencies` (dropping `routine`)
would be cleaner. See also §6.1.

#### 6.4 `parameterDefault: string` (model.ts:283)
Doc: "Default value of the parameter." The default of a function
parameter is rarely a string in the source domain — it might be a
number, a boolean, an interval, or even `NULL`. Typing it as `string`
implies serialised form, but the field name `parameterDefault`
doesn't signal that. Consider `parameterDefaultExpression` or
`parameterDefaultText`.

#### 6.5 `specificName` reserved-for-future-use (model.ts:107, 226, 371)
Doc: "Specific name of the function; Reserved for future use." A
field whose name promises specificity and whose docs admit it's
unused is a future trap. Better to omit until it does something.

#### 6.6 `inputParams` / `returnParams` use `Params` but the type uses `ParameterInfos`
(model.ts:87, 109, 206, 228, 351, 373)
The field abbreviates to `Params`; the type is `FunctionParameterInfos`
(no abbreviation). Pick one — abbreviate both (`Params` /
`ParameterInfos`?) or spell both out (`inputParameters` /
`returnParameters`).

---

### 7. Reserved-word collisions

#### 7.1 `Function` / `function` — the entire package name collides with a JS reserved word
(model.ts and across the file)

`function` is a JavaScript reserved keyword
(<https://tc39.es/ecma262/#sec-keywords-and-reserved-words>).
`Function` is also the name of the global constructor for function
objects. Although TypeScript permits both as identifier names in
most positions, this package routinely uses them in ways that
collide:

- The `Dependency.value` discriminated union (model.ts:170) uses
  `$case: 'function'` and a `function` property as one arm of the
  union. The runtime payload key is `function`, which means consumers
  must write
  `if (dep.value?.$case === 'function') { dep.value.function … }` —
  reading `dep.value.function` is jarring next to other code that
  treats `function` as a keyword.
- The unmarshal schema (model.ts:437, 447) reads
  `function: z.lazy(() => unmarshalFunctionDependencySchema)` —
  again the property name is `function`.
- The marshal schema (model.ts:727-728) similarly has
  `$case: z.literal('function'), function: z.lazy(…)`.
- The Go-side wire format uses snake_case (`function`) so the field
  is forced; renaming requires breaking compatibility.

This is the package's single biggest naming hazard. A consumer
auto-completing `dep.value.` will see a property called `function`
adjacent to TS keyword highlighting in their editor. Consider
renaming the union arm to `functionRef`, `functionDependency`, or
nesting via a different discriminator.

#### 7.2 `FunctionDependency` shadows `Function` constructor
The exported type `FunctionDependency` is fine on its own, but in
contexts where the SDK consumer also has `Function` (the global
constructor) in scope, the `Function*` prefix on multiple types is
crowded.

#### 7.3 Type `FunctionInfo` is exported alongside the global `Function`
(model.ts:198, index.ts:25)
`FunctionInfo`, `CreateFunction`, `DeleteFunction`, `GetFunction`,
`ListFunctions`, `UpdateFunction`, `FunctionParameterInfo`,
`FunctionParameterInfos`, `FunctionDependency`,
`FunctionInfo_ParameterStyle`, `FunctionInfo_RoutineBody`,
`FunctionInfo_SecurityType`, `FunctionInfo_SqlDataAccess`,
`FunctionParameterMode`, `FunctionParameterType` — fifteen exports
prefixed with `Function`. While none conflict at the language level,
the prefix is so heavy that the global `Function` is easily
shadowed by the local imports.

#### 7.4 `name` field
`name` is used as a body field on `CreateFunction`, `UpdateFunction`,
`FunctionInfo`, `FunctionParameterInfo` (model.ts:81, 200, 263, 345),
and again indirectly via `fullNameArg`. Not a reserved word but
shadows `Function.prototype.name` — common source of confusion when
callers spread request objects.

#### 7.5 `options` parameter on every client method
(client.ts:79, 111, 149, 190, 232, 257) — the second parameter is
named `options` and shadows the marshal schema's `options`-style
metadata patterns. Not a collision in this package specifically but
consistent with the catalogs audit (§10.1).

---

### 8. Duplicate concepts

#### 8.1 `CreateFunction`, `UpdateFunction`, and `FunctionInfo` share ~28 fields verbatim
(model.ts:79-140, 198-259, 341-404)
Three types with almost-identical shapes and identical doc strings.
Generator artifact, but means any rename of, say, `routineBody`,
must happen three times — and the divergences between Create / Update
/ Info are easy to miss. Recommend basing `CreateFunction` and
`UpdateFunction` on `Partial<FunctionInfo>` (or a shared base
interface).

#### 8.2 `fullName` vs `catalogName` + `schemaName` + `name` (model.ts:81-85, 127, 200-204, 246, 345-349, 391)
A `FunctionInfo` has all four: a top-level `name` (relative to
schema), parent `catalogName` and `schemaName`, and `fullName`
(the concatenation). Three pieces of data; four fields. A caller
setting one and not the others leaves the type in an inconsistent
state, and there's no documentation on which is authoritative on
`Create*` / `Update*`. See also §13.4.

#### 8.3 `dataType` vs `fullDataType` (model.ts:89-91, 208-210, 353-355)
- `dataType: ColumnTypeName` — the enum form.
- `fullDataType: string` — "Pretty printed function data type."

The pretty-printed form is presumably a function of the enum plus
any precision/scale/interval. Two fields encoding the same datum in
two representations.

#### 8.4 `name` vs `fullNameArg` on `UpdateFunction`
`UpdateFunction` has *both* `fullNameArg` (the existing function
identifier, used in the URL path) and `name` (the new desired name
of the function, used in the body). See §13.1.

#### 8.5 `routineBody` enum constant `EXTERNAL` documented in three identical places
(model.ts:52-58, 92, 211, 356)
The `EXTERNAL` variant's full multi-bullet documentation appears on
the enum declaration, then a paraphrased version repeats on
`CreateFunction.routineBody`, `FunctionInfo.routineBody`, and
`UpdateFunction.routineBody`. Doc duplication is a generator
artefact, but it inflates the cognitive load of reading the model.

---

### 9. Verb-tense inconsistency

#### 9.1 Client methods are well-aligned: `createFunction`, `deleteFunction`, `getFunction`, `listFunctions`, `updateFunction`. No tense issues.

#### 9.2 `executeCall`, `executeHttpCall` (utils.ts:26, 65), `buildHttpRequest`, `flattenQueryParams` (utils.ts:96, 123) — all imperative present, consistent.

No verb-tense inconsistencies found across the package.

---

### 10. Go / Java-style names

#### 10.1 `FunctionInfo_ParameterStyle`, `FunctionInfo_RoutineBody`, `FunctionInfo_SecurityType`, `FunctionInfo_SqlDataAccess`
(model.ts:45, 50, 62, 67)
Proto nested-enum naming `Parent_Child`. TS should use top-level
identifiers: `FunctionParameterStyle`, `RoutineBody`,
`FunctionSecurityType`, `SqlDataAccess`. See §4.1-4.4.

#### 10.2 `Client` class name (client.ts:44)
Bare `Client` (rather than `FunctionsClient`) is a Go idiom: package
qualifies the type. JS consumers commonly import as
`import {Client} from '@databricks/sdk-functions/v1'` and have to
alias. Package-wide convention; flagged for consistency.

#### 10.3 `fullNameArg` (model.ts:155, 294, 343) — Go generator naming. See §5.2.

#### 10.4 `Dependency.value.$case` discriminated union encoding (model.ts:168-184)
The `$case` discriminator with `value`-keyed payload is a ts-proto
serialiser idiom. TS-native discriminated unions usually keep the
discriminator at the top level (`{type: 'function', function: {…}}`)
rather than wrapping in `value`. Functional, but visibly Go/proto.

---

### 11. Generic field names losing meaning

#### 11.1 `name` is used twelve+ times across the model
(model.ts:81, 84, 86 within docs, 200, 203, 263, 345, 348, etc.)
The semantics shift: function name, parameter name, catalog name,
schema name, etc. — but the field is consistently `name`. Combined
with `fullName`, `fullNameArg`, `functionFullName`, `tableFullName`,
`secretFullName`, `volumeFullName`, `externalName`, `specificName`,
the surface area of "name" fields is huge. See also §8.2.

#### 11.2 `properties` (model.ts:121, 240, 385)
"JSON-serialized key-value pair map, encoded (escaped) as a string."
The field is `string`, despite the name promising a structured map.
A consumer reading the type sees `properties?: string` and has to
manually `JSON.parse`. Either name it `propertiesJson` or type it
as `Record<string, string>` with marshal-layer translation.

#### 11.3 `comment` (model.ts:119, 238, 285, 383) — see §1.3.

---

### 12. Field contradicting type domain

#### 12.1 `UpdateFunction` has `fullNameArg` *and* `name` (model.ts:343, 345)
- `fullNameArg` — the existing function's fully-qualified identifier
  (path param).
- `name` — the function name, body field (the new desired name?).

A caller staring at this struct cannot intuit which to set, in what
combination, or whether `name` is the *new* name or the *current*
name (the catalogs package answers this question differently with
`newName` — but `functions` lacks `newName` entirely, leaving the
caller without a renaming primitive at all, or with an ambiguous
`name` field). See also §8.4.

#### 12.2 `CreateFunction` contains read-only output fields
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`fullName`, `functionId`, `browseOnly` (model.ts:129-139). These are
server-populated; a creator setting them is at best ignored. The
type's domain is "create request" but its shape contradicts that.
Mirror issue in `UpdateFunction` (model.ts:393-403).

#### 12.3 `DeleteFunction.fullNameArg` — see §5.2.

#### 12.4 `FunctionInfo.fullName` vs `name` / `catalogName` / `schemaName`
(model.ts:200-204, 246)
On `FunctionInfo`, all four are present; for *catalogs* a `fullName`
is redundant with `name`, but for *functions* `fullName` is
`catalog_name.schema_name.function_name`. The doc comment
underscores them as if they're literal placeholders. The naming is
acceptable but the redundancy invites inconsistent state.

#### 12.5 `FunctionParameterInfo.parameterType: FunctionParameterType` where `PARAM` is one of two variants
(model.ts:281)
The field is on a "parameter info" object and one of its variants
is `PARAM`. So a `FunctionParameterInfo` may have
`parameterType === 'PARAM'`, i.e. "a parameter that is a parameter".
The other variant, `COLUMN`, means "a parameter that is a column
reference" — the type *contradicts* the parent type's domain. See
also §2.1.

---

### 13. Inconsistent action verbs

Method verbs in `Client`: `createFunction`, `deleteFunction`,
`getFunction`, `listFunctions`, `updateFunction`. Verbs are
consistent: standard CRUD. No `fetch…` / `retrieve…` / `read…`
outliers. No issues found.

---

### 14. Long enum values

#### 14.1 `ColumnTypeName.USER_DEFINED_TYPE` (model.ts:24) — 17 characters. See §2.6.

#### 14.2 `ColumnTypeName.TABLEREF_TYPE` (model.ts:32) — 13 characters. See §2.6, §3.5.

#### 14.3 `ColumnTypeName.TIMESTAMP_NTZ` (model.ts:25) — 13 characters. See §3.6.

#### 14.4 `FunctionInfo_SqlDataAccess.READS_SQL_DATA` (model.ts:69) — 14 characters. See §2.5.

#### 14.5 No `*_UNSPECIFIED` enum values present in this package — positive observation versus catalogs.

---

### 15. Underspecified IDs

#### 15.1 `metastoreId` (model.ts:125, 244, 389)
Documented as "Unique identifier of parent metastore." Format
opaque (UUID? slug?). Acceptable but unspecified.

#### 15.2 `functionId` (model.ts:137, 256, 401)
Doc: "Id of Function, relative to parent schema." Format unspecified
— is this a UUID, an autoincrement integer, an opaque token? Type is
`string` so opaque, but the docs should say so.

#### 15.3 `metastoreId` & `functionId` — distinct domains, same shape
Both `string`, both undocumented for format, both server-assigned.
A consumer cannot tell them apart from the types.

#### 15.4 `createdAt` / `updatedAt` (model.ts:129, 133, 248, 252, 393, 397)
Type is `number` (epoch milliseconds per the doc). The field name
doesn't convey unit. `createdAtMs` / `updatedAtMs` or `createdAtEpochMs`
would be more honest. The catalogs audit flagged the same
inconsistency.

#### 15.5 `connectionName` (model.ts:76) — "Full name of the dependent connection, in the form of __connection_name__."
The field is named `connectionName` but the doc says it should be a
"full name". For other dependency types, the field is explicitly
named `*FullName` (e.g. `secretFullName`, `tableFullName`). Naming
inconsistency: ConnectionDependency and CredentialDependency
(model.ts:150) use `…Name`; the rest use `…FullName`. Pick one.

---

### 16. Type-suffix tautology

#### 16.1 `ColumnTypeName` enum with field `typeName: ColumnTypeName`
(model.ts:5, 269) — field name conflates "type name" with the enum
type. Reading `parameter.typeName === ColumnTypeName.INT` is doubly
type-y. Either shorten the field (`type: ColumnTypeName`) or rename
the enum (`ColumnType`).

#### 16.2 `FunctionParameterMode` enum with field `parameterMode: FunctionParameterMode`
(model.ts:35, 279) — field-name tautological with type-name.

#### 16.3 `FunctionParameterType` enum with field `parameterType: FunctionParameterType`
(model.ts:39, 281) — field-name tautological with type-name. Also
suffers from §12.5 (a "parameter type" that admits "PARAM" as a
variant).

#### 16.4 `FunctionInfo_ParameterStyle` enum with field `parameterStyle: FunctionInfo_ParameterStyle`
(model.ts:45, 97, 216, 361) — field-name tautological with type-name.

#### 16.5 `FunctionInfo_RoutineBody` enum with field `routineBody: FunctionInfo_RoutineBody`
(model.ts:50, 93, 212, 357) — field-name tautological with type-name.

#### 16.6 `FunctionInfo_SecurityType` enum with field `securityType: FunctionInfo_SecurityType`
(model.ts:62, 105, 224, 369) — same.

#### 16.7 `FunctionInfo_SqlDataAccess` enum with field `sqlDataAccess: FunctionInfo_SqlDataAccess`
(model.ts:67, 101, 220, 365) — same.

---

## Additional / cross-cutting observations

### A. `flattenQueryParams` is defined but unused (utils.ts:123)
Each `listFunctions` / `getFunction` / `deleteFunction` handler
builds query strings inline with `URLSearchParams.append`
(client.ts:115-118, 154-156, 194-209). The exported helper
`flattenQueryParams` is never referenced by `client.ts`. Either it's
intentionally exported for consumer use (then it should be
documented) or it's dead code. Same finding as catalogs audit
(cross-cutting A).

### B. `fullNameArg` URL substitution silently allows empty string
(client.ts:114, 152, 260) — `${req.fullNameArg ?? ''}` — if
`fullNameArg` is undefined, the URL silently becomes
`/api/2.1/unity-catalog/functions/` and the request will fail on the
server. The naming (`fullNameArg`) and the substitution behaviour
together hide what should be a required parameter. Worth surfacing
via a non-optional type or a typed assertion.

### C. `marshalUpdateFunctionSchema` serialises `fullNameArg` into the body
(model.ts:864) `fullNameArg` is a path parameter — but the marshal
schema produces a JSON field `full_name_arg`. Either the server
tolerates the extra field or this is a bug. The `Arg` suffix lets
the bug hide.

### D. `Client` constructor throws bare `Error` for missing `host` (client.ts:55)
"Host is required." — bare `Error`. Not a naming issue, flagged for
consistency with the catalogs audit.

### E. `index.ts` re-exports proto-style names verbatim
(index.ts:9-12, 21) — every underscore-bearing identifier surfaces
in the package's public API. A consumer of `@databricks/sdk-functions/v1`
sees `FunctionInfo_ParameterStyle`, `FunctionInfo_RoutineBody`,
`FunctionInfo_SecurityType`, `FunctionInfo_SqlDataAccess`,
`DeleteFunction_Response`, `ListFunctions_Response` as first-class
exports.

### F. Package-name collision with JavaScript reserved word
The package is named `@databricks/sdk-functions` and the npm
workspace path is `packages/functions/`. `function` is a JS reserved
word; `functions` is not, but the proximity is jarring. Importers
will often write
`import * as functions from '@databricks/sdk-functions/v1'` which
sets up `functions.createFunction(…)` — the local binding `functions`
shadows nothing, but the `Dependency.value.$case === 'function'`
pattern (§7.1) combined with the package name creates a vocabulary
where "function" is overloaded.

### G. `FunctionInfo.routineDependencies` is described as "function dependencies."
(model.ts:122, 241, 386) Comment text starts with lowercase and uses
"function" instead of "routine"; field name uses "routine". See
§6.1 and §6.3.

### H. `parameterStyle: FunctionInfo_ParameterStyle` with one variant `S`
The most extreme case of a single-purpose API surface: a long enum
type holding a one-letter variant, only ever set to `S`, marshaled
as the JSON string `"S"`. Three layers of indirection for a constant.
See §2.2, §5.1.

---

## File / line index for fast lookup

| Identifier                                               | Location              | Finding |
| -------------------------------------------------------- | --------------------- | ------- |
| `ColumnTypeName`                                         | model.ts:5            | 2.6, 3.5, 3.6, 14.1-14.3, 16.1 |
| `ColumnTypeName.USER_DEFINED_TYPE`                       | model.ts:24           | 2.6, 14.1 |
| `ColumnTypeName.TIMESTAMP_NTZ`                           | model.ts:25           | 3.6, 14.3 |
| `ColumnTypeName.TABLE_TYPE`                              | model.ts:31           | 2.6 |
| `ColumnTypeName.TABLEREF_TYPE`                           | model.ts:32           | 2.6, 3.5, 14.2 |
| `FunctionParameterMode`                                  | model.ts:35           | 16.2 |
| `FunctionParameterType`                                  | model.ts:39           | 2.1, 12.5, 16.3 |
| `FunctionInfo_ParameterStyle`                            | model.ts:45           | 2.2, 4.1, 5.1, 10.1, 16.4 |
| `FunctionInfo_ParameterStyle.S`                          | model.ts:46           | 2.2, 5.1 |
| `FunctionInfo_RoutineBody`                               | model.ts:50           | 4.2, 8.5, 10.1, 16.5 |
| `FunctionInfo_RoutineBody.EXTERNAL`                      | model.ts:58           | 8.5 |
| `FunctionInfo_SecurityType`                              | model.ts:62           | 2.4, 4.3, 10.1, 16.6 |
| `FunctionInfo_SqlDataAccess`                             | model.ts:67           | 2.5, 3.1, 4.4, 10.1, 14.4, 16.7 |
| `ConnectionDependency.connectionName`                    | model.ts:76           | 15.5 |
| `CreateFunction`                                         | model.ts:79           | 8.1, 12.2 |
| `CreateFunction.routineBody/routineDefinition/routineDependencies` | model.ts:93/95/123 | 6.3 |
| `CreateFunction.specificName`                            | model.ts:107          | 6.5 |
| `CreateFunction.fullName`                                | model.ts:127          | 8.2, 12.4 |
| `CreateFunction.functionId / metastoreId / createdAt / etc.` | model.ts:125-139  | 12.2, 15.1, 15.2, 15.4 |
| `DeleteFunction.fullNameArg`                             | model.ts:155          | 5.2, 10.3, 12.3 |
| `DeleteFunction.force`                                   | model.ts:157          | 1.1, 6.2 |
| `DeleteFunction_Response`                                | model.ts:161          | 4.5 |
| `Dependency.value.function` arm                          | model.ts:170          | 7.1 |
| `Dependency.value.$case`                                 | model.ts:168          | 10.4 |
| `FunctionDependency`                                     | model.ts:193          | 7.2 |
| `FunctionInfo`                                           | model.ts:198          | 7.3, 8.1 |
| `FunctionInfo.routineBody/Definition/Dependencies`       | model.ts:212/214/242  | 6.3 |
| `FunctionInfo.specificName`                              | model.ts:226          | 6.5 |
| `FunctionInfo.properties`                                | model.ts:240          | 11.2 |
| `FunctionInfo.fullName`                                  | model.ts:246          | 8.2, 12.4 |
| `FunctionInfo.functionId`                                | model.ts:256          | 15.2, 15.3 |
| `FunctionParameterInfo.name`                             | model.ts:263          | 7.4, 11.1 |
| `FunctionParameterInfo.typeText / typeJson / typeName`   | model.ts:265-269      | 3.3, 3.4, 5.5, 16.1 |
| `FunctionParameterInfo.position`                         | model.ts:277          | 1.2 |
| `FunctionParameterInfo.parameterMode / parameterType`    | model.ts:279, 281     | 12.5, 16.2, 16.3 |
| `FunctionParameterInfo.parameterDefault`                 | model.ts:283          | 6.4 |
| `FunctionParameterInfo.comment`                          | model.ts:285          | 1.3 |
| `GetFunction.fullNameArg`                                | model.ts:294          | 5.2, 10.3 |
| `ListFunctions_Response`                                 | model.ts:319          | 4.6 |
| `UpdateFunction`                                         | model.ts:341          | 8.1, 8.4, 12.1, 12.2 |
| `UpdateFunction.fullNameArg / name`                      | model.ts:343, 345     | 5.2, 8.4, 12.1 |
| `UpdateFunction.routineBody / routineDefinition / routineDependencies` | model.ts:357/359/387 | 6.3 |
| `UpdateFunction.fullName`                                | model.ts:391          | 8.2, 12.4 |
| `unmarshalDeleteFunction_ResponseSchema`                 | model.ts:431          | 4.7 |
| `unmarshalListFunctions_ResponseSchema`                  | model.ts:592          | 4.7 |
| `Client` (bare name)                                     | client.ts:44          | 10.2 |
| `${req.fullNameArg ?? ''}` URL substitution              | client.ts:114, 152, 260 | B |
| `flattenQueryParams` (unused export)                     | utils.ts:123          | A |
| `index.ts` re-exports                                    | index.ts:5-35         | E |

---

## Recommended priority order

1. **Resolve the `function` reserved-word collision in `Dependency.value`** — the union arm-key `function` is the single most jarring naming hazard in the package. (§7.1)
2. **Fix `fullNameArg` / `name` confusion on `UpdateFunction`** — there is no `newName` field, so `name`'s role (current vs new) is undocumented. (§12.1, §5.2)
3. **Strip proto-style `Parent_Child` identifiers** (`FunctionInfo_ParameterStyle`, `FunctionInfo_RoutineBody`, `FunctionInfo_SecurityType`, `FunctionInfo_SqlDataAccess`, `DeleteFunction_Response`, `ListFunctions_Response`). (§4)
4. **Resolve "function" vs "routine" vocabulary split.** (§6.3)
5. **Strip `_TYPE` suffix from `ColumnTypeName` variants and fix `TABLEREF_TYPE` underscore.** (§2.6, §3.5)
6. **Strip read-only fields from `CreateFunction` / `UpdateFunction`.** (§12.2)
7. **Unify `*Name` vs `*FullName` field-naming on `*Dependency` types.** (§15.5)
8. **Either document or remove the unused `flattenQueryParams` export.** (Cross-cutting A)
