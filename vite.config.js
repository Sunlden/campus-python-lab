import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    tailwindcss()
  ],
  build: {
    // 确保构建产物输出到 dist 目录（默认就是，可显式声明）
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
