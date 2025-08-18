import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    define: {
      // Make environment variables available to the client
      'process.env': process.env
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunk for common dependencies
            vendor: ['react', 'react-dom', 'react-router-dom'],
            // Redux chunk
            redux: ['@reduxjs/toolkit', 'react-redux'],
            // Icons chunk
            icons: ['react-icons/fa']
          }
        }
      },
      // Enable source maps for better debugging
      sourcemap: mode === 'development',
      // Optimize chunk size
      chunkSizeWarningLimit: 1000
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@reduxjs/toolkit',
        'react-redux',
        'react-icons/fa'
      ]
    },
    // Performance optimizations
    server: {
      hmr: {
        overlay: false // Disable error overlay in development
      }
    }
  }
})
