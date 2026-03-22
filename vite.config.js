import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project URL: https://<user>.github.io/E-COMMERCE-WEBSITE/
const repoName = 'E-COMMERCE-WEBSITE'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Production build must use repo subpath; local dev uses "/"
  base: mode === 'production' ? `/${repoName}/` : '/',
  plugins: [react(), tailwindcss()],
}))
