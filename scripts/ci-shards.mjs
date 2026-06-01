#!/usr/bin/env node
// Partition the workspace packages into balanced CI shards.
//
// CI runs the static checks (build + lint + format) as a matrix where each
// shard handles a subset of packages. Alphabetical sharding is badly
// unbalanced because ~25% of packages share the `uc-` prefix, so this script
// balances shards by source weight instead.
//
// Usage:
//   node scripts/ci-shards.mjs [shardCount]
//     Prints a single-line JSON array of shard objects to stdout, suitable for
//     a GitHub Actions matrix: [{ "id": "1", "pkgs": "<space-separated names>" }].
//
//   node scripts/ci-shards.mjs [shardCount] --pretty
//     Prints a human-readable balance report to stderr (for local inspection).
//
// Weighting: each package's weight is the total byte size of its TypeScript
// source files under `src/`, plus a fixed base to account for the per-package
// fixed cost (turbo task startup, dependency build). Shards are filled with a
// largest-processing-time-first greedy algorithm, which keeps the heaviest
// shard close to the theoretical optimum.

import {readdirSync, readFileSync, statSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PACKAGES_DIR = join(REPO_ROOT, 'packages');
const PACKAGE_PREFIX = '@databricks/sdk-';

// A fixed weight added to every package, in source-byte-equivalents. Type-aware
// lint and the tsc build have a large fixed cost per package (loading the TS
// program and resolving the dependency type graph), so a shard's runtime is
// driven more by how many packages it holds than by their total source size.
// Setting the base near the median source size keeps shards balanced by package
// count while still giving heavy packages (e.g. `jobs`) extra weight.
const BASE_WEIGHT = 60_000;

function sourceWeight(packageDir) {
  const srcDir = join(packageDir, 'src');
  let total = 0;
  const walk = dir => {
    let entries;
    try {
      entries = readdirSync(dir, {withFileTypes: true});
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && /\.tsx?$/.test(entry.name)) {
        total += statSync(full).size;
      }
    }
  };
  walk(srcDir);
  return total;
}

function collectPackages() {
  // The root package.json declares `workspaces: ["packages/**"]`, so packages
  // are nested at arbitrary depth (e.g. packages/uc/catalogs). Walk the tree
  // and collect every package.json, skipping node_modules and build output.
  const packages = [];
  const walk = dir => {
    for (const entry of readdirSync(dir, {withFileTypes: true})) {
      if (entry.name === 'node_modules' || entry.name === 'dist') continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name === 'package.json') {
        let pkg;
        try {
          pkg = JSON.parse(readFileSync(full, 'utf8'));
        } catch {
          continue;
        }
        if (
          typeof pkg.name === 'string' &&
          pkg.name.startsWith(PACKAGE_PREFIX)
        ) {
          packages.push({
            name: pkg.name,
            weight: BASE_WEIGHT + sourceWeight(dir),
          });
        }
      }
    }
  };
  walk(PACKAGES_DIR);
  return packages;
}

function partition(packages, shardCount) {
  // Largest-processing-time-first: assign the heaviest package to the
  // currently lightest shard.
  const shards = Array.from({length: shardCount}, () => ({
    pkgs: [],
    weight: 0,
  }));
  const sorted = [...packages].sort(
    (a, b) => b.weight - a.weight || a.name.localeCompare(b.name)
  );
  for (const pkg of sorted) {
    const lightest = shards.reduce((min, s) =>
      s.weight < min.weight ? s : min
    );
    lightest.pkgs.push(pkg.name);
    lightest.weight += pkg.weight;
  }
  return shards;
}

const shardCount = Number.parseInt(process.argv[2] ?? '8', 10);
const pretty = process.argv.includes('--pretty');

const packages = collectPackages();
const shards = partition(packages, shardCount);

if (pretty) {
  const lines = shards.map((s, i) => {
    const kb = Math.round(s.weight / 1024);
    return `shard ${i + 1}: ${String(s.pkgs.length).padStart(2)} pkgs, ${String(kb).padStart(5)} KB`;
  });
  const weights = shards.map(s => s.weight);
  const imbalance = (
    (Math.max(...weights) / Math.min(...weights) - 1) *
    100
  ).toFixed(1);
  process.stderr.write(
    `${packages.length} packages -> ${shardCount} shards\n${lines.join('\n')}\n` +
      `max/min weight imbalance: ${imbalance}%\n`
  );
}

const matrix = shards.map((s, i) => ({
  id: String(i + 1),
  pkgs: [...s.pkgs].sort().join(' '),
}));
process.stdout.write(JSON.stringify(matrix));
