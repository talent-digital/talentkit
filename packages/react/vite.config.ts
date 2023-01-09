import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@talentdigital/react",
      fileName: "react",
      formats: ["es", "cjs"],
    },
    rollupOptions: { external: ["@talentdigital/kit", "react"] },
    target: ["es2015"],
  },
  plugins: [dts(), react()],
});
