# Naming Audit: `cleanrooms` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/cleanrooms/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/index.ts`
**Auditor:** Naming audit pass — TypeScript port of Databricks Go SDK.

---

## Summary

- **Total findings:** 3

---

## 1. Inconsistent Action Verbs

### 1.1 `createCleanRoomAsset` returns the new asset (client.ts:168);
`createCleanRoomOutputCatalog` returns a **response wrapper**
(`CreateCleanRoomOutputCatalogResponse`) (client.ts:264).
Inconsistent return shapes for two `create*` methods. The Go SDK has the
same wart, but it surfaces here as inconsistent ergonomics:
`(await c.createCleanRoomAsset(...)).name` vs.
`(await c.createCleanRoomOutputCatalog(...)).outputCatalog?.catalogName`.

---

## 2. Proto / Architectural Leaks

### 2.1 `listCleanRoomNotebookTaskRunsHandler` — client.ts:659
- **Why:** Mid/end-position `Handler` on a public method (not a domain term).
  All sibling list methods (`listCleanRooms`, `listCleanRoomAssets`,
  `listCleanRoomAutoApprovalRules`) omit the `Handler` suffix. The stray
  `Handler` leaks the backend RPC handler naming into the SDK surface.
- **Category:** Architectural leak (server-side terminology).
- **Suggested:** `listCleanRoomNotebookTaskRuns`.
- **Rationale:** Consumers should not see backend-implementation terms
  like `Handler` in client-method names; consistency with the other
  `list*` methods is the principal benefit.

### 2.2 `listCleanRoomNotebookTaskRunsHandlerIter` — client.ts:701
- **Why:** Same stray `Handler` infix in the async-iterator companion to
  §2.1. Sibling iterators (`listCleanRoomsIter`,
  `listCleanRoomAssetsIter`, `listCleanRoomAutoApprovalRulesIter`) follow
  the `<base>Iter` pattern without `Handler`.
- **Category:** Architectural leak (server-side terminology).
- **Suggested:** `listCleanRoomNotebookTaskRunsIter`.
- **Rationale:** Must rename in lock-step with §2.1 so the iterator name
  derives cleanly from the base method.
