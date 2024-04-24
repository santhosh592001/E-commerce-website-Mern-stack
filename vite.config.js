
// vite.config.js

import { defineConfig } from 'vite';

export default defineConfig({

  base: "/E-commerce-website-Mern-stack/",
  
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
});
