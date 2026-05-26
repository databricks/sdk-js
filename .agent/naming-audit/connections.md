# Naming Audit: connections

**Path:** `packages/connections/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog Foreign Connections — create/get/list/update/delete connections to external data sources (MySQL, Snowflake, Salesforce, BigQuery, ServiceNow, GitHub, etc.) for federated query and ingestion.
**Total weird names flagged:** 21

## Summary
| Severity | Count |
| --- | --- |
| High | 5 |
| Medium | 8 |
| Low | 6 |
| Observation | 2 |

## High severity

### 1. `ConnectionType` value casing — `BIGQUERY`, `POSTGRESQL`, `MYSQL`, `SQLSERVER`, `SQLDW`, `WORKDAY_RAAS`, `GA4_RAW_DATA` — `src/v1/model.ts:6-34`
- **Why weird:** Wire constants are flat SCREAMING_SNAKE but the domain has well-known camelCased product names (BigQuery, PostgreSQL, MySQL, SQL Server, Workday RaaS, GA4). Wire `BIGQUERY` is fine; TS-facing string literals lose the canonical brand casing. Some vendors collapse `POSTGRESQL` (one word, no underscore) but split `META_MARKETING`, `POWER_BI` — no consistent rule for which compound vendor names get an underscore.
- **Category:** 3 (acronym casing inconsistency across vendor names).
- **Suggested name:** Either keep wire SCREAMING_SNAKE (current) and document, or move to a `Vendor` enum with PascalCase members (`Vendor.BigQuery`, `Vendor.Postgres`, `Vendor.MySql`).
- **Rationale:** Vendor names are proper nouns. Generator emits the proto enum verbatim; TS consumers will see `ConnectionType.POSTGRESQL` rather than the canonical `PostgreSQL`. Worth raising with API-design before the surface grows further.

### 2. `ConnectionType.SQLDW` and `SQLSERVER` (no underscore) vs `WORKDAY_RAAS`, `META_MARKETING` — `src/v1/model.ts:12-13,17,28`
- **Why weird:** Compound product names — sometimes joined (`SQLDW` = "SQL Data Warehouse", `SQLSERVER` = "SQL Server"), sometimes split with underscore (`WORKDAY_RAAS`). No rule. Comparable to `POWER_BI` (underscore) vs `BIGQUERY` (joined).
- **Category:** 3 (casing inconsistency).
- **Suggested name:** Pick one convention. If splitting on word boundaries: `SQL_DW`, `SQL_SERVER`, `BIG_QUERY`, `POWER_BI`. If joining: `WORKDAYRAAS`. Most ergonomic is to consolidate on word-split + underscores.
- **Rationale:** Internal inconsistency makes the type non-discoverable — a user typing `ConnectionType.SQL_` will autocomplete to nothing if the value is `SQLSERVER`. Probably wire-locked, but worth flagging upstream.

### 3. `ConnectionInfo` — `src/v1/model.ts:89`
- **Why weird:** `Info` is the central domain entity — every type holds info about something. The Go SDK uses `XxxInfo` widely as a Go-style noun, but in TS the type would simply be `Connection`. `typescript.mdc` lists `Info` as a vague suffix.
- **Category:** 1 (vague suffix), 8 (redundant type suffix).
- **Suggested name:** `Connection`.
- **Rationale:** The domain noun is "connection". Stripping `Info` improves every reference (`connection.connectionType` → `Connection.connectionType`).

### 4. `UpdateConnectionRequest.name` field — `src/v1/model.ts:236`
- **Why weird:** `UpdateConnectionRequest` has THREE name-like fields: `nameArg` (path param, identifies which), `newName` (new name), AND `name` (also documented as "Name of the connection"). Both `nameArg` and `name` are documented identically and both refer to the existing connection. Easily mis-set; ambiguous which the server uses.
- **Category:** 12 (duplicate concept), 6 (misleading — three fields mean "the name").
- **Suggested name:** Remove `name` from `UpdateConnectionRequest` (it duplicates `nameArg`).
- **Rationale:** Three fields for one concept is a bug surface. Worth pushing to API design.

### 5. `DeleteConnectionRequest_Response` / `ListConnectionsRequest_Response` — `src/v1/model.ts:193,214`
- **Why weird:** Proto-architectural-leak naming. The `_Response` infix on an underscore-joined identifier is a verbatim proto nested-message name (`DeleteConnectionRequest.Response`), exported into the public TS surface. `DeleteConnectionRequest_Response` is even empty (`{}`). The TS-idiomatic shape is `DeleteConnectionResponse` / `ListConnectionsResponse` (or `void` for the empty case), not a nested type tied to its sibling request.
- **Category:** Proto-architectural leak (`_Response` underscore-joined nested message name), 12 (empty type duplicates `void`).
- **Suggested name:** `DeleteConnectionResponse` / `ListConnectionsResponse` (or drop the empty one entirely; method returns `void`).
- **Rationale:** The underscore-joined `Foo_Response` pattern is a generator artefact from proto's nested-message resolution. Users see `unmarshalDeleteConnectionRequest_ResponseSchema` and `DeleteConnectionRequest_Response` in autocomplete — both leak the proto namespacing into the SDK surface.

## Medium severity

### 6. `ConnectionInfo.securableType: SecurableType` — `src/v1/model.ts:118`
- **Why weird:** Type-suffix tautology. Also: the value is *always* `SecurableType.CONNECTION` since this is a Connection, so the field is essentially constant.
- **Category:** 20 (tautology), 16 (field type contradicts domain — a connection's securable_type can only be CONNECTION).
- **Suggested name:** Either drop the field (it's always `CONNECTION`), or rename to `securableKind: SecurableType` and document why a non-`CONNECTION` value would ever appear.
- **Rationale:** Constant fields on response shapes are usually generator leaks. Worth pushing back upstream.

### 7. `ConnectionInfo.readOnly: boolean` — `src/v1/model.ts:97`
- **Why weird:** Boolean field name doesn't begin with `is`/`has` as is common for TS booleans. Reads `connection.readOnly` (acceptable adjective form) but sibling enums and types use noun forms. JS naming conventions are split, but inside this SDK most booleans use the adjective form, so this is consistent — flagging at low-medium severity because the rule itself is debatable.
- **Category:** 1 (vague form — `readOnly` could be a string of mode flags).
- **Suggested name:** Keep as `readOnly` (matches Go SDK and is widely used in JS). Optionally `isReadOnly`.
- **Rationale:** No strong convention either way; flagging because audit asked for booleans whose nature isn't obvious from the name.

### 8. `CreateConnectionRequest` / `UpdateConnectionRequest` / `ConnectionInfo` share ~18 identical fields — `src/v1/model.ts:138,230`
- **Why weird:** `CreateConnectionRequest` is `ConnectionInfo` shape. `UpdateConnectionRequest` is `ConnectionInfo + nameArg + newName + name`. Almost all fields are duplicated three times. From the type signature, you cannot tell which fields are user-settable on create vs server-set; everything is optional and present everywhere (e.g. `createdAt`, `createdBy`, `updatedBy` show up on `CreateConnectionRequest` and `UpdateConnectionRequest` even though they're server-only).
- **Category:** 12 (duplicate concepts), 6 (misleading — user-settable vs server-set is invisible).
- **Suggested name:** Split server-only metadata into a base type and compose. Better still, type create/update inputs as `Pick<Connection, ...>` or a dedicated `ConnectionInput` interface.
- **Rationale:** Today a caller could set `connection.createdAt` on a create request and have no idea it's silently ignored. Type system can prevent this.

### 9. `SecurableType.STAGING_TABLE` and TODO comment — `src/v1/model.ts:75`
- **Why weird:** Enum value pinned by inline TODO: "Staging tables aren't full-fleged securables yet." Internal SDK TODOs in user-facing enum values.
- **Category:** 6 (misleading — value advertised but not actually a securable yet).
- **Suggested name:** Hide until promotion or mark `@experimental`.
- **Rationale:** Public SDK enums shouldn't carry "not really a thing yet" entries.

### 10. `CredentialType.SSWS_TOKEN` — `src/v1/model.ts:52`
- **Why weird:** `SSWS` is cryptic. (Stands for "Single Sign-On Web Services" or Okta SSWS — Secure Single Sign-on. Either way, opaque.) Other tokens are named after their family (OAuth, OIDC, Bearer); SSWS is the only one with a literal product-specific acronym.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistent with sibling values).
- **Suggested name:** `OKTA_SSWS_TOKEN` (if it's strictly Okta), or document in doc-comment.
- **Rationale:** Future readers cannot guess what SSWS expands to.

### 11. `CredentialType.EDGEGRID_AKAMAI` — `src/v1/model.ts:53`
- **Why weird:** Vendor name (`AKAMAI`) appears at the end of the enum value while sibling values put the vendor first. Inconsistent word order.
- **Category:** 17 (inconsistency).
- **Suggested name:** `AKAMAI_EDGEGRID`.
- **Rationale:** Consistency with vendor-first patterns elsewhere.

### 12. `ConnectionInfo_OptionsEntry` / `ConnectionInfo_PropertiesEntry` / `CreateConnectionRequest_OptionsEntry` / `UpdateConnectionRequest_PropertiesEntry` — `src/v1/model.ts:127,133,176,182,272,278`
- **Why weird:** Proto-architectural-leak naming. Proto-style nested entry types with underscore-joined identifiers leak into the public TS surface. Each `Options` and `Properties` map gets a corresponding `*_OptionsEntry`/`*_PropertiesEntry` interface — six total — that is exported but trivial (`{key?, value?}`). The wire shape is already covered by `Record<string, string>`.
- **Category:** Proto-architectural leak (`_OptionsEntry` / `_PropertiesEntry` proto map-entry message names), 12 (duplicate concept), 5 (cryptic — underscore-joined identifiers).
- **Suggested name:** Remove the `*Entry` interfaces from the public API; rely on `Record<string, string>`.
- **Rationale:** These entry types add visual noise and are not used by the surface (the field is `Record<string, string>`).

### 13. `ProvisioningInfo_State` — `src/v1/model.ts:79`
- **Why weird:** Proto-architectural-leak naming. Underscore-joined identifier (`ProvisioningInfo_State`) is a proto nested-enum name (`ProvisioningInfo.State`) emitted verbatim into TS. The enum is suppressed via `eslint-disable @typescript-eslint/naming-convention`, confirming it breaks TS conventions. Standalone TS would name this `ProvisioningState` (or merge into `ProvisioningInfo`).
- **Category:** Proto-architectural leak (`_State` underscore-joined nested enum name).
- **Suggested name:** `ProvisioningState`.
- **Rationale:** Proto nesting has no analogue in TS modules; the underscore is a wire-name artefact. Same generator pattern produces `*_Response`, `*_OptionsEntry`, `*_PropertiesEntry`.

## Low severity

### 14. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:39`
- **Why weird:** `Segment` is a generic word; without the comment the constant doesn't communicate User-Agent identity.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Same finding as in `abacpolicies` audit; consistent across generated packages.

### 15. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Exported but unused in this package (`client.ts` builds query strings inline with `URLSearchParams.append`). Dead-looking export.
- **Category:** Observation / 11 (unused public helper).
- **Suggested name:** Remove from utils if generator default.
- **Rationale:** Generator emits the same helper into every package even when unused.

### 16. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Internal helper name is generic and clashes cognitively with `Array.prototype` / stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `readStreamToEnd` / `drainStream`.
- **Rationale:** Trivial; flagged for cross-package consistency.

### 19. `executeCall` / `executeHttpCall` naming pair — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions distinguished only by an `Http` infix. `executeCall` wraps retry/rate-limit/timeout; `executeHttpCall` does the actual fetch + logging + error throw. Easy to confuse at call site.
- **Category:** 1 (vague), 17 (inconsistent).
- **Suggested name:** `runWithCallOptions` / `sendHttp`, or `wrapCall` / `dispatchHttp`.
- **Rationale:** Names should encode the layer, not just the protocol.

### 20. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Yet another `Options` suffix; the file also imports `Options` (line 3) and `CallOptions` (line 12), so three `Options` types are in scope at once. The `HttpCallOptions` is internal — purely a context bag for `executeHttpCall`.
- **Category:** 1 (vague suffix).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing option structs.

### 21. Inconsistent option name: `req.maxResults` vs wire `max_results` — `src/v1/client.ts:167-168`
- **Why weird:** TS uses camelCase (`maxResults`); wire is snake_case (`max_results`). Conversion is buried in the client method. Fine in isolation but two near-identical strings live three lines apart.
- **Category:** Observation only.
- **Suggested name:** None — this is the marshalling boundary by design.
- **Rationale:** Just noting it for reviewer awareness.

## Observations

### 22. Casing inconsistency in vendor name decomposition
Within `ConnectionType`:
- `BIGQUERY`, `POSTGRESQL`, `SQLSERVER` (joined) vs `POWER_BI`, `WORKDAY_RAAS`, `META_MARKETING` (split).
- `MYSQL` (joined) vs `GA4_RAW_DATA` (split).
No discoverable rule. Wire-locked, but worth surfacing.
- **Category:** 3 (acronym/casing inconsistency).

### 23. `Client` constructor throws for missing host
`if (options.host === undefined) { throw new Error('Host is required.'); }` — error message is fine, naming is fine, but `Host is required.` doesn't tell the user which constructor failed. Flagged for cross-SDK consistency review.
- **Category:** Observation.

## Domain glossary
- `uc` — Unity Catalog (referenced in `model.ts` doc comments).
- `raas` — Reporting as a Service (e.g. `WORKDAY_RAAS`). Doc-less.
- `ga4` — Google Analytics 4 (in `GA4_RAW_DATA`).
- `m2m`/`u2m` — Machine-to-machine / User-to-machine OAuth flows (in `CredentialType`).
- `mtls` — Mutual TLS (in `OAUTH_MTLS`).
- `pem` — Privacy-Enhanced Mail format (in `PEM_PRIVATE_KEY`).
- `ssws` — Secure Single Sign-on Web Services (Okta) (in `SSWS_TOKEN`). Undocumented.
- `oidc` — OpenID Connect (in `OIDC_TOKEN`).
- `oss` — not encountered.
- `iam` — not encountered.

## File coverage
- `src/v1/model.ts` (446 lines): read fully.
- `src/v1/client.ts` (240 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (29 lines): read fully.
