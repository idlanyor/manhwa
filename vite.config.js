import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Optimize chunks for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
          'ui': ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/fontawesome-svg-core'],
          'utils': ['axios', 'date-fns'],
        },
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification with esbuild (default, faster than terser)
    minify: 'esbuild',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate source maps for production (set to false for smaller bundle)
    sourcemap: false,
    // Target modern browsers for smaller output
    target: 'es2015',
    // Optimize asset inlining threshold (4kb)
    assetsInlineLimit: 4096,
    // Enable module preload polyfill for better browser support
    modulePreload: {
      polyfill: true,
    },
  },

  // Server configuration
  server: {
    port: 5173,
    host: true,
  },

  // Preview configuration
  preview: {
    port: 8080,
    host: true,
  },
})
