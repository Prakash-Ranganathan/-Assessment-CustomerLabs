// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://webhook.site/38aec211-ea32-4b46-9152-dedc4d41bedd',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/api1':{
        target: 'https://webhook.site/#!/view/38aec211-ea32-4b46-9152-dedc4d41bedd',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});

