# Naming Audit: networking

**Path:** `packages/networking/src/v1/`
**Versions audited:** v1
**Inferred domain:** Account-level networking — Network Connectivity Configurations (NCC) with AWS/Azure private endpoint rules and egress default rules, Networks (workspace network configs), Private Access Settings (workspace front-end PrivateLink), VPC Endpoints, Network Policies (egress / ingress restrictions, including public-vs-private access modes), Account IP Access Lists, and workspace network options.
**Total weird names flagged:** 4

## Summary
| Severity | Count |
| --- | --- |
| Medium | 4 |

## Medium severity

### 1. `ListNetworkRequest` — `src/v1/model.ts:1440`
- **Why weird:** The noun is singular (`Network`) where the sibling list
  request types in the package pluralise (`ListNetworkPoliciesRequest`
  at line 1426, `ListNetworkConnectivityConfigsRequest` at line 1412).
  The proto-tier `Public` infix was dropped in the 2026-05-22
  regeneration, leaving the residual singular/plural inconsistency.
- **Category:** Singular/plural inconsistency.
- **Suggested name:** `ListNetworksRequest`.
- **Rationale:** A list operation returns multiple items; pluralise the
  noun to align with the rest of the package's `List*Request` naming.

### 2. `ListNetworkResponse` — `src/v1/model.ts:1444`
- **Why weird:** Same singular/plural mismatch as #1. Sibling list
  response types pluralise (`ListNetworkPoliciesResponse` at line 1433,
  `ListNetworkConnectivityConfigsResponse` at line 1420). The proto-tier
  `Public` infix was dropped in the 2026-05-22 regeneration, leaving
  the residual singular/plural inconsistency.
- **Category:** Singular/plural inconsistency.
- **Suggested name:** `ListNetworksResponse`.
- **Rationale:** Same as #1.

### 3. `ListVpcEndpointRequest` — `src/v1/model.ts:1456`
- **Why weird:** Same singular/plural mismatch as #1. The list request
  for VPC endpoints uses a singular noun. The proto-tier `Public` infix
  was dropped in the 2026-05-22 regeneration, leaving the residual
  singular/plural inconsistency.
- **Category:** Singular/plural inconsistency.
- **Suggested name:** `ListVpcEndpointsRequest`.
- **Rationale:** Same as #1; pluralise the noun the way other list
  request types in the package do.

### 4. `ListVpcEndpointResponse` — `src/v1/model.ts:1460`
- **Why weird:** Same singular/plural mismatch as #1. The list response
  for VPC endpoints uses a singular noun. The proto-tier `Public` infix
  was dropped in the 2026-05-22 regeneration, leaving the residual
  singular/plural inconsistency.
- **Category:** Singular/plural inconsistency.
- **Suggested name:** `ListVpcEndpointsResponse`.
- **Rationale:** Same as #1.
