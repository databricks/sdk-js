# Naming Audit: tokens

**Path:** `packages/tokens/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks workspace Personal Access Token (PAT) management — the *end-user-facing* surface for a workspace user to create/list/revoke/update their own tokens. Endpoints live under `/api/2.0/token/...`. Pairs with the *admin-facing* `tokenmanagement` package at `/api/2.0/token-management/...` which lets workspace administrators inspect and revoke tokens owned by *other* users (including on-behalf-of service principal tokens). The two packages share an `AutoscopeState` enum and a near-identical "token info" record, but the auth/audience boundary makes them distinct services.
**Total weird names flagged:** 31

## Summary
| Severity | Count |
| --- | --- |
| High | 9 |
| Medium | 10 |
| Low | 7 |
| Observation | 5 |

## High severity

### 1. Package name `tokens` overlaps with sibling `tokenmanagement` and is sub-domain-vague — `packages/tokens/`, `package.json:2`, `client.ts:80,106,135,165`
- **Why weird:** Two npm packages co-exist in `sdk-js/packages/`: `@databricks/sdk-tokens` (this package) and `@databricks/sdk-tokenmanagement` (admin surface). Both manage *the same kind of resource* (Databricks PATs) and both expose a `Client` class with a `listTokens(req, options)` and a `revokeToken(req, options)` method. From the npm name alone, a caller cannot tell which package is the end-user surface and which is the admin surface — `tokens` reads as "the token API" while `tokenmanagement` reads as "manage tokens". Both are accurate descriptions of the other. Compounding: the `package.json` `description` field is empty (line 4) for both packages, so npm registry browsers see only the name.
- **Category:** 12 (duplicate concepts across packages), 1 (vague), 6 (misleading — neither name expresses which audience it serves).
- **Suggested name:** Rename `tokens` → `usertokens` (or `mytokens`, `selftokens`) to mark the end-user surface; keep `tokenmanagement` for the admin surface. Or invert: rename `tokenmanagement` → `admintokens`. The wire URL `/api/2.0/token/...` can stay locked while npm/import paths use the disambiguated names. Worst case, document the audience boundary in each `package.json` description string.
- **Rationale:** A caller writing `import {Client} from '@databricks/sdk-tokens/v1'` has no signal that they're getting the workspace-self surface, not the admin surface. The same problem applies to `import {Client} from '@databricks/sdk-tokenmanagement/v1'`. Two distinct OpenAPI services with overlapping resource models and overlapping method names should not be named with this much ambiguity.

### 2. Shared `AutoscopeState` enum is duplicated verbatim between `tokens` and `tokenmanagement` — `model.ts:13-21`
- **Why weird:** The exact same `AutoscopeState` enum (same name, same 7 members, same wire values, same doc comment referring to the same `tokendetails.proto`) is defined in both `packages/tokens/src/v1/model.ts:13-21` and `packages/tokenmanagement/src/v1/model.ts:13-21`. Identical Zod registration (`z.enum(AutoscopeState)`) at both `tokens/src/v1/model.ts:130` and `tokenmanagement/src/v1/model.ts:136`. A consumer that imports `AutoscopeState` from both packages gets two distinct TS enum types with the same name — assignment between them works at runtime (both are string-valued) but TS treats them as nominally different in strict mode.
- **Category:** 12 (duplicate concepts across packages), 14 (Go/proto-style — the duplication reflects the generator's per-service code emission).
- **Suggested name:** Hoist `AutoscopeState` into a shared package (e.g. `@databricks/sdk-databricks/wkt` or a new `@databricks/sdk-databricks/auth-models`), and have both `tokens` and `tokenmanagement` re-export it. The Go SDK has this problem too, but TS makes it more painful because of nominal typing on `import type` boundaries.
- **Rationale:** Two enums named `AutoscopeState` in two packages is the textbook duplicate-concept smell. Keeps drifting risk low (today they're identical, tomorrow someone could edit one and not the other).

### 3. `AUTOSCOPE_STATE_*` members all repeat the enum-name prefix — `model.ts:14-20`
- **Why weird:** Every member of `AutoscopeState` is prefixed with `AUTOSCOPE_STATE_`. Reads as `AutoscopeState.AUTOSCOPE_STATE_RUNNING`, `AutoscopeState.AUTOSCOPE_STATE_BACKFILLED`, `AutoscopeState.AUTOSCOPE_STATE_API_NOT_COVERED` (44 chars to reference "API not covered"). Seven members, all redundantly prefixed.
- **Category:** 2 (redundant enum prefix), 14 (Go/proto-style name).
- **Suggested name:** `AutoscopeState.UNSPECIFIED`, `AutoscopeState.DISABLED`, `AutoscopeState.RUNNING`, `AutoscopeState.COMPLETED`, `AutoscopeState.BACKFILLED`, `AutoscopeState.USER_SELECTED`, `AutoscopeState.API_NOT_COVERED`. Even better in TS: PascalCase (`AutoscopeState.Running`, etc.).
- **Rationale:** TS enums are namespaced by the enum itself. `Foo.FOO_BAR` is pure protobuf noise — same finding recurs in every generated package in this audit family (see `rfa#3`, `connections#...`).

### 4. `AutoscopeState.AUTOSCOPE_STATE_UNSPECIFIED` sentinel re-states enum name — `model.ts:14`
- **Why weird:** The corresponding field is `autoscopeState?: AutoscopeState | undefined` (line 72). "Unspecified" is encoded twice: as `undefined` (TS-native), and as `AUTOSCOPE_STATE_UNSPECIFIED` (proto-native). The TS surface should rely on `undefined` for absence.
- **Category:** 2 (redundant enum prefix), 14 (Go/proto-style name).
- **Suggested name:** Drop the sentinel; rely on `undefined`.
- **Rationale:** Generated boilerplate. Same pattern as `rfa#3`, recurs across all packages.

### 5. `PublicTokenInfo` type name — "public" is unmotivated — `model.ts:58-77`
- **Why weird:** Type is named `PublicTokenInfo` but the surrounding context contains no `PrivateTokenInfo`, `InternalTokenInfo`, or any other counterpart. The "Public" qualifier therefore communicates nothing to a TS reader. From the wire perspective, the Go SDK presumably has a parallel internal type that *isn't* exposed; in TS, that distinction is invisible. Compare to `tokenmanagement.AdminTokenInfo` (also "TokenInfo"-flavoured) — the package uses `Admin` to clarify the audience, but `Public` here doesn't.
- **Category:** 1 (vague qualifier), 6 (misleading — "Public" implies a public-vs-private dichotomy that doesn't surface in the SDK).
- **Suggested name:** `TokenInfo` (drop the `Public` prefix) or `UserTokenInfo` (parallel to `AdminTokenInfo` in `tokenmanagement`). The wire field `token_info` is bare anyway — the qualifier is purely cosmetic.
- **Rationale:** "Public" reads as a security qualifier (public-key, public-API) when the value is just "token metadata visible to the token owner". `UserTokenInfo` makes the audience explicit.

### 6. `PublicTokenInfo` vs `AdminTokenInfo` divergence — same conceptual resource, different shapes — `tokens/model.ts:58-77`, `tokenmanagement/model.ts:23-46`
- **Why weird:** Two parallel "token info" records describe the *same wire resource* (a Databricks PAT) with overlapping but non-identical field sets:
  - `PublicTokenInfo`: `tokenId, creationTime, expiryTime, comment, scopes, lastAccessedTime, autoscopeState, inferredScopes, backfillScopes` (9 fields).
  - `AdminTokenInfo`: `tokenId, creationTime, expiryTime, comment, createdById, createdByUsername, ownerId, workspaceId, lastUsedDay, scopes, autoscopeState` (11 fields).
  - **Public has 3 fields admin doesn't:** `lastAccessedTime`, `inferredScopes`, `backfillScopes`.
  - **Admin has 5 fields public doesn't:** `createdById`, `createdByUsername`, `ownerId`, `workspaceId`, `lastUsedDay`.
  - **`lastAccessedTime` (epoch ms, Public) and `lastUsedDay` (day count, Admin) describe the same concept at different fidelity.** Type-naming hides this: Public is millisecond-precise, Admin is day-precise.
- **Category:** 12 (duplicate concepts), 6 (misleading — `lastAccessedTime` vs `lastUsedDay` use different units for the same fact), 1 (vague qualifier on both type names).
- **Suggested name:** Two options:
  1. Document the public-vs-admin partition inline so readers know which fields appear where.
  2. Merge to a single `TokenInfo` with all fields optional, and document which subset the server populates for each endpoint.
- **Rationale:** A caller doing token introspection on the workspace needs to pick a package; the type-name doesn't tell them which fields they'll get.

### 7. `CreateToken_Response` and `RevokeToken_Response` with proto-style underscore — `model.ts:42, 85`
- **Why weird:** Type names `CreateToken_Response`, `ListTokens_Response`, `RevokeToken_Response` use proto-style nested-message underscores. Each carries `// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` to silence the linter. Compare with `UpdateTokenResponse` (`model.ts:96`) — same package, same generator, *no* underscore. Generator inconsistency: three methods get `Foo_Response`, one gets `FooResponse`. (The Go SDK convention exposes `CreateTokenResponse`-style names in `*Service.Response` pattern; here the TS port has reproduced the underscore literally.)
- **Category:** 4 (underscores in TS identifiers), 13 (inconsistency — same package mixes `_Response` and `Response`), 14 (Go/proto-style name).
- **Suggested name:** Drop underscore consistently: `CreateTokenResponse`, `ListTokensResponse`, `RevokeTokenResponse`. The `eslint-disable` line vanishes with the underscore.
- **Rationale:** Mixing `CreateToken_Response` (underscore) with `UpdateTokenResponse` (no underscore) in the same `index.ts` export block is a discoverability bug — a reader autocompleting `CreateTokenR...` gets nothing because the actual name has an underscore.

### 8. `ListTokens` and `RevokeToken` request types are misnamed as actions, not requests — `model.ts:50, 79`
- **Why weird:** Type names `ListTokens` and `RevokeToken` are bare verbs/verb-phrases that *look like methods*. A TS reader sees `import type {ListTokens, RevokeToken} from './model'` and reasonably guesses these are *functions or actions*. Instead, they're request DTOs. (`CreateToken` and `UpdateToken` have the same problem.) The corresponding response types correctly carry the `_Response` suffix; the request types should carry `Request`. The `tokenmanagement` package does the same. The Go SDK uses `CreateTokenRequest`/`RevokeTokenRequest` in idiomatic Go.
- **Category:** 8 (missing/asymmetric suffix), 6 (misleading — looks like a callable), 13 (asymmetry — response types are suffixed but request types aren't).
- **Suggested name:** `CreateTokenRequest`, `ListTokensRequest`, `RevokeTokenRequest`, `UpdateTokenRequest`. Pairs symmetrically with `CreateTokenResponse`, `ListTokensResponse`, `RevokeTokenResponse`, `UpdateTokenResponse`.
- **Rationale:** Most TS SDKs (AWS, GCP, Azure) name request DTOs with an explicit `*Request` suffix or `*Input`. The current asymmetry is a Go-port artefact.

### 9. `Client.revokeToken` method paired with URL `/api/2.0/token/delete` — `client.ts:131,135`
- **Why weird:** Method on `Client` is `revokeToken`, but the wire URL it hits is `/api/2.0/token/delete`. Sibling `tokenmanagement.Client.deleteToken` (line 103) maps `RevokeToken`/`RevokeToken_Response` to URL `/api/2.0/token-management/tokens/{id}` via HTTP `DELETE`. So:
  - `tokens.revokeToken` → request type `RevokeToken` → URL ends in `/delete` → HTTP `POST` (revoke = delete on wire, named "revoke" in SDK).
  - `tokenmanagement.deleteToken` → request type `RevokeToken` → URL ends in `/tokens/{id}` → HTTP `DELETE` (delete on wire, named "delete" in SDK, request type still `Revoke*`).
- **Category:** 17 (inconsistent action verbs for the same conceptual operation), 13 (inconsistency between packages), 6 (misleading — the request type doesn't match the method verb).
- **Suggested name:** Pick one verb (`revoke` or `delete`) and use it for the method, the request type, and ideally the URL. The Go SDK uses `Delete` consistently, so the TS port should too. Or pick `revoke` consistently. Today, `RevokeToken` is the *request type* in both packages but only the `tokens` package method is called `revokeToken`.
- **Rationale:** Calling the same operation `revokeToken` in one package and `deleteToken` in another (with the *same request type* `RevokeToken`) is a recipe for confusion. A user code-completing on a client typed as "either of the two" cannot rely on method names.

## Medium severity

### 10. `CreateToken.lifetimeSeconds` — unit smuggled into name, not type — `model.ts:29`
- **Why weird:** `lifetimeSeconds?: number | undefined`. Unit (seconds) lives in the field name, not the type. The doc says "in seconds". TS has no native duration type, so a unit-bearing field name is conventional, but the rest of the package uses `*Time` (`creationTime`, `expiryTime`, `lastAccessedTime`) which are *epoch milliseconds* (verified by doc strings on `model.ts:62-69`). Same `number` type, two different units, two different naming conventions.
- **Category:** 15 (unit-bearing field-name vs typed wrapper), 13 (intra-package inconsistency — `lifetimeSeconds` vs `creationTime`).
- **Suggested name:** Acceptable as-is, but consider `lifetimeMs` (or `lifetime: Duration`) for parity with `creationTime` etc. The Temporal API (`@js-temporal/polyfill` is already a package.json dep) has `Temporal.Duration` which would be domain-correct.
- **Rationale:** Within one struct, two number fields use different time units. Caller must read docs to avoid bugs.

### 11. `CreateToken.autoscopeEnabled` — naming inconsistent with response — `model.ts:38`
- **Why weird:** Request flag is `autoscopeEnabled?: boolean` ("enabled" suffix). The response carries `autoscopeState?: AutoscopeState` (a state enum, not a boolean). Same conceptual feature, different abstraction levels and names. A TS user thinking "I'll just check the value I set" would write `req.autoscopeEnabled` then later expect `info.autoscopeEnabled` but instead has to translate via `info.autoscopeState === 'AUTOSCOPE_STATE_RUNNING' || …`. The mapping (which states correspond to "enabled") is undocumented in the SDK surface.
- **Category:** 12 (duplicate concept — `autoscopeEnabled` ↔ `autoscopeState`), 17 (boolean vs enum for the same feature), 1 (vague — what counts as "enabled"?).
- **Suggested name:** Either accept the asymmetry but document the mapping, or rename request to `autoscopeMode?: AutoscopeMode` with an enum (`ENABLED` / `DISABLED`), so the surface is symmetric.
- **Rationale:** A boolean request and an enum response for "the same setting" is a known leaky abstraction.

### 12. `PublicTokenInfo.scopes` doc grammar — singular vs plural — `model.ts:67-68`
- **Why weird:** Doc reads "Scope of the token was created with, if applicable" — but the field is `scopes?: string[] | undefined` (plural, array). The doc says "Scope" (singular) and "the token was created with" (drops the "that"). Compare with `CreateToken.scopes` doc: "Optional scopes of the token." — different wording, different singular/plural usage.
- **Category:** 9 (singular/plural mismatch), 6 (misleading doc), 13 (inconsistency — same field documented differently across types).
- **Suggested name:** Fix doc to "The scopes the token was created with, if applicable." Same in `AdminTokenInfo.scopes` (`tokenmanagement/model.ts:42-43` has the same typo).
- **Rationale:** Doc grammar shapes the mental model. Singular "scope" suggests a single value; the type is an array.

### 13. `PublicTokenInfo.inferredScopes` and `backfillScopes` — overlapping arrays of strings — `model.ts:73-76`
- **Why weird:** Three different scope arrays in one struct:
  - `scopes?: string[]` — "Scope of the token was created with, if applicable."
  - `inferredScopes?: string[]` — "Inferred API path scopes collected for this token when autoscope is enabled."
  - `backfillScopes?: string[]` — "Scopes inferred from offline backfill processing."
  
  All three are `string[]` carrying the same conceptual content (scope identifiers) but produced by different machinery (user-declared, runtime-inferred, offline-backfilled). There's no shared type alias, no enum, no narrowing. A caller wanting "the effective scopes" must union all three (or pick) without compile-time help.
- **Category:** 12 (duplicate concepts), 1 (vague — what's the relationship between the three?), 16 (string[] should be a `Scope[]` enum or branded string array).
- **Suggested name:** Group them: `declaredScopes`, `inferredScopes`, `backfillInferredScopes`. Add an `effectiveScopes` computed-on-server field that the caller actually wants. Or model as `{ source: 'declared' | 'inferred' | 'backfill'; value: string }[]` so the source is part of the data.
- **Rationale:** Three string-array fields with overlapping semantics is a discoverability bug. A new user has to read all three docs to understand the policy.

### 14. `UpdateToken.tokenId` doc says "SHA-256 hash" but other types say "ID" — `model.ts:88`
- **Why weird:** Doc on `UpdateToken.tokenId`: "The SHA-256 hash of the token to be updated." But every other `tokenId` doc in the package (and in `tokenmanagement`) says variants of "The ID of the token". So readers comparing the types see:
  - `CreateToken_Response.tokenInfo.tokenId` (line 46+59) — "The ID of this token."
  - `PublicTokenInfo.tokenId` (line 60) — "The ID of this token."
  - `RevokeToken.tokenId` (line 81) — "The ID of the token to be revoked."
  - `UpdateToken.tokenId` (line 89) — "The SHA-256 hash of the token to be updated."
- **Category:** 6 (misleading doc — same field, different meaning), 13 (inconsistency), 19 (underspecified ID — what is it actually?).
- **Suggested name:** Either (a) reconcile the docs — if `tokenId` is the SHA-256 hash everywhere, say so consistently; or (b) if `UpdateToken.tokenId` actually expects a different format than the others, rename or document the divergence loudly.
- **Rationale:** The doc disagreement implies either a stale comment or a real wire-protocol quirk. Either way, a caller can't tell which.

### 15. `UpdateToken.token` field name shadows the package name — `model.ts:90`
- **Why weird:** `UpdateToken.token?: PublicTokenInfo`. The field `token` inside the type `UpdateToken` in the package `tokens` carries the entire updated payload. Reads `updateReq.token.tokenId` — the word "token" appears three times in five characters. The same package has `Client.updateToken` method which takes `UpdateToken` which has a `token` field of type `PublicTokenInfo`. Layer cake.
- **Category:** 20 (type-suffix tautology), 1 (vague).
- **Suggested name:** Field as `info` (since the inner type is `PublicTokenInfo`/`TokenInfo`) or `data`. Wire stays `token`. So `updateReq.info.tokenId`.
- **Rationale:** The wire field is `token` because the proto message wraps a `TokenInfo`; in TS, the field name can clarify intent without changing the wire.

### 16. `UpdateToken` has BOTH `tokenId` and `token.tokenId` — duplicate IDs — `model.ts:87-93`
- **Why weird:** The request carries `tokenId?: string` (top-level) *and* `token?: PublicTokenInfo` which itself has `tokenId?: string`. Two fields for the same logical ID, easy to set inconsistently. The Client method uses `req.tokenId ?? ''` (`client.ts:165`) — so the top-level wins. But the `PublicTokenInfo.tokenId` inside `token` is still serialised on the wire (per `marshalUpdateTokenSchema` on `model.ts:200-202`).
- **Category:** 12 (duplicate concept), 6 (misleading — which one is authoritative?), 11 (the inner one is dead-ish data).
- **Suggested name:** Drop one. Either: (a) make `token` exclude `tokenId` (`Omit<PublicTokenInfo, 'tokenId'>`) and keep the top-level; or (b) drop the top-level and use `req.token.tokenId` in the client.
- **Rationale:** Two fields for the same identifier invite subtle bugs (server may pick the inner one if the top-level is empty).

### 17. `Client` class name — colliding namespace — `client.ts:46`
- **Why weird:** Top-level class literally named `Client`. Re-exported in `index.ts` as just `Client`. A consumer importing from both `@databricks/sdk-tokens/v1` and `@databricks/sdk-tokenmanagement/v1` faces an identical name clash:
  ```
  import {Client} from '@databricks/sdk-tokens/v1';
  import {Client as AdminTokensClient} from '@databricks/sdk-tokenmanagement/v1';
  ```
  Worse, both packages export a class with method `listTokens(req, options)` where `req` is a *different* `ListTokens` type. Strong TS types catch the assignment error, but the duplication forces an alias at every dual import.
- **Category:** 1 (vague), 12 (duplicate name across packages).
- **Suggested name:** `TokensClient`, `UserTokensClient`, or `MyTokensClient`. Mirror with `TokenManagementClient`/`AdminTokensClient`.
- **Rationale:** Same finding as `rfa#37`, recurs across all packages — but particularly painful here given the `tokens`/`tokenmanagement` overlap.

### 18. `executeCall` / `executeHttpCall` naming pair — `utils.ts:26,65`
- **Why weird:** Two functions distinguished only by an `Http` infix. `executeCall` wraps retry/rate-limit/timeout; `executeHttpCall` does the actual fetch + logging + error throw. Easy to confuse at call site (`client.ts:87,114` use them within four lines of each other).
- **Category:** 1 (vague), 17 (inconsistent action verbs).
- **Suggested name:** `runWithCallOptions` / `sendHttp`, or `wrapCall` / `dispatchHttp`.
- **Rationale:** Cross-package: same as `rfa#32`, recurs everywhere.

### 19. `HttpCallOptions` shadows package's other `Options` types — `utils.ts:15`
- **Why weird:** The file imports `Options` from `@databricks/sdk-core/api` (line 3) and `CallOptions` from `@databricks/sdk-options/call` (line 12). Three `Options`-suffixed types in scope. `HttpCallOptions` is internal — purely a context bag passed to `executeHttpCall`.
- **Category:** 1 (vague suffix).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Same as `rfa#33`.

## Low severity

### 20. `publicTokenInfoFieldMask` exported helper — public-API field-mask builder — `model.ts:226`
- **Why weird:** The package exports `publicTokenInfoFieldMask(...)` as a top-level helper alongside the `Client`. Field-mask builders are an SDK-shape choice: making one a public export per type bakes the proto-FieldMask convention into the public API surface. Consumers writing `UpdateToken` payloads must learn this helper.
- **Category:** 8 (helper-as-public-API), 13 (intra-package inconsistency — see #26 re-export gap).
- **Suggested name:** Either hoist into a single `Client.updateToken` overload that accepts a partial payload and derives the mask, or document the helper prominently in `index.ts`.
- **Rationale:** Exporting per-type mask builders is a Go-port artefact; native TS would lean on `Partial<T>` + key inference.

### 21. `readAll` — generic helper name — `utils.ts:40`
- **Why weird:** Internal helper name is generic; clashes cognitively with `Array.prototype` / stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `readStreamToEnd` / `drainStream`.
- **Rationale:** Same as `rfa#34`.

### 22. `flattenQueryParams` — `utils.ts:123`
- **Why weird:** Exported but unused in this package (`client.ts` only ever builds JSON bodies). Dead-looking export.
- **Category:** Observation / 11 (unused public helper).
- **Suggested name:** Remove from utils if it's a generator default; or keep, but stop emitting it for body-only services.
- **Rationale:** Same as `rfa#35`.

### 23. `PACKAGE_SEGMENT` constant — `client.ts:41`
- **Why weird:** `Segment` is a generic word; without the inline comment the constant doesn't communicate User-Agent identity.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Same as `rfa#36`.

### 24. `buildHttpRequest` parameter list — five positional args — `utils.ts:96-102`
- **Why weird:** Five positional parameters (`method`, `url`, `headers`, `signal`, `body`) with the optional ones at the end. Callers in `client.ts:86,111,141,171` pass them positionally; the order is non-obvious from the name. Easy to confuse `signal` and `body` (both optional, both at the end).
- **Category:** 1 (vague — five-positional builder).
- **Suggested name:** Keep name; accept a single options object `{ method, url, headers, signal?, body? }`.
- **Rationale:** Same as `rfa#38`.

### 25. `executeCall` `opts` local shadows `options` parameter — `utils.ts:30-37`
- **Why weird:** Local `opts` variable is one letter shorter than the parameter `options` to disambiguate. The shadowing convention isn't documented.
- **Category:** Observation.
- **Suggested name:** Rename inner `opts` → `internalOptions`.
- **Rationale:** Same as `rfa#41`.

## Observations

### 26. `index.ts` re-exports interfaces but not the `publicTokenInfoFieldMask` helper
The index file exports the `Client`, the `AutoscopeState` enum, and nine model interfaces. It does *not* export the `publicTokenInfoFieldMask` helper. Consistent with sibling packages but means a downstream consumer cannot build field masks without reaching into `./model` directly. Same finding as `rfa#43`.

### 27. `package.json` description is empty string — `package.json:4`
`"description": ""`. The npm package has no public description string. Combined with the ambiguous `tokens` name (see #1) and the parallel `tokenmanagement` package, this leaves users without any registry-level metadata to disambiguate the two packages.

### 28. No tests in the package
`package.json` line 24-25: `"test": "echo 'no tests'"`, `"test:browser": "echo 'no tests'"`. Same as `tokenmanagement` and most newly-generated packages. Not a naming issue, but the wire-format guarantees (`AutoscopeState` proto-link in the doc) deserve a contract test.

### 29. Doc comments leak proto file paths and internal commentary
The `AutoscopeState` doc (model.ts:7-12) references `common/principal-context/api/proto/tokendetails.proto` and `Principal context proto should NOT depend on this proto definitions` — internal architecture commentary that leaks into the public SDK surface. Similar pattern in `tokenmanagement`. Acceptable for now, but a polish pass should strip internal proto-tree paths from the user-facing JSDoc.

### 30. Method `updateToken` uses URL path interpolation on a potentially empty string — `client.ts:165`
`const url = \`${this.host}/api/2.0/token/${req.tokenId ?? ''}\`;` — when `req.tokenId` is unset, the URL becomes `${host}/api/2.0/token/` with a trailing slash, which the server may treat differently than a missing ID. Naming-adjacent: the type makes `tokenId` optional (`model.ts:89`), but the endpoint requires it. The TS surface doesn't enforce the required-ness. Not a naming issue per se — but a type-name fix (`tokenId: string` — required) would prevent the silent empty path.

## Domain glossary
- **`tokens`** — npm package name; represents the *workspace user* PAT surface (create / list / revoke / update one's own tokens). Wire: `/api/2.0/token/...`.
- **`tokenmanagement`** — sibling npm package; represents the *workspace admin* PAT surface (inspect / revoke any user's tokens, create service-principal on-behalf-of tokens). Wire: `/api/2.0/token-management/...`.
- **`PAT`** — Personal Access Token. Databricks workspace bearer tokens issued to users or service principals. Referenced in the `AutoscopeState` doc.
- **`autoscope`** — Inferred-scope collection: a token-store feature that learns which API paths a token actually hits and either records them (`inferredScopes`) or backfills them offline (`backfillScopes`).
- **`scopes`** — Permission/API-path scopes attached to a PAT. Closed set per `principal-context` definitions; SDK types them as bare `string[]`.
- **`PublicTokenInfo`** — The token-metadata record visible to the *owner* of the token (no `createdBy*`, no `ownerId`, no `workspaceId`).
- **`AdminTokenInfo`** — (`tokenmanagement` package) the token-metadata record visible to a *workspace admin* (carries `createdById`, `createdByUsername`, `ownerId`, `workspaceId`, `lastUsedDay`).
- **`FieldMask`** — Google protobuf convention for sparse-field updates in PATCH semantics. `publicTokenInfoFieldMask(...)` builds the wire-format paths for `UpdateToken.updateMask`.
- **`AutoscopeState`** — 7-member enum (incl. sentinel) defined identically in both `tokens` and `tokenmanagement`. Per the doc, mirrored in `databricks.identity.AutoscopeState` proto.

## File coverage
- `src/v1/model.ts` (234 lines): read fully.
- `src/v1/client.ts` (186 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (18 lines): read fully.
- Cross-referenced `packages/tokenmanagement/src/v1/model.ts`, `client.ts`, `index.ts` for overlap analysis (see findings #1, #2, #6, #9, #17).
