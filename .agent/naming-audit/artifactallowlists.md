# Naming Audit: `artifactallowlists` (v1)

Package path: `/home/parth.bansal/sdk-js/packages/uc/artifactallowlists/`
Files audited: `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/transport.ts`, `src/v1/index.ts`.

## Summary

| Severity  | Count |
| --------- | ----- |
| High      | 1     |
| Medium    | 2     |
| **Total** | **3** |

---

## High Severity

### H1. `SetArtifactAllowlistRequest` carries server-derived fields on a request type

- **File / line:** `src/v1/model.ts:52–63` (`createdBy` at 60, `createdAt`
  at 62).
- **Category:** #16 field contradicting type domain.
- **Current:** Fields `createdBy?: string` and `createdAt?: bigint` are
  present on what is documented as the SET payload — these are server-set
  timestamps/identities and are also present on `ArtifactAllowlistInfo`.
- **Suggestion:** Remove `createdBy` / `createdAt` from
  `SetArtifactAllowlistRequest` (they are response-only), or — if the
  underlying API truly accepts them — clarify in the doc that the server
  ignores them.
- **Rationale:** A request type whose fields include response-only metadata
  is misleading. Even if the server tolerates them, exposing them on the
  request shape invites misuse.

---

## Medium Severity

### M1. `ArtifactAllowlistInfo` — redundant `Info` suffix

- **File / line:** `src/v1/model.ts:29`.
- **Category:** #8 redundant suffix; #14 Go/Java-style name.
- **Current:** `ArtifactAllowlistInfo`.
- **Suggestion:** `ArtifactAllowlist`.
- **Rationale:** `Info` adds no semantic content in TypeScript — the type
  *is* the artifact-allowlist record returned by Get and Set. The `Info`
  suffix is a Go/proto idiom (cf. `CatalogInfo`, `FunctionInfo`,
  `ConnectionInfo`) but TypeScript convention is to keep the noun bare. If
  the codebase deliberately mirrors Go, document it; otherwise dropping
  `Info` would also free `ArtifactAllowlist` as the natural domain noun
  (today, the package has no type with that bare name, even though it is
  literally the "artifact allowlists" package).

### M2. `ArtifactMatcher_MatchType` — proto-style nested enum with underscore leak

- **File / line:** `src/v1/model.ts:19` (const), `model.ts:25` (type).
- **Category:** proto-architectural-leak — `Proto` infix / nested-enum
  underscore.
- **Current:** `ArtifactMatcher_MatchType` (with an inline
  `eslint-disable` comment that literally documents the leak: "Proto-style
  nested enum name").
- **Suggestion:** `ArtifactMatchType` or `MatchType` exported at module
  level. If the parent-child relationship must be preserved, namespace via
  module structure or interface nesting rather than identifier underscores.
- **Rationale:** The `Parent_Child` separator is a protobuf-generated
  artifact for nested types; TypeScript has no equivalent convention and
  the codebase already disables its own naming-convention lint rule to let
  this through. The identifier leaks the proto/IDL layer into the public
  surface of the package.
