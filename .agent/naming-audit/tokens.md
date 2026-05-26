# Naming Audit: tokens

**Path:** `packages/tokens/src/v1/`
**Versions audited:** v1
**Inferred domain:** Databricks workspace Personal Access Token (PAT) management — the *end-user-facing* surface for a workspace user to create/list/revoke/update their own tokens. Endpoints live under `/api/2.0/token/...`. Pairs with the *admin-facing* `tokenmanagement` package at `/api/2.0/token-management/...` which lets workspace administrators inspect and revoke tokens owned by *other* users (including on-behalf-of service principal tokens). The two packages share a near-identical "token info" record, but the auth/audience boundary makes them distinct services.
**Total weird names flagged:** 10

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 2 |
| Low | 1 |
| Observation | 2 |

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
- **Suggested name:** Drop the underscore-nested form and use idiomatic TS response-type names: `CreateTokenResponse`, `ListTokensResponse`, `RevokeTokenResponse` (the existing `UpdateTokenResponse` on `model.ts:65` already follows this pattern, so the package is internally inconsistent).
- **Rationale:** Public TS APIs should not advertise the wire/proto provenance of a type. Mixing `UpdateTokenResponse` (clean) with `CreateTokenRequest_Response` (proto-style underscore) in the same module signals that the generator is mechanically translating proto nested-message names rather than producing idiomatic TS. The `eslint-disable` annotation in source is direct evidence that the names break the project's own lint rules.

## Medium severity

### 6. `UpdateTokenRequest` has BOTH `tokenId` and `token.tokenId` — duplicate IDs — `model.ts:56-62`
- **Why weird:** The request carries `tokenId?: string` (top-level) *and* `token?: PublicTokenInfo` which itself has `tokenId?: string`. Two fields for the same logical ID, easy to set inconsistently. The Client method uses `req.tokenId ?? ''` (`client.ts:171`) — so the top-level wins. But the `PublicTokenInfo.tokenId` inside `token` is still serialised on the wire (per `marshalUpdateTokenRequestSchema` on `model.ts:146-159`).
- **Category:** 12 (duplicate concept), 6 (misleading — which one is authoritative?), 11 (the inner one is dead-ish data).
- **Suggested name:** Drop one. Either: (a) make `token` exclude `tokenId` (`Omit<PublicTokenInfo, 'tokenId'>`) and keep the top-level; or (b) drop the top-level and use `req.token.tokenId` in the client.
- **Rationale:** Two fields for the same identifier invite subtle bugs (server may pick the inner one if the top-level is empty).

### 7. `Client` class name — colliding namespace — `client.ts:46`
- **Why weird:** Top-level class literally named `Client`. Re-exported in `index.ts` as just `Client`. A consumer importing from both `@databricks/sdk-tokens/v1` and `@databricks/sdk-tokenmanagement/v1` faces an identical name clash:
  ```
  import {Client} from '@databricks/sdk-tokens/v1';
  import {Client as AdminTokensClient} from '@databricks/sdk-tokenmanagement/v1';
  ```
  Worse, both packages export a class with method `listTokens(req, options)` where `req` is a *different* `ListTokensRequest` type. Strong TS types catch the assignment error, but the duplication forces an alias at every dual import.
- **Category:** 1 (vague), 12 (duplicate name across packages).
- **Suggested name:** `TokensClient`, `UserTokensClient`, or `MyTokensClient`. Mirror with `TokenManagementClient`/`AdminTokensClient`.
- **Rationale:** Same finding as `rfa#37`, recurs across all packages — but particularly painful here given the `tokens`/`tokenmanagement` overlap.

## Low severity

### 8. `publicTokenInfoFieldMask` exported helper — public-API field-mask builder — `model.ts:168`
- **Why weird:** The package exports `publicTokenInfoFieldMask(...)` as a top-level helper alongside the `Client`. Field-mask builders are an SDK-shape choice: making one a public export per type bakes the proto-FieldMask convention into the public API surface. Consumers writing `UpdateTokenRequest` payloads must learn this helper.
- **Category:** 8 (helper-as-public-API), 13 (intra-package inconsistency — see #9 re-export gap).
- **Suggested name:** Either hoist into a single `Client.updateToken` overload that accepts a partial payload and derives the mask, or document the helper prominently in `index.ts`.
- **Rationale:** Exporting per-type mask builders is a Go-port artefact; native TS would lean on `Partial<T>` + key inference.

## Observations

### 9. `index.ts` re-exports interfaces but not the `publicTokenInfoFieldMask` helper
The index file exports the `Client` and eight model interfaces (`CreateTokenRequest`, `CreateTokenRequest_Response`, `ListTokensRequest`, `ListTokensRequest_Response`, `PublicTokenInfo`, `RevokeTokenRequest`, `RevokeTokenRequest_Response`, `UpdateTokenRequest`, `UpdateTokenResponse`). It does *not* export the `publicTokenInfoFieldMask` helper. Consistent with sibling packages but means a downstream consumer cannot build field masks without reaching into `./model` directly. Same finding as `rfa#43`.

### 10. Method `updateToken` uses URL path interpolation on a potentially empty string — `client.ts:171`
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
- Cross-referenced `packages/tokenmanagement/src/v1/` for overlap analysis (see findings #1, #3, #4, #6).
