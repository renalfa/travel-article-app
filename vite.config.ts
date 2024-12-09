import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Travel Article App",
        short_name: "MyTAP",
        description:
          "Travel Article App, A simple PWA setup with Vite and TypeScript",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) =>
              request.destination === "image" ||
              request.destination === "script" ||
              request.destination === "style",
            handler: "CacheFirst",
            options: {
              cacheName: "asset-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
              },
            },
          },
        ],
      },
    }),
  ],
});
