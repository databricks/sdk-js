import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
      headless: true,
    },
    include: ['tests/**/*.test.ts'],
    // Exclude Node.js-only tests in browser environment.
    exclude: [
      'tests/oidc/oidc.test.ts', // Uses fs/promises
      'tests/oidc/azure_devops.test.ts', // Uses process.env extensively
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/index.ts',
        'src/oidc/oidc.ts', // Node.js-only (uses fs)
        'src/oidc/azure_devops.ts', // Node.js-only (uses process.env)
      ],
    },
  },
});
