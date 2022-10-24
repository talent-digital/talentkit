import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@talentdigital/sdk",
      fileName: "sdk",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["keycloak-js", "ky"],
    },
  },
  plugins: [dts({ insertTypesEntry: true })],
});
