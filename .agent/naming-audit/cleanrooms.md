# Naming Audit: `cleanrooms` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/cleanrooms/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/index.ts`
**Auditor:** Naming audit pass — TypeScript port of Databricks Go SDK.

---

## Summary

- **Total findings:** 2

---

## 1. Proto / Architectural Leaks

### 1.1 `listCleanRoomNotebookTaskRunsHandler` — client.ts:673
- **Why:** Mid/end-position `Handler` on a public method (not a domain term).
  All sibling list methods (`listCleanRooms`, `listCleanRoomAssets`,
  `listCleanRoomAutoApprovalRules`) omit the `Handler` suffix. The stray
  `Handler` leaks the backend RPC handler naming into the SDK surface.
- **Category:** Architectural leak (server-side terminology).
- **Suggested:** `listCleanRoomNotebookTaskRuns`.
- **Rationale:** Consumers should not see backend-implementation terms
  like `Handler` in client-method names; consistency with the other
  `list*` methods is the principal benefit.

### 1.2 `listCleanRoomNotebookTaskRunsHandlerIter` — client.ts:716
- **Why:** Same stray `Handler` infix in the async-iterator companion to
  §1.1. Sibling iterators (`listCleanRoomsIter`,
  `listCleanRoomAssetsIter`, `listCleanRoomAutoApprovalRulesIter`) follow
  the `<base>Iter` pattern without `Handler`.
- **Category:** Architectural leak (server-side terminology).
- **Suggested:** `listCleanRoomNotebookTaskRunsIter`.
- **Rationale:** Must rename in lock-step with §1.1 so the iterator name
  derives cleanly from the base method.
