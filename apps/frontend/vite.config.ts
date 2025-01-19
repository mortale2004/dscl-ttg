import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import svgr from "@svgr/rollup";
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgo: false,
    }),
  ],
  resolve: {
    alias: {
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@common": path.resolve(__dirname, "./src/common"),
      "@ui": path.resolve(__dirname, "../../packages/ui/src"),
    },
  },
});
