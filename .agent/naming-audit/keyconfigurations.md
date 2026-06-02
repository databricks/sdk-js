# Naming Audit: keyconfigurations

**Path:** `packages/keyconfigurations/src/v1/`
**Versions audited:** v1
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `transport.ts`, `index.ts`
**Total weird names flagged:** 1

## Summary table

| Severity | Count |
| --- | --- |
| Medium | 1 |
| **Total** | **1** |

---

## Medium severity (worth pushing back on)

### 1. `Public` suffix on every `Client` method — `client.ts:89, 118, 156, 181`
- **Why:** Every method on `Client` carries the `Public` suffix:
  `createCustomerManagedKeyPublic` (client.ts:89),
  `deleteCustomerManagedKeyPublic` (client.ts:118),
  `getCustomerManagedKeyPublic` (client.ts:156), and
  `listCustomerManagedKeyPublic` (client.ts:181). This is a proto-audience
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
  dropped the `Public` infix; the methods are the last
  callers still exposing the proto routing detail. The current names
  are also longer than every comparable method in sibling configuration
  packages (`networkconfigurations`, `storageconfigurations`,
  `credentialconfigurations`).
