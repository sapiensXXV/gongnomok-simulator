import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../backend/src/main/resources/static"
  },
  server: {
    "/api": "http:localhost:8080"
  }
})
