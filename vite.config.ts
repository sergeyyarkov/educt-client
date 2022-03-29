import { defineConfig } from 'vite';
import * as constants from './constants';
import path from 'path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { dependencies } from './package.json';

function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach(key => {
    if (['@chakra-ui/react', '@chakra-ui/icons', 'framer-motion'].includes(key)) chunks[key] = [key];
    return;
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  publicDir: 'public',
  plugins: [react()],
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: constants.BACKEND_URL,
        changeOrigin: true,
      },
      '/uploads': {
        target: constants.BACKEND_URL,
        changeOrigin: true,
      },
      '/video': {
        target: constants.BACKEND_URL,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [{ find: '@educt', replacement: path.resolve(__dirname, 'src') }],
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        manualChunks: {
          ...renderChunks(dependencies),
        },
      },
      plugins: [visualizer()],
    },
    outDir: 'dist',
    sourcemap: false,
  },
});
