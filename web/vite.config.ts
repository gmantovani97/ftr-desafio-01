import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      assets: resolve(__dirname, './src/assets'),
      components: resolve(__dirname, './src/components'),
      pages: resolve(__dirname, './src/pages'),
    },
  },
});
