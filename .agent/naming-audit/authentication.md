# Naming Audit: authentication

**Path:** `packages/authentication/src/v1/`
**Versions audited:** v1
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `transport.ts`, `index.ts`
**Total weird names flagged:** 1

## Summary table

| Severity | Count |
| --- | --- |
| High | 1 |
| **Total** | **1** |

---

## High severity (must fix)

### 1. `*Proxy` method variants duplicate the entire API surface — `client.ts:499, 561, 645, 682`
- **Why:** The class exposes three real operations
  (`createServicePrincipalSecret`, `deleteServicePrincipalSecret`,
  `listServicePrincipalSecrets`) and, for every one of them, a
  byte-identical `*Proxy` clone (`createServicePrincipalSecretProxy`,
  `deleteServicePrincipalSecretProxy`,
  `listServicePrincipalSecretsProxy`,
  `listServicePrincipalSecretsProxyIter`). The URL, request type,
  response type, headers, and pagination loop are character-for-character
  the same as the non-proxy form. The `Proxy` suffix is a leak of the
  proto/Go RPC routing distinction (gateway-proxied vs direct) and
  carries no observable semantic difference at the TS surface.
- **Category:** Proto-architecture leak (`Proxy` mid/suffix not real)
- **Suggested:** Collapse each pair into a single method
  (`createServicePrincipalSecret`, `deleteServicePrincipalSecret`,
  `listServicePrincipalSecrets`, `listServicePrincipalSecretsIter`).
  The proxy-vs-non-proxy route choice belongs in the transport layer
  (or a `ClientOptions` flag), not in the public method name.
- **Rationale:** `Proxy` here is a routing detail of the Databricks
  identity gateway, not a behaviour the caller cares about. Carrying
  the duplicate on the public client doubles autocomplete clutter for
  a three-operation surface and forces every consumer to pick between
  two methods that do the same thing.
