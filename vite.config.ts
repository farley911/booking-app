import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  server: {
    proxy: {
      '/bookings': 'http://127.0.0.1:3001',
      '/stays': 'http://127.0.0.1:3001',
    },
  },
  plugins: [
    tanstackStart(),
    react(),
    nitro(),
  ],
})