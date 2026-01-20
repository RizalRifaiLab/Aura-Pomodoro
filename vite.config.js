import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunk splitting for better caching and faster loading
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'zustand-vendor': ['zustand'],
          'icons-vendor': ['lucide-react'], // Heavy icon library
        },
      },
    },
    // Minification options (using esbuild for better performance)
    minify: 'esbuild',
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
})
