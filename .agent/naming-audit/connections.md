# Naming Audit: connections

**Path:** `packages/connections/src/v1/`
**Versions audited:** v1
**Inferred domain:** Unity Catalog Foreign Connections — create/get/list/update/delete connections to external data sources (MySQL, Snowflake, Salesforce, BigQuery, ServiceNow, GitHub, etc.) for federated query and ingestion.
**Total weird names flagged:** 35

## Summary
| Severity | Count |
| --- | --- |
| High | 10 |
| Medium | 15 |
| Low | 6 |
| Observation | 4 |

## High severity

### 1. `ConnectionType.UNKNOWN_CONNECTION_TYPE` — `src/v1/model.ts:7`
- **Why weird:** Enum sentinel re-states the enum name (`ConnectionType.UNKNOWN_CONNECTION_TYPE`). Idiomatic TypeScript treats "unset" as `undefined` (the field is already `connectionType?: ConnectionType | undefined`), making an explicit `UNKNOWN_*` value redundant.
- **Category:** 2 (redundant enum prefix).
- **Suggested name:** Drop the sentinel and rely on the optional field, or rename to `ConnectionType.Unknown`.
- **Rationale:** TS enum members are namespaced by the enum itself, so the re-stated prefix is pure noise.

### 2. `CredentialType.UNKNOWN_CREDENTIAL_TYPE` — `src/v1/model.ts:88`
- **Why weird:** Same problem as #1 — sentinel re-states enum name.
- **Category:** 2.
- **Suggested name:** `CredentialType.Unknown` or drop entirely.
- **Rationale:** Identical to #1.

### 3. `ConnectionType` value casing — `BIGQUERY`, `POSTGRESQL`, `MYSQL`, `SQLSERVER`, `SQLDW`, `WORKDAY_RAAS`, `GA4_RAW_DATA`, `MONDAY_COM` — `src/v1/model.ts:6-84`
- **Why weird:** Wire constants are flat SCREAMING_SNAKE but the domain has well-known camelCased product names (BigQuery, PostgreSQL, MySQL, SQL Server, Workday RaaS, GA4, Monday.com). Wire `BIGQUERY` is fine; TS-facing string literals lose the canonical brand casing. Some vendors collapse `POSTGRESQL` (one word, no underscore) but split `SAP_SUCCESSFACTORS`, `MICROSOFT_ENTRA_ID` — no consistent rule for which compound vendor names get an underscore.
- **Category:** 3 (acronym casing inconsistency across vendor names), 18 (long enum values littering the package surface).
- **Suggested name:** Either keep wire SCREAMING_SNAKE (current) and document, or move to a `Vendor` enum with PascalCase members (`Vendor.BigQuery`, `Vendor.Postgres`, `Vendor.MySql`).
- **Rationale:** Vendor names are proper nouns. Generator emits the proto enum verbatim; TS consumers will see `ConnectionType.POSTGRESQL` rather than the canonical `PostgreSQL`. Worth raising with API-design before the surface grows further.

### 4. `ConnectionType.SQLDW` and `SQLSERVER` (no underscore) vs `SAP_SUCCESSFACTORS`, `WORKDAY_RAAS`, `META_MARKETING` — `src/v1/model.ts:12-13,29,69`
- **Why weird:** Compound product names — sometimes joined (`SQLDW` = "SQL Data Warehouse", `SQLSERVER` = "SQL Server"), sometimes split with underscore (`SAP_SUCCESSFACTORS`, `WORKDAY_RAAS`). No rule. Comparable to `POWER_BI` (underscore) vs `BIGQUERY` (joined).
- **Category:** 3 (casing inconsistency), 18 (long enum value set).
- **Suggested name:** Pick one convention. If splitting on word boundaries: `SQL_DW`, `SQL_SERVER`, `BIG_QUERY`, `POWER_BI`. If joining: `SAPSUCCESSFACTORS`, `WORKDAYRAAS`. Most ergonomic is to consolidate on word-split + underscores.
- **Rationale:** Internal inconsistency makes the type non-discoverable — a user typing `ConnectionType.SQL_` will autocomplete to nothing if the value is `SQLSERVER`. Probably wire-locked, but worth flagging upstream.

### 5. `MONDAY_COM` — `src/v1/model.ts:56`
- **Why weird:** Encodes the TLD (`.com`) into the enum value. The vendor is "Monday.com" (the brand) but the SDK value becomes `MONDAY_COM` which reads as Monday and com. Other vendors don't include TLDs (no `HUBSPOT_COM`, `SLACK_COM`).
- **Category:** 3 (casing/branding), 6 (misleading: TLD baked into identifier).
- **Suggested name:** `MONDAY` (and document the canonical brand as "Monday.com" in a doc-comment).
- **Rationale:** Brand-as-domain doesn't belong in an enum value. If the API ever adds a non-com Monday product, this name decays.

### 6. `EnvironmentSettings` — `src/v1/model.ts:278-281`
- **Why weird:** Top-level type whose name is so generic it conveys nothing. `Environment` is heavily overloaded (deployment environment, OS environment, shell environment, JS runtime environment). The type actually holds `javaDependencies: string[]` and `environmentVersion: string` — i.e. Java runtime / library bundle for the connection's compute environment.
- **Category:** 1 (vague), 15 (generic field name losing meaning).
- **Suggested name:** `ConnectionRuntimeSettings` or `JavaEnvironmentSettings`.
- **Rationale:** Reader of `EnvironmentSettings` cannot guess it means "Java deps and runtime version". Naming should communicate the contents.

### 7. `EnvironmentSettings.environmentVersion` — `src/v1/model.ts:280`
- **Why weird:** Type-suffix tautology — field `environmentVersion` on a type called `EnvironmentSettings`. Reads `environmentSettings.environmentVersion` from a caller. Also doubly redundant.
- **Category:** 20 (type-suffix tautology), 8 (redundant suffix).
- **Suggested name:** `version` (would read `environmentSettings.version`).
- **Rationale:** Wire stays `environment_version`; TS can drop the prefix since the containing type already says "environment".

### 8. `DeleteConnection.nameArg` / `GetConnection.nameArg` / `UpdateConnection.nameArg` — `src/v1/model.ts:272,285,322`
- **Why weird:** Field named `nameArg` rather than `name`. The `Arg` suffix is a generator artefact (denoting path-arg / required-arg in the proto), but it leaks into the TS surface — users see `req.nameArg` everywhere. `ConnectionInfo` and `CreateConnection` already have a `name` field, so the inconsistency is jarring.
- **Category:** 5 (`Arg` is a cryptic abbreviation), 17 (inconsistency: `name` vs `nameArg` for the same thing).
- **Suggested name:** `name` everywhere. (Wire stays `name_arg` if the API truly requires that path param convention.)
- **Rationale:** Three different request types have a `nameArg` field that semantically equals the connection name. Users will mistype `name` and get a runtime error.

### 9. `DeleteConnection` / `GetConnection` / `CreateConnection` / `UpdateConnection` / `ListConnections` types — `src/v1/model.ts:203,270,283,288,320`
- **Why weird:** Request DTOs named as verb phrases (`DeleteConnection`, `GetConnection`). Reads as actions, not data. `import type {DeleteConnection}` looks like importing a function. Pattern is uniform across all five request types.
- **Category:** 6 (misleading: name implies behaviour).
- **Suggested name:** `DeleteConnectionRequest`, `GetConnectionRequest`, etc.
- **Rationale:** TS conventions append `Request` to request DTOs. Especially confusing because the package also exports a `Client.deleteConnection(req: DeleteConnection)` — type and method names are identical in lowercase.

### 10. `ConnectionInfo` — `src/v1/model.ts:141`
- **Why weird:** `Info` is the central domain entity — every type holds info about something. The Go SDK uses `XxxInfo` widely as a Go-style noun, but in TS the type would simply be `Connection`. `typescript.mdc` lists `Info` as a vague suffix.
- **Category:** 1 (vague suffix), 8 (redundant type suffix).
- **Suggested name:** `Connection`.
- **Rationale:** The domain noun is "connection". Stripping `Info` improves every reference (`connection.connectionType` → `Connection.connectionType`).

## Medium severity

### 11. `ConnectionInfo.connectionType: ConnectionType` — `src/v1/model.ts:145`
- **Why weird:** Type-suffix tautology — field `connectionType` of type `ConnectionType` on a type called `ConnectionInfo`. Reads `connectionInfo.connectionType`.
- **Category:** 20.
- **Suggested name:** `type: ConnectionType`. (If `ConnectionInfo` is renamed to `Connection`, becomes `connection.type`.)
- **Rationale:** Wire stays `connection_type`; TS can drop the prefix.

### 12. `ConnectionInfo.credentialType: CredentialType` — `src/v1/model.ts:159`
- **Why weird:** Same tautology as #11.
- **Category:** 20.
- **Suggested name:** `credential: CredentialType` or simply keep as-is since `credential` would also be ambiguous.
- **Rationale:** Less clear than #11; the prefix carries some semantic load (distinguishes credential type from credential value).

### 13. `ConnectionInfo.securableType: SecurableType` — `src/v1/model.ts:172`
- **Why weird:** Type-suffix tautology. Also: the value is *always* `SecurableType.CONNECTION` since this is a Connection, so the field is essentially constant.
- **Category:** 20 (tautology), 16 (field type contradicts domain — a connection's securable_type can only be CONNECTION).
- **Suggested name:** Either drop the field (it's always `CONNECTION`), or rename to `securableKind: SecurableType` and document why a non-`CONNECTION` value would ever appear.
- **Rationale:** Constant fields on response shapes are usually generator leaks. Worth pushing back upstream.

### 14. `ConnectionInfo.provisioningInfo: ProvisioningInfo` — `src/v1/model.ts:173`
- **Why weird:** Type-suffix tautology.
- **Category:** 20.
- **Suggested name:** `provisioning: ProvisioningInfo`.
- **Rationale:** Wire stays `provisioning_info`; TS can drop the prefix since the containing type already names the concept.

### 15. `ConnectionInfo.connectionId` and `metastoreId` — `src/v1/model.ts:161-163`
- **Why weird:** Bare `id` doesn't appear, but two `xxxId` fields coexist. `connectionId` is the type-prefix tautology (same struct already says "Connection"); `metastoreId` clarifies which parent. Mixed levels of specificity.
- **Category:** 19 (underspecified id — `connectionId` is fine, but inconsistent with absence of just `id` somewhere).
- **Suggested name:** `id` for the connection's own identifier (it's `connection.id`, not `connection.connectionId`); keep `metastoreId` (it identifies a parent).
- **Rationale:** Self-id should be `id`; foreign-key ids should keep the prefix. This is the standard REST convention.

### 16. `ConnectionInfo.fullName` vs `name` — `src/v1/model.ts:142-155`
- **Why weird:** Two name-like fields (`name` and `fullName`) with no inline doc explaining the difference. The wire pattern in Unity Catalog is "name within a parent" vs "catalog.schema.connection_name", but the type doesn't say that.
- **Category:** 1 (vague — what makes a name "full"?), 17 (inconsistency: `name` is short, `fullName` is fully qualified but doc only says "Full name of connection").
- **Suggested name:** Keep names; improve doc to clarify `fullName` is the dot-qualified path (`catalog.schema.connection_name`).
- **Rationale:** Naming is fine; documentation is the gap. Flagging because the readability of every field that pairs with `name` depends on knowing that `fullName` is the path-style form.

### 17. `ConnectionInfo.readOnly: boolean` — `src/v1/model.ts:149`
- **Why weird:** Boolean field name doesn't begin with `is`/`has` as is common for TS booleans. Reads `connection.readOnly` (acceptable adjective form) but sibling enums and types use noun forms. JS naming conventions are split, but inside this SDK most booleans use the adjective form, so this is consistent — flagging at low-medium severity because the rule itself is debatable.
- **Category:** 1 (vague form — `readOnly` could be a string of mode flags).
- **Suggested name:** Keep as `readOnly` (matches Go SDK and is widely used in JS). Optionally `isReadOnly`.
- **Rationale:** No strong convention either way; flagging because audit asked for booleans whose nature isn't obvious from the name.

### 18. `CreateConnection` / `UpdateConnection` / `ConnectionInfo` share ~18 identical fields — `src/v1/model.ts:203,320`
- **Why weird:** `CreateConnection` is `ConnectionInfo + parent`. `UpdateConnection` is `ConnectionInfo + nameArg + newName`. Almost all fields are duplicated three times. From the type signature, you cannot tell which fields are user-settable on create vs server-set; everything is optional and present everywhere (e.g. `createdAt`, `createdBy`, `updatedBy` show up on `CreateConnection` and `UpdateConnection` even though they're server-only).
- **Category:** 12 (duplicate concepts), 6 (misleading — user-settable vs server-set is invisible).
- **Suggested name:** Split server-only metadata into a base type and compose. Better still, type create/update inputs as `Pick<Connection, ...>` or a dedicated `ConnectionInput` interface.
- **Rationale:** Today a caller could set `connection.createdAt` on a create request and have no idea it's silently ignored. Type system can prevent this.

### 19. `UpdateConnection.newName` and `nameArg` — `src/v1/model.ts:322-324`
- **Why weird:** `newName` (TS), wire `new_name`. Pair (`nameArg`, `newName`) means "rename connection X to Y". Function-style verb encoded in a field name (`new` + Name).
- **Category:** 5 (`newName` reads as a temporal modifier), 17 (also inconsistent with the type's own `name` field).
- **Suggested name:** `renameTo`, or split into a `RenameConnectionRequest` operation.
- **Rationale:** Cleaner API: rename and update are distinct operations.

### 20. `UpdateConnection.name` field — `src/v1/model.ts:326`
- **Why weird:** `UpdateConnection` has THREE name-like fields: `nameArg` (path param, identifies which), `newName` (new name), AND `name` (also documented as "Name of the connection"). Both `nameArg` and `name` are documented identically and both refer to the existing connection. Easily mis-set; ambiguous which the server uses.
- **Category:** 12 (duplicate concept), 6 (misleading — three fields mean "the name").
- **Suggested name:** Remove `name` from `UpdateConnection` (it duplicates `nameArg`).
- **Rationale:** Three fields for one concept is a bug surface. Worth pushing to API design.

### 21. `parent` field on `CreateConnection` and `ListConnections` — `src/v1/model.ts:208,300`
- **Why weird:** Bare `parent` with the value encoded as a free-form string `"schemas/{catalog}.{schema}"`. Untyped wire format inside a field name that does not indicate a structured path.
- **Category:** 1 (vague), 5 (cryptic — what shape is `parent`?).
- **Suggested name:** `parentSchema`, with a clear doc that the format is `"schemas/{catalog}.{schema}"` (or model the catalog/schema pair as a structured type).
- **Rationale:** Pattern of "rest-resource string with embedded slashes" is common in Google APIs but feels out of place in a TS SDK. At minimum the field should signal it's a schema reference.

### 22. `ListConnections.maxResults` semantics — `src/v1/model.ts:289-296`
- **Why weird:** Three different behaviours encoded in the same field: "not set → all results", "0 → server default", ">0 → bound by min(value, server-default)", "<0 → error". Numeric overload that is invisible from the name.
- **Category:** 6 (misleading — `maxResults` implies upper bound, but `0` actually requests server default).
- **Suggested name:** Either two separate fields (`pageSize` and `useServerDefault`), or document inline tersely. Keep name; flag as observation.
- **Rationale:** Name is fine; behaviour overloaded. Easy to call wrong.

### 23. `SecurableType.STAGING_TABLE` and TODO comment — `src/v1/model.ts:127`
- **Why weird:** Enum value pinned by inline TODO: "Staging tables aren't full-fleged securables yet." Internal SDK TODOs in user-facing enum values.
- **Category:** 18 (questionable enum value).
- **Suggested name:** Hide until promotion or mark `@experimental`.
- **Rationale:** Public SDK enums shouldn't carry "not really a thing yet" entries.

### 24. `CredentialType.SSWS_TOKEN` — `src/v1/model.ts:102`
- **Why weird:** `SSWS` is cryptic. (Stands for "Single Sign-On Web Services" or Okta SSWS — Secure Single Sign-on. Either way, opaque.) Other tokens are named after their family (OAuth, OIDC, Bearer); SSWS is the only one with a literal product-specific acronym.
- **Category:** 5 (cryptic abbreviation), 17 (inconsistent with sibling values).
- **Suggested name:** `OKTA_SSWS_TOKEN` (if it's strictly Okta), or document in doc-comment.
- **Rationale:** Future readers cannot guess what SSWS expands to.

### 25. `CredentialType.EDGEGRID_AKAMAI` — `src/v1/model.ts:103`
- **Why weird:** Vendor name (`AKAMAI`) appears at the end of the enum value while other vendor-coupled values put the vendor first (`OAUTH_GOOGLE_SERVICE_ACCOUNT`). Inconsistent word order.
- **Category:** 17 (inconsistency).
- **Suggested name:** `AKAMAI_EDGEGRID`.
- **Rationale:** Consistency with the `OAUTH_GOOGLE_*` pattern (vendor-first).

### 26. `CredentialType.OAUTH_DCR` — `src/v1/model.ts:105`
- **Why weird:** `DCR` is opaque (probably "Dynamic Client Registration", an OAuth concept). No doc.
- **Category:** 5 (cryptic abbreviation).
- **Suggested name:** `OAUTH_DYNAMIC_CLIENT_REGISTRATION` or document in a doc-comment.
- **Rationale:** Users unfamiliar with OAuth specs cannot decode `DCR`.

## Low severity

### 27. `PACKAGE_SEGMENT` constant — `src/v1/client.ts:39`
- **Why weird:** `Segment` is a generic word; without the comment the constant doesn't communicate User-Agent identity.
- **Category:** 1 (vague), 15 (generic name).
- **Suggested name:** `USER_AGENT_PACKAGE_SEGMENT`.
- **Rationale:** Same finding as in `abacpolicies` audit; consistent across generated packages.

### 28. `flattenQueryParams` — `src/v1/utils.ts:123`
- **Why weird:** Exported but unused in this package (`client.ts` builds query strings inline with `URLSearchParams.append`). Dead-looking export.
- **Category:** Observation / 11 (unused public helper).
- **Suggested name:** Remove from utils if generator default.
- **Rationale:** Generator emits the same helper into every package even when unused.

### 29. `readAll` — `src/v1/utils.ts:40`
- **Why weird:** Internal helper name is generic and clashes cognitively with `Array.prototype` / stream utilities.
- **Category:** 1 (vague).
- **Suggested name:** `readStreamToEnd` / `drainStream`.
- **Rationale:** Trivial; flagged for cross-package consistency.

### 30. `executeCall` / `executeHttpCall` naming pair — `src/v1/utils.ts:26,65`
- **Why weird:** Two functions distinguished only by an `Http` infix. `executeCall` wraps retry/rate-limit/timeout; `executeHttpCall` does the actual fetch + logging + error throw. Easy to confuse at call site.
- **Category:** 1 (vague), 17 (inconsistent).
- **Suggested name:** `runWithCallOptions` / `sendHttp`, or `wrapCall` / `dispatchHttp`.
- **Rationale:** Names should encode the layer, not just the protocol.

### 31. `HttpCallOptions` — `src/v1/utils.ts:15`
- **Why weird:** Yet another `Options` suffix; the file also imports `Options` (line 3) and `CallOptions` (line 12), so three `Options` types are in scope at once. The `HttpCallOptions` is internal — purely a context bag for `executeHttpCall`.
- **Category:** 1 (vague suffix).
- **Suggested name:** `HttpCallContext` (it's a context bag, not user-tunable options).
- **Rationale:** Distinguish internal context bags from user-facing option structs.

### 32. Inconsistent option name: `req.maxResults` vs wire `max_results` — `src/v1/client.ts:164-165`
- **Why weird:** TS uses camelCase (`maxResults`); wire is snake_case (`max_results`). Conversion is buried in the client method. Fine in isolation but two near-identical strings live three lines apart.
- **Category:** Observation only.
- **Suggested name:** None — this is the marshalling boundary by design.
- **Rationale:** Just noting it for reviewer awareness.

## Observations

### 33. ~50 vendor names baked into `ConnectionType` enum
The enum lists ~70 vendors (`MYSQL` ... `MARKETO`), all SCREAMING_SNAKE. This makes `model.ts` 84 lines of enum just for connection types. Worth raising with API design whether the type should be `string` with vendor metadata living in a separate registry — adding a new connection type today requires releasing a new SDK version.
- **Category:** 18 (long enum value set).

### 34. Casing inconsistency in vendor name decomposition
Within `ConnectionType`:
- `BIGQUERY`, `POSTGRESQL`, `SQLSERVER` (joined) vs `POWER_BI`, `WORKDAY_RAAS`, `META_MARKETING` (split).
- `MYSQL` (joined) vs `MICROSOFT_ENTRA_ID` (split).
- `MONDAY_COM` (encodes TLD) vs every other brand (no TLD).
No discoverable rule. Wire-locked, but worth surfacing.
- **Category:** 3 (acronym/casing inconsistency).

### 35. Action-verb conventions on `Client`
`createConnection`, `getConnection`, `listConnections`, `updateConnection`, `deleteConnection` — uniform. (Listed as observation since the audit asks us to flag inconsistencies; here we explicitly note consistency.)

### 36. `Client` constructor throws for missing host
`if (options.host === undefined) { throw new Error('Host is required.'); }` — error message is fine, naming is fine, but `Host is required.` doesn't tell the user which constructor failed. Flagged for cross-SDK consistency review.
- **Category:** Observation.

## Domain glossary
- `uc` — Unity Catalog (referenced in `model.ts:178` doc comment "UC Secret").
- `raas` — Reporting as a Service (e.g. `WORKDAY_RAAS`). Doc-less.
- `ga4` — Google Analytics 4 (in `GA4_RAW_DATA`).
- `m2m`/`u2m` — Machine-to-machine / User-to-machine OAuth flows (in `CredentialType`).
- `mtls` — Mutual TLS (in `OAUTH_MTLS`).
- `dcr` — Dynamic Client Registration (in `OAUTH_DCR`). Undocumented.
- `pem` — Privacy-Enhanced Mail format (in `PEM_PRIVATE_KEY`).
- `ssws` — Secure Single Sign-on Web Services (Okta) (in `SSWS_TOKEN`). Undocumented.
- `oidc` — OpenID Connect (in `OIDC_TOKEN`).
- `oss` — not encountered.
- `iam` — not encountered.

## File coverage
- `src/v1/model.ts` (590 lines): read fully.
- `src/v1/client.ts` (237 lines): read fully.
- `src/v1/utils.ts` (151 lines): read fully.
- `src/v1/index.ts` (33 lines): read fully.
