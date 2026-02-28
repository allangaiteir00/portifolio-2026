import angular from '@analogjs/vite-plugin-angular';
import { fileURLToPath } from 'url';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

console.log('--- VITEST CONFIG LOADING ---');

export default defineConfig({
  plugins: [angular(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup-vitest.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  resolve: {
    alias: {
      '@core': fileURLToPath(new URL('./src/app/core', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/app/shared', import.meta.url)),
      '@environments': fileURLToPath(new URL('./src/environments', import.meta.url)),
    },
  },
});
