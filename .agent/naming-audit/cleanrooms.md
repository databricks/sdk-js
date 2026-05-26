# Naming Audit: `cleanrooms` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/cleanrooms/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/index.ts`
**Auditor:** Naming audit pass — TypeScript port of Databricks Go SDK.

This audit catalogs every type, field, enum value, and method name in the
`cleanrooms` v1 package against the 20 criteria provided. Findings are
grouped by category, and each finding cites the file/line where it appears.

---

## Summary

- **Total findings:** 9
- **Highest-impact themes:**
  1. Misleading boolean-shaped `accessRestricted` enum.
  2. Acronym casing inconsistencies (`Id` vs `ID`, `Dns` vs `DNS`).
  3. Duplicate `Status` enum types and overlapping collaborator types.
  4. Proto-architectural leaks: stray `Handler` suffix on list methods
     for notebook task runs.

---

## 1. Vague / Generic Names

_None._

---

## 2. Acronym Casing Inconsistencies

### 2.1 `centralCleanRoomId` (model.ts:577)
Uses `Id` (lowercase `d`). Elsewhere `globalMetastoreId`,
`inviteRecipientWorkspaceId` — consistent within this file as `Id`. But
Google TypeScript Style Guide § 5.3 recommends `ID` (treat as acronym). The
package is internally consistent (all `Id`); the issue is whether to upgrade
to `ID` across the SDK. **Note:** repo-wide convention should be confirmed.

### 2.2 `azureDnsZone` (model.ts:806)
"DNS" is an initialism. Per the style guide, `azureDNSZone`. Currently
`azureDnsZone` treats DNS as a word.

---

## 3. Misleading Names

### 3.1 `accessRestricted?: CleanRoom_AccessRestricted` (model.ts:271)
Reads as a boolean ("is access restricted?"). It is actually an enum with
values `NO_RESTRICTION` and `CSP_MISMATCH`. The JSDoc reinforces the
miscommunication: "Whether clean room access is restricted…" — implying a
yes/no. The shape itself is boolean-like (two values, one of which is the
absence sentinel) — a `boolean` field would model the domain more
honestly.

---

## 4. Singular / Plural Mismatches

_None._

---

## 5. Duplicate Concepts

### 5.1 Two `Status` enums
- `CleanRoom.status: CleanRoom_Status_Enum` (model.ts:262)
- `CleanRoomOutputCatalog.status: CleanRoomOutputCatalog_OutputCatalogStatus`
  (model.ts:565)

Two distinct, non-overlapping `Status` enums. The two enum types should
consider naming themselves unambiguously: `CleanRoomStatus`,
`OutputCatalogStatus`.

### 5.2 `creator?: CleanRoomCollaborator` (model.ts:592) vs.
`collaborators?: CleanRoomCollaborator[]` (model.ts:590)
Per the JSDoc, `creator` is also **one of the collaborators in the
collaborators list**. So we have the same logical entity reachable through
two paths. Mild — not a renamed-target, but flagged as a shape concern.

### 5.3 `CleanRoomCollaborator` (model.ts:490) vs.
`CollaboratorJobRunInfo` (model.ts:606)
Both types now live in `cleanrooms` (the `cleanroomtaskruns` package was
consolidated into `cleanrooms`). Within the package, two "Collaborator-
prefixed" surfaces model different aspects of collaborators with different
prefixes. Consistency would suggest renaming `CollaboratorJobRunInfo` to
`CleanRoomCollaboratorJobRunInfo`.

---

## 6. Inconsistent Action Verbs

### 6.1 `createCleanRoom` returns the new clean room (client.ts:125);
`createCleanRoomOutputCatalog` returns a **response wrapper**
(`CreateCleanRoomOutputCatalogResponse`) (client.ts:267).
Inconsistent return shapes for two `create*` methods. The Go SDK has the
same wart, but it surfaces here as inconsistent ergonomics:
`(await c.createCleanRoom(...)).name` vs.
`(await c.createCleanRoomOutputCatalog(...)).outputCatalog?.catalogName`.

---

## 7. Cloud Asymmetry / Cross-Cloud Field Naming

_None._

---

## 8. Cross-Package Overlap

_None._

---

## 9. Proto / Architectural Leaks

### 9.1 `listCleanRoomNotebookTaskRunsHandler` — client.ts:662
- **Why:** Mid/end-position `Handler` on a public method (not a domain term).
  All sibling list methods (`listCleanRooms`, `listCleanRoomAssets`,
  `listCleanRoomAutoApprovalRules`) omit the `Handler` suffix. The stray
  `Handler` leaks the backend RPC handler naming into the SDK surface.
- **Category:** Architectural leak (server-side terminology).
- **Suggested:** `listCleanRoomNotebookTaskRuns`.
- **Rationale:** Consumers should not see backend-implementation terms
  like `Handler` in client-method names; consistency with the other
  `list*` methods is the principal benefit.

### 9.2 `listCleanRoomNotebookTaskRunsHandlerIter` — client.ts:704
- **Why:** Same stray `Handler` infix in the async-iterator companion to
  §9.1. Sibling iterators (`listCleanRoomsIter`,
  `listCleanRoomAssetsIter`, `listCleanRoomAutoApprovalRulesIter`) follow
  the `<base>Iter` pattern without `Handler`.
- **Category:** Architectural leak (server-side terminology).
- **Suggested:** `listCleanRoomNotebookTaskRunsIter`.
- **Rationale:** Must rename in lock-step with §9.1 so the iterator name
  derives cleanly from the base method.

---

## Positive Examples (no action required)

- Method names follow standard CRUD verbs (create/get/list/update/delete).
- `cleanRooms` / `cleanRoomName` / `collaborators` / `complianceStandards`
  use correct plurality.
- JSDoc is generally comprehensive — references to UC naming rules and
  external compliance documents are well-linked.

---
