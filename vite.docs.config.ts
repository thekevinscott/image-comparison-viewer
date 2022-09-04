import { resolve, join } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  build: {
    outDir: join(__dirname, "docs"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),

      },
      // external: /^lit/,
    }
  }
})
