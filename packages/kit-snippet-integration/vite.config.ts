/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@talentdigital/kit-snippet-integration",
      fileName: "talent-kit-snippet-integration",
      formats: ["umd"],
    },
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    target: ["es2019"],
  },
});
