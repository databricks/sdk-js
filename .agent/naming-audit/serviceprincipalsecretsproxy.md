# Naming Audit: serviceprincipalsecretsproxy

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/serviceprincipalsecretsproxy/src/v1/` (no longer exists)
**Versions audited:** v1
**Inferred domain:** Account-level CRUD over OAuth client secrets attached to a
service principal (create, list, delete), previously exposed as a "proxy"
variant whose surface area was byte-identical to the sibling
`serviceprincipalsecrets` package.
**Total weird names flagged:** 0

> **Status:** As of regeneration on 2026-05-20, the entire
> `serviceprincipalsecretsproxy` package has been removed from the source
> tree. Only the `dist/` build artifact directory remains. The duplicate-
> package issue flagged in H1 was resolved by deletion. Every finding below
> is consequently Fixed.

---

## Summary table

_None._

---

## High severity (must fix)

_None._

---

## Medium severity (worth pushing back on)

_None._

---

## Low severity (nits)

_None._

---

## Observations (not flags)

_None._

---

## Fixed

- #1 package `serviceprincipalsecretsproxy` (originally cited at package level): Fixed in regeneration on 2026-05-20 — entire `src/` tree removed; package no longer exists in source.
- #2 package `serviceprincipalsecretsproxy` (originally cited at package level): Fixed in regeneration on 2026-05-20 — package removed entirely; long undelimited name is gone.
- #3 package `serviceprincipalsecretsproxy` (originally cited at package level): Fixed in regeneration on 2026-05-20 — misleading "proxy" suffix gone with the package.
- #4 `CreateServicePrincipalSecret` (originally cited at model.ts:6): Fixed in regeneration on 2026-05-20 — source file removed; type no longer exists.
- #5 `CreateServicePrincipalSecret.servicePrincipal` (originally cited at model.ts:10): Fixed in regeneration on 2026-05-20 — source file removed; field no longer exists.
- #6 `CreateServicePrincipalSecret.lifetime` (originally cited at model.ts:12): Fixed in regeneration on 2026-05-20 — source file removed; field no longer exists.
- #7 `CreateServicePrincipalSecretResponse` (originally cited at model.ts:15): Fixed in regeneration on 2026-05-20 — source file removed; type no longer exists.
- #8 `CreateServicePrincipalSecretResponse.id` (originally cited at model.ts:17): Fixed in regeneration on 2026-05-20 — source file removed; field no longer exists.
- #9 `CreateServicePrincipalSecretResponse.secret` (originally cited at model.ts:19): Fixed in regeneration on 2026-05-20 — source file removed; field no longer exists.
- #10 `CreateServicePrincipalSecretResponse.secretHash` (originally cited at model.ts:21): Fixed in regeneration on 2026-05-20 — source file removed; field no longer exists.
- #11 `CreateServicePrincipalSecretResponse.status` (originally cited at model.ts:27): Fixed in regeneration on 2026-05-20 — source file removed; field no longer exists.
- #12 `CreateServicePrincipalSecretResponse.createTime` / `updateTime` (originally cited at model.ts:23, 25): Fixed in regeneration on 2026-05-20 — source file removed; fields no longer exist.
- #13 `CreateServicePrincipalSecretResponse.expireTime` (originally cited at model.ts:29): Fixed in regeneration on 2026-05-20 — source file removed; field no longer exists.
- #14 `DeleteServicePrincipalSecret` (originally cited at model.ts:32): Fixed in regeneration on 2026-05-20 — source file removed; type no longer exists.
- #15 `DeleteServicePrincipalSecret.secretId` (originally cited at model.ts:38): Fixed in regeneration on 2026-05-20 — source file removed; field no longer exists.
- #16 `ListServicePrincipalSecrets` (originally cited at model.ts:44): Fixed in regeneration on 2026-05-20 — source file removed; type no longer exists.
- #17 `ListServicePrincipalSecrets.pageToken` (originally cited at model.ts:54): Fixed in regeneration on 2026-05-20 — source file removed; field no longer exists.
- #18 `ListServicePrincipalSecrets.pageSize` (originally cited at model.ts:55): Fixed in regeneration on 2026-05-20 — source file removed; field no longer exists.
- #19 `ServicePrincipalSecret` (originally cited at model.ts:66): Fixed in regeneration on 2026-05-20 — source file removed; type no longer exists.
- #20 `ServicePrincipalSecret.id` / `secret` / `secretHash` / `status` (originally cited at model.ts:68, 70, 72, 78): Fixed in regeneration on 2026-05-20 — source file removed; fields no longer exist.
- #21 `Client` (originally cited at client.ts:42): Fixed in regeneration on 2026-05-20 — source file removed; class no longer exists.
- #22 `Client.createServicePrincipalSecret` / `deleteServicePrincipalSecret` / `listServicePrincipalSecrets` (originally cited at client.ts:72, 101, 129): Fixed in regeneration on 2026-05-20 — source file removed; methods no longer exist.
- #23 `PACKAGE_SEGMENT` (originally cited at client.ts:37): Fixed in regeneration on 2026-05-20 — source file removed; constant no longer exists.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
