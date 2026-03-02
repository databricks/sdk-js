/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  env: {
    node: true,
    es2024: true,
  },
  rules: {
    // =========================================================================
    // RULES NOT IN PRESETS (must be added manually)
    // These are opt-in rules that presets intentionally don't include because
    // they're project-specific or highly opinionated.
    // =========================================================================

    '@typescript-eslint/naming-convention': [
      'error',
      {selector: 'variable', format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'allow'},
      {selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow'},
      {selector: 'function', format: ['camelCase']},
      {selector: 'typeLike', format: ['PascalCase']},
      {selector: 'enumMember', format: ['UPPER_CASE']},
      {selector: 'classMethod', format: ['camelCase']},
      {selector: 'classProperty', format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'allow'},
      {selector: 'typeProperty', format: ['camelCase', 'snake_case']},
      {selector: 'objectLiteralProperty', format: null},
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {prefer: 'type-imports', fixStyle: 'separate-type-imports'},
    ],
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {fixMixedExportsWithInlineTypeSpecifier: false},
    ],
    '@typescript-eslint/no-import-type-side-effects': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {accessibility: 'no-public', overrides: {constructors: 'no-public'}},
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-with': 'error',
    eqeqeq: ['error', 'always'],
    'no-console': 'error',
    'spaced-comment': ['error', 'always', {markers: ['/']}],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_'},
    ],
    'consistent-return': 'off',
  },
  overrides: [
    {
      files: ['*.config.ts', '*.config.*.ts', '*.config.js', '*.config.cjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  ignorePatterns: ['dist/', 'node_modules/', '*.js', '*.cjs', '*.mjs'],
};
