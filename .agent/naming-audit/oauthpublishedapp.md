# Naming Audit: oauthpublishedapp

**Path:** `packages/oauthpublishedapp/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level read-only catalog of Databricks-blessed third-party OAuth applications (e.g. Power BI, Tableau Desktop) that can be enabled for an account. The package exposes a single endpoint that lists the published-app catalog rows. Each `PublishedOAuthApp` is a *catalog entry* (template) — not an *integration row* (which is the realised binding tracked by the sibling `oauthcustomappintegration` package). The package therefore plays "catalog index" to `oauthcustomappintegration`'s "registration manager". Domain underpinning is RFC 6749 (OAuth 2.0) client-type "published" applications, augmented by a Databricks-owned catalog of vetted third-party clients.
**Total weird names flagged:** 12

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 6 |
| Low | 3 |
| Observation | 1 |

## High severity

### 1. Package name `oauthpublishedapp` is singular but the package only exposes a *list* endpoint — `package.json:2`, `client.ts:62`
- **Why weird:** The package is `@databricks/sdk-oauthpublishedapp` (singular `app`). It exposes exactly one user-facing method, `listPublishedOAuthApps`, which returns a paginated *collection* of catalog rows. There is no `get`/`create`/`update`/`delete` — the package only ever operates over the plural set. The singular package name reads as "a thing that represents one published app", but the API contract is "the catalog of all published apps". Compare to the sibling `oauthcustomappintegration` (also incorrectly singular, audit finding #1 there). Both packages share the singular/plural mismatch.
- **Category:** 9 (singular/plural mismatch — package and class names suggest one entity, surface is purely collection-oriented)
- **Suggested name:** `@databricks/sdk-oauthpublishedapps` (plural), or `@databricks/sdk-oauthappcatalog` (re-cast as a catalog concept).
- **Rationale:** Reading `import { Client } from '@databricks/sdk-oauthpublishedapp/v1'` suggests there is a per-app client. A reader will land on the file expecting `getPublishedOAuthApp(id)`, `createPublishedOAuthApp(…)`, etc., and find only `listPublishedOAuthApps`. Pluralizing the package would set correct expectations. The Go reference at `databricks/api/oauth2/oauthpublishedapp` carries the same wart; a 1:1 port should still resolve it for TS since Go's package-vs-method namespacing rules don't apply.

### 2. Every domain type re-states `PublishedOAuthApp` in full — `model.ts:5, 15, 22`
- **Why weird:** Inside a package named `oauthpublishedapp`, every type still spells "PublishedOAuthApp" or "PublishedOAuthApps" inside its name: `ListPublishedOAuthApps`, `PublishedOAuthApp`. The package import already declares the namespace; the type names re-declare it. The same pattern appears (more egregiously) in `oauthcustomappintegration` — finding #2 there.
  ```ts
  import {
    ListPublishedOAuthApps,
    PublishedOAuthApp,
  } from '@databricks/sdk-oauthpublishedapp/v1';
  ```
  Every type repeats 16+ characters of "PublishedOAuthApp" that are already in the import path.
- **Category:** 7, 8, 20 (overly verbose; redundant suffix; type-suffix tautology — every type ends with the package domain noun)
- **Suggested name:** Drop the `PublishedOAuthApps?` qualifier from every type. With a namespace import the call site reads `published.List`, `published.App`. With named imports, alias if needed: `import { App as PublishedOAuthApp }`.
- **Rationale:** TypeScript module imports already qualify the namespace. Repeating it in type names produces walls of identifiers where the eye has to skip the redundant prefix to find the discriminator. Pattern is a 1:1 port from Go (`oauthpublishedapp.PublishedOAuthApp` is necessary in Go because Go has no struct-level method namespacing); TS does not share that constraint.

### 3. `appId` on `PublishedOAuthApp` is a slug, not an opaque ID — `model.ts:24`
- **Why weird:** `PublishedOAuthApp.appId` is documented as "Unique ID of the published OAuth app". The doc gives no examples here, but the sibling `oauthcustomappintegration` package's `CreatePublishedOAuthAppIntegration.appId` (which is the same value used to enable a published app in that account) is documented as `For example power-bi, tableau-deskop` (sic — typo carried in original). The appId is therefore a human-readable slug like `power-bi`, not an opaque UUID. Calling it `appId` and typing it as `string` collides with the convention that `xId` is an opaque opaque-ID (cf. `accountId`, `integrationId`, `clientId`, `principalId`). Same finding as `oauthcustomappintegration` #5; the value flows between the two packages and should be named consistently across both.
- **Category:** 6, 19 (misleading; underspecified ID — what kind of ID?)
- **Suggested name:** `appSlug` or `publishedAppKey` with the type narrowed to a literal union: `'power-bi' | 'tableau-desktop' | 'looker' | ...`. At minimum, document the format inline ("dash-separated lowercase slug from the Databricks published-app catalog") and cross-reference `CreatePublishedOAuthAppIntegration.appId` in the sibling package.
- **Rationale:** Every other `xId` in this codebase (`accountId`, `clientId`) is an opaque identifier. Mixing in a slug under the same suffix is a teaching trap. Two packages disagree by silence on what `appId` is.

## Medium severity

### 4. `clientId` field lacks the convention-matching closing period — `model.ts:25`
- **Why weird:** Doc comment reads `Client ID of the published OAuth app. It is the client_id in the OAuth flow` — missing trailing period (`flow` ends the sentence). Every other doc comment in the file ends with a period. Also, the wire-form `client_id` is hardcoded into the JSDoc text, which leaks generator-side terminology into TS docs that should describe the TS field. Repository CLAUDE.md rule: "Every comment must be a proper sentence ending with a period."
- **Category:** Not strictly a name finding, but a generator-side text issue — included because it sits on a name field and is visible at every hover.
- **Suggested name:** Doc text only; field name `clientId` is correct. Fix to: `Client ID of the published OAuth app. Matches the OAuth 2.0 \`client_id\` parameter (RFC 6749 §2.2).`
- **Rationale:** Comment-style rule on the project. The reference to RFC 6749 §2.2 gives the term a spec anchor instead of leaving "client_id in the OAuth flow" as a vague pointer.

### 5. `isConfidentialClient` named inconsistently across packages — `model.ts:31-32`
- **Why weird:** The sibling `oauthcustomappintegration` exposes the same OAuth concept under the field name `confidential` (no `is…Client` prefix). The two packages model the same RFC 6749 §2.1 client-type flag with different identifiers, so a consumer juggling both has to remember that `customIntegration.confidential` and `publishedApp.isConfidentialClient` are the same flag. Audit finding #12 in `oauthcustomappintegration` recommends renaming that side to `isConfidentialClient` — so the *name* here is the right one; the sibling is the side to align.
- **Category:** 12 (duplicate concept across packages, inconsistent naming)
- **Suggested name:** Keep `isConfidentialClient` here. Cross-package fix lives in the sibling audit (#12 there).
- **Rationale:** The flag's value space and meaning are identical across the two packages; the identifier should be too. Resolve at the sibling, not here.

### 6. `redirectUrls: string[]` field stutter with `URI`/`URL` spec language — `model.ts:33-34`
- **Why weird:** OAuth 2.0 spec (RFC 6749 §3.1.2) calls these *redirection URIs*. The TS field uses `redirectUrls` (lowercase `rl`); the JSDoc reads "Redirect URLs of the published OAuth app." matching the field name. The sibling `oauthcustomappintegration` finding #13 documents that the package mixes URI / URL in JSDoc and field names; here the package uses `URLs` consistently within itself but contradicts spec language. The casing `Urls` (lowercase `rl`) follows Google TS style guide § Identifiers (acronyms ≥3 chars are PascalCase, but `URL` historically is exempted in many guides — TypeScript ecosystem standard is `Url`).
- **Category:** 3 (acronym casing — `URL` lowercased as `Url` while `OAuth` keeps `Auth` mid-token uppercase, inconsistent acronym treatment within the same identifier set)
- **Suggested name:** Keep `redirectUrls` (matches Google TS style guide https://google.github.io/styleguide/tsguide.html#identifiers), but cross-reference RFC 6749 §3.1.2 in the JSDoc so the spec term is visible: "Redirect URLs of the published OAuth app (RFC 6749 §3.1.2 \"redirection URIs\")."
- **Rationale:** Consistent with sibling package finding #13. The doc-term mismatch (URI in spec, URL in code) is the real issue; the casing is correct per Google TS.

### 7. `scopes: string[]` carries no enum/union — `model.ts:35-36`
- **Why weird:** Sibling `oauthcustomappintegration` documents the supported scope set inline: `Supported scopes: all-apis, sql, offline_access, openid, profile, email`. Here the same field is typed `string[]` with no JSDoc enumeration: just "Required scopes for the published OAuth app." Both packages share the same scope vocabulary (it is the Databricks OAuth scope set), and one documents it, the other does not.
- **Category:** 1, 12 (vague — string[] could be anything; duplicate concept across packages, inconsistent treatment)
- **Suggested name:** Keep `scopes`, but type as `Array<'all-apis' | 'sql' | 'offline_access' | 'openid' | 'profile' | 'email'>` to match the sibling package's documented vocabulary. At minimum, JSDoc the supported scopes.
- **Rationale:** Two packages model the same wire field. The custom package documents the value space; the published package leaves it open. A consumer reading `app.scopes` has no in-IDE way to learn the valid values.

### 8. `pageSize: number` lacks bounds and unit context — `model.ts:11`
- **Why weird:** Doc says "The max number of OAuth published apps to return in one page." but does not document the maximum-permitted value, default, or whether `0` means "unset" or "zero results". `pageSize` is the most common cross-API pagination footgun; some Databricks APIs reject `pageSize > 1000`, others treat `0` as "use default", others as "return zero". A consumer doing `req.pageSize = 0` gets undefined behaviour. The name `pageSize` itself is fine and consistent with Databricks API conventions (and Google AIP-158 https://google.aip.dev/158).
- **Category:** 1 (vague — `number` with no bounds reads as "any int", but isn't)
- **Suggested name:** Name is fine; doc should be "The maximum number of published OAuth apps to return in one page. Defaults to server-side default (typically 100). Maximum: 1000."
- **Rationale:** Same field exists in many sibling packages; document once at the source of truth (the generator's pagination template).

### 9. `pageToken: string` reuses the previous-response `nextPageToken` — implicit cross-field contract — `model.ts:8-9`, `model.ts:18-19`
- **Why weird:** Request `pageToken` and response `nextPageToken` are two halves of one pagination contract. The names use different roots (`page…` vs `nextPage…`), so the connection is invisible. A new reader has to read both shapes and the iterator to understand `req.pageToken = resp.nextPageToken`. This is the Google AIP-158 convention (https://google.aip.dev/158) and shared by every paginated Databricks API, but worth flagging at project level since the naming asymmetry repeats everywhere.
- **Category:** 17 (inconsistent action verbs — `pageToken` is a noun, `nextPageToken` is a noun; the asymmetry is in the prefix `next…`)
- **Suggested name:** Keep names (they match AIP-158); document the relationship in JSDoc: "Pass `nextPageToken` from the previous response as `pageToken` to fetch the next page."
- **Rationale:** Convention-bound, but the doc is silent — every list endpoint in the SDK silently shares this contract.

## Low severity

### 10. `OAuth` casing is consistent — `model.ts:throughout`
- **Why weird:** Worth flagging for completeness: this package uses `OAuth` consistently (capital O, capital A, lowercase uth). No `OAUTH`, `Oauth`, or `oAuth` variants. Matches Google TS style guide guidance and matches RFC 6749. Matches sibling `oauthcustomappintegration`. No action.
- **Category:** 3 (acronym casing — flagged compliant)
- **Suggested name:** None — confirm the project-wide policy is `OAuth`.
- **Rationale:** Documenting compliance.

### 11. `Client` class — generic single export, common to all generated packages — `client.ts:32`
- **Why weird:** Same pattern as every other package in this SDK. `import { Client } from '@databricks/sdk-oauthpublishedapp/v1'` produces an unqualified `Client` symbol. Consumers using multiple packages must alias: `import { Client as OAuthPublishedAppClient }`. Project-wide pattern, not specific to this package.
- **Category:** 1 (vague/generic)
- **Suggested name:** `OAuthPublishedAppClient` (still inside `…/v1`). Project-wide change.
- **Rationale:** Defer to the project-wide naming-audit summary. Same as sibling finding #19.

### 12. `apps?: PublishedOAuthApp[]` field on response — collection field name matches type — `model.ts:17`
- **Why weird:** The response collection field. Unlike the sibling package's `apps` field finding (`oauthcustomappintegration` #4) where the field carried *integrations* and the name was misleading, here the field genuinely is published apps. The name is correct *but* it duplicates the type name (`apps: PublishedOAuthApp[]` — "apps of type App"). Reads naturally enough, but no other indication of plurality at the field name (only the array type adds plurality). Acceptable.
- **Category:** 15 (generic field — `apps` is the maximally-generic plural of `app`) — flagged for completeness
- **Suggested name:** Keep `apps`. Or rename `publishedApps` to make plural+domain explicit. No strong action.
- **Rationale:** Within the response type, the field name is unambiguous. Cross-package consistency with `oauthcustomappintegration` is broken (that package's `apps` field is misleading), but renaming this one would not fix that — the sibling rename is the right place.

## Observations

### O1. JSDoc literal templating: this package has `<Databricks>` token leak — `client.ts:61`
- Sibling `oauthcustomappintegration` has six JSDoc strings containing literal `<Databricks>` / `<Account>` tokens (their finding O1). This package has one such leak — the JSDoc on `listPublishedOAuthApps` reads "Get all the available published OAuth apps in `<Databricks>`". Same generator bug.

## Domain glossary
- `accountId` — Databricks account UUID (top-level tenant). Distinct from a workspace ID.
- `appId` — Slug key into the Databricks published-app catalog (e.g. `power-bi`, `tableau-desktop`). Despite the `Id` suffix, this is a human-readable name. Same value space as `oauthcustomappintegration.CreatePublishedOAuthAppIntegration.appId`.
- `clientId` — RFC 6749 client identifier (OAuth `client_id`). Stable per published app.
- `OAuth` — IETF OAuth 2.0 (RFC 6749). Always cased `OAuth` in this package.
- `Published` app — Databricks-blessed third-party application (Power BI, Tableau Desktop, …) available to be enabled in an account. Distinct from a `Custom` integration (caller-defined OAuth client, lives in `oauthcustomappintegration`).
- `redirectUrls` — RFC 6749 §3.1.2 "redirection URIs" registered for the published app.
- `scopes` — RFC 6749 scope strings the published app may request (`all-apis`, `sql`, `offline_access`, `openid`, `profile`, `email`).

## Cross-package coupling notes
- `appId` value space is shared with `oauthcustomappintegration.CreatePublishedOAuthAppIntegration.appId`. Renaming on one side must rename on the other.
- `isConfidentialClient` here ↔ `confidential` on the sibling — same underlying concept, inconsistent boolean naming.
- `scopes: string[]` here ↔ `scopes: string[]` on the sibling — same vocabulary, only the sibling documents the literal value set.
- Both packages share the `OAuth` casing convention.
- Suggested cross-package action: lift `PublishedOAuthApp` (catalog row) into a shared module imported by both packages, so `oauthcustomappintegration` can reference the canonical row when an account enables a published app.

## File coverage
- `src/v1/model.ts` (69 lines): read fully — 3 type exports, 2 schema exports.
- `src/v1/client.ts` (114 lines): read fully — 1 class, 1 async method, 1 async generator.
- `src/v1/utils.ts` (150 lines): read fully — generic across packages, identical to sibling's `utils.ts`.
- `src/v1/index.ts` (11 lines): read fully — re-exports `Client` and three types.
- `package.json` (38 lines): read for context.
