/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@talentdigital/kit",
      fileName: "talent-kit",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["keycloak-js", "ky"],
    },
  },
  plugins: [dts()],
  test: {
    environment: "happy-dom",
  },
});
