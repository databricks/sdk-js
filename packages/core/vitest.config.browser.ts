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
      'tests/profiles/resolve.test.ts',
      'tests/clientinfo/default.test.ts',
      'tests/clientinfo/agent.test.ts',
    ],
  },
});
