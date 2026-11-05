import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

// One real HTML file per page, so every page has its own URL, title and
// description, and works on any static host without a router.
const page = (f: string) => fileURLToPath(new URL(f, import.meta.url));

export default defineConfig({
  // GitHub Pages serves the site from /<repo-name>/; the deploy workflow sets
  // BASE_PATH to that. Locally and on other hosts it stays at the root.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        home: page('./index.html'),
        stay: page('./stay.html'),
        gallery: page('./gallery.html'),
        explore: page('./explore.html'),
        reviews: page('./reviews.html'),
        contact: page('./contact.html'),
      },
    },
  },
});
