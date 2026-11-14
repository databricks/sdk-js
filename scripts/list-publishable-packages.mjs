#!/usr/bin/env node
// Prints the npm package names of every workspace package that should be
// published, one per line. A package is publishable when its package.json
// does not set "private": true. Walks packages/ recursively because some
// packages are nested (e.g. packages/uc/catalogs). Mirrors the convention
// used by scripts/check-licenses.mjs.

import {readFile, readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packagesDir = path.join(repoRoot, 'packages');

// Directories we never descend into while searching for package.json files.
const SKIP_DIRS = new Set(['node_modules', 'dist', 'src', 'tests']);

async function readJSON(p) {
  return JSON.parse(await readFile(p, 'utf8'));
}

// Recursively yields the path of every package.json found under `dir`,
// skipping SKIP_DIRS. Stops descending into a directory once its own
// package.json is found so we do not pick up nested fixtures.
async function* findPackageJsons(dir) {
  const entries = await readdir(dir, {withFileTypes: true});
  if (entries.some((e) => e.isFile() && e.name === 'package.json')) {
    yield path.join(dir, 'package.json');
    return;
  }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (SKIP_DIRS.has(entry.name)) continue;
    yield* findPackageJsons(path.join(dir, entry.name));
  }
}

async function main() {
  const names = [];
  for await (const pkgJsonPath of findPackageJsons(packagesDir)) {
    const pkg = await readJSON(pkgJsonPath);
    if (pkg.private === true) continue;
    if (typeof pkg.name !== 'string' || pkg.name.length === 0) {
      const rel = path.relative(repoRoot, pkgJsonPath);
      throw new Error(`${rel} is missing a "name" field`);
    }
    names.push(pkg.name);
  }

  names.sort();
  for (const name of names) console.log(name);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
