# Naming Audit: permissions

**Path:** `packages/permissions/src/v1/`
**Versions audited:** v1
**Inferred domain:** Workspace-object permissions — get, set, update, and inspect ACLs (access control lists) attached to Databricks workspace objects (clusters, jobs, notebooks, dashboards, pipelines, registered models, queries, repos, files, instance pools, etc.). Distinct from `grants` (Unity Catalog privileges on UC securables), though the two surfaces overlap conceptually and lexically.
**Total weird names flagged:** 34

## Summary
| Severity | Count |
| --- | --- |
| High | 12 |
| Medium | 14 |
| Low | 4 |
| Observation | 4 |

The permissions package contains 9 generated types, 1 enum, and 4 client methods, plus utility helpers. Three thematic problems dominate. (1) The request-as-imperative-verb pattern (`GetObjectPermissions`, `SetObjectPermissions`, `UpdateObjectPermissions`, `GetPermissionLevels`) collides with the verb-noun methods on `Client`, so users write `client.setObjectPermissions(req: SetObjectPermissions)` and the type name looks like a command rather than a payload. (2) The `PermissionLevel` enum mixes acronym-prefix patterns (`CAN_*`, `IS_*`) with redundant suffixes (`CAN_MONITOR` vs `CAN_MONITOR_ONLY`, `CAN_MANAGE_RUN`, `CAN_CREATE_APP`) and includes a sentinel `UNSPECIFIED` whose semantics ("delete this principal") are only discoverable from JSDoc — the value name actively misleads. (3) The package overlaps heavily with `grants` in vocabulary (`Permission`, `PermissionsResponse`, `permissionLevels`) while modelling a completely different concept; the only public type distinguishing this package from its sibling is `AccessControlRequest`/`Response`, both of which use the IAM-style "access control list" pattern that's unique-in-the-SDK.

Two structural warts surface as a result of mechanical proto-to-TS porting: `GetPermissionLevels_Response` uses an embedded underscore (proto FQN flattening) and requires `// eslint-disable` annotations, and every request type tags its path-parameter fields with a verbose `requestObjectType` / `requestObjectId` prefix (rather than `objectType`/`objectId` or just `type`/`id`) — the prefix is wire-format leakage. Finally, `requestObjectType` and `requestObjectId` are typed `string` with a documented closed enumeration of valid values listed verbatim in JSDoc (26 different object types in a single doc-comment), surfacing the "stringly-typed closed enum" anti-pattern that TypeScript's type system would otherwise prevent.

---

## High severity

### 1. `GetObjectPermissions` (type) — `src/v1/model.ts:79`
- **Why weird:** Top-level request type named with an imperative verb. `Get` is a verb; types are nouns. Used in `client.ts:67` as `getObjectPermissions(req: GetObjectPermissions)`, producing verb-noun-verb-noun. Reader cannot tell from `GetObjectPermissions` whether this is a request shape or a method name.
- **Category:** 7 (overly verbose / structural), 14 (Go-style request-type naming), 17 (inconsistent action verbs).
- **Suggested name:** `GetObjectPermissionsRequest` (matches the SDK-wide `*Request` convention used in `accountaccesscontrol`, `grants` partially, etc.) or simpler `ObjectPermissionsQuery` / `ObjectRef`.
- **Rationale:** Same anti-pattern documented in `.agent/naming-audit/grants.md` #1. Verb-shaped type names are reserved for methods.

### 2. `SetObjectPermissions` (type) — `src/v1/model.ts:115`
- **Why weird:** Same as #1. `Set` is a verb. Type is used at `client.ts:121` as `setObjectPermissions(req: SetObjectPermissions)`.
- **Category:** 7, 14, 17.
- **Suggested name:** `SetObjectPermissionsRequest` or `ObjectPermissionsAssignment`.
- **Rationale:** See #1.

### 3. `UpdateObjectPermissions` (type) — `src/v1/model.ts:123`
- **Why weird:** Same as #1, #2. Verb-shaped type. Used at `client.ts:147` as `updateObjectPermissions(req: UpdateObjectPermissions)`.
- **Category:** 7, 14, 17.
- **Suggested name:** `UpdateObjectPermissionsRequest` or `ObjectPermissionsPatch` (since the HTTP method is PATCH, not PUT — see #29).
- **Rationale:** See #1.

### 4. `GetPermissionLevels` (type) — `src/v1/model.ts:86`
- **Why weird:** Verb-shaped type AND singular/plural collision: the type wraps a request asking for the list of permission levels available, but `GetPermissionLevels` reads like "the operation of getting permission levels" — a method. Inside the package there are then four overlapping `Permission*` names with this one being the most easily misread: it's a request type, not a response type, despite having the word "Levels" plural (which would suggest a result).
- **Category:** 7, 9 (singular/plural mismatch), 14, 17.
- **Suggested name:** `GetPermissionLevelsRequest` or `PermissionLevelsQuery`.
- **Rationale:** Disambiguates request vs response; aligns with #5.

### 5. `GetPermissionLevels_Response` — `src/v1/model.ts:93`
- **Why weird:** Proto-style nested message name with an embedded underscore (`MessageType_FieldName`), illegal under standard TS naming. The codegen has to emit `// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` directly above the declaration (line 92) and again above the schema declaration (line 158). The identifier is part of the public surface — `index.ts:11` re-exports it — so every downstream consumer is forced to write `GetPermissionLevels_Response` with the underscore in their own code.
- **Category:** 4 (underscores in TS identifier), 14 (proto/Go-style name).
- **Suggested name:** `GetPermissionLevelsResponse` (drop the underscore), or — cascading from #4 — `PermissionLevelsResponse`.
- **Rationale:** Google TypeScript Style Guide §5.2 mandates PascalCase without internal underscores. The proto FQN-flattening trick should be hidden by the generator, not surfaced to the public API. Same problem is documented in `.agent/naming-audit/grants.md` #4–6 for that package.

### 6. `PermissionLevel.UNSPECIFIED` — `src/v1/model.ts:31`
- **Why weird:** The enum value `UNSPECIFIED` is overloaded into a sentinel meaning "delete this principal's permissions" — but the *name* says the opposite ("unspecified"). The JSDoc on lines 27–30 clarifies this, but the name itself actively misleads: callers reading `permissionLevel: PermissionLevel.UNSPECIFIED` will reasonably interpret it as "no value set / left blank", not "remove the principal". Worse, the side-effect semantics (mutation) are encoded in what looks like a null-equivalent.
- **Category:** 6 (misleading name), 1 (vague). Sentinel-as-enum-value is a Go pattern.
- **Suggested name:** Split into a dedicated `Remove` or `Revoke` value (`PermissionLevel.REMOVE` or `PermissionLevel.NONE`) — or, better, model deletion as an absent `permissionLevel` field in PATCH calls (the field is already `optional`) and remove the sentinel entirely. The current name guarantees that anyone reading a diff will be confused about whether `UNSPECIFIED` is a no-op or a destructive action.
- **Rationale:** Sentinel-encoded-as-enum-value is an idiom imported from protobuf/Go (`google.protobuf.UNSPECIFIED`) where every enum is required to have a zero value. TypeScript has no such constraint; explicit absence (`undefined`) is idiomatic.

### 7. `PermissionLevel` enum has 20 inconsistently-named values — `src/v1/model.ts:7–32`
- **Why weird:** Mix of three naming patterns within a single enum:
  - `CAN_*` (most common): `CAN_MANAGE`, `CAN_RESTART`, `CAN_ATTACH_TO`, `CAN_MANAGE_RUN`, `CAN_VIEW`, `CAN_READ`, `CAN_RUN`, `CAN_EDIT`, `CAN_USE`, `CAN_BIND`, `CAN_QUERY`, `CAN_MONITOR`, `CAN_CREATE`, `CAN_MONITOR_ONLY`, `CAN_CREATE_APP`, `CAN_EDIT_METADATA`, `CAN_VIEW_METADATA`, `CAN_MANAGE_STAGING_VERSIONS`, `CAN_MANAGE_PRODUCTION_VERSIONS`.
  - `IS_*`: `IS_OWNER`. The lone `IS_*` value mixes copula+predicate, while everything else is modal verb+predicate.
  - Pseudo-sentinel: `UNSPECIFIED` (see #6).
- The `CAN_*` prefix is implied by membership in `PermissionLevel` — a `PermissionLevel` is, by definition, what the principal can do. The redundant `CAN_` prefix on 19 of 20 values is purely a wire-format leak from the Go enum, which followed the same protobuf convention.
- **Category:** 2 (redundant enum prefix — flagged explicitly in the task prompt), 17 (inconsistent action verbs within the same enum).
- **Suggested name:** Drop the `CAN_` prefix: `MANAGE`, `RESTART`, `ATTACH_TO`, `MANAGE_RUN`, `VIEW`, `READ`, `RUN`, `EDIT`, `USE`, etc. `IS_OWNER` becomes `OWNER`. `UNSPECIFIED` becomes `REMOVE` per #6 (or eliminated).
- **Rationale:** Compare `Visibility { PUBLIC, PRIVATE }` vs `Visibility { IS_PUBLIC, IS_PRIVATE }`. The latter is comically redundant. The same logic applies here: `PermissionLevel.MANAGE` is shorter, more readable, and just as unambiguous as `PermissionLevel.CAN_MANAGE` (Google TS Style Guide §5.4 prefers concise enum members; protobuf-style prefixes are a wire concern that does not need to leak into the surface).

### 8. `CAN_MONITOR` vs `CAN_MONITOR_ONLY` — `src/v1/model.ts:23,25`
- **Why weird:** Two distinct values that differ in name only by the `_ONLY` suffix. The JSDoc (none provided) gives no clue what the difference is. From product context, `CAN_MONITOR` typically grants monitoring AND inherited subset privileges; `CAN_MONITOR_ONLY` strictly limits to monitoring. Cannot infer this from the names — must consult external API docs.
- **Category:** 6 (misleading: pair seems exhaustive but `_ONLY` semantics are non-obvious), 17 (inconsistent: no other value uses `_ONLY` to differentiate).
- **Suggested name:** Document inline what the difference is, OR rename to `MONITOR_FULL` / `MONITOR_READ_ONLY` / similar pair where the contrast is on the *predicate*, not on a vague `_ONLY` qualifier.
- **Rationale:** Whenever an enum exposes "X" and "X_ONLY" with no JSDoc, every caller hits a Stack Overflow question.

### 9. `CAN_MANAGE_STAGING_VERSIONS` / `CAN_MANAGE_PRODUCTION_VERSIONS` — `src/v1/model.ts:17,18`
- **Why weird:** 28- and 30-character enum members. These values are specific to one object type (`registered-models` in MLflow Model Registry — staging vs production model versions) but live in a universal enum applicable to 25+ object types. Equivalent to having `CAN_MANAGE_DASHBOARD_DRAFTS` or `CAN_MANAGE_NOTEBOOK_REVISIONS` in the same enum: the values are scoped to one domain but visible to all.
- **Category:** 18 (long enum values — flagged explicitly in the task prompt), 17 (inconsistent — most values are object-type-agnostic, these two leak object-type semantics into the enum).
- **Suggested name:** Possibly `MANAGE_STAGING` / `MANAGE_PRODUCTION` with JSDoc clarifying applicability ("Applies to registered-models only"), or move these MLflow-specific levels into a separate enum.
- **Rationale:** Universal enum + object-specific values is a discoverability hazard; users browsing autocomplete will see these as valid choices for clusters/jobs/dashboards.

### 10. `CAN_CREATE_APP` — `src/v1/model.ts:26`
- **Why weird:** Same problem as #9 — object-type-specific value in a universal enum. The `App` here refers to Databricks Apps (a specific object kind); other object types have no equivalent. The `_APP` suffix is also inconsistent with how the rest of the enum names the noun being created (most `CAN_CREATE` is unsuffixed; `CAN_CREATE_APP` is the only one with an explicit noun).
- **Category:** 18, 17.
- **Suggested name:** Same pattern as #9 — document scope, or partition.
- **Rationale:** See #9.

### 11. Concept duplication with `grants` package — cross-package
- **Why weird:** A sibling package `packages/grants/src/v1/` also defines a `Permission*` vocabulary (`PermissionsChange`, `getPermissions`, `updatePermissions`, `GetPermissions_Response`) for a different operation (Unity Catalog privileges on securables). Both packages re-export `Permission`-prefixed types from their `index.ts`. A user reading `import { Permission } from '@databricks/sdk-permissions/v1'` vs `import { PrivilegeAssignment } from '@databricks/sdk-grants/v1'` has no surface-level cue that these belong to disjoint domains. The `permissions` package operates on workspace objects (clusters, jobs, notebooks) via `requestObjectType: string` paths; the `grants` package operates on UC securables (catalogs, schemas, tables) via `securableType: string` paths. The vocabulary overlap obscures this distinction.
- This same observation appears in `.agent/naming-audit/grants.md` #10 — flagged from the other side of the mirror.
- **Category:** 12 (duplicate concepts across packages), 1 (vague top-level package naming).
- **Suggested name:** Rename one or both for disambiguation: `permissions` → `workspace-permissions` or `workspace-acl`; `grants` → `unity-catalog-grants` or `uc-privileges`. At minimum the public exports should be non-overlapping (no `Permission` prefix in both).
- **Rationale:** The two packages cover non-overlapping concrete operations but use heavily overlapping vocabulary — an enormous discoverability hazard.

### 12. `requestObjectType: string` is a stringly-typed closed enum — `src/v1/model.ts:81,88,116,124`
- **Why weird:** Every request type carries `requestObjectType?: string | undefined`. The JSDoc on line 80 (and identically on 87, 116, 124) lists 26 valid string values verbatim: `"alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, knowledge-assistants, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, supervisor-agents, vector-search-endpoints, or warehouses"`. The set is closed, well-known to the server, and stable — a perfect fit for a `RequestObjectType` enum or string literal union. The TS SDK ships it as bare `string` with no autocomplete or compile-time validation. A typo (`"cluster"` instead of `"clusters"`) silently 4xx's at runtime.
- **Category:** 19 (underspecified ID), 1 (vague: bare `string`), 15 (generic field name).
- **Suggested name:** Define `type RequestObjectType = 'alerts' | 'alertsv2' | 'authorization' | 'clusters' | 'cluster-policies' | ...` (string literal union, 26 entries), or an `enum RequestObjectType` with kebab-cased values. The JSDoc explicitly enumerates the values; TypeScript should encode that enumeration.
- **Rationale:** This is the single biggest TS-affordance miss in the package. The Go SDK uses `string` because Go enums are second-class; TS has first-class string literal unions that match this exact use case. See also `.agent/naming-audit/grants.md` #19, #28 (same problem with `Privilege` and `SecurableType`).

---

## Medium severity

### 13. `requestObjectType` / `requestObjectId` prefix — `src/v1/model.ts:81,83,88,89,117,119,125,127`
- **Why weird:** All four request types prefix their two path parameters with `request`: `requestObjectType` and `requestObjectId`. The `request` prefix is wire-format leakage (the Databricks REST path uses `:request_object_type` and `:request_object_id` as URL path placeholders, presumably from an older API spec). On the TypeScript surface, every field is by definition part of a *request* — the `request` prefix carries zero information.
- **Category:** 7 (overly verbose / redundant prefix), 14 (wire-format leak), 15 (generic field name).
- **Suggested name:** `objectType` and `objectId`. The doc-comment on `requestObjectId` already calls it "The id of the request object" — drop the wire-format jargon and just say "object id".
- **Rationale:** Compare `GetObjectPermissions { requestObjectType, requestObjectId }` to `GetObjectPermissions { objectType, objectId }`. The latter reads as plain English. The `request` prefix is the same kind of cruft that `requestId` would have if it appeared in a `Request` type.

### 14. `principalName` discriminated union — `src/v1/model.ts:35–51,56–72`
- **Why weird:** The discriminated union pattern is elegant in TS, but the field name `principalName` is misleading because the values inside are not all "names" — `servicePrincipalName` is documented as "application ID of a service principal" (line 48), which is a UUID, not a name. Calling the carrier field `principalName` and the SP variant `servicePrincipalName` together imply "principal name = service principal name = the SP's name", but the SP variant is the application *ID*, distinct from the SP's display name.
- **Category:** 6 (misleading), 19 (underspecified ID), 15 (overloaded "name").
- **Suggested name:** Rename outer field to `principal` (per `grants` package convention, see #15) and rename the SP variant to `servicePrincipalApplicationId` or `servicePrincipalId`. Or document explicitly that `servicePrincipalName` is "the SP's application UUID, not its display name".
- **Rationale:** Same field name leaks "name" semantics onto a value that's a UUID. Type system can encode this with proper variant naming.

### 15. `principalName` vs `principal` cross-package — `src/v1/model.ts:35,56` (this package) vs `grants/src/v1/model.ts:22,33,69` (grants package)
- **Why weird:** `permissions` uses `principalName?: { $case: 'userName' | 'groupName' | 'servicePrincipalName' }` — a typed discriminated union. `grants` uses `principal: string` — a free-form string with a JSDoc-only constraint ("user email address or group name"). Same concept, two utterly different representations across sister packages. A user familiar with one will not be productive in the other.
- **Category:** 12 (duplicate concept), 17 (inconsistent shapes for the same domain object).
- **Suggested name:** Pick one across the SDK. The `permissions` package's discriminated union is strictly more type-safe and should be the canonical representation.
- **Rationale:** Consistency. Two packages, two ways to spell "who is this for". The audit on `grants` (#12) flagged this from the other side.

### 16. `displayName` on `AccessControlResponse` — `src/v1/model.ts:74`
- **Why weird:** `displayName?: string | undefined` doc-comment "Display name of the user or service principal." (line 73). But the response also carries `principalName` (line 56) which is the carrier-by-identity. Two name-like fields on the same response and the relationship is JSDoc-only. Worse, the JSDoc *doesn't* say "Display name of the user **or group** or service principal" — it omits groups, possibly because groups don't have display names — but the type allows `principalName.$case === 'groupName'` paired with a `displayName` value, which then has no specified semantics.
- **Category:** 6 (misleading), 1 (vague: groups + displayName combo undocumented).
- **Suggested name:** Keep `displayName` but expand doc-comment to cover all three principal kinds.
- **Rationale:** Cross-checking variant + display-name semantics is an integration footgun.

### 17. `allPermissions: Permission[]` field — `src/v1/model.ts:76`
- **Why weird:** `allPermissions?: Permission[] | undefined` with JSDoc "All permissions." — minimal information value in the comment. The qualifier "all" suggests there's a "some permissions" variant that doesn't exist. Internally, the type just lists every effective permission (direct + inherited) — so the `all` prefix is the wire-format way of saying "the merged result". Stripping `all` would lose nothing.
- **Category:** 7 (overly verbose), 1 (vague qualifier), 15 (generic field name on a typed array).
- **Suggested name:** `permissions: Permission[]` (matches the type-name plural). The field would read `AccessControlResponse.permissions` — natural English.
- **Rationale:** Field names that re-state the parent type or carry vague qualifiers add noise. The `all` qualifier here implies a `some`/`partial` companion that doesn't exist.

### 18. `Permission` type — `src/v1/model.ts:98`
- **Why weird:** Top-level type called `Permission` with three fields: `permissionLevel`, `inherited`, `inheritedFromObject`. Every instance of `Permission` here is really an "effective permission" — a permission level paired with inheritance metadata. The name `Permission` alone is the second-most-overloaded noun in the SDK (after `Client`).
- **Category:** 1 (vague), 12 (cross-package collision: `grants` also exports `Permission`-prefixed types).
- **Suggested name:** `EffectivePermission` (matches the doc semantics) or `PermissionGrant` (clarifies that this is a grant, not the concept of permission abstractly).
- **Rationale:** `Permission` as a standalone PascalCase noun is so common across IAM systems that it's nearly content-free without qualification.

### 19. `PermissionsDescription` — `src/v1/model.ts:104`
- **Why weird:** Type carries `permissionLevel?: PermissionLevel | undefined` and `description?: string | undefined`. The plural `Permissions` in the type name is wrong: each instance describes ONE level. Should be `PermissionLevelDescription` (singular). Also, the suffix `Description` is generic — the type is effectively a tuple of (level, description-text); it's the "metadata about a single permission level" record.
- **Category:** 9 (singular/plural mismatch — `Permissions` plural for a single-level descriptor), 1 (generic suffix), 15 (vague field `description: string`).
- **Suggested name:** `PermissionLevelDescription` or `PermissionLevelInfo`.
- **Rationale:** Singular/plural matters; one descriptor = one level.

### 20. `PermissionsResponse` — `src/v1/model.ts:109`
- **Why weird:** Returned from THREE different operations (`getObjectPermissions`, `setObjectPermissions`, `updateObjectPermissions`). The type carries `objectId`, `objectType`, `accessControlList` — i.e. it's "an ACL with metadata", not "a Permissions response". Name is generic; the *content* is the more meaningful concept ("ObjectAcl" or "AccessControlList").
- **Category:** 1 (vague), 7 (Response suffix tautology), 20 (type-suffix tautology — `Permissions` + `Response` adds no info beyond `AccessControlList`).
- **Suggested name:** `ObjectAcl`, `ObjectPermissions`, or `AccessControlList`. Drop the `Response` suffix per the SDK-wide convention that responses are returned values, not named-as-such types.
- **Rationale:** The type's payload (`objectId`, `objectType`, `accessControlList`) is the concept; `Response` is incidental to it being a return value.

### 21. `accessControlList` field — `src/v1/model.ts:112,120,128`
- **Why weird:** Appears in three types (`PermissionsResponse`, `SetObjectPermissions`, `UpdateObjectPermissions`). The field is typed `AccessControlRequest[]` in the two request types and `AccessControlResponse[]` in the response — asymmetric typing under one field name. The conventional shorthand for "access control list" is "ACL" — the field could be `acl` (3 chars vs 18). Or just `entries` since the surrounding type already says "permissions" / "object permissions".
- **Category:** 7 (overly verbose), 20 (type-suffix tautology — field repeats type info), 17 (asymmetric: same field, different element types).
- **Suggested name:** `acl: AccessControlEntry[]` or `entries: AccessControlEntry[]`.
- **Rationale:** "Access control list" is verbose; "ACL" is standard. The asymmetric typing pattern is worth flattening.

### 22. `inherited` boolean field — `src/v1/model.ts:100`
- **Why weird:** Bare `inherited?: boolean | undefined` on `Permission`. Boolean fields starting with a verb (`is*`, `has*`, `was*`) are easier to read at call sites. The current name reads `if (permission.inherited)` — fine, but `if (permission.isInherited)` is more idiomatic.
- **Category:** 14 (Go/Java-style: Go boolean fields commonly drop the `is`/`has` prefix, TS convention varies).
- **Suggested name:** `isInherited`.
- **Rationale:** Google TS Style Guide §5.3 recommends boolean prefixes for readability. The codebase uses both conventions but `is*`-prefixed booleans are more common in IAM contexts.

### 23. `inheritedFromObject: string[]` — `src/v1/model.ts:101`
- **Why weird:** Plural field name (`Object`) typed as `string[]` of object identifiers. The "Object" suffix is singular but the type is plural — minor mismatch. More importantly, the JSDoc is missing entirely (line 101 has no comment) so the reader has to infer that this is the chain of inheritance paths from which this permission was derived. Each element is presumably an object path; the typing is bare `string`.
- **Category:** 9 (singular/plural mismatch), 19 (underspecified ID), 1 (vague — no JSDoc).
- **Suggested name:** `inheritedFromObjects: string[]` (plural for plural), or `inheritanceChain: string[]`. Document the element format.
- **Rationale:** Plurality should match the type's plurality; semantics should be JSDoc'd.

### 24. `Client` — `src/v1/client.ts:41`
- **Why weird:** Top-level class named `Client`. Generic across every generated package. Users importing `Client` from multiple permission-adjacent packages (`@databricks/sdk-permissions`, `@databricks/sdk-grants`, `@databricks/sdk-accountaccesscontrol`) must alias all three.
- **Category:** 1 (vague), 12 (cross-package name clash).
- **Suggested name:** `PermissionsClient`.
- **Rationale:** SDK convention in AWS, Azure, GitHub Octokit, etc. is service-prefixed client class names.

### 25. `requestObjectType` doc-comment duplication — `src/v1/model.ts:80,87,116,124`
- **Why weird:** Four identical 1-line doc-comments listing all 26 valid object types. The list is 280 characters long and is copy-pasted verbatim into every request type. Any change requires four parallel edits.
- **Category:** Observation, 17 (consistency — all four are identical, so this isn't an inconsistency, but it is fragile).
- **Suggested name:** Define `type RequestObjectType` (see #12) and link to it from a single source of truth.
- **Rationale:** DRY for documentation, type-safe for callers.

### 26. `flattenQueryParams` (utility) — `src/v1/utils.ts:123`
- **Why weird:** Exported but unused in this package — `permissions` client doesn't take query parameters in any of its four methods. Dead-looking export, identical to the same wart documented in `.agent/naming-audit/grants.md` #37.
- **Category:** 11 (effectively-internal exports), Observation.
- **Suggested name:** Remove (or move to a shared `@databricks/sdk-core` util).
- **Rationale:** Generator emits the same helper into every package even when unused.

---

## Low severity

### 27. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:36`
- **Why weird:** `Segment` is a generic word; the constant carries User-Agent identity but the name communicates nothing. Same wart appears in every generated package.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Cross-package consistency.

### 28. `readAll` (utility) — `src/v1/utils.ts:40`
- **Why weird:** Internal helper name generic to the point of meaninglessness; clashes cognitively with `Array.prototype` methods and Web Streams APIs. Same pattern called out in `.agent/naming-audit/grants.md` #38. The function name is also a direct Go-port of `io.ReadAll`.
- **Category:** 1 (vague), 14 (Go-style).
- **Suggested name:** `readStreamToEnd`, `drainStream`, or `bufferStream`.
- **Rationale:** Cross-package consistency.

### 29. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Another `Options`-suffixed type; the file also imports `Options` (line 3) and `CallOptions` (line 12), so three `Options` types are in scope at once. The `HttpCallOptions` is internal — purely a context bag for `executeHttpCall`.
- **Category:** 1 (vague suffix), 17 (inconsistent — internal struct shouldn't share a suffix with the user-facing CallOptions).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing option structs. Same finding as `grants.md` #40.

### 30. `updateObjectPermissions` uses PATCH but the type says "Update" — `src/v1/client.ts:146`
- **Why weird:** Method `updateObjectPermissions` issues HTTP `PATCH` (line 156). The request type `UpdateObjectPermissions` is symmetric in name to `SetObjectPermissions` (PUT) — but the semantics differ: PUT replaces, PATCH merges. The naming gives no hint of this. A user reading both method names side-by-side (`set...` and `update...`) might reasonably assume both perform full replacement.
- **Category:** 17 (inconsistent action verbs), Observation.
- **Suggested name:** `patchObjectPermissions` for the PATCH method, OR explicit JSDoc on `update*` clarifying merge semantics.
- **Rationale:** Method verbs should hint at HTTP semantics; `set` vs `update` is ambiguous when both exist on the same resource.

---

## Observations

### 31. Three response paths converge on `PermissionsResponse`
`getObjectPermissions`, `setObjectPermissions`, and `updateObjectPermissions` all return the same `PermissionsResponse` type (`client.ts:70,123,149`). This is fine functionally but means callers can't distinguish "the state I just wrote" from "the state I just read" by type — only by which method was called. For an audit log or comparison flow, this loses information. Naming-adjacent because the type carries no read/write/post-update distinction.
- **Category:** Observation.

### 32. Sentinel value `UNSPECIFIED` in PATCH is the only mutation-state encoded in an enum
The `PermissionLevel.UNSPECIFIED` sentinel (see #6) is unique in the SDK: it's the only enum value across `permissions`, `grants`, `accountaccesscontrol`, and `iam` that doubles as a deletion marker when sent in a PATCH body. Most APIs model this with a separate request body shape (e.g. `removals: Principal[]`) or with HTTP DELETE. Encoding "remove me" as an enum value alongside "let me have this permission" is unusual.
- **Category:** Observation, 6 (misleading).

### 33. Doc-comment list of object types is potentially stale
The hardcoded list in `requestObjectType` doc-comments includes `database-projects`, `genie`, `knowledge-assistants`, `supervisor-agents` — all relatively new product surfaces. The list will need updating with every new permission-able workspace object. As-is the SDK has 26; if not regularly synced with the server, the JSDoc will drift.
- **Category:** Observation.

### 34. No pagination — all methods are unpaginated single-call
Unlike `grants` (which has both unpaginated `Get*` and paginated `List*` methods, see `grants.md` #41), `permissions` has no listing operation. Every method here is by-object-id; there's no "list all permissioned objects" surface. This is correct for the API but worth noting because users coming from `grants` (or `accountaccesscontrol`) might expect parallel list semantics. Naming-adjacent because the absence of `list*` here aligns the method-vocabulary differently than its sibling packages.
- **Category:** Observation.
