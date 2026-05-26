# Naming Audit: rfa

**Path:** `packages/rfa/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog **R**equest **F**or **A**ccess — manage where access-request notifications are routed (the destinations: email addresses, Slack channels, Microsoft Teams webhooks, generic webhooks, or URLs) when end-users request access to a UC securable (catalog/schema/table/etc.). Also exposes a batched create endpoint that lets a caller fire one or more access requests on behalf of principals against a list of securables, returning the destinations the request will be sent to. URL prefix is `/api/3.0/rfa/...`.
**Total weird names flagged:** 16

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 9 |
| Low | 1 |
| Observation | 2 |

## High severity

### 1. Package name `rfa` — `packages/rfa/`, `.package.json:2`, `client.ts:78,117,151`
- **Why weird:** Three-letter cryptic acronym used as the npm package name (`@databricks/sdk-rfa`), the package directory, the import path (`packages/rfa/src/v1/`), and the URL segment (`/api/3.0/rfa/...`). Nothing in the source files spells out what `rfa` stands for — no doc comment, no README description (`package.json` description is empty string), no module-level JSDoc in `index.ts`. From the model alone, the user has to reverse-engineer that `rfa` means "Request For Access" by reading the type names (`CreateAccessRequest`, `AccessRequestDestinations`). The Databricks Go SDK (`databricks/sdk-go`) does not yet contain this code path either — there's no upstream reference.
- **Category:** 5 (cryptic abbreviation), 1 (vague).
- **Suggested name:** `accessrequests` or `accessrequestdestinations`. The npm package would be `@databricks/sdk-accessrequests`. The wire URL `/api/3.0/rfa/...` can stay locked while the SDK surface uses the spelled-out name.
- **Rationale:** TS SDK names are user-typed in import statements (`import {Client} from '@databricks/sdk-rfa/v1';`). A user reading that import line has no way to guess the package's purpose. Compare to neighbour packages — `abacpolicies`, `accountaccesscontrol`, `alerts`, `cleanrooms`, `gitcredentials` — all spell out the domain. `rfa` is the only opaque acronym among ~70 packages.

### 2. `DestinationType.URL` — `model.ts:13`
- **Why weird:** `URL` collides with the JavaScript built-in global `URL` (the WHATWG URL class). The enum member is therefore syntactically `DestinationType.URL` which is fine, but importing/destructuring is error-prone (`const {URL} = DestinationType` would shadow the global). Worse, the value `'URL'` is a misleading category — `DestinationType.URL` is documented as a webhook delivery to an arbitrary URL, but `DestinationType.GENERIC_WEBHOOK` is *also* a delivery to a URL. The semantic difference between `URL` and `GENERIC_WEBHOOK` is invisible from the names.
- **Category:** 10 (reserved-word/global collision), 6 (misleading — two members both denote webhook-URL deliveries).
- **Suggested name:** Rename `URL` to `URL_NOTIFICATION` or `PLAIN_URL`, or rename `GENERIC_WEBHOOK` to clarify what makes it "generic" relative to `URL`. Document the wire-level difference between the two.
- **Rationale:** Two enum members for "send to a URL" is a discoverability bug. Future callers will guess one and silently get the wrong webhook semantics.

### 3. `AccessRequestDestinations.securableType` and `fullName` duplicate `securable.type` and `securable.fullName` — `model.ts:54-73`
- **Why weird:** `AccessRequestDestinations` has both:
  - `securable?: Securable` (which has `type` and `fullName`), and
  - top-level `securableType?: string` and `fullName?: string`.
  The inline JSDoc says "Redundant with the type in the securable object, but necessary for Terraform integration" and "Redundant with the name in the securable object, but necessary for Terraform integration". Three problems:
  1. Two fields hold the same data — easy to set inconsistently (`securable.type === 'CATALOG'` while `securableType === 'TABLE'`).
  2. The redundant `securableType` is typed `string` while `securable.type` is typed `SecurableType` — *different types* for the same data.
  3. The reason ("Terraform integration") is implementation detail leaking onto the public SDK surface for every non-Terraform caller.
- **Category:** 12 (duplicate concepts), 6 (misleading — which one is authoritative?), 16 (type contradiction: `string` vs enum `SecurableType`).
- **Suggested name:** Drop `securableType` and `fullName` from `AccessRequestDestinations` for non-Terraform callers; expose them under a `terraformShim` namespace if needed, or model with `Pick`/conditional types. Wire stays unchanged.
- **Rationale:** Two-field duplication invites bugs (a caller might set one and not the other). The "necessary for Terraform integration" rationale is exactly the kind of generator artefact that should not surface here.

### 4. `GetAccessRequestDestinationsRequest.securableType` typed as `string` — `model.ts:121-126`
- **Why weird:** The request type for `getAccessRequestDestinations` has `securableType?: string`, but the response type `AccessRequestDestinations` has `securable?: { type?: SecurableType }` — a typed enum. So the request is untyped string, while the response is enum. A caller writing `req.securableType = 'catalogue'` (typo or wrong case) gets no compile-time error.
- **Category:** 16 (field type contradicts domain — should be `SecurableType`), 6 (misleading — looks like free text but server demands an enum value).
- **Suggested name:** Keep name, change type to `SecurableType`.
- **Rationale:** Same data model, two field types. Type narrowing is the whole point of TS — losing it on the request side is a regression.

## Medium severity

### 5. Type name `AccessRequestDestinations` is plural — but represents ONE securable's destinations — `model.ts:54-73`
- **Why weird:** The type is plural (`Destinations`) but each instance describes the destinations *for one securable* (`securable?: Securable`, singular). The plural belongs only to the inner `destinations?: NotificationDestination[]` array. Compare: `AccessRequestDestination` (singular) would describe one route; `AccessRequestDestinations` (plural) implies multiple route configs. The current name is the latter but holds the former.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `AccessRequestRouting` or `AccessRequestDestinationConfig` (singular) — captures "the routing configuration for one securable".
- **Rationale:** The pluralization is for the inner array, not the outer concept. Today the type-name reader gets the wrong mental model.

### 6. `BatchCreateAccessRequestsRequest` / `BatchCreateAccessRequestsResponse` — `model.ts:75,85`
- **Why weird:** Verbose type names (32 / 33 chars). `Batch` + `Create` + `AccessRequests` + `Request`/`Response`. Also: `Batch` prefix is the *only* signal that the endpoint accepts an array — but the client method is just `batchCreateAccessRequests`, and the field inside is `requests?: CreateAccessRequest[]`. Three levels of "batchness".
- **Category:** 7 (overly verbose), 8 (redundant suffix `Request`).
- **Suggested name:** `CreateAccessRequestsRequest` (drop `Batch`; the plural already implies batching). Or even better: `CreateAccessRequestsInput` / `CreateAccessRequestsOutput`. Pair with method `createAccessRequests`.
- **Rationale:** `Batch` doubles as marketing copy ("look, batched!") rather than naming. TS plural-`s` already says "multiple".

### 7. `CreateAccessRequest.securablePermissions` is array but bare `securable` siblings are singular — `model.ts:111`
- **Why weird:** `CreateAccessRequest` has `securablePermissions?: SecurablePermissions[]` (plural array, type `SecurablePermissions` itself plural). `SecurablePermissions` holds `securable: Securable` (singular) and `permissions: string[]` (plural). So `request.securablePermissions[0].securable` reads as "the singular securable inside the plural securable-permissions". The type name `SecurablePermissions` doesn't say "pairs of securable + permissions list".
- **Category:** 9 (singular/plural mismatch), 1 (vague — what does `SecurablePermissions` model?).
- **Suggested name:** `SecurablePermissionRequest` (singular type, describes one securable plus the permissions being requested on it). Field becomes `securablePermissionRequests?: SecurablePermissionRequest[]` — long but readable.
- **Rationale:** The type-name pluralization is hiding what the type actually models (one securable + a permissions list).

### 8. `NotificationDestination.specialDestination` overloads with `destinationType` — `model.ts:136-142`
- **Why weird:** A single `NotificationDestination` has both `destinationType?: DestinationType` and `specialDestination?: SpecialDestination`. The doc says `specialDestination`'s `destination_type` is "always EMAIL". So we have two enums that *cannot both be expressive at once* — if `specialDestination` is set, `destinationType` is constrained to `EMAIL`. The type system doesn't enforce this.
- **Category:** 12 (duplicate concept — two enums encode overlapping info), 6 (misleading — looks like independent fields).
- **Suggested name:** Either (a) collapse: extend `DestinationType` with new members and drop `SpecialDestination`; or (b) model as a discriminated union: `{ kind: 'normal'; destinationType, destinationId } | { kind: 'special'; specialDestination }`.
- **Rationale:** Two parallel enums for a constrained relationship is exactly the kind of latent-bug field name pair that a strict type system can prevent.

### 9. `Principal.id` is bare `id` — but holds either user, group, or service principal ID — `model.ts:145-149`
- **Why weird:** Field `id` is documented as "<Databricks> user, group or service principal ID". Which of the three it is depends on the sibling `principalType` enum. Without `principalType`, the `id` is meaningless. Combined: `{ id: '123', principalType: 'USER_PRINCIPAL' }`. The shape is fine, but the bare `id` doesn't communicate "the meaning depends on `principalType`".
- **Category:** 19 (underspecified ID), 1 (vague).
- **Suggested name:** Keep `id` paired with `principalType`, OR (more aggressive) make the type a discriminated union: `{ kind: 'user'; userId: string } | { kind: 'group'; groupId: string } | { kind: 'service'; servicePrincipalId: string }`.
- **Rationale:** Tagged unions express the constraint at the type level. The current shape is a Go-port idiom.

### 10. `SecurableType.STAGING_TABLE` and inline TODO — `model.ts:41-42`
- **Why weird:** Enum value pinned by inline TODO: `/** TODO: [UC-2980] Staging tables aren't full-fleged securables yet. */`. The TODO leaks an internal JIRA ticket (`UC-2980`) and the typo "full-fleged" into the public SDK surface. The presence of the value tells callers it works; the comment tells them it doesn't.
- **Category:** 18 (questionable enum value).
- **Suggested name:** Either hide until promotion (`@experimental`), or remove the inline TODO and document the constraint in the doc-comment proper.
- **Rationale:** Public SDK enums shouldn't carry internal JIRA references. Same pattern as `connections#29` and `dataclassification`.

### 11. `SecurablePermissions.permissions: string[]` — `model.ts:173-178`
- **Why weird:** `permissions` is `string[]` rather than an enum. Doc says "List of requested Unity Catalog permissions" — UC permissions are a known closed set (`SELECT`, `MODIFY`, `USAGE`, `READ_VOLUME`, etc.), so this should be a typed enum or branded string. Bare `string[]` loses any compile-time guard against typos.
- **Category:** 16 (field type contradicts domain — should be enum or branded string).
- **Suggested name:** Keep name; type as `UnityCatalogPermission[]` (new enum). Or document the closed set inline.
- **Rationale:** Same problem as #4. The wire is string, but TS could narrow it.

### 12. Method `batchCreateAccessRequests` on `Client` — `client.ts:74`
- **Why weird:** Method name redundantly carries `batch` even though it's the only create method. There's no non-batched alternative. The `batch` prefix is descriptive of the request body shape (an array), not a distinct API mode.
- **Category:** 7 (overly verbose), 17 (action verb inconsistency — sibling methods are `getAccessRequestDestinations`/`updateAccessRequestDestinations` with no analogous prefix).
- **Suggested name:** `createAccessRequests` (the plural already conveys batch semantics).
- **Rationale:** The "batch" prefix is API-design vocabulary leaking into the SDK surface. If the only way to create is batched, the prefix carries zero information.

### 13. Three Client methods, three different domain entity names — `client.ts:74,113,147`
- **Why weird:** `Client.batchCreateAccessRequests` works on `requests`. `Client.getAccessRequestDestinations` works on `destinations`. `Client.updateAccessRequestDestinations` works on `destinations`. The first method creates *requests*; the other two manage *destinations*. The class has two distinct subdomains (request creation, destination routing) fused into one client surface with no separation.
- **Category:** 17 (action verb inconsistency across cohesion boundary), 12 (duplicate concepts — two separate resources blended).
- **Suggested name:** Split into two clients: `AccessRequestClient` (create) and `AccessRequestDestinationsClient` (get/update). Or rename `batchCreateAccessRequests` → `createRequests` (singular noun "request" in the URL `/api/3.0/rfa/requests`).
- **Rationale:** A class with three methods that cover two disjoint resources is hiding the resource boundary.

## Low severity

### 14. `Client` class — `client.ts:40`
- **Why weird:** Top-level class literally named `Client`. Re-exported through `index.ts` as just `Client`. Two RFA packages co-existing in user code would clash on import (`import {Client} from '@databricks/sdk-rfa/v1'` vs `import {Client} from '@databricks/sdk-accounts/v1'`).
- **Category:** 1 (vague).
- **Suggested name:** `RfaClient` or `AccessRequestClient` (better — see #1).
- **Rationale:** Same finding as `dataclassification`. Recurs across all generated packages.

## Observations

### 15. Comment-tag inconsistency — `client.ts:78,117,151` vs URL
The URL constant `/api/3.0/rfa/...` (lower-case "rfa") is the only place the package name appears outside of imports — the entire SDK surface otherwise uses spelled-out names. Suggests the API itself owns the `rfa` shortname and the SDK is mechanically reflecting it. Worth confirming with the API team whether the URL prefix is intended to stay `/rfa/` or migrate to `/access-requests/`.
- **Category:** Observation.

### 16. Action-verb conventions on `Client`
`batchCreateAccessRequests`, `getAccessRequestDestinations`, `updateAccessRequestDestinations` — three different verbs across two resources. Verbs themselves match REST convention (`create`/`get`/`update`); the naming inconsistency is that the verb's target switches mid-class (see #13).
- **Category:** Observation.

## Domain glossary
- **`rfa`** — **R**equest **F**or **A**ccess. The Databricks Unity Catalog API for managing access-request notifications to UC securables. There are two distinct concerns:
  1. **Access Requests** (`POST /api/3.0/rfa/requests`) — a *user* (or principal on whose behalf) is requesting permissions (`SELECT`, `MODIFY`, etc.) on a list of Unity Catalog securables (catalogs, schemas, tables, etc.). The response tells the caller *where* the request was routed (which destinations).
  2. **Access Request Destinations** (`GET`/`PATCH /api/3.0/rfa/destinations/...`) — administrative configuration of *which* destinations (email addresses, Slack channels, MS Teams webhooks, generic webhooks, URLs) receive notifications when end-users file an access request against a given securable.
- **`uc`** — Unity Catalog. Referenced indirectly in `CreateAccessRequest` doc comments ("requested UC privileges"). Not in field names.
- **`d2d`** — Delta-to-Delta (Delta Sharing peer-to-peer). Appears in `Securable.providerShare` doc comment ("D2D Delta Sharing"). Not expanded inline.
- **`UC-2980`** — internal JIRA ticket referenced in `SecurableType.STAGING_TABLE` TODO comment. Should not appear on public SDK surface.
- **`Securable`** — Unity Catalog term-of-art for any object that can be granted permissions: catalog, schema, table, view, volume, function, model, connection, credential, external location, share, recipient, clean-room, metastore, pipeline, external-metadata, staging-table. The full taxonomy lives in `SecurableType` (17 values incl. sentinel).
- **`Principal`** — Unity Catalog/IAM term for "an entity that can hold permissions": a user, a group, or a service principal. The `PrincipalType` enum disambiguates which kind. Used here as the "on behalf of" actor in `CreateAccessRequest`.
- **`SpecialDestination`** — five enum members denoting "the owner of the metastore/catalog/external-location/connection/credential" as an implicit email destination. These cannot be assigned; they're a default fallback.
- **`FieldMask`** — Google protobuf convention (re-used in Databricks API) for sparse-field updates in PATCH semantics. `accessRequestDestinationsFieldMask(...)` builds the wire-format paths.
- Inferred but not in source: **`Terraform integration`** — appears in `AccessRequestDestinations.securableType` doc, suggests the redundant string fields exist because the Terraform provider can't read nested struct field types (see finding #3).

## File coverage
- `src/v1/model.ts` (385 lines): read fully.
- `src/v1/client.ts` (187 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (24 lines): read fully.
