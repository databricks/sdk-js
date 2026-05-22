# Naming Audit: oauth

**Path:** `packages/oauth/src/v1/`
**Versions audited:** v1
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `transport.ts`, `index.ts`
**Inferred domain:** Account-level CRUD over OAuth 2.0 application
registrations. After the 2026-05-22 regeneration the former
`oauthcustomappintegration` and `oauthpublishedapp` packages were
consolidated into a single `@databricks/sdk-oauth` package. The surface
covers three resources in one client:

- *Custom* OAuth app integrations — caller-defined OAuth clients with
  their own `redirectUrls`, `scopes`, and (optionally) a confidential
  client secret (`CustomOAuthAppIntegration`,
  `CustomOAuthAppIntegrationSecret`).
- *Published* OAuth app integrations — registrations of
  Databricks-blessed third-party apps such as Power BI or Tableau
  Desktop, identified by a slug `appId` (`PublishedOAuthAppIntegration`).
- *Published* OAuth apps — read-only catalog rows describing the
  available third-party apps (`PublishedOAuthApp`).

All three share the `TokenAccessPolicy` type for access/refresh-token
TTL and session-rotation configuration. The package is the Databricks
account-side complement to RFC 6749 client registration.
**Total weird names flagged:** 9

## Summary table

| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 3 |
| Low | 3 |
| Observation | 2 |
| **Total** | **9 (+ 2 observations)** |

The audit excludes the `OAuth*` brand-name spelling (RFC 6749 platform-name
exception), `*_UNSPECIFIED` proto sentinels, `*_Response` proto-nested
underscored identifiers, `marshal*` / `unmarshalSchema` Zod helper names,
empty wrapper types, `*Iter` pagination duplicates, redundant enum prefixes,
JS-built-in acronym casing (`URLSearchParams`, `JSON.parse`), and
wire-format strings preserved in JSDoc. The remaining findings cluster
around (1) the consolidated package surfacing intra-package
inconsistencies that used to be cross-package, (2) `appId` being a
human-readable slug rather than an opaque ID, and (3) leftover
generator/template artefacts (stale `:method:` cross-refs, `<Databricks>`
template tokens, dead helper exports).

---

## High severity (must fix)

### 1. `appId` is a slug, not an opaque ID — `model.ts:34, 156, 173`
- **Why:** Three types in this file expose a string field named `appId`.
  On `CreatePublishedOAuthAppIntegrationRequest` (line 34) the JSDoc
  reads "For example power-bi, tableau-deskop"; on `PublishedOAuthApp`
  (line 156) it reads "Unique ID of the published OAuth app"; on
  `PublishedOAuthAppIntegration` (line 173) it reads "App-id of the
  published app integration". So `appId` is actually a human-readable
  catalog slug such as `power-bi`, `tableau-desktop`, `looker`. Every
  other `xId` field in this package and across the SDK
  (`accountId`, `integrationId`, `clientId`, `createdBy`,
  `principalId`) is an opaque server-issued identifier. Mixing a slug
  in under the `Id` suffix is a teaching trap, and the three doc strings
  describe the same value three different ways.
- **Category:** 6, 19 (misleading; underspecified ID — what kind of ID?)
- **Suggested:** Rename to `appSlug` (or `publishedAppKey`) on all three
  types, narrow the type to a string literal union populated from the
  Databricks published-app catalog
  (`'power-bi' | 'tableau-desktop' | 'looker' | ...`), and replace the
  three divergent doc strings with one canonical line ("Dash-separated
  lowercase slug from the Databricks published-app catalog, e.g.
  `power-bi`."). Fix the `tableau-deskop` typo on line 32 in the
  process.
- **Rationale:** A slug typed as `string` and named `appId` is the
  worst possible mix of soft-typing — it advertises opacity while
  accepting any string, and the only documented examples are
  catalog-specific values. A literal union plus a non-`Id` name puts
  the value space in the type system instead of in a doc-comment
  asterisk-list.

### 2. Stale JSDoc cross-references to non-existent services — `client.ts:101, 137, 172, 203, 458, 493`
- **Why:** Six method docs say "You can retrieve the … OAuth app
  integration via `:method:CustomAppIntegration/get`" or
  "`:method:PublishedAppIntegration/get`". Neither `CustomAppIntegration`
  nor `PublishedAppIntegration` is exported by this package — the
  consolidated `Client` exposes `getCustomOAuthAppIntegration` and
  `getPublishedOAuthAppIntegration`. The `:method:Foo/bar` directive
  is proto-doc cross-reference syntax that should have been rewritten
  during generation. Anyone clicking through hits a broken reference,
  and the doc text reads as if there is a separate sub-service that
  doesn't exist.
- **Category:** 6 (misleading documentation)
- **Suggested:** Rewrite during generation to TS-link form, e.g.
  `Client.getCustomOAuthAppIntegration` / `Client.getPublishedOAuthAppIntegration`,
  rendered as a JSDoc `{@link}` tag. At minimum, drop the
  proto-cross-reference syntax and inline the method name as plain
  prose.
- **Rationale:** Documentation that names APIs that do not exist is
  worse than no documentation. The leak is a generator template
  failing to rewrite proto-cross-reference syntax for TS output.

### 3. `confidential` vs `isConfidentialClient` — same flag spelled two ways in one file — `model.ts:12, 55, 164`
- **Why:** The RFC 6749 §2.1 "confidential client" boolean flag appears
  three times in `model.ts`. On
  `CreateCustomOAuthAppIntegrationRequest.confidential` (line 12) and
  `CustomOAuthAppIntegration.confidential` (line 55) it is named
  `confidential`. On `PublishedOAuthApp.isConfidentialClient` (line 164)
  it is named `isConfidentialClient`. Both forms describe the same
  RFC 6749 client-type discriminator. Before the package consolidation
  this was a cross-package inconsistency; consolidation has now
  promoted it to a single-file inconsistency. The `isConfidentialClient`
  form is the clearer of the two (boolean predicate prefix, explicit
  `Client` noun) and matches the codebase convention for boolean
  state flags (`isEnabled`, `isPrimary`, …).
- **Category:** 12 (duplicate concept, inconsistent naming within one
  file)
- **Suggested:** Pick `isConfidentialClient` for all three sites and
  rename the two custom-integration usages.
- **Rationale:** The flag's value space and meaning are identical
  across the three types; the identifier should be too. Consolidation
  makes this a clean single-package fix that no longer requires
  cross-package coordination.

---

## Medium severity (worth pushing back on)

### 1. `userAuthorizedScopes` reads as past-tense "did consent" but is configuration of "will ask for consent" — `model.ts:25, 67, 226`
- **Why:** Three sites expose `userAuthorizedScopes?: string[]` —
  `CreateCustomOAuthAppIntegrationRequest`,
  `CustomOAuthAppIntegration`, and
  `UpdateCustomOAuthAppIntegrationRequest`. The doc reads "Scopes that
  will need to be consented by end user to mint the access token. If
  the user does not authorize the access token will not be minted.
  Must be a subset of scopes." So this is a *configuration* of the
  consent gate the server will enforce, not a record of past consent.
  The name `userAuthorizedScopes` reads as a state field — what the
  user already authorised — and a caller can easily misread it that
  way. A second issue: the subset relationship to `scopes` is invisible
  from the type — setting `scopes = ['all-apis']` and
  `userAuthorizedScopes = ['sql']` is a runtime-error, not a
  type-error.
- **Category:** 1, 6, 13 (vague; misleading verb tense; configuration
  vs state confusion)
- **Suggested:** Rename to `consentRequiredScopes` (configuration —
  "scopes that require explicit end-user consent"). At minimum, add
  inline JSDoc on `scopes` that backreferences this subset constraint
  and cite RFC 6749 §3.3 for the scope vocabulary.
- **Rationale:** Bug class: caller assumes `userAuthorizedScopes` is
  "what the user actually consented to" (read-after-write state) when
  it is actually "what we will ask the user to consent to" (write-only
  configuration). The current name reads past-tense and is easily
  misread. The same trap exists on the matching `update` request,
  which makes it possible to clobber a consent policy by accident.

### 2. `createdBy: number` is a user ID disguised as an activity verb — `model.ts:59, 180`
- **Why:** `CustomOAuthAppIntegration.createdBy` (line 59) and
  `PublishedOAuthAppIntegration.createdBy` (line 180) are both
  `number | undefined`. The custom variant pairs it 2 lines below with
  `creatorUsername: string` (line 61); the published variant lacks the
  username pair. The undocumented numeric `createdBy` is the
  Databricks user ID of the creator. The name reads as a verb phrase
  ("created by"), not as an identifier, and the bare `number` type
  carries no clue. The published variant's missing `creatorUsername`
  pair is itself an asymmetry — `includeCreatorUsername` (line 114)
  exists for custom but no equivalent for published.
- **Category:** 1, 15, 19 (vague; generic field; underspecified ID)
- **Suggested:** Rename to `creatorUserId: number` on both types and
  document explicitly as "Databricks numeric user ID of the
  registration creator." Keep `creatorUsername` next to it on
  `CustomOAuthAppIntegration` and add it to
  `PublishedOAuthAppIntegration` if the published API exposes it.
- **Rationale:** A bare `createdBy: number` is the worst kind of
  numeric ID — no type information, no JSDoc, and a name that reads
  as an activity-verb phrase rather than as a field. The asymmetry
  with `creatorUsername` (present on one of the two registration
  types) compounds the confusion.

### 3. `enableSingleUseRefreshTokens` is verb-first while the rest of the file is predicate-style — `model.ts:199`
- **Why:** `TokenAccessPolicy.enableSingleUseRefreshTokens` (line 199)
  uses the imperative-verb-first convention (`enableX`). The rest of
  `TokenAccessPolicy` uses predicate-noun naming
  (`accessTokenTtlInMinutes`, `refreshTokenTtlInMinutes`,
  `absoluteSessionLifetimeInMinutes`). The neighbour
  `confidential` / `isConfidentialClient` flags in the file are also
  predicate-style. So this boolean is the only verb-first identifier
  in a configuration object full of nouns. It reads as a method
  ("call this to enable …") rather than as a state ("this is the
  enabled state").
- **Category:** 13, 17 (verb-tense inconsistency; inconsistent action
  verbs)
- **Suggested:** Rename to `singleUseRefreshTokensEnabled` (predicate)
  or `rotateRefreshTokens` (behavioural noun matching the JSDoc's
  "refresh token rotation"). Avoid `useSingleUseRefreshTokens` — too
  close to a method name.
- **Rationale:** `enableX` configuration flags drift from state
  semantics. The matching JSDoc on line 195 already calls the feature
  "single-use refresh tokens (refresh token rotation)" — a
  predicate/state noun mirrors that vocabulary.

---

## Low severity (nits)

### 1. `accessTokenTtlInMinutes`, `refreshTokenTtlInMinutes`, `absoluteSessionLifetimeInMinutes` — unit suffix + vocabulary drift in one type — `model.ts:186, 192, 206`
- **Why:** Three TTL fields on `TokenAccessPolicy`. Two are named
  `…TtlInMinutes`; the third uses `…LifetimeInMinutes`. The "InMinutes"
  suffix is encoded into the field name three times in one type — a
  doc-able invariant that lives in the identifier. The `Ttl` vs
  `Lifetime` drift is the second issue: the JSDoc on line 201 calls
  the third field "Absolute OAuth session TTL in minutes", so even
  the doc inconsistently swaps "TTL" and "Lifetime" for the same
  concept.
- **Category:** 7, 17 (overly verbose; inconsistent vocabulary —
  TTL/Lifetime)
- **Suggested:** Either (a) adopt a `Temporal.Duration`-typed field
  and drop the unit suffix entirely (`accessTokenTtl`,
  `refreshTokenTtl`, `absoluteSessionLifetime`), or (b) standardise
  on one suffix and one root: `accessTokenTtlMinutes`,
  `refreshTokenTtlMinutes`, `sessionTtlMinutes`. The `Lifetime` /
  `Ttl` mismatch should be resolved either way.
- **Rationale:** Encoding units into field names dates the API to
  before `Temporal` shipped. The asymmetry between `Ttl` and
  `Lifetime` is gratuitous — the JSDoc itself uses both
  interchangeably for one concept.

### 2. `includeCreatorUsername` is a server-side join flag, cryptic without context — `model.ts:114`
- **Why:** `ListCustomOAuthAppIntegrationsRequest.includeCreatorUsername`
  is a boolean opt-in that does not appear on the sibling
  `ListPublishedOAuthAppIntegrationsRequest` (line 124). The JSDoc
  is empty. A caller writing both list calls in sequence cannot tell
  why one has the option and the other does not. The flag's
  semantics — "perform a server-side join to resolve the creator user
  ID to their username" — are not visible from the name.
- **Category:** 5 (cryptic — the flag's semantics are non-obvious
  without external context)
- **Suggested:** Keep the name (matches Go SDK convention) but
  document the flag inline: "When `true`, the server resolves
  `createdBy` to `creatorUsername` in each response row (extra
  server-side lookup)." Decide whether the same option belongs on
  the published-integration list endpoint, and add it for parity
  if so.
- **Rationale:** The default behaviour (omit username) is a
  performance optimisation; callers should know enabling this is a
  server-side join, and the asymmetry with the published-integration
  list should be deliberate or removed.

### 3. `Client` is a single generic export on a multi-resource package — `client.ts:69`
- **Why:** The package exports a single `Client` class whose
  responsibilities now span three resources (custom integrations,
  published integrations, published apps) and ten methods. A
  consumer doing `import { Client } from '@databricks/sdk-oauth/v1'`
  gets an unqualified symbol that must be aliased to coexist with any
  other package's `Client`. The post-consolidation surface is wider
  than it was pre-merge, which makes the generic name more of a
  navigation hazard than before.
- **Category:** 1 (vague / generic)
- **Suggested:** `OAuthClient` (still inside `…/v1`). Project-wide
  change — every generated package shares this pattern, so the fix
  belongs at the generator template level, not per-package.
- **Rationale:** Defer to the project-wide naming-audit summary
  recommendation. Flagged here for completeness, with the
  caveat that this is shared across all 93 packages.

---

## Observations (not flags)

### O1. `<Databricks>` and `<Account>` template tokens leak into JSDoc — `model.ts:73, 76, 195`, `client.ts:285, 345, 402`
- Six call sites in this package leave literal `<Databricks>` /
  `<Account>` angle-bracket tokens in their JSDoc — they were meant
  to be substituted with "Databricks" / "account" by the generator's
  template engine. They render as broken-HTML angle-bracket sequences
  in TypeScript hover popups and IDE doc views. Not a per-package
  naming issue, but the leak is visible at every IDE hover. Tracked
  at the project level.

### O2. `flattenQueryParams` exported but unused — `utils.ts:123`
- The helper is exported from `utils.ts` but the three list endpoints
  in this package (`listCustomOAuthAppIntegrations`,
  `listPublishedOAuthAppIntegrations`, `listPublishedOAuthApps`) all
  use flat scalar query parameters (`pageToken`, `pageSize`,
  `includeCreatorUsername`), so the helper is dead code in this
  build. Same pattern in many sibling packages — either drop the
  `export` here or lift the helper into `@databricks/sdk-core` so it
  is not duplicated 93 times.

---

## Domain glossary

- `accountId` — Databricks account UUID (top-level tenant), distinct
  from a workspace ID.
- `appId` — Slug into the Databricks published-app catalog
  (`power-bi`, `tableau-desktop`, …). Despite the `Id` suffix, this
  is a human-readable name, not an opaque server-issued ID.
- `clientId` — RFC 6749 client identifier (the OAuth `client_id`
  returned by the server). Opaque.
- `clientSecret` — RFC 6749 client secret. Returned only at creation
  time for confidential clients.
- `confidential` / `isConfidentialClient` — RFC 6749 §2.1 client
  type. `true` means the client has a secret and authenticates
  itself; `false` means it is a public client and relies on PKCE.
  Currently spelled two ways in this file (finding H3).
- `Custom` integration — Caller-defined OAuth client (caller-owned
  redirect URLs, scopes, secret).
- `createdBy` — Numeric Databricks user ID of the registration
  creator. Field is named like a verb (finding M2).
- `creatorUsername` — Username string of the registration creator.
  Server-side joined when `includeCreatorUsername` is set on the
  list request.
- `integrationId` — Opaque server-issued ID for an OAuth app
  integration row. Distinct from `clientId`.
- `OAuth` — IETF OAuth 2.0 (RFC 6749). Brand-name capitalisation
  (`OAuth`, not `Oauth`) is intentional per the project's RFC 6749
  platform-name exception.
- `Published` app — Databricks-blessed third-party application
  (catalog row).
- `Published` integration — Account-level registration of a
  published app (enables the app for the account).
- `scopes` — RFC 6749 scope strings the integration may request.
  Documented set: `all-apis`, `sql`, `offline_access`, `openid`,
  `profile`, `email`.
- `TokenAccessPolicy` — Per-integration token TTL and
  refresh-rotation policy.
- `userAuthorizedScopes` — Subset of `scopes` requiring explicit
  end-user consent. Misleading verb tense — this is *will-ask*,
  not *did-grant* (finding M1).

---

## Cross-package coupling notes

- The 2026-05-22 regeneration consolidated the prior
  `oauthcustomappintegration` and `oauthpublishedapp` packages into
  this single `@databricks/sdk-oauth` package. Three former
  cross-package inconsistencies are now intra-package issues:
  `confidential` vs `isConfidentialClient` (H3), `appId` slug-vs-ID
  agreement (H1), and the shape of the `scopes` documented value
  space across the published and custom surfaces. The consolidation
  is reflected in the import list at `index.ts:7-31`, which now
  re-exports 25 types from one model file.

---

## File coverage

| File | Lines read | Coverage |
| ---- | ---------- | -------- |
| `src/v1/index.ts` | 32 / 32 | 100% |
| `src/v1/transport.ts` | 75 / 75 | 100% |
| `src/v1/utils.ts` | 150 / 150 | 100% |
| `src/v1/model.ts` | 487 / 487 | 100% |
| `src/v1/client.ts` | 525 / 525 | 100% |

All types, fields, and methods reviewed. Out-of-scope per the audit
constraints: `OAuth*` brand-name spelling (RFC 6749 platform-name
exception), `*_UNSPECIFIED` enum sentinels, `*_Response` proto-nested
underscored identifiers, `marshal*` / `unmarshalSchema` Zod helpers,
empty wrapper interfaces, `*Iter` pagination duplicates, redundant
enum prefixes, JS-built-in acronym casing (`URLSearchParams`,
`JSON.parse`, `TextDecoder`), and wire-format strings preserved
verbatim in JSDoc.
