import {defineConfig} from 'vitest/config';

import {failOnViteWarnings} from '../../vitest.shared.mjs';

export default defineConfig({
  plugins: [failOnViteWarnings()],
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
