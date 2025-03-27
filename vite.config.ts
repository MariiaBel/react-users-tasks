import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// console.log(import.meta.url)
// process.env.NODE_ENV
export default defineConfig(({ command }: any) => {
  const isProduction = command === 'build';

  return {
    base: isProduction ? '/react-users-tasks/dist/' : '/',
    plugins: [react()],
  }
})
