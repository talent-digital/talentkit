import { build, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: { external: ["react"] },
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "@talentkit/react",
      fileName: "react",
    },
  },
  plugins: [dts(), react()],
});
