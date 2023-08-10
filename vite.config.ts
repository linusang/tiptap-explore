import vue from "@vitejs/plugin-vue";
import * as path from "path";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Icons()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    include: ["**/*.spec.ts"],
  },
});
