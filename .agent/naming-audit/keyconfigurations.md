# Naming Audit: keyconfigurations

**Path:** `packages/keyconfigurations/src/v1/`
**Versions audited:** v1
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `transport.ts`, `index.ts`
**Inferred domain:** Account-level CRUD over customer-managed key (CMK)
configurations used to encrypt Databricks-managed resources. Endpoints sit
under `/api/2.0/accounts/<ACCOUNT_ID>/customer-managed-keys`. Supports AWS
KMS, Azure Key Vault, and GCP KMS key info variants.
**Total weird names flagged:** 1

## Summary table

| Severity | Count |
| --- | --- |
| High | 0 |
| Medium | 1 |
| Low | 0 |
| Observation | 0 |
| **Total** | **1** |

The audit is narrowly scoped to proto/architectural leaks. The remaining
finding is a `Public` suffix on every public method of `Client`, mirroring
the proto-side distinction between a `Public` (customer-facing, account
API) RPC and an internal/private variant. From the TS surface this
carries no observable semantic difference — every method here is already
public by virtue of being exported.

---

## High severity (must fix)

_None._

---

## Medium severity (worth pushing back on)

### 1. `Public` suffix on every `Client` method — `client.ts:92, 121, 159, 184`
- **Why:** Every method on `Client` carries the `Public` suffix:
  `createCustomerManagedKeyPublic` (client.ts:92),
  `deleteCustomerManagedKeyPublic` (client.ts:121),
  `getCustomerManagedKeyPublic` (client.ts:159), and
  `listCustomerManagedKeyPublic` (client.ts:184). This is a proto-audience
  leak surfaced on the most caller-visible symbols in the package. A
  consumer writing `client.createCustomerManagedKeyPublic(...)` sees no
  contrast to a hypothetical non-public form, because none is exported.
- **Category:** Proto-architecture leak (`Public` mid/suffix audience
  marker on method names)
- **Suggested:** Rename to `createCustomerManagedKey`,
  `deleteCustomerManagedKey`, `getCustomerManagedKey`, and
  `listCustomerManagedKey` (or `listCustomerManagedKeys`, matching the
  return shape).
- **Rationale:** The underlying request/response types have already
  dropped the `Public` infix (see Fixed); the methods are the last
  callers still exposing the proto routing detail. The current names
  are also longer than every comparable method in sibling configuration
  packages (`networkconfigurations`, `storageconfigurations`,
  `credentialconfigurations`).

---

## Low severity (nits)

_None._

---

## Observations (not flags)

_None._

---
