# Naming Audit: `cleanrooms` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/cleanrooms/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Auditor:** Naming audit pass — TypeScript port of Databricks Go SDK.

This audit catalogs every type, field, enum value, and method name in the
`cleanrooms` v1 package against the 20 criteria provided. Findings are
grouped by category, and each finding cites the file/line where it appears.

---

## Summary

- **Total findings:** 28
- **Highest-impact themes:**
  1. Several field names use vague or generic terms (`type`, `protocol`,
     `name`, `destination`, `status`) that lose meaning out of context.
  2. Misleading field names (`remoteDetailedInfo`, boolean-shaped
     `accessRestricted` enum).
  3. Cloud-asymmetric fields (`bucketName` vs. `azureContainer`) leak
     cloud taxonomy into a single struct.
  4. Proto-architectural leaks: stray `Handler` suffix on list methods
     for notebook task runs.

---

## 1. Vague / Generic Names

### 1.1 `name?: string` on `CleanRoom` (model.ts:247)
The top-level field `name` is the clean room identifier. Combined with the
request shape `GetCleanRoomRequest { name }`, the name "name" is too
generic — there is no signal that this is a UC securable name vs. a display
name vs. a UUID. Go SDK has the same problem, but consider `cleanRoomName`.

### 1.2 `name?: string` on `GetCleanRoomRequest`, `DeleteCleanRoomRequest`,
`UpdateCleanRoomRequest` (model.ts:836, 738, 1009)
Same issue — when used inside a request DTO, `name` is ambiguous as to
**which** name. `cleanRoomName` would self-document. The request schema
in `CreateCleanRoomOutputCatalogRequest` uses the more specific
`cleanRoomName` (model.ts:703), so the codebase is inconsistent with itself.

### 1.3 `type?: ...InternetDestinationType` (model.ts:777)
The field `type` on `InternetDestination` is generic. `destinationType` or
`kind` would be clearer at call sites
(`internetDestination.type === FQDN` reads as a meta-property).

### 1.4 `type?: ...StorageDestinationType` (model.ts:800)
Same issue on `StorageDestination` — bare `type` field.

### 1.5 `protocol?: ...InternetDestinationFilteringProtocol` (model.ts:780)
`protocol` is generic. A consumer cannot tell from `destination.protocol`
whether this is TCP/UDP/HTTP/SSH/etc. `filteringProtocol` matches the
underlying enum semantics.

### 1.6 `destination?: string` (model.ts:776)
Bare `destination` on `InternetDestination` is tautological with its
container. The string is the FQDN/hostname/IP literal. `value` or
`fqdn`/`host` would convey intent.

### 1.7 `region?: string` (model.ts:581, 799)
`region` field appears on both `CleanRoomRemoteDetail` (cloud region) and
`StorageDestination` (bucket region). Not necessarily wrong, but the
ambiguity is worth noting — `cloudRegion` / `bucketRegion` would disambiguate.

### 1.8 `workloads?: WorkloadType[]` (model.ts:790)
On `LogOnlyMode`, the field `workloads` is plural-of-type. `workloadTypes`
would match the enum. (See also §4 — singular/plural mismatch.)

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

### 2.3 `cloudVendor?: string` containing `aws`, `azure`, `gcp` (model.ts:579)
Doc comment uses lowercase `aws,azure,gcp`. These are acronyms — should be
`AWS`, `Azure`, `GCP`. (Doc-only, but inconsistent with the enum members
`AWS_S3`, `AZURE_STORAGE`, `GOOGLE_CLOUD_STORAGE`.)

### 2.4 `FEDRAMP_MODERATE`, `FEDRAMP_HIGH`, `FEDRAMP_IL5` (model.ts:82, 85, 86)
"FedRAMP" is the official spelling — `FEDRAMP` flattens the casing.
Identifier-level constraint of SCREAMING_SNAKE is fine, but documentation
text should match.

---

## 3. Misleading Names

### 3.1 `remoteDetailedInfo` (model.ts:253)
Field name suggests "verbose info about a remote endpoint." Actually
contains the central clean room state (collaborators, network policy,
compliance) — the meaty payload of `CleanRoom`. JSON tag is
`remote_detailed_info` but the type is `CleanRoomRemoteDetail` (singular,
no "Info"). The name is **misleading** and **internally inconsistent with
its type**: field says `remoteDetailedInfo`, type says `RemoteDetail`.

### 3.2 `accessRestricted?: CleanRoom_AccessRestricted` (model.ts:271)
Reads as a boolean ("is access restricted?"). It is actually an enum with
values `NO_RESTRICTION` and `CSP_MISMATCH`. `accessRestrictedReason` or
`accessRestriction` would not suggest a boolean. The JSDoc reinforces the
miscommunication: "Whether clean room access is restricted…" — implying a
yes/no. The shape itself is boolean-like (two values, one of which is the
absence sentinel) — a `boolean` field would model the domain more
honestly.

### 3.3 `isEnabled?: boolean` on `ComplianceSecurityProfile` (model.ts:664)
The `is` prefix is acceptable, but inside an object literal one writes
`profile.isEnabled` (reading "is enabled" of a non-question subject) which
becomes awkward; simply `enabled` is more idiomatic and aligns with
JavaScript norms (HTML `disabled`, `aria-disabled`, etc.).

### 3.4 `logOnlyMode?: ...LogOnlyMode` (model.ts:764)
Field name and type name both have `LogOnlyMode`. But the field's container
already declares "this is the LogOnlyMode submessage" — `logOnly` would
suffice.

### 3.5 `localCollaboratorAlias?: string` (model.ts:264) vs.
`collaboratorAlias` on `CleanRoomCollaborator` (model.ts:515)
The "local" prefix here is a fragment of metastore-domain jargon. A reader
who does not already know about "single-metastore vs. x-metastore" clean
rooms cannot tell what "local" means.

### 3.6 `CreateCleanRoomWaiter` class (client.ts:816)
The waiter polls `getCleanRoom` and resolves when status reaches `ACTIVE`.
Naming it `CreateCleanRoomWaiter` ties it to `createCleanRoom`, but the
waiter is operationally generic (any clean room name can be polled). A
better name is `CleanRoomActivationWaiter` or `CleanRoomStatusWaiter`.

---

## 4. Singular / Plural Mismatches

### 4.1 `workloads?: WorkloadType[]` (model.ts:790)
Field is plural and array-typed, but the element type is **`WorkloadType`**
(singular noun + `Type` suffix). Consumers write `mode.workloads[0]` which
is a `WorkloadType` — readable, but the field could be `workloadTypes` to
match the element. Alternative: rename the enum to `Workload`.

### 4.2 `complianceStandards?: ComplianceStandard[]` (model.ts:666)
Correctly plural. But `allowedInternetDestinations` and
`allowedStorageDestinations` (model.ts:757, 760) inherit the `allowed`
prefix; while the parent `restrictionMode` is singular. Mild inconsistency.

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

### 5.3 `cleanRoomName` (model.ts:703) vs. `name` (model.ts:247, 836, 738, 1009)
Two names for the same thing: the clean-room identifier. Picking one
consistently would simplify call sites.

### 5.4 `CleanRoomCollaborator` (model.ts:490) vs.
`CollaboratorJobRunInfo` (model.ts:606)
Both types now live in `cleanrooms` (the `cleanroomtaskruns` package was
consolidated into `cleanrooms`). Within the package, two "Collaborator-
prefixed" surfaces model different aspects of collaborators with different
prefixes. Consistency would suggest renaming `CollaboratorJobRunInfo` to
`CleanRoomCollaboratorJobRunInfo`.

---

## 6. Inconsistent Action Verbs

### 6.1 `createCleanRoom` returns the new clean room (client.ts:120);
`createCleanRoomOutputCatalog` returns a **response wrapper**
(`CreateCleanRoomOutputCatalogResponse`) (client.ts:250).
Inconsistent return shapes for two `create*` methods. The Go SDK has the
same wart, but it surfaces here as inconsistent ergonomics:
`(await c.createCleanRoom(...)).name` vs.
`(await c.createCleanRoomOutputCatalog(...)).outputCatalog?.catalogName`.

---

## 7. Cloud Asymmetry / Cross-Cloud Field Naming

### 7.1 `bucketName`, `region`, `type`, `azureStorageAccount`,
`allowedPaths`, `azureStorageService`, `azureDnsZone`, `azureContainer`
on `StorageDestination` (model.ts:798–807)
The same struct mixes AWS-, Azure-, and GCP-shaped fields. `bucketName`
is S3-flavored; `azureStorageAccount` is Azure-flavored. The fact that the
fields share one struct **and** the field names are not prefixed with the
cloud (`bucketName` vs. `azureContainer`) leaks the cloud taxonomy into
field naming inconsistently.

---

## 8. Cross-Package Overlap

_None._

---

## 9. Proto / Architectural Leaks

### 9.1 `listCleanRoomNotebookTaskRunsHandler` — client.ts:612
- **Why:** Mid/end-position `Handler` on a public method (not a domain term).
  All sibling list methods (`listCleanRooms`, `listCleanRoomAssets`,
  `listCleanRoomAutoApprovalRules`) omit the `Handler` suffix. The stray
  `Handler` leaks the backend RPC handler naming into the SDK surface.
- **Category:** Architectural leak (server-side terminology).
- **Suggested:** `listCleanRoomNotebookTaskRuns`.
- **Rationale:** Consumers should not see backend-implementation terms
  like `Handler` in client-method names; consistency with the other
  `list*` methods is the principal benefit.

### 9.2 `listCleanRoomNotebookTaskRunsHandlerIter` — client.ts:651
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
- The `StillRunningError` class (client.ts:83) is concise and
  self-documenting.
- The package-level segment naming (`PACKAGE_SEGMENT` in client.ts:78)
  is appropriately namespaced.

---

## Fixed

- #4.2 `ARC_AMPE` (originally cited at model.ts:51): Fixed in regeneration on 2026-05-20 — enum value no longer present in `ComplianceStandard`.
- #5.3 `enableSharedOutput?: boolean` (originally cited at model.ts:173): Fixed in regeneration on 2026-05-20 — field removed from `CleanRoom`.
- #5.2 `CleanRoomCollaborator` overlap with `cleanroomtaskruns.CollaboratorJobRunInfo`: Fixed in regeneration on 2026-05-22 — the `cleanroomtaskruns` package was consolidated into `cleanrooms`, eliminating the cross-package overlap concern. In-package overlap is now tracked under §5.4.
- #8.1 Cross-package shared "clean room" concept across `cleanrooms` / `cleanroomassets` / `cleanroomautoapprovalrules` / `cleanroomtaskruns`: Fixed in regeneration on 2026-05-22 — the three sibling packages were consolidated into `cleanrooms`, so all `CleanRoom*` types now live in a single canonical package.
- #8.2 Cross-package `CleanRoomCollaborator` (cleanrooms) vs. `CollaboratorJobRunInfo` (cleanroomtaskruns): Fixed in regeneration on 2026-05-22 — packages consolidated; the in-package concern is tracked under §5.4.
- #8.3 Cross-package resource-name pattern repetition (`name` slot across cleanrooms / cleanroomassets / cleanroomautoapprovalrules): Fixed in regeneration on 2026-05-22 — sibling packages consolidated into `cleanrooms`, eliminating cross-package shape-collision risk.
