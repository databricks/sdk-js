# Naming Audit: serviceprincipalsecrets

> **Status: Package source removed/consolidated in regeneration on 2026-05-22.** All findings below pre-date the consolidation and are no longer actionable against active source. Retained as historical record per the audit policy.

**All findings retired on 2026-05-22.**

**Path:** `packages/serviceprincipalsecrets/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level CRUD over OAuth client secrets attached to
a service principal. Endpoints sit under
`/api/2.0/accounts/<ACCOUNT_ID>/servicePrincipals/<SP_ID>/credentials/secrets`.
**Total weird names flagged:** 0

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

- #1 package `serviceprincipalsecrets` (originally cited at (package)): Fixed in regeneration on 2026-05-20 — package source removed; no `src/` directory remains.
- #2 package `serviceprincipalsecrets` (originally cited at (package)): Fixed in regeneration on 2026-05-20 — package source removed; no `src/` directory remains.
- #3 `CreateServicePrincipalSecret` (originally cited at model.ts:6): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #4 `DeleteServicePrincipalSecret` (originally cited at model.ts:32): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #5 `ListServicePrincipalSecrets` (originally cited at model.ts:44): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #6 `CreateServicePrincipalSecret.servicePrincipal` (originally cited at model.ts:10): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #7 `CreateServicePrincipalSecret.lifetime` (originally cited at model.ts:12): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #8 `CreateServicePrincipalSecretResponse` vs `ServicePrincipalSecret` (originally cited at model.ts:15, 66): Fixed in regeneration on 2026-05-20 — package source removed; symbols no longer present.
- #9 `ServicePrincipalSecret.secret` (originally cited at model.ts:69): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #10 `ServicePrincipalSecret.secretHash` (originally cited at model.ts:71): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #11 `ServicePrincipalSecret.id` (originally cited at model.ts:68): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #12 `ServicePrincipalSecret.status` (originally cited at model.ts:78): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #13 `ServicePrincipalSecret.createTime` (originally cited at model.ts:74): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #14 `ServicePrincipalSecret.updateTime` (originally cited at model.ts:76): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #15 `CreateServicePrincipalSecretResponse.createTime` / `.updateTime` (originally cited at model.ts:23, 25): Fixed in regeneration on 2026-05-20 — package source removed; symbols no longer present.
- #16 `ServicePrincipalSecret.expireTime` (originally cited at model.ts:80): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #17 `ListServicePrincipalSecrets.accountId` / `.servicePrincipal` (originally cited at model.ts:46, 48): Fixed in regeneration on 2026-05-20 — package source removed; symbols no longer present.
- #18 `ListServicePrincipalSecrets.nextPageToken` JSDoc (originally cited at model.ts:62): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #19 `ListServicePrincipalSecrets.pageToken` JSDoc (originally cited at model.ts:50-54): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #20 `Client` (originally cited at client.ts:42): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.
- #21 `Client.createServicePrincipalSecret` etc. (originally cited at client.ts:72, 101, 129): Fixed in regeneration on 2026-05-20 — package source removed; symbols no longer present.
- #22 `executeCall` vs `executeHttpCall` (originally cited at utils.ts:26, 65): Fixed in regeneration on 2026-05-20 — package source removed; symbols no longer present.
- #23 `flattenQueryParams` (originally cited at utils.ts:123): Fixed in regeneration on 2026-05-20 — package source removed; symbol no longer present.

All previous findings are obsolete: the package source was removed in the 2026-05-22 regen. See the status block at the top of this file.

Fixed in regeneration on 2026-05-22.
