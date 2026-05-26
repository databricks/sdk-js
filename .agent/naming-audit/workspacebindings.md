# Naming Audit: workspacebindings

**Path:** `packages/workspacebindings/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog workspace bindings — controls which Databricks workspaces can access a given UC securable (catalog, storage credential, credential, external location) and at what access level (`READ_WRITE` or `READ_ONLY`). Exposes a legacy catalog-only API (`/workspace-bindings/catalogs/{name}`) and a generic securable-aware API (`/bindings/{type}/{full_name}`).
**Total weird names flagged:** 18

## Summary
| Severity | Count |
| --- | --- |
| High | 3 |
| Medium | 10 |
| Low | 2 |
| Observation | 3 |

The package contains 9 generated types (1 enum + 8 message/response shapes) and 4 client methods (plus 1 paginated iterator). The pervasive issues are (1) **stringly-typed `securableType`** that should be a closed enum; (2) **dual catalog-specific and generic-securable APIs** that overlap functionally — `getCatalogWorkspaceBindings` is a deprecated specialisation of `getWorkspaceBindings(securableType: 'catalog', ...)` but both ship in v1 with different request/response shapes; and (3) **conceptual neighbour confusion** with the separate `workspaceassignment` package, which assigns *principals* to workspaces while this package binds *securables* to workspaces — same noun "workspace", opposite direction, and the verbs "bind"/"assign" are mixed inside a single request type (`UpdateCatalogWorkspaceBindingsRequest.assignWorkspaces`).

---

## High severity

### 1. `securableType: string` (field, multiple) — `src/v1/model.ts:25,68`
- **Why weird:** Free-form `string` for what is a closed set of values. The doc-comment explicitly lists them: "(catalog, storage_credential, credential, or external_location)" — meaning the API author *knows* the set is closed but chose not to type it. A typo like `"caatalog"` will silently 4xx at the server. Also, the path is constructed via `${req.securableType ?? ''}` (`client.ts:123`, `client.ts:221`) which means an undefined value will produce a URL like `/api/2.1/unity-catalog/bindings//...` — a routing-incidental 404.
- **Category:** 19 (underspecified ID/discriminator), 1 (vague), 16 (field contradicts type domain).
- **Suggested name:** Define a `SecurableType` enum (`CATALOG`, `STORAGE_CREDENTIAL`, `CREDENTIAL`, `EXTERNAL_LOCATION`) and type both fields accordingly.
- **Rationale:** Type-safety is the entire point of TypeScript. Other UC packages in the SDK also use bare `string` for securable types — same fix should apply across all of them.

### 2. Concept duplication: catalog-specific vs generic securable APIs — entire file
- **Why weird:** The package ships two parallel surfaces:
  - `Get/UpdateCatalogWorkspaceBindingsRequest` operate on `/workspace-bindings/catalogs/{name}` (catalog-only legacy).
  - `Get/UpdateWorkspaceBindingsRequest` operate on `/bindings/{securable_type}/{full_name}` (generic).
- For a catalog, both paths exist; the legacy path is functionally a special case of the generic path with `securable_type=catalog`. The TS SDK exposes both, with different request shapes, different response shapes (number[] vs WorkspaceBindingInfo[]), and different update semantics (`assign_workspaces`/`unassign_workspaces` IDs vs `add`/`remove` of `WorkspaceBindingInfo` records).
- The legacy methods cannot express `READ_ONLY` bindings (they only return/accept workspace IDs, no `BindingType`) — meaning the catalog-specific API is strictly less expressive than the generic one. Yet both are shipped.
- **Category:** 12 (duplicate concept within one package), 17 (inconsistency), Observation.
- **Suggested name:** Either deprecate the catalog-specific surface (mark with `@deprecated`) and direct users to `getWorkspaceBindings({securableType: 'catalog', securableFullName: name})`, or rename the catalog-specific variant to make its legacy status explicit (e.g. `getCatalogWorkspaceBindingsLegacy`).
- **Rationale:** Two surfaces for one operation, where one is strictly weaker, is a footgun.

### 3. Concept overlap with sibling package `workspaceassignment` — cross-package
- **Why weird:** A sibling package `packages/workspaceassignment/src/v1/` covers `WorkspacePermissionAssignment` — assigning **principals** (users, groups, service principals) to **workspaces**. The current package `workspacebindings` covers `WorkspaceBindingInfo` — assigning **securables** (catalogs, credentials, etc.) to **workspaces**. Both use the noun "workspace" and an "assign"/"bind" verb. A user searching the SDK for "how do I associate X with a workspace" will find both packages and must read both READMEs to disambiguate. There is no surface-level disambiguation in the type or method names. `workspaceassignment` even has an `assign_workspaces` / `unassign_workspaces` field in `UpdateCatalogWorkspaceBindingsRequest` (line 55, 57) — using the verb "assign" inside the *bindings* package.
- **Category:** 12 (duplicate concept across packages), 17 (inconsistent verbs: "bind" vs "assign" used for adjacent operations).
- **Suggested name:** Either align the verbs (both as "assign" or both as "bind") or rename one package to disambiguate directionally — e.g. `workspacebindings` → `securableworkspacebindings` or `ucbindings`; `workspaceassignment` → `workspaceprincipalassignment`. At minimum, pick one verb across the two packages.
- **Rationale:** Two packages with overlapping vocabulary and adjacent semantics is a discoverability hazard. The verb mix ("bind"/"assign") within a single request type (`UpdateCatalogWorkspaceBindingsRequest.assignWorkspaces`) actively misleads.

---

## Medium severity

### 4. `WorkspaceBindingInfo` (type) — `src/v1/model.ts:88`
- **Why weird:** `Info` suffix is a Go-style convention (`*Info` types in `databricks/sdk-go` are pervasive: `CatalogInfo`, `TableInfo`, `SchemaInfo`...). In TS the suffix carries no information — the type *is* the binding, not a separate "info-about-the-binding" record. Just two fields: `workspaceId` and `bindingType`.
- **Category:** 14 (Go-style name), 8 (redundant suffix).
- **Suggested name:** `WorkspaceBinding`.
- **Rationale:** Drop Go suffixes when porting; sibling packages have already done this for some types but not consistently.

### 5. `workspaceId?: number` — `src/v1/model.ts:90`
- **Why weird:** Databricks workspace IDs are 64-bit integers. JS `number` can only represent integers safely up to 2^53. While today's workspace IDs are far below that, the type is a JS-platform-specific overflow risk. The Go SDK uses `int64`, which TS cannot losslessly represent as `number`. The same field appears as `workspaces?: number[]` and `assignWorkspaces?: number[]` — all three would need to migrate together.
- **Category:** 16 (field contradicts type domain: 64-bit IDs typed as JS number), 19 (underspecified).
- **Suggested name:** Keep the name `workspaceId` but consider `bigint` or `string` for the type. This is a project-wide concern.
- **Rationale:** Cross-cutting JS interop issue; not unique to this package, but flagged for completeness.

### 6. `pageToken?: string` doc — `src/v1/model.ts:36-37`
- **Why weird:** Doc-comment "Opaque pagination token to go to next page based on previous query" is OK, but in the response side `nextPageToken` (line 45-48) the doc refers to "__page_token__" with double-underscores — a documentation hangover from a wire-format spec. Inconsistent with the TS field name `pageToken`.
- **Category:** 6 (misleading docs), Observation.
- **Suggested name:** Field name is fine; fix the doc to use TS field name `pageToken`.
- **Rationale:** Doc-comment consistency.

### 7. `nextPageToken?: string` — `src/v1/model.ts:48`
- **Why weird:** The doc-comment includes `__page_token__` (double-underscore) referring to the request field. The actual TS field is named `pageToken` — the doc is documenting wire format, not TS.
- **Category:** 6 (misleading docs).
- **Suggested name:** Field name is fine; fix the doc text.
- **Rationale:** See #6.

### 8. `getCatalogWorkspaceBindings` method — `src/v1/client.ts:80`
- **Why weird:** Catalog-specific variant of the generic `getWorkspaceBindings` (see #2). The method is undocumented as deprecated even though the generic endpoint subsumes it. The JSDoc on lines 76-79 makes no mention of the generic alternative.
- **Category:** 12 (duplicate concept), Observation.
- **Suggested name:** Mark with `@deprecated` JSDoc and reference `getWorkspaceBindings`.
- **Rationale:** IDE strike-through requires the `@deprecated` tag.

### 9. `updateCatalogWorkspaceBindings` method — `src/v1/client.ts:179`
- **Why weird:** Same as #8. The catalog-specific update is strictly less expressive than the generic update (cannot set `bindingType`) — should not be the recommended path.
- **Category:** 12, Observation.
- **Suggested name:** Mark with `@deprecated`.
- **Rationale:** See #8.

### 10. `Client` — `src/v1/client.ts:46`
- **Why weird:** Top-level export named just `Client`. Generic, ambiguous. The package-level `index.ts:3` re-exports it as `Client`. Users importing from multiple `@databricks/sdk-*` packages must alias every Client (`import {Client as WorkspaceBindingsClient} from '@databricks/sdk-workspacebindings/v1'`).
- **Category:** 1 (vague), 12 (duplicate across packages).
- **Suggested name:** `WorkspaceBindingsClient`.
- **Rationale:** Convention in AWS, Google Cloud, Azure SDKs is service-prefixed client class names for exactly this reason. Same fix should apply across all `@databricks/sdk-*` packages.

### 11. `executeCall` — `src/v1/utils.ts:26`
- **Why weird:** Generic verb-noun name. Two `execute` functions in scope (`execute` imported on line 4, `executeCall` defined on line 26, `executeHttpCall` defined on line 65). The discriminator between them is just "Call" vs "HttpCall" — and both ultimately wrap the imported `execute()`.
- **Category:** 1 (vague), 17 (inconsistent action verbs).
- **Suggested name:** `executeRetryableCall` (since this one applies the retrier/rateLimiter/timeout options) or `executeWithOptions`.
- **Rationale:** Distinguishes the two wrappers semantically.

### 12. `executeHttpCall` — `src/v1/utils.ts:65`
- **Why weird:** Generic name for what is actually "send an HTTP request, drain the body, surface API errors as exceptions, and return the raw body bytes". The function name does not communicate that it throws `ApiError` on 4xx/5xx (line 88-91) — a non-obvious side effect.
- **Category:** 1 (vague), 6 (misleading: "execute" sounds neutral but throws).
- **Suggested name:** `sendAndParseResponse` or `sendOrThrow`.
- **Rationale:** Naming should hint at error semantics.

### 13. `HttpCallOptions` (interface) — `src/v1/utils.ts:15`
- **Why weird:** Yet another `*Options` suffix in a file that already imports `Options` (line 3) and `CallOptions` (line 12) — three `Options` types in scope. `HttpCallOptions` is purely an internal context bag for `executeHttpCall` (request + httpClient + logger) — it isn't user-tunable, so `Options` is misleading.
- **Category:** 1 (vague suffix), 8 (redundant suffix), 17 (inconsistency).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing option structs.

---

## Low severity

### 14. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Exported but unused in this package (the client builds query strings inline with `URLSearchParams.append` on `client.ts:117-122`). Dead-looking export from the standard generator template.
- **Category:** Observation, 11 (unused public helper).
- **Suggested name:** Remove if generator default; or move to a shared utility package and not emit per-package.
- **Rationale:** Cross-package consistency.

### 15. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:41`
- **Why weird:** `Segment` is a generic word; without the inline doc-comment the constant doesn't communicate User-Agent identity. Same issue exists in every generated package.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Cross-package consistency.

---

## Observations

### 16. Client `Host is required.` error message — `src/v1/client.ts:61`
The error thrown when `options.host` is undefined says only "Host is required." — no client name, no package context. Across many similar packages every Client throws the same string, so a stack trace at the outer layer is ambiguous about which Client failed. Naming-adjacent.
- **Category:** Observation.

### 17. `marshalRequest` / `parseResponse` schemas not re-exported from `index.ts`
The marshal/unmarshal helpers are exported from `model.ts` (via `export const`) but `index.ts` (lines 7-17) only re-exports types and `Client`. So the schemas are part of the package's effective import surface (`import {...} from '@databricks/sdk-workspacebindings/v1/model'`) but not advertised. Dead surface or intentional? If the latter, the `export const` should be `const` (module-local).
- **Category:** Observation, 11 (effectively-internal exports).

### 18. `WorkspaceBindingInfo.workspaceId` doc-comment "Required" — `src/v1/model.ts:89`
The single word "Required" appears as a doc-comment on `workspaceId?: number`. But the field is *optional* in the TypeScript type (`workspaceId?: number | undefined`). The annotation contradicts the type modifier. Either: (a) the field is genuinely required by the server and the optional TS type is generator-wide policy (proto3 fields are all optional in TS); or (b) the doc is stale. Either way, readers can't tell.
- **Category:** Observation, 6 (misleading docs).

---
