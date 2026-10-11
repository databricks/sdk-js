# Naming Audit: rfa

**Path:** `packages/uc/rfa/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog **R**equest **F**or **A**ccess — manage where access-request notifications are routed (the destinations: email addresses, Slack channels, Microsoft Teams webhooks, generic webhooks, or URLs) when end-users request access to a UC securable (catalog/schema/table/etc.). Also exposes a batched create endpoint that lets a caller fire one or more access requests on behalf of principals against a list of securables, returning the destinations the request will be sent to. URL prefix is `/api/3.0/rfa/...`.
**Total weird names flagged:** 7

## Summary
| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 6 |

## High severity

### 1. Package name `rfa` — `packages/uc/rfa/`, `package.json:2`, `client.ts:80,123,161`
- **Why weird:** Three-letter cryptic acronym used as the npm package name (`@databricks/sdk-uc-rfa`), the package directory, the import path (`packages/uc/rfa/src/v1/`), and the URL segment (`/api/3.0/rfa/...`). Nothing in the source files spells out what `rfa` stands for — no doc comment, no README description (`package.json` description is empty string), no module-level JSDoc in `index.ts`. From the model alone, the user has to reverse-engineer that `rfa` means "Request For Access" by reading the type names (`CreateAccessRequest`, `AccessRequestDestinations`). The Databricks Go SDK (`databricks/sdk-go`) does not yet contain this code path either — there's no upstream reference.
- **Category:** 5 (cryptic abbreviation), 1 (vague).
- **Suggested name:** `accessrequests` or `accessrequestdestinations`. The npm package would be `@databricks/sdk-uc-accessrequests`. The wire URL `/api/3.0/rfa/...` can stay locked while the SDK surface uses the spelled-out name.
- **Rationale:** TS SDK names are user-typed in import statements (`import {RfaClient} from '@databricks/sdk-uc-rfa/v1';`). A user reading that import line has no way to guess the package's purpose. Compare to neighbour packages — `abacpolicies`, `accountaccesscontrol`, `alerts`, `cleanrooms`, `gitcredentials` — all spell out the domain. `rfa` is the only opaque acronym among ~70 packages.

## Medium severity

### 2. Type name `AccessRequestDestinations` is plural — but represents ONE securable's destinations — `model.ts:71-90`
- **Why weird:** The type is plural (`Destinations`) but each instance describes the destinations *for one securable* (`securable?: Securable`, singular). The plural belongs only to the inner `destinations?: NotificationDestination[]` array. Compare: `AccessRequestDestination` (singular) would describe one route; `AccessRequestDestinations` (plural) implies multiple route configs. The current name is the latter but holds the former.
- **Category:** 9 (singular/plural mismatch).
- **Suggested name:** `AccessRequestRouting` or `AccessRequestDestinationConfig` (singular) — captures "the routing configuration for one securable".
- **Rationale:** The pluralization is for the inner array, not the outer concept. Today the type-name reader gets the wrong mental model.

### 3. `BatchCreateAccessRequestsRequest` / `BatchCreateAccessRequestsResponse` — `model.ts:92,102`
- **Why weird:** Verbose type names (32 / 33 chars). `Batch` + `Create` + `AccessRequests` + `Request`/`Response`. Also: `Batch` prefix is the *only* signal that the endpoint accepts an array — but the client method is just `batchCreateAccessRequests`, and the field inside is `requests?: CreateAccessRequest[]`. Three levels of "batchness".
- **Category:** 7 (overly verbose), 8 (redundant suffix `Request`).
- **Suggested name:** `CreateAccessRequestsRequest` (drop `Batch`; the plural already implies batching). Or even better: `CreateAccessRequestsInput` / `CreateAccessRequestsOutput`. Pair with method `createAccessRequests`.
- **Rationale:** `Batch` doubles as marketing copy ("look, batched!") rather than naming. TS plural-`s` already says "multiple".

### 4. Type name `SecurablePermissions` is plural but models ONE securable + its permissions — `model.ts:190-195`
- **Why weird:** `CreateAccessRequest` has `securablePermissions?: SecurablePermissions[]` (plural array, type `SecurablePermissions` itself plural). `SecurablePermissions` holds `securable: Securable` (singular) and `permissions: string[]` (plural). So `request.securablePermissions[0].securable` reads as "the singular securable inside the plural securable-permissions". The type name `SecurablePermissions` doesn't say "pairs of securable + permissions list".
- **Category:** 9 (singular/plural mismatch), 1 (vague — what does `SecurablePermissions` model?).
- **Suggested name:** `SecurablePermissionRequest` (singular type, describes one securable plus the permissions being requested on it).
- **Rationale:** The type-name pluralization is hiding what the type actually models (one securable + a permissions list).

### 5. `Principal` shape — bare `id` whose meaning depends on a sibling `principalType` — `model.ts:162-166`
- **Why weird:** Field `id` is documented as "<Databricks> user, group or service principal ID". Which of the three it is depends on the sibling `principalType` enum. Without `principalType`, the `id` is meaningless. Combined: `{ id: '123', principalType: 'USER_PRINCIPAL' }`. The shape couples two fields that the type system leaves independent.
- **Category:** 19 (underspecified ID), 1 (vague).
- **Suggested name:** Reshape `Principal` into a discriminated union keyed on the principal kind so the type system enforces "this ID belongs to this principal type", rather than two loosely-coupled optional fields.
- **Rationale:** Tagged unions express the constraint at the type level. The current shape is a Go-port idiom.

### 6. Method `batchCreateAccessRequests` on `RfaClient` — `client.ts:75`
- **Why weird:** Method name redundantly carries `batch` even though it's the only create method. There's no non-batched alternative. The `batch` prefix is descriptive of the request body shape (an array), not a distinct API mode.
- **Category:** 7 (overly verbose), 17 (action verb inconsistency — sibling methods are `getAccessRequestDestinations`/`updateAccessRequestDestinations` with no analogous prefix).
- **Suggested name:** `createAccessRequests` (the plural already conveys batch semantics).
- **Rationale:** The "batch" prefix is API-design vocabulary leaking into the SDK surface. If the only way to create is batched, the prefix carries zero information.

### 7. Three RfaClient methods, three different domain entity names — `client.ts:75,118,156`
- **Why weird:** `RfaClient.batchCreateAccessRequests` works on `requests`. `RfaClient.getAccessRequestDestinations` works on `destinations`. `RfaClient.updateAccessRequestDestinations` works on `destinations`. The first method creates *requests*; the other two manage *destinations*. The class has two distinct subdomains (request creation, destination routing) fused into one client surface with no separation.
- **Category:** 17 (action verb inconsistency across cohesion boundary), 12 (duplicate concepts — two separate resources blended).
- **Suggested name:** Split into two clients: `AccessRequestClient` (create) and `AccessRequestDestinationsClient` (get/update). Or rename `batchCreateAccessRequests` → `createRequests` (singular noun "request" in the URL `/api/3.0/rfa/requests`).
- **Rationale:** A class with three methods that cover two disjoint resources is hiding the resource boundary.
