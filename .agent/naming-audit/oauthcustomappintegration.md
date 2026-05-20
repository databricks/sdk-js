# Naming Audit: oauthcustomappintegration

**Path:** `packages/oauthcustomappintegration/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level CRUD for OAuth App Integrations. Two flavours of integration are managed by the same service: *Custom* (caller-owned OAuth clients with their own redirect URLs and scopes) and *Published* (catalog of Databricks-blessed third-party apps such as Power BI or Tableau Desktop, identified by a stable `appId`). Both share the `TokenAccessPolicy` configuration. The package is the Databricks account-side complement of the `RFC 6749`/`OAuth 2.0` client registration concept.
**Total weird names flagged:** 15

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 5 |
| Low | 4 |
| Observation | 2 |

## High severity

### 1. Package name `oauthcustomappintegration` mis-scopes the package — `package.json:2`
- **Why weird:** The package is named `@databricks/sdk-oauthcustomappintegration`, but only roughly half the surface concerns *custom* integrations (`CreateCustomOAuthAppIntegration`, `CustomOAuthAppIntegration`, etc.). The other half is *published* integrations (`CreatePublishedOAuthAppIntegration`, `PublishedOAuthAppIntegration`, etc.). The package's `Client` is a single mixed service handling both. Naming the package `…customappintegration` leads any developer reading `import { Client } from '@databricks/sdk-oauthcustomappintegration/v1'` to assume Published is in a different package — but it is not. There is also no separator: it reads as one 25-character unbroken token, harder to skim than `oauth-app-integrations` or `oauth_app_integrations`.
- **Category:** 6, 7, 9 (misleading scope; overly verbose; singular when it represents N integration types)
- **Suggested name:** `@databricks/sdk-oauthappintegrations` (plural; drops the misleading "custom" since the package also covers published). Or split into two packages: `oauthcustomappintegrations` and `oauthpublishedappintegrations`, each plural.
- **Rationale:** The Go SDK reference path is `databricks/api/oauth2` (umbrella for all OAuth concerns), which suggests the cross-service grouping is the natural one. The current TS name picks one half of the surface and elevates it to the package title, which is actively misleading. Pluralizing avoids the "what does one integration mean?" confusion at the import line.

### 2. Every domain type re-states `OAuthAppIntegration` — model.ts:6, 29, 46, 73, 92, 100, 108, 115, 120, 134, 147, 185, 208
- **Why weird:** Inside a package called `oauthcustomappintegration`, *every* type name still spells "OAuthAppIntegration" in full. Imports look like this:
  ```ts
  import {
    CreateCustomOAuthAppIntegration,
    CreatePublishedOAuthAppIntegration,
    CustomOAuthAppIntegration,
    CustomOAuthAppIntegrationSecret,
    DeleteCustomOAuthAppIntegration,
    DeletePublishedOAuthAppIntegration,
    GetCustomOAuthAppIntegration,
    GetPublishedOAuthAppIntegration,
    ListCustomOAuthAppIntegrations,
    ListPublishedOAuthAppIntegrations,
    PublishedOAuthAppIntegration,
    UpdateCustomOAuthAppIntegration,
    UpdatePublishedOAuthAppIntegration,
  } from '@databricks/sdk-oauthcustomappintegration/v1';
  ```
  Most exported types are >25 characters long; several are >35 characters. The package name already declares the namespace, so the type names need not re-declare it. Compare what the same code would look like with shorter names: `CreateCustom`, `CreatePublished`, `Custom`, `Published`, `CustomSecret`, `DeleteCustom`, … (still readable when paired with the package import).
- **Category:** 7, 8, 20 (overly verbose; redundant suffix; type-suffix tautology — every type ends with the package domain noun)
- **Suggested name:** Drop the `OAuthAppIntegration` suffix from every type. With a namespace import the call site reads `oauth.CreateCustom`, `oauth.Custom`, `oauth.CustomSecret`, `oauth.ListPublished`. With named imports, alias if needed.
- **Rationale:** TypeScript module imports already qualify the namespace. Repeating it across every type produces walls of identifiers where the eye has to skip redundant characters to find the discriminator (`Create` vs `Update` vs `Delete` vs `List` vs `Get`, and `Custom` vs `Published`). The redundancy is a Go convention port: in Go `oauthcustomappintegration.CreateCustomAppIntegrationRequest` is necessary because Go has no struct-level method namespacing. TS does not have that constraint. See the Go reference at `databricks/api/oauth2/oauthcustomappintegration` where the Go names are necessarily fully qualified — but a 1:1 port should adapt to TS naming, not blindly copy.

### 3. Type names use `OAuthAppIntegration` but methods use `OAuthAppIntegration` while doc cross-refs use `CustomAppIntegration` / `PublishedAppIntegration` — `client.ts:97, 133, 168, 199`
- **Why weird:** JSDoc on `createCustomOAuthAppIntegration` says:
  > You can retrieve the custom OAuth app integration via `:method:CustomAppIntegration/get`.

  Same pattern on `createPublishedOAuthAppIntegration` → `:method:PublishedAppIntegration/get`. But there is no `CustomAppIntegration` or `PublishedAppIntegration` service exposed by this package — the actual method is `getCustomOAuthAppIntegration` on `Client`. The doc references are stale from a previous naming scheme (the Go SDK has separate `CustomAppIntegrations` and `PublishedAppIntegrations` sub-services). Anyone clicking through will hit a broken reference.
- **Category:** 6 (misleading)
- **Suggested name:** Fix the JSDoc cross-references to point to the real method (`Client.getCustomOAuthAppIntegration` / `Client.getPublishedOAuthAppIntegration`). The `:method:Foo/get` proto-doc directive should be processed to TypeScript-link form during generation.
- **Rationale:** Documentation lying to the reader is worse than verbose-but-correct documentation.

### 4. `appId` on Published refers to a slug, not an ID — `model.ts:33, 149`
- **Why weird:** `CreatePublishedOAuthAppIntegration.appId` and `PublishedOAuthAppIntegration.appId` are documented as `For example power-bi, tableau-deskop` (note also: typo `deskop`). These are human-readable slugs, not opaque IDs. Calling them `appId` and typing as `string` collides with the convention that `xId` is an opaque UUID-like identifier (cf. `accountId`, `integrationId`, `clientId`, `principalId`). The Go reference (`databricks/api/oauth2/published`) calls it `AppID` too, but the value is clearly a published-catalog key like `power-bi`. The typo `tableau-deskop` in the doc comment is also untracked.
- **Category:** 6, 19 (misleading; underspecified ID — what kind of ID?)
- **Suggested name:** `appSlug` or `publishedAppKey` with type narrowed to a string literal union or enum: `'power-bi' | 'tableau-desktop' | 'looker' | ...`. At minimum, fix the `tableau-deskop` typo and document the format ("dash-separated lowercase slug from the Databricks published-app catalog").
- **Rationale:** "ID" in this codebase otherwise means opaque UUID/integer (`integrationId`, `clientId`, `principalId`, `accountId`). Mixing in a human-readable slug under the same suffix is a teaching trap for callers.

## Medium severity

### 5. `createdBy: number` is a user ID hidden as a numeric — `model.ts:60, 156`
- **Why weird:** Used in both `CustomOAuthAppIntegration` and `PublishedOAuthAppIntegration`. The field doc is empty, but it pairs with `creatorUsername: string` on `CustomOAuthAppIntegration`, so `createdBy` is the *user ID* of the creator. Calling it `createdBy` and typing it as `number` (rather than `creatorUserId` typed as `number` or `string`) hides the meaning. `principalId: number` next door has the same problem.
- **Category:** 1, 15, 19 (vague; generic field; underspecified ID)
- **Suggested name:** `createdByUserId: number` or just `creatorUserId: number`. Document explicitly that this is the numeric Databricks user ID (note: many other places in the codebase use `string` for user IDs).
- **Rationale:** A bare `createdBy: number` is the worst kind of numeric ID — no type information, no doc, and a name that reads as an activity verb. The asymmetry with `creatorUsername: string` (which sits 2 lines below in `CustomOAuthAppIntegration` but is missing from `PublishedOAuthAppIntegration`) compounds the confusion.

### 6. `createTime: string` vs `clientSecretExpireTime: Temporal.Instant` — type inconsistency — `model.ts:61, 89, 157`
- **Why weird:** Both fields are timestamps. `createTime` is typed as `string` (raw ISO 8601, unparsed). `clientSecretExpireTime` is typed as `Temporal.Instant` (parsed via `Temporal.Instant.from`). Same package, same wire format, two different deserialization choices. Callers have to remember which fields are parsed and which are not. Looking at the unmarshal code at line 270, `client_secret_expire_time` gets `.transform(s => Temporal.Instant.from(s))` while `create_time` (line 241, 327) does not.
- **Category:** 16 (field contradicting type domain — both timestamps, different types)
- **Suggested name:** Names are fine; the *types* are inconsistent. Either both `Temporal.Instant` (preferred — this is the post-Temporal TS world) or both `string`. Apply consistently across the package.
- **Rationale:** A consumer doing `if (integration.createTime < other.createTime)` will get string comparison silently; if they did the same with `Temporal.Instant` they would get a type error and use `Temporal.Instant.compare`. The current state is a footgun.

### 7. `clientSecretExpireTime` verb tense — `model.ts:89`
- **Why weird:** "Expire" is the bare infinitive — should be "expires" (third-person singular: "the secret expires at T") or "expiry"/"expiration" (noun). The Go side likely has `ClientSecretExpireTime` because Go traditionally uses verb-first compound nouns (`expireTime`, `createTime`), but TS/JS naming tends to use either the noun (`expirationTime`, `expirationDate`) or the inflected verb (`expiresAt`). `createTime`/`createdBy` next door have the same issue (should be `createdAt`/`creator`).
- **Category:** 13, 14 (verb-tense inconsistency; Go/Java-style names)
- **Suggested name:** `clientSecretExpiresAt`, `createdAt`, `creator` (or `creatorUserId`).
- **Rationale:** TypeScript ecosystem standard is `xAt` for timestamps and inflected verbs in field names. The Go form `xTime` reads as a Go transliteration.

### 8. `confidential: boolean` — too generic for "requires-secret" flag — `model.ts:13, 56`
- **Why weird:** The doc comment is informative ("indicates whether an OAuth client secret is required to authenticate this client"), but the field name `confidential` is ambiguous outside RFC 6749 context. A reader has to know OAuth specifically (RFC 6749 §2.1 distinguishes "confidential" vs "public" clients) to decode this. The field doesn't follow a `requires…` or `is…` convention used elsewhere in the codebase.
- **Category:** 1, 5 (vague/generic; cryptic abbreviation of a spec term)
- **Suggested name:** `isConfidentialClient`, `requiresClientSecret`, or `confidentialClient`. If keeping `confidential`, add the RFC 6749 link in the doc.
- **Rationale:** Half of OAuth API consumers will not recognize "confidential" as the RFC 6749 client-type discriminator.

### 9. `userAuthorizedScopes` vs `scopes` overlap — `model.ts:20, 26, 59, 68, 196, 202`
- **Why weird:** Two scope fields that look unrelated by name but the doc explicitly says `userAuthorizedScopes` "must be a subset of `scopes`". The relationship is invisible from the type — a caller could set `scopes = ["all-apis"]` and `userAuthorizedScopes = ["sql"]` and the type system won't help. `scopes` is the *requested* scope set, `userAuthorizedScopes` is the *user-consent gate* subset. Names do not encode this subset relationship.
- **Category:** 1, 6 (vague; misleading — `scopes` doesn't say "requested")
- **Suggested name:** `requestedScopes` (rename `scopes`) and `consentRequiredScopes` (rename `userAuthorizedScopes`). Or document the subset relationship inline on `scopes` with a backreference.
- **Rationale:** Bug class: caller assumes `userAuthorizedScopes` is "what the user actually consented to" (a state) rather than "what we *will* ask the user to consent to" (a config). The current name reads past-tense and is easily misread.

## Low severity

### 10. `OAuth` casing is consistent — `model.ts:throughout`
- **Why weird:** Worth flagging for completeness: this package uses `OAuth` consistently (capital O, capital A, lowercase uth). No `OAUTH`, `Oauth`, or `oAuth` variants appear. This matches Google TS style guide guidance for trade-mark casing and matches RFC 6749 ("OAuth 2.0"). No action.
- **Category:** 3 (acronym casing — flagged as compliant)
- **Suggested name:** None — confirm the project-wide policy is `OAuth`.
- **Rationale:** Documenting the convention. Other audits should check sibling packages for `OAuth2` vs `Oauth2` vs `OAUTH2`.

### 11. `accessTokenTtlInMinutes`, `refreshTokenTtlInMinutes`, `absoluteSessionLifetimeInMinutes` — unit suffix bloat — `model.ts:162, 168, 182`
- **Why weird:** Three TTL fields, two named `…InMinutes`, one named `…LifetimeInMinutes`. The "InMinutes" suffix is verbose. Three options to consider:
  - Adopt `Temporal.Duration` for the type (no unit in the name needed).
  - Keep the unit in the name but standardise on `Minutes` suffix (`accessTokenTtlMinutes`, `refreshTokenTtlMinutes`, `sessionTtlMinutes`).
  - Document the unit in JSDoc only and use bare names (`accessTokenTtl`, `refreshTokenTtl`).
- **Category:** 7 (overly verbose)
- **Suggested name:** `accessTokenTtl: Temporal.Duration`, `refreshTokenTtl: Temporal.Duration`, `absoluteSessionLifetime: Temporal.Duration`.
- **Rationale:** The project already uses `Temporal.Instant` for `clientSecretExpireTime`. Extending to `Temporal.Duration` here removes the need to encode the unit in the field name, and removes the asymmetry between `TtlInMinutes` and `LifetimeInMinutes` (one is "TTL", the other "lifetime" — same concept).

### 12. `enableSingleUseRefreshTokens` boolean naming inconsistency with `confidential` — `model.ts:175`
- **Why weird:** `enableSingleUseRefreshTokens` uses the verb-first `enableX` convention, but `confidential` uses no prefix. Other boolean conventions in the codebase favour `isX`/`hasX`. Three competing patterns on one type.
- **Category:** 13, 17 (verb-tense inconsistency; inconsistent action verbs)
- **Suggested name:** Align to one of `singleUseRefreshTokensEnabled` (state), `useSingleUseRefreshTokens` (config), or `rotateRefreshTokens` (behaviour).
- **Rationale:** "Enable X" reads as an action and slightly suggests a method/mutator. State booleans typically use predicate suffix `isEnabled`/`enabled` or domain noun.

### 13. `includeCreatorUsername: boolean` query param on List Custom only — `model.ts:124`
- **Why weird:** `ListCustomOAuthAppIntegrations` has `includeCreatorUsername` but `ListPublishedOAuthAppIntegrations` does not (line 134). The asymmetry is fine for the API (Published integrations don't track creator the same way) but the type-level discoverability is poor. A caller writing both list calls in sequence will not understand why the option is missing from one. The name itself is also a query-flag for *server-side join inclusion*, which is unusual for an SDK to expose verbatim.
- **Category:** 5 (cryptic — the flag's semantics are non-obvious)
- **Suggested name:** Keep the field but document explicitly: "When true, the server resolves `createdBy` to `creatorUsername` in the response (extra database lookup)."
- **Rationale:** The default behaviour (omit username) is a performance optimization; callers should know enabling this is a server-side join.

## Observations

### O1. JSDoc literal templating leaks `<Databricks>` and `<Account>` markup — `model.ts:80, 82, 172, 178` and `client.ts:281, 341`
- The literal tokens `<Databricks>` and `<Account>` appear in seven places in this package. They are proto-doc templating tokens that should have been substituted to "Databricks" / "account" during generation. They render as broken-HTML angle-bracket sequences in TypeScript hover popups. This is a generator bug, not a per-package naming issue, but worth tagging at the project level.

### O2. `flattenQueryParams` is exported but unused — `utils.ts:123`
- This package never builds nested query parameters (`ListCustomOAuthAppIntegrations` uses three flat scalars), so `flattenQueryParams` is dead in this build. Same as in many sibling packages. Either drop the `export` or move the helper to `@databricks/sdk-core`.

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
- `src/v1/model.ts` (435 lines): read fully — 21 type exports, 13 schema exports.
- `src/v1/client.ts` (468 lines): read fully — 1 class, 10 async methods, 2 async generators.
- `src/v1/utils.ts` (151 lines): read fully — generic across packages.
- `src/v1/index.ts` (30 lines): read fully — re-exports.
- `package.json` (41 lines): read for context.
