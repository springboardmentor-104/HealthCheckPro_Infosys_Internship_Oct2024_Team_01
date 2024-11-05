import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.lottie"], // Add this line to include .lottie files as assets
  base: "/",
  assetsInclude: ["**/*.lottie"], // Add this line to include .lottie files as assets
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  }
})
