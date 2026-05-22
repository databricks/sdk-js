# Naming Audit: permissions

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/accessmanagement/src/v1/` (originally `packages/permissions/`, consolidated into `accessmanagement` during regeneration).
**Versions audited:** v1
**Inferred domain:** Workspace-object permissions — get, set, update, and inspect ACLs (access control lists) attached to Databricks workspace objects (clusters, jobs, notebooks, dashboards, pipelines, registered models, queries, repos, files, instance pools, etc.). Distinct from `grants` (Unity Catalog privileges on UC securables), though the two surfaces overlap conceptually and lexically.
**Total weird names flagged:** 33

## Summary
| Severity | Count |
| --- | --- |
| High | 7 |
| Medium | 18 |
| Low | 5 |
| Observation | 3 |

The permissions surface contains 9 generated types, 1 enum, and 4 client methods, plus utility helpers. After regeneration, the four request types (`GetObjectPermissions`, `SetObjectPermissions`, `UpdateObjectPermissions`, `GetPermissionLevels`) gained `Request` suffixes — eliminating the worst of the verb-shaped-type problems. What remains on the `PermissionLevel` enum is the redundant `CAN_` action-verb prefix on 19 of 20 values (the lone `IS_OWNER` mixes a different copula), the `_ONLY` qualifier on `CAN_MONITOR_ONLY`, and the object-type-specific values (`CAN_MANAGE_STAGING_VERSIONS`, `CAN_CREATE_APP`) leaking into a universal enum.

The structural wart from mechanical proto-to-TS porting persists: every request type tags its path-parameter fields with a verbose `requestObjectType` / `requestObjectId` prefix (rather than `objectType`/`objectId` or just `type`/`id`) — the prefix is wire-format leakage. `requestObjectType` and `requestObjectId` are still typed `string` with a documented closed enumeration of valid values listed verbatim in JSDoc (26 different object types in a single doc-comment), surfacing the "stringly-typed closed enum" anti-pattern that TypeScript's type system would otherwise prevent. The package also overlaps heavily with `grants` in vocabulary (`Permission`, `PermissionsResponse`, `permissionLevels`) while modelling a completely different concept.

---

## High severity

### 1. `PermissionLevel` enum values share a redundant `CAN_` action-verb prefix — `src/v1/model.ts:6–27`
- **Why weird:** Of 20 values, 19 begin with `CAN_` (`CAN_MANAGE`, `CAN_RESTART`, `CAN_ATTACH_TO`, `CAN_MANAGE_RUN`, `CAN_VIEW`, `CAN_READ`, `CAN_RUN`, `CAN_EDIT`, `CAN_USE`, `CAN_BIND`, `CAN_QUERY`, `CAN_MONITOR`, `CAN_CREATE`, `CAN_MONITOR_ONLY`, `CAN_CREATE_APP`, `CAN_EDIT_METADATA`, `CAN_VIEW_METADATA`, `CAN_MANAGE_STAGING_VERSIONS`, `CAN_MANAGE_PRODUCTION_VERSIONS`); the lone exception is `IS_OWNER`, which uses a copula+predicate form. The `CAN_` prefix is implied by membership in `PermissionLevel` — a `PermissionLevel` is, by definition, what the principal can do — and is therefore content-free on every value. This is distinct from the proto-style enum-name prefix (which would be `PERMISSION_LEVEL_*`); here the redundancy is on the action-modal verb shared by 19 of 20 members. Mixing `CAN_*` with `IS_OWNER` also breaks within-enum consistency.
- **Category:** 2 (redundant action-verb prefix on enum members), 17 (inconsistent: 19 `CAN_*` action verbs alongside one `IS_*` copula).
- **Suggested name:** Drop the `CAN_` action-verb prefix: `MANAGE`, `RESTART`, `ATTACH_TO`, `MANAGE_RUN`, `VIEW`, `READ`, `RUN`, `EDIT`, `USE`, etc. `IS_OWNER` becomes `OWNER`.
- **Rationale:** Compare `Visibility { PUBLIC, PRIVATE }` vs `Visibility { IS_PUBLIC, IS_PRIVATE }`. The latter is comically redundant. `PermissionLevel.MANAGE` is shorter and just as unambiguous as `PermissionLevel.CAN_MANAGE` (Google TS Style Guide §5.4 prefers concise enum members; the `CAN_` modal verb does not need to repeat on every member).

### 2. `CAN_MONITOR` vs `CAN_MONITOR_ONLY` — `src/v1/model.ts:23,25`
- **Why weird:** Two distinct values that differ in name only by the `_ONLY` suffix. The JSDoc (none provided) gives no clue what the difference is. From product context, `CAN_MONITOR` typically grants monitoring AND inherited subset privileges; `CAN_MONITOR_ONLY` strictly limits to monitoring. Cannot infer this from the names — must consult external API docs.
- **Category:** 6 (misleading: pair seems exhaustive but `_ONLY` semantics are non-obvious), 17 (inconsistent: no other value uses `_ONLY` to differentiate).
- **Suggested name:** Document inline what the difference is, OR rename to `MONITOR_FULL` / `MONITOR_READ_ONLY` / similar pair where the contrast is on the *predicate*, not on a vague `_ONLY` qualifier.
- **Rationale:** Whenever an enum exposes "X" and "X_ONLY" with no JSDoc, every caller hits a Stack Overflow question.

### 3. `CAN_MANAGE_STAGING_VERSIONS` / `CAN_MANAGE_PRODUCTION_VERSIONS` — `src/v1/model.ts:17,18`
- **Why weird:** These values are specific to one object type (`registered-models` in MLflow Model Registry — staging vs production model versions) but live in a universal enum applicable to 25+ object types. Equivalent to having `CAN_MANAGE_DASHBOARD_DRAFTS` or `CAN_MANAGE_NOTEBOOK_REVISIONS` in the same enum: the values are scoped to one domain but visible to all.
- **Category:** 17 (inconsistent — most values are object-type-agnostic, these two leak object-type semantics into the enum).
- **Suggested name:** JSDoc clarifying applicability ("Applies to registered-models only"), or move these MLflow-specific levels into a separate enum.
- **Rationale:** Universal enum + object-specific values is a discoverability hazard; users browsing autocomplete will see these as valid choices for clusters/jobs/dashboards.

### 4. `CAN_CREATE_APP` — `src/v1/model.ts:26`
- **Why weird:** Same problem as #3 — object-type-specific value in a universal enum. The `App` here refers to Databricks Apps (a specific object kind); other object types have no equivalent. The `_APP` suffix is also inconsistent with how the rest of the enum names the noun being created (most `CAN_CREATE` is unsuffixed; `CAN_CREATE_APP` is the only one with an explicit noun).
- **Category:** 17.
- **Suggested name:** Same pattern as #3 — document scope, or partition.
- **Rationale:** See #3.

### 5. Concept duplication with `grants` package — cross-package
- **Why weird:** A sibling package `packages/grants/src/v1/` also defines a `Permission*` vocabulary (`PermissionsChange`, `getPermissions`, `updatePermissions`) for a different operation (Unity Catalog privileges on securables). Both packages re-export `Permission`-prefixed types from their `index.ts`. A user reading `import { Permission } from '@databricks/sdk-accessmanagement/v1'` vs `import { PrivilegeAssignment } from '@databricks/sdk-grants/v1'` has no surface-level cue that these belong to disjoint domains. The permissions surface operates on workspace objects (clusters, jobs, notebooks) via `requestObjectType: string` paths; the `grants` package operates on UC securables (catalogs, schemas, tables) via `securableType: string` paths. The vocabulary overlap obscures this distinction.
- This same observation appears in `.agent/naming-audit/grants.md` #10 — flagged from the other side of the mirror.
- **Category:** 12 (duplicate concepts across packages), 1 (vague top-level package naming).
- **Suggested name:** Rename for disambiguation: keep the surface in `accessmanagement` but expose under a `workspace-permissions` or `workspace-acl` subpath; `grants` → `unity-catalog-grants` or `uc-privileges`. At minimum the public exports should be non-overlapping (no `Permission` prefix in both).
- **Rationale:** The two packages cover non-overlapping concrete operations but use heavily overlapping vocabulary — an enormous discoverability hazard.

### 6. `RequestAuthzIdentity` enum and `REQUEST_AUTHZ_IDENTITY_*` member prefix — `src/v1/model.ts:33–37`
- **Why weird:** The enum-type name starts with `Request` — a wire-format-message prefix (`RequestAuthzIdentity` reads as "the AuthzIdentity field on a request message"). Every member then re-states the entire enum name as a SCREAMING_SNAKE prefix: `REQUEST_AUTHZ_IDENTITY_UNSPECIFIED`, `REQUEST_AUTHZ_IDENTITY_USER_CONTEXT`, `REQUEST_AUTHZ_IDENTITY_SERVICE_IDENTITY`. This is the canonical proto3 enum convention — proto enum members must be globally unique within a file, so the enum name is required as a prefix; TypeScript enums have no such constraint, so the prefix is pure proto-architectural leakage. Also, the `UNSPECIFIED` zero value is a proto convention (every proto enum must have a zero value named `*_UNSPECIFIED`); TS enums have no such requirement.
- **Category:** Proto-architecture leak (enum-name-prefix on members, `Request` infix on type name, `_UNSPECIFIED` zero-value convention).
- **Suggested name:** `AuthzIdentity` enum with members `UNSPECIFIED`, `USER_CONTEXT`, `SERVICE_IDENTITY`. Better: drop `UNSPECIFIED` and make the field optional in the request types (TS-idiomatic absence is `undefined`).
- **Rationale:** Proto3-derived enum naming conventions add 25+ characters of redundant prefix per call site (`RequestAuthzIdentity.REQUEST_AUTHZ_IDENTITY_USER_CONTEXT` vs `AuthzIdentity.USER_CONTEXT`). The `Request` prefix on the type name implies the enum is only valid in request contexts, but it appears as a field on `CheckPolicyRequest` only — the enum itself is a domain concept (who's the actor), not a message-shape concept.

### 7. `requestObjectType: string` is a stringly-typed closed enum — `src/v1/model.ts:156,163,340,348`
- **Why weird:** Every request type carries `requestObjectType?: string | undefined`. The JSDoc on line 155 (and identically on 162, 339, 347) lists 26 valid string values verbatim: `"alerts, alertsv2, authorization, clusters, cluster-policies, dashboards, database-projects, dbsql-dashboards, directories, experiments, files, genie, instance-pools, jobs, knowledge-assistants, notebooks, pipelines, queries, registered-models, repos, serving-endpoints, supervisor-agents, vector-search-endpoints, or warehouses"`. The set is closed, well-known to the server, and stable — a perfect fit for a `RequestObjectType` enum or string literal union. The TS SDK ships it as bare `string` with no autocomplete or compile-time validation. A typo (`"cluster"` instead of `"clusters"`) silently 4xx's at runtime.
- **Category:** 19 (underspecified ID), 1 (vague: bare `string`), 15 (generic field name).
- **Suggested name:** Define `type RequestObjectType = 'alerts' | 'alertsv2' | 'authorization' | 'clusters' | 'cluster-policies' | ...` (string literal union, 26 entries), or an `enum RequestObjectType` with kebab-cased values. The JSDoc explicitly enumerates the values; TypeScript should encode that enumeration.
- **Rationale:** This is the single biggest TS-affordance miss in the package. The Go SDK uses `string` because Go enums are second-class; TS has first-class string literal unions that match this exact use case. See also `.agent/naming-audit/grants.md` #19, #28 (same problem with `Privilege` and `SecurableType`).

---

## Medium severity

### 8. `requestObjectType` / `requestObjectId` prefix — `src/v1/model.ts:156,158,163,164,340,342,348,350`
- **Why weird:** All four request types prefix their two path parameters with `request`: `requestObjectType` and `requestObjectId`. The `request` prefix is wire-format leakage (the Databricks REST path uses `:request_object_type` and `:request_object_id` as URL path placeholders, presumably from an older API spec). On the TypeScript surface, every field is by definition part of a *request* — the `request` prefix carries zero information.
- **Category:** 7 (overly verbose / redundant prefix), 14 (wire-format leak), 15 (generic field name).
- **Suggested name:** `objectType` and `objectId`. The doc-comment on `requestObjectId` already calls it "The id of the request object" — drop the wire-format jargon and just say "object id".
- **Rationale:** Compare `GetObjectPermissionsRequest { requestObjectType, requestObjectId }` to `GetObjectPermissionsRequest { objectType, objectId }`. The latter reads as plain English. The `request` prefix is the same kind of cruft that `requestId` would have if it appeared in a `Request` type.

### 9. `principalName` discriminated union — `src/v1/model.ts:47–63,68–84`
- **Why weird:** The discriminated union pattern is elegant in TS, but the field name `principalName` is misleading because the values inside are not all "names" — `servicePrincipalName` is documented as "application ID of a service principal" (line 60), which is a UUID, not a name. Calling the carrier field `principalName` and the SP variant `servicePrincipalName` together imply "principal name = service principal name = the SP's name", but the SP variant is the application *ID*, distinct from the SP's display name.
- **Category:** 6 (misleading), 19 (underspecified ID), 15 (overloaded "name").
- **Suggested name:** Rename outer field to `principal` (per `grants` package convention, see #14) and rename the SP variant to `servicePrincipalApplicationId` or `servicePrincipalId`. Or document explicitly that `servicePrincipalName` is "the SP's application UUID, not its display name".
- **Rationale:** Same field name leaks "name" semantics onto a value that's a UUID. Type system can encode this with proper variant naming.

### 10. `principalName` vs `principal` cross-package — `src/v1/model.ts:47,68` (this package) vs `grants/src/v1/model.ts:22,33,69` (grants package)
- **Why weird:** This package uses `principalName?: { $case: 'userName' | 'groupName' | 'servicePrincipalName' }` — a typed discriminated union. `grants` uses `principal: string` — a free-form string with a JSDoc-only constraint ("user email address or group name"). Same concept, two utterly different representations across sister packages. A user familiar with one will not be productive in the other.
- **Category:** 12 (duplicate concept), 17 (inconsistent shapes for the same domain object).
- **Suggested name:** Pick one across the SDK. This package's discriminated union is strictly more type-safe and should be the canonical representation.
- **Rationale:** Consistency. Two packages, two ways to spell "who is this for". The audit on `grants` (#12) flagged this from the other side.

### 11. `displayName` on `AccessControlResponse` — `src/v1/model.ts:86`
- **Why weird:** `displayName?: string | undefined` doc-comment "Display name of the user or service principal." (line 85). But the response also carries `principalName` (line 68) which is the carrier-by-identity. Two name-like fields on the same response and the relationship is JSDoc-only. Worse, the JSDoc *doesn't* say "Display name of the user **or group** or service principal" — it omits groups, possibly because groups don't have display names — but the type allows `principalName.$case === 'groupName'` paired with a `displayName` value, which then has no specified semantics.
- **Category:** 6 (misleading), 1 (vague: groups + displayName combo undocumented).
- **Suggested name:** Keep `displayName` but expand doc-comment to cover all three principal kinds.
- **Rationale:** Cross-checking variant + display-name semantics is an integration footgun.

### 12. `allPermissions: Permission[]` field — `src/v1/model.ts:88`
- **Why weird:** `allPermissions?: Permission[] | undefined` with JSDoc "All permissions." — minimal information value in the comment. The qualifier "all" suggests there's a "some permissions" variant that doesn't exist. Internally, the type just lists every effective permission (direct + inherited) — so the `all` prefix is the wire-format way of saying "the merged result". Stripping `all` would lose nothing.
- **Category:** 7 (overly verbose), 1 (vague qualifier), 15 (generic field name on a typed array).
- **Suggested name:** `permissions: Permission[]` (matches the type-name plural). The field would read `AccessControlResponse.permissions` — natural English.
- **Rationale:** Field names that re-state the parent type or carry vague qualifiers add noise. The `all` qualifier here implies a `some`/`partial` companion that doesn't exist.

### 13. `Permission` type — `src/v1/model.ts:244`
- **Why weird:** Top-level type called `Permission` with three fields: `permissionLevel`, `inherited`, `inheritedFromObject`. Every instance of `Permission` here is really an "effective permission" — a permission level paired with inheritance metadata. The name `Permission` alone is the second-most-overloaded noun in the SDK (after `Client`).
- **Category:** 1 (vague), 12 (cross-package collision: `grants` also exports `Permission`-prefixed types).
- **Suggested name:** `EffectivePermission` (matches the doc semantics) or `PermissionGrant` (clarifies that this is a grant, not the concept of permission abstractly).
- **Rationale:** `Permission` as a standalone PascalCase noun is so common across IAM systems that it's nearly content-free without qualification.

### 14. `PermissionsDescription` — `src/v1/model.ts:256`
- **Why weird:** Type carries `permissionLevel?: PermissionLevel | undefined` and `description?: string | undefined`. The plural `Permissions` in the type name is wrong: each instance describes ONE level. Should be `PermissionLevelDescription` (singular). Also, the suffix `Description` is generic — the type is effectively a tuple of (level, description-text); it's the "metadata about a single permission level" record.
- **Category:** 9 (singular/plural mismatch — `Permissions` plural for a single-level descriptor), 1 (generic suffix), 15 (vague field `description: string`).
- **Suggested name:** `PermissionLevelDescription` or `PermissionLevelInfo`.
- **Rationale:** Singular/plural matters; one descriptor = one level.

### 15. `PermissionsResponse` — `src/v1/model.ts:261`
- **Why weird:** Returned from THREE different operations (`getObjectPermissions`, `setObjectPermissions`, `updateObjectPermissions`). The type carries `objectId`, `objectType`, `accessControlList` — i.e. it's "an ACL with metadata", not "a Permissions response". Name is generic; the *content* is the more meaningful concept ("ObjectAcl" or "AccessControlList").
- **Category:** 1 (vague), 7 (Response suffix tautology), 20 (type-suffix tautology — `Permissions` + `Response` adds no info beyond `AccessControlList`).
- **Suggested name:** `ObjectAcl`, `ObjectPermissions`, or `AccessControlList`. Drop the `Response` suffix per the SDK-wide convention that responses are returned values, not named-as-such types.
- **Rationale:** The type's payload (`objectId`, `objectType`, `accessControlList`) is the concept; `Response` is incidental to it being a return value.

### 16. `accessControlList` field — `src/v1/model.ts:264,343,351`
- **Why weird:** Appears in three types (`PermissionsResponse`, `SetObjectPermissionsRequest`, `UpdateObjectPermissionsRequest`). The field is typed `AccessControlRequest[]` in the two request types and `AccessControlResponse[]` in the response — asymmetric typing under one field name. The conventional shorthand for "access control list" is "ACL" — the field could be `acl` (3 chars vs 18). Or just `entries` since the surrounding type already says "permissions" / "object permissions".
- **Category:** 7 (overly verbose), 20 (type-suffix tautology — field repeats type info), 17 (asymmetric: same field, different element types).
- **Suggested name:** `acl: AccessControlEntry[]` or `entries: AccessControlEntry[]`.
- **Rationale:** "Access control list" is verbose; "ACL" is standard. The asymmetric typing pattern is worth flattening.

### 17. `inherited` boolean field — `src/v1/model.ts:246`
- **Why weird:** Bare `inherited?: boolean | undefined` on `Permission`. Boolean fields starting with a verb (`is*`, `has*`, `was*`) are easier to read at call sites. The current name reads `if (permission.inherited)` — fine, but `if (permission.isInherited)` is more idiomatic.
- **Category:** 14 (Go/Java-style: Go boolean fields commonly drop the `is`/`has` prefix, TS convention varies).
- **Suggested name:** `isInherited`.
- **Rationale:** Google TS Style Guide §5.3 recommends boolean prefixes for readability. The codebase uses both conventions but `is*`-prefixed booleans are more common in IAM contexts.

### 18. `inheritedFromObject: string[]` — `src/v1/model.ts:247`
- **Why weird:** Plural field name (`Object`) typed as `string[]` of object identifiers. The "Object" suffix is singular but the type is plural — minor mismatch. More importantly, the JSDoc is missing entirely (line 247 has no comment) so the reader has to infer that this is the chain of inheritance paths from which this permission was derived. Each element is presumably an object path; the typing is bare `string`.
- **Category:** 9 (singular/plural mismatch), 19 (underspecified ID), 1 (vague — no JSDoc).
- **Suggested name:** `inheritedFromObjects: string[]` (plural for plural), or `inheritanceChain: string[]`. Document the element format.
- **Rationale:** Plurality should match the type's plurality; semantics should be JSDoc'd.

### 19. `Client` — `src/v1/client.ts:69`
- **Why weird:** Top-level class named `Client`. Generic across every generated package. Users importing `Client` from multiple permission-adjacent packages (`@databricks/sdk-accessmanagement`, `@databricks/sdk-grants`, `@databricks/sdk-accountaccesscontrol`) must alias all three.
- **Category:** 1 (vague), 12 (cross-package name clash).
- **Suggested name:** `PermissionsClient` or `AccessManagementClient`.
- **Rationale:** SDK convention in AWS, Azure, GitHub Octokit, etc. is service-prefixed client class names.

### 20. `requestObjectType` doc-comment duplication — `src/v1/model.ts:155,162,339,347`
- **Why weird:** Four identical 1-line doc-comments listing all 26 valid object types. The list is 280 characters long and is copy-pasted verbatim into every request type. Any change requires four parallel edits.
- **Category:** Observation, 17 (consistency — all four are identical, so this isn't an inconsistency, but it is fragile).
- **Suggested name:** Define `type RequestObjectType` (see #6) and link to it from a single source of truth.
- **Rationale:** DRY for documentation, type-safe for callers.

### 21. `*Request_Response` underscore-nested proto-message types — `src/v1/model.ts:132,168,211,239`
- **Why weird:** Four types use the proto-style nested-message underscore convention: `DeleteWorkspacePermissionAssignmentRequest_Response`, `GetPermissionLevelsRequest_Response`, `GetWorkspacePermissionAssignmentsRequest_Response`, `ListWorkspacePermissionsRequest_Response`. Each is annotated with `// eslint-disable-next-line @typescript-eslint/naming-convention -- Proto-style nested message name.` — the comment explicitly admits the leak. In proto, a `Response` message can be declared inside the `Request` message, yielding the path `Foo.Request.Response`; the generator flattens this to `FooRequest_Response`. The underscore is wire-format leakage. The corresponding zod schemas (`unmarshalDeleteWorkspacePermissionAssignmentRequest_ResponseSchema`, etc.) carry the same wart at `model.ts:441,454,466,488`.
- **Category:** Proto-architecture leak (underscore-nested proto-message naming), 17 (inconsistent: most response types in this package are top-level `*Response`, only these four use the nested form).
- **Suggested name:** Top-level `DeleteWorkspacePermissionAssignmentResponse`, `GetPermissionLevelsResponse`, `GetWorkspacePermissionAssignmentsResponse`, `ListWorkspacePermissionsResponse`. Remove the `eslint-disable` annotations once renamed.
- **Rationale:** TypeScript has no concept of nested message types; the underscore separator is a proto-specific path encoding. Every consumer importing these types must hand-type the underscore. Same problem flagged generator-wide in `.agent/naming-audit/_SUMMARY.md` (drop `_Response` underscore suffix).

### 22. `PermissionOutput`, `PrincipalOutput`, `WorkspacePermissionAssignmentOutput` — `src/v1/model.ts:250,268,383`
- **Why weird:** Three types ending with `Output`. In proto / gRPC service definitions, message types are commonly named `FooInput` (request) and `FooOutput` (response) — the `Output` suffix is the proto-RPC naming pattern. On the TypeScript surface, `Output` is meaningless: every value is "output" of *something* (a function call, a marshal, a parse). The package uses `Request`/`Response` as the standard envelope suffix and only these three types break the pattern.
- **Category:** Proto-architecture leak (`Output` suffix is proto-RPC convention), 17 (inconsistent: `Request`/`Response` elsewhere, `Output` on these three).
- **Suggested name:** `WorkspacePermission` (already taken by the enum — pick a different domain noun like `WorkspacePermissionDescription`), `Principal`, `WorkspacePermissionAssignment`. Drop the `Output` suffix; the types are concrete domain entities, not RPC payloads.
- **Rationale:** `Output` is wire-format jargon. Compare `principal: PrincipalOutput` to `principal: Principal` — the latter reads as plain English.

### 23. `getAssignableRolesForResourceProxy`, `getRuleSetProxy`, `updateRuleSetProxy` — `src/v1/client.ts:255,329,395`
- **Why weird:** Three methods carry the `Proxy` suffix and are byte-for-byte identical to their non-`Proxy` siblings (lines 218, 292, 366). They issue the same HTTP request to the same URL with the same headers. The `Proxy` suffix communicates an architectural concept — these are the same operation routed through a proxy server in the Databricks control plane — that has zero meaning for a TypeScript SDK caller. From the SDK's perspective, the two methods are indistinguishable.
- **Category:** Proto-architecture leak (`Proxy` suffix mid/end-position is backend-routing jargon, not domain), 12 (duplicate concept: two methods, one operation), 17 (inconsistent: most operations have one method, these have two).
- **Suggested name:** Delete the `*Proxy` variants entirely. If the proxy-routing distinction matters server-side, the server can route the same URL internally; the client should not surface it. If only one variant is the "canonical" one, document that and remove the duplicate.
- **Rationale:** Method-name suffixes should describe what the operation does, not how the server routes it. Two identical methods with a `Proxy` differentiator force every caller to flip a coin.

### 24. `RuleSetUpdateRequest` — `src/v1/model.ts:322`
- **Why weird:** The verb `Update` appears mid-name; the same package's convention elsewhere is `Update<Noun>Request` (see `UpdateRuleSetRequest` on line 354, `UpdateWorkspacePermissionAssignmentRequest` on line 362, `UpdateObjectPermissionsRequest` on line 346). `RuleSetUpdateRequest` swaps the verb to a mid-position attributive — likely because in proto, `RuleSetUpdateRequest` is the *body* type carrying the patch payload, while `UpdateRuleSetRequest` is the *RPC* envelope carrying both the routing path and the body. The `Update` mid-position is wire-format leakage from the proto `UpdateRuleSetRequest { string name; RuleSetUpdateRequest rule_set; }` shape. From the TS surface, two `Update`-something types in the same file with different positions of `Update` is jarring.
- **Category:** Proto-architecture leak (mid-position action verb from proto request-envelope/body split), 17 (inconsistent naming with the same-package `Update*Request` types).
- **Suggested name:** `RuleSetUpdate` (a patch object), or fold the fields into `UpdateRuleSetRequest` directly and remove the inner envelope.
- **Rationale:** The proto convention of "outer RPC request + inner body message" doesn't translate to TS — you can just put all fields on one request type. The `*UpdateRequest` mid-position verb only exists because of that envelope split.

### 25. `flattenQueryParams` (utility) — `src/v1/utils.ts:123`
- **Why weird:** Generic generated helper exported into every package. Now used by `checkPolicy` (`client.ts:536,545,555`), so no longer a dead export here. Still suffers the same problem documented in `.agent/naming-audit/grants.md` #37: the helper is identical across packages and should live in a shared `@databricks/sdk-core` module rather than be re-emitted per package.
- **Category:** 11 (effectively-internal exports), Observation.
- **Suggested name:** Move to a shared `@databricks/sdk-core` util; keep name `flattenQueryParams` (already descriptive).
- **Rationale:** Generator emits the same helper into every package; consolidation reduces surface and tree-shake risk.

---

## Low severity

### 26. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:64`
- **Why weird:** `Segment` is a generic word; the constant carries User-Agent identity but the name communicates nothing. Same wart appears in every generated package.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Cross-package consistency.

### 27. `readAll` (utility) — `src/v1/utils.ts:40`
- **Why weird:** Internal helper name generic to the point of meaninglessness; clashes cognitively with `Array.prototype` methods and Web Streams APIs. Same pattern called out in `.agent/naming-audit/grants.md` #38. The function name is also a direct Go-port of `io.ReadAll`.
- **Category:** 1 (vague), 14 (Go-style).
- **Suggested name:** `readStreamToEnd`, `drainStream`, or `bufferStream`.
- **Rationale:** Cross-package consistency.

### 28. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Another `Options`-suffixed type; the file also imports `Options` (line 3) and `CallOptions` (line 12), so three `Options` types are in scope at once. The `HttpCallOptions` is internal — purely a context bag for `executeHttpCall`.
- **Category:** 1 (vague suffix), 17 (inconsistent — internal struct shouldn't share a suffix with the user-facing CallOptions).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing option structs. Same finding as `grants.md` #40.

### 29. `updateObjectPermissions` uses PATCH but the type says "Update" — `src/v1/client.ts:500,513`
- **Why weird:** Method `updateObjectPermissions` issues HTTP `PATCH` (line 513). The request type `UpdateObjectPermissionsRequest` is symmetric in name to `SetObjectPermissionsRequest` (PUT) — but the semantics differ: PUT replaces, PATCH merges. The naming gives no hint of this. A user reading both method names side-by-side (`set...` and `update...`) might reasonably assume both perform full replacement.
- **Category:** 17 (inconsistent action verbs), Observation.
- **Suggested name:** `patchObjectPermissions` for the PATCH method, OR explicit JSDoc on `update*` clarifying merge semantics.
- **Rationale:** Method verbs should hint at HTTP semantics; `set` vs `update` is ambiguous when both exist on the same resource.

---

### 30. `kind` discriminated-union field on `Actor` — `src/v1/model.ts:96`
- **Why weird:** `Actor.kind?: { $case: 'actorId'; actorId: number } | undefined` — the `kind` field name is a direct port of the proto `oneof kind { ... }` block convention. In proto, every `oneof` block has a developer-supplied name (commonly `kind`, `value`, or `data`); the convention bleeds straight into the generated TS as a field literally named `kind`. With a single-variant union (only `actorId`), the entire discriminator is dead weight — there's nothing else it could be.
- **Category:** Proto-architecture leak (`oneof` block name `kind` carried verbatim), 1 (vague).
- **Suggested name:** Flatten to `actorId?: number | undefined` directly on `Actor`. If a future variant gets added, then introduce a discriminated union with a meaningful discriminator name (e.g., `principal` per #10 — `userName`, `groupName`, `servicePrincipalName`).
- **Rationale:** A single-variant discriminated union is a proto modeling artifact, not a domain concept.

---

## Observations

### 31. Three response paths converge on `PermissionsResponse`
`getObjectPermissions`, `setObjectPermissions`, and `updateObjectPermissions` all return the same `PermissionsResponse` type (`client.ts:424,477,503`). This is fine functionally but means callers can't distinguish "the state I just wrote" from "the state I just read" by type — only by which method was called. For an audit log or comparison flow, this loses information. Naming-adjacent because the type carries no read/write/post-update distinction.
- **Category:** Observation.

### 32. Doc-comment list of object types is potentially stale
The hardcoded list in `requestObjectType` doc-comments includes `database-projects`, `genie`, `knowledge-assistants`, `supervisor-agents` — all relatively new product surfaces. The list will need updating with every new permission-able workspace object. As-is the SDK has 26; if not regularly synced with the server, the JSDoc will drift.
- **Category:** Observation.

### 33. No pagination — all methods are unpaginated single-call
Unlike `grants` (which has both unpaginated `Get*` and paginated `List*` methods, see `grants.md` #41), the permissions surface has no listing operation over workspace objects. Every method here is by-object-id; there's no "list all permissioned objects" surface. This is correct for the API but worth noting because users coming from `grants` (or `accountaccesscontrol`) might expect parallel list semantics. Naming-adjacent because the absence of `list*` here aligns the method-vocabulary differently than its sibling packages.
- **Category:** Observation.

---

## Fixed

- #1 `GetObjectPermissions` (originally cited at `src/v1/model.ts:79`): Fixed in regeneration on 2026-05-20 — renamed to `GetObjectPermissionsRequest` (now `accessmanagement/src/v1/model.ts:154`), eliminating the verb-shaped type.
- #2 `SetObjectPermissions` (originally cited at `src/v1/model.ts:115`): Fixed in regeneration on 2026-05-20 — renamed to `SetObjectPermissionsRequest` (now `accessmanagement/src/v1/model.ts:338`), eliminating the verb-shaped type.
- #3 `UpdateObjectPermissions` (originally cited at `src/v1/model.ts:123`): Fixed in regeneration on 2026-05-20 — renamed to `UpdateObjectPermissionsRequest` (now `accessmanagement/src/v1/model.ts:346`), eliminating the verb-shaped type.
- #4 `GetPermissionLevels` (originally cited at `src/v1/model.ts:86`): Fixed in regeneration on 2026-05-20 — renamed to `GetPermissionLevelsRequest` (now `accessmanagement/src/v1/model.ts:161`), eliminating the verb-shaped type.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
