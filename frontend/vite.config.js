import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {VITE_BACKEND_URL: process.env.VITE_BACKEND_URL,
           VITE_BACKEND_PORT: process.env.VITE_BACKEND_PORT},
})
