import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from 'vite-plugin-pwa'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
      VitePWA({
      registerType: 'autoUpdate',

      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],

      manifest: {
        name: 'Wisedecore',
        short_name: 'Wise',
        description: 'A sample PWA React application',

        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',

        icons: [
          {
            src: 'PWAicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'PWAicon.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'PWAicon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })



  ],
})
