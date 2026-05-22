# Naming Audit: oauthcustomappintegration

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/oauth/src/v1/` (formerly `packages/oauthcustomappintegration/src/v1/`; consolidated into the `oauth` package)
**Versions audited:** v1
**Inferred domain:** Account-level CRUD for OAuth App Integrations. Two flavours of integration are managed by the same service: *Custom* (caller-owned OAuth clients with their own redirect URLs and scopes) and *Published* (catalog of Databricks-blessed third-party apps such as Power BI or Tableau Desktop, identified by a stable `appId`). Both share the `TokenAccessPolicy` configuration. The package is the Databricks account-side complement of the `RFC 6749`/`OAuth 2.0` client registration concept.
**Total weird names flagged:** 13

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 3 |
| Low | 4 |
| Observation | 2 |

## High severity

### 1. Every domain type re-states `OAuthAppIntegration` and now also carries a `Request` suffix — model.ts:5, 28, 45, 70, 82, 90, 98, 105, 110, 124, 137, 171, 209, 232
- **Why weird:** Inside the consolidated `oauth` package, every type name still spells "OAuthAppIntegration" in full, and the new regeneration added a `Request` suffix to every request DTO. Imports look like this:
  ```ts
  import {
    CreateCustomOAuthAppIntegrationRequest,
    CreatePublishedOAuthAppIntegrationRequest,
    CustomOAuthAppIntegration,
    CustomOAuthAppIntegrationSecret,
    DeleteCustomOAuthAppIntegrationRequest,
    DeletePublishedOAuthAppIntegrationRequest,
    GetCustomOAuthAppIntegrationRequest,
    GetPublishedOAuthAppIntegrationRequest,
    ListCustomOAuthAppIntegrationsRequest,
    ListPublishedOAuthAppIntegrationsRequest,
    PublishedOAuthAppIntegration,
    UpdateCustomOAuthAppIntegrationRequest,
    UpdatePublishedOAuthAppIntegrationRequest,
  } from '@databricks/sdk-oauth/v1';
  ```
  Most request DTO names are now >35 characters; `CreatePublishedOAuthAppIntegrationRequest` is 42. The package name already declares the namespace, so the type names need not re-declare it. Compare what the same code would look like with shorter names: `CreateCustom`, `CreatePublished`, `Custom`, `Published`, `CustomSecret`, `DeleteCustom`, … (still readable when paired with the package import).
- **Category:** 7, 8, 20 (overly verbose; redundant suffix; type-suffix tautology — every type ends with the package domain noun)
- **Suggested name:** Drop the `OAuthAppIntegration` suffix from every type and the `Request` suffix from request DTOs. With a namespace import the call site reads `oauth.CreateCustom`, `oauth.Custom`, `oauth.CustomSecret`, `oauth.ListPublished`. With named imports, alias if needed.
- **Rationale:** TypeScript module imports already qualify the namespace. Repeating it across every type produces walls of identifiers where the eye has to skip redundant characters to find the discriminator (`Create` vs `Update` vs `Delete` vs `List` vs `Get`, and `Custom` vs `Published`). The redundancy is a Go convention port: in Go `oauthcustomappintegration.CreateCustomAppIntegrationRequest` is necessary because Go has no struct-level method namespacing. TS does not have that constraint.

### 2. Proto-nested `Request_Response` underscore-infix types leak protobuf message-nesting into TS — model.ts:40, 88, 96, 118, 131, 147, 230, 240 (and matching schemas at 243, 297, 301, 305, 319, 333, 400, 404)
- **Why weird:** Eight types follow the pattern `<Verb><Domain>Request_Response` (e.g. `CreatePublishedOAuthAppIntegrationRequest_Response`, `DeleteCustomOAuthAppIntegrationRequest_Response`). The underscore-infix is a literal carry-over of protobuf nested-message naming (`Request.Response` in the proto, rendered as `Request_Response` by code-gen). Each declaration carries `// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.`, which is the generator self-documenting an architectural leak. The names are also tautological in TypeScript: a response type does not need to embed `Request` in its name.
- **Category:** Proto-architectural-leak: `Foo_PublicRequest` pattern (underscore-infix proto-nested message name); also 7, 8, 20 (verbose; redundant `Request` infix; tautology)
- **Suggested name:** Drop the `Request_` prefix and use the response noun: `CreatePublishedResponse`, `DeleteCustomResponse`, `DeletePublishedResponse`, `ListCustomResponse`, `ListPublishedResponse`, `ListPublishedAppsResponse`, `UpdateCustomResponse`, `UpdatePublishedResponse` (or, since several are empty interfaces, replace with `void` / `undefined` returns on the corresponding `Client` methods). Combine with finding #1 to drop the `OAuthAppIntegration` middle as well.
- **Rationale:** TypeScript has no notion of a message nested inside another message; the underscore is a generator-side fix-up that bleeds proto schema topology into the public API surface. The eslint-disable comments are the smoking gun: the project linter rejects these identifiers by default and they only pass because each one carries a per-line escape hatch. Idiomatic TS response types are sibling exports, not underscore-nested children.

### 3. JSDoc cross-refs point to `CustomAppIntegration` / `PublishedAppIntegration` services that do not exist — client.ts:101, 137, 172, 203, 458, 493
- **Why weird:** JSDoc on `createCustomOAuthAppIntegration` says:
  > You can retrieve the custom OAuth app integration via `:method:CustomAppIntegration/get`.

  Same pattern on `createPublishedOAuthAppIntegration` → `:method:PublishedAppIntegration/get`. But there is no `CustomAppIntegration` or `PublishedAppIntegration` service exposed by this package — the actual method is `getCustomOAuthAppIntegration` on `Client`. The doc references are stale from a previous naming scheme (the Go SDK has separate `CustomAppIntegrations` and `PublishedAppIntegrations` sub-services). Anyone clicking through will hit a broken reference.
- **Category:** 6 (misleading)
- **Suggested name:** Fix the JSDoc cross-references to point to the real method (`Client.getCustomOAuthAppIntegration` / `Client.getPublishedOAuthAppIntegration`). The `:method:Foo/get` proto-doc directive should be processed to TypeScript-link form during generation.
- **Rationale:** Documentation lying to the reader is worse than verbose-but-correct documentation.

### 4. `appId` on Published refers to a slug, not an ID — model.ts:34, 173
- **Why weird:** `CreatePublishedOAuthAppIntegrationRequest.appId` and `PublishedOAuthAppIntegration.appId` are documented as `For example power-bi, tableau-deskop` (note also: typo `deskop`). These are human-readable slugs, not opaque IDs. Calling them `appId` and typing as `string` collides with the convention that `xId` is an opaque UUID-like identifier (cf. `accountId`, `integrationId`, `clientId`, `principalId`). The Go reference (`databricks/api/oauth2/published`) calls it `AppID` too, but the value is clearly a published-catalog key like `power-bi`. The typo `tableau-deskop` in the doc comment is also untracked.
- **Category:** 6, 19 (misleading; underspecified ID — what kind of ID?)
- **Suggested name:** `appSlug` or `publishedAppKey` with type narrowed to a string literal union or enum: `'power-bi' | 'tableau-desktop' | 'looker' | ...`. At minimum, fix the `tableau-deskop` typo and document the format ("dash-separated lowercase slug from the Databricks published-app catalog").
- **Rationale:** "ID" in this codebase otherwise means opaque UUID/integer (`integrationId`, `clientId`, `principalId`, `accountId`). Mixing in a human-readable slug under the same suffix is a teaching trap for callers.

## Medium severity

### 5. `createdBy: number` is a user ID hidden as a numeric — model.ts:59, 180
- **Why weird:** Used in both `CustomOAuthAppIntegration` and `PublishedOAuthAppIntegration`. The field doc is empty, but it pairs with `creatorUsername: string` on `CustomOAuthAppIntegration`, so `createdBy` is the *user ID* of the creator. Calling it `createdBy` and typing it as `number` (rather than `creatorUserId` typed as `number` or `string`) hides the meaning. `principalId: number` next door has the same problem.
- **Category:** 1, 15, 19 (vague; generic field; underspecified ID)
- **Suggested name:** `createdByUserId: number` or just `creatorUserId: number`. Document explicitly that this is the numeric Databricks user ID (note: many other places in the codebase use `string` for user IDs).
- **Rationale:** A bare `createdBy: number` is the worst kind of numeric ID — no type information, no doc, and a name that reads as an activity verb. The asymmetry with `creatorUsername: string` (which sits 2 lines below in `CustomOAuthAppIntegration` but is missing from `PublishedOAuthAppIntegration`) compounds the confusion.

### 6. `confidential: boolean` — too generic for "requires-secret" flag — model.ts:12, 55
- **Why weird:** The doc comment is informative ("indicates whether an OAuth client secret is required to authenticate this client"), but the field name `confidential` is ambiguous outside RFC 6749 context. A reader has to know OAuth specifically (RFC 6749 §2.1 distinguishes "confidential" vs "public" clients) to decode this. The field doesn't follow a `requires…` or `is…` convention used elsewhere in the codebase.
- **Category:** 1, 5 (vague/generic; cryptic abbreviation of a spec term)
- **Suggested name:** `isConfidentialClient`, `requiresClientSecret`, or `confidentialClient`. If keeping `confidential`, add the RFC 6749 link in the doc.
- **Rationale:** Half of OAuth API consumers will not recognize "confidential" as the RFC 6749 client-type discriminator. Note that `PublishedOAuthApp.isConfidentialClient` (model.ts:164) uses the longer-form name, so the package itself is inconsistent here.

### 7. `userAuthorizedScopes` vs `scopes` overlap — model.ts:19, 25, 58, 67, 220, 226
- **Why weird:** Two scope fields that look unrelated by name but the doc explicitly says `userAuthorizedScopes` "must be a subset of `scopes`". The relationship is invisible from the type — a caller could set `scopes = ["all-apis"]` and `userAuthorizedScopes = ["sql"]` and the type system won't help. `scopes` is the *requested* scope set, `userAuthorizedScopes` is the *user-consent gate* subset. Names do not encode this subset relationship.
- **Category:** 1, 6 (vague; misleading — `scopes` doesn't say "requested")
- **Suggested name:** `requestedScopes` (rename `scopes`) and `consentRequiredScopes` (rename `userAuthorizedScopes`). Or document the subset relationship inline on `scopes` with a backreference.
- **Rationale:** Bug class: caller assumes `userAuthorizedScopes` is "what the user actually consented to" (a state) rather than "what we *will* ask the user to consent to" (a config). The current name reads past-tense and is easily misread.

## Low severity

### 8. `OAuth` casing is consistent — model.ts:throughout
- **Why weird:** Worth flagging for completeness: this package uses `OAuth` consistently (capital O, capital A, lowercase uth). No `OAUTH`, `Oauth`, or `oAuth` variants appear. This matches Google TS style guide guidance for trade-mark casing and matches RFC 6749 ("OAuth 2.0"). No action.
- **Category:** 3 (acronym casing — flagged as compliant)
- **Suggested name:** None — confirm the project-wide policy is `OAuth`.
- **Rationale:** Documenting the convention. Other audits should check sibling packages for `OAuth2` vs `Oauth2` vs `OAUTH2`.

### 9. `accessTokenTtlInMinutes`, `refreshTokenTtlInMinutes`, `absoluteSessionLifetimeInMinutes` — unit suffix bloat — model.ts:186, 192, 206
- **Why weird:** Three TTL fields, two named `…InMinutes`, one named `…LifetimeInMinutes`. The "InMinutes" suffix is verbose. Three options to consider:
  - Adopt `Temporal.Duration` for the type (no unit in the name needed).
  - Keep the unit in the name but standardise on `Minutes` suffix (`accessTokenTtlMinutes`, `refreshTokenTtlMinutes`, `sessionTtlMinutes`).
  - Document the unit in JSDoc only and use bare names (`accessTokenTtl`, `refreshTokenTtl`).
- **Category:** 7 (overly verbose)
- **Suggested name:** `accessTokenTtl: Temporal.Duration`, `refreshTokenTtl: Temporal.Duration`, `absoluteSessionLifetime: Temporal.Duration`.
- **Rationale:** Using `Temporal.Duration` removes the need to encode the unit in the field name, and removes the asymmetry between `TtlInMinutes` and `LifetimeInMinutes` (one is "TTL", the other "lifetime" — same concept).

### 10. `enableSingleUseRefreshTokens` boolean naming inconsistency with `confidential` — model.ts:199
- **Why weird:** `enableSingleUseRefreshTokens` uses the verb-first `enableX` convention, but `confidential` uses no prefix. Other boolean conventions in the codebase favour `isX`/`hasX`. Three competing patterns on one type.
- **Category:** 13, 17 (verb-tense inconsistency; inconsistent action verbs)
- **Suggested name:** Align to one of `singleUseRefreshTokensEnabled` (state), `useSingleUseRefreshTokens` (config), or `rotateRefreshTokens` (behaviour).
- **Rationale:** "Enable X" reads as an action and slightly suggests a method/mutator. State booleans typically use predicate suffix `isEnabled`/`enabled` or domain noun.

### 11. `includeCreatorUsername: boolean` query param on List Custom only — model.ts:114
- **Why weird:** `ListCustomOAuthAppIntegrationsRequest` has `includeCreatorUsername` but `ListPublishedOAuthAppIntegrationsRequest` does not (line 124). The asymmetry is fine for the API (Published integrations don't track creator the same way) but the type-level discoverability is poor. A caller writing both list calls in sequence will not understand why the option is missing from one. The name itself is also a query-flag for *server-side join inclusion*, which is unusual for an SDK to expose verbatim.
- **Category:** 5 (cryptic — the flag's semantics are non-obvious)
- **Suggested name:** Keep the field but document explicitly: "When true, the server resolves `createdBy` to `creatorUsername` in the response (extra database lookup)."
- **Rationale:** The default behaviour (omit username) is a performance optimization; callers should know enabling this is a server-side join.

## Observations

### O1. JSDoc literal templating leaks `<Databricks>` and `<Account>` markup — model.ts:73, 76, 195 and client.ts:285, 345, 402
- The literal tokens `<Databricks>` and `<Account>` appear in six places in this package. They are proto-doc templating tokens that should have been substituted to "Databricks" / "account" during generation. They render as broken-HTML angle-bracket sequences in TypeScript hover popups. This is a generator bug, not a per-package naming issue, but worth tagging at the project level.

### O2. `flattenQueryParams` is exported but unused — utils.ts:123
- This package never builds nested query parameters (`ListCustomOAuthAppIntegrationsRequest` uses three flat scalars), so `flattenQueryParams` is dead in this build. Same as in many sibling packages. Either drop the `export` or move the helper to `@databricks/sdk-core`.

## Domain glossary
- `accountId` — Databricks account UUID (top-level tenant), distinct from a workspace ID.
- `appId` — Slug key into the Databricks published-app catalog (`power-bi`, `tableau-desktop`, …). Despite the `Id` suffix, this is a human-readable name, not an opaque ID.
- `clientId` — RFC 6749 client identifier (the OAuth "client_id" returned by the server).
- `clientSecret` — RFC 6749 client secret. Only returned at creation time for confidential clients.
- `confidential` — RFC 6749 §2.1 client type: `true` means the client has a secret and can authenticate itself.
- `Custom` integration — Caller-defined OAuth client (their own redirect URLs, scopes, secret).
- `integrationId` — Opaque server-issued ID for an OAuth app integration row. Distinct from `clientId`.
- `OAuth` — IETF OAuth 2.0 (RFC 6749), the authorization framework. Always cased `OAuth` in this package.
- `principalId` — Databricks service-principal ID auto-created alongside the integration.
- `Published` integration — Databricks-blessed third-party app (Power BI, Tableau, …) the account has enabled.
- `scopes` — RFC 6749 scope strings that the integration may request. Documented values: `all-apis`, `sql`, `offline_access`, `openid`, `profile`, `email`.
- `TokenAccessPolicy` — Per-integration token TTL and refresh-rotation policy.
- `userAuthorizedScopes` — Subset of `scopes` requiring end-user consent. Misleading: this is *will-ask*, not *did-grant*.

## File coverage
- `src/v1/model.ts` (488 lines): read fully — 22 type exports, 13 schema exports.
- `src/v1/client.ts` (526 lines): read fully — 1 class, 11 async methods, 3 async generators.
- `src/v1/utils.ts` (151 lines): read fully — generic across packages.
- `src/v1/index.ts` (33 lines): read fully — re-exports.
- `package.json`: read for context.

## Fixed
- #1 Package name `oauthcustomappintegration` mis-scopes the package (originally cited at `package.json:2`): Fixed in regeneration on 2026-05-20 — the standalone package was consolidated into `@databricks/sdk-oauth`, eliminating the misleading package name.
- #6 `createTime: string` vs `clientSecretExpireTime: Temporal.Instant` type inconsistency (originally cited at `model.ts:61, 89, 157`): Fixed in regeneration on 2026-05-20 — the `clientSecretExpireTime` field was removed during consolidation; the type-inconsistency between two timestamp fields no longer exists.
- #7 `clientSecretExpireTime` verb tense (originally cited at `model.ts:89`): Fixed in regeneration on 2026-05-20 — the field was removed during consolidation.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
