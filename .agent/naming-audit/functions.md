# Naming Audit: `functions` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/uc/functions/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`, `src/v1/transport.ts`
**Domain:** Unity Catalog Functions (SQL / Python UDFs and UDTFs).
**Total weird names flagged:** 14 (rescanned 2026-06-02 after the API
regeneration and LRO/waiter refactor).

---

## Findings

### 1. Single-variant enums surfaced as full enum types

#### 1.1 `FunctionInfo_SecurityType.DEFINER` (model.ts:59-61)
Single-variant enum with `DEFINER`. The single-valued switch is
surfaced as a full enum type; the variant itself is meaningful (SQL
`SECURITY DEFINER` clause) but the TS-side ergonomics suffer.

---

### 2. Misleading names

#### 2.1 `specificName` reserved-for-future-use (model.ts:104, 213, 351)
Doc: "Specific name of the function; Reserved for future use." A
field whose name promises specificity and whose docs admit it's
unused is a future trap. Better to omit until it does something.

---

### 3. Reserved-word collisions

#### 3.1 `options` parameter on every client method
(client.ts:82, 117, 158, 202, 247, 272) — the second parameter is
named `options` and shadows the marshal schema's `options`-style
metadata patterns.

---

### 4. Go / Java-style names

#### 4.1 `Dependency.value.$case` discriminated union encoding (model.ts:165-170)
The `$case` discriminator with `value`-keyed payload is a ts-proto
serialiser idiom. TS-native discriminated unions usually keep the
discriminator at the top level (`{type: 'function', function: {…}}`)
rather than wrapping in `value`. Functional, but visibly Go/proto.

---

### 5. Field contradicting type domain

#### 5.1 `CreateFunction` contains read-only output fields
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`fullName`, `functionId`, `browseOnly` (model.ts:126-136). These are
server-populated; a creator setting them is at best ignored. The
type's domain is "create request body" but its shape contradicts
that. Mirror issue in `UpdateFunctionRequest` (model.ts:373-383).

---

### 6. Proto-architectural-leak naming

#### 6.1 `FunctionInfo_ParameterStyle` — model.ts:42
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `FunctionParameterStyle` (or `ParameterStyle` if scoped to
the package).
Rationale: TypeScript enums do not need parent-qualifying via
underscore. The leak exposes the upstream proto schema's nested-type
layout to TS consumers.

#### 6.2 `FunctionInfo_RoutineBody` — model.ts:47
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `RoutineBody`.
Rationale: Same as 6.1.

#### 6.3 `FunctionInfo_SecurityType` — model.ts:59
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `SecurityType`.
Rationale: Same as 6.1.

#### 6.4 `FunctionInfo_SqlDataAccess` — model.ts:64
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `SqlDataAccess`.
Rationale: Same as 6.1.

#### 6.5 `Dependency.value.$case` discriminated-union shape — model.ts:165-170
Why: `{$case: 'foo'; foo: T}` is the ts-proto serialiser's encoding
for oneof fields; native TS discriminated unions normally use a
top-level discriminator key, not a `value`-wrapped `$case` envelope.
Category: Proto suffix/infix (encoding leak).
Suggested: Flatten to `{type: 'function'; function: FunctionDependency} | ...`
at the top level.
Rationale: The `$case` discriminator key and the `value`-wrapped
envelope visibly reflect proto oneof semantics. Already noted in
§4.1; re-flagged here as a proto-architectural leak.

---

## Observations

### A. `fullNameArg` URL substitution silently allows empty string
(client.ts:119, 160, 274) — `${req.fullNameArg ?? ''}` — if
`fullNameArg` is undefined, the URL silently becomes
`/api/2.1/unity-catalog/functions/` and the request will fail on the
server. The naming (`fullNameArg`) and the substitution behaviour
together hide what should be a required parameter. Worth surfacing
via a non-optional type or a typed assertion.

### B. `marshalUpdateFunctionRequestSchema` serialises `fullNameArg` into the body
(model.ts:802) `fullNameArg` is a path parameter — but the marshal
schema produces a JSON field `full_name_arg`. Either the server
tolerates the extra field or this is a bug. The `Arg` suffix lets
the bug hide.

### C. Package-name proximity to JavaScript reserved word
The package is named `@databricks/sdk-uc-functions` and the npm
workspace path is `packages/uc/functions/`. `function` is a JS reserved
word; `functions` is not, but the proximity is jarring. Importers
will often write
`import * as functions from '@databricks/sdk-uc-functions/v1'` which
sets up `functions.createFunction(…)` — the local binding `functions`
shadows nothing, but the combination of the package name and the
`Dependency.value.$case === 'function'` pattern creates a vocabulary
where "function" is overloaded.

### D. `parameterStyle: FunctionInfo_ParameterStyle` with one variant `S`
The most extreme case of a single-purpose API surface: a long enum
type holding a one-letter variant, only ever set to `S`, marshaled
as the JSON string `"S"`. Three layers of indirection for a constant.
See §6.1.
