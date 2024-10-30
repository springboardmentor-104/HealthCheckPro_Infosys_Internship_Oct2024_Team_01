import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  include: ['chart.js', 'react-chartjs-2'],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  }
})
