# Naming Audit: `artifactallowlists` (v1)

Package path: `/home/parth.bansal/sdk-js/packages/artifactallowlists/`
Files audited: `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`,
`src/v1/transport.ts`, `src/v1/index.ts`.

Notation: file paths are absolute. Findings reference `file:line`.

## Summary

| Severity    | Count |
| ----------- | ----- |
| High        | 1     |
| Medium      | 3     |
| Low         | 0     |
| Observation | 2     |
| **Total**   | **6** |

Headline themes:

1. **Redundant `Info` suffix on `ArtifactAllowlistInfo`** is the canonical
   payload type for both `Get` and `Set` responses; the suffix adds no
   information beyond "this is a struct."
2. **Server-derived fields leak onto a request type** —
   `SetArtifactAllowlistRequest` exposes `createdBy` / `createdAt`, which are
   response-only metadata.

Allowlist casing is **consistent** throughout the package (always
`Allowlist`, never `AllowList` or `Whitelist`).

---

## High Severity

### H1. `SetArtifactAllowlistRequest` carries server-derived fields on a request type

- **File / line:** `src/v1/model.ts:44–55`.
- **Category:** #16 field contradicting type domain.
- **Current:** Fields `createdBy?: string` and `createdAt?: number` are
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

- **File / line:** `src/v1/model.ts:21`.
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

### M2. `GetArtifactAllowlistRequest` / `SetArtifactAllowlistRequest` use inconsistent
verbs vs. UC sibling APIs

- **File / line:** `src/v1/model.ts:39, 44`; `client.ts:66, 96`.
- **Category:** #17 inconsistent action verbs.
- **Current:** `Get…` + `Set…`.
- **Suggestion:** Confirm whether `Set` is intentional vs. `Update`. The Unity
  Catalog REST API frequently uses `PUT` semantics with `Update…` verbs (see
  `catalogs`, `connections`, `externallocations`, `storagecredentials`).
- **Rationale:** The HTTP method here is `PUT` (`client.ts:106`) and the
  docstring says "The whole artifact allowlist is replaced with the new
  allowlist" — a replace semantic. UC peers typically expose this as
  `update…`. If the API spec dictates `Set`, this is correct; the audit
  flags it because the verb is unique within UC.

### M3. `ArtifactMatcher_MatchType` — proto-style nested enum with underscore leak

- **File / line:** `src/v1/model.ts:15`.
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

---

## Low Severity

_None._

---

## Observations (Repo-wide conventions, not local defects)

### O1. `…Info` suffix repeated across UC types

`ArtifactAllowlistInfo` follows the `CatalogInfo`, `ConnectionInfo`,
`FunctionInfo`, `ExternalLocationInfo`, `SchemaInfo` pattern. If the
codebase decides to drop the `Info` suffix, this is one of many to fix.

### O2. Allowlist terminology / casing is consistent

`Allowlist` (single uppercase A, then lowercase `llowlist`) is used in
every position in this package: type names, methods, schemas, comments,
URL paths (`/artifact-allowlists/`), and the package name
`@databricks/sdk-artifactallowlists`. No `AllowList`, `Allow_list`, or
`Whitelist` anywhere. **Passes** the audit on this criterion.

---

## Domain glossary

| Term                       | Meaning in this package                                    |
| -------------------------- | ---------------------------------------------------------- |
| Artifact                   | A user-supplied resource (init script / jar / maven coord) installed onto a cluster. |
| Artifact type              | One of `INIT_SCRIPT`, `LIBRARY_JAR`, `LIBRARY_MAVEN` — the kind of artifact being allowed. |
| Allowlist                  | Per-metastore list of artifacts permitted to run. Replaces the older "whitelist" terminology. |
| ArtifactMatcher            | One rule entry on the allowlist: an `(artifact, matchType)` pair. |
| MatchType / MATCH_TYPE     | How the matcher compares the candidate artifact to the stored pattern. Today only `PREFIX_MATCH`; spec reserves room for `EXACT_MATCH`, `WILDCARDS`. |
| Metastore                  | Unity Catalog top-level container the allowlist is scoped to. |
| Set / PUT                  | Replace-the-whole-allowlist semantic. Not an additive update. |

---

## File coverage

| File           | Lines | Audited                                          |
| -------------- | ----- | ------------------------------------------------ |
| `src/v1/model.ts`     | 111 | All 4 types + 2 enums + 3 schemas + every field. |
| `src/v1/client.ts`    | 121 | Class, constructor, 2 methods, all locals.       |
| `src/v1/utils.ts`     | 151 | All 7 exported / private functions and types.    |
| `src/v1/transport.ts` | 76  | `newHttpClient` factory + 2 wrapper classes.     |
| `src/v1/index.ts`     | 13  | All re-exports.                                  |

Type & symbol checklist:

- [x] `ArtifactType` enum (4 members) → no defect.
- [x] `ArtifactMatcher_MatchType` enum (2 members) → M3.
- [x] `ArtifactAllowlistInfo` interface (4 fields) → M1, O1.
- [x] `ArtifactMatcher` interface (2 fields) → no defect.
- [x] `GetArtifactAllowlistRequest` interface (1 field) → no defect.
- [x] `SetArtifactAllowlistRequest` interface (5 fields) → H1.
- [x] `Client` class + `host` / `httpClient` / `logger` / `userAgent` fields → no defect.
- [x] `getArtifactAllowlist(req, options)` method → M2.
- [x] `setArtifactAllowlist(req, options)` method → M2.
- [x] `index.ts` re-exports → no defect (mirrors model exports faithfully).

---
