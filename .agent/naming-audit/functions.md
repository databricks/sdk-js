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
JavaScript's `function` reserved word; (2) cryptic single-letter enum
variants (`S`, `IN`, `DEFINER`); (3) the cryptic `fullNameArg`
path-parameter field; and (4) widespread `type*` and `parameter*`
field prefixes that re-encode the parent type's domain.

---

## Findings

### 1. Vague / generic names

#### 1.1 `DeleteFunctionRequest.force` (model.ts:154)
Field name `force` is generic. Doc says "Force deletion even if the
function is notempty." (typo preserved). A function that "isn't
empty" — what does "empty" mean for a function? Probably a copy-paste
from the schema/catalog delete operations. The field name `force`
carries no information about *what* it overrides; consider
`forceDelete` or, better, surface the underlying constraint in the
name.

#### 1.2 `FunctionParameterInfo.position` (model.ts:264)
Generic name on a field whose meaning is implementation-specific
(zero-indexed ordinal position). `parameterIndex` or
`ordinalPosition` would be unambiguous. Compare to `Position` types
in editors / DOM — `position` here is overloaded.

#### 1.3 `FunctionParameterInfo.comment` (model.ts:272)
"User-provided free-form text description" — this is a description,
not a comment. `description` is what the field actually contains.
Same pattern repeats on `CreateFunction.comment`, `FunctionInfo.comment`,
`UpdateFunctionRequest.comment` (model.ts:116, 225, 364).

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

#### 3.5 `respBody` (client.ts:89, 126, 167, 220, 273) — internal-only; mild.

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
indiscriminately — see §5.3.

#### 5.2 `DeleteFunctionRequest.force` doc has typo "notempty" (model.ts:153)
"Force deletion even if the function is notempty." Should be "not
empty". Doc bug, not a naming bug, but signals the field hasn't been
read recently. See also §1.1.

#### 5.3 "Function" vs "Routine" terminology mixed everywhere
Every type and method speaks of `function*`. But every body-related
field speaks of `routine*`: `routineBody`, `routineDefinition`,
`routineDependencies`. The enum is `FunctionInfo_RoutineBody`. A
function's *body* is a *routine*. This split is a Go-port artifact
of the SQL standard's vocabulary (`CREATE PROCEDURE … LANGUAGE
SQL ROUTINE_BODY …`) — but for a TS consumer the inconsistency is
jarring. `body`, `definition`, `dependencies` (dropping `routine`)
would be cleaner. See also §5.1.

#### 5.4 `parameterDefault: string` (model.ts:270)
Doc: "Default value of the parameter." The default of a function
parameter is rarely a string in the source domain — it might be a
number, a boolean, an interval, or even `NULL`. Typing it as `string`
implies serialised form, but the field name `parameterDefault`
doesn't signal that. Consider `parameterDefaultExpression` or
`parameterDefaultText`.

#### 5.5 `specificName` reserved-for-future-use (model.ts:104, 213, 352)
Doc: "Specific name of the function; Reserved for future use." A
field whose name promises specificity and whose docs admit it's
unused is a future trap. Better to omit until it does something.

---

### 6. Reserved-word collisions

#### 6.1 `Function` / `function` — the entire package name collides with a JS reserved word
(model.ts and across the file)

`function` is a JavaScript reserved keyword
(<https://tc39.es/ecma262/#sec-keywords-and-reserved-words>).
`Function` is also the name of the global constructor for function
objects. Although TypeScript permits both as identifier names in
most positions, this package routinely uses them in ways that
collide:

- The `Dependency.value` discriminated union (model.ts:167) uses
  `$case: 'function'` and a `function` property as one arm of the
  union. The runtime payload key is `function`, which means consumers
  must write
  `if (dep.value?.$case === 'function') { dep.value.function … }` —
  reading `dep.value.function` is jarring next to other code that
  treats `function` as a keyword.
- The unmarshal schema (model.ts:412, 421) reads
  `function: z.lazy(() => unmarshalFunctionDependencySchema)` —
  again the property name is `function`.
- The marshal schema (model.ts:679-680) similarly has
  `$case: z.literal('function'), function: z.lazy(…)`.
- The Go-side wire format uses snake_case (`function`) so the field
  is forced; renaming requires breaking compatibility.

This is the package's single biggest naming hazard. A consumer
auto-completing `dep.value.` will see a property called `function`
adjacent to TS keyword highlighting in their editor. Consider
renaming the union arm to `functionRef`, `functionDependency`, or
nesting via a different discriminator.

#### 6.2 `name` field
`name` is used as a body field on `CreateFunction`,
`UpdateFunctionRequest`, `FunctionInfo`, `FunctionParameterInfo`
(model.ts:78, 187, 250, 326), and again indirectly via `fullNameArg`.
Not a reserved word but shadows `Function.prototype.name` — common
source of confusion when callers spread request objects.

#### 6.3 `options` parameter on every client method
(client.ts:80, 112, 153, 194, 239, 264) — the second parameter is
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

#### 10.3 `comment` (model.ts:116, 225, 272, 364) — see §1.3.

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

#### 13.4 `createdAt` / `updatedAt` (model.ts:126, 130, 235, 239, 374, 378)
Type is `number` (epoch milliseconds per the doc). The field name
doesn't convey unit. `createdAtMs` / `updatedAtMs` or `createdAtEpochMs`
would be more honest. The catalogs audit flagged the same
inconsistency.

#### 13.5 `connectionName` (model.ts:73) — "Full name of the dependent connection, in the form of __connection_name__."
The field is named `connectionName` but the doc says it should be a
"full name". For other dependency types, the field is explicitly
named `*FullName` (e.g. `tableFullName`, `functionFullName`). Naming
inconsistency: ConnectionDependency and CredentialDependency
(model.ts:147) use `…Name`; the rest use `…FullName`. Pick one.

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
(client.ts:114, 155, 266) — `${req.fullNameArg ?? ''}` — if
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

### D. `Client` constructor throws bare `Error` for missing `host` (client.ts:55)
"Host is required." — bare `Error`. Not a naming issue, flagged for
consistency with the catalogs audit.

### E. Package-name collision with JavaScript reserved word
The package is named `@databricks/sdk-functions` and the npm
workspace path is `packages/functions/`. `function` is a JS reserved
word; `functions` is not, but the proximity is jarring. Importers
will often write
`import * as functions from '@databricks/sdk-functions/v1'` which
sets up `functions.createFunction(…)` — the local binding `functions`
shadows nothing, but the `Dependency.value.$case === 'function'`
pattern (§6.1) combined with the package name creates a vocabulary
where "function" is overloaded.

### F. `FunctionInfo.routineDependencies` is described as "function dependencies."
(model.ts:119, 228, 367) Comment text starts with lowercase and uses
"function" instead of "routine"; field name uses "routine". See
§5.1 and §5.3.

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
| `ConnectionDependency.connectionName`                    | model.ts:73           | 13.5 |
| `CreateFunction`                                         | model.ts:76           | 7.1, 11.2 |
| `CreateFunction.routineBody/routineDefinition/routineDependencies` | model.ts:90/92/120 | 5.3 |
| `CreateFunction.specificName`                            | model.ts:104          | 5.5 |
| `CreateFunction.fullName`                                | model.ts:124          | 7.2, 11.4 |
| `CreateFunction.functionId / metastoreId / createdAt / etc.` | model.ts:122-136  | 11.2, 13.1, 13.2, 13.4 |
| `DeleteFunctionRequest.fullNameArg`                      | model.ts:152          | 3.3, 9.2, 11.3 |
| `DeleteFunctionRequest.force`                            | model.ts:154          | 1.1, 5.2 |
| `Dependency.value.function` arm                          | model.ts:167          | 6.1 |
| `Dependency.value.$case`                                 | model.ts:165          | 9.3 |
| `FunctionInfo`                                           | model.ts:185          | 7.1 |
| `FunctionInfo.routineBody/Definition/Dependencies`       | model.ts:199/201/229  | 5.3 |
| `FunctionInfo.specificName`                              | model.ts:213          | 5.5 |
| `FunctionInfo.properties`                                | model.ts:227          | 10.2 |
| `FunctionInfo.fullName`                                  | model.ts:233          | 7.2, 11.4 |
| `FunctionInfo.functionId`                                | model.ts:243          | 13.2, 13.3 |
| `FunctionParameterInfo.name`                             | model.ts:250          | 6.2, 10.1 |
| `FunctionParameterInfo.typeText / typeJson / typeName`   | model.ts:252-256      | 4.3, 4.4 |
| `FunctionParameterInfo.position`                         | model.ts:264          | 1.2 |
| `FunctionParameterInfo.parameterDefault`                 | model.ts:270          | 5.4 |
| `FunctionParameterInfo.comment`                          | model.ts:272          | 1.3 |
| `GetFunctionRequest.fullNameArg`                         | model.ts:281          | 3.3, 9.2 |
| `UpdateFunctionRequest`                                  | model.ts:322          | 7.1, 7.4, 11.1, 11.2 |
| `UpdateFunctionRequest.fullNameArg / name`               | model.ts:324, 326     | 3.3, 7.4, 11.1 |
| `UpdateFunctionRequest.routineBody / routineDefinition / routineDependencies` | model.ts:338/340/368 | 5.3 |
| `UpdateFunctionRequest.fullName`                         | model.ts:372          | 7.2, 11.4 |
| `Client` (bare name)                                     | client.ts:44          | 9.1 |
| `${req.fullNameArg ?? ''}` URL substitution              | client.ts:114, 155, 266 | B |
| `flattenQueryParams` (unused export)                     | utils.ts:123          | A |

---

## Recommended priority order

1. **Resolve the `function` reserved-word collision in `Dependency.value`** — the union arm-key `function` is the single most jarring naming hazard in the package. (§6.1)
2. **Fix `fullNameArg` / `name` confusion on `UpdateFunctionRequest`** — there is no `newName` field, so `name`'s role (current vs new) is undocumented. (§11.1, §3.3)
3. **Resolve "function" vs "routine" vocabulary split.** (§5.3)
4. **Expose `SQL` / spell-out variants for cryptic single-letter enums** (`FunctionInfo_ParameterStyle.S`, `FunctionParameterMode.IN`, `FunctionInfo_SecurityType.DEFINER`). (§2.1, §2.2, §3.1, §3.2)
5. **Strip read-only fields from `CreateFunction` / `UpdateFunctionRequest`.** (§11.2)
6. **Unify `*Name` vs `*FullName` field-naming on `*Dependency` types.** (§13.5)
7. **Either document or remove the unused `flattenQueryParams` export.** (Cross-cutting A)
