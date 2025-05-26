import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // Disable source map generation
  },
  server: {
    port: 5173,
    open: true,
  },
  base: '/bookmarks-vue/', // Set base for GitHub Pages
});
