# Naming Audit: `artifactallowlists` (v1)

Package path: `/home/parth.bansal/sdk-js/packages/artifactallowlists/`
Files audited: `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`.

Notation: file paths are absolute. Findings reference `file:line`.

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 3     |
| Medium      | 6     |
| Low         | 4     |
| Observation | 7     |
| **Total**   | **20** |

Headline themes:

1. **Request types lack a `Request` suffix** (e.g. `GetArtifactAllowlist`,
   `SetArtifactAllowlist`). They are imperative phrases that read like
   operations, not data shapes — and `GetArtifactAllowlist` collides
   semantically with the `getArtifactAllowlist` method on `Client`. This is a
   codebase-wide convention question rather than a defect local to this
   package; `accountsettings` and others use the `…Request` suffix while
   `catalogs`, `connections`, `clusters`, etc. omit it.
2. **Proto-style underscore in `ArtifactMatcher_MatchType`** breaks the
   TypeScript identifier convention but is a deliberate, repo-wide pattern
   (see Observation O5 for evidence). Flagged for visibility only.
3. **Redundant `Info` suffix on `ArtifactAllowlistInfo`** is the canonical
   payload type for both `Get` and `Set` responses; the suffix adds no
   information beyond "this is a struct."
4. **Redundant `*_UNSPECIFIED` enum prefixes** repeat the enum domain
   (`ARTIFACT_TYPE_UNSPECIFIED`, `MATCH_TYPE_UNSPECIFIED`) — but again this
   is the universal proto-mirror convention across the SDK.

Allowlist casing is **consistent** throughout the package (always
`Allowlist`, never `AllowList` or `Whitelist`).

---

## High Severity

### H1. `GetArtifactAllowlist` collides with the client method of the same name

- **File / line:** `src/v1/model.ts:39`; cross-ref `src/v1/client.ts:66`.
- **Category:** #6 misleading name; #20 type-suffix tautology (inverse —
  missing suffix).
- **Current:** `interface GetArtifactAllowlist { artifactType?: ArtifactType }`.
- **Suggestion:** `GetArtifactAllowlistRequest`.
- **Rationale:** `GetArtifactAllowlist` reads as an action / operation name.
  TypeScript users who see `client.getArtifactAllowlist(req: GetArtifactAllowlist)`
  must mentally distinguish a verb-phrase function from a verb-phrase type.
  Several sibling packages (`accountsettings`, `budgetpolicy`, `bundle`) use
  the `…Request` suffix; adopting that here removes the verb/noun overload.

### H2. `SetArtifactAllowlist` carries server-derived fields on a request type

- **File / line:** `src/v1/model.ts:44–55`.
- **Category:** #6 misleading name; #16 field contradicting type domain.
- **Current:** Fields `createdBy?: string` and `createdAt?: number` are
  present on what is documented as the SET payload — these are server-set
  timestamps/identities and are also present on `ArtifactAllowlistInfo`.
- **Suggestion:** Either rename to `SetArtifactAllowlistRequest` and remove
  `createdBy` / `createdAt` (they are response-only), or — if the underlying
  API truly accepts them — clarify in the doc that the server ignores them.
- **Rationale:** A request type whose name reads as a verb ("Set the
  allowlist") but whose fields include response-only metadata is misleading.
  This causes the marshal schema (`marshalSetArtifactAllowlistSchema`,
  lines 94–110) to emit `created_by`/`created_at` keys back to the server
  unnecessarily. Even if the server tolerates them, exposing them on the
  request shape invites misuse.

### H3. `marshalSetArtifactAllowlistSchema` typed `z.ZodType` (no parameter)

- **File / line:** `src/v1/model.ts:94`; `marshalArtifactMatcherSchema` at
  line 84 has the same shape.
- **Category:** #15 generic field name losing meaning; #20 type-suffix
  tautology (the `Schema` suffix is intentional, but the parameter
  `z.ZodType` is left untyped — this is a *naming via type* issue).
- **Current:** `export const marshalSetArtifactAllowlistSchema: z.ZodType = …`.
- **Suggestion:** Parameterize to `z.ZodType<SetArtifactAllowlist>` (mirror
  the unmarshal sibling at line 57: `z.ZodType<ArtifactAllowlistInfo>`).
- **Rationale:** Without a generic parameter, the symbol's name promises a
  typed schema for `SetArtifactAllowlist` but its compile-time signature is
  `ZodType<unknown>`. Readers must trust the name. The unmarshal variant
  models this correctly; the marshal variants do not.

---

## Medium Severity

### M1. `ArtifactAllowlistInfo` — redundant `Info` suffix

- **File / line:** `src/v1/model.ts:21`.
- **Category:** #8 redundant suffix; #14 Go/Java-style name.
- **Current:** `ArtifactAllowlistInfo`.
- **Suggestion:** `ArtifactAllowlist`.
- **Rationale:** `Info` adds no semantic content in TypeScript — the type
  *is* the artifact-allowlist record returned by Get and Set. The `Info`
  suffix is a Go/proto idiom (cf. `CatalogInfo`, `FunctionInfo`,
  `ConnectionInfo`) but TypeScript convention is to keep the noun bare. If
  the codebase deliberately mirrors Go, document it; otherwise dropping
  `Info` would also free `ArtifactAllowlist` as the natural domain noun
  (today, the package has no type with that bare name, even though it is
  literally the "artifact allowlists" package).

### M2. `GetArtifactAllowlist` / `SetArtifactAllowlist` use inconsistent
verbs vs. UC sibling APIs

- **File / line:** `src/v1/model.ts:39, 44`; `client.ts:66, 96`.
- **Category:** #17 inconsistent action verbs.
- **Current:** `Get…` + `Set…`.
- **Suggestion:** Confirm whether `Set` is intentional vs. `Update`. The Unity
  Catalog REST API frequently uses `PUT` semantics with `Update…` verbs (see
  `catalogs`, `connections`, `externallocations`, `storagecredentials`).
- **Rationale:** The HTTP method here is `PUT` (`client.ts:106`) and the
  docstring says "The whole artifact allowlist is replaced with the new
  allowlist" — a replace semantic. UC peers typically expose this as
  `update…`. If the API spec dictates `Set`, this is correct; the audit
  flags it because the verb is unique within UC.

### M3. `artifactMatchers` field is a Boolean-sounding plural of a matcher
type that is itself a noun-from-verb

- **File / line:** `src/v1/model.ts:23, 48`.
- **Category:** #15 generic field name losing meaning.
- **Current:** `artifactMatchers?: ArtifactMatcher[]`.
- **Suggestion:** Consider `allowedPatterns` or `patterns` (matching the
  field's own JSDoc: "A list of allowed artifact match patterns"). At
  minimum, the inline doc should explain that an "ArtifactMatcher" is one
  rule (artifact + match-type), not a function.
- **Rationale:** The doc comment ("allowed artifact match patterns")
  describes a different mental model than the type name suggests. A reader
  encountering `artifactMatchers` may expect predicate functions rather than
  a `{artifact, matchType}` rule object. Note: this name *does* match the
  Go SDK convention, so changing it would be a breaking divergence.

### M4. `artifact` (the field inside `ArtifactMatcher`) is dangerously generic

- **File / line:** `src/v1/model.ts:34`.
- **Category:** #1 vague/generic without domain context; #15 generic field
  name losing meaning.
- **Current:** `artifact?: string`.
- **Suggestion:** `artifactPath` or `artifactPattern` (the docstring says
  "The artifact path or maven coordinate").
- **Rationale:** Inside a type already named `ArtifactMatcher`, `artifact`
  contributes no information; the actual semantic is "the path/coordinate
  this rule matches against." Either of `artifactPath` or `artifactPattern`
  reflects that. Caveat: matches the Go SDK exactly, so a rename would
  break the 1:1 port.

### M5. `matchType` is contextless on `ArtifactMatcher` and the enum has a
unique prefix style

- **File / line:** `src/v1/model.ts:36`; enum at line 15.
- **Category:** #2 redundant enum prefix; #18 long enum values.
- **Current:** `matchType?: ArtifactMatcher_MatchType` with values
  `MATCH_TYPE_UNSPECIFIED`, `PREFIX_MATCH`.
- **Suggestion:** Drop the `MATCH_TYPE_` prefix from the unspecified value
  (`UNSPECIFIED` — but see Observation O3 below for why this is repo-wide).
  Otherwise the field name is fine as-is.
- **Rationale:** `MATCH_TYPE_UNSPECIFIED` repeats the enum name; in
  TypeScript `ArtifactMatcher_MatchType.UNSPECIFIED` reads cleaner. This is
  a SDK-wide convention so the change has cross-package implications.

### M6. `req` parameter name on `Client.getArtifactAllowlist` /
`setArtifactAllowlist`

- **File / line:** `src/v1/client.ts:67, 97`.
- **Category:** #5 cryptic abbreviation; #14 Go-style name.
- **Current:** `req: GetArtifactAllowlist`.
- **Suggestion:** `request` (matches Go-port readability without saving
  characters that matter in TypeScript).
- **Rationale:** Throughout the JS/TS ecosystem, function parameters tend
  to be spelled out (`request`, `response`) rather than abbreviated. The Go
  `req`/`resp` idiom is fine in Go where short names are encouraged; in TS
  it reads as Go-translated code. (Note: `resp` shows up locally in the
  same file at lines 71, 84, 102, 115 — a separate, lower-priority issue.)

---

## Low Severity

### L1. `executeCall` vs. `executeHttpCall` — overlapping verbs

- **File / line:** `src/v1/utils.ts:26, 65`.
- **Category:** #6 misleading name; #12 duplicate concepts.
- **Current:** Both functions live in the same file with very similar
  names. `executeCall` is the public-options translator that delegates to
  `execute` from `@databricks/sdk-core/api`. `executeHttpCall` is the low-
  level HTTP send + parse helper.
- **Suggestion:** Rename `executeCall` to `runCallWithOptions` /
  `dispatchCall` (or fold into `executeHttpCall` if the indirection is
  trivial). At minimum, the JSDoc already calls this out as a *translator*
  — the name should match.
- **Rationale:** Two functions named `execute*Call` in 70 lines of code,
  with different return shapes (`Promise<void>` vs.
  `Promise<Uint8Array>`), is a readability hazard. The JSDoc on line 21–25
  explicitly says "Translates public CallOptions to the internal Options
  shape," which is a better name.

### L2. `Call` (imported, not local) and `call` local variable share names

- **File / line:** `src/v1/client.ts:72` (`const call: Call = …`).
- **Category:** #1 vague/generic.
- **Current:** `const call: Call = async (callSignal?: AbortSignal) => …`.
- **Suggestion:** `httpCall` or `doRequest`.
- **Rationale:** `call` is a built-in word in JS (`.call()` on functions),
  so a variable named `call` inside a method that is itself a call is
  ambiguous. Caveat: this is a 1:1 port of Go SDK convention.

### L3. `body` shadowed twice in `executeHttpCall`

- **File / line:** `src/v1/utils.ts:81` and parameter `body` of
  `buildHttpRequest` (line 101) / `parseResponse` (line 113) /
  `marshalRequest` (line 119 — `data`).
- **Category:** #1 vague generic name.
- **Current:** `body: Uint8Array` (response body) vs. `body: string |
  ReadableStream<Uint8Array>` (request body, in `buildHttpRequest`).
- **Suggestion:** `responseBody` / `requestBody`.
- **Rationale:** Within `client.ts` line 101 we already see
  `const body = marshalRequest(…)` (a request body) being passed into a
  function that internally also reasons about response bodies. Differentiating
  with `requestBody` / `responseBody` would help readers.

### L4. `marshalRequest` accepts `data: unknown` — the parameter name
contradicts the function's purpose

- **File / line:** `src/v1/utils.ts:119`.
- **Category:** #15 generic field name losing meaning.
- **Current:** `function marshalRequest(data: unknown, schema: z.ZodType)`.
- **Suggestion:** `function marshalRequest(request: unknown, schema)` or
  `(payload, schema)`.
- **Rationale:** The function name says "request", but the first argument
  is named `data`. Calling at `client.ts:101` reads
  `marshalRequest(req, marshalSetArtifactAllowlistSchema)` — `req` →
  `data` loses the request semantics in the helper.

---

## Observations (Repo-wide conventions, not local defects)

### O1. Bare `GetX`/`SetX` request shapes are a repo-wide pattern

Sibling packages `catalogs`, `connections`, `clusters`, `externallocations`,
`clusterpolicies` all use bare verb-phrases for request types. See evidence
in `grep -rE "^export interface (Get|Set|Create|Update|Delete)…"` across
the workspace. Changing this package alone would create asymmetry.

### O2. Proto-style nested enum names with underscores are repo-wide

`ArtifactMatcher_MatchType` is one of 20+ enums of the form
`<Parent>_<Field>` across the workspace (`BudgetConfigurationFilter_Operator`,
`CleanRoomAutoApprovalRule_AuthorScope`, `ConversionInfo_State`,
`DatabaseInstance_State`, `EndpointStatus_State`, etc.). This violates
TypeScript naming convention (PascalCase, no underscores) but is the agreed
mirror of the Go SDK's `Parent_Field` proto idiom. The file even disables
the lint rule explicitly at `model.ts:14`. Flag for awareness only.

### O3. `*_UNSPECIFIED` zero values repeated across enums

Both `ArtifactType.ARTIFACT_TYPE_UNSPECIFIED` and
`ArtifactMatcher_MatchType.MATCH_TYPE_UNSPECIFIED` repeat the enum domain
in the member name. This is a proto-buf default and is consistent with
sibling packages (`CleanRoomAutoApprovalRule_AuthorScope`,
`DatabaseInstance_State`, …). Not a local defect.

### O4. `…Info` suffix repeated across UC types

`ArtifactAllowlistInfo` follows the `CatalogInfo`, `ConnectionInfo`,
`FunctionInfo`, `ExternalLocationInfo`, `SchemaInfo` pattern. If the
codebase decides to drop the `Info` suffix, this is one of many to fix.

### O5. Allowlist terminology / casing is consistent

`Allowlist` (single uppercase A, then lowercase `llowlist`) is used in
every position in this package: type names, methods, schemas, comments,
URL paths (`/artifact-allowlists/`), and the package name
`@databricks/sdk-artifactallowlists`. No `AllowList`, `Allow_list`, or
`Whitelist` anywhere. **Passes** the audit on this criterion.

### O6. URL path constant is inlined

The string `/api/2.1/unity-catalog/artifact-allowlists/${artifactType}`
appears twice (`client.ts:70` and `client.ts:100`) without a named
constant. Not a naming defect, but typical naming-audit findings include
"unnamed magic strings." Worth a note.

### O7. `PACKAGE_SEGMENT.key` is computed from `pkgJson.name` via regex

`client.ts:31–34`: `key: pkgJson.name.replace(/^@[^/]+\//, '')` strips the
`@databricks/` org prefix. The variable name `PACKAGE_SEGMENT` reads fine
but the `key`/`value` shape is generic — readers may not know `key` is
"package name" and `value` is "package version" without inspecting
`createDefault().with(...)`. No action required; cosmetic.

---

## Domain glossary

| Term                       | Meaning in this package                                    |
| -------------------------- | ---------------------------------------------------------- |
| Artifact                   | A user-supplied resource (init script / jar / maven coord) installed onto a cluster. |
| Artifact type              | One of `INIT_SCRIPT`, `LIBRARY_JAR`, `LIBRARY_MAVEN` — the kind of artifact being allowed. |
| Allowlist                  | Per-metastore list of artifacts permitted to run. Replaces the older "whitelist" terminology. |
| ArtifactMatcher            | One rule entry on the allowlist: an `(artifact, matchType)` pair. |
| MatchType / MATCH_TYPE     | How the matcher compares the candidate artifact to the stored pattern. Today only `PREFIX_MATCH`; spec reserves room for `EXACT_MATCH`, `WILDCARDS`. |
| Metastore                  | Unity Catalog top-level container the allowlist is scoped to. |
| Set / PUT                  | Replace-the-whole-allowlist semantic. Not an additive update. |

---

## File coverage

| File           | Lines | Audited                                          |
| -------------- | ----- | ------------------------------------------------ |
| `src/v1/model.ts`  | 111 | All 4 types + 2 enums + 3 schemas + every field. |
| `src/v1/client.ts` | 121 | Class, constructor, 2 methods, all locals.       |
| `src/v1/utils.ts`  | 151 | All 7 exported / private functions and types.    |
| `src/v1/index.ts`  | 13  | All re-exports.                                  |

Type & symbol checklist:

- [x] `ArtifactType` enum (4 members) → M5, O3.
- [x] `ArtifactMatcher_MatchType` enum (2 members) → M5, O2, O3.
- [x] `ArtifactAllowlistInfo` interface (4 fields) → M1, O4.
- [x] `ArtifactMatcher` interface (2 fields) → M3, M4.
- [x] `GetArtifactAllowlist` interface (1 field) → H1, O1.
- [x] `SetArtifactAllowlist` interface (5 fields) → H2, O1.
- [x] `unmarshalArtifactAllowlistInfoSchema` → no defect.
- [x] `unmarshalArtifactMatcherSchema` → no defect.
- [x] `marshalArtifactMatcherSchema` → H3 (untyped `z.ZodType`).
- [x] `marshalSetArtifactAllowlistSchema` → H3.
- [x] `Client` class + `host` / `httpClient` / `logger` / `userAgent` fields → no defect.
- [x] `PACKAGE_SEGMENT` constant → O7.
- [x] `getArtifactAllowlist(req, options)` method → H1, M2, M6.
- [x] `setArtifactAllowlist(req, options)` method → H1, M2, M6.
- [x] `HttpCallOptions` interface → no defect.
- [x] `executeCall` function → L1.
- [x] `readAll` private function → no defect (name fits idiom).
- [x] `executeHttpCall` function → L1, L3.
- [x] `buildHttpRequest` function → L3.
- [x] `parseResponse` function → no defect.
- [x] `marshalRequest` function → L4.
- [x] `flattenQueryParams` function → no defect.
- [x] `index.ts` re-exports → no defect (mirrors model exports faithfully).
