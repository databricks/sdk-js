# Naming Audit: externallocations

**Path:** `packages/externallocations/src/v1/`
**Versions audited:** v1
**Package name:** `@databricks/sdk-externallocations` (workspace package; the
folder is one word `externallocations`, no hyphen, no underscore).
**Total weird names flagged:** 2

---

## Summary table

| #   | Name                | File           | Kind | Severity | Category                                            | Issue (one-liner)                                                                                                                                                                                                                                                              |
| --- | ------------------- | -------------- | ---- | -------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `AzureQueueStorage` | model.ts:27    | type | Medium   | 6 Misleading names                                  | The Azure product is "Azure Queue Storage", which the wire/`provided_aqs`/`managed_aqs` shortens to AQS. So `AzureQueueStorage` is the long name, but two of its callers (`providedAqs`/`managedAqs` fields and case literals) use the AQS abbreviation. Pick one canonical form. |
| 2   | `ExternalLocationInfo` | model.ts:121 | type | Medium   | 16 Proto-architectural-leak names, 7 Overly verbose | The `Info` suffix is a Go/proto convention for the resource-representation message; in idiomatic TS the type for "an external location" is just `ExternalLocation`. The suffix carries no semantic value (there is no `ExternalLocation` vs `ExternalLocationInfo` distinction) and adds noise to every reference (`Promise<ExternalLocationInfo>`, `ExternalLocationInfo[]`). |

---

## Medium severity (worth pushing back on)

### M1. `AzureQueueStorage` vs `Aqs` abbreviation

The interface name is `AzureQueueStorage`, but two of its consumers (the
discriminator case keys `providedAqs`/`managedAqs` and the wire-format string
`provided_aqs`/`managed_aqs`) use the abbreviation `AQS`. The abbreviation is
not standard Microsoft terminology — Microsoft's docs call this "Azure Queue
Storage" or "Azure Storage Queues". `AQS` is Databricks-internal shorthand.

### M2. `ExternalLocationInfo` — `Info` suffix carries no semantic value

```ts
export interface ExternalLocationInfo { ... }
```

`ExternalLocationInfo` is the resource representation type for an external
location. The `Info` suffix is a Go/Protobuf convention (cf. `ClusterInfo`,
`JobInfo` across the rest of the SDK) — there is no companion
`ExternalLocation` type without the suffix to disambiguate against. In
idiomatic TS this would just be `ExternalLocation`.

The suffix shows up in every signature touching the resource:

- `Promise<ExternalLocationInfo>` (4 client method return types).
- `ExternalLocationInfo[]` in `ListExternalLocationsResponse`.
- `AsyncGenerator<ExternalLocationInfo>` in the iter method.

Renaming to `ExternalLocation` removes ~6 occurrences of dead-weight suffix
across the public surface.
