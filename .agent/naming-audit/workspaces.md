# Naming Audit: workspaces

**Path:** `packages/workspaces/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level Databricks workspace management
(create/get/list/update/delete a workspace under an account, with all
its cloud, network, storage, and encryption configuration).
**Total weird names flagged:** 4

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 4     |

## High severity

### 1. `Client.createWorkspacePublic` / `createWorkspacePublicWaiter` — `src/v1/client.ts:85,110`
- **Why weird:** `Client` method names end in `Public`. Reads as "the
  method on the public class that calls the public endpoint" — the
  suffix only exists because the underlying proto/spec uses `Public`
  to distinguish account-API routes. The companion waiter factory
  carries the same suffix.
- **Category:** Proto-architectural leak — `Public` suffix on client
  method.
- **Suggested:** `createWorkspace`, `createWorkspaceWaiter`.
- **Rationale:** Methods on `Client` are inherently public; the suffix
  is meaningless to a TS caller.

### 2. `Client.deleteWorkspacePublic` / `getWorkspacePublic` / `listWorkspacesPublic` / `updateWorkspacePublic` / `updateWorkspacePublicWaiter` — `src/v1/client.ts:124,152,177,207,247`
- **Why weird:** Same `Public` suffix on every other `Client` method
  (and the update waiter factory) as #1.
- **Category:** Proto-architectural leak — `Public` suffix on client
  method.
- **Suggested:** `deleteWorkspace`, `getWorkspace`, `listWorkspaces`,
  `updateWorkspace`, `updateWorkspaceWaiter`.
- **Rationale:** Same as #1.

### 3. `CreateWorkspacePublicWaiter` / `UpdateWorkspacePublicWaiter` classes — `src/v1/client.ts:261,334`
- **Why weird:** Two exported waiter classes carry the `Public` infix
  between the verb (`Create`/`Update`) and the noun (`Workspace`) plus
  the `Waiter` role suffix. The class names are wholly SDK-side
  abstractions (there is no protobuf "waiter" message), so the
  `Public` token is pure inherited cruft from the paired RPC name.
- **Category:** Proto-architectural leak — `Public` mid-position
  (waiter class).
- **Suggested:** `CreateWorkspaceWaiter`, `UpdateWorkspaceWaiter`.
- **Rationale:** Waiter classes are TS-only constructs; they have no
  business carrying the upstream proto's public/internal qualifier.

### 4. `Public` waiter names in the `index.ts` re-export list — `src/v1/index.ts:5-6`
- **Why weird:** `index.ts` mirrors the leaked `Public` names from the
  waiter classes in its re-export list:
  `CreateWorkspacePublicWaiter`, `UpdateWorkspacePublicWaiter`.
- **Category:** Proto-architectural leak — `Public` mid-position
  (re-export mirror).
- **Suggested:** Track the renames of #1–#3.
- **Rationale:** The re-export statement inherits the leaked names
  verbatim; nothing to do here independent of the upstream renames.
