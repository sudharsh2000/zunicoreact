import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from 'vite-plugin-pwa'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    esbuild: {
    supported: {
      'top-level-await': true
    }
  },
    tailwindcss(),
     
      VitePWA({
      registerType: 'autoUpdate',

      includeAssets: ['favicon.ico', 'apple-touch-icon.png','splash-icon.png', 'masked-icon.svg'],

      manifest: {
        name: 'Wisedecore',
        short_name: 'Wisedecore',
        description: 'A sample PWA React application',

        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',

        icons: [
          {
            src: 'appicon.jpg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'splash-icon.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'appicon.jpg',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })



  ],
   
})
