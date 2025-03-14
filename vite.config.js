import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    cssCodeSplit: false, // ❌ No dividir el CSS
    assetsInlineLimit: 100000000, // 🔥 Evita la separación de assets
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].js', // 🔥 Asegura un solo archivo de salida
        chunkFileNames: 'assets/[name].js', // 🔥 Asegura que no haya archivos extra
        assetFileNames: 'assets/[name][extname]', // 🔥 Evita múltiples archivos CSS
      }
    }
  },
  esbuild: {
    loader: 'css', // 🔥 Intenta forzar la carga del CSS en el JS
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
