import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  publicDir: process.env.NODE_ENV !== 'production' ? './assets' : '',
  build: {
    // Only clean the dist directory, not the temp directory
    emptyOutDir: true,
    outDir: 'dist',
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vits-web',
      formats: ['es']
    },
    rollupOptions: {
      external: [
        '**/*.spec.ts',
        'onnxruntime-web'
      ],
    },
  },
  plugins: [dts({ 
    exclude: "**/*.spec.ts",
    outDir: 'dist/types'
  })],
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
});