# Naming Audit: workspacebindings

**Path:** `packages/workspacebindings/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog workspace bindings — controls which Databricks workspaces can access a given UC securable (catalog, storage credential, credential, external location) and at what access level (`READ_WRITE` or `READ_ONLY`). Exposes a legacy catalog-only API (`/workspace-bindings/catalogs/{name}`) and a generic securable-aware API (`/bindings/{type}/{full_name}`).
**Total weird names flagged:** 33

## Summary
| Severity | Count |
| --- | --- |
| High | 10 |
| Medium | 17 |
| Low | 2 |
| Observation | 4 |

The package contains 9 generated types (1 enum + 8 message/response shapes) and 4 client methods (plus 1 paginated iterator). The pervasive issues are (1) **the request-type-as-verb pattern** (`GetWorkspaceBindings`, `UpdateWorkspaceBindings`, `GetCatalogWorkspaceBindings`, `UpdateCatalogWorkspaceBindings`) producing the awkward `getWorkspaceBindings(req: GetWorkspaceBindings)` verb-noun-verb-noun signature; (2) **enum values that bake the type name back into every member** (`BindingType.BINDING_TYPE_READ_WRITE` etc.); (3) **stringly-typed `securableType`** that should be a closed enum; (4) **dual catalog-specific and generic-securable APIs** that overlap functionally — `getCatalogWorkspaceBindings` is a deprecated specialisation of `getWorkspaceBindings(securableType: 'catalog', ...)` but both ship in v1 with different request/response shapes; and (5) **conceptual neighbour confusion** with the separate `workspaceassignment` package, which assigns *principals* to workspaces while this package binds *securables* to workspaces — same noun "workspace", opposite direction, and the verbs "bind"/"assign" are mixed inside a single request type (`UpdateCatalogWorkspaceBindings.assignWorkspaces`).

---

## High severity

### 1. `BindingType.BINDING_TYPE_UNSPECIFIED` / `BINDING_TYPE_READ_WRITE` / `BINDING_TYPE_READ_ONLY` (enum members) — `src/v1/model.ts:7-9`
- **Why weird:** Every enum value redundantly embeds the enum-type name (`BINDING_TYPE_`) as a prefix. At call sites this becomes `BindingType.BINDING_TYPE_READ_WRITE`, repeating the word "binding type" twice in one expression. The generator comment on line 5 explains the prefix exists to avoid wire-level conflict with a `TableOperation` enum in `credentials_common.proto` — but that is a proto-namespace concern that should not leak into the TS surface.
- **Category:** 2 (redundant enum prefix), 18 (long enum values).
- **Suggested name:** `BindingType.UNSPECIFIED`, `BindingType.READ_WRITE`, `BindingType.READ_ONLY` (drop the embedded `BINDING_TYPE_` prefix; the enum-type already provides the namespace at every use site).
- **Rationale:** Google TS style guide § 5.4 (enums) recommends `EnumName.MEMBER`, not `EnumName.ENUMNAME_MEMBER`. The proto FQN-flattening trick should be hidden by the marshal layer (which already maps to/from the wire string), not surfaced to consumers.

### 2. `BindingType.BINDING_TYPE_UNSPECIFIED` — `src/v1/model.ts:7`
- **Why weird:** Beyond #1, the `UNSPECIFIED` member itself is a proto-3 convention (proto3 enums require a zero value, conventionally `*_UNSPECIFIED`). In TS, a field of type `BindingType | undefined` already encodes "unspecified" via `undefined`. The enum member is unreachable in practice — a server returning `BINDING_TYPE_UNSPECIFIED` would be a protocol bug — and bloats the public API with a value users should never pass.
- **Category:** 2 (redundant enum value), 14 (proto/Go-style naming), 11 (trivial/unused value).
- **Suggested name:** Remove `UNSPECIFIED` from the TS enum; let `undefined` express the same state.
- **Rationale:** The TS `| undefined` modifier on `bindingType?: BindingType | undefined` already provides the absent state. Keeping `UNSPECIFIED` as an enum member duplicates that information.

### 3. `GetCatalogWorkspaceBindings` (type) — `src/v1/model.ts:12`
- **Why weird:** Top-level request type whose name is an imperative verb phrase ("Get Catalog Workspace Bindings"). TS types should be nouns; verbs are reserved for methods. The Client also has a method `getCatalogWorkspaceBindings` (`client.ts:75`) that takes this type as input, producing the verb-noun-verb-noun signature `getCatalogWorkspaceBindings(req: GetCatalogWorkspaceBindings)`. Readers cannot tell from the type whether the identifier names the operation or the request shape.
- **Category:** 7 (overly verbose), 17 (inconsistent action verbs).
- **Suggested name:** `GetCatalogWorkspaceBindingsRequest` or `CatalogWorkspaceBindingsQuery`. Best: rename to noun form (e.g. `CatalogBindingsLookup`) to break the verb collision entirely.
- **Rationale:** Sibling SDK packages already adopt the `*Request` suffix convention. Internal consistency.

### 4. `GetWorkspaceBindings` (type) — `src/v1/model.ts:23`
- **Why weird:** Same problem as #3. Verb-shaped request type collides with `getWorkspaceBindings` method (`client.ts:111`).
- **Category:** 7, 17.
- **Suggested name:** `GetWorkspaceBindingsRequest` or `WorkspaceBindingsListRequest`.
- **Rationale:** See #3.

### 5. `UpdateCatalogWorkspaceBindings` (type) — `src/v1/model.ts:51`
- **Why weird:** Same problem as #3. Verb-shaped request type collides with `updateCatalogWorkspaceBindings` method (`client.ts:168`).
- **Category:** 7, 17.
- **Suggested name:** `UpdateCatalogWorkspaceBindingsRequest` or `CatalogWorkspaceBindingsPatch`.
- **Rationale:** See #3.

### 6. `UpdateWorkspaceBindings` (type) — `src/v1/model.ts:66`
- **Why weird:** Same problem as #3. Verb-shaped request type collides with `updateWorkspaceBindings` method (`client.ts:203`).
- **Category:** 7, 17.
- **Suggested name:** `UpdateWorkspaceBindingsRequest` or `WorkspaceBindingsPatch`.
- **Rationale:** See #3.

### 7. `securableType: string` (field, multiple) — `src/v1/model.ts:25,68`
- **Why weird:** Free-form `string` for what is a closed set of values. The doc-comment explicitly lists them: "(catalog, storage_credential, credential, or external_location)" — meaning the API author *knows* the set is closed but chose not to type it. A typo like `"caatalog"` will silently 4xx at the server. Also, the path is constructed via `${req.securableType ?? ''}` (`client.ts:115`, `client.ts:207`) which means an undefined value will produce a URL like `/api/2.1/unity-catalog/bindings//...` — a routing-incidental 404.
- **Category:** 19 (underspecified ID/discriminator), 1 (vague), 16 (field contradicts type domain).
- **Suggested name:** Define a `SecurableType` enum (`CATALOG`, `STORAGE_CREDENTIAL`, `CREDENTIAL`, `EXTERNAL_LOCATION`) and type both fields accordingly.
- **Rationale:** Type-safety is the entire point of TypeScript. Other UC packages in the SDK also use bare `string` for securable types — same fix should apply across all of them.

### 8. `securableFullName` vs `catalogName` inconsistency — `src/v1/model.ts:14,53` vs `27,69`
- **Why weird:** The same conceptual value (the fully-qualified name of the securable being bound) is named two different ways depending on which request type you're looking at. `Get/UpdateCatalogWorkspaceBindings` use `catalogName` (because the legacy endpoint is catalog-specific). `Get/UpdateWorkspaceBindings` use `securableFullName` (because the generic endpoint accepts any securable). For a catalog binding, both names refer to the same string. Users porting from one variant to the other must change the field name.
- **Category:** 17 (inconsistent naming), 15 (one is a special case of the other).
- **Suggested name:** Use `fullName` everywhere (or `name`), since `securableType` already provides the discriminator. Drop the special-case `catalogName` field once the legacy API is gone.
- **Rationale:** Two field names for one logical value is a documentation and onboarding tax.

### 9. Concept duplication: catalog-specific vs generic securable APIs — entire file
- **Why weird:** The package ships two parallel surfaces:
  - `Get/UpdateCatalogWorkspaceBindings` operate on `/workspace-bindings/catalogs/{name}` (catalog-only legacy).
  - `Get/UpdateWorkspaceBindings` operate on `/bindings/{securable_type}/{full_name}` (generic).
- For a catalog, both paths exist; the legacy path is functionally a special case of the generic path with `securable_type=catalog`. The TS SDK exposes both, with different request shapes (#8), different response shapes (number[] vs WorkspaceBindingInfo[]), and different update semantics (`assign_workspaces`/`unassign_workspaces` IDs vs `add`/`remove` of `WorkspaceBindingInfo` records).
- The legacy methods cannot express `READ_ONLY` bindings (they only return/accept workspace IDs, no `BindingType`) — meaning the catalog-specific API is strictly less expressive than the generic one. Yet both are shipped.
- **Category:** 12 (duplicate concept within one package), 17 (inconsistency), Observation.
- **Suggested name:** Either deprecate the catalog-specific surface (mark with `@deprecated`) and direct users to `getWorkspaceBindings({securableType: 'catalog', securableFullName: name})`, or rename the catalog-specific variant to make its legacy status explicit (e.g. `getCatalogWorkspaceBindingsLegacy`).
- **Rationale:** Two surfaces for one operation, where one is strictly weaker, is a footgun.

### 10. Concept overlap with sibling package `workspaceassignment` — cross-package
- **Why weird:** A sibling package `packages/workspaceassignment/src/v1/` covers `WorkspacePermissionAssignment` — assigning **principals** (users, groups, service principals) to **workspaces**. The current package `workspacebindings` covers `WorkspaceBindingInfo` — assigning **securables** (catalogs, credentials, etc.) to **workspaces**. Both use the noun "workspace" and an "assign"/"bind" verb. A user searching the SDK for "how do I associate X with a workspace" will find both packages and must read both READMEs to disambiguate. There is no surface-level disambiguation in the type or method names. `workspaceassignment` even has an `assign_workspaces` / `unassign_workspaces` field in `UpdateCatalogWorkspaceBindings` (line 55, 57) — using the verb "assign" inside the *bindings* package.
- **Category:** 12 (duplicate concept across packages), 17 (inconsistent verbs: "bind" vs "assign" used for adjacent operations).
- **Suggested name:** Either align the verbs (both as "assign" or both as "bind") or rename one package to disambiguate directionally — e.g. `workspacebindings` → `securableworkspacebindings` or `ucbindings`; `workspaceassignment` → `workspaceprincipalassignment`. At minimum, pick one verb across the two packages.
- **Rationale:** Two packages with overlapping vocabulary and adjacent semantics is a discoverability hazard. The verb mix ("bind"/"assign") within a single request type (`UpdateCatalogWorkspaceBindings.assignWorkspaces`) actively misleads.

---

## Medium severity

### 11. `WorkspaceBindingInfo` (type) — `src/v1/model.ts:88`
- **Why weird:** `Info` suffix is a Go-style convention (`*Info` types in `databricks/sdk-go` are pervasive: `CatalogInfo`, `TableInfo`, `SchemaInfo`...). In TS the suffix carries no information — the type *is* the binding, not a separate "info-about-the-binding" record. Just two fields: `workspaceId` and `bindingType`.
- **Category:** 14 (Go-style name), 8 (redundant suffix).
- **Suggested name:** `WorkspaceBinding`.
- **Rationale:** Drop Go suffixes when porting; sibling packages have already done this for some types but not consistently.

### 12. `workspaces?: number[]` (field, multiple) — `src/v1/model.ts:20,63`
- **Why weird:** Generic field name "workspaces" for what is actually a list of workspace IDs (not workspace objects). The doc-comment says "A list of workspace IDs" — so the wire/value is IDs, but the field is named after the entity. A consumer might reasonably expect `workspaces: Workspace[]` and be surprised by `number[]`.
- **Category:** 6 (misleading: name implies entity, value is ID), 15 (generic field name), 16 (field contradicts type domain), 19 (underspecified ID).
- **Suggested name:** `workspaceIds`.
- **Rationale:** Pair with `assignWorkspaces`/`unassignWorkspaces` (which have the same problem, #13, #14) for consistency.

### 13. `assignWorkspaces?: number[]` — `src/v1/model.ts:55`
- **Why weird:** Same problem as #12 — the field is a list of workspace IDs but is named after the entity ("workspaces"). The leading verb "assign" turns the field into a verb-phrase ("assign workspaces"), which reads as an imperative ("please assign workspaces") rather than a noun ("the set of workspace IDs to assign"). Additionally, the verb "assign" is inconsistent with the package noun "bindings" (see #10).
- **Category:** 6 (misleading), 17 (verb inconsistency), 19 (underspecified ID), 15 (generic field).
- **Suggested name:** `workspaceIdsToBind` or `addWorkspaceIds`, matching the `add` / `remove` pattern used in the generic `UpdateWorkspaceBindings` (lines 76, 78).
- **Rationale:** Aligns vocabulary with package noun (binding, not assign) and clarifies the field is IDs.

### 14. `unassignWorkspaces?: number[]` — `src/v1/model.ts:57`
- **Why weird:** Same problems as #13, plus: "unassign" is a verb invented for this pair (it isn't a real English word in most dictionaries — "unassign" appears in software contexts but is dispreferred to "remove" or "revoke"). The companion field is `assignWorkspaces`, so the prefix matters here.
- **Category:** 6, 17, 5 (cryptic neologism), 19.
- **Suggested name:** `workspaceIdsToUnbind` or `removeWorkspaceIds`.
- **Rationale:** See #13.

### 15. `bindings?: WorkspaceBindingInfo[]` (field, multiple) — `src/v1/model.ts:43,85`
- **Why weird:** Field name `bindings` on a `WorkspaceBindings` response type — repeats the type-name fragment. The surrounding context already says "this is the workspace bindings response", so the field could safely be `items`.
- **Category:** 20 (type-suffix tautology), 15 (generic).
- **Suggested name:** `items` or `workspaceBindings` (more specific).
- **Rationale:** A field on `XResponse` named after `X` is redundant.

### 16. `add?: WorkspaceBindingInfo[]` / `remove?: WorkspaceBindingInfo[]` — `src/v1/model.ts:76,78`
- **Why weird:** Bare verb-shaped field names (`add`, `remove`). On a `UpdateWorkspaceBindings` payload, these are *what* gets added/removed (a list of bindings), but the field names read as imperatives. The doc-comments clarify, but the field names themselves carry no noun.
- **Category:** 1 (vague), 15 (generic), 17 (verb inconsistency with the catalog-specific `assignWorkspaces`/`unassignWorkspaces`).
- **Suggested name:** `addBindings` / `removeBindings`, or `bindingsToAdd` / `bindingsToRemove`, or `granted` / `revoked`.
- **Rationale:** A bare `add: WorkspaceBindingInfo[]` carries no noun. Common in change-set APIs but typically paired with a typed item collection.

### 17. `workspaceId?: number` — `src/v1/model.ts:90`
- **Why weird:** Databricks workspace IDs are 64-bit integers. JS `number` can only represent integers safely up to 2^53. While today's workspace IDs are far below that, the type is a JS-platform-specific overflow risk. The Go SDK uses `int64`, which TS cannot losslessly represent as `number`. The same field appears as `workspaces?: number[]` (#12) and `assignWorkspaces?: number[]` (#13) — all three would need to migrate together.
- **Category:** 16 (field contradicts type domain: 64-bit IDs typed as JS number), 19 (underspecified).
- **Suggested name:** Keep the name `workspaceId` but consider `bigint` or `string` for the type. This is a project-wide concern.
- **Rationale:** Cross-cutting JS interop issue; not unique to this package, but flagged for completeness.

### 18. `bindingType?: BindingType` — `src/v1/model.ts:92`
- **Why weird:** Field name `bindingType` on a type called `WorkspaceBindingInfo` repeats the type-name fragment "binding". Combined with #1, the call site reads `binding.bindingType === BindingType.BINDING_TYPE_READ_WRITE` — "binding"/"binding"/"binding type"/"binding type" four times in one expression.
- **Category:** 20 (type-suffix tautology).
- **Suggested name:** `accessLevel` (more descriptive — the value indicates read/write vs read-only access), or just `type` (since context is clear).
- **Rationale:** Field on `XBindingInfo` named `xBindingType` is doubly redundant.

### 19. `maxResults?: number` — `src/v1/model.ts:35`
- **Why weird:** 12 lines of doc-comment for one field explain its conditional behaviour ("set to 0" / "set to a value greater than 0" / "set to a value less than 0" / "if not set"). The field name `maxResults` doesn't hint at the magic-value semantics. Also, sibling packages use `pageSize` for the same concept (see grants audit #18) — naming inconsistency across the SDK.
- **Category:** 17 (cross-package inconsistency), 6 (misleading: name implies a strict cap but actually has magic-value semantics).
- **Suggested name:** `pageSize` (matching sibling packages) or `pageLength`. Document the magic values via a `@see` link rather than copy-pasting 12 lines.
- **Rationale:** Cross-package consistency.

### 20. `pageToken?: string` doc — `src/v1/model.ts:36-37`
- **Why weird:** Doc-comment "Opaque pagination token to go to next page based on previous query" is OK, but in the response side `nextPageToken` (line 45-48) the doc refers to "__page_token__" with double-underscores — a documentation hangover from a wire-format spec. Inconsistent with the TS field name `pageToken`.
- **Category:** 6 (misleading docs), Observation.
- **Suggested name:** Field name is fine; fix the doc to use TS field name `pageToken`.
- **Rationale:** Doc-comment consistency.

### 21. `nextPageToken?: string` — `src/v1/model.ts:48`
- **Why weird:** The doc-comment includes `__page_token__` (double-underscore) referring to the request field. The actual TS field is named `pageToken` — the doc is documenting wire format, not TS.
- **Category:** 6 (misleading docs).
- **Suggested name:** Field name is fine; fix the doc text.
- **Rationale:** See #20.

### 22. `getCatalogWorkspaceBindings` method — `src/v1/client.ts:75`
- **Why weird:** Catalog-specific variant of the generic `getWorkspaceBindings` (see #9). The method is undocumented as deprecated even though the generic endpoint subsumes it. The JSDoc on lines 71-74 makes no mention of the generic alternative.
- **Category:** 12 (duplicate concept), Observation.
- **Suggested name:** Mark with `@deprecated` JSDoc and reference `getWorkspaceBindings`.
- **Rationale:** IDE strike-through requires the `@deprecated` tag.

### 23. `updateCatalogWorkspaceBindings` method — `src/v1/client.ts:168`
- **Why weird:** Same as #22. The catalog-specific update is strictly less expressive than the generic update (cannot set `bindingType`) — should not be the recommended path.
- **Category:** 12, Observation.
- **Suggested name:** Mark with `@deprecated`.
- **Rationale:** See #22.

### 24. `Client` — `src/v1/client.ts:46`
- **Why weird:** Top-level export named just `Client`. Generic, ambiguous. The package-level `index.ts:3` re-exports it as `Client`. Users importing from multiple `@databricks/sdk-*` packages must alias every Client (`import {Client as WorkspaceBindingsClient} from '@databricks/sdk-workspacebindings/v1'`).
- **Category:** 1 (vague), 12 (duplicate across packages).
- **Suggested name:** `WorkspaceBindingsClient`.
- **Rationale:** Convention in AWS, Google Cloud, Azure SDKs is service-prefixed client class names for exactly this reason. Same fix should apply across all `@databricks/sdk-*` packages.

### 25. `executeCall` — `src/v1/utils.ts:26`
- **Why weird:** Generic verb-noun name. Two `execute` functions in scope (`execute` imported on line 4, `executeCall` defined on line 26, `executeHttpCall` defined on line 65). The discriminator between them is just "Call" vs "HttpCall" — and both ultimately wrap the imported `execute()`.
- **Category:** 1 (vague), 17 (inconsistent action verbs).
- **Suggested name:** `executeRetryableCall` (since this one applies the retrier/rateLimiter/timeout options) or `executeWithOptions`.
- **Rationale:** Distinguishes the two wrappers semantically.

### 26. `executeHttpCall` — `src/v1/utils.ts:65`
- **Why weird:** Generic name for what is actually "send an HTTP request, drain the body, surface API errors as exceptions, and return the raw body bytes". The function name does not communicate that it throws `APIError` on 4xx/5xx (line 88-91) — a non-obvious side effect.
- **Category:** 1 (vague), 6 (misleading: "execute" sounds neutral but throws).
- **Suggested name:** `sendAndParseResponse` or `sendOrThrow`.
- **Rationale:** Naming should hint at error semantics.

### 27. `HttpCallOptions` (interface) — `src/v1/utils.ts:15`
- **Why weird:** Yet another `*Options` suffix in a file that already imports `Options` (line 3) and `CallOptions` (line 12) — three `Options` types in scope. `HttpCallOptions` is purely an internal context bag for `executeHttpCall` (request + httpClient + logger) — it isn't user-tunable, so `Options` is misleading.
- **Category:** 1 (vague suffix), 8 (redundant suffix), 17 (inconsistency).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing option structs.

---

## Low severity

### 28. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Exported but unused in this package (the client builds query strings inline with `URLSearchParams.append` on `client.ts:117-122`). Dead-looking export from the standard generator template.
- **Category:** Observation, 11 (unused public helper).
- **Suggested name:** Remove if generator default; or move to a shared utility package and not emit per-package.
- **Rationale:** Cross-package consistency.

### 29. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:41`
- **Why weird:** `Segment` is a generic word; without the inline doc-comment the constant doesn't communicate User-Agent identity. Same issue exists in every generated package.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Cross-package consistency.

---

## Observations

### 30. Client `Host is required.` error message — `src/v1/client.ts:57`
The error thrown when `options.host` is undefined says only "Host is required." — no client name, no package context. Across many similar packages every Client throws the same string, so a stack trace at the outer layer is ambiguous about which Client failed. Naming-adjacent.
- **Category:** Observation.

### 31. `marshalRequest` / `parseResponse` schemas not re-exported from `index.ts`
The marshal/unmarshal helpers are exported from `model.ts` (via `export const`) but `index.ts` (lines 7-17) only re-exports types and `Client`. So the schemas are part of the package's effective import surface (`import {...} from '@databricks/sdk-workspacebindings/v1/model'`) but not advertised. Dead surface or intentional? If the latter, the `export const` should be `const` (module-local).
- **Category:** Observation, 11 (effectively-internal exports).

### 32. `WorkspaceBindingInfo.workspaceId` doc-comment "Required" — `src/v1/model.ts:89`
The single word "Required" appears as a doc-comment on `workspaceId?: number`. But the field is *optional* in the TypeScript type (`workspaceId?: number | undefined`). The annotation contradicts the type modifier. Either: (a) the field is genuinely required by the server and the optional TS type is generator-wide policy (proto3 fields are all optional in TS); or (b) the doc is stale. Either way, readers can't tell.
- **Category:** Observation, 6 (misleading docs).

### 33. `BindingType` doc-comment surfaces proto comment as TS doc — `src/v1/model.ts:5`
The comment "Using `BINDING_TYPE_` prefix here to avoid conflict with `TableOperation` enum in `credentials_common.proto`." is a wire-implementation note that has been promoted to a TS doc-comment. TS consumers should not need to know about proto namespaces. This is naming-adjacent — the comment exists *because* of the redundant prefix (#1, #2). Removing the prefix would also remove the need for the explanation.
- **Category:** Observation, 14 (proto-style naming surfaced in docs).
