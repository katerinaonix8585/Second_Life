import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, "build"),
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      images: path.resolve(__dirname, "src/shared/assets/images"),
      components: path.resolve(__dirname, "src/components"),
      homeworks: path.resolve(__dirname, "src/homeworks"),
      lessons: path.resolve(__dirname, "src/lessons"),
      pages: path.resolve(__dirname, "src/pages"),
      store: path.resolve(__dirname, "src/store"),
      styles: path.resolve(__dirname, "src/styles"),
    },
  },
});
