import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(), // Add the vue plugin here
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Configure the '@' alias
    },
  },
  build: {
    // 禁用sourcemap生成，不再产生.map文件
    sourcemap: false,
  },
})
