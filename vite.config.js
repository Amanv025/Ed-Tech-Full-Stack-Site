import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        // Add paths to external dependencies if needed
        '/Edtech/edtech-project/fetchdata.js'
      ]
    }
  }
})
