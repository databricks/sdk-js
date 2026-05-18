# Naming Audit — `@databricks/sdk-bundle` (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/bundle/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Databricks Asset Bundles (DAB) — control-plane registry for `databricks bundle deploy`/`destroy` runs.

---

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 7     |
| Medium       | 13    |
| Low          | 10    |
| Observation  | 6     |
| **Total**    | **36** |

Dominant themes:
1. **Pervasive redundant enum prefixes.** All seven enums repeat the type name on every member (`DEPLOYMENT_STATUS_ACTIVE`, `VERSION_TYPE_DEPLOY`, etc.) — 50+ values affected — which is a Go/Protobuf carry-over that hurts TS ergonomics.
2. **`VersionComplete` is a misleading type name.** It is a noun that reads like a boolean predicate, but it actually carries a completion *reason* enum; the type, the field that holds it (`completionReason`), and the values disagree on terminology.
3. **`Resource` / `Operation` `name` is the qualified path, not a display name** — semantic overload of `name` recurs on every entity, while a separate `displayName` field also exists on `Deployment`/`Version`. Pure Google-AIP carry-over that loses meaning in TS.
4. **"Bundle" is in the URL but absent from type names**, while `DeploymentResourceType` (the domain catalog) is unrelated to the `Resource` interface (the per-deployment tracked item) — two distinct concepts share a confusable root.

---

## High-Severity Findings

### H1. `VersionComplete` enum name is misleading (Category: 6 — misleading; 13 — verb-tense)

**Location:** `model.ts:127-137`, exported `index.ts:11`.

```ts
export enum VersionComplete {
  VERSION_COMPLETE_UNSPECIFIED = ...,
  VERSION_COMPLETE_SUCCESS = ...,
  VERSION_COMPLETE_FAILURE = ...,
  VERSION_COMPLETE_FORCE_ABORT = ...,
  VERSION_COMPLETE_LEASE_EXPIRED = ...,
}
```

The type *describes the reason a version finished*, but the identifier `VersionComplete` reads either as an adjective ("the version [is] complete") or an imperative verb ("complete the version"). The corresponding field is `completionReason: VersionComplete` (`Version.completionReason`, `CompleteVersionRequest.completionReason`), and the docstring says "Reason why a version was completed", so the type itself should be `VersionCompletionReason` (or `CompletionReason`). The current name forces the reader to inspect each call site to discover the type's role.

Compounding the issue: the `complete` action lives on a *method* called `completeVersion()` (`client.ts:102`), so `VersionComplete` and `completeVersion` look related but mean different things — one is an enum of post-hoc reasons, the other is the imperative action.

**Suggested rename:** `VersionCompletionReason` or `CompletionReason`. The value prefix would then read `VERSION_COMPLETION_REASON_SUCCESS`, which matches the field name verbatim.

---

### H2. Redundant enum-member prefixes throughout (Category: 2 — redundant enum prefixes; 18 — long enum values)

**Location:** every enum in `model.ts:19-155`.

```ts
DeploymentResourceType.DEPLOYMENT_RESOURCE_TYPE_JOB
DeploymentStatus.DEPLOYMENT_STATUS_ACTIVE
OperationActionType.OPERATION_ACTION_TYPE_BIND_AND_UPDATE
OperationStatus.OPERATION_STATUS_SUCCEEDED
VersionComplete.VERSION_COMPLETE_LEASE_EXPIRED
VersionStatus.VERSION_STATUS_IN_PROGRESS
VersionType.VERSION_TYPE_DEPLOY
```

Every member of every enum re-states the enum name. This is a Protobuf/Go habit that does not survive the port: in TypeScript the call site is already `DeploymentStatus.X`. The most extreme cases are `OPERATION_ACTION_TYPE_INITIAL_REGISTER`, `DEPLOYMENT_RESOURCE_TYPE_MODEL_SERVING_ENDPOINT`, and `DEPLOYMENT_RESOURCE_TYPE_SYNCED_DATABASE_TABLE` (46+ characters).

**Note:** because the enum *values* are sent on the wire (the schemas in `model.ts:728-842` use `z.enum(EnumName)` which preserves the string form), the string values themselves must remain `'DEPLOYMENT_RESOURCE_TYPE_MODEL'` etc. — but the *identifier* on the enum can be shortened (`DeploymentResourceType.Model = 'DEPLOYMENT_RESOURCE_TYPE_MODEL'`). This is the common TS solution but is not currently applied.

**Affected enums:** all seven (`DeploymentResourceType`, `DeploymentStatus`, `OperationActionType`, `OperationStatus`, `VersionComplete`, `VersionStatus`, `VersionType`) — ~50 identifiers.

---

### H3. Underscores in TypeScript identifiers (Category: 4 — underscores in TS)

**Location:** all enum members in `model.ts:19-155`.

All enum member identifiers use `SCREAMING_SNAKE_CASE` (`DEPLOYMENT_STATUS_ACTIVE`, `OPERATION_ACTION_TYPE_BIND_AND_UPDATE`, etc.). The Google TS style guide and ESLint `@typescript-eslint/naming-convention` rule both forbid underscores in identifiers (the convention is `PascalCase` for enum members). The wire-value strings on the right-hand side can keep the underscores, but the identifiers should be `Active`, `BindAndUpdate`, `InitialRegister`, etc.

This is the same root cause as H2 but tracked separately because it is a hard style-guide violation regardless of redundancy.

---

### H4. `name` field is semantically overloaded across every entity (Category: 6 — misleading; 12 — duplicate concepts)

**Location:** `model.ts` — `Deployment.name`, `Operation.name`, `Resource.name`, `Version.name`, and on every request type (`CompleteVersionRequest.name`, `DeleteDeploymentRequest.name`, `GetDeploymentRequest.name`, `GetOperationRequest.name`, `GetResourceRequest.name`, `GetVersionRequest.name`, `HeartbeatRequest.name`).

`name` is *not* a human-readable name — it is the fully-qualified resource path (`deployments/{deployment_id}/versions/{version_id}/operations/{resource_key}`). The actual human name lives in `displayName` on `Deployment` and `Version`. TypeScript users coming from non-Google APIs will read `deployment.name` and reasonably expect a string the user typed.

Additionally, *all* request types reuse the field name `name` for entirely different scopes:
- `GetDeploymentRequest.name` → a deployment path.
- `GetOperationRequest.name` → an operation path (4 segments).
- `HeartbeatRequest.name` → a version path.
- `CompleteVersionRequest.name` → a version path.

A reader cannot tell what `name` means without consulting the docstring of each request.

**Suggested rename:** `resourceName` (matches the docstrings) or, even better, per-request specifics (`deploymentName`, `versionName`, `operationName`). At minimum, model entities should use a different field (`path` / `qualifiedName` / `resourceName`) so that "name" is freed up for the human-readable label.

---

### H5. `DeploymentResourceType` enum and `Resource` interface share a confusable root concept (Category: 12 — duplicate concepts; 1 — vague)

**Location:** `model.ts:19` (`DeploymentResourceType`) versus `model.ts:487-511` (`Resource`).

These are two distinct things:
- `DeploymentResourceType` — a *taxonomy* enum of what kinds of Databricks objects a bundle can manage (`JOB`, `PIPELINE`, `CLUSTER`, …).
- `Resource` — a *tracked record* within a deployment, with a `resourceType` field of type `DeploymentResourceType`.

Both will appear together in autocomplete (`Resource`, `Resource.resourceType: DeploymentResourceType`, `Resource.resourceKey`, `Resource.resourceId`), and a user can easily mistake `Resource` for the enum or vice-versa. The naming `Resource.resourceType` is also tautological — `Resource` already implies a resource, so `Resource.type` (typed as `DeploymentResourceType`) is enough.

Compounding this: `Resource.resourceKey` (a key *within the bundle config*, e.g. `"jobs.foo"`) and `Resource.resourceId` (the actual workspace ID, e.g. a job ID) are dangerously similar. Both are strings, both contain "resource", differing only by `Key` vs. `Id`. Easy to swap by accident.

**Suggested renames:** `Resource.type` (instead of `resourceType`), `Resource.bundleKey` or `Resource.configKey` (instead of `resourceKey`), `Resource.workspaceId` (instead of `resourceId`). Same renames apply to `Operation.resourceKey`, `Operation.resourceId`, and `CreateOperationRequest.resourceKey`.

---

### H6. "Bundle" is missing from every type name despite being the package name (Category: 14 — Go/Java-style; 15 — generic names losing meaning)

**Location:** all exported types in `model.ts`, `index.ts:5-39`.

The package is `@databricks/sdk-bundle` and every URL has `/api/2.0/bundle/`, yet not one type is `Bundle*`. Instead, the top-level entity is `Deployment` — extremely generic in TypeScript, where "deployment" appears in dozens of unrelated packages (jobs, model serving, apps, etc.). Outside the namespace, `Deployment` says nothing.

Worse: `Deployment` also unrelatedly resembles `DeploymentResourceType` (see H5), and `DeploymentStatus` is used both on the top-level deployment *and* describes one of the lifecycle terms `DELETED` that does not match the more recent `destroyTime` lifecycle. From outside this package, the type `Deployment` is non-self-describing.

Note: the user-supplied glossary explicitly flags "Bundle" as overloaded. The package solves the overload by *avoiding the word*, but this swap is not free — it just moves the ambiguity from "Bundle" to "Deployment".

**Suggested rename:** `BundleDeployment` (or keep `Deployment` if internal consistency is preferred — but then export an aliased `BundleDeployment` for downstream consumers). At minimum, `Deployment` should be in the package-level JSDoc as "a bundle deployment", which the docstring on the interface already says.

---

### H7. `HeartbeatRequest` / `HeartbeatResponse` and `heartbeat()` use a bare noun where the verb is `renew` (Category: 6 — misleading; 17 — inconsistent action verbs)

**Location:** `model.ts:304-316`, `client.ts:398-421`.

The semantics described in the docstring (`client.ts:391-397`) are *renew the lock on a version*. The method name `heartbeat` is a bare noun, not a verb. The other RPCs use action verbs: `createX`, `getX`, `deleteX`, `listX`, `completeX`. Only `heartbeat` is a noun. Worse, the return type `HeartbeatResponse` only carries `expireTime` — the new lock expiry — which is the *result of renewal*, not a "heartbeat response".

**Suggested renames:**
- Method `heartbeat()` → `renewLock()` or `renewVersionLock()`.
- Type `HeartbeatRequest` → `RenewLockRequest`.
- Type `HeartbeatResponse` → `RenewLockResponse`.

---

## Medium-Severity Findings

### M1. `Resource.resourceKey` doc says "Can be an arbitrary UTF-8 encoded string key" — name doesn't hint at format (Category: 19 — underspecified)

**Location:** `model.ts:453-458`.

`resourceKey` is overloaded: it can be `"jobs.foo"`, `"pipelines.bar"`, `"jobs.foo.permissions"`, or `"files.<rel-path>"`. The name `resourceKey` does not convey that it is a *dotted bundle config path*. `bundleConfigPath` or `configKey` would be more honest.

---

### M2. `Operation.resourceId` and `Resource.resourceId` mix two different "IDs" with the deployment/version IDs (Category: 5 — cryptic; 19 — underspecified)

**Location:** `model.ts:469`, `model.ts:503`, plus `CreateDeploymentRequest.deploymentId` (`model.ts:185`), `CreateVersionRequest.versionId` (`model.ts:220`), `Version.versionId` (`model.ts:527`), `Deployment.lastVersionId` (`model.ts:246`), `Resource.lastVersionId` (`model.ts:508`).

`resourceId` is *the workspace ID of the underlying job/pipeline/etc.*, but `deploymentId` and `versionId` are *control-plane IDs internal to this service*. These three live side-by-side and look like they're all the same "kind" of ID, but they're not. A `workspaceId` / `workspaceObjectId` rename for `resourceId` would resolve this — the comment on the field literally says "actual resource in the workspace".

---

### M3. `lastVersionId` exists on both `Deployment` and `Resource` with subtly different meaning (Category: 12 — duplicate; 16 — field contradicting type domain)

**Location:** `Deployment.lastVersionId` (`model.ts:246`), `Resource.lastVersionId` (`model.ts:508`).

- `Deployment.lastVersionId` = "the most recent deployment version" (any version).
- `Resource.lastVersionId` = "the last version where this resource was updated" (the most recent version *that touched this resource*).

These should be named distinctly: `Deployment.latestVersionId` vs. `Resource.lastTouchedVersionId` (or `Resource.lastUpdatedInVersionId`). As written, the names are identical and the difference is buried in docstrings.

---

### M4. `Resource.lastActionType` vs. `Operation.actionType` — same type, slightly different name (Category: 13 — verb-tense; 17 — inconsistent)

**Location:** `model.ts:460` (`Operation.actionType`), `model.ts:506` (`Resource.lastActionType`).

`Operation.actionType` is the action *of this operation*, `Resource.lastActionType` is the action *of the most recent operation*. The "last" prefix is the convention — that's fine — but pairing with M3 there's no consistent rule (the version field is plain `lastVersionId` without an explicit "last" affix differentiator; the action field is `lastActionType`). Picking one convention (`last*` everywhere, including `lastActionType` and `lastVersionId`) is fine, but make sure both follow the same template.

Also: `actionType` (and `OperationActionType`) is itself tautological — `Operation` already implies action. `Operation.kind` or just `Operation.action: OperationAction` would suffice.

---

### M5. `OperationActionType` enum name has the "action type" tautology (Category: 20 — type-suffix tautology)

**Location:** `model.ts:83`.

Reads as "the type of action type of operation". One of "action" or "type" is redundant. Pick `OperationAction` (the kind/category of an operation) or even `BundleAction`.

---

### M6. `DeploymentResourceType` is also tautological in compound form (Category: 20 — type-suffix tautology)

**Location:** `model.ts:19`.

Reads as "deployment resource type", but the enum is the *catalog of resource kinds*, not a property of deployment. Just `ResourceKind` (or `BundleResourceKind` if you want to disambiguate from the `Resource` interface) would suffice. See H5 for the broader confusion.

---

### M7. `completionReason` vs. enum `VersionComplete` mismatch (Category: 17 — inconsistent action verbs)

**Location:** `Version.completionReason` (`model.ts:544`), `CompleteVersionRequest.completionReason` (`model.ts:169`).

The field is `completionReason` (noun "reason" with "completion" adjective). The type is `VersionComplete` (no "Reason" suffix). Wire JSON is `completion_reason`. If the type is renamed per H1 to `VersionCompletionReason`, everything aligns.

---

### M8. `VersionComplete` enum value `VERSION_COMPLETE_FORCE_ABORT` is a verb phrase where others are nouns (Category: 13 — verb-tense)

**Location:** `model.ts:133`.

The enum values are:
- `SUCCESS` — noun.
- `FAILURE` — noun.
- `FORCE_ABORT` — verb phrase ("force abort").
- `LEASE_EXPIRED` — past-participle phrase.

Three different grammatical structures for what should be parallel completion reasons. The docstring on `FORCE_ABORT` says "was force-aborted by another user" — so `FORCE_ABORTED` (past participle) would parallel `LEASE_EXPIRED`, and noun forms (`SUCCESS`, `FAILURE`, `FORCED_ABORT`, `LEASE_EXPIRATION`) would be even more parallel.

---

### M9. Method `heartbeat()` collides with idiomatic "is-alive" connotation (Category: 6 — misleading; 7 — overly verbose interactions)

**Location:** `client.ts:398`.

In most APIs, `heartbeat()` is a *liveness check* (e.g. "is server up?"). Here it actively *mutates server state* (renews a lock). The verb suggests a read but it's a write. See H7 for suggested rename to `renewLock`.

---

### M10. `Version.versionType` field — Java/Go-style redundancy (Category: 20 — type-suffix tautology; 14 — Go/Java)

**Location:** `model.ts:539`.

`version.versionType` reads as "the version type of the version". Prefer `Version.type: VersionType` (or rename the enum to `VersionKind`, see M11). Same root issue as `Resource.resourceType` and `Operation.actionType`.

---

### M11. `VersionType` enum is generic, values prepended with `VERSION_TYPE_` (Category: 1 — vague)

**Location:** `model.ts:149`.

`VersionType` could be anything (semantic version? major/minor?). What it actually means is "deploy or destroy". `VersionKind` (or `BundleCommand`/`CliCommand`) is clearer. Values would shrink to `Deploy`/`Destroy`.

---

### M12. `Resource.state` and `Operation.state` use the same field name for different snapshots (Category: 15 — generic; 12 — duplicate)

**Location:** `Resource.state` (`model.ts:499`), `Operation.state` (`model.ts:465`).

`state` here means "serialized config blob the CLI sent" — but `state` is one of the most overloaded terms in software. The docstrings clarify ("Serialized local config state"), but the names don't. `configState`, `configSnapshot`, or `state` distinct from `status` would help. Note `Resource.state` and `Resource.status`-style field would collide alphabetically in IDE autocomplete; there is currently no `Resource.status`, so `state` is at least non-conflicting.

---

### M13. `errorMessage` on `Operation` is set only on failure but always typed `string | undefined` (Category: 6 — misleading; 15 — generic)

**Location:** `model.ts:480`.

Field name doesn't suggest tight coupling to `status === FAILED`. Could be `failureMessage` or `failureReason` to mirror `VersionComplete` style. Minor, but `failureMessage` reads more honestly.

---

## Low-Severity Findings

### L1. `createdBy` vs. `destroyedBy` vs. `completedBy` past-tense consistency is good, but `targetName` is uncommented

**Location:** `Deployment.createdBy` (`model.ts:248`), `Deployment.destroyedBy` (`model.ts:264`), `Version.completedBy` (`model.ts:550`).

All three are well-named (`createdBy`, `destroyedBy`, `completedBy`). However, `Deployment.targetName` and `Version.targetName` are not parallel — they're not actor names, they're the bundle's *target* (a config concept). A reader might miscategorize on autocomplete. Consider `bundleTargetName` for explicitness.

---

### L2. `destroyTime` / `destroyedBy` naming carry over from the destroy-vs-delete distinction (Category: 6 — misleading)

**Location:** `Deployment.destroyTime` (`model.ts:259`), `Deployment.destroyedBy` (`model.ts:264`).

The comment on `destroyTime` explicitly justifies the divergence from `deleteTime` ("Named destroy_time (not delete_time) because this tracks the `databricks bundle destroy` command, not the API-level deletion"). That is a sensible choice, but worth noting that a reader scanning the field list sees `createTime`, `updateTime`, `destroyTime` and may mistakenly think it equals "delete time" (since `DeploymentStatus.DELETED` exists). Could keep `destroyTime` but rename the enum value to `DEPLOYMENT_STATUS_DESTROYED` for consistency. Currently the enum is `DELETED` while the lifecycle event is `destroy`.

---

### L3. `cliVersion` — abbreviation acceptable but flag for awareness (Category: 5 — cryptic abbreviation; 3 — acronym casing)

**Location:** `Version.cliVersion` (`model.ts:535`).

`cli` is a well-known acronym (Command-Line Interface) so the abbreviation is fine, but the casing `cliVersion` (lowercase `cli`) is inconsistent with Google's TS rule that acronyms are PascalCase as a word (i.e. `cliVersion` is correct camelCase, but `Cli` rather than `CLI` is the convention — check the rest of the SDK for consistency). Wire form is `cli_version` which is fine.

---

### L4. `force` field is a boolean adverb, not a noun (Category: 1 — vague; 6 — misleading)

**Location:** `CompleteVersionRequest.force` (`model.ts:175`).

`force: boolean` is widely understood but extremely generic. The docstring says "force-completes the version even if the caller is not the original creator" — so `forceComplete` or `overrideOwnership` would be more honest. Bare `force` makes you read the docs to know what it forces.

---

### L5. `parent` field on request types is generic (Category: 15 — generic; 1 — vague)

**Location:** `CreateOperationRequest.parent` (`model.ts:196`), `CreateVersionRequest.parent` (`model.ts:212`), `ListOperationsRequest.parent` (`model.ts:351`), `ListResourcesRequest.parent` (`model.ts:383`), `ListVersionsRequest.parent` (`model.ts:415`).

This is a Google AIP carry-over. `parent` is meaningful inside Google's resource hierarchy convention but loses meaning in TS where IDEs will surface it without context. Could be `deploymentName` (for `Create*Request`/`List*Request` whose parent is a deployment) or `versionName` (for `CreateOperationRequest`/`ListOperationsRequest` whose parent is a version). Different request types use `parent` for different scopes — same problem as `name` (see H4).

---

### L6. `pageSize` / `pageToken` / `nextPageToken` are consistent with Google AIP — fine

**Location:** all `List*Request`/`List*Response` types.

No issue, just noting these names are uniform and correct.

---

### L7. `Operation` interface name collides with `Operation` from `@databricks/sdk-databricks` long-running-ops (Category: 12 — duplicate concepts)

**Location:** `Operation` (`model.ts:441-481`).

In many Databricks/Google APIs, `Operation` is the LRO (Long-Running Operation) pattern from `google.longrunning.Operation`. Here, `Operation` is a *resource operation row in a deployment version*. Same name, totally different concept. Importing both into the same file would collide. `ResourceOperation` would disambiguate. Check across other packages (`packages/databricks`, etc.) for an existing `Operation` type.

---

### L8. `Resource.resourceKey` vs `Operation.resourceKey` — same name, same role (good)

**Location:** `model.ts:497`, `model.ts:458`.

This is correct re-use — both reference the same bundle config path. No issue. Noted for completeness.

---

### L9. `deployments` request method names vs URL path consistency

**Location:** `Client.listDeployments` → `/api/2.0/bundle/deployments` (`client.ts:428`).

The URL is `/api/2.0/bundle/deployments` (`/api/2.0/{service}/{resource}`). The method `listDeployments` matches. No issue, just noting the package's external resource is named "deployment" and the package is named "bundle", reinforcing the H6 observation that "Bundle" is in the URL but absent from type names.

---

### L10. Acronym casing in `cliVersion`, `versionId`, `expireTime` — check SDK-wide

**Location:** `Version.cliVersion` (`model.ts:535`), `Version.versionId` (`model.ts:527`), `HeartbeatResponse.expireTime` (`model.ts:315`).

`expireTime` is a verb (or noun) form that differs from `createTime` (gerund-like) and `updateTime`. `expirationTime` would parallel `creationTime`. Or rename the others to `createdAt` / `updatedAt` / `expiresAt` style. The SDK has presumably picked a convention — note for cross-package consistency.

---

## Observations (Non-Defects)

### O1. JSDoc on the `state` fields is good

`Resource.state` and `Operation.state` both clearly say "Serialized local config state". Naming could improve (M12) but doc-level disambiguation is solid.

### O2. Pagination wire shape is uniform and correct

`pageSize`, `pageToken`, `nextPageToken` — all four `List*Request`/`List*Response` pairs are mechanically identical on the wire.

### O3. `Resource.state` is `JsonValue` from `@databricks/sdk-core/wkt` — correct typing

The `jsonValueSchema` (recursive Zod) is a clean port pattern. The field type is correct; the *name* is what is generic (see M12).

### O4. Method `getResource` returns `Resource`, no naming collision

`client.ts:341` returns `Resource` (the per-deployment tracked resource). No confusion with `DeploymentResourceType` here at the *method* level — only at the *interface* level (H5).

### O5. Comment on the `name`-vs-`destroy` divergence is appreciated

`Deployment.destroyTime` has an in-code justification (`model.ts:255-258`) explaining why it's not `deleteTime`. This kind of inline rationale is exactly what's missing on the `name` overload — a one-line "this is a fully-qualified resource path, not a display name" would help readers (see H4).

### O6. The `HeartbeatResponse.expireTime` field has no `Lease`/`Lock` prefix

The docstring says "new lock expiry time", but the field is just `expireTime`. Calling it `lockExpireTime` or `lockExpiresAt` would self-document. Marginal because of H7 (rename the whole method to `renewLock` and the field name becomes obvious from context).

---

## Domain Glossary

| Domain term         | Meaning                                                                                          | Naming concerns?               |
| ------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------ |
| Bundle              | Databricks Asset Bundle — a config-driven project deployed via `databricks bundle deploy`.        | Absent from all type names (H6). |
| Deployment          | A registered bundle in the control plane. One per bundle target. Top-level entity in this API.   | Overloaded with "deploy time" sense; generic outside the package. |
| Version             | A single deploy or destroy *run* of a bundle. Acquires an exclusive lock on the deployment.       | OK; `Version` is clear within the package. |
| Operation           | One resource action (create/update/delete/bind/...) recorded under a version. Append-only.       | Collides with LRO `Operation` (L8). |
| Resource            | A per-deployment record of one Databricks object the bundle manages (a job, a pipeline, etc.).   | Confusable with `DeploymentResourceType` (H5). |
| `resource_key`      | A dotted config path inside the bundle YAML (e.g. `"jobs.foo"`).                                 | Generic name (M1, H5). |
| `resource_id`       | The workspace-scoped ID of the underlying Databricks object (e.g. a job ID, pipeline ID).        | Mixes with control-plane IDs (M2). |
| Heartbeat           | Lock renewal RPC sent by the active CLI while a version is in progress.                          | Misleading name; should be "renew lock" (H7). |
| Target              | A named profile within a bundle (e.g. `dev`, `staging`, `prod`).                                  | `targetName` field on Deployment/Version is OK but could be `bundleTargetName` (L1). |
| Destroy             | The `databricks bundle destroy` command — undeploys a bundle. Distinct from API-level delete.    | Named `destroyTime` (not `deleteTime`) intentionally (L2). |
| Force-abort         | A user other than the version creator forcibly completes the version.                            | `VERSION_COMPLETE_FORCE_ABORT` is the verb form (M8). |
| Lease               | The lock held by a version; renewed by Heartbeat; expires after timeout.                         | Surfaces only in `VERSION_COMPLETE_LEASE_EXPIRED`. |

---

## File Coverage

| File              | Lines | Findings                                                                          |
| ----------------- | ----- | --------------------------------------------------------------------------------- |
| `src/v1/model.ts` | 843   | H1, H2, H3, H4, H5, H6, H7, M1-M13, L1-L5, L7, L8, L10, O1, O3, O5, O6             |
| `src/v1/client.ts`| 630   | H4 (request types), H7 (method name), M9, L9, O4                                  |
| `src/v1/utils.ts` | 151   | (no findings — internal helpers, all well-named: `executeCall`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`, `marshalRequest`, `flattenQueryParams`, `readAll`, `HttpCallOptions`) |
| `src/v1/index.ts` | 40    | Re-exports — inherits findings from `model.ts` and `client.ts`.                   |

Every exported identifier in `model.ts` and `client.ts` was inspected. `utils.ts` and `index.ts` produced no incremental findings beyond what the model/client files surface.
