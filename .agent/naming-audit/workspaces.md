# Naming Audit: workspaces

**Path:** `packages/workspaces/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level Databricks workspace management
(create/get/list/update/delete a workspace under an account, with all
its cloud, network, storage, and encryption configuration).
**Total weird names flagged:** 3

## Summary

| Severity     | Count |
| ------------ | ----- |
| High         | 3     |

## High severity

### 1. `WorkspacesClient.createWorkspacePublic` — `src/v1/client.ts:124`
- **Why weird:** `WorkspacesClient` method name ends in `Public`. Reads as "the
  method on the public class that calls the public endpoint" — the
  suffix only exists because the underlying proto/spec uses `Public`
  to distinguish account-API routes.
- **Category:** Proto-architectural leak — `Public` suffix on client
  method.
- **Suggested:** `createWorkspace`.
- **Rationale:** Methods on `WorkspacesClient` are inherently public; the suffix
  is meaningless to a TS caller.

### 2. `WorkspacesClient.deleteWorkspacePublic` / `getWorkspacePublic` / `listWorkspacesPublic` / `updateWorkspacePublic` — `src/v1/client.ts:138,167,193,266`
- **Why weird:** Same `Public` suffix on every other `WorkspacesClient` method
  as #1.
- **Category:** Proto-architectural leak — `Public` suffix on client
  method.
- **Suggested:** `deleteWorkspace`, `getWorkspace`, `listWorkspaces`,
  `updateWorkspace`.
- **Rationale:** Same as #1.

### 3. `CreateWorkspacePublicWaiter` / `UpdateWorkspacePublicWaiter` classes — `src/v1/client.ts:280,353`
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
