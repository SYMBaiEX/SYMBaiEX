import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
    server: {
      host: true,
      strictPort: true,
      port: 5173,
      hmr: {
        port: 5173
      }
    },
    build: {
      outDir: 'dist',
      target: 'esnext',
      sourcemap: true, 
      emptyOutDir: true,
      assetsDir: 'assets'
    }
  };
});