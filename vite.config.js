import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    // server: {
    //   host: "192.168.8.95", 
    //   port: 1234, 
    // },
})
