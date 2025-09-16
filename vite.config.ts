import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/edge-mlops-mockup/' : '/',
  server: {
    host: true,
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into separate chunks
          'patternfly': ['@patternfly/react-core', '@patternfly/react-table', '@patternfly/react-icons'],
          'victory': ['victory'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
})
