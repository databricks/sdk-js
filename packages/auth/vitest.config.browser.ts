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
    exclude: [
      'tests/credentials/u2m.test.ts',
      'tests/oidc/env.test.ts',
      'tests/oidc/file.test.ts',
    ],
  },
});
