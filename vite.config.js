import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize for mobile performance
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        // Split chunks for better caching and loading
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          components: [
            './src/components/Navbar.jsx',
            './src/components/Footer.jsx',
            './src/components/SafariCompatibility.jsx',
            './src/components/MobileOptimizer.jsx'
          ]
        }
      }
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  // Optimize dev server for mobile testing
  server: {
    host: true, // Allow external connections for mobile testing
    port: 3000
  }
})
