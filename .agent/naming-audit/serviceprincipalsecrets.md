# Naming Audit: serviceprincipalsecrets

**Path:** `packages/serviceprincipalsecrets/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level CRUD over OAuth client secrets attached to
a service principal. Endpoints sit under
`/api/2.0/accounts/<ACCOUNT_ID>/servicePrincipals/<SP_ID>/credentials/secrets`.
**Total weird names flagged:** 23

---

## Summary table

| # | Name | File | Kind | Severity | Category | Issue (one-liner) |
|---|------|------|------|----------|----------|-------------------|
| 1 | package `serviceprincipalsecrets` | (package) | package | High | 12 Duplicate concepts | Byte-for-byte identical to sibling `serviceprincipalsecretsproxy` (same model, client, utils, index). `Proxy` is encoded nowhere in code or URL. |
| 2 | package `serviceprincipalsecrets` | (package) | package | Medium | 14 Go/Java-style names not idiomatic TS | Long undelimited compound name; `service-principal-secrets` would parse, and the cousin `serviceprincipalsecretsproxy` makes it worse (28-char npm path). |
| 3 | `CreateServicePrincipalSecret` | model.ts:6 | interface | Medium | 8 Redundant suffixes, 14 Go/Java-style names | Request type named after the verb-noun phrase. TS norm is `CreateServicePrincipalSecretRequest` (which is what every other generated package uses — see `*Request` convention). Bare `CreateServicePrincipalSecret` reads like a resource, not an action. |
| 4 | `DeleteServicePrincipalSecret` | model.ts:32 | interface | Medium | 8 Redundant suffixes, 14 Go/Java-style names | Same as #3 — verb-name without `Request` suffix; collides semantically with `ServicePrincipalSecret` (the resource). |
| 5 | `ListServicePrincipalSecrets` | model.ts:44 | interface | Medium | 8 Redundant suffixes, 14 Go/Java-style names, 9 Singular/plural mismatches | Same as #3. Plural `Secrets` further blurs the request/resource boundary — caller sees `ListServicePrincipalSecrets` and the response type `ServicePrincipalSecret[]`. |
| 6 | `CreateServicePrincipalSecret.servicePrincipal` | model.ts:10 | field | High | 1 Vague/generic without domain context, 15 Generic field names losing meaning, 19 Underspecified IDs | Field is the service principal **ID** (per JSDoc `The service principal ID.`) but the field name implies the principal object itself. Should be `servicePrincipalId`. Same problem in `DeleteServicePrincipalSecret` (model.ts:35) and `ListServicePrincipalSecrets` (model.ts:47). |
| 7 | `CreateServicePrincipalSecret.lifetime` | model.ts:12 | field | Low | 1 Vague/generic without domain context | `lifetime: Temporal.Duration` — fine, but the default ("730 days") is documented in JSDoc only; no constant exposed. `secretLifetime` would tie the field to the resource it bounds. |
| 8 | `CreateServicePrincipalSecretResponse` vs `ServicePrincipalSecret` | model.ts:15, 66 | interface pair | High | 12 Duplicate concepts | Both interfaces have identical fields (`id`, `secret`, `secretHash`, `createTime`, `updateTime`, `status`, `expireTime`). One of them is redundant — `CreateServicePrincipalSecretResponse` could `extends ServicePrincipalSecret` or be a type alias. |
| 9 | `ServicePrincipalSecret.secret` | model.ts:69 | field | Medium | 1 Vague/generic without domain context, 15 Generic field names losing meaning | `secret.secret` is a stutter. JSDoc says `Secret Value`. Rename to `value` or `clearTextValue`; `ServicePrincipalSecret.value` is unambiguous. Same field appears in `CreateServicePrincipalSecretResponse.secret` (model.ts:19). |
| 10 | `ServicePrincipalSecret.secretHash` | model.ts:71 | field | Low | 1 Vague/generic without domain context | `secret.secretHash` is also a stutter. `hash` is enough. (Both `secret` and `secretHash` then need renaming; otherwise drop just the `secret` prefix here.) |
| 11 | `ServicePrincipalSecret.id` | model.ts:68 | field | Medium | 19 Underspecified IDs, 15 Generic field names losing meaning | Top-level `id: string` is the secret's ID. Should be `secretId` to match `DeleteServicePrincipalSecret.secretId` (model.ts:38), which refers to the same value. The asymmetry forces callers to remember the mapping. |
| 12 | `ServicePrincipalSecret.status` | model.ts:78 | field | High | 1 Vague/generic without domain context, 18 Long enum values | `status: string` — open string with no enum, no JSDoc enumeration of possible values. The Go SDK likely encodes this as `ACTIVE`/`PENDING`/`REVOKED` etc. but TS is left with a stringly-typed field. Should be a `ServicePrincipalSecretStatus` string-literal union. |
| 13 | `ServicePrincipalSecret.createTime` | model.ts:74 | field | Medium | 1 Vague/generic without domain context, 16 Field contradicting type domain | Typed `string \| undefined` but JSDoc says `UTC time when the secret was created`. Sibling `expireTime` (model.ts:80) is `Temporal.Instant`. The two date fields have **different runtime types** for the same semantic. Pick one (likely `Temporal.Instant` for both). |
| 14 | `ServicePrincipalSecret.updateTime` | model.ts:76 | field | Medium | 16 Field contradicting type domain | Same problem as #13 — `string` instead of `Temporal.Instant`. |
| 15 | `CreateServicePrincipalSecretResponse.createTime` / `.updateTime` | model.ts:23, 25 | field | Medium | 16 Field contradicting type domain | Mirrors #13/#14 in the response shape (since the two shapes are duplicates). |
| 16 | `ServicePrincipalSecret.expireTime` | model.ts:80 | field | Low | 13 Verb-tense inconsistency | Sibling fields use past tense (`createTime`, `updateTime` — when the action happened). `expireTime` is future tense. Either rename to `expiresAt` / `expirationTime`, or keep all three with consistent grammar (`createdAt`/`updatedAt`/`expiresAt`). |
| 17 | `ListServicePrincipalSecrets.accountId` / `.servicePrincipal` | model.ts:46, 48 | field | Medium | 16 Field contradicting type domain | These are URL path parameters, not list filters. Other SDK packages document this; here the request shape mixes path params (`accountId`, `servicePrincipal`) and query params (`pageToken`, `pageSize`) with no distinction. Caller sees one bag-of-fields. |
| 18 | `ListServicePrincipalSecrets.nextPageToken` JSDoc | model.ts:62 | comment | Low | 3 Acronym casing inconsistencies | The JSDoc (model.ts:62) uses backticked `page_token` not `pageToken`, which is the wire spelling — confusing for TS consumers. |
| 19 | `ListServicePrincipalSecrets.pageToken` JSDoc | model.ts:50-54 | comment | Low | 3 Acronym casing inconsistencies | The JSDoc says `next_page_token`, `page_token`, and `nextPageToken` — three spellings of two fields in one comment. Doc generator should normalise to the TS field names. |
| 20 | `Client` | client.ts:42 | class | Medium | 1 Vague/generic without domain context | Top-level `Client` with no qualifier. A consumer that imports `{Client}` from this package and from any other SDK package has to alias each one. Suggest `ServicePrincipalSecretsClient` (or a namespace re-export). |
| 21 | `Client.createServicePrincipalSecret` etc. | client.ts:72, 101, 129 | method | Medium | 7 Overly verbose | Method names repeat the package name (`createServicePrincipalSecret` inside the `serviceprincipalsecrets` package). After namespacing it becomes `serviceprincipalsecrets.Client.createServicePrincipalSecret(...)` — `create(req)` would suffice if the package boundary is preserved. |
| 22 | `executeCall` vs `executeHttpCall` | utils.ts:26, 65 | function pair | Medium | 17 Inconsistent action verbs | Same shared-utils issue across the SDK: two `execute*` functions in one file with overlapping vocabulary. `executeCall` orchestrates retries/timeouts via the public `CallOptions`; `executeHttpCall` does one HTTP roundtrip and converts errors. Names should distinguish them — e.g. `runWithOptions` / `sendRequest`. |
| 23 | `flattenQueryParams` (dead code) | utils.ts:123 | function | Low | 10 Dead code | Exported from `utils.ts` but never imported in `client.ts` (which builds query strings inline via `URLSearchParams` at client.ts:134-142). Either remove or use it. |

---

## High severity (must fix)

### H1. Whole-package duplication: `serviceprincipalsecrets` vs `serviceprincipalsecretsproxy`

The two packages have:

- **Identical files.** `diff` across all four files (`model.ts`, `client.ts`,
  `utils.ts`, `index.ts`) produces zero output.
- **The same** seven exported types: `CreateServicePrincipalSecret`,
  `CreateServicePrincipalSecretResponse`, `DeleteServicePrincipalSecret`,
  `DeleteServicePrincipalSecret_Response`, `ListServicePrincipalSecrets`,
  `ListServicePrincipalSecrets_Response`, `ServicePrincipalSecret`.
- **The same** client methods: `createServicePrincipalSecret`,
  `deleteServicePrincipalSecret`, `listServicePrincipalSecrets`.
- **The same** URL path:
  `/api/2.0/accounts/<id>/servicePrincipals/<sp>/credentials/secrets`.

The string `proxy` (or `Proxy`) appears **nowhere** in the model, client,
URL, or JSDoc. The only differentiator is the `package.json#name`
(`@databricks/sdk-serviceprincipalsecretsproxy`) and the directory name.

This is a category 12 (duplicate concepts) failure at the package level.
Either:

- Merge the two packages and let one Client serve both deployment surfaces.
- Or surface the proxy semantics in the types/URL (`ProxyClient`, different
  base path, different headers, etc.) so the proxy variant is recognisable
  in code.

Until that is done, every consumer must read the docs to decide which
package to import. Once both are imported, all symbols collide on
re-export.

### H2. `CreateServicePrincipalSecretResponse` is structurally `ServicePrincipalSecret`

```ts
// model.ts:15
export interface CreateServicePrincipalSecretResponse {
  id?, secret?, secretHash?, createTime?, updateTime?, status?, expireTime?
}

// model.ts:66
export interface ServicePrincipalSecret {
  id?, secret?, secretHash?, createTime?, updateTime?, status?, expireTime?
}
```

The two interfaces have the **same** seven fields with the **same** types
and the **same** JSDoc. One of them is redundant. Options:

- `type CreateServicePrincipalSecretResponse = ServicePrincipalSecret;`
- `interface CreateServicePrincipalSecretResponse extends ServicePrincipalSecret {}`
- Inline `ServicePrincipalSecret` into the create method's return type.

Either way the duplicated shape is wasted bundle size.

### H3. `*.servicePrincipal` is misleading

```ts
// model.ts:10, 35, 48
servicePrincipal?: string | undefined;  // JSDoc: "The service principal ID."
```

The field is the service principal **ID** (a string), but the name reads
as if the value is the `ServicePrincipal` object. The wire form is
`service_principal` (model.ts:160) — the wire is the misleading source.
Rename the TS field to `servicePrincipalId` and let the wire spelling be
preserved at the transport layer. Same fix is needed for the URL
parameter use at client.ts:76, 105, 133.

### H4. `ServicePrincipalSecret.status: string` should be a string-literal union

```ts
status?: string | undefined;  // JSDoc: "Status of the secret"
```

No enum, no documented values. A consumer who switches on the status has
to guess what strings are possible. The Go SDK almost certainly types
this as an `enum`. The TS port loses that information and types it as
arbitrary `string`. Recover the enum (`'ACTIVE' | 'PENDING' | 'REVOKED'`
or whatever the spec says) so the type system can help.

---

## Medium severity (worth pushing back on)

### M1. Request types lack a `Request` suffix

Across the SDK the request convention is `<Verb><Noun>Request`. Here the
generator drops `Request`:

```ts
export interface CreateServicePrincipalSecret { ... }
export interface DeleteServicePrincipalSecret { ... }
export interface ListServicePrincipalSecrets { ... }
```

So `CreateServicePrincipalSecret` could plausibly be either the request
payload **or** an action (think `function createServicePrincipalSecret`).
Compare to the response side which **does** carry the suffix:
`CreateServicePrincipalSecretResponse`. The asymmetry is the giveaway.
Suggested: `CreateServicePrincipalSecretRequest` etc.

### M2. Date fields are typed inconsistently

```ts
createTime?: string | undefined;          // model.ts:74
updateTime?: string | undefined;          // model.ts:76
expireTime?: Temporal.Instant | undefined; // model.ts:80
```

The same shape uses `string` for two date fields and `Temporal.Instant`
for the third. Pick one — Temporal for all three is the principled fix.

### M3. `ServicePrincipalSecret.secret` stutters

```ts
secret: ServicePrincipalSecret = { id, secret, secretHash, ... };
secret.secret    // the secret of the secret
secret.secretHash // the hash of the secret of the secret
```

Inside a `ServicePrincipalSecret` value, the `secret` and `secretHash`
fields are stutter. Rename to `value` and `hash`:

```ts
secret.value
secret.hash
```

Naturally reads "the secret's value" / "the secret's hash".

### M4. `id` vs `secretId`

`ServicePrincipalSecret.id` (model.ts:68) and
`DeleteServicePrincipalSecret.secretId` (model.ts:38) are the same value
under two different names. The caller who reads from the create response
gets `id`; the caller who builds the delete request must rename to
`secretId`. Pick one (`secretId` is clearer at the model level since
`ServicePrincipalSecret` is the resource and only its ID is the ID).

### M5. `Client` is unqualified

```ts
export class Client { ... }
```

A consumer that imports `{Client}` from this and any sibling package has
to alias each one. Suggest `ServicePrincipalSecretsClient` or rely on
namespace imports
(`import * as serviceprincipalsecrets from '@databricks/sdk-serviceprincipalsecrets/v1'`).

### M6. Method names duplicate the package name

```ts
client.createServicePrincipalSecret(...)
client.deleteServicePrincipalSecret(...)
client.listServicePrincipalSecrets(...)
```

After namespacing the call site reads
`serviceprincipalsecrets.client.createServicePrincipalSecret(...)`. Inside
a `ServicePrincipalSecretsClient`, `create(req)` / `delete(req)` /
`list(req)` are sufficient. (`delete` is a reserved word in JS, but legal
as a method name.) This is consistent across the SDK; not unique here.

### M7. `executeCall` vs `executeHttpCall`

Identical to sibling packages. Two `execute*` functions in `utils.ts`:

- `executeCall` (utils.ts:26): orchestrates retries/timeouts.
- `executeHttpCall` (utils.ts:65): does one HTTP roundtrip and converts
  errors.

Two near-identical names within one file is a navigation hazard.
Suggested: `runWithOptions` / `sendRequest`.

### M8. `ListServicePrincipalSecrets` mixes path and query parameters

```ts
export interface ListServicePrincipalSecrets {
  accountId?, servicePrincipal?,  // path params
  pageToken?, pageSize?,          // query params
}
```

No structural cue tells the caller which fields end up in the URL path
vs the query string. The client treats them differently
(`accountId`/`servicePrincipal` are interpolated into the URL, the others
go through `URLSearchParams`). Not a naming problem per se, but the field
names give no hint.

---

## Low severity (nits)

### L1. `expireTime` verb tense vs `createTime` / `updateTime`

`createTime` and `updateTime` are past-tense ("when the create happened"),
but `expireTime` is future-tense. Consistent options are
`createdAt`/`updatedAt`/`expiresAt` (idiomatic TS) or
`createTime`/`updateTime`/`expirationTime`.

### L2. `lifetime` could be `secretLifetime`

`lifetime: Temporal.Duration` reads fine in context, but as a standalone
field name carries no domain. `secretLifetime` ties the field to the
resource. Minor.

### L3. `pageToken` JSDoc uses three different spellings

```ts
// model.ts:50-54
/**
 * An opaque page token which was the `next_page_token` in the response of
 * the previous request to list the secrets for this service principal.
 * Provide this token to retrieve the next page of secret entries.
 * When providing a `page_token`, all other parameters provided to the
 * request must match the previous request.
 * To list all of the secrets for a service principal, it is necessary to
 * continue requesting pages of entries until the response contains no
 * `next_page_token`. Note that the number of entries returned must not be
 * used to determine when the listing is complete.
 */
pageToken?: string | undefined;
```

The comment mixes `next_page_token` (wire), `page_token` (wire), and the
TS field is `pageToken`. A TS-facing JSDoc should use the TS spellings.

### L4. `flattenQueryParams` is exported but unused

`utils.ts:123` exports `flattenQueryParams`. `client.ts` never imports it
(query strings are built inline via `URLSearchParams` at client.ts:134-142).
Either delete it or use it. Either way the dead export pollutes the API
surface that `index.ts` does not re-export.

### L5. `HttpCallOptions` is generic

Internal `interface` with `{request, httpClient, logger}`. Inside one
file this is fine. If it ever leaks out, `ExecuteHttpCallParams` would
self-document and avoid collision with the public `CallOptions`.

### L6. `PACKAGE_SEGMENT`

```ts
// client.ts:37
const PACKAGE_SEGMENT = {...};
```

Used only for the User-Agent header. `USER_AGENT_PACKAGE_SEGMENT` makes
the call site (`createDefault().with(PACKAGE_SEGMENT)`) self-explanatory.

### L7. `req` vs `request`

Method parameters are named `req` (client.ts:73, 102, 130, 166). TS code
in the wider ecosystem more commonly uses `request` or `params`. `req`
leans Go-idiomatic. Minor stylistic point.

### L8. `'Host is required.'`

```ts
// client.ts:56
throw new Error('Host is required.');
```

Not a naming issue, but the package throws plain `Error` rather than a
typed `ConfigError`/`MissingOptionError`. Consistent with sibling
packages.

### L9. `'API call completed without a result.'`

```ts
// client.ts:95, 123, 160
throw new Error('API call completed without a result.');
```

Unreachable branch for `delete*` (response is always parseable as
`{}`), and arguably "result" is misleading when the API returns nothing.

---

## Observations (not flags)

- **Generator marker.** Every file is prefixed with `// Code generated
  from API definition by Databricks SDK Generator. DO NOT EDIT.` so all
  naming issues must be fixed upstream in the generator/spec, not in
  this file.
- **No enums.** The package has zero `enum` types, so categories 2
  (redundant enum prefixes) and 18 (long enum values) apply only to
  `ServicePrincipalSecret.status` which is a `string`, not a literal
  union (flagged as H4).
- **Acronym casing.** Only `accountId` (camelCase, idiomatic) and
  `nextPageToken` (camelCase, idiomatic) appear. No `Url`/`URL`,
  `Sql`/`SQL`, `Json`/`JSON`, `Oauth`/`OAuth` collisions.
- **Reserved-word collisions.** None. (`delete` is a method name on
  `Client`, but `client.delete` would be legal; here the method is
  `deleteServicePrincipalSecret` so the question doesn't arise.)
- **Singular/plural mismatches.** `ListServicePrincipalSecrets` (request
  is plural, response field is `secrets`, items are
  `ServicePrincipalSecret`). Mostly clean but the request name `List…s`
  is the one stutter.
- **Optionality model.** Every field is `T | undefined`. Consistent
  with the rest of the SDK and `exactOptionalPropertyTypes`. No issue.
- **Versioning.** Only `v1` exists; nothing to compare across versions.
- **Tests.** No `tests/` directory for this package; `package.json`
  scripts return `'no tests'`.
- **`index.ts` re-export style.** All seven types are re-exported as
  `export type {...}`, which is correct for `verbatimModuleSyntax`. No
  issue. The line `export {} from './model';` (index.ts:5) is a no-op
  side-effect re-export — not a naming problem but slightly odd.
- **`Client` constructor throws plain `Error`** for missing `host`
  (client.ts:55). Consistent with sibling packages, but not a naming
  concern.

---

## Domain glossary (as inferred from this code)

| Term | Meaning in this package |
|------|-------------------------|
| **Account ID** | The numeric Databricks account identifier (path parameter `<ACCOUNT_ID>` in every URL). |
| **Service principal** | The owning identity for the secret; addressed by ID even though the field is named `servicePrincipal`. |
| **Service principal secret** | The unit resource: an OAuth client secret attached to a service principal, with an `id`, opaque `secret` value, hash, status, and lifecycle timestamps (`createTime`, `updateTime`, `expireTime`). |
| **Lifetime** | A `Temporal.Duration` (default 730 days / 63072000s) controlling when the secret expires. |
| **Secret value** | The plaintext secret returned at creation time (`secret`), opaque on read. |
| **Secret hash** | A hash of the plaintext secret (`secretHash`); typed `string`, no algorithm documented. |
| **Status** | A string label (probably one of `ACTIVE`/`PENDING`/`REVOKED`) — but the field is plain `string`. |
| **Page token** | An opaque continuation cursor for pagination over `listServicePrincipalSecrets`. |
| **Proxy** | Not visible anywhere in the API surface — the sibling package name is the only signal. See H1. |

---

## File coverage

| File | Lines | Exports counted | Audited |
|------|-------|-----------------|---------|
| `src/v1/model.ts` | 163 | 7 interfaces, 5 zod consts | yes |
| `src/v1/client.ts` | 181 | 1 class, 4 public methods (1 async generator) | yes |
| `src/v1/utils.ts` | 151 | 1 interface, 5 functions | yes |
| `src/v1/index.ts` | 16 | 1 class re-export, 7 type re-exports | yes |

Every type, field, enum value (none), and method enumerated above is
accounted for.
