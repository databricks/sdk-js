# Naming Audit: `secrets` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/secrets/`
**Module name:** `@databricks/sdk-secrets`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/index.ts`

---

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 1     |
| Medium      | 3     |
| Observation | 1     |
| **Total**   | **5** |

Headline themes:

1. **Inconsistent action verb across mutating operations.** `Put` for
   creating/updating ACLs and secrets, `Create` for scopes, `Delete` for
   all three. There is no `Update`. Go's REST SDK adopts the same shape, but
   `Put` reads as Go/HTTP-method jargon rather than a TS-side action verb.

---

## High Severity

### H1. Inconsistent action verb: `Put*` mixed with `Create*` and `Delete*`

- **Files / lines:** `src/v1/client.ts:613` (`putAcl`), `:673` (`putSecret`);
  contrast `:139` (`createScope`), `:273` (`deleteSecret`), `:228`
  (`deleteScope`), `:185` (`deleteAcl`).
- **Category:** #17 inconsistent action verbs.
- **Current:** `Put` for ACLs and secrets, `Create` for scopes, `Delete`
  for all three. No `Update`.
- **Issue:** A consumer who learned `createScope` will not guess that the
  way to create or update a secret is `putSecret`, not `createSecret` or
  `setSecret`. The JSDoc itself says "Inserts a secret" (client.ts:642) and
  "Creates or overwrites the ACL" (client.ts:580) — three different verbs
  for the same upsert semantic.
- **Suggestion:** unify on one verb pair: either
  (a) `Create*` for new + `Update*` for existing, or
  (b) `Put*` (upsert) consistently, also renaming `createScope` → `putScope`.
  Picking either gets rid of the asymmetry. Note that the underlying REST
  endpoints are `/secrets/scopes/create`, `/secrets/acls/put`,
  `/secrets/put` — so the wire format is *also* inconsistent and the
  generator is faithfully reproducing it.

---

## Medium Severity

### M1. `AclItem` is generic-suffix tautology

- **File / line:** `src/v1/model.ts:36`.
- **Category:** #20 type-suffix tautology.
- **Current:** `AclItem` describes "an ACL rule". The `Item` suffix is
  meaningless.
- **Suggestion:** rename to `Acl` or `AclEntry` or `AclRule`. The Go SDK
  uses `AclItem`, but in TS the suffix doesn't carry weight: `AclItem` and
  `AclRule` carry exactly the same information.
- **Rationale:** JSDoc on `model.ts:120` says "The associated ACLs rule
  applied to principals" — so the type is conceptually "an ACL rule", but
  it's spelled "AclItem". The doc disagrees with the name.

### M2. `SecretMetadata` describes a list-item, not metadata

- **File / line:** `src/v1/model.ts:180`.
- **Category:** #1 vague/generic, #20 type-suffix tautology.
- **Current:** `SecretMetadata { key, lastUpdatedTimestamp }`. The JSDoc
  says "The metadata about a secret. Returned when listing secrets. Does
  not contain the actual secret value."
- **Suggestion:** `SecretSummary`, `SecretListItem`, or `SecretInfo` (to
  match the codebase-wide `*Info` pattern from `credentials`, `catalogs`,
  etc.). `SecretMetadata` is misleading: the type carries the secret's
  *name* (`key`) and *timestamp*, which is the secret itself sans value,
  not "metadata about" it.
- **Rationale:** `Metadata` typically denotes auxiliary descriptive data
  (tags, schema, labels). Here the type *is* the secret as exposed by
  list — it lacks only the value. `SecretSummary` reads correctly.

### M3. `ScopeBackendType` enum name is an architectural leak

- **File / line:** `src/v1/model.ts:19` (`ScopeBackendType` enum).
- **Category:** proto-architectural-leak (`Backend` mid-position, not a
  domain noun).
- **Issue:** the public surface uses `Backend` to mean "where the secret
  data is stored" — either Databricks-managed storage or Azure KeyVault.
  `Backend` is an implementation/architecture term (frontend/backend
  layering), not a user-facing domain concept. A consumer sees
  `ScopeBackendType` and reads it as a deployment/architecture flag,
  rather than what the type actually denotes: the *storage provider* or
  *vault provider* of the scope.
- **Suggestion:** rename to a domain term. Options:
  - `ScopeBackendType` → `ScopeStorageType` or `SecretStorageProvider`.
- **Rationale:** every other type in the package uses domain nouns
  (`scope`, `key`, `principal`, `permission`). `Backend` is the one
  outlier that smuggles in implementation jargon. Same defect appears in
  several other audits where "backend" describes an integration/provider
  layer (e.g., `connections.md` flags `ConnectionType` analogues).

---

## Observations

### O1. `scope` is optional on every request type, but required at the server

- **Files / lines:** see model.ts request types.
- The generator marks every proto field optional. The runtime contract
  requires `scope` for ten of eleven operations. Not a naming defect but
  worth noting: the type is wider than the API allows.

---
