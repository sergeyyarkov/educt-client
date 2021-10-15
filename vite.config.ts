import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@educt', replacement: path.resolve(__dirname, 'src') }],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
