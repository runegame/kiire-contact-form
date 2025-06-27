import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        })
      ]
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': {} // cubre otros usos generales
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/main.js', import.meta.url)),
      name: 'MyVueApp',
      formats: ['iife'],
      fileName: () => 'kiire-contact-form.js'
    },
    minify: 'terser',
    terserOptions: {
      mangle: {
        toplevel: true
      }
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: () => 'kiire-contact-form.css'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
