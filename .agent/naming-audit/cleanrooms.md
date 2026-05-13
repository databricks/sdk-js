# Naming Audit: `cleanrooms` (v1)

**Path:** `/home/parth.bansal/sdk-js/packages/cleanrooms/`
**Files audited:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`
**Auditor:** Naming audit pass — TypeScript port of Databricks Go SDK.

This audit catalogs every type, field, enum value, and method name in the
`cleanrooms` v1 package against the 20 criteria provided. Findings are
grouped by category, and each finding cites the file/line where it appears.

---

## Summary

- **Total findings:** 60
- **Highest-impact themes:**
  1. Proto-style nested enum/message names with embedded underscores
     (`CleanRoom_Status_Enum`,
     `EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol`,
     etc.) violate TS identifier conventions and produce extremely long,
     unreadable identifiers.
  2. Massive redundant enum-prefix tautology
     (`INTERNET_DESTINATION_TYPE_UNSPECIFIED`, `LOG_ONLY_MODE_TYPE_UNSPECIFIED`,
     `OUTPUT_CATALOG_STATUS_UNSPECIFIED`, …) — each enum member repeats the
     enum-name domain.
  3. Several field names use vague or generic terms (`type`, `protocol`,
     `name`, `destination`, `status`) that lose meaning out of context.

---

## 1. Vague / Generic Names

### 1.1 `name?: string` on `CleanRoom` (model.ts:142)
The top-level field `name` is the clean room identifier. Combined with the
request shape `GetCleanRoomRequest { name }`, the name "name" is too
generic — there is no signal that this is a UC securable name vs. a display
name vs. a UUID. Go SDK has the same problem, but consider `cleanRoomName`.

### 1.2 `name?: string` on `GetCleanRoomRequest`, `DeleteCleanRoomRequest`,
`UpdateCleanRoomRequest` (model.ts:273, 346, 367)
Same issue — when used inside a request DTO, `name` is ambiguous as to
**which** name. `cleanRoomName` would self-document. The request schema
in `CreateCleanRoomOutputCatalogRequest` uses the more specific
`cleanRoomName` (model.ts:259), so the codebase is inconsistent with itself.

### 1.3 `type?: ...InternetDestinationType` (model.ts:312)
The field `type` on `InternetDestination` is generic. `destinationType` or
`kind` would be clearer at call sites
(`internetDestination.type === FQDN` reads as a meta-property).

### 1.4 `type?: ...StorageDestinationType` (model.ts:335)
Same issue on `StorageDestination` — bare `type` field.

### 1.5 `protocol?: ...InternetDestinationFilteringProtocol` (model.ts:315)
`protocol` is generic. A consumer cannot tell from `destination.protocol`
whether this is TCP/UDP/HTTP/SSH/etc. `filteringProtocol` matches the
underlying enum semantics.

### 1.6 `destination?: string` (model.ts:311)
Bare `destination` on `InternetDestination` is tautological with its
container. The string is the FQDN/hostname/IP literal. `value` or
`fqdn`/`host` would convey intent.

### 1.7 `region?: string` (model.ts:232, 334)
`region` field appears on both `CleanRoomRemoteDetail` (cloud region) and
`StorageDestination` (bucket region). Not necessarily wrong, but the
ambiguity is worth noting — `cloudRegion` / `bucketRegion` would disambiguate.

### 1.8 `workloads?: WorkloadType[]` (model.ts:325)
On `LogOnlyMode`, the field `workloads` is plural-of-type. `workloadTypes`
would match the enum. (See also §9 — singular/plural mismatch.)

---

## 2. Redundant Enum Prefixes (the most pervasive issue)

Every enum redundantly prefixes the type's own name onto its `UNSPECIFIED`
member, and often onto all members. Idiomatic TS uses bare member names
(e.g., `Status.Active`, not `Status.STATUS_ACTIVE`), since the enum-name
qualifier is already present at every call site.

### 2.1 `ComplianceStandard.COMPLIANCE_STANDARD_UNSPECIFIED` (model.ts:8)
Should be `UNSPECIFIED`. Consumers write
`ComplianceStandard.COMPLIANCE_STANDARD_UNSPECIFIED` which is doubly redundant.

### 2.2 `CleanRoom_Status_Enum.ENUM_UNSPECIFIED` (model.ts:62)
Should be `UNSPECIFIED`. The `_ENUM` re-suffix in both the type name **and**
the member compounds the redundancy.

### 2.3 `CleanRoomOutputCatalog_OutputCatalogStatus.OUTPUT_CATALOG_STATUS_UNSPECIFIED`
(model.ts:71)
Should be `UNSPECIFIED`. `OUTPUT_CATALOG_STATUS` is already in the enum name.

### 2.4 `EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol.INTERNET_DESTINATION_FILTERING_PROTOCOL_UNSPECIFIED`
(model.ts:88)
The enum name and the member share **the same 36-character substring**.

### 2.5 `EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType.INTERNET_DESTINATION_TYPE_UNSPECIFIED`
(model.ts:94)
Same pattern — full prefix tautology.

### 2.6 `EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType.LOG_ONLY_MODE_TYPE_UNSPECIFIED`
(model.ts:100)
Same pattern.

### 2.7 `EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_WorkloadType.WORKLOAD_TYPE_UNSPECIFIED`
(model.ts:108)
Same pattern.

### 2.8 `EgressNetworkPolicy_InternetAccessPolicy_RestrictionMode.RESTRICTION_MODE_UNSPECIFIED`
(model.ts:122)
Same pattern.

### 2.9 `EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType.STORAGE_DESTINATION_TYPE_UNSPECIFIED`
(model.ts:130)
Same pattern.

Cumulatively: every enum's `UNSPECIFIED` sentinel is redundantly prefixed,
and seven of nine enum types are nested-style names that compound the issue.

---

## 3. Acronym Casing Inconsistencies

### 3.1 `centralCleanRoomId` (model.ts:228)
Uses `Id` (lowercase `d`). Elsewhere `globalMetastoreId`,
`inviteRecipientWorkspaceId` — consistent within this file as `Id`. But
Google TypeScript Style Guide § 5.3 recommends `ID` (treat as acronym). The
package is internally consistent (all `Id`); the issue is whether to upgrade
to `ID` across the SDK. **Note:** repo-wide convention should be confirmed.

### 3.2 `azureDnsZone` (model.ts:341)
"DNS" is an initialism. Per the style guide, `azureDNSZone`. Currently
`azureDnsZone` treats DNS as a word.

### 3.3 `cloudVendor?: string` containing `aws`, `azure`, `gcp` (model.ts:230)
Doc comment uses lowercase `aws,azure,gcp`. These are acronyms — should be
`AWS`, `Azure`, `GCP`. (Doc-only, but inconsistent with the enum members
`AWS_S3`, `AZURE_STORAGE`, `GOOGLE_CLOUD_STORAGE`.)

### 3.4 `FEDRAMP_MODERATE`, `FEDRAMP_HIGH`, `FEDRAMP_IL5` (model.ts:17, 20, 21)
"FedRAMP" is the official spelling — `FEDRAMP` flattens the casing.
Identifier-level constraint of SCREAMING_SNAKE is fine, but documentation
text should match.

### 3.5 `K_FSI` (model.ts:42)
"K-FSI" abbreviates "Korea Financial Security Institute." A bare leading
single letter (`K_`) is cryptic. `KFSI` or `KOREA_FSI` reads better.

### 3.6 `IRAP_PROTECTED` (model.ts:18)
"IRAP" is the Information Security Registered Assessors Program. OK as-is,
but worth noting the `_PROTECTED` suffix encodes a level — fine.

---

## 4. Underscores in TypeScript Identifiers

TS naming conventions (`@typescript-eslint/naming-convention`) prohibit
underscores in type and member names. The file disables this rule globally
with `eslint-disable-next-line` for nine type definitions.

### 4.1 `CleanRoom_AccessRestricted` (model.ts:55)
Snake-case-in-PascalCase identifier — Go/proto idiom, not TS idiom.

### 4.2 `CleanRoom_Status_Enum` (model.ts:61)
Same. Triple-segment Go-style nested enum name.

### 4.3 `CleanRoomOutputCatalog_OutputCatalogStatus` (model.ts:70)

### 4.4 `EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol`
(model.ts:87) — 86-character name with three underscores.

### 4.5 `EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType`
(model.ts:93)

### 4.6 `EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType` (model.ts:99)

### 4.7 `EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_WorkloadType` (model.ts:107)

### 4.8 `EgressNetworkPolicy_InternetAccessPolicy_RestrictionMode` (model.ts:121)

### 4.9 `EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType`
(model.ts:129)

### 4.10 Interfaces (same pattern)
- `CleanRoom_Status` (model.ts:178)
- `EgressNetworkPolicy_InternetAccessPolicy` (model.ts:288)
- `EgressNetworkPolicy_InternetAccessPolicy_InternetDestination` (model.ts:310)
- `EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode` (model.ts:321)
- `EgressNetworkPolicy_InternetAccessPolicy_StorageDestination` (model.ts:332)

### 4.11 Marshal/unmarshal schema constants
- `unmarshalEgressNetworkPolicy_InternetAccessPolicySchema` (model.ts:494)
- `unmarshalEgressNetworkPolicy_InternetAccessPolicy_InternetDestinationSchema`
  (model.ts:531)
- `unmarshalEgressNetworkPolicy_InternetAccessPolicy_LogOnlyModeSchema` (model.ts:553)
- `unmarshalEgressNetworkPolicy_InternetAccessPolicy_StorageDestinationSchema`
  (model.ts:575)
- `marshalEgressNetworkPolicy_InternetAccessPolicySchema` (model.ts:718)
- `marshalEgressNetworkPolicy_InternetAccessPolicy_InternetDestinationSchema` (model.ts:755)
- `marshalEgressNetworkPolicy_InternetAccessPolicy_LogOnlyModeSchema` (model.ts:777)
- `marshalEgressNetworkPolicy_InternetAccessPolicy_StorageDestinationSchema` (model.ts:799)

The underscore-bearing identifiers radiate from the model file into the
public re-exports in `index.ts` (lines 7–13, 20, 30–33), so the API surface
is contaminated.

---

## 5. Cryptic Abbreviations

### 5.1 `K_FSI` (model.ts:42)
Bare `K_FSI` is cryptic without the comment "Korea Financial Security
Institute." See §3.5 above.

### 5.2 `ARC_AMPE` (model.ts:51)
"Acceptable Risk Controls for ACA, Medicaid, and Partner Entities" — five
words compressed into eight characters. Without the doc-comment, opaque.

### 5.3 `ESC` in `ComplianceStandard.NONE` JSDoc (model.ts:11)
Documentation acronym only — but ESC = Enhanced Security Compliance is
unexplained at first reference.

### 5.4 `CSP` doc comment on `accessRestricted` (model.ts:166)
"CSP" abbreviation linked but not spelled. The enum constant
`CSP_MISMATCH` (model.ts:57) also uses the bare acronym.

### 5.5 `FQDN` enum value (model.ts:95)
"Fully Qualified Domain Name" — well-known enough in networking, OK.

### 5.6 `SEG`, `DP`, `UC`, `SNI` in JSDoc (model.ts:82, 117, 217)
Doc-only abbreviations: SEG (Secure Egress Gateway?), DP (Data Plane?),
UC (Unity Catalog), SNI (Server Name Indication). UC is well-established in
this codebase; SEG/DP/SNI need expansion.

### 5.7 `DBSQL` (model.ts:109)
"Databricks SQL" — familiar to Databricks customers, OK in context.

---

## 6. Misleading Names

### 6.1 `remoteDetailedInfo` (model.ts:148)
Field name suggests "verbose info about a remote endpoint." Actually
contains the central clean room state (collaborators, network policy,
compliance) — the meaty payload of `CleanRoom`. JSON tag is
`remote_detailed_info` but the type is `CleanRoomRemoteDetail` (singular,
no "Info"). The name is **misleading** and **internally inconsistent with
its type**: field says `remoteDetailedInfo`, type says `RemoteDetail`.

### 6.2 `accessRestricted?: CleanRoom_AccessRestricted` (model.ts:166)
Reads as a boolean ("is access restricted?"). It is actually an enum with
values `NO_RESTRICTION` and `CSP_MISMATCH`. `accessRestrictedReason` or
`accessRestriction` would not suggest a boolean. The JSDoc reinforces the
miscommunication: "Whether clean room access is restricted…" — implying a
yes/no.

### 6.3 `enableSharedOutput?: boolean` (model.ts:173)
The verb `enable` reads as imperative/action. For a state field a
participial/predicate name is clearer: `sharedOutputEnabled`. The JSDoc
itself notes the field is slated for deprecation.

### 6.4 `isEnabled?: boolean` on `ComplianceSecurityProfile` (model.ts:252)
The `is` prefix is acceptable, but inside an object literal one writes
`profile.isEnabled` (reading "is enabled" of a non-question subject) which
becomes awkward; simply `enabled` is more idiomatic and aligns with
JavaScript norms (HTML `disabled`, `aria-disabled`, etc.). Note the
inconsistency: `isEnabled` here vs. `enableSharedOutput` on `CleanRoom`.

### 6.5 `logOnlyMode?: ...LogOnlyMode` (model.ts:299)
Field name and type name both have `LogOnlyMode`. But the field's container
already declares "this is the LogOnlyMode submessage" — `logOnly` would
suffice.

### 6.6 `localCollaboratorAlias?: string` (model.ts:159) vs.
`collaboratorAlias` on `CleanRoomCollaborator` (model.ts:206)
The "local" prefix here is a fragment of metastore-domain jargon. A reader
who does not already know about "single-metastore vs. x-metastore" clean
rooms cannot tell what "local" means.

### 6.7 `CreateCleanRoomWaiter` class (client.ts:289)
The waiter polls `getCleanRoom` and resolves when status reaches `ACTIVE`.
Naming it `CreateCleanRoomWaiter` ties it to `createCleanRoom`, but the
waiter is operationally generic (any clean room name can be polled). A
better name is `CleanRoomActivationWaiter` or `CleanRoomStatusWaiter`.

---

## 7. Overly Verbose Names

### 7.1 Six of the nine enum type names exceed **50 characters** (model.ts:87–135).
Worst offenders:
- `EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationFilteringProtocol`
  — **97** characters, by far the longest in the package.
- `EgressNetworkPolicy_InternetAccessPolicy_InternetDestination_InternetDestinationType` — 85.
- `EgressNetworkPolicy_InternetAccessPolicy_StorageDestination_StorageDestinationType` — 83.
- `EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType` — 68.

The same enums also have `UNSPECIFIED` members reaching 36 characters
(`INTERNET_DESTINATION_FILTERING_PROTOCOL_UNSPECIFIED`).

### 7.2 Marshal/unmarshal schema identifiers (model.ts:494, 531, 553, 575,
718, 755, 777, 799)
The constants `unmarshalEgressNetworkPolicy_InternetAccessPolicy_InternetDestinationSchema`
and its marshal mirror each weigh in at **84 characters**. They are
exported and survive in source as long lines that already wrap awkwardly.

### 7.3 `CreateCleanRoomOutputCatalogResponse` (model.ts:263) /
`CreateCleanRoomOutputCatalogRequest` (model.ts:257)
36 characters each, but the underlying response body has a single field
(`outputCatalog`). Could be `OutputCatalogResponse` if the operation
context is unambiguous from the method signature. Probably keep — RPC
naming convention.

### 7.4 `centralCleanRoomId?: string` (model.ts:228)
Inside `CleanRoomRemoteDetail`, the `central` adjective is redundant — the
type itself describes the central clean room. `id` would suffice (subject
to §1 generic-name caveat — perhaps `remoteId` if we keep the structure).

---

## 8. Redundant Suffixes

### 8.1 `CleanRoom_Status_Enum` (model.ts:61)
The `_Enum` suffix is tautological with the `enum` keyword.

### 8.2 `CleanRoomOutputCatalog_OutputCatalogStatus` (model.ts:70)
The `OutputCatalogStatus` segment repeats `OutputCatalog`. `Status` alone
would work given the enclosing scope.

### 8.3 `_InternetDestinationFilteringProtocol` (model.ts:87) and
`_InternetDestinationType` (model.ts:93)
Both append `InternetDestination*` to a type whose Go-style nested path
already says `…_InternetDestination_…`. Pure repetition.

### 8.4 `_LogOnlyMode_LogOnlyModeType` (model.ts:99)
`LogOnlyMode` appears twice in the same identifier. Same for
`_StorageDestination_StorageDestinationType`.

### 8.5 `complianceSecurityProfile?: ComplianceSecurityProfile` (model.ts:246)
Field name is identical to the type name — repetition but consistent with
the rest of the SDK style. (Mild — many ports do this.)

### 8.6 `outputCatalog?: CleanRoomOutputCatalog` (model.ts:164, 260, 264)
Same field-name-equals-type pattern as §8.5.

---

## 9. Singular / Plural Mismatches

### 9.1 `workloads?: WorkloadType[]` (model.ts:325)
Field is plural and array-typed, but the element type is **`WorkloadType`**
(singular noun + `Type` suffix). Consumers write `mode.workloads[0]` which
is a `WorkloadType` — readable, but the field could be `workloadTypes` to
match the element. Alternative: rename the enum to `Workload`.

### 9.2 `cleanRooms?: CleanRoom[]` on `ListCleanRoomsResponse` (model.ts:357)
Correctly plural — flagged only as a positive example.

### 9.3 `collaborators?: CleanRoomCollaborator[]` (model.ts:241)
Correctly plural — positive example.

### 9.4 `complianceStandards?: ComplianceStandard[]` (model.ts:254)
Correctly plural. But `allowedInternetDestinations` and
`allowedStorageDestinations` (model.ts:292, 295) inherit the `allowed`
prefix; while the parent `restrictionMode` is singular. Mild inconsistency.

### 9.5 `allowedPaths?: string[]` (model.ts:339)
Correctly plural.

---

## 10. Reserved-Word / Built-in Collisions

### 10.1 `type` field on `InternetDestination` and `StorageDestination`
(model.ts:312, 335)
`type` is not a reserved word in TS at field position, but it shadows the
TS `typeof` semantics in conversation and may collide with linters that
flag it. `kind` is the established alternative (tagged-union convention).
Note: TypeScript's discriminated-union pattern often uses literal `type` —
so this is a soft flag.

### 10.2 `status` field appears on `CleanRoom` and `CleanRoomOutputCatalog`
Not a reserved word; raised here to highlight the duplication. See §12.

---

## 11. Duplicate Concepts

### 11.1 Two `Status` enums
- `CleanRoom.status: CleanRoom_Status_Enum` (model.ts:157)
- `CleanRoomOutputCatalog.status: CleanRoomOutputCatalog_OutputCatalogStatus`
  (model.ts:216)

Two distinct, non-overlapping `Status` enums. The two enum types should
consider naming themselves unambiguously: `CleanRoomStatus`,
`OutputCatalogStatus`.

### 11.2 `CleanRoomCollaborator` overlap with `cleanroomtaskruns.CollaboratorJobRunInfo`
(cross-package)
`cleanroomtaskruns/src/v1/model.ts` defines `CollaboratorJobRunInfo`. Both
packages now have a "Collaborator-prefixed" surface; consumers must keep
both straight. Not a rename target inside `cleanrooms`, but a
cross-package risk: a third "collaborator" type in another package would
make disambiguation tedious.

### 11.3 `creator?: CleanRoomCollaborator` (model.ts:243) vs.
`collaborators?: CleanRoomCollaborator[]` (model.ts:241)
Per the JSDoc, `creator` is also **one of the collaborators in the
collaborators list**. So we have the same logical entity reachable through
two paths. Mild — not a renamed-target, but flagged as a shape concern.

### 11.4 `cleanRoomName` (model.ts:259) vs. `name` (model.ts:142, 273, 346, 367)
Two names for the same thing: the clean-room identifier. Picking one
consistently would simplify call sites.

---

## 12. Verb-Tense Inconsistency

### 12.1 `enableSharedOutput` (verb, imperative) vs. `isEnabled`
(participle, predicate) — see §6.3 and §6.4 above.

### 12.2 `accessRestricted` (participial, predicate) vs.
`CleanRoom_AccessRestricted` (the **enum** type name shares the predicate
form) (model.ts:55, 166)
Enums normally name a domain (`AccessRestriction`, `RestrictionReason`),
not a predicate. Reading `restriction: AccessRestricted = NO_RESTRICTION`
is semantically weird — "the access-restricted of this thing is no
restriction."

### 12.3 Method verbs are consistent (create/get/list/update/delete) —
positive example.

---

## 13. Go / Java / Proto-Style Names in TS

### 13.1 The nine `*_*_*` enum names and five `*_*_*` interface names
already enumerated in §4.1–§4.11 are direct Go/proto carryovers. The
`eslint-disable-next-line` comments explicitly acknowledge this with the
phrase "Proto-style nested enum name" / "Proto-style nested message name."
They are *the* defining stylistic deviation of this file.

### 13.2 The marshal/unmarshal naming
`marshalCleanRoomSchema`, `unmarshalCleanRoomSchema` (model.ts:371, 613)
follow Go naming (`Marshal` / `Unmarshal`). JS/TS idiom is
`serialize`/`deserialize`, `encode`/`decode`, or `to{Json,Wire}` /
`from{Json,Wire}`. This is a system-wide SDK choice and not unique to
cleanrooms, but worth flagging once.

### 13.3 `CreateCleanRoomWaiter` (client.ts:289)
"Waiter" is the Go SDK convention; in TS, `Poller` / `Watcher` /
`Operation` (Azure-style) are more idiomatic. Inherited convention.

### 13.4 `req` parameter convention (client.ts:86, 111, 123, 160, 179,
207, 240, 264)
`req` is a Go SDK convention. TS norms favor explicit parameter names
(`request`) or destructuring. Minor.

---

## 14. Generic Field Names Losing Meaning Out of Context

### 14.1 `destination`, `type`, `protocol` on `InternetDestination`
(model.ts:311–315)
Read in isolation, these are completely opaque. Cross-reference §1.3–§1.6.

### 14.2 `name`, `comment`, `owner` on `CleanRoom` (model.ts:142, 151, 150)
`owner` is a username string; `comment` is a free-text description;
`name` is a UC securable identifier. None of these self-describe.

### 14.3 `bucketName`, `region`, `type`, `azureStorageAccount`,
`allowedPaths`, `azureStorageService`, `azureDnsZone`, `azureContainer`
on `StorageDestination` (model.ts:333–343)
The same struct mixes AWS-, Azure-, and GCP-shaped fields. `bucketName`
is S3-flavored; `azureStorageAccount` is Azure-flavored. The fact that the
fields share one struct **and** the field names are not prefixed with the
cloud (`bucketName` vs. `azureContainer`) leaks the cloud taxonomy into
field naming inconsistently.

---

## 15. Field Contradicting Type Domain

### 15.1 `CleanRoomRemoteDetail.region: string` (model.ts:232)
Type is `string`, but the domain is "a cloud region identifier
(`us-east-1`, `westeurope`, etc.)" — the type should be a tagged-string
or a region enum. Minor.

### 15.2 `cloudVendor: string` (model.ts:230)
Same — should be an enum (the cloud SDK packages already have one).

### 15.3 `enableSharedOutput` (boolean) vs. the JSDoc "shared output PrPr"
(private preview) — the field is a feature flag fronted as a permanent API,
not labelled `experimental` (model.ts:173). Minor.

### 15.4 `createdAt`, `updatedAt: number` (model.ts:153, 155)
Stored as **epoch milliseconds** per JSDoc but typed as `number` rather
than a branded `EpochMillis` or `Timestamp`. Loses semantic information
in the type system. (Repo-wide pattern; flag once.)

### 15.5 `inviteRecipientWorkspaceId: number` (model.ts:194)
Workspace IDs are int64 in Databricks; TS `number` is 53-bit. Latent
precision loss for IDs above 2^53. The proto schema would use int64. Not
a naming concern, but the field name does not warn (e.g.,
`inviteRecipientWorkspaceIdRaw` / docs).

---

## 16. Inconsistent Action Verbs

The five RPC methods follow the standard CRUD verbs:
`createCleanRoom`, `createCleanRoomOutputCatalog`, `deleteCleanRoom`,
`getCleanRoom`, `listCleanRooms`, `updateCleanRoom`.

### 16.1 `createCleanRoom` returns the new clean room (client.ts:85);
`createCleanRoomOutputCatalog` returns a **response wrapper**
(`CreateCleanRoomOutputCatalogResponse`) (client.ts:122).
Inconsistent return shapes for two `create*` methods. The Go SDK has the
same wart, but it surfaces here as inconsistent ergonomics:
`(await c.createCleanRoom(...)).name` vs.
`(await c.createCleanRoomOutputCatalog(...)).outputCatalog?.catalogName`.

### 16.2 `listCleanRoomsIter` (client.ts:239)
The `*Iter` suffix matches the Go SDK's iterator naming. TS norms suggest
`*Iterator`, `*AsyncIterable`, or returning a `Pager` object. Minor.

---

## 17. Long Enum Values

In addition to the prefix-redundant `UNSPECIFIED` values enumerated in §2:

### 17.1 `COMPLIANCE_STANDARD_UNSPECIFIED` (model.ts:8) — 31 chars
### 17.2 `OUTPUT_CATALOG_STATUS_UNSPECIFIED` (model.ts:71) — 33 chars
### 17.3 `INTERNET_DESTINATION_FILTERING_PROTOCOL_UNSPECIFIED` (model.ts:88) — 51 chars
### 17.4 `INTERNET_DESTINATION_TYPE_UNSPECIFIED` (model.ts:94) — 37 chars
### 17.5 `LOG_ONLY_MODE_TYPE_UNSPECIFIED` (model.ts:100) — 30 chars
### 17.6 `STORAGE_DESTINATION_TYPE_UNSPECIFIED` (model.ts:130) — 36 chars
### 17.7 `RESTRICTION_MODE_UNSPECIFIED` (model.ts:122) — 28 chars
### 17.8 `WORKLOAD_TYPE_UNSPECIFIED` (model.ts:108) — 25 chars
### 17.9 `GOOGLE_CLOUD_STORAGE` (model.ts:134) — 20 chars
(Reasonable for the data being modeled.)

The cumulative cost is that switch-statements and equality checks on
these enums consume wide lines, e.g.,
`EgressNetworkPolicy_InternetAccessPolicy_LogOnlyMode_LogOnlyModeType.LOG_ONLY_MODE_TYPE_UNSPECIFIED`
is **97** characters — exceeding the project's 90-char line limit
on its own.

---

## 18. Underspecified IDs

### 18.1 `centralCleanRoomId?: string` (model.ts:228)
String ID — no JSDoc explanation of format (UUID? Numeric? Free-form?).
Per JSDoc on `globalMetastoreId`: "cloud:region:metastore-uuid" — at least
that one is documented.

### 18.2 `globalMetastoreId?: string` (model.ts:183) — Documented; positive example.

### 18.3 `inviteRecipientWorkspaceId?: number` (model.ts:194)
ID typed as `number` and undocumented format — see §15.5 on precision risk.

### 18.4 `bucketName?: string` (model.ts:333)
Bucket name vs. ARN vs. URI — not specified. Could be S3 bucket name or
GCS bucket name; both share the field.

### 18.5 `azureStorageAccount?: string` (model.ts:338),
`azureStorageService?: string` (model.ts:340),
`azureContainer?: string` (model.ts:342)
Three Azure identifiers, no JSDoc explaining accepted formats.

---

## 19. Type-Suffix Tautology

### 19.1 `CleanRoom_AccessRestricted` (model.ts:55)
The type name uses the participle predicate — but enums classify, not
predicate. Combined with the field `accessRestricted: CleanRoom_AccessRestricted`,
the result is `accessRestricted: AccessRestricted` — pure echo (the field
adds no information beyond what the type name supplies).

### 19.2 `CleanRoom_Status_Enum` (model.ts:61)
The `_Enum` suffix is the canonical example of type-suffix tautology.
TS's `enum` keyword already conveys "this is an enum."

### 19.3 `_LogOnlyMode_LogOnlyModeType` (model.ts:99) and
`_StorageDestination_StorageDestinationType` (model.ts:129)
Type name segment appears twice. See §8.

### 19.4 `complianceSecurityProfile: ComplianceSecurityProfile` (model.ts:246)
See §8.5 — common pattern.

---

## Cross-Package Overlap (cleanrooms vs. cleanroomassets /
cleanroomautoapprovalrules / cleanroomtaskruns)

### CP.1 Shared concept: "clean room"
All four packages use `CleanRoom*` types. None re-imports the canonical
`CleanRoom` from `cleanrooms`; instead each refers to the clean room by
its name (string identifier in URL paths).
There is **no shared `CleanRoom` interface or alias** despite all four
packages keying off the same entity. This is a structural concern, not a
naming concern — flagged once.

### CP.2 `CleanRoomCollaborator` (cleanrooms) vs.
`CollaboratorJobRunInfo` (cleanroomtaskruns)
The packages model different *aspects* of collaborators with different
prefixes. Consistency would suggest `CleanRoomCollaboratorJobRunInfo` or
moving the type into cleanrooms. Minor.

### CP.3 Status/state vocabulary divergence:
- `cleanrooms.CleanRoom_Status_Enum` — clean room lifecycle.
- `cleanroomtaskruns.CleanRoomTaskRunLifeCycleState` /
  `CleanRoomTaskRunResultState` — task run lifecycle.
- `cleanroomassets.CleanRoomAsset_Status_Enum` — asset lifecycle.
- `cleanroomassets.CleanRoomNotebookReview_NotebookReviewState` —
  review state.

Five different *Status*/*State* enums across four packages. Each one is
locally correct, but readers must learn a new vocabulary per package.
Mild — cross-package theming, not actionable inside `cleanrooms`.

### CP.4 Resource-name pattern repetition
`cleanrooms` uses `name` as the clean room identifier in request/response
shapes (§1.2). `cleanroomassets` and `cleanroomautoapprovalrules` will
share the same `name` slot — risk of collision when shapes interact in
generic code.

---

## Positive Examples (no action required)

- Method names follow standard CRUD verbs (create/get/list/update/delete).
- `cleanRooms` / `cleanRoomName` / `collaborators` / `complianceStandards`
  use correct plurality.
- JSDoc is generally comprehensive — references to UC naming rules and
  external compliance documents are well-linked.
- The `executeCall`, `executeHttpCall`, `marshalRequest`, `parseResponse`,
  `buildHttpRequest`, `flattenQueryParams` utilities in `utils.ts` have
  short, clear, verb-driven names that survive idiomatically.
- The `StillRunningError` class (client.ts:48) is concise and
  self-documenting.
- The package-level segment naming (`PACKAGE_SEGMENT` in client.ts:43)
  is appropriately namespaced.

---

## Notes on Generation Artifacts

Many findings above (especially §2, §4, §7, §8) are direct artifacts
of mechanical translation from the proto-defined Go SDK. The
`eslint-disable-next-line @typescript-eslint/naming-convention` comments
attached to each offender (and the comment "Proto-style nested enum
name" / "Proto-style nested message name") indicate these are recognized
deviations. They are not bugs in this file — they are systemic generator
output that this audit catalogs.

If the SDK adopts a TS-idiomatic alias layer, the most leverage comes
from:
1. Flattening or shortening the seven `EgressNetworkPolicy_*` enums
   (eliminates §4.4–§4.9, §7.1, §17.3–§17.6, §19.2–§19.3).
2. Renaming `CleanRoom_Status_Enum` to `CleanRoomStatus` (§4.2, §8.1, §19.2).
3. Renaming `accessRestricted` -> `accessRestriction` and
   `CleanRoom_AccessRestricted` -> `AccessRestriction` (§6.2, §12.2, §19.1).
4. Renaming `remoteDetailedInfo` -> `details` or `remoteDetail` (§6.1)
   to align field and type names.

---
