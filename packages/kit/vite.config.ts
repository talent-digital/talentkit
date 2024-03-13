/// <reference types="vitest" />
import ViteYaml from "@modyfi/vite-plugin-yaml";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@talentdigital/kit",
      fileName: "talent-kit",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["keycloak-js", "ky", "logrocket"],
    },
    target: ["es2017"],
  },
  plugins: [dts(), ViteYaml()],
  test: {
    environment: "happy-dom",
    setupFiles: ["@vitest/web-worker"],
  },
});
