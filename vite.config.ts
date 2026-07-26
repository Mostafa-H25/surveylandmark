import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), tailwindcss(), cloudflare()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));