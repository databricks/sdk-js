# Naming Audit: credentials

**Path:** `packages/uc/credentials/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-credentials` (top-level module name
collides semantically with the hand-written `@databricks/sdk-auth/credentials`
sub-module).
**Total weird names flagged:** 3

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | `R2Credentials` type | model.ts:881 | interface | Medium | 1 Vague/generic, 5 Cryptic abbreviations | "R2" is Cloudflare's object-storage service name. A reader who doesn't know Cloudflare's product line will be lost. Consider `CloudflareR2Credentials`. |
| 2 | `ListCredentialsPublicRequest` | model.ts:797 | interface | High | 20 Proto-architectural leak | `Public` mid-position is an internal Databricks service-layout artifact (proto/RPC public-vs-internal route distinction). No TS caller cares; the package itself is the public surface. Sibling consolidated UC endpoints have no such infix — confirms `Public` is a wire/service-layer disambiguator that should not leak into the TS surface. |
| 3 | `CredentialsClient.createCredentialsPublic` / `CredentialsClient.deleteCredentialsPublic` / `CredentialsClient.getCredentialsPublic` / `CredentialsClient.listCredentialsPublic` | client.ts:987, 1014, 1040, 1066 | method set | High | 20 Proto-architectural leak | Four public methods on the SDK `CredentialsClient` whose names carry the `Public` suffix. Reads as "the method on the public class that calls the public endpoint" — the suffix is meaningless to a TS caller and only exists because the underlying proto/spec uses `Public` to distinguish account-API routes. |

---

## High severity (must fix)

### H1. `Public` infix proto-architectural leak (1 type + 4 methods)

Findings #2-#3. The package exposes **1 generated type** and **4
`CredentialsClient` methods** whose identifiers carry `Public` as a
mid-position or trailing word. The infix originates from the internal
proto/service definition where
`Public` distinguishes externally-routable account-API endpoints from
internal RPCs; it has no meaning at the TS SDK boundary, where every
exported symbol is by definition public.

Types (model.ts):

- `ListCredentialsPublicRequest` (797).

Methods (client.ts):

- `createCredentialsPublic` (987).
- `deleteCredentialsPublic` (1014).
- `getCredentialsPublic` (1040).
- `listCredentialsPublic` (1066).

Note also: the sibling consolidated UC endpoints (`CreateCredentialRequest`,
`CreateStorageCredentialRequest`, etc.) do *not* carry `Public` even though
they are equally externally-routable. This inconsistency confirms `Public` is
not a deliberate domain term but a wire-layer artifact whose presence depends
on which generation pass produced the type.

(The `CreateCredentialRequest` family is named only as a contrasting example
here; those types are not themselves flagged.)

Recommendation: drop the `Public` token from every identifier at the
generator level. Suggested renames:

| Current | Suggested |
|---------|-----------|
| `ListCredentialsPublicRequest` | `AccountsListCredentialsRequest` |
| `CredentialsClient.createCredentialsPublic` | `CredentialsClient.createAccountsCredentials` |
| `CredentialsClient.listCredentialsPublic` | `CredentialsClient.listAccountsCredentials` |

This is a generator-only fix — there is no way to rename these consistently
without touching the generator/spec.

---

## Medium severity (worth pushing back on)

### M1. `R2Credentials` requires Cloudflare product knowledge

A type named `R2` is identifiable only to readers who know Cloudflare's
product line. Use `CloudflareR2Credentials` to make the cloud provider
explicit in the type name.
