# Naming Audit: workspacebindings

**Path:** `packages/workspacebindings/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog workspace bindings — controls which Databricks workspaces can access a given UC securable (catalog, storage credential, credential, external location) and at what access level (`READ_WRITE` or `READ_ONLY`). Exposes a legacy catalog-only API (`/workspace-bindings/catalogs/{name}`) and a generic securable-aware API (`/bindings/{type}/{full_name}`).
**Total weird names flagged:** 26

## Summary
| Severity | Count |
| --- | --- |
| High | 4 |
| Medium | 17 |
| Low | 2 |
| Observation | 3 |

The package contains 9 generated types (1 enum + 8 message/response shapes) and 4 client methods (plus 1 paginated iterator). The pervasive issues are (1) **stringly-typed `securableType`** that should be a closed enum; (2) **dual catalog-specific and generic-securable APIs** that overlap functionally — `getCatalogWorkspaceBindings` is a deprecated specialisation of `getWorkspaceBindings(securableType: 'catalog', ...)` but both ship in v1 with different request/response shapes; and (3) **conceptual neighbour confusion** with the separate `workspaceassignment` package, which assigns *principals* to workspaces while this package binds *securables* to workspaces — same noun "workspace", opposite direction, and the verbs "bind"/"assign" are mixed inside a single request type (`UpdateCatalogWorkspaceBindingsRequest.assignWorkspaces`).

---

## High severity

### 1. `securableType: string` (field, multiple) — `src/v1/model.ts:25,68`
- **Why weird:** Free-form `string` for what is a closed set of values. The doc-comment explicitly lists them: "(catalog, storage_credential, credential, or external_location)" — meaning the API author *knows* the set is closed but chose not to type it. A typo like `"caatalog"` will silently 4xx at the server. Also, the path is constructed via `${req.securableType ?? ''}` (`client.ts:115`, `client.ts:207`) which means an undefined value will produce a URL like `/api/2.1/unity-catalog/bindings//...` — a routing-incidental 404.
- **Category:** 19 (underspecified ID/discriminator), 1 (vague), 16 (field contradicts type domain).
- **Suggested name:** Define a `SecurableType` enum (`CATALOG`, `STORAGE_CREDENTIAL`, `CREDENTIAL`, `EXTERNAL_LOCATION`) and type both fields accordingly.
- **Rationale:** Type-safety is the entire point of TypeScript. Other UC packages in the SDK also use bare `string` for securable types — same fix should apply across all of them.

### 2. `securableFullName` vs `catalogName` inconsistency — `src/v1/model.ts:14,53` vs `27,69`
- **Why weird:** The same conceptual value (the fully-qualified name of the securable being bound) is named two different ways depending on which request type you're looking at. `Get/UpdateCatalogWorkspaceBindingsRequest` use `catalogName` (because the legacy endpoint is catalog-specific). `Get/UpdateWorkspaceBindingsRequest` use `securableFullName` (because the generic endpoint accepts any securable). For a catalog binding, both names refer to the same string. Users porting from one variant to the other must change the field name.
- **Category:** 17 (inconsistent naming), 15 (one is a special case of the other).
- **Suggested name:** Use `fullName` everywhere (or `name`), since `securableType` already provides the discriminator. Drop the special-case `catalogName` field once the legacy API is gone.
- **Rationale:** Two field names for one logical value is a documentation and onboarding tax.

### 3. Concept duplication: catalog-specific vs generic securable APIs — entire file
- **Why weird:** The package ships two parallel surfaces:
  - `Get/UpdateCatalogWorkspaceBindingsRequest` operate on `/workspace-bindings/catalogs/{name}` (catalog-only legacy).
  - `Get/UpdateWorkspaceBindingsRequest` operate on `/bindings/{securable_type}/{full_name}` (generic).
- For a catalog, both paths exist; the legacy path is functionally a special case of the generic path with `securable_type=catalog`. The TS SDK exposes both, with different request shapes (#2), different response shapes (number[] vs WorkspaceBindingInfo[]), and different update semantics (`assign_workspaces`/`unassign_workspaces` IDs vs `add`/`remove` of `WorkspaceBindingInfo` records).
- The legacy methods cannot express `READ_ONLY` bindings (they only return/accept workspace IDs, no `BindingType`) — meaning the catalog-specific API is strictly less expressive than the generic one. Yet both are shipped.
- **Category:** 12 (duplicate concept within one package), 17 (inconsistency), Observation.
- **Suggested name:** Either deprecate the catalog-specific surface (mark with `@deprecated`) and direct users to `getWorkspaceBindings({securableType: 'catalog', securableFullName: name})`, or rename the catalog-specific variant to make its legacy status explicit (e.g. `getCatalogWorkspaceBindingsLegacy`).
- **Rationale:** Two surfaces for one operation, where one is strictly weaker, is a footgun.

### 4. Concept overlap with sibling package `workspaceassignment` — cross-package
- **Why weird:** A sibling package `packages/workspaceassignment/src/v1/` covers `WorkspacePermissionAssignment` — assigning **principals** (users, groups, service principals) to **workspaces**. The current package `workspacebindings` covers `WorkspaceBindingInfo` — assigning **securables** (catalogs, credentials, etc.) to **workspaces**. Both use the noun "workspace" and an "assign"/"bind" verb. A user searching the SDK for "how do I associate X with a workspace" will find both packages and must read both READMEs to disambiguate. There is no surface-level disambiguation in the type or method names. `workspaceassignment` even has an `assign_workspaces` / `unassign_workspaces` field in `UpdateCatalogWorkspaceBindingsRequest` (line 55, 57) — using the verb "assign" inside the *bindings* package.
- **Category:** 12 (duplicate concept across packages), 17 (inconsistent verbs: "bind" vs "assign" used for adjacent operations).
- **Suggested name:** Either align the verbs (both as "assign" or both as "bind") or rename one package to disambiguate directionally — e.g. `workspacebindings` → `securableworkspacebindings` or `ucbindings`; `workspaceassignment` → `workspaceprincipalassignment`. At minimum, pick one verb across the two packages.
- **Rationale:** Two packages with overlapping vocabulary and adjacent semantics is a discoverability hazard. The verb mix ("bind"/"assign") within a single request type (`UpdateCatalogWorkspaceBindingsRequest.assignWorkspaces`) actively misleads.

---

## Medium severity

### 5. `WorkspaceBindingInfo` (type) — `src/v1/model.ts:88`
- **Why weird:** `Info` suffix is a Go-style convention (`*Info` types in `databricks/sdk-go` are pervasive: `CatalogInfo`, `TableInfo`, `SchemaInfo`...). In TS the suffix carries no information — the type *is* the binding, not a separate "info-about-the-binding" record. Just two fields: `workspaceId` and `bindingType`.
- **Category:** 14 (Go-style name), 8 (redundant suffix).
- **Suggested name:** `WorkspaceBinding`.
- **Rationale:** Drop Go suffixes when porting; sibling packages have already done this for some types but not consistently.

### 6. `workspaces?: number[]` (field, multiple) — `src/v1/model.ts:20,63`
- **Why weird:** Generic field name "workspaces" for what is actually a list of workspace IDs (not workspace objects). The doc-comment says "A list of workspace IDs" — so the wire/value is IDs, but the field is named after the entity. A consumer might reasonably expect `workspaces: Workspace[]` and be surprised by `number[]`.
- **Category:** 6 (misleading: name implies entity, value is ID), 15 (generic field name), 16 (field contradicts type domain), 19 (underspecified ID).
- **Suggested name:** `workspaceIds`.
- **Rationale:** Pair with `assignWorkspaces`/`unassignWorkspaces` (which have the same problem, #7, #8) for consistency.

### 7. `assignWorkspaces?: number[]` — `src/v1/model.ts:55`
- **Why weird:** Same problem as #6 — the field is a list of workspace IDs but is named after the entity ("workspaces"). The leading verb "assign" turns the field into a verb-phrase ("assign workspaces"), which reads as an imperative ("please assign workspaces") rather than a noun ("the set of workspace IDs to assign"). Additionally, the verb "assign" is inconsistent with the package noun "bindings" (see #4).
- **Category:** 6 (misleading), 17 (verb inconsistency), 19 (underspecified ID), 15 (generic field).
- **Suggested name:** `workspaceIdsToBind` or `addWorkspaceIds`, matching the `add` / `remove` pattern used in the generic `UpdateWorkspaceBindingsRequest` (lines 76, 78).
- **Rationale:** Aligns vocabulary with package noun (binding, not assign) and clarifies the field is IDs.

### 8. `unassignWorkspaces?: number[]` — `src/v1/model.ts:57`
- **Why weird:** Same problems as #7, plus: "unassign" is a verb invented for this pair (it isn't a real English word in most dictionaries — "unassign" appears in software contexts but is dispreferred to "remove" or "revoke"). The companion field is `assignWorkspaces`, so the prefix matters here.
- **Category:** 6, 17, 5 (cryptic neologism), 19.
- **Suggested name:** `workspaceIdsToUnbind` or `removeWorkspaceIds`.
- **Rationale:** See #7.

### 9. `bindings?: WorkspaceBindingInfo[]` (field, multiple) — `src/v1/model.ts:43,85`
- **Why weird:** Field name `bindings` on a `WorkspaceBindings` response type — repeats the type-name fragment. The surrounding context already says "this is the workspace bindings response", so the field could safely be `items`.
- **Category:** 20 (type-suffix tautology), 15 (generic).
- **Suggested name:** `items` or `workspaceBindings` (more specific).
- **Rationale:** A field on `XResponse` named after `X` is redundant.

### 10. `add?: WorkspaceBindingInfo[]` / `remove?: WorkspaceBindingInfo[]` — `src/v1/model.ts:76,78`
- **Why weird:** Bare verb-shaped field names (`add`, `remove`). On an `UpdateWorkspaceBindingsRequest` payload, these are *what* gets added/removed (a list of bindings), but the field names read as imperatives. The doc-comments clarify, but the field names themselves carry no noun.
- **Category:** 1 (vague), 15 (generic), 17 (verb inconsistency with the catalog-specific `assignWorkspaces`/`unassignWorkspaces`).
- **Suggested name:** `addBindings` / `removeBindings`, or `bindingsToAdd` / `bindingsToRemove`, or `granted` / `revoked`.
- **Rationale:** A bare `add: WorkspaceBindingInfo[]` carries no noun. Common in change-set APIs but typically paired with a typed item collection.

### 11. `workspaceId?: number` — `src/v1/model.ts:90`
- **Why weird:** Databricks workspace IDs are 64-bit integers. JS `number` can only represent integers safely up to 2^53. While today's workspace IDs are far below that, the type is a JS-platform-specific overflow risk. The Go SDK uses `int64`, which TS cannot losslessly represent as `number`. The same field appears as `workspaces?: number[]` (#6) and `assignWorkspaces?: number[]` (#7) — all three would need to migrate together.
- **Category:** 16 (field contradicts type domain: 64-bit IDs typed as JS number), 19 (underspecified).
- **Suggested name:** Keep the name `workspaceId` but consider `bigint` or `string` for the type. This is a project-wide concern.
- **Rationale:** Cross-cutting JS interop issue; not unique to this package, but flagged for completeness.

### 12. `bindingType?: BindingType` — `src/v1/model.ts:92`
- **Why weird:** Field name `bindingType` on a type called `WorkspaceBindingInfo` repeats the type-name fragment "binding". The call site reads `binding.bindingType` — "binding"/"binding type" repeated in one expression.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `accessLevel` (more descriptive — the value indicates read/write vs read-only access), or just `type` (since context is clear).
- **Rationale:** Field on `XBindingInfo` named `xBindingType` is doubly redundant.

### 13. `maxResults?: number` — `src/v1/model.ts:35`
- **Why weird:** 12 lines of doc-comment for one field explain its conditional behaviour ("set to 0" / "set to a value greater than 0" / "set to a value less than 0" / "if not set"). The field name `maxResults` doesn't hint at the magic-value semantics. Also, sibling packages use `pageSize` for the same concept (see grants audit #18) — naming inconsistency across the SDK.
- **Category:** 17 (cross-package inconsistency), 6 (misleading: name implies a strict cap but actually has magic-value semantics).
- **Suggested name:** `pageSize` (matching sibling packages) or `pageLength`. Document the magic values via a `@see` link rather than copy-pasting 12 lines.
- **Rationale:** Cross-package consistency.

### 14. `pageToken?: string` doc — `src/v1/model.ts:36-37`
- **Why weird:** Doc-comment "Opaque pagination token to go to next page based on previous query" is OK, but in the response side `nextPageToken` (line 45-48) the doc refers to "__page_token__" with double-underscores — a documentation hangover from a wire-format spec. Inconsistent with the TS field name `pageToken`.
- **Category:** 6 (misleading docs), Observation.
- **Suggested name:** Field name is fine; fix the doc to use TS field name `pageToken`.
- **Rationale:** Doc-comment consistency.

### 15. `nextPageToken?: string` — `src/v1/model.ts:48`
- **Why weird:** The doc-comment includes `__page_token__` (double-underscore) referring to the request field. The actual TS field is named `pageToken` — the doc is documenting wire format, not TS.
- **Category:** 6 (misleading docs).
- **Suggested name:** Field name is fine; fix the doc text.
- **Rationale:** See #14.

### 16. `getCatalogWorkspaceBindings` method — `src/v1/client.ts:75`
- **Why weird:** Catalog-specific variant of the generic `getWorkspaceBindings` (see #3). The method is undocumented as deprecated even though the generic endpoint subsumes it. The JSDoc on lines 71-74 makes no mention of the generic alternative.
- **Category:** 12 (duplicate concept), Observation.
- **Suggested name:** Mark with `@deprecated` JSDoc and reference `getWorkspaceBindings`.
- **Rationale:** IDE strike-through requires the `@deprecated` tag.

### 17. `updateCatalogWorkspaceBindings` method — `src/v1/client.ts:168`
- **Why weird:** Same as #16. The catalog-specific update is strictly less expressive than the generic update (cannot set `bindingType`) — should not be the recommended path.
- **Category:** 12, Observation.
- **Suggested name:** Mark with `@deprecated`.
- **Rationale:** See #16.

### 18. `Client` — `src/v1/client.ts:46`
- **Why weird:** Top-level export named just `Client`. Generic, ambiguous. The package-level `index.ts:3` re-exports it as `Client`. Users importing from multiple `@databricks/sdk-*` packages must alias every Client (`import {Client as WorkspaceBindingsClient} from '@databricks/sdk-workspacebindings/v1'`).
- **Category:** 1 (vague), 12 (duplicate across packages).
- **Suggested name:** `WorkspaceBindingsClient`.
- **Rationale:** Convention in AWS, Google Cloud, Azure SDKs is service-prefixed client class names for exactly this reason. Same fix should apply across all `@databricks/sdk-*` packages.

### 19. `executeCall` — `src/v1/utils.ts:26`
- **Why weird:** Generic verb-noun name. Two `execute` functions in scope (`execute` imported on line 4, `executeCall` defined on line 26, `executeHttpCall` defined on line 65). The discriminator between them is just "Call" vs "HttpCall" — and both ultimately wrap the imported `execute()`.
- **Category:** 1 (vague), 17 (inconsistent action verbs).
- **Suggested name:** `executeRetryableCall` (since this one applies the retrier/rateLimiter/timeout options) or `executeWithOptions`.
- **Rationale:** Distinguishes the two wrappers semantically.

### 20. `executeHttpCall` — `src/v1/utils.ts:65`
- **Why weird:** Generic name for what is actually "send an HTTP request, drain the body, surface API errors as exceptions, and return the raw body bytes". The function name does not communicate that it throws `ApiError` on 4xx/5xx (line 88-91) — a non-obvious side effect.
- **Category:** 1 (vague), 6 (misleading: "execute" sounds neutral but throws).
- **Suggested name:** `sendAndParseResponse` or `sendOrThrow`.
- **Rationale:** Naming should hint at error semantics.

### 21. `HttpCallOptions` (interface) — `src/v1/utils.ts:15`
- **Why weird:** Yet another `*Options` suffix in a file that already imports `Options` (line 3) and `CallOptions` (line 12) — three `Options` types in scope. `HttpCallOptions` is purely an internal context bag for `executeHttpCall` (request + httpClient + logger) — it isn't user-tunable, so `Options` is misleading.
- **Category:** 1 (vague suffix), 8 (redundant suffix), 17 (inconsistency).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing option structs.

---

## Low severity

### 22. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Exported but unused in this package (the client builds query strings inline with `URLSearchParams.append` on `client.ts:117-122`). Dead-looking export from the standard generator template.
- **Category:** Observation, 11 (unused public helper).
- **Suggested name:** Remove if generator default; or move to a shared utility package and not emit per-package.
- **Rationale:** Cross-package consistency.

### 23. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:41`
- **Why weird:** `Segment` is a generic word; without the inline doc-comment the constant doesn't communicate User-Agent identity. Same issue exists in every generated package.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Cross-package consistency.

---

## Observations

### 24. Client `Host is required.` error message — `src/v1/client.ts:57`
The error thrown when `options.host` is undefined says only "Host is required." — no client name, no package context. Across many similar packages every Client throws the same string, so a stack trace at the outer layer is ambiguous about which Client failed. Naming-adjacent.
- **Category:** Observation.

### 25. `marshalRequest` / `parseResponse` schemas not re-exported from `index.ts`
The marshal/unmarshal helpers are exported from `model.ts` (via `export const`) but `index.ts` (lines 7-17) only re-exports types and `Client`. So the schemas are part of the package's effective import surface (`import {...} from '@databricks/sdk-workspacebindings/v1/model'`) but not advertised. Dead surface or intentional? If the latter, the `export const` should be `const` (module-local).
- **Category:** Observation, 11 (effectively-internal exports).

### 26. `WorkspaceBindingInfo.workspaceId` doc-comment "Required" — `src/v1/model.ts:89`
The single word "Required" appears as a doc-comment on `workspaceId?: number`. But the field is *optional* in the TypeScript type (`workspaceId?: number | undefined`). The annotation contradicts the type modifier. Either: (a) the field is genuinely required by the server and the optional TS type is generator-wide policy (proto3 fields are all optional in TS); or (b) the doc is stale. Either way, readers can't tell.
- **Category:** Observation, 6 (misleading docs).

---

## Fixed

- #3 `GetCatalogWorkspaceBindings` (originally cited at `src/v1/model.ts:12`): Fixed in regeneration on 2026-05-20 — renamed to `GetCatalogWorkspaceBindingsRequest` (suffix added).
- #4 `GetWorkspaceBindings` (originally cited at `src/v1/model.ts:23`): Fixed in regeneration on 2026-05-20 — renamed to `GetWorkspaceBindingsRequest` (suffix added).
- #5 `UpdateCatalogWorkspaceBindings` (originally cited at `src/v1/model.ts:51`): Fixed in regeneration on 2026-05-20 — renamed to `UpdateCatalogWorkspaceBindingsRequest` (suffix added).
- #6 `UpdateWorkspaceBindings` (originally cited at `src/v1/model.ts:66`): Fixed in regeneration on 2026-05-20 — renamed to `UpdateWorkspaceBindingsRequest` (suffix added).
