import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    hmr: true, // Explicitly enable HMR (it's true by default)
    watch: {
      usePolling: true, // Useful for environments where file system events might not be reliable (e.g., WSL, Docker)
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["@testing-library/jest-dom"],
  },
});
