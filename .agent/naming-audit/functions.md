# Naming Audit: `functions` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/functions/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Unity Catalog Functions (SQL / Python UDFs and UDTFs).
**Total weird names flagged:** 49 (0 fixed, 49 still present after rescan on 2026-05-26 post regen #156).

---

## Summary

The `functions` package surfaces five UC function operations
(`createFunction`, `deleteFunction`, `getFunction`, `listFunctions`,
`updateFunction`) plus a paginated iterator. The model layer mirrors
the Go SDK 1:1, so most issues are inherited from the upstream
definitions. The most pervasive problems are: (1) cryptic
single-letter enum variants (`S`, `IN`, `DEFINER`); (2) the cryptic
`fullNameArg` path-parameter field (a generator artifact whose `Arg`
suffix has no meaning on the TS surface); and (3) proto-architectural
leaks such as `Parent_Child` underscore-typed enums and the
`$case`/`value` ts-proto oneof envelope.

---

## Findings

### 1. Vague / generic names

_None._

---

### 2. Cryptic single-letter / two-letter enum variants

#### 2.1 `FunctionInfo_ParameterStyle.S` (model.ts:42-44)
Single-variant enum with the variant `S`. The doc on the type-using
field says `**S** is the value for SQL.` So `S` is *the* SQL
parameter style. The single-letter variant is cryptic; even if it
preserves wire compatibility, the TypeScript surface should expose
`SQL` (and let the marshal layer translate to `S` on the wire).
See also §3.1.

#### 2.2 `FunctionInfo_SecurityType.DEFINER` (model.ts:59-61)
Single-variant enum with `DEFINER`. The single-valued switch is
surfaced as a full enum type; the variant itself is meaningful (SQL
`SECURITY DEFINER` clause) but the TS-side ergonomics suffer.

---

### 3. Cryptic abbreviations

#### 3.1 `FunctionInfo_ParameterStyle.S` (model.ts:43)
A bare letter `S` whose only documented purpose is "the value for
SQL". Cryptic — preserve wire compatibility in the marshal layer and
expose `SQL` as the TS variant. See also §2.1.

#### 3.2 `FunctionParameterMode.IN` (model.ts:32-34)
Bare two-letter variant `IN`. Comes from SQL's `IN`/`OUT`/`INOUT`
parameter modes; without that context, the variant is cryptic. A
consumer reading `parameterMode === FunctionParameterMode.IN` cannot
intuit "input parameter" without prior SQL exposure.

#### 3.3 `fullNameArg` (model.ts:152, 281, 324)
Used as the function name path-parameter on `DeleteFunctionRequest`,
`GetFunctionRequest`, and `UpdateFunctionRequest`. The `Arg` suffix
is jargon from the Go generator distinguishing path arguments from
request-body fields with the same key. TypeScript callers have no
need for this distinction — the field is the function's
fully-qualified name. See also §8.1 and §7.3.

#### 3.4 `pkgJson` (client.ts:19)
Internal variable name for `package.json`. Mild — flagged for
consistency with other audits.

#### 3.5 `respBody` (client.ts:97, 137, 181, 237, 293) — internal-only; mild.

---

### 4. Acronym casing inconsistencies (SQL, UDF, UDTF, JSON)

#### 4.1 `FunctionInfo_SqlDataAccess` (model.ts:64) vs field `sqlDataAccess` (model.ts:98, 207, 346)
`SqlDataAccess` (PascalCase for the type) uses `Sql` as a word;
`sqlDataAccess` (camelCase field) uses `sql` lowercase. Both are
internally consistent for camelCase/PascalCase rules, but the
Databricks codebase elsewhere uses uppercase `SQL` (e.g. `sqlPath`
field, comments saying "SQL"). Google TS style guide treats SQL as a
three-letter acronym → `Sql`/`sql` is valid. Flagged for awareness.

#### 4.2 `sqlPath` field (model.ts:112, 221, 360)
Consistent with §4.1: `sqlPath` rather than `sQLPath`. OK by Google
TS rules.

#### 4.3 `typeJson` field (model.ts:254)
Field name `typeJson`. JSON is treated as `Json` per Google TS rules.
Consistent.

#### 4.4 `typeText` field (model.ts:252)
Field name `typeText`. Doc says "Full data type spec, SQL/catalogString
text." OK as a name but ambiguous: is it SQL-formatted, JSON-formatted,
or arbitrary?

#### 4.5 "UDF" / "UDTF" never appear in identifiers
The package is *Unity Catalog Functions* — it covers both UDFs and
UDTFs (table-valued functions). Neither acronym appears in any
identifier or doc comment. The distinction is encoded in the
`routineBody` + `returnParams` combination, which is non-obvious.
Not a renaming issue per se, but a discoverability problem worth
flagging.

---

### 5. Misleading names

#### 5.1 `routineDependencies` doc comment lowercases "function" (model.ts:119, 228, 367)
JSDoc reads "function dependencies." (lowercase, mid-sentence). The
field name is `routineDependencies` and the doc says "function". The
package toggles between "routine" and "function" terminology
indiscriminately — a Go-port artifact of the SQL standard's vocabulary
(`CREATE PROCEDURE … LANGUAGE SQL ROUTINE_BODY …`). Doc inconsistency
worth flagging.

#### 5.2 `DeleteFunctionRequest.force` doc has typo "notempty" (model.ts:153)
"Force deletion even if the function is notempty." Should be "not
empty". Doc bug, not a naming bug, but signals the field hasn't been
read recently.

#### 5.3 `specificName` reserved-for-future-use (model.ts:104, 213, 352)
Doc: "Specific name of the function; Reserved for future use." A
field whose name promises specificity and whose docs admit it's
unused is a future trap. Better to omit until it does something.

---

### 6. Reserved-word collisions

#### 6.1 `options` parameter on every client method
(client.ts:85, 120, 164, 208, 256, 281) — the second parameter is
named `options` and shadows the marshal schema's `options`-style
metadata patterns. Not a collision in this package specifically but
consistent with the catalogs audit (§10.1).

---

### 7. Duplicate concepts

#### 7.1 `CreateFunction`, `UpdateFunctionRequest`, and `FunctionInfo` share ~28 fields verbatim
(model.ts:76-137, 185-246, 322-385)
Three types with almost-identical shapes and identical doc strings.
Generator artifact, but means any rename of, say, `routineBody`,
must happen three times — and the divergences between Create / Update
/ Info are easy to miss. Recommend basing `CreateFunction` and
`UpdateFunctionRequest` on `Partial<FunctionInfo>` (or a shared base
interface).

#### 7.2 `fullName` vs `catalogName` + `schemaName` + `name` (model.ts:78-82, 124, 187-191, 233, 326-330, 372)
A `FunctionInfo` has all four: a top-level `name` (relative to
schema), parent `catalogName` and `schemaName`, and `fullName`
(the concatenation). Three pieces of data; four fields. A caller
setting one and not the others leaves the type in an inconsistent
state, and there's no documentation on which is authoritative on
`Create*` / `Update*`. See also §9.4.

#### 7.3 `dataType` vs `fullDataType` (model.ts:86-88, 195-197, 334-336)
- `dataType: ColumnTypeName` — the enum form.
- `fullDataType: string` — "Pretty printed function data type."

The pretty-printed form is presumably a function of the enum plus
any precision/scale/interval. Two fields encoding the same datum in
two representations.

#### 7.4 `name` vs `fullNameArg` on `UpdateFunctionRequest`
`UpdateFunctionRequest` has *both* `fullNameArg` (the existing
function identifier, used in the URL path) and `name` (the new
desired name of the function, used in the body). See §9.1.

---

### 8. Verb-tense inconsistency

#### 8.1 Client methods are well-aligned: `createFunction`, `deleteFunction`, `getFunction`, `listFunctions`, `updateFunction`. No tense issues.

#### 8.2 `executeCall`, `executeHttpCall` (utils.ts:26, 65), `buildHttpRequest`, `flattenQueryParams` (utils.ts:96, 123) — all imperative present, consistent.

No verb-tense inconsistencies found across the package.

---

### 9. Go / Java-style names

#### 9.1 `Client` class name (client.ts:44)
Bare `Client` (rather than `FunctionsClient`) is a Go idiom: package
qualifies the type. JS consumers commonly import as
`import {Client} from '@databricks/sdk-functions/v1'` and have to
alias. Package-wide convention; flagged for consistency.

#### 9.2 `fullNameArg` (model.ts:152, 281, 324) — Go generator naming. See §3.3.

#### 9.3 `Dependency.value.$case` discriminated union encoding (model.ts:165-170)
The `$case` discriminator with `value`-keyed payload is a ts-proto
serialiser idiom. TS-native discriminated unions usually keep the
discriminator at the top level (`{type: 'function', function: {…}}`)
rather than wrapping in `value`. Functional, but visibly Go/proto.

---

### 10. Generic field names losing meaning

#### 10.1 `name` is used twelve+ times across the model
(model.ts:78, 81, 83 within docs, 187, 190, 250, 326, 329, etc.)
The semantics shift: function name, parameter name, catalog name,
schema name, etc. — but the field is consistently `name`. Combined
with `fullName`, `fullNameArg`, `functionFullName`, `tableFullName`,
`externalName`, `specificName`, the surface area of "name" fields is
huge. See also §7.2.

#### 10.2 `properties` (model.ts:118, 227, 366)
"JSON-serialized key-value pair map, encoded (escaped) as a string."
The field is `string`, despite the name promising a structured map.
A consumer reading the type sees `properties?: string` and has to
manually `JSON.parse`. Either name it `propertiesJson` or type it
as `Record<string, string>` with marshal-layer translation.

---

### 11. Field contradicting type domain

#### 11.1 `UpdateFunctionRequest` has `fullNameArg` *and* `name` (model.ts:324, 326)
- `fullNameArg` — the existing function's fully-qualified identifier
  (path param).
- `name` — the function name, body field (the new desired name?).

A caller staring at this struct cannot intuit which to set, in what
combination, or whether `name` is the *new* name or the *current*
name (the catalogs package answers this question differently with
`newName` — but `functions` lacks `newName` entirely, leaving the
caller without a renaming primitive at all, or with an ambiguous
`name` field). See also §7.4.

#### 11.2 `CreateFunction` contains read-only output fields
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`fullName`, `functionId`, `browseOnly` (model.ts:126-136). These are
server-populated; a creator setting them is at best ignored. The
type's domain is "create request body" but its shape contradicts
that. Mirror issue in `UpdateFunctionRequest` (model.ts:374-384).

#### 11.3 `DeleteFunctionRequest.fullNameArg` — see §3.3.

#### 11.4 `FunctionInfo.fullName` vs `name` / `catalogName` / `schemaName`
(model.ts:187-191, 233)
On `FunctionInfo`, all four are present; for *catalogs* a `fullName`
is redundant with `name`, but for *functions* `fullName` is
`catalog_name.schema_name.function_name`. The doc comment
underscores them as if they're literal placeholders. The naming is
acceptable but the redundancy invites inconsistent state.

---

### 12. Inconsistent action verbs

Method verbs in `Client`: `createFunction`, `deleteFunction`,
`getFunction`, `listFunctions`, `updateFunction`. Verbs are
consistent: standard CRUD. No `fetch…` / `retrieve…` / `read…`
outliers. No issues found.

---

### 13. Underspecified IDs

#### 13.1 `metastoreId` (model.ts:122, 231, 370)
Documented as "Unique identifier of parent metastore." Format
opaque (UUID? slug?). Acceptable but unspecified.

#### 13.2 `functionId` (model.ts:134, 243, 382)
Doc: "Id of Function, relative to parent schema." Format unspecified
— is this a UUID, an autoincrement integer, an opaque token? Type is
`string` so opaque, but the docs should say so.

#### 13.3 `metastoreId` & `functionId` — distinct domains, same shape
Both `string`, both undocumented for format, both server-assigned.
A consumer cannot tell them apart from the types.

---

## Additional / cross-cutting observations

### A. `flattenQueryParams` is defined but unused (utils.ts:123)
Each `listFunctions` / `getFunction` / `deleteFunction` handler
builds query strings inline with `URLSearchParams.append`
(client.ts:115-118, 156-159, 197-212). The exported helper
`flattenQueryParams` is never referenced by `client.ts`. Either it's
intentionally exported for consumer use (then it should be
documented) or it's dead code. Same finding as catalogs audit
(cross-cutting A).

### B. `fullNameArg` URL substitution silently allows empty string
(client.ts:122, 166, 283) — `${req.fullNameArg ?? ''}` — if
`fullNameArg` is undefined, the URL silently becomes
`/api/2.1/unity-catalog/functions/` and the request will fail on the
server. The naming (`fullNameArg`) and the substitution behaviour
together hide what should be a required parameter. Worth surfacing
via a non-optional type or a typed assertion.

### C. `marshalUpdateFunctionRequestSchema` serialises `fullNameArg` into the body
(model.ts:799) `fullNameArg` is a path parameter — but the marshal
schema produces a JSON field `full_name_arg`. Either the server
tolerates the extra field or this is a bug. The `Arg` suffix lets
the bug hide.

### D. `Client` constructor throws bare `Error` for missing `host` (client.ts:59)
"Host is required." — bare `Error`. Not a naming issue, flagged for
consistency with the catalogs audit.

### E. Package-name collision with JavaScript reserved word
The package is named `@databricks/sdk-functions` and the npm
workspace path is `packages/functions/`. `function` is a JS reserved
word; `functions` is not, but the proximity is jarring. Importers
will often write
`import * as functions from '@databricks/sdk-functions/v1'` which
sets up `functions.createFunction(…)` — the local binding `functions`
shadows nothing, but the combination of the package name and the
`Dependency.value.$case === 'function'` pattern creates a vocabulary
where "function" is overloaded.

### F. `FunctionInfo.routineDependencies` is described as "function dependencies."
(model.ts:119, 228, 367) Comment text starts with lowercase and uses
"function" instead of "routine"; field name uses "routine". See
§5.1.

### G. `parameterStyle: FunctionInfo_ParameterStyle` with one variant `S`
The most extreme case of a single-purpose API surface: a long enum
type holding a one-letter variant, only ever set to `S`, marshaled
as the JSON string `"S"`. Three layers of indirection for a constant.
See §2.1, §3.1.

---

## 14. Proto-architectural-leak naming

### 14.1 `FunctionInfo_ParameterStyle` — model.ts:42
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `FunctionParameterStyle` (or `ParameterStyle` if scoped to
the package).
Rationale: TypeScript enums do not need parent-qualifying via
underscore. The leak exposes the upstream proto schema's nested-type
layout to TS consumers.

### 14.2 `FunctionInfo_RoutineBody` — model.ts:47
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `RoutineBody`.
Rationale: Same as 14.1.

### 14.3 `FunctionInfo_SecurityType` — model.ts:59
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `SecurityType`.
Rationale: Same as 14.1.

### 14.4 `FunctionInfo_SqlDataAccess` — model.ts:64
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `SqlDataAccess`.
Rationale: Same as 14.1.

### 14.5 `DeleteFunctionRequest_Response` — model.ts:158
Why: `Request_Response` underscore-paired identifier mirrors proto
nested-response-message convention (`Foo_Response`). The lint comment
explicitly notes "Proto-style nested message name."
Category: Proto suffix/infix + `Foo_PublicRequest`-style paired naming.
Suggested: `DeleteFunctionResponse` (or omit entirely — it is an
empty object).
Rationale: TS has no nested-message concept; the underscore-paired
naming surfaces the upstream proto schema to consumers.

### 14.6 `ListFunctionsRequest_Response` — model.ts:306
Why: `Request_Response` underscore-paired identifier mirrors proto
nested-response-message convention.
Category: Proto suffix/infix + `Foo_PublicRequest`-style paired naming.
Suggested: `ListFunctionsResponse`.
Rationale: Same as 14.5.

### 14.7 `unmarshalDeleteFunctionRequest_ResponseSchema` — model.ts:406
Why: Schema constant inherits the `Request_Response` proto-nested
underscore identifier; verb-prefixed schema name (`unmarshal*Schema`)
on top further surfaces serialisation-layer concerns at the package
surface.
Category: Proto suffix/infix.
Suggested: `unmarshalDeleteFunctionResponseSchema`.
Rationale: Same as 14.5.

### 14.8 `unmarshalListFunctionsRequest_ResponseSchema` — model.ts:561
Why: Schema constant inherits the `Request_Response` proto-nested
underscore identifier.
Category: Proto suffix/infix.
Suggested: `unmarshalListFunctionsResponseSchema`.
Rationale: Same as 14.5.

### 14.9 `fullNameArg` — model.ts:152, 281, 324
Why: The `Arg` suffix is a Go SDK generator artifact distinguishing
path-parameter fields from same-keyed body fields; it has no meaning
on the TS surface.
Category: Generator/codegen artifact (proto-adjacent).
Suggested: `fullName` (drop `Arg`).
Rationale: TS consumers do not see the path/body split; the suffix
exposes a generator implementation detail. Already cross-referenced
in §3.3, §9.2; re-flagged here as a proto-architectural leak.

### 14.10 `Dependency.value.$case` discriminated-union shape — model.ts:165-170
Why: `{$case: 'foo'; foo: T}` is the ts-proto serialiser's encoding
for oneof fields; native TS discriminated unions normally use a
top-level discriminator key, not a `value`-wrapped `$case` envelope.
Category: Proto suffix/infix (encoding leak).
Suggested: Flatten to `{type: 'function'; function: FunctionDependency} | ...`
at the top level.
Rationale: The `$case` discriminator key and the `value`-wrapped
envelope visibly reflect proto oneof semantics. Already noted in
§9.3; re-flagged here as a proto-architectural leak.

---

## File / line index for fast lookup

| Identifier                                               | Location              | Finding |
| -------------------------------------------------------- | --------------------- | ------- |
| `FunctionParameterMode`                                  | model.ts:32           | 3.2 |
| `FunctionParameterMode.IN`                               | model.ts:32-34        | 3.2 |
| `FunctionInfo_ParameterStyle.S`                          | model.ts:43           | 2.1, 3.1 |
| `FunctionInfo_SecurityType.DEFINER`                      | model.ts:59-61        | 2.2 |
| `FunctionInfo_SqlDataAccess`                             | model.ts:64           | 4.1 |
| `CreateFunction`                                         | model.ts:76           | 7.1, 11.2 |
| `CreateFunction.specificName`                            | model.ts:104          | 5.3 |
| `CreateFunction.fullName`                                | model.ts:124          | 7.2, 11.4 |
| `CreateFunction.functionId / metastoreId / createdAt / etc.` | model.ts:122-136  | 11.2, 13.1, 13.2 |
| `DeleteFunctionRequest.fullNameArg`                      | model.ts:152          | 3.3, 9.2, 11.3 |
| `DeleteFunctionRequest.force`                            | model.ts:154          | 5.2 |
| `Dependency.value.$case`                                 | model.ts:165          | 9.3 |
| `FunctionInfo`                                           | model.ts:185          | 7.1 |
| `FunctionInfo.specificName`                              | model.ts:213          | 5.3 |
| `FunctionInfo.properties`                                | model.ts:227          | 10.2 |
| `FunctionInfo.fullName`                                  | model.ts:233          | 7.2, 11.4 |
| `FunctionInfo.functionId`                                | model.ts:243          | 13.2, 13.3 |
| `FunctionParameterInfo.name`                             | model.ts:250          | 10.1 |
| `FunctionParameterInfo.typeText / typeJson / typeName`   | model.ts:252-256      | 4.3, 4.4 |
| `GetFunctionRequest.fullNameArg`                         | model.ts:281          | 3.3, 9.2 |
| `UpdateFunctionRequest`                                  | model.ts:322          | 7.1, 7.4, 11.1, 11.2 |
| `UpdateFunctionRequest.fullNameArg / name`               | model.ts:324, 326     | 3.3, 7.4, 11.1 |
| `UpdateFunctionRequest.fullName`                         | model.ts:372          | 7.2, 11.4 |
| `Client` (bare name)                                     | client.ts:44          | 9.1 |
| `${req.fullNameArg ?? ''}` URL substitution              | client.ts:122, 166, 283 | B |
| `flattenQueryParams` (unused export)                     | utils.ts:123          | A |

---

## Recommended priority order

1. **Fix `fullNameArg` / `name` confusion on `UpdateFunctionRequest`** — there is no `newName` field, so `name`'s role (current vs new) is undocumented. (§11.1, §3.3)
2. **Expose `SQL` / spell-out variants for cryptic single-letter enums** (`FunctionInfo_ParameterStyle.S`, `FunctionParameterMode.IN`, `FunctionInfo_SecurityType.DEFINER`). (§2.1, §2.2, §3.1, §3.2)
3. **Strip read-only fields from `CreateFunction` / `UpdateFunctionRequest`.** (§11.2)
4. **Either document or remove the unused `flattenQueryParams` export.** (Cross-cutting A)

---
