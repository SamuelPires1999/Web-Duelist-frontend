/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import relay from 'vite-plugin-relay'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env/',
  plugins: [react(), tsconfigPaths(), relay],
  test: {
    globals: true,
    watch: false,
    environment: 'happy-dom',
    setupFiles: './src/setup-test.ts',
  },
  build: {
    sourcemap: true,
  },
})
