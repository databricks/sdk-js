# Naming Audit: gitcredentials

**Path:** `packages/gitcredentials/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-gitcredentials` (lowercased compound — the
camel-case domain term is "Git credentials", so the package directory and
module name both drop the obvious word boundary).
**Total weird names flagged:** 3

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | `CreateCredentialsRequest` named with plural noun | model.ts:5 | interface | High | 9 Singular/plural mismatches | The request creates *a single* credential. The name uses the plural "Credentials". The wire endpoint `POST /api/2.0/git-credentials` is plural because that's the collection URL, but the request type is singular. Should be `CreateCredentialRequest`. (Compare `Credential` itself — the resource singular is already chosen.) |
| 2 | `UpdateCredentialsRequest`, `DeleteCredentialsRequest`, `GetCredentialsRequest` named with plural | model.ts:149, 97, 107 | interface set | High | 9 Singular/plural mismatches | Same as #1 — three more cases. `UpdateCredentialsRequest` updates one credential (the JSDoc on the client method confirms: "Updates the specified Git credential"). `DeleteCredentialsRequest` deletes one. `GetCredentialsRequest` gets one. All three should be singular. |
| 3 | `GitCredentialsClient.createCredentials` / `getCredentials` / `listCredentials` / `updateCredentials` / `deleteCredentials` (plural method names) | client.ts:79, 144, 179, 214, 109 | method set | High | 9 Singular/plural mismatches | Five methods all named with the plural "Credentials" even though four of them act on a single credential at a time:<br>- `createCredentials(req)` creates **one** credential.<br>- `getCredentials(req)` gets **one** (selected by `id`).<br>- `updateCredentials(req)` updates **one**.<br>- `deleteCredentials(req)` deletes **one**.<br>- `listCredentials(req)` is the only legitimately plural one.<br>TS idiom for CRUD methods is singular for one-record operations (`createX`/`getX`/`updateX`/`deleteX`) and plural for collection ones (`listXs`/`searchXs`). The five-method API mixes the two and reads as "createCredentials" — i.e., a bulk create. |

---

## High severity (must fix)

### H1. Plural request-type names

Four request envelopes act on a single resource but use the plural noun:
`CreateCredentialsRequest`, `GetCredentialsRequest`, `UpdateCredentialsRequest`,
`DeleteCredentialsRequest`. Plus five client methods of the same name (`createCredentials`,
etc.). The result is that the API reads like a bulk-create surface ("call
`createCredentials` with five credentials") when it is actually a one-at-a-time
API.

```ts
// reads as a bulk create
await client.createCredentials({gitProvider: 'gitHub', ...});

// what the API actually does
await client.createCredential({gitProvider: 'gitHub', ...});
```

Recommendation: keep `listCredentials` (plural — list returns many) but
rename the four single-resource methods and their request types to
singular. See #1, #2, #3.

---

## Medium severity (worth pushing back on)

### M1. Plural `*Credentials` envelopes for single-resource operations

See H1. Repeating because the request-type and method names compound the
plural problem.

### M2. `Credential` (singular) and `*Credentials` (plural) coexist as the same domain term

The model has one *singular* type — `Credential` (the resource) — and
five *plural* request/response types around it. Within one file the same
concept toggles plural/singular at almost every boundary:

| Where | Spelling |
|---|---|
| Resource type | `Credential` |
| Create-request type | `CreateCredentialsRequest` |
| Get-request type | `GetCredentialsRequest` (gets one) |
| Update-request type | `UpdateCredentialsRequest` (updates one) |
| Delete-request type | `DeleteCredentialsRequest` (deletes one) |
| List-request type | `ListCredentialsRequest` (lists many) |
| Wire endpoint | `/api/2.0/git-credentials` (plural collection) |

Pick a rule. Conventional CRUD: plural for collection ops (`listCredentials`,
URL `/credentials`), singular for resource ops (`getCredential`,
`createCredential`, URL `/credentials/{id}`).
