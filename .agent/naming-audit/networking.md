# Naming Audit: networking

**Path:** `packages/networking/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level networking — Network Connectivity Configurations (NCC) with AWS/Azure private endpoint rules and egress default rules, Networks (workspace network configs), Private Access Settings (workspace front-end PrivateLink), VPC Endpoints, Network Policies (egress / ingress restrictions, including public-vs-private access modes), Account IP Access Lists, and workspace network options.
**Total weird names flagged:** 4

## Summary
| Severity | Count |
| --- | --- |
| High | 0 |
| Medium | 4 |
| Low | 0 |
| Observation | 0 |

## File coverage
- `src/v1/model.ts` — 4449 lines; interface, enum, and marshal/unmarshal schema definitions.
- `src/v1/client.ts` — 1675 lines; `Client` class with the public RPC methods.
- `src/v1/transport.ts` — 75 lines; HTTP transport wrapper.
- `src/v1/utils.ts` — 150 lines; helpers.
- `src/v1/index.ts` — 153 lines; barrel exports.

## High severity

_None._

## Medium severity

### 1. `ListNetworkRequest` — `src/v1/model.ts:1442`
- **Why weird:** The noun is singular (`Network`) where the sibling list
  request types in the package pluralise (`ListNetworkPoliciesRequest`
  at line 1428, `ListNetworkConnectivityConfigsRequest` at line 1414).
  The proto-tier `Public` infix was dropped in the 2026-05-22
  regeneration, leaving the residual singular/plural inconsistency.
- **Category:** Singular/plural inconsistency.
- **Suggested name:** `ListNetworksRequest`.
- **Rationale:** A list operation returns multiple items; pluralise the
  noun to align with the rest of the package's `List*Request` naming.

### 2. `ListNetworkResponse` — `src/v1/model.ts:1446`
- **Why weird:** Same singular/plural mismatch as #1. Sibling list
  response types pluralise (`ListNetworkPoliciesResponse` at line 1435,
  `ListNetworkConnectivityConfigsResponse` at line 1422). The proto-tier
  `Public` infix was dropped in the 2026-05-22 regeneration, leaving
  the residual singular/plural inconsistency.
- **Category:** Singular/plural inconsistency.
- **Suggested name:** `ListNetworksResponse`.
- **Rationale:** Same as #1.

### 3. `ListVpcEndpointRequest` — `src/v1/model.ts:1458`
- **Why weird:** Same singular/plural mismatch as #1. The list request
  for VPC endpoints uses a singular noun. The proto-tier `Public` infix
  was dropped in the 2026-05-22 regeneration, leaving the residual
  singular/plural inconsistency.
- **Category:** Singular/plural inconsistency.
- **Suggested name:** `ListVpcEndpointsRequest`.
- **Rationale:** Same as #1; pluralise the noun the way other list
  request types in the package do.

### 4. `ListVpcEndpointResponse` — `src/v1/model.ts:1462`
- **Why weird:** Same singular/plural mismatch as #1. The list response
  for VPC endpoints uses a singular noun. The proto-tier `Public` infix
  was dropped in the 2026-05-22 regeneration, leaving the residual
  singular/plural inconsistency.
- **Category:** Singular/plural inconsistency.
- **Suggested name:** `ListVpcEndpointsResponse`.
- **Rationale:** Same as #1.

## Low severity

_None._

## Observations

_None._

## Fixed

- `CreateNetworkConnectivityConfigPublicRequest` — proto-architecture
  leak removed; renamed to `CreateNetworkConnectivityConfigRequest`.
  Fixed in regeneration on 2026-05-22.
- `CreateNetworkPublicRequest` — proto-architecture leak removed;
  renamed to `CreateNetworkRequest`. Fixed in regeneration on
  2026-05-22.
- `CreatePrivateAccessSettingsPublicRequest` — proto-architecture leak
  removed; renamed to `CreatePrivateAccessSettingsRequest`. Fixed in
  regeneration on 2026-05-22.
- `CreateVpcEndpointPublicRequest` — proto-architecture leak removed;
  renamed to `CreateVpcEndpointRequest`. Fixed in regeneration on
  2026-05-22.
- `DeleteNetworkConnectivityConfigPublicRequest` — proto-architecture
  leak removed; renamed to `DeleteNetworkConnectivityConfigRequest`.
  Fixed in regeneration on 2026-05-22.
- `DeleteNetworkPublicRequest` — proto-architecture leak removed;
  renamed to `DeleteNetworkRequest`. Fixed in regeneration on
  2026-05-22.
- `DeletePrivateAccessSettingsPublicRequest` — proto-architecture leak
  removed; renamed to `DeletePrivateAccessSettingsRequest`. Fixed in
  regeneration on 2026-05-22.
- `DeleteVpcEndpointPublicRequest` — proto-architecture leak removed;
  renamed to `DeleteVpcEndpointRequest`. Fixed in regeneration on
  2026-05-22.
- `GetNetworkConnectivityConfigPublicRequest` — proto-architecture leak
  removed; renamed to `GetNetworkConnectivityConfigRequest`. Fixed in
  regeneration on 2026-05-22.
- `GetNetworkPublicRequest` — proto-architecture leak removed; renamed
  to `GetNetworkRequest`. Fixed in regeneration on 2026-05-22.
- `GetPrivateAccessSettingsPublicRequest` — proto-architecture leak
  removed; renamed to `GetPrivateAccessSettingsRequest`. Fixed in
  regeneration on 2026-05-22.
- `GetVpcEndpointPublicRequest` — proto-architecture leak removed;
  renamed to `GetVpcEndpointRequest`. Fixed in regeneration on
  2026-05-22.
- `ListNetworkConnectivityConfigsPublicRequest` — proto-architecture
  leak removed; renamed to `ListNetworkConnectivityConfigsRequest`.
  Fixed in regeneration on 2026-05-22.
- `ListNetworkConnectivityConfigsPublicResponse` — proto-architecture
  leak removed; renamed to `ListNetworkConnectivityConfigsResponse`.
  Fixed in regeneration on 2026-05-22.
- `ListPrivateAccessSettingsPublicRequest` — proto-architecture leak
  removed; renamed to `ListPrivateAccessSettingsRequest`. Fixed in
  regeneration on 2026-05-22.
- `ListPrivateAccessSettingsPublicResponse` — proto-architecture leak
  removed; renamed to `ListPrivateAccessSettingsResponse`. Fixed in
  regeneration on 2026-05-22.
- `UpdatePrivateAccessSettingsPublicRequest` — proto-architecture leak
  removed; renamed to `UpdatePrivateAccessSettingsRequest`. Fixed in
  regeneration on 2026-05-22.
