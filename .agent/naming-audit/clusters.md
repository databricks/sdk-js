# Naming Audit: clusters

**Path:** `packages/clusters/src/v2/`
**Versions audited:** v2
**Total weird names flagged:** 4

## Summary
| Severity | Count |
| --- | --- |
| Medium | 3 |
| Low | 1 |

## Medium severity

### 1. `clusterLogStatus` field typed `LogSyncStatus` — `src/v2/model.ts:1330`
- **Why weird:** Type is `LogSyncStatus` but field is `clusterLogStatus`. Type and field have different mental models (`LogSync` vs `ClusterLog`).
- **Category:** 6 (misleading — type and field name don't match the same concept).
- **Suggested name:** Rename the type to `ClusterLogStatus` to match the field.
- **Rationale:** Same concept, two different names in 5 lines.

### 2. `ClusterEventType_ClusterEventType` doubly-nested enum name — `src/v2/model.ts:749`
- **Why weird:** Enum named `ClusterEventType_ClusterEventType` — the same identifier repeated on both sides of the proto-nesting separator. This is a generator artefact when a proto message named `ClusterEventType` contains a nested enum also named `ClusterEventType`. The repeated identifier carries no information.
- **Category:** 14 (proto nesting stutter), 4 (redundant repetition).
- **Suggested name:** `ClusterEventType` (single, top-level).
- **Rationale:** Drop the redundant `ClusterEventType_` prefix; the doubly-stuttered name repeats the same word with no added meaning.

### 3. `DataPlaneEventDetails` / `DataPlaneClusterEventType` — control-plane vs data-plane infrastructure naming — `src/v2/model.ts:73,2092`
- **Why weird:** "Data plane" is an internal Databricks infrastructure concept (vs "control plane") — not a customer-facing domain term. Two public types prefix their names with the deployment-plane they originate from. A user creating a cluster does not need to know which plane emitted which event class; the distinction is a Databricks-internal architecture detail.
- **Category:** 8 (internal architecture leak in public surface).
- **Suggested name:** Either merge into a single `ClusterEventType` enum / `EventDetails` shape, or rename to a non-infrastructure word (e.g., `RuntimeEventDetails`).
- **Rationale:** Customer SDK consumers should not be expected to map "data plane" onto their mental model of Databricks. Flagged for upstream — same class as internal scheduler names leaking into public API.

## Low severity

### 4. `AutoScale` type name — `src/v2/model.ts:922`
- **Why weird:** PascalCase `AutoScale` is two words. Compare to `autoscale` field (lowercase, one word) and `autoterminationMinutes` (lowercase, one word). The type name is the outlier.
- **Category:** 3 (casing inconsistency), 17 (within-package inconsistency).
- **Suggested name:** `Autoscale` (one word, matching the field).
- **Rationale:** Matches sibling naming (`autoscale: Autoscale`).
