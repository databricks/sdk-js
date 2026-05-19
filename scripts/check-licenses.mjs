#!/usr/bin/env node
// Validates that every published workspace package ships a LICENSE matching
// the repo root, and lists it in package.json "files" so npm includes it in
// the tarball. Private packages are skipped because they are not published.

import {readFile, readdir, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packagesDir = path.join(repoRoot, 'packages');
const rootLicensePath = path.join(repoRoot, 'LICENSE');

async function readJSON(p) {
  return JSON.parse(await readFile(p, 'utf8'));
}

async function main() {
  const rootLicense = await readFile(rootLicensePath, 'utf8');

  const entries = await readdir(packagesDir, {withFileTypes: true});
  const pkgDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();

  const failures = [];
  let checked = 0;
  let skipped = 0;

  for (const name of pkgDirs) {
    const pkgDir = path.join(packagesDir, name);
    const pkgJsonPath = path.join(pkgDir, 'package.json');
    try {
      await stat(pkgJsonPath);
    } catch {
      continue;
    }

    const pkg = await readJSON(pkgJsonPath);
    if (pkg.private === true) {
      skipped++;
      continue;
    }
    checked++;

    const licensePath = path.join(pkgDir, 'LICENSE');
    let licenseContents;
    try {
      licenseContents = await readFile(licensePath, 'utf8');
    } catch {
      failures.push(`${name}: missing LICENSE at ${path.relative(repoRoot, licensePath)}`);
      continue;
    }

    if (licenseContents !== rootLicense) {
      failures.push(`${name}: LICENSE content differs from repo root LICENSE`);
    }

    const files = Array.isArray(pkg.files) ? pkg.files : [];
    if (!files.includes('LICENSE')) {
      failures.push(`${name}: package.json "files" is missing "LICENSE" — npm will not publish it`);
    }
  }

  if (failures.length > 0) {
    console.error(`License check failed for ${failures.length} package(s):`);
    for (const f of failures) console.error(`  - ${f}`);
    console.error('');
    console.error(`Fix: copy ${path.relative(repoRoot, rootLicensePath)} into each failing package directory`);
    console.error(`and add "LICENSE" to that package.json's "files" array.`);
    process.exit(1);
  }

  console.log(`License check passed: ${checked} package(s) verified, ${skipped} private skipped.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
