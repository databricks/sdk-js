# Naming Audit: `catalogs` package (v1)

**Package path:** `/home/parth.bansal/sdk-js/packages/uc/catalogs/`
**Audited files:** `src/v1/model.ts`, `src/v1/client.ts`, `src/v1/utils.ts`, `src/v1/index.ts`, `src/v1/transport.ts`

---

## Findings

### 1. Overly verbose

#### 1.1 `EffectivePredictiveOptimizationFlag` (model.ts:195)
Type identifier is 39 characters. `EffectivePOFlag` or
`EffectivePredictiveOptFlag` is overkill the other way; consider
`EffectivePredictiveOptimization` (no `Flag` since the type already wraps
the flag).

---

### 2. Redundant suffixes

#### 2.1 `…Info` types (`CatalogInfo`, `ProvisioningInfo`)
"Info" is a non-suffix — it carries no semantic content. In the Go SDK
this distinguishes the entity type from the resource handle; in JS/TS the
convention is to drop it (`Catalog`, `Provisioning`).

#### 2.2 `Flag` suffix on `EffectivePredictiveOptimizationFlag`
The whole type *is* the flag; the suffix is redundant. See §1.1.

---

### 3. Reserved-word collisions

#### 3.1 `options` field on `CatalogInfo`, `CreateCatalogRequest`, `UpdateCatalogRequest` (model.ts:127, 182, 318)
`options` collides with the SDK's own `CallOptions` parameter name used
throughout the client (e.g. `createCatalog(req, options)`). The collision
is not a compile error but creates cognitive load — inside
`updateCatalog(req, options)` the reader sees both `req.options` (catalog
metadata) and `options` (call options). Rename one. The least invasive
fix is renaming the second client parameter to `callOptions`.

---

### 4. Field contradicting type domain

#### 4.1 `CreateCatalogRequest` contains read-only output fields
`createdAt`, `createdBy`, `updatedAt`, `updatedBy`, `metastoreId`,
`provisioningInfo`, `fullName`, `securableType`,
`effectivePredictiveOptimizationFlag`, `browseOnly` (model.ts:153-174).
These are server-populated; a creator setting them is at best ignored.
The type's domain is "create request", but its shape contradicts that.
Mirror issue in `UpdateCatalogRequest`.

---

### 5. Proto-architectural leaks

#### 5.1 `ProvisioningInfo_State` — model.ts:55
- **Why:** Underscore-separated identifier signals a nested protobuf enum
  (`message ProvisioningInfo { enum State { ... } }`). The transport
  encoding has bled into the public type name and the `eslint-disable`
  comment on the same line explicitly acknowledges it.
- **Category:** Proto suffix/infix.
- **Suggested:** `ProvisioningState`.
- **Rationale:** TS callers have no nesting; the parent prefix plus
  `State` produces a flat, idiomatic identifier without leaking the
  proto-nested origin.
