# Naming Audit: `functions` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/uc/functions/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`, `src/v1/transport.ts`
**Domain:** Unity Catalog Functions (SQL / Python UDFs and UDTFs).
**Total weird names flagged:** 9

---

## Findings

### 1. Misleading names

#### 1.1 `specificName` reserved-for-future-use (model.ts:132, 241, 379)
Doc: "Specific name of the function; Reserved for future use." A
field whose name promises specificity and whose docs admit it's
unused is a future trap. Better to omit until it does something.

---

### 2. Go / Java-style names

#### 2.1 `Dependency.value.$case` discriminated union encoding (model.ts:192-199)
The `$case` discriminator with `value`-keyed payload is a ts-proto
serialiser idiom. TS-native discriminated unions usually keep the
discriminator at the top level (`{type: 'function', function: {…}}`)
rather than wrapping in `value`. Functional, but visibly Go/proto.

---

### 3. Field contradicting type domain

#### 3.1 `CreateFunction` contains read-only output fields
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`fullName`, `functionId`, `browseOnly` (model.ts:149-164). These are
server-populated; a creator setting them is at best ignored. The
type's domain is "create request body" but its shape contradicts
that. Mirror issue in `UpdateFunctionRequest` (model.ts:396-411).

---

### 4. Proto-architectural-leak naming

#### 4.1 `FunctionInfo_ParameterStyle` — model.ts:54
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `FunctionParameterStyle` (or `ParameterStyle` if scoped to
the package).
Rationale: TypeScript enums do not need parent-qualifying via
underscore. The leak exposes the upstream proto schema's nested-type
layout to TS consumers.

#### 4.2 `FunctionInfo_RoutineBody` — model.ts:63
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `RoutineBody`.
Rationale: Same as 4.1.

#### 4.3 `FunctionInfo_SecurityType` — model.ts:79
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `SecurityType`.
Rationale: Same as 4.1.

#### 4.4 `FunctionInfo_SqlDataAccess` — model.ts:88
Why: `Parent_Child` underscore identifier is a proto/ts-proto
serialiser idiom for nested message/enum types.
Category: Proto suffix/infix.
Suggested: `SqlDataAccess`.
Rationale: Same as 4.1.

#### 4.5 `Dependency.value.$case` discriminated-union shape — model.ts:192-199
Why: `{$case: 'foo'; foo: T}` is the ts-proto serialiser's encoding
for oneof fields; native TS discriminated unions normally use a
top-level discriminator key, not a `value`-wrapped `$case` envelope.
Category: Proto suffix/infix (encoding leak).
Suggested: Flatten to `{type: 'function'; function: FunctionDependency} | ...`
at the top level.
Rationale: The `$case` discriminator key and the `value`-wrapped
envelope visibly reflect proto oneof semantics. Already noted in
§2.1; re-flagged here as a proto-architectural leak.

---

## Observations

### A. `fullNameArg` URL substitution silently allows empty string
(client.ts:120, 162, 278) — `${req.fullNameArg ?? ''}` — if
`fullNameArg` is undefined, the URL silently becomes
`/api/2.1/unity-catalog/functions/` and the request will fail on the
server. The naming (`fullNameArg`) and the substitution behaviour
together hide what should be a required parameter. Worth surfacing
via a non-optional type or a typed assertion.
