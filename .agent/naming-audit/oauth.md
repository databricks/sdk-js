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
**Total weird names flagged:** 3

## Summary table

| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 0 |
| Low | 2 |
| Observation | 1 |
| **Total** | **3 (+ 1 observation)** |

The audit excludes the `OAuth*` brand-name spelling (RFC 6749 platform-name
exception), `*_UNSPECIFIED` proto sentinels, `*_Response` proto-nested
underscored identifiers, `marshal*` / `unmarshalSchema` Zod helper names,
empty wrapper types, `*Iter` pagination duplicates, redundant enum prefixes,
JS-built-in acronym casing (`URLSearchParams`, `JSON.parse`), and
wire-format strings preserved in JSDoc. The remaining findings cluster
around (1) the consolidated package surfacing intra-package
inconsistencies that used to be cross-package and (2) leftover
generator/template artefacts (stale `:method:` cross-refs, `<Databricks>`
template tokens, dead helper exports).

---

## High severity (must fix)

### 1. `confidential` vs `isConfidentialClient` — same flag spelled two ways in one file — `model.ts:12, 55, 164`
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

_None._

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

### 2. `Client` is a single generic export on a multi-resource package — `client.ts:69`
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

### O1. `flattenQueryParams` exported but unused — `utils.ts:123`
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
  Currently spelled two ways in this file (finding H1).
- `Custom` integration — Caller-defined OAuth client (caller-owned
  redirect URLs, scopes, secret).
- `createdBy` — Numeric Databricks user ID of the registration
  creator.
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
  end-user consent. Despite the past-tense name, this is the
  *configuration* of which scopes will require consent, not a
  record of past consent.

---

## Cross-package coupling notes

- The 2026-05-22 regeneration consolidated the prior
  `oauthcustomappintegration` and `oauthpublishedapp` packages into
  this single `@databricks/sdk-oauth` package. Former
  cross-package inconsistencies are now intra-package issues:
  `confidential` vs `isConfidentialClient` (H1) and the shape of the
  `scopes` documented value space across the published and custom
  surfaces. The consolidation is reflected in the import list at
  `index.ts:7-31`, which now re-exports 25 types from one model file.

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
