import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: /^lit/,
      input: {
        'viewer': path.resolve(__dirname, 'src/components/viewer.ts'),
        'dragger': path.resolve(__dirname, 'src/components/dragger.ts'),
        'interaction-controller': path.resolve(__dirname, 'src/controllers/interaction-controller.ts'),
      }
    }
  }
})
