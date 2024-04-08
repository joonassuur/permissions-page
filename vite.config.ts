import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

const dev = process.env.NODE_ENV === 'development';
export default defineConfig({
  plugins: [react()],
  base: dev ? '' : '/permissions-page/',
});
