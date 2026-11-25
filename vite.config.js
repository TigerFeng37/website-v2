import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: ["es2020", "safari15"],
    minify: "terser",
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
    // Media is served as files, never inlined into JS.
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // React rarely changes: keep it in its own long-cached chunk.
        // three.js and the physics engine stay in the lazy Hexaspires chunk,
        // loaded after first paint by the home hero and the feng.works case study.
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
