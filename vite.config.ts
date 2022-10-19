import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Components({
    resolvers: [AntDesignVueResolver()],
  })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://cn-apia.coolkit.cn',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/dispatch/app': {
        target: 'https://cn-dispa.coolkit.cn',
        changeOrigin: true
      }
    },
  }
})
