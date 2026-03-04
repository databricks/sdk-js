/**
 * Checks that every exported symbol not re-exported from a package's index.ts
 * barrel file has a `@internal` JSDoc tag, and that public exports do not.
 *
 * Usage: node --experimental-strip-types scripts/check-internal-exports.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Recursively collects all .ts files under `dir`, skipping `exclude` dirs. */
function walkTs(dir: string, exclude: Set<string>): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (exclude.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkTs(full, exclude));
    } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
      results.push(full);
    }
  }
  return results;
}

/** Returns the set of symbol names exported from a barrel (index.ts) file. */
function collectBarrelExports(filePath: string): Set<string> {
  const names = new Set<string>();
  const src = fs.readFileSync(filePath, 'utf-8');
  const sf = ts.createSourceFile(
    filePath,
    src,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );

  for (const stmt of sf.statements) {
    // export { Foo, Bar } from './module';
    // export type { Foo } from './module';
    if (ts.isExportDeclaration(stmt) && stmt.exportClause) {
      if (ts.isNamedExports(stmt.exportClause)) {
        for (const el of stmt.exportClause.elements) {
          // Use the exported name (alias if present, otherwise the property name).
          names.add((el.name ?? el.propertyName).text);
        }
      }
    }
  }
  return names;
}

/**
 * Resolves the source directory and public symbol set for a package by reading
 * its package.json `exports` field.
 */
function resolvePackageExports(pkgDir: string): {
  srcDir: string;
  publicNames: Set<string>;
  barrelFiles: Set<string>;
} {
  const pkgJsonPath = path.join(pkgDir, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  const exportsField = pkgJson.exports as
    | Record<string, Record<string, string>>
    | undefined;
  const srcDir = path.join(pkgDir, 'src');
  const publicNames = new Set<string>();
  const barrelFiles = new Set<string>();

  if (!exportsField) {
    return {srcDir, publicNames, barrelFiles};
  }

  for (const [, value] of Object.entries(exportsField)) {
    // Each export entry has { types: "...", import: "..." }. The dist path
    // mirrors the src path, so we map dist/foo/index.d.ts → src/foo/index.ts.
    const distTypes = value.types ?? value.import;
    if (typeof distTypes !== 'string') continue;

    const srcPath = path.join(
      pkgDir,
      distTypes.replace(/^\.\/dist\//, 'src/').replace(/\.d\.ts$/, '.ts')
    );

    if (!fs.existsSync(srcPath)) continue;

    barrelFiles.add(srcPath);
    for (const name of collectBarrelExports(srcPath)) {
      publicNames.add(name);
    }
  }

  return {srcDir, publicNames, barrelFiles};
}

/** Checks whether a node has a JSDoc comment containing `@internal`. */
function hasInternalTag(node: ts.Node, sf: ts.SourceFile): boolean {
  const fullText = sf.getFullText();
  const ranges = ts.getLeadingCommentRanges(fullText, node.getFullStart());
  if (!ranges) return false;
  return ranges.some(r => {
    const text = fullText.slice(r.pos, r.end);
    return /@internal\b/.test(text);
  });
}

/** Returns exported symbol names from a declaration node. */
function getExportedNames(node: ts.Node): string[] {
  const names: string[] = [];

  // export function foo() {}
  if (ts.isFunctionDeclaration(node) && node.name) {
    names.push(node.name.text);
  }
  // export class Foo {}
  else if (ts.isClassDeclaration(node) && node.name) {
    names.push(node.name.text);
  }
  // export interface Foo {}
  else if (ts.isInterfaceDeclaration(node)) {
    names.push(node.name.text);
  }
  // export type Foo = ...
  else if (ts.isTypeAliasDeclaration(node)) {
    names.push(node.name.text);
  }
  // export enum Foo {}
  else if (ts.isEnumDeclaration(node)) {
    names.push(node.name.text);
  }
  // export const/let/var foo = ...
  else if (ts.isVariableStatement(node)) {
    for (const decl of node.declarationList.declarations) {
      if (ts.isIdentifier(decl.name)) {
        names.push(decl.name.text);
      }
    }
  }
  // export { Foo, Bar };  (without a module specifier — local re-export)
  else if (ts.isExportDeclaration(node) && !node.moduleSpecifier) {
    if (node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const el of node.exportClause.elements) {
        names.push((el.name ?? el.propertyName).text);
      }
    }
  }

  return names;
}

// ── Main ────────────────────────────────────────────────────────────────────

interface Violation {
  file: string;
  line: number;
  name: string;
  message: string;
}

function checkPackage(pkgDir: string): Violation[] {
  const violations: Violation[] = [];
  const {srcDir, publicNames, barrelFiles} = resolvePackageExports(pkgDir);

  if (!fs.existsSync(srcDir)) return violations;

  const sourceFiles = walkTs(srcDir, new Set(['__tests__', 'tests']));

  for (const filePath of sourceFiles) {
    // Skip barrel files themselves.
    if (barrelFiles.has(filePath)) continue;

    const src = fs.readFileSync(filePath, 'utf-8');
    const sf = ts.createSourceFile(
      filePath,
      src,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );

    for (const stmt of sf.statements) {
      const hasExport =
        ts.canHaveModifiers(stmt) &&
        ts
          .getModifiers(stmt)
          ?.some(m => m.kind === ts.SyntaxKind.ExportKeyword);

      // Also handle `export { ... }` declarations.
      const isExportDecl = ts.isExportDeclaration(stmt);

      if (!hasExport && !isExportDecl) continue;

      const names = getExportedNames(stmt);
      if (names.length === 0) continue;

      const isInternal = hasInternalTag(stmt, sf);
      const line =
        sf.getLineAndCharacterOfPosition(stmt.getStart(sf)).line + 1;
      const relPath = path.relative(process.cwd(), filePath);

      for (const name of names) {
        const isPublic = publicNames.has(name);

        if (!isPublic && !isInternal) {
          violations.push({
            file: relPath,
            line,
            name,
            message: `exported symbol "${name}" is not in the public API — add /** @internal */ JSDoc tag`,
          });
        } else if (isPublic && isInternal) {
          violations.push({
            file: relPath,
            line,
            name,
            message: `public symbol "${name}" must not have @internal tag`,
          });
        }
      }
    }
  }

  return violations;
}

// Discover workspace packages.
const rootPkgJson = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
const workspaces: string[] = rootPkgJson.workspaces ?? [];
const allViolations: Violation[] = [];

for (const pattern of workspaces) {
  // Simple glob: "packages/*" → list directories.
  if (pattern.endsWith('/*')) {
    const base = pattern.slice(0, -2);
    if (!fs.existsSync(base)) continue;
    for (const entry of fs.readdirSync(base, {withFileTypes: true})) {
      if (!entry.isDirectory()) continue;
      const pkgDir = path.join(base, entry.name);
      if (!fs.existsSync(path.join(pkgDir, 'package.json'))) continue;
      allViolations.push(...checkPackage(pkgDir));
    }
  } else {
    if (fs.existsSync(path.join(pattern, 'package.json'))) {
      allViolations.push(...checkPackage(pattern));
    }
  }
}

if (allViolations.length > 0) {
  console.error(
    `\n✗ Found ${allViolations.length.toString()} @internal annotation violation(s):\n`
  );
  for (const v of allViolations) {
    console.error(`  ${v.file}:${v.line.toString()} — ${v.message}`);
  }
  console.error(
    '\nEvery exported symbol not re-exported from index.ts must have /** @internal */ JSDoc.'
  );
  console.error(
    'Public symbols re-exported from index.ts must not have @internal.\n'
  );
  process.exit(1);
} else {
  console.log('✓ All @internal annotations are correct.');
}
