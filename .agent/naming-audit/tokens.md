# Naming Audit: tokens

**Path:** `packages/tokens/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks workspace Personal Access Token (PAT) management — the *end-user-facing* surface for a workspace user to create/list/revoke/update their own tokens. Endpoints live under `/api/2.0/token/...`. Pairs with the *admin-facing* `tokenmanagement` package at `/api/2.0/token-management/...` which lets workspace administrators inspect and revoke tokens owned by *other* users (including on-behalf-of service principal tokens). The two packages share a near-identical "token info" record, but the auth/audience boundary makes them distinct services.
**Total weird names flagged:** 22

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 7 |
| Low | 6 |
| Observation | 4 |

## High severity

### 1. Package name `tokens` overlaps with sibling `tokenmanagement` and is sub-domain-vague — `packages/tokens/`, `package.json:2`, `client.ts:80,109,138,171`
- **Why weird:** Two npm packages co-exist in `sdk-js/packages/`: `@databricks/sdk-tokens` (this package) and `@databricks/sdk-tokenmanagement` (admin surface). Both manage *the same kind of resource* (Databricks PATs) and both expose a `Client` class with a `listTokens(req, options)` and a `revokeToken(req, options)` method. From the npm name alone, a caller cannot tell which package is the end-user surface and which is the admin surface — `tokens` reads as "the token API" while `tokenmanagement` reads as "manage tokens". Both are accurate descriptions of the other. Compounding: the `package.json` `description` field is empty (line 4) for both packages, so npm registry browsers see only the name.
- **Category:** 12 (duplicate concepts across packages), 1 (vague), 6 (misleading — neither name expresses which audience it serves).
- **Suggested name:** Rename `tokens` → `usertokens` (or `mytokens`, `selftokens`) to mark the end-user surface; keep `tokenmanagement` for the admin surface. Or invert: rename `tokenmanagement` → `admintokens`. The wire URL `/api/2.0/token/...` can stay locked while npm/import paths use the disambiguated names. Worst case, document the audience boundary in each `package.json` description string.
- **Rationale:** A caller writing `import {Client} from '@databricks/sdk-tokens/v1'` has no signal that they're getting the workspace-self surface, not the admin surface. The same problem applies to `import {Client} from '@databricks/sdk-tokenmanagement/v1'`. Two distinct OpenAPI services with overlapping resource models and overlapping method names should not be named with this much ambiguity.

### 2. `PublicTokenInfo` type name — "public" is unmotivated — `model.ts:37-46`
- **Why weird:** Type is named `PublicTokenInfo` but the surrounding context contains no `PrivateTokenInfo`, `InternalTokenInfo`, or any other counterpart. The "Public" qualifier therefore communicates nothing to a TS reader. From the wire perspective, the Go SDK presumably has a parallel internal type that *isn't* exposed; in TS, that distinction is invisible. Compare to `tokenmanagement.AdminTokenInfo` (also "TokenInfo"-flavoured) — the package uses `Admin` to clarify the audience, but `Public` here doesn't.
- **Category:** 1 (vague qualifier), 6 (misleading — "Public" implies a public-vs-private dichotomy that doesn't surface in the SDK).
- **Suggested name:** `TokenInfo` (drop the `Public` prefix) or `UserTokenInfo` (parallel to `AdminTokenInfo` in `tokenmanagement`). The wire field `token_info` is bare anyway — the qualifier is purely cosmetic.
- **Rationale:** "Public" reads as a security qualifier (public-key, public-API) when the value is just "token metadata visible to the token owner". `UserTokenInfo` makes the audience explicit.

### 3. `PublicTokenInfo` vs `AdminTokenInfo` divergence — same conceptual resource, different shapes — `tokens/model.ts:37-46`, `tokenmanagement/model.ts`
- **Why weird:** Two parallel "token info" records describe the *same wire resource* (a Databricks PAT) with overlapping but non-identical field sets:
  - `PublicTokenInfo`: `tokenId, creationTime, expiryTime, comment` (4 fields).
  - `AdminTokenInfo`: 11 fields including `createdById, createdByUsername, ownerId, workspaceId, lastUsedDay, scopes, autoscopeState` (verify in `tokenmanagement/model.ts`).
  - The two records describe the same wire-side resource (a PAT) but expose dramatically different views. The Public form lacks every attribution field (no creator, no owner, no workspace) and lacks any usage signal (no `lastAccessedTime` / `lastUsedDay`). The Admin form lacks nothing the Public form exposes.
- **Category:** 12 (duplicate concepts), 1 (vague qualifier on both type names).
- **Suggested name:** Two options:
  1. Document the public-vs-admin partition inline so readers know which fields appear where.
  2. Merge to a single `TokenInfo` with all fields optional, and document which subset the server populates for each endpoint.
- **Rationale:** A caller doing token introspection on the workspace needs to pick a package; the type-name doesn't tell them which fields they'll get.

### 4. `Client.revokeToken` method paired with URL `/api/2.0/token/delete` — `client.ts:134,138`
- **Why weird:** Method on `Client` is `revokeToken`, but the wire URL it hits is `/api/2.0/token/delete`. Sibling `tokenmanagement.Client.deleteToken` maps `RevokeTokenRequest`/`RevokeTokenRequest_Response` to URL `/api/2.0/token-management/tokens/{id}` via HTTP `DELETE`. So:
  - `tokens.revokeToken` → request type `RevokeTokenRequest` → URL ends in `/delete` → HTTP `POST` (revoke = delete on wire, named "revoke" in SDK).
  - `tokenmanagement.deleteToken` → request type `RevokeToken*` → URL ends in `/tokens/{id}` → HTTP `DELETE` (delete on wire, named "delete" in SDK, request type still `Revoke*`).
- **Category:** 17 (inconsistent action verbs for the same conceptual operation), 13 (inconsistency between packages), 6 (misleading — the request type doesn't match the method verb).
- **Suggested name:** Pick one verb (`revoke` or `delete`) and use it for the method, the request type, and ideally the URL. The Go SDK uses `Delete` consistently, so the TS port should too. Or pick `revoke` consistently. Today, `RevokeTokenRequest` is the *request type* in both packages but only the `tokens` package method is called `revokeToken`.
- **Rationale:** Calling the same operation `revokeToken` in one package and `deleteToken` in another (with the *same request type* `RevokeTokenRequest`) is a recipe for confusion. A user code-completing on a client typed as "either of the two" cannot rely on method names.

### 5. Proto-architectural-leak: `Foo_Response` underscored nested response types — `model.ts:21, 32, 54`
- **Why weird:** The package defines `CreateTokenRequest_Response`, `ListTokensRequest_Response`, and `RevokeTokenRequest_Response` — names that bake the Protobuf nested-message convention (`OuterMessage_InnerMessage`) directly into the public TypeScript surface. The underscore is a transport-format artefact (a Go/proto idiom for nested message types), not a TypeScript naming convention. Each declaration is even guarded with `// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` — the codebase already knows these names violate TS conventions. The pattern matches the user's `Foo_PublicRequest` rule: a transport-layer naming structure leaking into the SDK's published types. Also propagates through `index.ts:9,11,14`, `client.ts:22,24,26,34,35,36,79,108,137,152`, and the schema names `unmarshal*Request_ResponseSchema` (`model.ts:68, 80, 106`).
- **Category:** Proto-architectural leak (transport-format identifier shape in public TS surface).
- **Suggested name:** Drop the underscore-nested form and use idiomatic TS response-type names: `CreateTokenResponse`, `ListTokensResponse`, `RevokeTokenResponse` (the existing `UpdateTokenResponse` on `model.ts:65` already follows this pattern, so the package is internally inconsistent — see #6).
- **Rationale:** Public TS APIs should not advertise the wire/proto provenance of a type. Mixing `UpdateTokenResponse` (clean) with `CreateTokenRequest_Response` (proto-style underscore) in the same module signals that the generator is mechanically translating proto nested-message names rather than producing idiomatic TS. The `eslint-disable` annotation in source is direct evidence that the names break the project's own lint rules.

## Medium severity

### 6. `CreateTokenRequest.lifetimeSeconds` — unit smuggled into name, not type — `model.ts:13`
- **Why weird:** `lifetimeSeconds?: number | undefined`. Unit (seconds) lives in the field name, not the type. The doc says "in seconds". TS has no native duration type, so a unit-bearing field name is conventional, but the rest of the package uses `*Time` (`creationTime`, `expiryTime`) which are *epoch milliseconds* (verified by doc strings on `model.ts:40-43`). Same `number` type, two different units, two different naming conventions.
- **Category:** 15 (unit-bearing field-name vs typed wrapper), 13 (intra-package inconsistency — `lifetimeSeconds` vs `creationTime`).
- **Suggested name:** Acceptable as-is, but consider `lifetimeMs` (or `lifetime: Duration`) for parity with `creationTime` etc. The Temporal API (`@js-temporal/polyfill` is already a package.json dep) has `Temporal.Duration` which would be domain-correct.
- **Rationale:** Within one struct, two number fields use different time units. Caller must read docs to avoid bugs.

### 7. `UpdateTokenRequest.tokenId` doc says "SHA-256 hash" but other types say "ID" — `model.ts:57`
- **Why weird:** Doc on `UpdateTokenRequest.tokenId`: "The SHA-256 hash of the token to be updated." But every other `tokenId` doc in the package (and in `tokenmanagement`) says variants of "The ID of the token". So readers comparing the types see:
  - `CreateTokenRequest_Response.tokenInfo.tokenId` (line 25 → `PublicTokenInfo.tokenId` line 39) — "The ID of this token."
  - `PublicTokenInfo.tokenId` (line 39) — "The ID of this token."
  - `RevokeTokenRequest.tokenId` (line 50) — "The ID of the token to be revoked."
  - `UpdateTokenRequest.tokenId` (line 57) — "The SHA-256 hash of the token to be updated."
- **Category:** 6 (misleading doc — same field, different meaning), 13 (inconsistency), 19 (underspecified ID — what is it actually?).
- **Suggested name:** Either (a) reconcile the docs — if `tokenId` is the SHA-256 hash everywhere, say so consistently; or (b) if `UpdateTokenRequest.tokenId` actually expects a different format than the others, rename or document the divergence loudly.
- **Rationale:** The doc disagreement implies either a stale comment or a real wire-protocol quirk. Either way, a caller can't tell which.

### 8. `UpdateTokenRequest.token` field name shadows the package name — `model.ts:59`
- **Why weird:** `UpdateTokenRequest.token?: PublicTokenInfo`. The field `token` inside the type `UpdateTokenRequest` in the package `tokens` carries the entire updated payload. Reads `updateReq.token.tokenId` — the word "token" appears three times in five characters. The same package has `Client.updateToken` method which takes `UpdateTokenRequest` which has a `token` field of type `PublicTokenInfo`. Layer cake.
- **Category:** 20 (type-suffix tautology), 1 (vague).
- **Suggested name:** Field as `info` (since the inner type is `PublicTokenInfo`/`TokenInfo`) or `data`. Wire stays `token`. So `updateReq.info.tokenId`.
- **Rationale:** The wire field is `token` because the proto message wraps a `TokenInfo`; in TS, the field name can clarify intent without changing the wire.

### 9. `UpdateTokenRequest` has BOTH `tokenId` and `token.tokenId` — duplicate IDs — `model.ts:56-62`
- **Why weird:** The request carries `tokenId?: string` (top-level) *and* `token?: PublicTokenInfo` which itself has `tokenId?: string`. Two fields for the same logical ID, easy to set inconsistently. The Client method uses `req.tokenId ?? ''` (`client.ts:171`) — so the top-level wins. But the `PublicTokenInfo.tokenId` inside `token` is still serialised on the wire (per `marshalUpdateTokenRequestSchema` on `model.ts:146-159`).
- **Category:** 12 (duplicate concept), 6 (misleading — which one is authoritative?), 11 (the inner one is dead-ish data).
- **Suggested name:** Drop one. Either: (a) make `token` exclude `tokenId` (`Omit<PublicTokenInfo, 'tokenId'>`) and keep the top-level; or (b) drop the top-level and use `req.token.tokenId` in the client.
- **Rationale:** Two fields for the same identifier invite subtle bugs (server may pick the inner one if the top-level is empty).

### 10. `Client` class name — colliding namespace — `client.ts:46`
- **Why weird:** Top-level class literally named `Client`. Re-exported in `index.ts` as just `Client`. A consumer importing from both `@databricks/sdk-tokens/v1` and `@databricks/sdk-tokenmanagement/v1` faces an identical name clash:
  ```
  import {Client} from '@databricks/sdk-tokens/v1';
  import {Client as AdminTokensClient} from '@databricks/sdk-tokenmanagement/v1';
  ```
  Worse, both packages export a class with method `listTokens(req, options)` where `req` is a *different* `ListTokensRequest` type. Strong TS types catch the assignment error, but the duplication forces an alias at every dual import.
- **Category:** 1 (vague), 12 (duplicate name across packages).
- **Suggested name:** `TokensClient`, `UserTokensClient`, or `MyTokensClient`. Mirror with `TokenManagementClient`/`AdminTokensClient`.
- **Rationale:** Same finding as `rfa#37`, recurs across all packages — but particularly painful here given the `tokens`/`tokenmanagement` overlap.

### 11. `executeCall` / `executeHttpCall` naming pair — `utils.ts:26,65`
- **Why weird:** Two functions distinguished only by an `Http` infix. `executeCall` wraps retry/rate-limit/timeout; `executeHttpCall` does the actual fetch + logging + error throw. Easy to confuse at call site (`client.ts:87,115` use them within four lines of each other).
- **Category:** 1 (vague), 17 (inconsistent action verbs).
- **Suggested name:** `runWithCallOptions` / `sendHttp`, or `wrapCall` / `dispatchHttp`.
- **Rationale:** Cross-package: same as `rfa#32`, recurs everywhere.

### 12. `HttpCallOptions` shadows package's other `Options` types — `utils.ts:15`
- **Why weird:** The file imports `Options` from `@databricks/sdk-core/api` (line 3) and `CallOptions` from `@databricks/sdk-options/call` (line 12). Three `Options`-suffixed types in scope. `HttpCallOptions` is internal — purely a context bag passed to `executeHttpCall`.
- **Category:** 1 (vague suffix).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Same as `rfa#33`.

## Low severity

### 13. `publicTokenInfoFieldMask` exported helper — public-API field-mask builder — `model.ts:168`
- **Why weird:** The package exports `publicTokenInfoFieldMask(...)` as a top-level helper alongside the `Client`. Field-mask builders are an SDK-shape choice: making one a public export per type bakes the proto-FieldMask convention into the public API surface. Consumers writing `UpdateTokenRequest` payloads must learn this helper.
- **Category:** 8 (helper-as-public-API), 13 (intra-package inconsistency — see #19 re-export gap).
- **Suggested name:** Either hoist into a single `Client.updateToken` overload that accepts a partial payload and derives the mask, or document the helper prominently in `index.ts`.
- **Rationale:** Exporting per-type mask builders is a Go-port artefact; native TS would lean on `Partial<T>` + key inference.

### 14. `readAll` — generic helper name — `utils.ts:40`
- **Why weird:** Internal helper name is generic; clashes cognitively with `Array.prototype` / stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `readStreamToEnd` / `drainStream`.
- **Rationale:** Same as `rfa#34`.

### 15. `flattenQueryParams` — `utils.ts:123`
- **Why weird:** Exported but unused in this package (`client.ts` only ever builds JSON bodies). Dead-looking export.
- **Category:** Observation / 11 (unused public helper).
- **Suggested name:** Remove from utils if it's a generator default; or keep, but stop emitting it for body-only services.
- **Rationale:** Same as `rfa#35`.

### 16. `PACKAGE_SEGMENT` constant — `client.ts:41`
- **Why weird:** `Segment` is a generic word; without the inline comment the constant doesn't communicate User-Agent identity.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Same as `rfa#36`.

### 17. `buildHttpRequest` parameter list — five positional args — `utils.ts:96-102`
- **Why weird:** Five positional parameters (`method`, `url`, `headers`, `signal`, `body`) with the optional ones at the end. Callers in `client.ts:86,114,144,177` pass them positionally; the order is non-obvious from the name. Easy to confuse `signal` and `body` (both optional, both at the end).
- **Category:** 1 (vague — five-positional builder).
- **Suggested name:** Keep name; accept a single options object `{ method, url, headers, signal?, body? }`.
- **Rationale:** Same as `rfa#38`.

### 18. `executeCall` `opts` local shadows `options` parameter — `utils.ts:30-37`
- **Why weird:** Local `opts` variable is one letter shorter than the parameter `options` to disambiguate. The shadowing convention isn't documented.
- **Category:** Observation.
- **Suggested name:** Rename inner `opts` → `internalOptions`.
- **Rationale:** Same as `rfa#41`.

## Observations

### 19. `index.ts` re-exports interfaces but not the `publicTokenInfoFieldMask` helper
The index file exports the `Client` and eight model interfaces (`CreateTokenRequest`, `CreateTokenRequest_Response`, `ListTokensRequest`, `ListTokensRequest_Response`, `PublicTokenInfo`, `RevokeTokenRequest`, `RevokeTokenRequest_Response`, `UpdateTokenRequest`, `UpdateTokenResponse`). It does *not* export the `publicTokenInfoFieldMask` helper. Consistent with sibling packages but means a downstream consumer cannot build field masks without reaching into `./model` directly. Same finding as `rfa#43`.

### 20. `package.json` description is empty string — `package.json:4`
`"description": ""`. The npm package has no public description string. Combined with the ambiguous `tokens` name (see #1) and the parallel `tokenmanagement` package, this leaves users without any registry-level metadata to disambiguate the two packages.

### 21. No tests in the package
`package.json` line 25-26: `"test": "echo 'no tests'"`, `"test:browser": "echo 'no tests'"`. Same as `tokenmanagement` and most newly-generated packages. Not a naming issue, but the wire-format guarantees deserve a contract test.

### 22. Method `updateToken` uses URL path interpolation on a potentially empty string — `client.ts:171`
`const url = \`${this.host}/api/2.0/token/${req.tokenId ?? ''}\`;` — when `req.tokenId` is unset, the URL becomes `${host}/api/2.0/token/` with a trailing slash, which the server may treat differently than a missing ID. Naming-adjacent: the type makes `tokenId` optional (`model.ts:58`), but the endpoint requires it. The TS surface doesn't enforce the required-ness. Not a naming issue per se — but a type-name fix (`tokenId: string` — required) would prevent the silent empty path.

## Domain glossary
- **`tokens`** — npm package name; represents the *workspace user* PAT surface (create / list / revoke / update one's own tokens). Wire: `/api/2.0/token/...`.
- **`tokenmanagement`** — sibling npm package; represents the *workspace admin* PAT surface (inspect / revoke any user's tokens, create service-principal on-behalf-of tokens). Wire: `/api/2.0/token-management/...`.
- **`PAT`** — Personal Access Token. Databricks workspace bearer tokens issued to users or service principals.
- **`PublicTokenInfo`** — The token-metadata record visible to the *owner* of the token (no `createdBy*`, no `ownerId`, no `workspaceId`). Now a 4-field record after the regeneration removed `scopes`, `lastAccessedTime`, `autoscopeState`, `inferredScopes`, `backfillScopes`.
- **`AdminTokenInfo`** — (`tokenmanagement` package) the token-metadata record visible to a *workspace admin* (carries `createdById`, `createdByUsername`, `ownerId`, `workspaceId`, `lastUsedDay`).
- **`FieldMask`** — Google protobuf convention for sparse-field updates in PATCH semantics. `publicTokenInfoFieldMask(...)` builds the wire-format paths for `UpdateTokenRequest.updateMask`.

## File coverage
- `src/v1/model.ts` (176 lines): read fully.
- `src/v1/client.ts` (192 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (18 lines): read fully.
- Cross-referenced `packages/tokenmanagement/src/v1/` for overlap analysis (see findings #1, #3, #4, #9).

## Fixed
- #2 `AutoscopeState` shared-enum duplication (originally cited at `model.ts:13-21`): Fixed in regeneration on 2026-05-20 — the `AutoscopeState` enum is no longer defined in the `tokens` package.
- #3 `AUTOSCOPE_STATE_*` redundant enum prefix (originally cited at `model.ts:14-20`): Fixed in regeneration on 2026-05-20 — `AutoscopeState` enum removed from this package.
- #7 Request types missing `Request` suffix (originally cited at `model.ts:50, 79`): Fixed in regeneration on 2026-05-20 — request DTOs are now `CreateTokenRequest`, `ListTokensRequest`, `RevokeTokenRequest`, `UpdateTokenRequest`.
- #10 `CreateToken.autoscopeEnabled` boolean-vs-enum asymmetry (originally cited at `model.ts:38`): Fixed in regeneration on 2026-05-20 — the `autoscopeEnabled` field was dropped from `CreateTokenRequest`.
- #11 `PublicTokenInfo.scopes` doc grammar singular/plural mismatch (originally cited at `model.ts:67-68`): Fixed in regeneration on 2026-05-20 — the `scopes` field was removed from `PublicTokenInfo`.
- #12 Three overlapping scope-array fields on `PublicTokenInfo` (originally cited at `model.ts:73-76`): Fixed in regeneration on 2026-05-20 — `inferredScopes` and `backfillScopes` fields were removed from `PublicTokenInfo`.
- #28 Doc comments leaking proto file paths (originally cited at `model.ts:7-12`): Fixed in regeneration on 2026-05-20 — the `AutoscopeState` doc block containing the proto-tree path was removed when the enum left the package.
