import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/starter-project-with-vite/',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Daily Life Story',
        short_name: 'LifeStory',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d6efd',
        icons: [
          {
            src: '/starter-project-with-vite/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/starter-project-with-vite/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: 'Tambah Story',
            short_name: 'Tambah',
            description: 'Buat cerita baru',
            url: '/#/create-story',
            icons: [{ src: '/starter-project-with-vite/icons/add.png', sizes: '96x96' }],
          },
        ],
        screenshots: [
          {
            src: '/starter-project-with-vite/screenshots/desktop.png',
            sizes: '1280x720',
            type: 'image/png',
          },
          {
            src: '/starter-project-with-vite/screenshots/mobile.png',
            sizes: '375x667',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/story-api\.dicoding\.dev\/v1\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
            },
          },
        ],
      },
    }),
  ],
});
