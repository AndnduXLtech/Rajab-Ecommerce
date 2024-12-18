import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      ignored: ["**/src/server/**"],
    },
  },
  plugins: [react()],
  build: {
    // Customize build options if needed
    outDir: "dist", // Default output directory
    sourcemap: true, // Enable source maps for easier debugging
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/client"),
    },
  },
});
