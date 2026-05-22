# Naming Audit: authentication

**Path:** `packages/authentication/src/v1/`
**Versions audited:** v1
**Files audited:** `model.ts`, `client.ts`, `utils.ts`, `transport.ts`, `index.ts`
**Inferred domain:** Account-level CRUD over OAuth client secrets attached to
a service principal (create, list, delete). The previous
`serviceprincipalsecretsproxy` package was merged in, so both the
non-proxy and proxy RPC variants now live under one client.
**Total weird names flagged:** 4

## Summary table

| Severity | Count |
| --- | --- |
| High | 1 |
| Medium | 3 |
| Low | 0 |
| Observation | 0 |
| **Total** | **4** |

The audit is narrowly scoped to proto/architectural leaks. The
package exposes only one resource (`ServicePrincipalSecret`), so the
findings cluster around two themes: (1) a duplicate
`<method>` / `<method>Proxy` API surface that mirrors the proto's
proxy-vs-non-proxy RPC routing distinction, and (2) the proto
`Request_Response` underscore-nested message name leaking into TS as
the empty `DeleteServicePrincipalSecretRequest_Response` and the
populated `ListServicePrincipalSecretsRequest_Response`.

---

## High severity (must fix)

### 1. `*Proxy` method variants duplicate the entire API surface — `client.ts:491, 551, 633, 669`
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

---

## Medium severity (worth pushing back on)

### 1. `DeleteServicePrincipalSecretRequest_Response` — proto-style `Request_Response` nesting on the public type — `model.ts:90`
- **Why:** The empty interface
  `DeleteServicePrincipalSecretRequest_Response` is exported (and
  re-exported from `index.ts:15`) using the proto-nested
  `<Parent>_<Child>` underscore convention. It is the only place in
  the TS surface where a delete operation returns a nested empty
  message; the underscore identifier exists purely because the proto
  schema modelled the response as a nested message inside the request
  type.
- **Category:** Proto-architecture leak (`Request_Response` infix
  underscore from proto nesting)
- **Suggested:** Either drop the empty response type and have
  `deleteServicePrincipalSecret` return `Promise<void>`, or expose
  the type as `DeleteServicePrincipalSecretResponse` (sibling-cased,
  no underscore) for symmetry with
  `CreateServicePrincipalSecretResponse`.
- **Rationale:** No consumer writes a value of this type — the body
  is empty. The underscored identifier requires an eslint disable
  comment to compile and forces callers reading types to learn proto
  message-nesting rules.

### 2. `ListServicePrincipalSecretsRequest_Response` — proto-style `Request_Response` nesting on the public type — `model.ts:173`
- **Why:** Same shape as finding M1: the response is exported through
  `index.ts:23` as `ListServicePrincipalSecretsRequest_Response`
  because the proto schema modelled it as a nested message inside the
  request. Unlike M1, this one carries fields (`secrets`,
  `nextPageToken`) and is actually consumed, so the underscore name
  is visible at every call site.
- **Category:** Proto-architecture leak (`Request_Response` infix
  underscore from proto nesting)
- **Suggested:** Rename to `ListServicePrincipalSecretsResponse` to
  match the existing `CreateServicePrincipalSecretResponse`
  convention used in the same file.
- **Rationale:** The sibling `CreateServicePrincipalSecretResponse`
  is already named with the unnested form, so the package is
  internally inconsistent: of three operations, only `create` gets a
  clean response name. Aligning the two list/delete responses
  removes the eslint disable and makes the type discoverable without
  understanding the proto layout.

### 3. `Client` methods returning the underscored response types — `client.ts:526, 554, 582, 636`
- **Why:** Four public method signatures bake the proto-nested
  `*Request_Response` identifier into their return types
  (`Promise<DeleteServicePrincipalSecretRequest_Response>`,
  `Promise<ListServicePrincipalSecretsRequest_Response>`). The
  underscore identifier propagates from `model.ts` into the client
  contract and surfaces in hover tooltips and generated docs for
  every method.
- **Category:** Proto-architecture leak (`Request_Response` infix
  underscore from proto nesting)
- **Suggested:** Resolves automatically once the underlying types
  are renamed per medium findings M1 and M2.
- **Rationale:** The leak is observable on the most public surface
  (method signatures), not just an internal type alias.

---

## Low severity (nits)

_None._

---

## Observations (not flags)

_None._

---

## File coverage

| File | Lines read | Coverage |
| ---- | ---------- | -------- |
| `src/v1/index.ts` | 28 / 28 | 100% |
| `src/v1/transport.ts` | 75 / 75 | 100% |
| `src/v1/utils.ts` | 150 / 150 | 100% |
| `src/v1/model.ts` | 502 / 502 | 100% |
| `src/v1/client.ts` | 688 / 688 | 100% |

All types, fields, and methods reviewed for proto-architectural leaks
(`Proxy` suffix; `Request_Response` proto-nested underscore
identifiers). Standard suffixes at end (e.g. `*Request`, `*Response`,
`*Schema`), real-domain prefixes (e.g. `ServicePrincipal*`), and
`OAuth*` lexicon are not flagged.
