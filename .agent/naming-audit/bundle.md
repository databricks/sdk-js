# Naming Audit — `@databricks/sdk-bundle` (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/bundle/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Domain:** Databricks Asset Bundles (DAB) — control-plane registry for `databricks bundle deploy`/`destroy` runs.

---

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 3     |
| Medium       | 6     |
| Low          | 6     |
| Observation  | 5     |
| **Total**    | **20** |

Dominant themes:
1. **`VersionComplete` is a misleading type name.** It is a noun that reads like a boolean predicate, but it actually carries a completion *reason* enum; the type, the field that holds it (`completionReason`), and the values disagree on terminology.
2. **"Bundle" is in the URL but absent from type names**, while `DeploymentResourceType` (the domain catalog) is unrelated to the `Resource` interface (the per-deployment tracked item) — two distinct concepts share a confusable root.

---

## High-Severity Findings

### H1. `VersionComplete` enum name is misleading (Category: 6 — misleading; 13 — verb-tense)

**Location:** `model.ts:127-137`, exported `index.ts:10`.

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

**Suggested rename:** `VersionCompletionReason` or `CompletionReason`, which matches the field name (`completionReason`) verbatim.

---

### H2. "Bundle" is missing from every type name despite being the package name (Category: 14 — Go/Java-style; 15 — generic names losing meaning)

**Location:** all exported types in `model.ts`, `index.ts:5-39`.

The package is `@databricks/sdk-bundle` and every URL has `/api/2.0/bundle/`, yet not one type is `Bundle*`. Instead, the top-level entity is `Deployment` — extremely generic in TypeScript, where "deployment" appears in dozens of unrelated packages (jobs, model serving, apps, etc.). Outside the namespace, `Deployment` says nothing.

Worse: `Deployment` also unrelatedly resembles `DeploymentResourceType` (see M2), and `DeploymentStatus` is used both on the top-level deployment *and* describes one of the lifecycle terms `DELETED` that does not match the more recent `destroyTime` lifecycle. From outside this package, the type `Deployment` is non-self-describing.

Note: the user-supplied glossary explicitly flags "Bundle" as overloaded. The package solves the overload by *avoiding the word*, but this swap is not free — it just moves the ambiguity from "Bundle" to "Deployment".

**Suggested rename:** `BundleDeployment` (or keep `Deployment` if internal consistency is preferred — but then export an aliased `BundleDeployment` for downstream consumers). At minimum, `Deployment` should be in the package-level JSDoc as "a bundle deployment", which the docstring on the interface already says.

---

### H3. `HeartbeatRequest` / `HeartbeatResponse` and `heartbeat()` use a bare noun where the verb is `renew` (Category: 6 — misleading; 17 — inconsistent action verbs)

**Location:** `model.ts:304-316`, `client.ts:398-421`.

The semantics described in the docstring (`client.ts:391-397`) are *renew the lock on a version*. The method name `heartbeat` is a bare noun, not a verb. The other RPCs use action verbs: `createX`, `getX`, `deleteX`, `listX`, `completeX`. Only `heartbeat` is a noun. Worse, the return type `HeartbeatResponse` only carries `expireTime` — the new lock expiry — which is the *result of renewal*, not a "heartbeat response".

**Suggested renames:**
- Method `heartbeat()` → `renewLock()` or `renewVersionLock()`.
- Type `HeartbeatRequest` → `RenewLockRequest`.
- Type `HeartbeatResponse` → `RenewLockResponse`.

---

## Medium-Severity Findings

### M1. `OperationActionType` enum name has the "action type" tautology (Category: 20 — type-suffix tautology)

**Location:** `model.ts:83`.

Reads as "the type of action type of operation". One of "action" or "type" is redundant. Pick `OperationAction` (the kind/category of an operation) or even `BundleAction`.

---

### M2. `DeploymentResourceType` is also tautological in compound form (Category: 20 — type-suffix tautology)

**Location:** `model.ts:19`.

Reads as "deployment resource type", but the enum is the *catalog of resource kinds*, not a property of deployment. Just `ResourceKind` (or `BundleResourceKind` if you want to disambiguate from the `Resource` interface) would suffice.

---

### M3. `completionReason` vs. enum `VersionComplete` mismatch (Category: 17 — inconsistent action verbs)

**Location:** `Version.completionReason` (`model.ts:544`), `CompleteVersionRequest.completionReason` (`model.ts:169`).

The field is `completionReason` (noun "reason" with "completion" adjective). The type is `VersionComplete` (no "Reason" suffix). Wire JSON is `completion_reason`. If the type is renamed per H1 to `VersionCompletionReason`, everything aligns.

---

### M4. `VersionComplete` enum values use inconsistent grammatical forms (Category: 13 — verb-tense)

**Location:** `model.ts:128-136`.

The completion-reason values mix grammatical structures:
- `Success` — noun.
- `Failure` — noun.
- `ForceAbort` — verb phrase ("force abort").
- `LeaseExpired` — past-participle phrase.

Three different grammatical structures for what should be parallel completion reasons. The docstring on the force-abort value says "was force-aborted by another user" — so `ForceAborted` (past participle) would parallel `LeaseExpired`, and noun forms (`Success`, `Failure`, `ForcedAbort`, `LeaseExpiration`) would be even more parallel.

---

### M5. Method `heartbeat()` collides with idiomatic "is-alive" connotation (Category: 6 — misleading; 7 — overly verbose interactions)

**Location:** `client.ts:398`.

In most APIs, `heartbeat()` is a *liveness check* (e.g. "is server up?"). Here it actively *mutates server state* (renews a lock). The verb suggests a read but it's a write. See H3 for suggested rename to `renewLock`.

---

### M6. `VersionType` enum is generic (Category: 1 — vague)

**Location:** `model.ts:149`.

`VersionType` could be anything (semantic version? major/minor?). What it actually means is "deploy or destroy". `VersionKind` (or `BundleCommand`/`CliCommand`) is clearer. Values would shrink to `Deploy`/`Destroy`.

---

## Low-Severity Findings

### L1. `destroyTime` / `destroyedBy` naming carry over from the destroy-vs-delete distinction (Category: 6 — misleading)

**Location:** `Deployment.destroyTime` (`model.ts:259`), `Deployment.destroyedBy` (`model.ts:264`).

The comment on `destroyTime` explicitly justifies the divergence from `deleteTime` ("Named destroy_time (not delete_time) because this tracks the `databricks bundle destroy` command, not the API-level deletion"). That is a sensible choice, but worth noting that a reader scanning the field list sees `createTime`, `updateTime`, `destroyTime` and may mistakenly think it equals "delete time" (since the `Deleted` lifecycle value on `DeploymentStatus` exists). Could keep `destroyTime` but rename the enum value to `Destroyed` for consistency. Currently the enum value is `Deleted` while the lifecycle event is `destroy`.

---

### L2. `cliVersion` — abbreviation acceptable but flag for awareness (Category: 5 — cryptic abbreviation; 3 — acronym casing)

**Location:** `Version.cliVersion` (`model.ts:535`).

`cli` is a well-known acronym (Command-Line Interface) so the abbreviation is fine, but the casing `cliVersion` (lowercase `cli`) is inconsistent with Google's TS rule that acronyms are PascalCase as a word (i.e. `cliVersion` is correct camelCase, but `Cli` rather than `CLI` is the convention — check the rest of the SDK for consistency). Wire form is `cli_version` which is fine.

---

### L3. `pageSize` / `pageToken` / `nextPageToken` are consistent with Google AIP — fine

**Location:** all `List*Request`/`List*Response` types.

No issue, just noting these names are uniform and correct.

---

### L4. `Operation` interface name collides with `Operation` from `@databricks/sdk-databricks` long-running-ops (Category: 12 — duplicate concepts)

**Location:** `Operation` (`model.ts:441-481`).

In many Databricks/Google APIs, `Operation` is the LRO (Long-Running Operation) pattern from `google.longrunning.Operation`. Here, `Operation` is a *resource operation row in a deployment version*. Same name, totally different concept. Importing both into the same file would collide. `ResourceOperation` would disambiguate. Check across other packages (`packages/databricks`, etc.) for an existing `Operation` type.

---

### L5. `Resource.resourceKey` vs `Operation.resourceKey` — same name, same role (good)

**Location:** `model.ts:497`, `model.ts:458`.

This is correct re-use — both reference the same bundle config path. No issue. Noted for completeness.

---

### L6. `deployments` request method names vs URL path consistency

**Location:** `Client.listDeployments` → `/api/2.0/bundle/deployments` (`client.ts:428`).

The URL is `/api/2.0/bundle/deployments` (`/api/2.0/{service}/{resource}`). The method `listDeployments` matches. No issue, just noting the package's external resource is named "deployment" and the package is named "bundle", reinforcing the H2 observation that "Bundle" is in the URL but absent from type names.

---

## Observations (Non-Defects)

### O1. JSDoc on the `state` fields is good

`Resource.state` and `Operation.state` both clearly say "Serialized local config state". Doc-level disambiguation is solid.

### O2. Pagination wire shape is uniform and correct

`pageSize`, `pageToken`, `nextPageToken` — all four `List*Request`/`List*Response` pairs are mechanically identical on the wire.

### O3. `Resource.state` is `JsonValue` from `@databricks/sdk-core/wkt` — correct typing

The `jsonValueSchema` (recursive Zod) is a clean port pattern. The field type is correct.

### O4. Method `getResource` returns `Resource`, no naming collision

`client.ts:341` returns `Resource` (the per-deployment tracked resource). No confusion with `DeploymentResourceType` here at the *method* level.

### O5. Comment on the `name`-vs-`destroy` divergence is appreciated

`Deployment.destroyTime` has an in-code justification (`model.ts:256-257`) explaining why it's not `deleteTime`. This kind of inline rationale is exactly what's missing on other overloaded fields.

---

## Domain Glossary

| Domain term         | Meaning                                                                                          | Naming concerns?               |
| ------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------ |
| Bundle              | Databricks Asset Bundle — a config-driven project deployed via `databricks bundle deploy`.        | Absent from all type names (H2). |
| Deployment          | A registered bundle in the control plane. One per bundle target. Top-level entity in this API.   | Overloaded with "deploy time" sense; generic outside the package. |
| Version             | A single deploy or destroy *run* of a bundle. Acquires an exclusive lock on the deployment.       | OK; `Version` is clear within the package. |
| Operation           | One resource action (create/update/delete/bind/...) recorded under a version. Append-only.       | Collides with LRO `Operation` (L4). |
| Resource            | A per-deployment record of one Databricks object the bundle manages (a job, a pipeline, etc.).   | Confusable with `DeploymentResourceType`. |
| `resource_key`      | A dotted config path inside the bundle YAML (e.g. `"jobs.foo"`).                                 | — |
| `resource_id`       | The workspace-scoped ID of the underlying Databricks object (e.g. a job ID, pipeline ID).        | — |
| Heartbeat           | Lock renewal RPC sent by the active CLI while a version is in progress.                          | Misleading name; should be "renew lock" (H3). |
| Target              | A named profile within a bundle (e.g. `dev`, `staging`, `prod`).                                  | — |
| Destroy             | The `databricks bundle destroy` command — undeploys a bundle. Distinct from API-level delete.    | Named `destroyTime` (not `deleteTime`) intentionally (L1). |
| Force-abort         | A user other than the version creator forcibly completes the version.                            | The `ForceAbort` completion value uses a verb phrase while siblings are nouns (M4). |
| Lease               | The lock held by a version; renewed by Heartbeat; expires after timeout.                         | Surfaces only in the `LeaseExpired` completion value. |

---

## File Coverage

| File              | Lines | Findings                                                                          |
| ----------------- | ----- | --------------------------------------------------------------------------------- |
| `src/v1/model.ts` | 842   | H1, H2, H3, M1-M4, M6, L1, L2, L4, L5, O1, O3, O5                                  |
| `src/v1/client.ts`| 629   | H3 (method name), M5, L6, O4                                                       |
| `src/v1/utils.ts` | 150   | (no findings — internal helpers, all well-named: `executeCall`, `executeHttpCall`, `buildHttpRequest`, `parseResponse`, `marshalRequest`, `flattenQueryParams`, `readAll`, `HttpCallOptions`) |
| `src/v1/index.ts` | 39    | Re-exports — inherits findings from `model.ts` and `client.ts`.                   |

Every exported identifier in `model.ts` and `client.ts` was inspected. `utils.ts` and `index.ts` produced no incremental findings beyond what the model/client files surface.

---
