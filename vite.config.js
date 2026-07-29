import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      host: true,
       allowedHosts: true,
    proxy: {
      // In local dev, forward /api calls to `netlify dev` or `vercel dev`
      // running the serverless functions in /api on port 8888 / 3000.
      "/api": {
        target: "http://localhost:8888",
        changeOrigin: true,
      },
    },
  },
});
