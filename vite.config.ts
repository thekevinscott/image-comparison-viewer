import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es']
    },
    rollupOptions: {
      // external: /^lit/,
    }
  }
})
